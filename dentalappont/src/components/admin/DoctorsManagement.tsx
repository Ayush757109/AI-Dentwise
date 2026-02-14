"use client";

import { useGetDoctors } from "@/hooks/use-doctors";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  EditIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  StethoscopeIcon,
  Search,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Badge } from "../ui/badge";
import AddDoctorDialog from "./AddDoctorDialog";
import EditDoctorDialog from "./EditDoctorDialog";
import { Doctor } from "@prisma/client";
import { Input } from "../ui/input";

export default function DoctorsManagement() {
  const { data: doctors = [], isLoading } = useGetDoctors();

  const [search, setSearch] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <>
      <Card className="mb-12 shadow-sm border">
        {/* HEADER */}
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <StethoscopeIcon className="size-5 text-primary" />
              Doctors Management
            </CardTitle>
            <CardDescription>
              Manage and oversee all doctors in your practice
            </CardDescription>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
            >
              <PlusIcon className="mr-2 size-4" />
              Add Doctor
            </Button>
          </div>
        </CardHeader>

        {/* CONTENT */}
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading doctors...
            </div>
          ) : filteredDoctors.length === 0 ? (
            <EmptyState onAdd={() => setIsAddDialogOpen(true)} />
          ) : (
            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-muted/30 rounded-xl border hover:shadow-md transition"
                >
                  {/* LEFT SECTION */}
                  <div className="flex items-center gap-4">
                    <Image
                      src={doctor.imageUrl || "/doctor-placeholder.png"}
                      alt={doctor.name}
                      width={56}
                      height={56}
                      className="size-14 rounded-full object-cover ring-2 ring-background"
                    />

                    <div>
                      <div className="font-semibold text-lg">
                        {doctor.name}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {doctor.speciality}
                        <span className="ml-2 px-2 py-0.5 bg-muted rounded text-xs">
                          {doctor.gender === "MALE" ? "Male" : "Female"}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MailIcon className="h-3 w-3" />
                          {doctor.email}
                        </div>

                        <div className="flex items-center gap-1">
                          <PhoneIcon className="h-3 w-3" />
                          {doctor.phone || "Not provided"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SECTION */}
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-semibold text-primary text-lg">
                        {doctor.appointmentCount ?? 0}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Appointments
                      </div>
                    </div>

                    {doctor.isActive ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9"
                      onClick={() => handleEditDoctor(doctor)}
                    >
                      <EditIcon className="size-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* DIALOGS */}
      <AddDoctorDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      <EditDoctorDialog
        key={selectedDoctor?.id}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        doctor={selectedDoctor}
      />
    </>
  );
}

/* ============================
   EMPTY STATE
============================ */

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="text-center py-16 space-y-4">
      <StethoscopeIcon className="mx-auto size-12 text-muted-foreground" />
      <h3 className="text-lg font-semibold">No doctors found</h3>
      <p className="text-sm text-muted-foreground">
        Start by adding your first doctor to the system.
      </p>
      <Button onClick={onAdd}>
        <PlusIcon className="size-4 mr-2" />
        Add First Doctor
      </Button>
    </div>
  );
}
