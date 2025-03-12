"use client"

import type React from "react"

import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ChevronDown, ChevronUp, GripVertical, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { LessonFormData, SectionFormData } from "@/types"
import { LessonCard } from "@/components/courseBuilder/lesson-card"

interface SectionCardProps {
  section: SectionFormData
  onUpdate: (section: SectionFormData) => void
  onDelete: (sectionId: string) => void
}

export function SectionCard({ section, onUpdate, onDelete }: SectionCardProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [title, setTitle] = useState(section.title)
  const [description, setDescription] = useState(section.description)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section._id || `temp-section-${section.order}`,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1 : 0,
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    onUpdate({
      ...section,
      title: newTitle,
    })
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value
    setDescription(newDescription)
    onUpdate({
      ...section,
      description: newDescription,
    })
  }

  const addLesson = () => {
    const newLesson: LessonFormData = {
      _id: `temp-lesson-${Date.now()}`,
      title: "",
      description: "",
      order: section.lessons.length + 1,
      videoFile: null,
    }
    onUpdate({
      ...section,
      lessons: [...section.lessons, newLesson],
    })
  }

  const updateLesson = (updatedLesson: LessonFormData) => {
    onUpdate({
      ...section,
      lessons: section.lessons.map((lesson) => (lesson._id === updatedLesson._id ? updatedLesson : lesson)),
    })
  }

  const deleteLesson = (lessonId: string) => {
    onUpdate({
      ...section,
      lessons: section.lessons
        .filter((lesson) => lesson._id !== lessonId)
        .map((lesson, index) => ({
          ...lesson,
          order: index + 1,
        })),
    })
  }

  return (
    <Card ref={setNodeRef} style={style} className={`${isDragging ? "border-primary" : ""} bg-card`}>
      <CardHeader className="p-4 bg-muted">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab rounded p-1 hover:bg-background">
            <GripVertical className="h-5 w-5 text-foreground" />
          </div>
          <div className="flex-1">
            <Input
              placeholder="Section Title"
              value={title}
              onChange={handleTitleChange}
              className="border-none bg-transparent px-0 text-lg font-medium shadow-none focus-visible:ring-0"
            />
          </div>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" type="button">
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                <span className="sr-only">{isOpen ? "Collapse section" : "Expand section"}</span>
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
          <Button variant="ghost" size="sm" onClick={() => onDelete(section._id!)} type="button">
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardHeader>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleContent>
          <CardContent className="px-4 pb-0 pt-4">
            <Textarea
              placeholder="Section Description (optional)"
              value={description}
              onChange={handleDescriptionChange}
              className="mb-4 resize-none"
            />

            <div className="space-y-3">
              <div className="text-sm font-medium">Lessons</div>
              {section.lessons.map((lesson) => (
                <LessonCard
                  key={lesson._id || `temp-lesson-${lesson.order}`}
                  lesson={lesson}
                  onUpdate={updateLesson}
                  onDelete={deleteLesson}
                />
              ))}
              {section.lessons.length === 0 && (
                <div className="flex h-20 flex-col items-center justify-center rounded border border-dashed">
                  <p className="text-sm text-muted-foreground">No lessons added yet</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4">
            <Button onClick={addLesson} variant="outline" size="sm" className="w-full" type="button">
              <Plus className="mr-2 h-4 w-4" />
              Add Lesson
            </Button>
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

