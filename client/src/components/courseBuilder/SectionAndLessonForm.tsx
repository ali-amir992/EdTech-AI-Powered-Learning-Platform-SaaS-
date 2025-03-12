import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { addSection, addLesson, setStep } from "@/store/slices/courseBuilderSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const SectionsAndLessonsForm = () => {
  const dispatch = useAppDispatch();
  const courseDetails = useSelector((state:RootState) => state.courseBuilder.courseDetails);

  const [sectionTitle, setSectionTitle] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonVideoUrl, setLessonVideoUrl] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  const handleAddSection = () => {
    if (sectionTitle) {
      const newSection = {
        _id: Date.now().toString(), // Temporary ID
        title: sectionTitle,
        lessons: [],
      };
      dispatch(addSection(newSection));
      setSectionTitle("");
    }
  };

  const handleAddLesson = () => {
    if (selectedSectionId && lessonTitle && lessonVideoUrl) {
      const newLesson = {
        _id: Date.now().toString(), // Temporary ID
        title: lessonTitle,
        videoUrl: lessonVideoUrl,
      };
      dispatch(addLesson({ sectionId: selectedSectionId, lesson: newLesson }));
      setLessonTitle("");
      setLessonVideoUrl("");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Section Title</Label>
        <Input
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          placeholder="Section Title"
        />
        <Button onClick={handleAddSection}>Add Section</Button>
      </div>

      {courseDetails.sections?.map((section) => (
        <div key={section._id}>
          <h3>{section.title}</h3>
          <div>
            <Label>Lesson Title</Label>
            <Input
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              placeholder="Lesson Title"
            />
            <Label>Lesson Video URL</Label>
            <Input
              value={lessonVideoUrl}
              onChange={(e) => setLessonVideoUrl(e.target.value)}
              placeholder="Lesson Video URL"
            />
            <Button onClick={() => setSelectedSectionId(section._id)}>Add Lesson</Button>
          </div>
        </div>
      ))}

      <Button onClick={() => dispatch(setStep(3))}>Next</Button>
    </div>
  );
};

export default SectionsAndLessonsForm;