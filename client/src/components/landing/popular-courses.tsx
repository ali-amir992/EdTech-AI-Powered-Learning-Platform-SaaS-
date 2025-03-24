import {Link} from "react-router-dom"
import { ArrowRight, Star } from "lucide-react"
import courseImage1 from "@/assets/course1.webp"
import courseImage2 from "@/assets/course2.webp"
import courseImage3 from "@/assets/course3.png"
import courseImage4 from "@/assets/course4.jpg"
import courseImage5 from "@/assets/course5.webp"
import courseImage6 from "@/assets/course6.jpeg"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PopularCourses() {
  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      description: "Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer.",
      instructor: "Sarah Johnson",
      rating: 4.8,
      reviews: 2345,
      image: courseImage1,
      category: "Web Development",
      featured: true,
    },
    {
      id: 2,
      title: "Data Science and Machine Learning",
      description: "Master data analysis, visualization, and machine learning algorithms with Python.",
      instructor: "Michael Chen",
      rating: 4.9,
      reviews: 1876,
      image: courseImage2,
      category: "Data Science",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      description: "Learn the principles of user interface and experience design to create stunning digital products.",
      instructor: "Emily Rodriguez",
      rating: 4.7,
      reviews: 1243,
      image: courseImage3,
      category: "Design",
    },
    {
      id: 4,
      title: "Digital Marketing Masterclass",
      description: "Develop comprehensive digital marketing skills from SEO to social media and content strategy.",
      instructor: "David Kim",
      rating: 4.6,
      reviews: 987,
      image: courseImage4,
      category: "Marketing",
    },
    {
      id: 5,
      title: "iOS App Development with Swift",
      description: "Build iOS applications from scratch using Swift and publish them to the App Store.",
      instructor: "Jessica Taylor",
      rating: 4.8,
      reviews: 1532,
      image: courseImage5,
      category: "Mobile Development",
    },
    {
      id: 6,
      title: "Business Leadership and Management",
      description: "Develop essential leadership skills to effectively manage teams and drive business success.",
      instructor: "Robert Wilson",
      rating: 4.7,
      reviews: 1123,
      image: courseImage6,
      category: "Business",
    },
  ]

  return (
    <section className="py-20  px-5 md:px-20 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Most Popular Courses</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Join thousands of students who are already learning with these top-rated courses.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Button variant="outline">Browse Categories</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className="aspect-video relative">
              <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
                {course.featured && <Badge className="absolute top-2 left-2 z-10">Featured</Badge>}
                <Badge variant="secondary" className="absolute top-2 right-2 z-10">
                  {course.category}
                </Badge>
              </div>
              <CardHeader className="p-4">
                <h3 className="text-xl font-semibold line-clamp-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground text-sm">({course.reviews.toLocaleString()} reviews)</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="#">View Course</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="group">
            View All Courses
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}

