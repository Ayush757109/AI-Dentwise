"use client";

import { useEffect, useState } from "react";
import { Doctor, Gender } from "@prisma/client";
import { useUpdateDoctor } from "@/hooks/use-doctors";
//import { formatPhoneNumber } from "@/lib/utils";
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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}

export default function EditDoctorDialog({
  doctor,
  isOpen,
  onClose,
}: Props) {
  const [form, setForm] = useState<Doctor | null>(null);
  const updateDoctor = useUpdateDoctor();

  useEffect(() => {
    setForm(doctor);
  }, [doctor]);

  if (!form) return null;

  const handleSave = () => {
    updateDoctor.mutate(form, { onSuccess: onClose });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Doctor</DialogTitle>
        </DialogHeader>

        <Input
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <Input
          value={form.speciality}
          onChange={(e) =>
            setForm({ ...form, speciality: e.target.value })
          }
        />

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

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
