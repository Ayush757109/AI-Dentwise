import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, UserCheck, Clock, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AdminStatsProps {
  totalDoctors: number;
  activeDoctors: number;
  totalAppointments: number;
  completedAppointments: number;
}

export default function AdminStats({
  activeDoctors,
  totalDoctors,
  completedAppointments,
  totalAppointments,
}: AdminStatsProps) {
  const completionRate =
    totalAppointments > 0
      ? Math.round((completedAppointments / totalAppointments) * 100)
      : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
      <StatCard
        title="Total Doctors"
        value={totalDoctors}
        icon={Users}
        subtitle={`${activeDoctors} active`}
      />

      <StatCard
        title="Active Doctors"
        value={activeDoctors}
        icon={UserCheck}
        subtitle={`${totalDoctors - activeDoctors} inactive`}
      />

      <StatCard
        title="Total Appointments"
        value={totalAppointments}
        icon={Calendar}
        subtitle="All scheduled"
      />

      <StatCard
        title="Completion Rate"
        value={`${completionRate}%`}
        icon={Clock}
        subtitle={`${completedAppointments} completed`}
        highlight
      />
    </div>
  );
}

/* ================================
   REUSABLE STAT CARD
================================ */

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon; // ✅ FIXED (removed `any`)
  highlight?: boolean;
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  highlight,
}: StatCardProps) {
  return (
    <Card className="relative overflow-hidden border bg-card hover:shadow-xl transition-all duration-300 group">
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
          </div>

          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition 
              ${
                highlight
                  ? "bg-primary text-white"
                  : "bg-primary/10 text-primary group-hover:bg-primary/20"
              }`}
          >
            <Icon className="w-6 h-6" />
          </div>
        </div>

        {subtitle && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="w-4 h-4 text-green-500" />
            {subtitle}
          </div>
        )}
      </CardContent>

      {/* subtle animated glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-br from-primary/5 to-transparent" />
    </Card>
  );
}
