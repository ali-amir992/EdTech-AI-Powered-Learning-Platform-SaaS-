import { CheckCircle, Clock, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { CourseFormData, SectionFormData } from "@/types"

interface Step3PreviewAndPublishProps {
  courseData: CourseFormData
  sections: SectionFormData[]
  onPublish: () => void
  onBack: () => void
}

export function Step3PreviewAndPublish({ courseData, sections, onPublish, onBack }: Step3PreviewAndPublishProps) {
  // Calculate total lessons and estimated duration
  const totalLessons = sections.reduce((total, section) => total + section.lessons.length, 0)

  // Calculate total duration from lesson durations
  const totalDurationSeconds = sections.reduce(
    (total, section) =>
      total +
      section.lessons.reduce((sectionTotal, lesson) => sectionTotal + Number.parseInt(lesson.duration || "0"), 0),
    0,
  )

  // Format duration as hours and minutes
  const hours = Math.floor(totalDurationSeconds / 3600)
  const minutes = Math.floor((totalDurationSeconds % 3600) / 60)
  const formattedDuration =
    hours > 0
      ? `${hours} hour${hours > 1 ? "s" : ""} ${minutes > 0 ? `${minutes} min` : ""}`
      : `${minutes} minute${minutes !== 1 ? "s" : ""}`

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
            <p className="text-muted-foreground mb-4">{courseData.description}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm">{totalLessons} lessons</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">{formattedDuration}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Course Content</h3>
            <Accordion type="multiple" defaultValue={sections.map((s, i) => `section-${i}`)}>
              {sections.map((section, index) => (
                <AccordionItem key={index} value={`section-${index}`}>
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
                        <div
                          key={lessonIndex}
                          className="flex items-center justify-between py-2 border-b last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {index + 1}.{lessonIndex + 1} {lesson.title}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {lesson.videoUrl
                              ? lesson.duration
                                ? `${Math.floor(Number.parseInt(lesson.duration) / 60)}:${(Number.parseInt(lesson.duration) % 60).toString().padStart(2, "0")}`
                                : "Video"
                              : "No video"}
                          </div>
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
              {courseData.thumbnail ? (
                <img
                  src={URL.createObjectURL(courseData.thumbnail) || "/placeholder.svg"}
                  alt={courseData.title}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">No thumbnail</p>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{courseData.title}</h3>
              <div className="flex items-center gap-1 mb-4">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium">{courseData.price}</span>
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                <p>Category: {courseData.category}</p>
                <p>Language: {courseData.language}</p>
                <p>Status: {courseData.status}</p>
                <p>
                  {totalLessons} lessons • {formattedDuration}
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
        <Button onClick={onPublish}>{courseData.status === "Draft" ? "Save as Draft" : "Publish Course"}</Button>
      </div>
    </div>
  )
}

