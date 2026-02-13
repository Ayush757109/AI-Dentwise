"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MicIcon, CalendarIcon, ArrowRightIcon } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

function CTA() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Glass Container */}
        <div className="relative bg-card/80 backdrop-blur-2xl border border-border/50 rounded-3xl px-10 py-16 shadow-2xl">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT SIDE */}
            <div className="space-y-8 text-center lg:text-left">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-primary">
                  Available 24/7 AI Assistant
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Take control of your
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  dental health today
                </span>
              </h2>

              {/* Subtext */}
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                Get instant AI guidance, personalized treatment advice, and
                seamless appointment booking — all in one powerful platform.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">

                <SignUpButton>
                  <Button
                    size="lg"
                    className="px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-1"
                  >
                    <MicIcon className="mr-2 h-5 w-5" />
                    Start Free AI Chat
                  </Button>
                </SignUpButton>

                <SignUpButton>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                  >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    Book Appointment
                  </Button>
                </SignUpButton>

              </div>

              {/* Trust Line */}
              <div className="flex items-center justify-center lg:justify-start gap-2 pt-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1 text-primary font-medium">
                  <ArrowRightIcon className="h-4 w-4" />
                  Trusted by 1,200+ patients
                </span>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="relative flex justify-center lg:justify-end">

              {/* Soft Glow */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/30 to-primary/10 rounded-3xl blur-3xl opacity-50" />

              <div className="relative">

                {/* Floating Status Badge */}
                <div className="absolute -top-5 left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg z-10">
                  ● AI Online
                </div>

                {/* Main Image Container */}
                <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-xl">

                  <Image
                    src="/cta.png"
                    alt="DentWise AI Assistant"
                    width={350}
                    height={350}
                    className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
                    priority
                  />

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
