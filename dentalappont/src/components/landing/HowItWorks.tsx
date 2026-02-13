"use client";

import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon, ZapIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

function HowItWorks() {
  return (
    <section className="relative py-36 px-6 max-w-7xl mx-auto">

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      {/* HEADER */}
      <div className="text-center mb-24">

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
          <ZapIcon className="size-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Simple Process
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Three simple steps to
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            better dental care
          </span>
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          From AI consultation to verified appointments — everything is
          designed to make your dental journey seamless and stress-free.
        </p>
      </div>

      {/* STEPS */}
      <div className="relative">

        {/* CONNECTOR LINE */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

        <div className="grid lg:grid-cols-3 gap-12">

          {/* STEP CARD COMPONENT STYLE */}
          {[
            {
              title: "Ask Questions",
              description:
                "Chat with our AI assistant about symptoms, treatments, and oral health. Get instant answers anytime.",
              img: "/audio.png",
              features: ["24/7 Available", "Instant Response"],
            },
            {
              title: "Get Expert Advice",
              description:
                "Receive AI-powered insights trained on thousands of dental cases for personalized recommendations.",
              img: "/brain.png",
              features: ["AI-Powered", "Personalized"],
            },
            {
              title: "Book & Get Care",
              description:
                "Schedule with verified dentists and receive comprehensive follow-up care with seamless tracking.",
              img: "/calendar.png",
              features: ["Verified Doctors", "Progress Tracking"],
            },
          ].map((step, index) => (
            <div key={index} className="relative group">

              <div className="relative bg-card/70 backdrop-blur-xl border border-border/50 rounded-3xl p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40">

                {/* STEP NUMBER */}
                <div className="absolute -top-5 left-10 w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-semibold shadow-lg">
                  {index + 1}
                </div>

                {/* ICON */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={step.img}
                    alt={step.title}
                    width={40}
                    height={40}
                    className="w-14"
                  />
                </div>

                <h3 className="text-2xl font-bold text-center mb-4">
                  {step.title}
                </h3>

                <p className="text-muted-foreground text-center leading-relaxed mb-6">
                  {step.description}
                </p>

                <div className="flex flex-wrap gap-2 justify-center">
                  {step.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STRONG CTA SECTION */}
      <div className="mt-28 text-center">

        <div className="inline-block bg-gradient-to-r from-primary/10 to-primary/5 p-10 rounded-3xl border border-primary/20 backdrop-blur-lg">

          <h3 className="text-3xl font-bold mb-4">
            Start your smarter dental journey today
          </h3>

          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of patients already improving their oral health
            using DentWise AI.
          </p>

          <SignUpButton>
            <Button
              size="lg"
              className="px-8 shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
            >
              <ArrowRightIcon className="mr-2 size-5" />
              Get Started Free
            </Button>
          </SignUpButton>

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
