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
import type { SectionFormData } from "@/types"
import { SectionCard } from "@/components/courseBuilder/section-card"

interface Step2SectionsBuilderProps {
  initialSections: SectionFormData[]
  onSubmit: (sections: SectionFormData[]) => void
  onBack: () => void
}

export function Step2SectionsBuilder({ initialSections, onSubmit, onBack }: Step2SectionsBuilderProps) {
  const [sections, setSections] = useState<SectionFormData[]>(
    initialSections.length > 0
      ? initialSections
      : [
          {
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
        const oldIndex = items.findIndex((item) => (item._id || `temp-section-${item.order}`) === active.id)
        const newIndex = items.findIndex((item) => (item._id || `temp-section-${item.order}`) === over.id)

        if (oldIndex !== -1 && newIndex !== -1) {
          const newItems = arrayMove(items, oldIndex, newIndex)
          return newItems.map((item, index) => ({
            ...item,
            order: index + 1,
          }))
        }

        return items
      })
    }
  }

  const addSection = () => {
    const newSection: SectionFormData = {
      _id: `temp-${Date.now()}`,
      title: "",
      description: "",
      order: sections.length + 1,
      lessons: [],
    }
    setSections([...sections, newSection])
  }

  const updateSection = (updatedSection: SectionFormData) => {
    setSections(sections.map((section) => (section._id === updatedSection._id ? updatedSection : section)))
  }

  const deleteSection = (sectionId: string) => {
    const newSections = sections
      .filter((section) => section._id !== sectionId)
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
          <SortableContext
            items={sections.map((section) => section._id || `temp-section-${section.order}`)}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section) => (
              <SectionCard
                key={section._id || `temp-section-${section.order}`}
                section={section}
                onUpdate={updateSection}
                onDelete={deleteSection}
              />
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

