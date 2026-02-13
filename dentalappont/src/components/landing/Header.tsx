"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* Background */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-xl border-b border-border/40" />

      <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">

            {/* Soft Glow */}
            <div className="absolute -inset-3 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition duration-300" />

            <Image
              src="/logo.png"
              alt="DentWise Logo"
              width={44}
              height={44}
              className="relative w-11 h-11 object-contain"
              priority
            />
          </div>

          <span className="text-xl font-bold tracking-tight">
            Dent<span className="text-primary">Wise</span>
          </span>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">

          {["How it Works", "Pricing", "About"].map((item) => (
            <Link
              key={item}
              href="#"
              className="relative text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <span>{item}</span>

              {/* Animated Underline */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

        </nav>

        {/* AUTH BUTTONS */}
        <div className="flex items-center gap-3">

          <SignInButton>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm hover:bg-primary/10 transition-colors"
            >
              Login
            </Button>
          </SignInButton>

          <SignUpButton>
            <Button
              size="sm"
              className="text-sm px-6 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Started
            </Button>
          </SignUpButton>

        </div>
      </div>
    </header>
  );
}

export default Header;
