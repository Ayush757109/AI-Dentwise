"use client";

import {
  useGetAppointments,
  useUpdateAppointmentStatus,
} from "@/hooks/use-appointment";
import { AppointmentStatus } from "@prisma/client";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
import { Loader2 } from "lucide-react";

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
  const { data, isLoading } = useGetAppointments();
  const appointments: AppointmentWithRelations[] = data ?? [];

  const updateAppointmentMutation = useUpdateAppointmentStatus();

  const handleStatusChange = (
    appointmentId: string,
    status: AppointmentStatus
  ) => {
    updateAppointmentMutation.mutate({
      id: appointmentId,
      status,
    });
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case "CONFIRMED":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Confirmed
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Completed
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card className="shadow-sm border">
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
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    <Loader2 className="animate-spin mx-auto mb-2" />
                    Loading appointments...
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && appointments.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No appointments found.
                  </TableCell>
                </TableRow>
              )}

              {appointments.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  className="hover:bg-muted/40 transition"
                >
                  {/* Patient */}
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

                  {/* Doctor */}
                  <TableCell className="font-medium">
                    {appointment.doctorName}
                  </TableCell>

                  {/* Date */}
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {new Date(
                          appointment.date
                        ).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.time}
                      </div>
                    </div>
                  </TableCell>

                  {/* Reason */}
                  <TableCell>
                    {appointment.reason ?? "—"}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    {getStatusBadge(appointment.status)}
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {appointment.status !== "CONFIRMED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleStatusChange(
                              appointment.id,
                              "CONFIRMED"
                            )
                          }
                          disabled={updateAppointmentMutation.isPending}
                        >
                          Confirm
                        </Button>
                      )}

                      {appointment.status !== "COMPLETED" && (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleStatusChange(
                              appointment.id,
                              "COMPLETED"
                            )
                          }
                          disabled={updateAppointmentMutation.isPending}
                        >
                          Complete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
