import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquareIcon,
  CalendarIcon,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MainActions() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
      <ActionCard
        title="AI Voice Assistant"
        description="Talk to our intelligent dental AI for real-time advice and guidance."
        badge="AI Powered"
        iconSrc="/audio.png"
        features={[
          "24/7 availability",
          "Instant dental guidance",
          "Pain relief suggestions",
        ]}
        href="/voice"
        cta="Start Voice Session"
        primary
      />

      <ActionCard
        title="Book Appointment"
        description="Schedule a visit with trusted dental professionals near you."
        badge="Popular"
        iconSrc="/calendar.png"
        features={[
          "Verified dentists",
          "Flexible time slots",
          "Instant confirmation",
        ]}
        href="/appointments"
        cta="Schedule Appointment"
      />
    </section>
  );
}

/* ============================
   REUSABLE ACTION CARD
============================ */

function ActionCard({
  title,
  description,
  badge,
  iconSrc,
  features,
  href,
  cta,
  primary,
}: {
  title: string;
  description: string;
  badge: string;
  iconSrc: string;
  features: string[];
  href: string;
  cta: string;
  primary?: boolean;
}) {
  return (
    <Card className="relative overflow-hidden border hover:shadow-2xl transition-all duration-300 group">
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

      <CardContent className="relative p-8 space-y-6">

        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Image
                src={iconSrc}
                alt={title}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-muted-foreground text-sm">
                {description}
              </p>
            </div>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {badge}
          </span>
        </div>

        {/* FEATURES */}
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full" />
              {feature}
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href={href}>
          <Button
            className={`w-full mt-4 py-6 text-base rounded-xl ${
              primary
                ? "bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
                : "variant-outline"
            }`}
            variant={primary ? "default" : "outline"}
          >
            {primary ? (
              <MessageSquareIcon className="mr-2 h-5 w-5" />
            ) : (
              <CalendarIcon className="mr-2 h-5 w-5" />
            )}
            {cta}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
