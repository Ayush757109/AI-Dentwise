"use client";

import { PricingTable } from "@clerk/nextjs";
import { Crown, ShieldCheck, Sparkles } from "lucide-react";

export default function ProClient() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pt-24">

      {/* HERO SECTION */}
      <div className="mb-16">
        <div className="relative overflow-hidden rounded-3xl p-10 border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div className="space-y-6 max-w-xl">

              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Upgrade to Pro
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Unlock Premium <span className="text-primary">AI Dental Care</span>
              </h1>

              <p className="text-muted-foreground text-lg">
                Get unlimited AI consultations, smart diagnostics, secure
                medical records, and priority support — all in one plan.
              </p>

              <div className="flex gap-6 pt-4">

                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Bank-level Security
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  Premium Features
                </div>

              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-inner">
                <Crown className="w-20 h-20 text-primary" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* PRICING SECTION */}
      <div className="space-y-10">

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Choose Your Plan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing. Cancel anytime. Secure payment powered by Clerk.
          </p>
        </div>

        <div className="rounded-3xl border bg-background shadow-lg p-6">
          <PricingTable />
        </div>

      </div>
    </div>
  );
}
