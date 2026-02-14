"use client";

import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Mic, PhoneOff, Loader2 } from "lucide-react";

type TranscriptMessage = {
  role: "assistant" | "user";
  content: string;
};

export default function VapiWidget() {
  const { user, isLoaded } = useUser();

  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const [callEnded, setCallEnded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);

  const messageContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

  /* =============================
     AUTO SCROLL
  ==============================*/
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  /* =============================
     CALL TIMER
  ==============================*/
  useEffect(() => {
    if (callActive) {
      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setDuration(0);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callActive]);

  /* =============================
     VAPI EVENTS
  ==============================*/
  useEffect(() => {
    const handleCallStart = () => {
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
      setError(null);
    };

    const handleCallEnd = () => {
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);

    const handleMessage = (message: any) => {
      if (
        message?.type === "transcript" &&
        message?.transcriptType === "final"
      ) {
        setMessages((prev) => [
          ...prev,
          {
            role: message.role === "assistant" ? "assistant" : "user",
            content: message.transcript,
          },
        ]);
      }
    };

    const handleError = () => {
      setError("Connection failed. Please try again.");
      setConnecting(false);
      setCallActive(false);
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    return () => {
      vapi.stop();
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, []);

  /* =============================
     TOGGLE CALL
  ==============================*/
  const toggleCall = async () => {
    if (!assistantId) {
      setError("Assistant configuration missing.");
      return;
    }

    if (callActive) {
      vapi.stop();
      return;
    }

    try {
      setConnecting(true);
      setMessages([]);
      setCallEnded(false);
      setError(null);
      await vapi.start(assistantId);
    } catch {
      setError("Unable to start voice session.");
      setConnecting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isLoaded) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            AI Voice Consultation
          </h1>
          <p className="text-muted-foreground">
            Real-time dental advice powered by DentWise AI
          </p>
        </div>

        {callActive && (
          <div className="text-sm font-mono text-primary">
            {formatTime(duration)}
          </div>
        )}
      </div>

      {/* VIDEO CARDS */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* AI CARD */}
        <Card className="p-8 flex flex-col items-center text-center relative">
          <div
            className={`absolute inset-0 ${
              isSpeaking ? "bg-primary/10 animate-pulse" : ""
            }`}
          />

          <Image
            src="/logo.png"
            alt="AI"
            width={120}
            height={120}
            className="rounded-full mb-4"
          />

          <h2 className="font-semibold text-lg">DentWise AI</h2>

          <div className="text-xs text-muted-foreground mt-2">
            {connecting
              ? "Connecting..."
              : callActive
              ? isSpeaking
                ? "Speaking"
                : "Listening"
              : callEnded
              ? "Session Ended"
              : "Ready"}
          </div>
        </Card>

        {/* USER CARD */}
        <Card className="p-8 flex flex-col items-center text-center">
          <Image
            src={user?.imageUrl ?? "/avatar-placeholder.png"}
            alt="User"
            width={120}
            height={120}
            className="rounded-full mb-4"
          />
          <h2 className="font-semibold text-lg">
            {user?.fullName ?? "Guest"}
          </h2>
        </Card>
      </div>

      {/* TRANSCRIPT PANEL */}
      {messages.length > 0 && (
        <div
          ref={messageContainerRef}
          className="border rounded-xl p-6 h-72 overflow-y-auto bg-card"
        >
          {messages.map((msg, index) => (
            <div key={index} className="mb-4">
              <div className="text-xs text-muted-foreground font-semibold">
                {msg.role === "assistant" ? "DentWise AI" : "You"}
              </div>
              <div className="text-sm">{msg.content}</div>
            </div>
          ))}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="text-sm text-destructive text-center">
          {error}
        </div>
      )}

      {/* CONTROLS */}
      <div className="flex justify-center">
        <Button
          onClick={toggleCall}
          disabled={connecting}
          className={`px-10 py-6 text-lg rounded-xl ${
            callActive
              ? "bg-destructive hover:bg-destructive/90"
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          {connecting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {callActive ? (
            <>
              <PhoneOff className="mr-2 h-5 w-5" />
              End Call
            </>
          ) : (
            <>
              <Mic className="mr-2 h-5 w-5" />
              Start Session
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
