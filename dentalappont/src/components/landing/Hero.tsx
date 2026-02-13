"use client";

import { SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { CalendarIcon, MicIcon, StarIcon } from "lucide-react";
import Image from "next/image";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-20">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-primary/5" />

      {/* Animated Blur Orbs */}
      <div className="absolute top-20 left-1/3 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] bg-primary/10 rounded-full blur-3xl opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-8 text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-md">
              <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
              <span className="text-sm font-medium text-primary">
                AI-Powered Dental Assistant
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Your Dental
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Questions Answered
              </span>
              <br />
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Instantly
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Get instant AI-powered dental guidance, voice consultations,
              appointment booking, and personalized care recommendations —
              available 24/7.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">

              <SignUpButton>
                <Button
                  size="lg"
                  className="text-base px-8 shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
                >
                  <MicIcon className="mr-2 size-5" />
                  Try Voice Assistant
                </Button>
              </SignUpButton>

              <SignUpButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 hover:bg-primary/10 transition-colors"
                >
                  <CalendarIcon className="mr-2 size-5" />
                  Book Appointment
                </Button>
              </SignUpButton>

            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-8">

              {/* Avatars */}
              <div className="flex -space-x-3">
                {[
                  "photo-1544005313-94ddf0286df2",
                  "photo-1560250097-0b93528c311a",
                  "photo-1580489944761-15a19d654956",
                  "photo-1633332755192-727a05c4013d",
                  "photo-1598300042247-d088f8ab3a91",
                ].map((id, index) => (
                  <Image
                    key={index}
                    src={`https://images.unsplash.com/${id}?w=100&h=100&fit=crop&crop=face`}
                    alt="Happy patient"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover ring-4 ring-background"
                  />
                ))}
              </div>

              {/* Rating */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="ml-2 text-sm font-semibold">
                    4.9/5 Rating
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Trusted by <span className="font-semibold">1,200+ patients</span>
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE - HERO CARD */}
          <div className="relative">

            {/* Glow Effect */}
            <div className="absolute -inset-6 bg-gradient-to-r from-primary/30 to-primary/10 rounded-3xl blur-2xl opacity-60" />

            <div className="relative bg-background/60 backdrop-blur-xl border border-border rounded-3xl shadow-2xl p-6">

              <Image
                src="/hero.png"
                alt="DentWise AI Assistant"
                width={600}
                height={600}
                className="rounded-2xl"
                priority
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
