"use client";

import { useAvailableDoctors } from "@/hooks/use-doctors";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { MapPinIcon, PhoneIcon, StarIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DoctorCardsLoading } from "./DoctorCardsLoading";

interface DoctorSelectionStepProps {
  selectedDentistId: string | null;
  onSelectDentist: (dentistId: string) => void;
  onContinue: () => void;
}

function DoctorSelectionStep({
  onContinue,
  onSelectDentist,
  selectedDentistId,
}: DoctorSelectionStepProps) {
  const { data: dentists = [], isLoading } = useAvailableDoctors();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Choose Your Dentist</h2>
        <DoctorCardsLoading />
      </div>
    );
  }

  if (dentists.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Choose Your Dentist</h2>
        <p className="text-muted-foreground">
          No dentists are currently available. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Choose Your Dentist</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dentists.map((dentist) => {
          const isSelected = selectedDentistId === dentist.id;

          return (
            <Card
              key={dentist.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onClick={() => onSelectDentist(dentist.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectDentist(dentist.id);
                }
              }}
              className={`cursor-pointer transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                isSelected ? "ring-2 ring-primary" : ""
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  {dentist.imageUrl ? (
                    <Image
                      src={dentist.imageUrl}
                      alt={dentist.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-lg font-medium">
                      {dentist.name?.charAt(0) ?? "D"}
                    </div>
                  )}

                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {dentist.name}
                    </CardTitle>

                    <CardDescription className="text-primary font-medium">
                      {dentist.speciality || "General Dentistry"}
                    </CardDescription>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">
                          {dentist.rating ?? 5}
                        </span>
                      </div>

                      <span className="text-sm text-muted-foreground">
                        ({dentist.appointmentCount ?? 0} appointments)
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPinIcon className="w-4 h-4" />
                  <span>DentWise</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <PhoneIcon className="w-4 h-4" />
                  <span>{dentist.phone ?? "Not available"}</span>
                </div>

                <p className="text-sm text-muted-foreground">
                  {dentist.bio ||
                    "Experienced dental professional providing quality care."}
                </p>

                <Badge variant="secondary">
                  Licensed Professional
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedDentistId && (
        <div className="flex justify-end">
          <Button onClick={onContinue}>
            Continue to Time Selection
          </Button>
        </div>
      )}
    </div>
  );
}

export default DoctorSelectionStep;
