"use client";

import { useEffect, useState } from "react";
import { Doctor, Gender } from "@prisma/client";
import { useUpdateDoctor } from "@/hooks/use-doctors";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}

interface EditableDoctorFields {
  id: string;
  name: string;
  speciality: string;
  email: string;
  phone: string | null;
  gender: Gender;
  isActive: boolean;
}

export default function EditDoctorDialog({
  doctor,
  isOpen,
  onClose,
}: Props) {
  const updateDoctor = useUpdateDoctor();

  const [form, setForm] = useState<EditableDoctorFields | null>(null);

  useEffect(() => {
    if (doctor) {
      setForm({
        id: doctor.id,
        name: doctor.name,
        speciality: doctor.speciality,
        email: doctor.email,
        phone: doctor.phone,
        gender: doctor.gender,
        isActive: doctor.isActive,
      });
    }
  }, [doctor]);

  if (!form) return null;

  const handleSave = () => {
    if (!form.name || !form.speciality || !form.email) {
      toast.error("Please fill required fields.");
      return;
    }

    updateDoctor.mutate(form, {
      onSuccess: () => {
        toast.success("Doctor updated successfully ✨");
        onClose();
      },
      onError: () => {
        toast.error("Failed to update doctor.");
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Edit Doctor</DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 py-4">

          {/* NAME */}
          <div className="space-y-2">
            <Label>Name *</Label>
            <Input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          {/* SPECIALITY */}
          <div className="space-y-2">
            <Label>Speciality *</Label>
            <Input
              value={form.speciality}
              onChange={(e) =>
                setForm({ ...form, speciality: e.target.value })
              }
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <Label>Email *</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* PHONE */}
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={form.phone ?? ""}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </div>

          {/* GENDER */}
          <div className="space-y-2">
            <Label>Gender</Label>
            <Select
              value={form.gender}
              onValueChange={(value) =>
                setForm({ ...form, gender: value as Gender })
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

          {/* ACTIVE SWITCH */}
          <div className="flex items-center justify-between border rounded-lg p-4">
            <div>
              <Label>Active Status</Label>
              <p className="text-sm text-muted-foreground">
                Toggle doctor availability
              </p>
            </div>

            <Switch
              checked={form.isActive}
              onCheckedChange={(value) =>
                setForm({ ...form, isActive: value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={updateDoctor.isPending}
          >
            {updateDoctor.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            {updateDoctor.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
