"use client";

import { MessageCircleIcon, MessageSquareIcon } from "lucide-react";
import Image from "next/image";

const questions = [
  {
    question: "My tooth hurts when I bite down",
    description:
      "Get immediate advice on pain management, possible causes, and when to see a dentist urgently.",
    tags: ["Instant Response", "Pain Relief"],
  },
  {
    question: "How much does teeth whitening cost?",
    description:
      "Compare treatment options, pricing ranges, and find the best whitening solution for your budget.",
    tags: ["Cost Analysis", "Treatment Options"],
  },
  {
    question: "When should I replace my filling?",
    description:
      "Learn about filling lifespan, warning signs of wear, and replacement timing guidance.",
    tags: ["Preventive Care", "Maintenance"],
  },
];

function WhatToAsk() {
  return (
    <section className="relative py-36 px-6 overflow-hidden bg-gradient-to-b from-background to-muted/30">

      {/* Soft Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 blur-3xl opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <MessageCircleIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Conversations
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Ask about
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              anything dental
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From quick concerns to complex dental issues, our AI delivers
            expert-level guidance trained on thousands of real cases.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Side - Chat Examples */}
          <div className="space-y-8">
            {questions.map((item, index) => (
              <div
                key={index}
                className="group relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/40"
              >
                <div className="flex items-start gap-5">

                  {/* Icon */}
                  <div className="w-12 h-12 bg-primary/15 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquareIcon className="h-6 w-6 text-primary" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 space-y-4">
                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4">
                      <p className="font-semibold text-primary">
                        {item.question}
                      </p>
                    </div>

                    <div className="bg-muted/40 rounded-2xl p-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Right Side - AI Illustration */}
          <div className="relative">

            {/* Glow Behind Image */}
            <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl opacity-50" />

            <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-10 shadow-xl">

              <Image
                src="/confused.png"
                alt="DentWise AI Assistant"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
                priority
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhatToAsk;
