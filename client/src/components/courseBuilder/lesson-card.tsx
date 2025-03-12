"use client"

import type React from "react"

import { useState } from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { VideoUpload } from "@/components/courseBuilder/video-upload"
import type { LessonFormData } from "@/types"

interface LessonCardProps {
  lesson: LessonFormData
  onUpdate: (lesson: LessonFormData) => void
  onDelete: (lessonId: string) => void
}

export function LessonCard({ lesson, onUpdate, onDelete }: LessonCardProps) {
  const [title, setTitle] = useState(lesson.title)
  const [description, setDescription] = useState(lesson.description || "")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    onUpdate({
      ...lesson,
      title: newTitle,
    })
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value
    setDescription(newDescription)
    onUpdate({
      ...lesson,
      description: newDescription,
    })
  }

  const handleVideoUpload = (file: File) => {
    setIsUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)

        // In a real app, you would get the URL from your backend
        const fakeVideoUrl = URL.createObjectURL(file)

        // Calculate duration (in a real app, you would extract this from the video)
        const fakeDuration = Math.floor(Math.random() * 600).toString() // Random duration up to 10 minutes

        onUpdate({
          ...lesson,
          videoFile: file,
          videoUrl: fakeVideoUrl,
          duration: fakeDuration,
        })
      }
    }, 200)
  }

  return (
    <Card className="border bg-card">
      <CardHeader className="p-3 bg-muted">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Input
              placeholder="Lesson Title"
              value={title}
              onChange={handleTitleChange}
              className="border-none bg-transparent px-0 text-sm font-medium shadow-none focus-visible:ring-0"
            />
          </div>
          <Button variant="ghost" size="sm" onClick={() => onDelete(lesson._id!)} type="button">
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-3">
        <Textarea
          placeholder="Lesson Description (optional)"
          value={description}
          onChange={handleDescriptionChange}
          className="mb-3 resize-none text-sm"
          rows={2}
        />

        <VideoUpload
          videoUrl={lesson.videoUrl}
          onUpload={handleVideoUpload}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
        />
      </CardContent>
    </Card>
  )
}

