"use client";

import { useGetAppointments, useUpdateAppointmentStatus } from "@/hooks/use-appointment";
import { AppointmentStatus } from "@prisma/client";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

/**
 * This must match what your API actually returns
 */
interface AppointmentWithRelations {
  id: string;
  date: string | Date;
  time: string;
  reason: string | null;
  status: AppointmentStatus;
  patientName: string;
  patientEmail: string;
  doctorName: string;
}

export default function RecentAppointments() {
  const { data } = useGetAppointments();
  const appointments: AppointmentWithRelations[] = data ?? [];

  const updateAppointmentMutation = useUpdateAppointmentStatus();

  const handleToggleAppointmentStatus = (appointmentId: string) => {
    const appointment = appointments.find((apt) => apt.id === appointmentId);
    if (!appointment) return;

    const newStatus: AppointmentStatus =
      appointment.status === "CONFIRMED"
        ? "COMPLETED"
        : "CONFIRMED";

    updateAppointmentMutation.mutate({
      id: appointmentId,
      status: newStatus,
    });
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case "CONFIRMED":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Confirmed
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Recent Appointments
        </CardTitle>
        <CardDescription>
          Monitor and manage all patient appointments
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {appointment.patientName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.patientEmail}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">
                    {appointment.doctorName}
                  </TableCell>

                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {new Date(appointment.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.time}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    {appointment.reason ?? "—"}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleToggleAppointmentStatus(appointment.id)
                      }
                      className="h-6 px-2"
                      disabled={updateAppointmentMutation.isPending}
                    >
                      {getStatusBadge(appointment.status)}
                    </Button>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="text-xs text-muted-foreground">
                      Click status to toggle
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {appointments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No appointments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
