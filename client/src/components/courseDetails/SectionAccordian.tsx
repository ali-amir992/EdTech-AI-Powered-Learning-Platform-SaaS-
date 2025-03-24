import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Play } from "lucide-react";
import { ISection } from "@/types";

interface SectionAccordianProps {
  sections: ISection[];
}

const SectionAccordian = ({ sections }: SectionAccordianProps) => {
  if (!sections || sections.length === 0) {
    return <p className="text-muted-foreground">No course content available.</p>;
  }

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Course Content</h2>
        <div className="text-sm text-muted-foreground">
          <div className="text-sm text-muted-foreground">
            {sections?.reduce((acc, section) => acc + (section.lessons?.length || 0), 0) || 0} lessons • {sections?.length || 0} sections
          </div>

        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {sections.map((section, i) => (
          <AccordionItem key={i} value={`section-${i}`}>
            <AccordionTrigger className="hover:no-underline">

              <div className="flex items-start justify-between">
                <span>{section.title}</span>
                <span className="ml-2 text-sm text-muted-foreground">{section.lessons?.length || 0} lessons</span>
              </div>

            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {section.lessons.map((lesson, j) => (
                  <div key={j} className="flex items-center  justify-between rounded-md p-2 hover:bg-muted">
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      <span>
                        {lesson.title}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SectionAccordian;
