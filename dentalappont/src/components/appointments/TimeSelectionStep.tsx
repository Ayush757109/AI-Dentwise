"use client";

import { useMemo } from "react";
import { useBookedTimeSlots } from "@/hooks/use-appointment";
import {
  APPOINTMENT_TYPES,
  getAvailableTimeSlots,
  getNext5Days,
} from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ClockIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { format, isValid } from "date-fns";

interface TimeSelectionStepProps {
  selectedDentistId: string;
  selectedDate: string;
  selectedTime: string;
  selectedType: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onTypeChange: (type: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

function TimeSelectionStep({
  onBack,
  onContinue,
  onDateChange,
  onTimeChange,
  onTypeChange,
  selectedDate,
  selectedDentistId,
  selectedTime,
  selectedType,
}: TimeSelectionStepProps) {
  const {
    data: bookedTimeSlotsRaw,
    isLoading: isLoadingSlots,
  } = useBookedTimeSlots(selectedDentistId, selectedDate);

  const bookedTimeSlots = bookedTimeSlotsRaw ?? [];

  const availableDates = useMemo(() => getNext5Days(), []);
  const availableTimeSlots = useMemo(() => getAvailableTimeSlots(), []);

  const handleDateSelect = (date: string) => {
    onDateChange(date);
    onTimeChange(""); // Reset time on date change
  };

  const formattedDate = (date: string) => {
    const parsed = new Date(date);
    return isValid(parsed)
      ? format(parsed, "EEE, MMM d")
      : "Invalid date";
  };

  const isValidSelection =
    selectedType && selectedDate && selectedTime;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ChevronLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-semibold">
          Select Date & Time
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appointment Type */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Appointment Type
          </h3>

          <div className="space-y-3">
            {APPOINTMENT_TYPES.map((type) => {
              const isSelected = selectedType === type.id;

              return (
                <Card
                  key={type.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => onTypeChange(type.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onTypeChange(type.id);
                    }
                  }}
                  className={`cursor-pointer transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                    isSelected ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">
                          {type.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {type.duration}
                        </p>
                      </div>
                      <span className="font-semibold text-primary">
                        {type.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Date & Time */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Available Dates
          </h3>

          {/* Date Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {availableDates.map((date) => (
              <Button
                key={date}
                variant={
                  selectedDate === date ? "default" : "outline"
                }
                onClick={() => handleDateSelect(date)}
                className="h-auto p-3"
              >
                <div className="text-center font-medium">
                  {formattedDate(date)}
                </div>
              </Button>
            ))}
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div className="space-y-3">
              <h4 className="font-medium">
                Available Times
              </h4>

              {isLoadingSlots ? (
                <p className="text-sm text-muted-foreground">
                  Checking availability...
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {availableTimeSlots.map((time) => {
                    const isBooked =
                      bookedTimeSlots.includes(time);

                    return (
                      <Button
                        key={time}
                        variant={
                          selectedTime === time
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          !isBooked && onTimeChange(time)
                        }
                        size="sm"
                        disabled={isBooked}
                        className={
                          isBooked
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }
                      >
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {time}
                      </Button>
                    );
                  })}
                </div>
              )}

              {!isLoadingSlots &&
                availableTimeSlots.every((t) =>
                  bookedTimeSlots.includes(t)
                ) && (
                  <p className="text-sm text-muted-foreground">
                    All time slots are booked for this day.
                  </p>
                )}
            </div>
          )}
        </div>
      </div>

      {/* Continue Button */}
      {isValidSelection && (
        <div className="flex justify-end">
          <Button onClick={onContinue}>
            Review Booking
          </Button>
        </div>
      )}
    </div>
  );
}

export default TimeSelectionStep;
