import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Play,
} from "lucide-react"

const SectionAccordian = () => {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Course Content</h2>
        <div className="text-sm text-muted-foreground">42 lessons • 12 sections • 42 hours total</div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {[
          {
            title: "Introduction to Advanced Machine Learning",
            lessons: [
              { title: "Course Overview", duration: "10:23", isPreview: true },
              { title: "Setting Up Your Environment", duration: "15:47", isPreview: true },
              { title: "Review of Machine Learning Fundamentals", duration: "28:15" },
            ],
          },
          {
            title: "Deep Neural Networks",
            lessons: [
              { title: "Neural Network Architecture", duration: "32:45" },
              { title: "Activation Functions and Backpropagation", duration: "41:20" },
              { title: "Building Your First Deep Neural Network", duration: "55:18" },
              { title: "Hands-on Project: Digit Recognition", duration: "1:15:42" },
            ],
          },
          {
            title: "Convolutional Neural Networks",
            lessons: [
              { title: "Introduction to CNNs", duration: "28:34" },
              { title: "Convolutional Layers and Pooling", duration: "35:12" },
              { title: "Modern CNN Architectures", duration: "47:53" },
              { title: "Transfer Learning with CNNs", duration: "52:41" },
              { title: "Project: Image Classification", duration: "1:24:15" },
            ],
          },
          {
            title: "Natural Language Processing",
            lessons: [
              { title: "Text Preprocessing Techniques", duration: "31:22" },
              { title: "Word Embeddings", duration: "43:15" },
              { title: "Recurrent Neural Networks", duration: "55:37" },
              { title: "Transformers and Attention Mechanisms", duration: "1:02:48" },
              { title: "Project: Sentiment Analysis", duration: "1:18:29" },
            ],
          },
          {
            title: "Reinforcement Learning",
            lessons: [
              { title: "Introduction to Reinforcement Learning", duration: "38:42" },
              { title: "Markov Decision Processes", duration: "45:19" },
              { title: "Q-Learning and Deep Q Networks", duration: "57:23" },
              { title: "Policy Gradient Methods", duration: "49:51" },
              { title: "Project: Training an RL Agent", duration: "1:32:15" },
            ],
          },
        ].map((section, i) => (
          <AccordionItem key={i} value={`section-${i}`}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-start justify-between">
                <span>{section.title}</span>
                <span className="ml-2 text-sm text-muted-foreground">{section.lessons.length} lessons</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {section.lessons.map((lesson, j) => (
                  <div key={j} className="flex items-center justify-between rounded-md p-2 hover:bg-muted">
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-primary" />
                      <span>
                        {lesson.title}
                        {lesson.isPreview && (
                          <Badge variant="outline" className="ml-2">
                            Preview
                          </Badge>
                        )}
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
  )
}

export default SectionAccordian