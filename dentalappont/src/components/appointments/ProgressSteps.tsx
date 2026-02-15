"use client";

import { ChevronRightIcon, CheckIcon } from "lucide-react";

const PROGRESS_STEPS = [
  "Select Dentist",
  "Choose Time",
  "Confirm",
] as const;

interface ProgressStepsProps {
  currentStep: number;
}

function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const totalSteps = PROGRESS_STEPS.length;

  return (
    <nav
      aria-label="Appointment booking progress"
      className="flex items-center gap-4 mb-8 overflow-x-auto"
    >
      {PROGRESS_STEPS.map((stepName, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isCurrent = currentStep === stepNumber;

        return (
          <div
            key={stepNumber}
            className="flex items-center gap-2 min-w-fit"
          >
            {/* Step Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                    ? "bg-primary/80 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }
              `}
              aria-current={isCurrent ? "step" : undefined}
            >
              {isCompleted ? (
                <CheckIcon className="w-4 h-4" />
              ) : (
                stepNumber
              )}
            </div>

            {/* Step Label */}
            <span
              className={`text-sm whitespace-nowrap transition-colors
                ${
                  isCurrent
                    ? "text-foreground font-medium"
                    : isCompleted
                    ? "text-foreground"
                    : "text-muted-foreground"
                }
              `}
            >
              {stepName}
            </span>

            {/* Arrow */}
            {stepNumber < totalSteps && (
              <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default ProgressSteps;
