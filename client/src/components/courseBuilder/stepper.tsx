import { CheckIcon } from "lucide-react"

interface Step {
  label: string
  description: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                index + 1 < currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : index + 1 === currentStep
                    ? "border-primary text-primary"
                    : "border-muted-foreground/30 text-muted-foreground/30"
              }`}
            >
              {index + 1 < currentStep ? <CheckIcon className="h-5 w-5" /> : <span>{index + 1}</span>}
            </div>
            <div className="mt-2 text-center">
              <div
                className={`text-sm font-medium ${
                  index + 1 <= currentStep ? "text-primary" : "text-muted-foreground/50"
                }`}
              >
                {step.label}
              </div>
              <div
                className={`text-xs ${index + 1 <= currentStep ? "text-muted-foreground" : "text-muted-foreground/50"}`}
              >
                {step.description}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`absolute left-[calc(100%+0.5rem)] top-5 h-[2px] w-[calc(100%-2rem)] -translate-y-1/2 ${
                  index + 1 < currentStep ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

