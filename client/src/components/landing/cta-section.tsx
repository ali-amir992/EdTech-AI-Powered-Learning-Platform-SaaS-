import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Join Over 1 Million Learners Worldwide</h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Start your learning journey today and unlock new opportunities for your career and personal growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-base group">
              Sign Up Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base border-primary-foreground/20 text-primary hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              Learn More
            </Button>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/70">No credit card required. Start with a free account.</p>
        </div>
      </div>
    </section>
  )
}

