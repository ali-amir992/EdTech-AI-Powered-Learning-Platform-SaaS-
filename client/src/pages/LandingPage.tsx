import { Hero } from "@/components/landing/hero"
import { KeyFeatures } from "@/components/landing/key-features"
import { PopularCourses } from "@/components/landing/popular-courses"
import { Testimonials } from "@/components/landing/testimonials"
import { CtaSection } from "@/components/landing/cta-section"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-1">
        <Hero />
        <KeyFeatures />
        <PopularCourses />
        <Testimonials />
        <CtaSection />
      </main>
    </div>
  )
}

