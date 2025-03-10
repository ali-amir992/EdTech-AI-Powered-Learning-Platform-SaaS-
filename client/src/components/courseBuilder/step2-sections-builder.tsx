"use client"

import { useState } from "react"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { ISection } from "@/types"
import { SectionCard } from "@/components/course-builder/section-card"

interface Step2SectionsBuilderProps {
    initialSections: ISection[]
    onSubmit: (sections: ISection[]) => void
    onBack: () => void
}

export function Step2SectionsBuilder({ initialSections, onSubmit, onBack }: Step2SectionsBuilderProps) {
    const [sections, setSections] = useState<ISection[]>(
        initialSections.length > 0
            ? initialSections
            : [
                {
                    id: "section-1",
                    title: "",
                    description: "",
                    order: 1,
                    lessons: [],
                },
            ],
    )

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            setSections((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id)
                const newIndex = items.findIndex((item) => item.id === over.id)

                const newItems = arrayMove(items, oldIndex, newIndex)
                return newItems.map((item, index) => ({
                    ...item,
                    order: index + 1,
                }))
            })
        }
    }

    const addSection = () => {
        const newSection: ISection = {
            id: `section-${sections.length + 1}`,
            title: "",
            description: "",
            order: sections.length + 1,
            lessons: [],
        }
        setSections([...sections, newSection])
    }

    const updateSection = (updatedSection: ISection) => {
        setSections(sections.map((section) => (section.id === updatedSection.id ? updatedSection : section)))
    }

    const deleteSection = (sectionId: string) => {
        const newSections = sections
            .filter((section) => section.id !== sectionId)
            .map((section, index) => ({
                ...section,
                order: index + 1,
            }))
        setSections(newSections)
    }

    const handleSubmit = () => {
        // Validate sections
        const invalidSections = sections.filter((section) => !section.title || section.lessons.length === 0)

        if (invalidSections.length > 0) {
            alert("Please ensure all sections have a title and at least one lesson.")
            return
        }

        onSubmit(sections)
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Course Content</h2>
                <Button onClick={addSection} variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Section
                </Button>
            </div>

            <div className="space-y-4">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={sections.map((section) => section.id)} strategy={verticalListSortingStrategy}>
                        {sections.map((section) => (
                            <SectionCard key={section.id} section={section} onUpdate={updateSection} onDelete={deleteSection} />
                        ))}
                    </SortableContext>
                </DndContext>

                {sections.length === 0 && (
                    <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed">
                        <p className="text-muted-foreground">No sections added yet</p>
                        <Button onClick={addSection} variant="ghost" size="sm" className="mt-2">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Your First Section
                        </Button>
                    </div>
                )}
            </div>

            <div className="flex justify-between">
                <Button onClick={onBack} variant="outline">
                    Back
                </Button>
                <Button onClick={handleSubmit} disabled={sections.length === 0}>
                    Next: Review & Publish
                </Button>
            </div>
        </div>
    )
}

