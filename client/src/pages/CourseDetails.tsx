// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Navbar } from "@/components/common/Navbar";
// import { getCourseById, Course } from "@/services/operations/Course";

// export default function CourseDetail() {


//     const { courseId } = useParams(); // Get courseId from URL params
//     const [course, setCourse] = useState<Course | null>();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchCourse() {
//             if (!courseId) return;

//             setLoading(true);
//             const courseData = await getCourseById(courseId);
//             setCourse(courseData);
//             setLoading(false);
//         }

//         fetchCourse();
//     }, [courseId]);
//     if (loading) return <div className="text-center py-10">Loading...</div>;

//     return (
//         <div className="min-h-screen flex flex-col">
//             <Navbar isAuthenticated={false} />
//             <main className="container px-12 py-8">
//                 {course ? (
//                     <div>
//                         <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
//                         <p className="text-lg text-muted-foreground">{course.description}</p>
//                         <p className="mt-4 font-semibold">Price: ${course.price}</p>
//                     </div>
//                 ) : (
//                     <p className="text-center text-gray-500">Course not found</p>
//                 )}
//             </main>
//         </div>
//     );
// }

import type { Metadata } from "next"
import {Link} from "react-router-dom"
import {
  Award,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Globe,
  Heart,
  MessageSquare,
  Play,
  Share2,
  ShoppingCart,
  Star,
  Target,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewCarousel } from "@/components/courseDetails/review-carasoul"

export const metadata: Metadata = {
  title: "Advanced Machine Learning: From Theory to Practice",
  description:
    "Master the fundamentals and advanced techniques of machine learning with hands-on projects and real-world applications.",
}

export default function CoursePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5">
        <img
            src="/placeholder.svg?height=600&width=1600"
            alt="Course thumbnail"
            width={1600}
            height={600}
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="container relative z-10 py-12 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center gap-2">
              <Badge variant="outline" className="bg-background/80 backdrop-blur">
                Bestseller
              </Badge>
              <Badge variant="outline" className="bg-background/80 backdrop-blur">
                Updated June 2023
              </Badge>
            </div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Advanced Machine Learning: From Theory to Practice
            </h1>
            <p className="mb-6 text-xl text-muted-foreground md:text-2xl">
              Master the fundamentals and advanced techniques of machine learning with hands-on projects and real-world
              applications.
            </p>
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
                <span>32,456 students enrolled</span>
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10 border-2 border-background">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Sarah Johnson" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">AI Researcher & Professor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left Column - Course Content */}
          <div className="md:col-span-2">
            {/* Progress Bar (for enrolled users) */}
            <div className="mb-8 rounded-lg border bg-card p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">Your Progress</h3>
                <span className="text-sm text-muted-foreground">32% Complete</span>
              </div>
              <Progress value={32} className="h-2" />
              <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                <span>14/42 lessons completed</span>
                <Link to="#current-lesson" className="text-primary hover:underline">
                  Continue Learning
                </Link>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">What You'll Learn</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Understand the mathematical foundations of machine learning algorithms",
                  "Build and train neural networks using PyTorch and TensorFlow",
                  "Implement advanced computer vision and natural language processing models",
                  "Deploy machine learning models to production environments",
                  "Optimize model performance and handle large-scale datasets",
                  "Apply reinforcement learning to solve complex problems",
                  "Master feature engineering and data preprocessing techniques",
                  "Develop a portfolio of real-world machine learning projects",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">Requirements</h2>
              <ul className="ml-6 list-disc space-y-2">
                <li>Basic understanding of Python programming</li>
                <li>Familiarity with linear algebra and calculus concepts</li>
                <li>Basic knowledge of statistics and probability</li>
                <li>A computer capable of running Python and machine learning libraries</li>
              </ul>
            </div>

            {/* Course Content */}
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

            {/* Who This Course Is For */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">Who This Course Is For</h2>
              <ul className="ml-6 list-disc space-y-2">
                <li>Data scientists looking to deepen their machine learning expertise</li>
                <li>Software engineers interested in specializing in AI and ML</li>
                <li>Researchers who want to apply machine learning to their domain</li>
                <li>Students pursuing advanced degrees in computer science or related fields</li>
                <li>Professionals looking to transition into machine learning roles</li>
              </ul>
            </div>

            {/* Instructor */}
            <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold">Your Instructor</h2>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Avatar className="h-24 w-24 border-2 border-background">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Dr. Sarah Johnson" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-medium">Dr. Sarah Johnson</h3>
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

            {/* Reviews */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">Student Reviews</h2>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-4 sm:w-48">
                  <div className="text-5xl font-bold text-primary">4.8</div>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary/50 text-primary" />
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">Course Rating</div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const percentage = rating === 5 ? 78 : rating === 4 ? 15 : rating === 3 ? 5 : rating === 2 ? 1 : 1
                    return (
                      <div key={rating} className="mb-1 flex items-center gap-2">
                        <div className="flex w-20 items-center justify-end gap-1">
                          <span className="text-sm">{rating}</span>
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        </div>
                        <div className="h-2 flex-1 rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <div className="w-12 text-right text-sm text-muted-foreground">{percentage}%</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <Tabs defaultValue="reviews">
                <TabsList className="mb-4">
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="questions">Q&A</TabsTrigger>
                </TabsList>
                <TabsContent value="reviews">
                  <ReviewCarousel />
                </TabsContent>
                <TabsContent value="questions">
                  <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
                    <h3 className="text-lg font-medium">Have a question about this course?</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Ask the instructor or other students and get your questions answered.
                    </p>
                    <Button className="mt-4">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Ask a Question
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Column - Sticky Card */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <Card className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=600"
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
                    <span className="text-3xl font-bold">$89.99</span>
                    <span className="text-lg text-muted-foreground line-through">$199.99</span>
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
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary/5 py-12">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-lg border bg-card p-8 text-center shadow-lg">
            <h2 className="mb-4 text-3xl font-bold">Ready to advance your machine learning skills?</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Join over 32,000 students and start your journey to becoming a machine learning expert today.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="gap-2">
                Enroll Now
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Try Free Preview
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">30-day money-back guarantee. Full lifetime access.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

