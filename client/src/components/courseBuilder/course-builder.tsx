import { Stepper } from "@/components/courseBuilder/stepper";
import { Step1CourseDetails } from "@/components/courseBuilder/step1-course-details";
import { Step2SectionsBuilder } from "@/components/courseBuilder/step2-sections-builder";
import { Step3PreviewAndPublish } from "@/components/courseBuilder/step3-preview-and-publish";
import { ICourse } from "@/types";

interface CourseBuilderProps {
  currentStep: number;
  courseData: ICourse;
  onCourseDataSubmit: (data: ICourse) => void;
  onSectionsSubmit: (sections: ICourse["sections"]) => void;
  onPublishCourse: () => void;
  onPrevStep: () => void;
}

export function CourseBuilder({
  currentStep,
  courseData,
  onCourseDataSubmit,
  onSectionsSubmit,
  onPublishCourse,
  onPrevStep,
}: CourseBuilderProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
        <p className="mt-2 text-muted-foreground">Build your course in a few simple steps</p>
      </div>

      <Stepper
        steps={[
          { label: "Course Details", description: "Basic information" },
          { label: "Content", description: "Sections & lessons" },
          { label: "Review & Publish", description: "Final review" },
        ]}
        currentStep={currentStep}
      />

      <div className="mt-8">
        {currentStep === 1 && <Step1CourseDetails initialData={courseData} onSubmit={onCourseDataSubmit} />}

        {currentStep === 2 && (
          <Step2SectionsBuilder
            initialSections={courseData.sections} // Extracting sections from courseData
            onSubmit={onSectionsSubmit}
            onBack={onPrevStep}
          />
        )}

        {currentStep === 3 && (
          <Step3PreviewAndPublish
            courseData={courseData}
            sections={courseData.sections} // Extracting sections from courseData
            onPublish={onPublishCourse}
            onBack={onPrevStep}
          />
        )}
      </div>
    </div>
  );
}
