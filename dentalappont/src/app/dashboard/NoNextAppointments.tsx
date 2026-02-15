import { CalendarIcon, PlusIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NoNextAppointments() {
  return (
    <Card className="border hover:shadow-md transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="size-5 text-primary" />
          Next Appointment
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center text-center py-10 space-y-5">

          {/* Empty Icon */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <CalendarIcon className="size-10 text-primary/70" />
            </div>

            {/* subtle glow */}
            <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-lg" />
          </div>

          {/* Text */}
          <div className="space-y-1">
            <h3 className="text-base font-semibold">
              No upcoming appointments
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Stay on top of your dental health by scheduling your
              next visit with one of our trusted professionals.
            </p>
          </div>

          {/* CTA */}
          <Link href="/appointments" className="w-full">
            <Button className="w-full rounded-xl py-5">
              <PlusIcon className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
          </Link>

        </div>
      </CardContent>
    </Card>
  );
}
