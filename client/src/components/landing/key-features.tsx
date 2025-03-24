import { Award, Clock, Lightbulb, Wallet } from "lucide-react"

export function KeyFeatures() {
  const features = [
    {
      icon: Lightbulb,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience and proven expertise in their fields.",
    },
    {
      icon: Clock,
      title: "Learn at Your Own Pace",
      description:
        "Access course content anytime, anywhere. Study on your schedule with lifetime access to all materials.",
    },
    {
      icon: Award,
      title: "Certificates of Completion",
      description: "Earn recognized certificates to showcase your new skills and boost your professional profile.",
    },
    {
      icon: Wallet,
      title: "Affordable Pricing",
      description:
        "Quality education shouldn't break the bank. Our courses offer exceptional value at competitive prices.",
    },
  ]

  return (
    <section className="py-20 px-5 md:px-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why Choose EduPro?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform is designed to provide you with the best learning experience possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

