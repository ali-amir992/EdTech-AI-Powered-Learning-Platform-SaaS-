import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types";
import { Award, MessageSquare, Star, Users } from "lucide-react";

interface InstructorSectionProps {
  instructor : IUser;
}
export function InstructorSection({instructor}: InstructorSectionProps) {
  return (
    <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold">Your Instructor</h2>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Avatar className="h-24 w-24 border-2 border-background">
          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Dr. Sarah Johnson" />
          <AvatarFallback>SJ</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-xl font-medium">{instructor.name}</h3>
          <p className="text-muted-foreground">AI Researcher & Professor</p>
          <div className="my-2 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm">4.9 Instructor Rating</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span className="text-sm">24 Courses</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="text-sm">125,000+ Students</span>
            </div>
          </div>
          <p className="mt-2 text-sm">
            Dr. Sarah Johnson is a leading AI researcher with over 15 years of experience in machine learning
            and deep learning. She holds a Ph.D. in Computer Science from MIT and has published numerous papers
            in top AI conferences. Currently, she divides her time between teaching at Stanford University and
            leading research at a major tech company. Her teaching approach combines theoretical foundations
            with practical, hands-on projects to ensure students gain both understanding and applicable skills.
          </p>
          <Button variant="outline" size="sm" className="mt-4">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message Instructor
          </Button>
        </div>
      </div>
    </div>
  );
}