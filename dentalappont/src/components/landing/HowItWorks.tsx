"use client";

import { useState } from "react";
import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon, CheckCircle2Icon, ZapIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

function HowItWorks() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

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
      <div className="grid lg:grid-cols-3 gap-12">
        {[
          {
            title: "Ask Questions",
            description:
              "Chat with our AI assistant about symptoms and treatments.",
            img: "/audio.png",
          },
          {
            title: "Get Expert Advice",
            description:
              "Receive AI-powered insights for personalized recommendations.",
            img: "/brain.png",
          },
          {
            title: "Book & Get Care",
            description:
              "Schedule with verified dentists in real time.",
            img: "/calendar.png",
          },
        ].map((step, index) => (
          <div
            key={index}
            className="bg-card border rounded-3xl p-10 text-center hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Image
                src={step.img}
                alt={step.title}
                width={40}
                height={40}
              />
            </div>

            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>

      {/* CTA SECTION */}
      <div className="mt-28 text-center">
        {!started ? (
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-10 rounded-3xl border backdrop-blur-lg">
            <h3 className="text-3xl font-bold mb-4">
              Start your smarter dental journey today
            </h3>

            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands improving their oral health using DentWise AI.
            </p>

            <SignUpButton mode="modal">
              <Button
                size="lg"
                onClick={handleStart}
                className="px-8 shadow-lg hover:scale-105 transition-transform"
              >
                <ArrowRightIcon className="mr-2 size-5" />
                Get Started Free
              </Button>
            </SignUpButton>
          </div>
        ) : (
          /* AFTER CLICK SUCCESS STATE */
          <div className="bg-green-50 border border-green-200 p-10 rounded-3xl animate-fade-in">
            <CheckCircle2Icon className="mx-auto text-green-600 mb-4 size-10" />

            <h3 className="text-2xl font-bold text-green-700 mb-3">
              You're almost there!
            </h3>

            <p className="text-green-600 max-w-md mx-auto">
              Complete your sign-up to unlock AI-powered dental care and
              real-time booking features.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default HowItWorks;
