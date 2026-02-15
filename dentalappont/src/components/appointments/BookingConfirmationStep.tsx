"use client";

import { APPOINTMENT_TYPES } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DoctorInfo from "./DoctorInfo";
import { format, isValid } from "date-fns";

interface BookingConfirmationStepProps {
  selectedDentistId: string;
  selectedDate: string;
  selectedTime: string;
  selectedType: string;
  isBooking: boolean;
  onBack: () => void;
  onConfirm: () => void;
  onModify: () => void;
}

function BookingConfirmationStep({
  selectedDentistId,
  selectedDate,
  selectedTime,
  selectedType,
  isBooking,
  onBack,
  onConfirm,
  onModify,
}: BookingConfirmationStepProps) {
  const appointmentType = APPOINTMENT_TYPES.find(
    (t) => t.id === selectedType
  );

  const parsedDate = new Date(selectedDate);
  const formattedDate =
    selectedDate && isValid(parsedDate)
      ? format(parsedDate, "EEEE, MMMM d, yyyy")
      : "Invalid date";

  const isValidBooking =
    !!selectedDentistId &&
    !!selectedDate &&
    !!selectedTime &&
    !!appointmentType;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ChevronLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-semibold">
          Confirm Your Appointment
        </h2>
      </div>

      {/* Summary Card */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Appointment Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Doctor Info */}
          <DoctorInfo doctorId={selectedDentistId} />

          {/* Appointment Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">
                Appointment Type
              </p>
              <p className="font-medium">
                {appointmentType?.name ?? "Not selected"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">
                {appointmentType?.duration ?? "--"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{formattedDate}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-medium">
                {selectedTime || "Not selected"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">Dental Center</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Cost</p>
              <p className="font-medium text-primary">
                {appointmentType?.price ?? "--"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={onModify}>
          Modify Appointment
        </Button>

        <Button
          onClick={onConfirm}
          disabled={!isValidBooking || isBooking}
          className="bg-primary"
        >
          {isBooking ? "Booking..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
}

export default BookingConfirmationStep;
