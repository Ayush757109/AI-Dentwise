"use client";

import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: [
      "Unlimited appointment booking",
      "Find dentists near you",
      "Basic text chat support",
      "Appointment reminders",
    ],
  },
  {
    name: "AI Basic",
    price: "$51",
    features: [
      "Everything in Free",
      "10 AI voice calls",
      "AI dental guidance",
      "Priority support",
    ],
  },
  {
    name: "AI Pro",
    price: "$53",
    features: [
      "Everything in AI Basic",
      "Unlimited AI voice calls",
      "Advanced AI analysis",
      "24/7 Priority AI",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-bold mb-6">
          DentWise Pricing
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Flexible plans for individuals and clinics. Upgrade anytime.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="rounded-3xl border p-10 bg-card shadow-md"
          >
            <h2 className="text-2xl font-bold mb-4">
              {plan.name}
            </h2>

            <p className="text-4xl font-bold mb-6">
              {plan.price}
              <span className="text-sm text-muted-foreground">
                /month
              </span>
            </p>

            <div className="space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <SignUpButton mode="modal">
              <Button className="w-full">
                Get Started
              </Button>
            </SignUpButton>
          </div>
        ))}
      </div>
    </main>
  );
}
