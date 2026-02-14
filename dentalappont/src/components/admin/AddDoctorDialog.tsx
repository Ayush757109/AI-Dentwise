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
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

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
    imageUrl: "",
    bio: "",
  });

  /* ===========================
      HANDLERS
  ============================ */

  const handleSave = () => {
    if (!form.name || !form.email || !form.speciality) {
      toast.error("Please fill all required fields.");
      return;
    }

    createDoctorMutation.mutate(form, {
      onSuccess: () => {
        toast.success("Doctor added successfully 🎉");
        handleClose();
      },
      onError: () => {
        toast.error("Failed to add doctor.");
      },
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
      imageUrl: "",
      bio: "",
    });
  };

  /* ===========================
      UI
  ============================ */

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogDescription>
            Fill in the details below to onboard a new doctor.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">

          {/* NAME */}
          <div className="space-y-2">
            <Label>Name *</Label>
            <Input
              placeholder="Dr. John Doe"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          {/* SPECIALITY */}
          <div className="space-y-2">
            <Label>Speciality *</Label>
            <Input
              placeholder="Orthodontist"
              value={form.speciality}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, speciality: e.target.value }))
              }
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <Label>Email *</Label>
            <Input
              type="email"
              placeholder="doctor@example.com"
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          {/* PHONE */}
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              placeholder="+1 234 567 890"
              value={form.phone}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
          </div>

          {/* GENDER */}
          <div className="space-y-2">
            <Label>Gender</Label>
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
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* BIO */}
          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              placeholder="Short professional bio..."
              value={form.bio}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, bio: e.target.value }))
              }
            />
          </div>

          {/* IMAGE URL */}
          <div className="space-y-2">
            <Label>Profile Image URL</Label>
            <Input
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, imageUrl: e.target.value }))
              }
            />
          </div>

        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={createDoctorMutation.isPending}
          >
            {createDoctorMutation.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            {createDoctorMutation.isPending
              ? "Adding Doctor..."
              : "Add Doctor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
