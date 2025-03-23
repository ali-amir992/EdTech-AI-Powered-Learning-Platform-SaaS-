import { Hero } from "@/components/landing/hero"
import { KeyFeatures } from "@/components/landing/key-features"
import { PopularCourses } from "@/components/landing/popular-courses"
import { Testimonials } from "@/components/landing/testimonials"
import { CtaSection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"
// import { Navbar } from "@/components/landing/"

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
      <Footer />
    </div>
  )
}

