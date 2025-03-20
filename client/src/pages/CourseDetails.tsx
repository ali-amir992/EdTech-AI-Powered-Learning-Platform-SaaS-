import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "@/services/operations/Course";
import { ICourse } from "@/types";
import {WhatYouWillLearn,ReviewCarousel, HeroSection, Requirements, WhoIsThisCourseFor, InstructorSection, StickyCourseCard } from "@/components/courseDetails";
// import { ReviewCarousel } from "@/components/courseDetails/review-carasoul";
import SectionAccordian from "@/components/courseDetails/SectionAccordian";
import { Loader2 } from "lucide-react";

export default function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<ICourse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      if (!courseId) return;

      setLoading(true);
      const courseData = await getCourseById(courseId);
      setCourse(courseData);
      setLoading(false);
    }

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      {course ? <HeroSection course={course} /> : <p>Course not found</p>}

      <section className="container mx-auto pl-6 md:pl-12 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            
            <WhatYouWillLearn />
            <Requirements />

            {course ? <SectionAccordian sections={course.sections} /> : null}
            
            <WhoIsThisCourseFor />
            {course ? <InstructorSection instructor = {course?.instructor} /> : null}
            <ReviewCarousel />
          </div>

          <div className="md:col-span-1">
          {course ? <StickyCourseCard course = {course}/> : null}
          </div>
        </div>
      </section>
    </div>
  );
}