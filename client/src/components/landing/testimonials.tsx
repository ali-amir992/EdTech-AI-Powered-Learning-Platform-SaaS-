import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function Testimonials() {
    const testimonials = [
        {
            id: 1,
            quote:
                "The courses on EduPro completely transformed my career. I went from knowing nothing about web development to landing a job as a frontend developer in just 6 months. The instructors are amazing and the content is top-notch.",
            name: "Alex Johnson",
            title: "Frontend Developer at TechCorp",
            image: "/placeholder.svg?height=100&width=100",
        },
        {
            id: 2,
            quote:
                "As someone who was looking to switch careers, EduPro provided me with all the resources I needed. The data science track was comprehensive and practical. I'm now working in my dream field thanks to these courses.",
            name: "Samantha Lee",
            title: "Data Analyst at DataViz",
            image: "/placeholder.svg?height=100&width=100",
        },
        {
            id: 3,
            quote:
                "The flexibility of learning at my own pace while still getting quality education was exactly what I needed. The business courses helped me launch my own startup, and I still refer back to the materials regularly.",
            name: "Marcus Williams",
            title: "Founder & CEO at GrowthStart",
            image: "/placeholder.svg?height=100&width=100",
        },
    ]

    const [activeIndex, setActiveIndex] = useState(0)
    const [autoplay, setAutoplay] = useState(true)

    useEffect(() => {
        if (!autoplay) return

        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % testimonials.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [autoplay, testimonials.length])

    const handlePrev = () => {
        setAutoplay(false)
        setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
    }

    const handleNext = () => {
        setAutoplay(false)
        setActiveIndex((current) => (current + 1) % testimonials.length)
    }

    return (
        <section className="py-20 bg-background">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">What Our Students Say</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Thousands of students have achieved their goals with EduPro. Here are some of their stories.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {testimonials.map((testimonial) => (
                                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                                    <Card className="border-none shadow-lg">
                                        <CardContent className="p-8">
                                            <Quote className="h-12 w-12 text-primary/20 mb-4" />
                                            <p className="text-lg mb-6 italic">{testimonial.quote}</p>
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                                                    <img
                                                        src={testimonial.image || "/placeholder.svg"}
                                                        alt={testimonial.name}
                                                        className="object-cover h-full w-full"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">{testimonial.name}</h4>
                                                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            onClick={handlePrev}
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {testimonials.map((_, index) => (
                            <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                className={`w-2 h-2 p-0 rounded-full ${index === activeIndex ? "bg-primary" : "bg-muted"}`}
                                onClick={() => {
                                    setAutoplay(false)
                                    setActiveIndex(index)
                                }}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            onClick={handleNext}
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

