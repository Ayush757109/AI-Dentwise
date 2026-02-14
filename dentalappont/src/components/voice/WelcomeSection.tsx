import { MicIcon, Sparkles, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WelcomeSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-background via-primary/5 to-background shadow-xl p-10 mb-16">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 to-transparent opacity-60" />

      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">

        {/* LEFT CONTENT */}
        <div className="space-y-6 max-w-xl">

          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">
              AI Voice Assistant Online
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Talk Naturally with Your{" "}
            <span className="text-primary">Dental AI Assistant</span>
          </h1>

          <p className="text-muted-foreground text-lg">
            Start a real-time voice session and receive intelligent
            dental advice instantly. Powered by advanced AI models.
          </p>

          {/* CTA BUTTON */}
          <div className="pt-4">
            <Button className="px-6 py-6 text-lg rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 shadow-lg">
              <PlayCircle className="mr-2 h-5 w-5" />
              Start Voice Session
            </Button>
          </div>

        </div>

        {/* RIGHT VISUAL */}
        <div className="hidden lg:flex items-center justify-center relative">

          <div className="absolute w-44 h-44 rounded-full bg-primary/10 animate-ping opacity-40" />

          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-inner">
            <MicIcon className="w-20 h-20 text-primary" />
          </div>

        </div>

      </div>
    </div>
  );
}
