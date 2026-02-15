import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";

export default async function WelcomeSection() {
  const user = await currentUser();
  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";

  const firstName = user?.firstName ?? "there";

  return (
    <section className="rounded-3xl border bg-gradient-to-br from-background via-primary/5 to-background p-10 shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">
            Good {greeting}, {firstName} 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Your AI dental assistant is ready to help you.
          </p>
        </div>

        <Image
          src="/logo.png"
          alt="DentWise"
          width={80}
          height={80}
        />
      </div>
    </section>
  );
}
