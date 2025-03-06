import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Award, Clock, Globe, Heart, Play, Share2, ShoppingCart, Target } from "lucide-react";
import { ICourse } from "@/types";

interface StickyCourseCardProps {
  course: ICourse;
}
export function StickyCourseCard({ course }: StickyCourseCardProps) {
  return (
    <div className="sticky top-24">
      <Card className="overflow-hidden">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={course.thumbnail}
            alt="Course preview"
            width={600}
            height={300}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full">
              <Play className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="mb-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold">{course.price}</span>
            <Badge className="ml-auto">55% off</Badge>
          </div>
          <div className="mb-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Sale ends in 2 days</span>
            </p>
          </div>
          <div className="space-y-3">
            <Button className="w-full">Buy Now</Button>
            <Button variant="outline" className="w-full">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">30-Day Money-Back Guarantee</div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t bg-muted/50 px-6 py-4">
          <h3 className="font-medium">This course includes:</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <Play className="mt-0.5 h-4 w-4 text-primary" />
              <span>42 hours on-demand video</span>
            </li>
            <li className="flex items-start gap-2">
              <Globe className="mt-0.5 h-4 w-4 text-primary" />
              <span>Full lifetime access</span>
            </li>
            <li className="flex items-start gap-2">
              <Target className="mt-0.5 h-4 w-4 text-primary" />
              <span>12 hands-on projects</span>
            </li>
            <li className="flex items-start gap-2">
              <Award className="mt-0.5 h-4 w-4 text-primary" />
              <span>Certificate of completion</span>
            </li>
          </ul>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="flex-1">
              <Heart className="mr-2 h-4 w-4" />
              Wishlist
            </Button>
            <Button variant="ghost" size="sm" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}