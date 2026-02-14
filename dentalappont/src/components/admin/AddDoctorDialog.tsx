

"use client";

import { useCreateDoctor } from "@/hooks/use-doctors";
import { Gender } from "@prisma/client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
//import { formatPhoneNumber } from "@/lib/utils";

interface AddDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DoctorFormValues {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  gender: Gender;
  isActive: boolean;
  imageUrl: string;
  bio?: string;
}

export default function AddDoctorDialog({
  isOpen,
  onClose,
}: AddDoctorDialogProps) {
  const createDoctorMutation = useCreateDoctor();

  const [form, setForm] = useState<DoctorFormValues>({
    name: "",
    email: "",
    phone: "",
    speciality: "",
    gender: "MALE",
    isActive: true,
    imageUrl: "/doctor-placeholder.png",
    bio: "",
  });

  const handleSave = () => {
    createDoctorMutation.mutate(form, {
      onSuccess: handleClose,
    });
  };

  const handleClose = () => {
    onClose();
    setForm({
      name: "",
      email: "",
      phone: "",
      speciality: "",
      gender: "MALE",
      isActive: true,
      imageUrl: "/doctor-placeholder.png",
      bio: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogDescription>
            Add a new doctor to your practice.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <Input
            placeholder="Speciality"
            value={form.speciality}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, speciality: e.target.value }))
            }
          />

          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <Input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
               // phone: formatPhoneNumber(e.target.value),
              }))
            }
          />

          <Select
            value={form.gender}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                gender: value as Gender,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={
              !form.name ||
              !form.email ||
              !form.speciality ||
              createDoctorMutation.isPending
            }
          >
            {createDoctorMutation.isPending ? "Adding..." : "Add Doctor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
