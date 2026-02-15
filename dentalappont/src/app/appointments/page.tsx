"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

import { AppointmentConfirmationModal } from "@/components/appointments/AppointmentConfirmationModal";
import BookingConfirmationStep from "@/components/appointments/BookingConfirmationStep";
import DoctorSelectionStep from "@/components/appointments/DoctorSelectionStep";
import ProgressSteps from "@/components/appointments/ProgressSteps";
import TimeSelectionStep from "@/components/appointments/TimeSelectionStep";
import Navbar from "@/components/Navbar";

import {
  useBookAppointment,
  useUserAppointments,
  type AppointmentDTO,
} from "@/hooks/use-appointment";
import { APPOINTMENT_TYPES } from "@/lib/utils";

function AppointmentsPage() {
  const [selectedDentistId, setSelectedDentistId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<AppointmentDTO | null>(null);

  const bookAppointmentMutation = useBookAppointment();
  const { data: userAppointments = [], isLoading } = useUserAppointments();

  /* =======================
     Derived Data
  ======================= */

  const appointmentType = useMemo(() => {
    return APPOINTMENT_TYPES.find((t) => t.id === selectedType);
  }, [selectedType]);

  /* =======================
     Helpers
  ======================= */

  const resetForm = () => {
    setSelectedDentistId(null);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedType("");
    setCurrentStep(1);
  };

  const handleSelectDentist = (dentistId: string) => {
    setSelectedDentistId(dentistId);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedType("");
  };

  const handleBookAppointment = () => {
    if (!selectedDentistId || !selectedDate || !selectedTime || !selectedType) {
      toast.error("Please fill in all required fields");
      return;
    }

    bookAppointmentMutation.mutate(
      {
        doctorId: selectedDentistId,
        date: selectedDate,
        time: selectedTime,
        reason: appointmentType?.name ?? "",
      },
      {
        onSuccess: async (appointment: AppointmentDTO) => {
          setBookedAppointment(appointment);

          try {
            const emailResponse = await fetch("/api/send-appointment-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userEmail: appointment.patientEmail,
                doctorName: appointment.doctorName,
                appointmentDate: format(
                  new Date(appointment.date),
                  "EEEE, MMMM d, yyyy"
                ),
                appointmentTime: appointment.time,
                appointmentType: appointmentType?.name,
                duration: appointmentType?.duration,
                price: appointmentType?.price,
              }),
            });

            if (!emailResponse.ok) {
              console.error("Failed to send confirmation email");
            }
          } catch (error) {
            console.error("Email sending error:", error);
          }

          setShowConfirmationModal(true);
          resetForm();
        },
        onError: (error: unknown) => {
          const message =
            error instanceof Error ? error.message : "Something went wrong";
          toast.error(`Failed to book appointment: ${message}`);
        },
      }
    );
  };

  /* =======================
     Render
  ======================= */

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Book an Appointment</h1>
          <p className="text-muted-foreground">
            Find and book with verified dentists in your area
          </p>
        </div>

        <ProgressSteps currentStep={currentStep} />

        {currentStep === 1 && (
          <DoctorSelectionStep
            selectedDentistId={selectedDentistId}
            onContinue={() => {
              if (!selectedDentistId) {
                toast.error("Please select a dentist");
                return;
              }
              setCurrentStep(2);
            }}
            onSelectDentist={handleSelectDentist}
          />
        )}

        {currentStep === 2 && selectedDentistId && (
          <TimeSelectionStep
            selectedDentistId={selectedDentistId}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedType={selectedType}
            onBack={() => setCurrentStep(1)}
            onContinue={() => {
              if (!selectedDate || !selectedTime || !selectedType) {
                toast.error("Please complete all fields");
                return;
              }
              setCurrentStep(3);
            }}
            onDateChange={setSelectedDate}
            onTimeChange={setSelectedTime}
            onTypeChange={setSelectedType}
          />
        )}

        {currentStep === 3 && selectedDentistId && (
          <BookingConfirmationStep
            selectedDentistId={selectedDentistId}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedType={selectedType}
            isBooking={bookAppointmentMutation.isPending}
            onBack={() => setCurrentStep(2)}
            onModify={() => setCurrentStep(2)}
            onConfirm={handleBookAppointment}
          />
        )}
      </div>

      {/* Confirmation Modal */}
      {bookedAppointment && (
        <AppointmentConfirmationModal
          open={showConfirmationModal}
          onOpenChange={setShowConfirmationModal}
          appointmentDetails={{
            doctorName: bookedAppointment.doctorName,
            appointmentDate: format(
              new Date(bookedAppointment.date),
              "EEEE, MMMM d, yyyy"
            ),
            appointmentTime: bookedAppointment.time,
            userEmail: bookedAppointment.patientEmail,
          }}
        />
      )}

      {/* Existing Appointments */}
      {!isLoading && userAppointments.length > 0 && (
        <div className="mb-8 max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-xl font-semibold mb-4">
            Your Upcoming Appointments
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-card border rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center">
                    {appointment.doctorName ? (
                      <span className="text-sm font-medium">
                        {appointment.doctorName.charAt(0)}
                      </span>
                    ) : (
                      <span className="text-sm">?</span>
                    )}
                  </div>

                  <div>
                    <p className="font-medium text-sm">
                      {appointment.doctorName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {appointment.reason}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                     {format(new Date(appointment.date), "MMM d, yyyy")}
                  </p>
                  <p className="text-muted-foreground">
                     {appointment.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default AppointmentsPage;
