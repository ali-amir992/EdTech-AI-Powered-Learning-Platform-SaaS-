import * as React from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const reviews = [
  {
    id: 1,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MC",
    rating: 5,
    date: "2 months ago",
    comment:
      "This course exceeded my expectations. The instructor explains complex concepts in a way that's easy to understand, and the hands-on projects helped me apply what I learned immediately. I've already landed a job as a machine learning engineer thanks to the skills I gained from this course!",
  },
  {
    id: 2,
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ER",
    rating: 5,
    date: "3 months ago",
    comment:
      "As someone with a background in software engineering but limited ML experience, this course was perfect. The progression from basic to advanced topics was well-paced, and the instructor's explanations were clear and concise. The projects are challenging but doable, and they really help reinforce the concepts.",
  },
  {
    id: 3,
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DK",
    rating: 4,
    date: "1 month ago",
    comment:
      "Great course overall. The content is comprehensive and up-to-date with the latest ML techniques. My only suggestion would be to include more examples with real-world datasets. Otherwise, it's an excellent resource for anyone serious about machine learning.",
  },
  {
    id: 4,
    name: "Sophia Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SP",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "I've taken several ML courses online, and this is by far the best one. The instructor doesn't just teach you how to use libraries but explains the underlying mathematics and intuition behind each algorithm. The section on neural networks was particularly enlightening.",
  },
  {
    id: 5,
    name: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JW",
    rating: 5,
    date: "1 month ago",
    comment:
      "This course helped me transition from a data analyst to a machine learning engineer. The curriculum is well-structured, and the instructor is clearly an expert in the field. I especially appreciated the sections on model deployment and optimization.",
  },
]

export function ReviewCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {reviews.map((review) => (
            <div key={review.id} className="min-w-0 flex-[0_0_100%] pl-4 md:flex-[0_0_50%]">
              <Card className="mb-4 h-full">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{review.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.name}</div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={scrollPrev}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous review</span>
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={scrollNext}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next review</span>
        </Button>
      </div>
    </div>
  )
}

