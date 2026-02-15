import { getUserAppointments } from "@/lib/actions/appointments";
import {
  format,
  isAfter,
  isSameDay,
  parseISO,
  differenceInCalendarDays,
} from "date-fns";
import NoNextAppointments from "./NoNextAppointments";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
} from "lucide-react";

export default async function NextAppointment() {
  const appointments = await getUserAppointments();
  const today = new Date();

  const upcomingAppointments =
    appointments
      ?.filter((appointment) => {
        const appointmentDate = parseISO(appointment.date);
        const isUpcoming =
          isSameDay(appointmentDate, today) ||
          isAfter(appointmentDate, today);

        return isUpcoming && appointment.status === "CONFIRMED";
      })
      ?.sort(
        (a, b) =>
          parseISO(a.date).getTime() -
          parseISO(b.date).getTime()
      ) || [];

  const nextAppointment = upcomingAppointments[0];

  if (!nextAppointment) return <NoNextAppointments />;

  const appointmentDate = parseISO(nextAppointment.date);
  const formattedDate = format(
    appointmentDate,
    "EEEE, MMMM d, yyyy"
  );

  const isToday = isSameDay(appointmentDate, today);
  const daysUntil = differenceInCalendarDays(
    appointmentDate,
    today
  );

  return (
    <Card className="border hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="size-5 text-primary" />
          Next Appointment
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* STATUS BADGE */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">
              {isToday
                ? "Today"
                : daysUntil === 1
                ? "Tomorrow"
                : `${daysUntil} days left`}
            </span>
          </div>

          <span className="text-xs bg-muted px-2 py-1 rounded">
            {nextAppointment.status}
          </span>
        </div>

        {/* DETAILS */}
        <div className="space-y-4">

          {/* Doctor */}
          <DetailRow
            icon={<UserIcon className="size-4 text-primary" />}
            title={nextAppointment.doctorName}
            subtitle={nextAppointment.reason ?? "General consultation"}
          />

          {/* Date */}
          <DetailRow
            icon={<CalendarIcon className="size-4 text-primary" />}
            title={formattedDate}
            subtitle={
              isToday
                ? "Happening today"
                : format(appointmentDate, "EEEE")
            }
          />

          {/* Time */}
          <DetailRow
            icon={<ClockIcon className="size-4 text-primary" />}
            title={nextAppointment.time}
            subtitle="Local time"
          />
        </div>

        {/* MULTIPLE UPCOMING */}
        {upcomingAppointments.length > 1 && (
          <div className="text-xs text-center text-muted-foreground border-t pt-3">
            +{upcomingAppointments.length - 1} more upcoming appointment
            {upcomingAppointments.length > 2 ? "s" : ""}
          </div>
        )}

      </CardContent>
    </Card>
  );
}

/* ================================
   REUSABLE DETAIL ROW
================================ */

function DetailRow({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-medium text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
