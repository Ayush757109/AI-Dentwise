"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    highlighted: false,
  },
  {
    name: "AI Basic",
    price: "$51",
    description: "AI consultations + appointment booking",
    features: [
      "Everything in Free",
      "10 AI voice calls per month",
      "AI dental guidance",
      "Symptom assessment",
      "Priority support",
      "Call history & recordings",
    ],
    highlighted: true,
  },
  {
    name: "AI Pro",
    price: "$53",
    description: "Unlimited AI consultations",
    features: [
      "Everything in AI Basic",
      "Unlimited AI voice calls",
      "Advanced AI dental analysis",
      "Personalized care plans",
      "24/7 AI priority support",
      "Detailed health reports",
    ],
    highlighted: false,
  },
];

function PricingSection() {
  return (
    <section className="py-36 px-6 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="text-5xl font-bold mb-6">Choose Your Plan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Start free and upgrade anytime. Built for smarter dental care.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-3xl p-10 border backdrop-blur-xl transition-all duration-500 ${
              plan.highlighted
                ? "border-primary bg-card shadow-2xl scale-105"
                : "border-border bg-card/80 hover:-translate-y-2 hover:shadow-xl"
            }`}
          >
            <h3 className="text-2xl font-bold">{plan.name}</h3>

            <div className="flex items-end gap-1 mt-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground mb-1">/month</span>
            </div>

            <p className="text-muted-foreground mt-4">
              {plan.description}
            </p>

            {/* 🔥 Navigate to Pricing Page */}
            <Link href="/pricing">
              <Button className="w-full mt-6">
                View Plan Details
              </Button>
            </Link>

            <div className="space-y-3 mt-8">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PricingSection;
