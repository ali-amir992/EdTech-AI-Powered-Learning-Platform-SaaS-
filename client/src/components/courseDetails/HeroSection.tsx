import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Users, Clock, Calendar, Globe } from "lucide-react";
import { ICourse } from "@/types";

interface HeroSectionProps {
  course: ICourse;
}

const HeroSection: React.FC<HeroSectionProps> = ({course} ) => {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5">
        <img
          src={course?.thumbnail}
          alt="Course thumbnail"
          width={1600}
          height={600}
          className="h-full w-full object-cover opacity-40"
        />
      </div>
      <div className="container relative z-10 py-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Badges */}
          <div className="mb-6 flex items-center gap-2">
            <Badge variant="outline" className="bg-background/80 backdrop-blur">Bestseller</Badge>
            <Badge variant="outline" className="bg-background/80 backdrop-blur">Updated June 2023</Badge>
          </div>

          {/* Title and Description */}
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            {course?.title}
          </h1>
          <p className="mb-6 text-xl text-muted-foreground md:text-2xl">
            {course?.description}
          </p>

          {/* Course Stats */}
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm md:text-base">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <Star className="h-5 w-5 fill-primary text-primary" />
              <Star className="h-5 w-5 fill-primary text-primary" />
              <Star className="h-5 w-5 fill-primary text-primary" />
              <Star className="h-5 w-5 fill-primary/50 text-primary" />
              <span className="ml-2 font-medium">4.8/5</span>
              <span className="text-muted-foreground">(2,546 ratings)</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course?.studentsEnrolled.length}</span> <span>students enrolled</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>42 hours of content</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Last updated: June 2023</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>English</span>
            </div>
          </div>

          {/* Instructor Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10 border-2 border-background">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={course?.instructor.name} />
                <AvatarFallback>{course?.instructor.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{course?.instructor.name}</p>
                <p className="text-xs text-muted-foreground">{course?.instructor.about}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
