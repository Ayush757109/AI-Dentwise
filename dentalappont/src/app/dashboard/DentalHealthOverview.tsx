import { getUserAppointmentStats } from "@/lib/actions/appointments";
import { currentUser } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BrainIcon,
  MessageSquareIcon,
  TrendingUpIcon,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DentalHealthOverview() {
  const appointmentStats = await getUserAppointmentStats();
  const user = await currentUser();

  const completed = appointmentStats?.completedAppointments ?? 0;
  const total = appointmentStats?.totalAppointments ?? 0;

  const completionRate =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  const memberSince = user?.createdAt
    ? format(new Date(user.createdAt), "MMM yyyy")
    : "—";

  return (
    <Card className="shadow-sm hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainIcon className="size-5 text-primary" />
          Your Dental Health
        </CardTitle>
        <CardDescription>
          Track your dental care progress and engagement
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            label="Completed Visits"
            value={completed}
            highlight
          />
          <StatCard
            label="Total Appointments"
            value={total}
          />
          <StatCard
            label="Member Since"
            value={memberSince}
          />
        </div>

        {/* PROGRESS SECTION */}
        <div className="p-5 bg-muted/30 rounded-xl border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Appointment Completion Rate
            </span>
            <span className="text-sm font-semibold text-primary flex items-center gap-1">
              <TrendingUpIcon className="size-4" />
              {completionRate}%
            </span>
          </div>

          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20">
          <div className="flex items-start gap-4">
            <div className="size-10 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
              <MessageSquareIcon className="size-5 text-primary" />
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-primary">
                Need instant advice?
              </h4>

              <p className="text-sm text-muted-foreground">
                Use our AI voice assistant for real-time dental
                guidance or book your next appointment.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/voice">
                  <Button size="sm">
                    Try AI Assistant
                  </Button>
                </Link>

                <Link href="/appointments">
                  <Button size="sm" variant="outline">
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}


function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-6 rounded-xl border text-center transition-all duration-300 hover:shadow-md ${
        highlight
          ? "bg-primary/10 border-primary/20"
          : "bg-muted/30"
      }`}
    >
      <div className="text-2xl font-bold text-primary mb-1">
        {value}
      </div>
      <div className="text-sm text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
