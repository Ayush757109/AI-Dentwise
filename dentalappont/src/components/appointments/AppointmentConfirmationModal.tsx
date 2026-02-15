"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircleIcon,
  MailIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AppointmentDetails {
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  userEmail: string;
}

interface AppointmentConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentDetails: AppointmentDetails | null;
}

export function AppointmentConfirmationModal({
  open,
  onOpenChange,
  appointmentDetails,
}: AppointmentConfirmationModalProps) {
  const router = useRouter();

  if (!appointmentDetails) return null;

  const handleViewAppointments = () => {
    onOpenChange(false);
    router.push("/appointments");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        aria-describedby="appointment-confirmation-description"
      >
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircleIcon className="h-8 w-8 text-primary" />
          </div>

          <DialogTitle className="text-xl font-semibold text-center">
            Appointment Confirmed!
          </DialogTitle>

          <DialogDescription
            id="appointment-confirmation-description"
            className="text-center text-muted-foreground"
          >
            Your appointment has been successfully booked.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Email Section */}
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <Image
                src="/email-sent.png"
                alt="Confirmation email sent"
                width={120}
                height={120}
                className="mx-auto"
                priority
              />
            </div>

            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
                <MailIcon className="h-4 w-4" />
                Details sent to your inbox
              </div>

              <p className="text-xs text-muted-foreground">
                {appointmentDetails.userEmail}
              </p>
            </div>
          </div>

          {/* Appointment Summary */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <h4 className="font-medium text-sm text-center mb-3">
              Quick Summary
            </h4>

            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  {appointmentDetails.doctorName}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>{appointmentDetails.appointmentDate}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                <span>{appointmentDetails.appointmentTime}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button className="w-full" onClick={handleViewAppointments}>
              View My Appointments
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>

          {/* Footer Info */}
          <div className="text-center text-xs text-muted-foreground border-t pt-4">
            <p>
              Please arrive 15 minutes early for your appointment.
              <br />
              Need to reschedule? Contact us 24 hours in advance.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
