"use client"

import Image from "next/image"
import { CheckCircle, Clock, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { CourseMetadata, CourseSectionWithLessons } from "@/types/course"

interface Step3PreviewAndPublishProps {
  courseMetadata: CourseMetadata
  courseSections: CourseSectionWithLessons[]
  onPublish: () => void
  onBack: () => void
}

export function Step3PreviewAndPublish({
  courseMetadata,
  courseSections,
  onPublish,
  onBack,
}: Step3PreviewAndPublishProps) {
  // Calculate total lessons and estimated duration
  const totalLessons = courseSections.reduce((total, section) => total + section.lessons.length, 0)

  // In a real app, you would calculate this from video durations
  const estimatedDuration = `${Math.max(1, Math.round(totalLessons * 1.5))} hours`

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Review Your Course</h2>
        <p className="text-muted-foreground">Preview your course before publishing</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Course Overview</h3>
            <p className="text-muted-foreground mb-4">{courseMetadata.description}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm">{totalLessons} lessons</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">{estimatedDuration}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Course Content</h3>
            <Accordion type="multiple" className="w-full">
              {courseSections.map((section, index) => (
                <AccordionItem key={section.id} value={section.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <div className="text-left">
                        <span className="font-medium">
                          Section {index + 1}: {section.title}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground mr-2">{section.lessons.length} lessons</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 space-y-2">
                      {section.description && (
                        <p className="text-sm text-muted-foreground mb-2">{section.description}</p>
                      )}
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {index + 1}.{lessonIndex + 1} {lesson.title}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">{lesson.videoUrl ? "Video" : "No video"}</div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div>
          <div className="sticky top-8 rounded-lg border overflow-hidden">
            <div className="aspect-video relative">
              {courseMetadata.thumbnail ? (
                <Image
                  src={URL.createObjectURL(courseMetadata.thumbnail) || "/placeholder.svg"}
                  alt={courseMetadata.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">No thumbnail</p>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{courseMetadata.name}</h3>
              <div className="flex items-center gap-1 mb-4">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">
                  {courseMetadata.price} {courseMetadata.currency}
                </span>
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                <p>Category: {courseMetadata.category}</p>
                <p>
                  {totalLessons} lessons • {estimatedDuration}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={onPublish}>Publish Course</Button>
      </div>
    </div>
  )
}

