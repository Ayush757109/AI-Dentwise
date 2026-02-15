"use client";

import { useMemo } from "react";
import { useAvailableDoctors } from "@/hooks/use-doctors";
import Image from "next/image";

interface DoctorInfoProps {
  doctorId: string;
}

function DoctorInfo({ doctorId }: DoctorInfoProps) {
  const { data: doctors = [], isLoading } = useAvailableDoctors();

  const doctor = useMemo(() => {
    return doctors.find((d) => d.id === doctorId);
  }, [doctors, doctorId]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 animate-pulse">
        <div className="w-12 h-12 rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="h-4 w-28 bg-muted rounded" />
          <div className="h-3 w-20 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="text-sm text-muted-foreground">
        Doctor information unavailable
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {doctor.imageUrl ? (
        <Image
          src={doctor.imageUrl}
          alt={doctor.name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
          {doctor.name.charAt(0)}
        </div>
      )}

      <div>
        <h3 className="font-medium">{doctor.name}</h3>
        <p className="text-sm text-muted-foreground">
          {doctor.speciality || "General Dentistry"}
        </p>
      </div>
    </div>
  );
}

export default DoctorInfo;
