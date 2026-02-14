import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CrownIcon, LockIcon, MicIcon, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ProPlanRequired() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16 pt-28 space-y-16">

        {/* HERO LOCK SECTION */}
        <div className="relative overflow-hidden rounded-3xl border bg-card shadow-xl p-10">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

            <div className="space-y-6 max-w-xl">

              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20">
                <LockIcon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Premium Feature
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Unlock the <span className="text-primary">AI Voice Assistant</span>
              </h1>

              <p className="text-muted-foreground text-lg">
                Upgrade to AI Basic or AI Pro to access real-time voice
                consultations powered by intelligent dental AI.
              </p>

              <div className="flex items-center gap-6 pt-4 text-sm">
                <div className="flex items-center gap-2">
                  <MicIcon className="w-4 h-4 text-green-500" />
                  Unlimited Voice Sessions
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-green-500" />
                  AI-Powered Intelligence
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-inner">
                <MicIcon className="w-20 h-20 text-primary" />
              </div>
            </div>

          </div>
        </div>

        {/* UPGRADE CARD */}
        <Card className="relative overflow-hidden border hover:shadow-2xl transition-all duration-300 max-w-3xl mx-auto">
          <CardContent className="p-10 text-center space-y-6">

            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <CrownIcon className="w-10 h-10 text-primary" />
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl font-bold">
                Upgrade to AI Pro
              </h3>

              <p className="text-muted-foreground max-w-xl mx-auto">
                Get full access to advanced AI voice consultations,
                real-time insights, and unlimited usage.
              </p>
            </div>

            {/* BENEFITS */}
            <div className="grid sm:grid-cols-3 gap-4 pt-4 text-sm">
              <Benefit text="24/7 Voice Consultations" />
              <Benefit text="Professional Dental Insights" />
              <Benefit text="Real-Time Transcript History" />
            </div>

            <div className="pt-6">
              <Link href="/pro">
                <Button className="px-10 py-6 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 shadow-lg">
                  <CrownIcon className="mr-2 h-5 w-5" />
                  Upgrade Now
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground">
              Secure payment • Cancel anytime • Instant activation
            </p>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}

/* ============================
   BENEFIT ITEM
============================ */

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-2 p-3 bg-muted/40 rounded-xl">
      <div className="w-2 h-2 bg-primary rounded-full"></div>
      <span>{text}</span>
    </div>
  );
}
