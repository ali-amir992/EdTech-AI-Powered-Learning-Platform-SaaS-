import CourseDetailsForm from "@/components/courseBuilder/CourseBuilderForm";
import SectionsAndLessonsForm from "@/components/courseBuilder/SectionAndLessonForm";
import PublishCourse from "@/components/courseBuilder/PublishCourse";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";


const CourseBuilder = () => {
  const { step } = useSelector((state: RootState) => state.courseBuilder);

  return (
    <div>
      {step === 1 && <CourseDetailsForm />}
      {step === 2 && <SectionsAndLessonsForm />}
      {step === 3 && <PublishCourse />}
    </div>
  );
};

export default CourseBuilder;