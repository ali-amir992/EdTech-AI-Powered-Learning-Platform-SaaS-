import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export function Hero() {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/courses');
  };
    return (

        <section className="relative bg-gradient-to-r from-primary/10 via-background to-primary/5 flex items-center justify-center min-h-screen">
        {/* Content */}
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            {/* Headline */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Unlock Your Potential with{" "}
              <span className="text-primary">World-Class Learning</span>
            </h1>
  
            {/* Subheadline */}
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Access thousands of courses in tech, business, arts, and more, taught by industry experts.
            </p>
  
            {/* Call-to-Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleNavigate} size="lg" className="text-base group">
                Start Learning Today
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" onClick={handleNavigate} variant="outline" className="text-base">
                Browse Courses
              </Button>
            </div>
  
            {/* Key Features Grid */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-muted-foreground">
              <div className="flex flex-col items-center p-4 bg-background/50 rounded-lg border border-border">
                <div className="h-6 w-6 rounded-full bg-primary mb-2" />
                <span>10,000+ Courses</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-background/50 rounded-lg border border-border">
                <div className="h-6 w-6 rounded-full bg-primary mb-2" />
                <span>Expert Instructors</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-background/50 rounded-lg border border-border">
                <div className="h-6 w-6 rounded-full bg-primary mb-2" />
                <span>Lifetime Access</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-background/50 rounded-lg border border-border">
                <div className="h-6 w-6 rounded-full bg-primary mb-2" />
                <span>Money-Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              className="text-background"
            ></path>
          </svg>
        </div>
      </section>
    );
}