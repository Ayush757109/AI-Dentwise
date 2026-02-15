"use client";

import { PricingTable, useUser } from "@clerk/nextjs";
import { Crown, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export default function ProClient() {
  const { user } = useUser();

  // Example: you can store plan in Clerk publicMetadata
  const userPlan = user?.publicMetadata?.plan as string | undefined;
  const isPro = userPlan === "pro";

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 pt-24">

      {/* HERO */}
      <div className="mb-20">
        <div className="relative overflow-hidden rounded-3xl p-12 border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

            <div className="space-y-6 max-w-xl">

              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  DentWise Pro
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                {isPro ? (
                  <>
                    You are enjoying <span className="text-primary">Pro</span>
                  </>
                ) : (
                  <>
                    Unlock Premium <span className="text-primary">AI Dental Care</span>
                  </>
                )}
              </h1>

              <p className="text-muted-foreground text-lg">
                {isPro
                  ? "You have full access to unlimited AI consultations, advanced diagnostics, and priority care."
                  : "Upgrade to get unlimited AI consultations, smart diagnostics, secure records, and priority support."}
              </p>

              {isPro && (
                <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Active Subscription
                </div>
              )}

              <div className="flex gap-6 pt-4">

                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Enterprise Security
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  Premium Features
                </div>

              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <div className="w-44 h-44 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-inner">
                <Crown className="w-24 h-24 text-primary" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FEATURES GRID (SaaS Feel) */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">

        {[
          {
            title: "Unlimited AI Calls",
            desc: "Get unlimited real-time AI dental voice consultations.",
          },
          {
            title: "Advanced Diagnostics",
            desc: "Smart AI-powered dental case analysis & care plans.",
          },
          {
            title: "Priority Support",
            desc: "24/7 dedicated AI + human support access.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-card p-8 shadow-sm hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg mb-3">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* BILLING / UPGRADE SECTION */}
      <div className="space-y-10">

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">
            {isPro ? "Manage Your Subscription" : "Upgrade to Pro"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing. Cancel anytime. Secure billing powered by Clerk.
          </p>
        </div>

        {!isPro && (
          <div className="rounded-3xl border bg-background shadow-lg p-6">
            <PricingTable />
          </div>
        )}

        {isPro && (
          <div className="rounded-3xl border bg-green-50 p-10 text-center">
            <CheckCircle2 className="mx-auto mb-4 w-10 h-10 text-green-600" />
            <h3 className="text-xl font-semibold mb-2">
              You are already on Pro 🎉
            </h3>
            <p className="text-muted-foreground">
              Manage your subscription from Clerk billing settings.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
