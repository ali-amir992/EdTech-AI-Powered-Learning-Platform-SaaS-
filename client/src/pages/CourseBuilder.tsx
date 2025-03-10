"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { CourseBuilder } from "@/components/course-builder/course-builder"
import type { CourseMetadata, CourseSectionWithLessons } from "@/types/course"

export default function CreateCoursePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [courseMetadata, setCourseMetadata] = useState<CourseMetadata>({
    name: "",
    description: "",
    thumbnail: null,
    price: 0,
    currency: "USD",
    category: "",
  })
  const [courseSections, setCourseSections] = useState<CourseSectionWithLessons[]>([])

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleMetadataSubmit = (metadata: CourseMetadata) => {
    setCourseMetadata(metadata)
    handleNextStep()
  }

  const handleSectionsSubmit = (sections: CourseSectionWithLessons[]) => {
    setCourseSections(sections)
    handleNextStep()
  }

  const handlePublishCourse = () => {
    // In a real app, this would send the data to an API
    toast.success("Course published successfully!")

    // Simulate API call
    setTimeout(() => {
      router.push("/dashboard/courses")
    }, 2000)
  }

  return (
    <div className="container max-w-5xl py-8">
      <CourseBuilder
        currentStep={currentStep}
        courseMetadata={courseMetadata}
        courseSections={courseSections}
        onMetadataSubmit={handleMetadataSubmit}
        onSectionsSubmit={handleSectionsSubmit}
        onPublishCourse={handlePublishCourse}
        onPrevStep={handlePrevStep}
      />
    </div>
  )
}

