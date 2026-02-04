"use client";

import React from "react"

import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";

export interface Step {
  id: string;
  title: string;
  description: string;
  icon?: React.ElementType;
}

interface ProcessStepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function ProcessStepper({
  steps,
  currentStep,
  className,
}: ProcessStepperProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop Stepper */}
      <div className="hidden md:flex items-center justify-center">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center gap-3">
                {/* Step Circle */}
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isActive
                        ? "border-primary text-primary bg-primary/10"
                        : "border-border text-muted-foreground bg-secondary/50"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : Icon ? (
                    <Icon className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>

                {/* Step Info */}
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isActive || isCompleted
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                  <span className="text-xs text-muted-foreground hidden lg:block">
                    {step.description}
                  </span>
                </div>
              </div>

              {/* Connector */}
              {!isLast && (
                <div className="mx-4 flex items-center">
                  <ChevronRight
                    className={cn(
                      "h-5 w-5",
                      isCompleted ? "text-primary" : "text-border"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Stepper */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-foreground">
            Passo {currentStep + 1} de {steps.length}
          </span>
          <span className="text-sm text-primary font-medium">
            {steps[currentStep]?.title}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          />
        </div>

        {/* Current Step Description */}
        <p className="mt-2 text-xs text-muted-foreground">
          {steps[currentStep]?.description}
        </p>
      </div>
    </div>
  );
}

// Mini version for side display
export function ProcessStepperMini({
  steps,
  currentStep,
  className,
}: ProcessStepperProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-3 p-2 rounded-lg transition-all",
              isActive && "bg-primary/10"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold transition-all",
                isCompleted
                  ? "bg-primary text-primary-foreground"
                  : isActive
                    ? "border-2 border-primary text-primary"
                    : "border border-border text-muted-foreground"
              )}
            >
              {isCompleted ? <Check className="h-3 w-3" /> : index + 1}
            </div>
            <span
              className={cn(
                "text-sm",
                isActive || isCompleted
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              {step.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
