import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MicIcon, ShieldIcon, CalendarIcon, Sparkles } from "lucide-react";

export default function FeatureCards() {
  return (
    <div className="grid lg:grid-cols-2 gap-10 mb-16">
      {/* HOW TO USE */}
      <FeatureCard
        icon={<MicIcon className="h-5 w-5 text-primary" />}
        title="How It Works"
        description="Simple steps to start using the AI voice assistant"
        badge="Quick Start"
      >
        <Step number="01" text="Click the microphone to begin speaking" />
        <Step number="02" text="Ask dental health or appointment questions" />
        <Step number="03" text="Receive real-time AI voice responses" />
        <Step number="04" text="View live transcripts instantly" />
      </FeatureCard>

      {/* FEATURES */}
      <FeatureCard
        icon={<ShieldIcon className="h-5 w-5 text-primary" />}
        title="Core Features"
        description="Advanced capabilities powered by AI"
        badge="Premium"
      >
        <FeatureItem
          icon={<MicIcon className="h-4 w-4 text-primary" />}
          text="Real-time Voice Recognition"
        />
        <FeatureItem
          icon={<Sparkles className="h-4 w-4 text-primary" />}
          text="AI-Powered Intelligent Responses"
        />
        <FeatureItem
          icon={<CalendarIcon className="h-4 w-4 text-primary" />}
          text="Full Conversation History"
        />
      </FeatureCard>
    </div>
  );
}

/* ============================
   REUSABLE FEATURE CARD
============================ */

function FeatureCard({
  icon,
  title,
  description,
  badge,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="relative overflow-hidden group border hover:shadow-2xl transition-all duration-300">
      {/* Gradient Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

      <CardHeader className="relative space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              {icon}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            {badge}
          </span>
        </div>

        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {children}
      </CardContent>
    </Card>
  );
}

/* ============================
   STEP ITEM
============================ */

function Step({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-md">
        {number}
      </div>
      <span className="text-sm text-muted-foreground">{text}</span>
    </div>
  );
}

/* ============================
   FEATURE ITEM
============================ */

function FeatureItem({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl hover:bg-muted transition">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
