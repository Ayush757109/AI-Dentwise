"use client";

import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { CheckCircleIcon } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Essential dental appointment booking",
    features: [
      "Unlimited appointment booking",
      "Find dentists near you",
      "Basic text chat support",
      "Appointment reminders",
    ],
    buttonText: "Get Started Free",
    highlighted: false,
  },
  {
    name: "AI Basic",
    price: "$9",
    description: "AI consultations + appointment booking",
    features: [
      "Everything in Free",
      "10 AI voice calls per month",
      "AI dental guidance",
      "Symptom assessment",
      "Priority support",
      "Call history & recordings",
    ],
    buttonText: "Start AI Basic",
    highlighted: true,
  },
  {
    name: "AI Pro",
    price: "$19",
    description: "Unlimited AI consultations",
    features: [
      "Everything in AI Basic",
      "Unlimited AI voice calls",
      "Advanced AI dental analysis",
      "Personalized care plans",
      "24/7 AI priority support",
      "Detailed health reports",
    ],
    buttonText: "Upgrade to AI Pro",
    highlighted: false,
  },
];

function PricingSection() {
  return (
    <section className="relative py-36 px-6 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Simple Pricing
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Choose your
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              AI dental plan
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Start free and upgrade anytime. Designed for modern, smarter dental care.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-10 transition-all duration-500 backdrop-blur-xl border ${
                plan.highlighted
                  ? "border-primary/40 bg-card shadow-2xl shadow-primary/20 scale-105"
                  : "border-border/50 bg-card/80 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40"
              }`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="space-y-8">

                {/* Plan Header */}
                <div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="flex items-end gap-1 mt-3">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground mb-1">/month</span>
                  </div>
                  <p className="text-muted-foreground mt-3">
                    {plan.description}
                  </p>
                </div>

                {/* CTA */}
                <SignUpButton>
                  <Button
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg shadow-primary/30"
                        : "bg-muted hover:bg-primary/10"
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </SignUpButton>

                {/* Features */}
                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
