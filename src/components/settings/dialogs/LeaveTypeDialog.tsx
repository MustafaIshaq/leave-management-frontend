"use client";

import { useEffect, useState } from "react";
import { LeaveType } from "@/types/leaveType";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LeaveTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: LeaveType | null;
  onSubmit: (data: {
    name: string;
    unit: "DAYS" | "HOURS" | "BOTH";
    is_deductible: boolean;
    color: string;
  }) => Promise<void>;
}

export default function LeaveTypeDialog({
  open,
  onOpenChange,
  initialData,
  onSubmit,
}: LeaveTypeDialogProps) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState<"DAYS" | "HOURS" | "BOTH">("DAYS");
  const [isDeductible, setIsDeductible] = useState(false);
  const [color, setColor] = useState("blue");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setUnit(initialData.unit);
      setIsDeductible(initialData.is_deductible);
      setColor(initialData.color);
    } else {
      setName("");
      setUnit("DAYS");
      setIsDeductible(false);
      setColor("blue");
    }
  }, [initialData, open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({
        name,
        unit,
        is_deductible: isDeductible,
        color,
      });
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  const isEdit = Boolean(initialData);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit leave type" : "Add leave type"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <Label htmlFor="leave-type-name">Name</Label>
            <Input
              id="leave-type-name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Unit</Label>
            <Select value={unit} onValueChange={(value) => setUnit((value as "DAYS" | "HOURS" | "BOTH") ?? "DAYS")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DAYS">DAYS</SelectItem>
                <SelectItem value="HOURS">HOURS</SelectItem>
                <SelectItem value="BOTH">BOTH</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="leave-type-color">Color</Label>
            <Input
              id="leave-type-color"
              value={color}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setColor(e.target.value)
              }
              placeholder="green / red / blue"
            />
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              checked={isDeductible}
              onCheckedChange={(checked) => setIsDeductible(Boolean(checked))}
            />
            <Label>Deduct from allowance</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}