"use client";

import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/50">

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-muted/30" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.05),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Top Grid */}
        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand Section */}
          <div className="space-y-6">

            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="DentWise Logo"
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <span className="text-xl font-bold tracking-tight">
                Dent<span className="text-primary">Wise</span>
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI-powered dental assistance designed to give you instant,
              accurate guidance — anytime, anywhere.
            </p>

            {/* Trust Badge */}
            <div className="text-xs text-muted-foreground">
              Trusted by <span className="font-semibold text-primary">1,200+ patients</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wide text-foreground/80">
              Product
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Appointments
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wide text-foreground/80">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  System Status
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wide text-foreground/80">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">

          <p>
            © {new Date().getFullYear()} DentWise. Built for real people with real dental questions.
          </p>

          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">
              Twitter
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              LinkedIn
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Instagram
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
