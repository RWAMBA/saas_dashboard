"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddCustomerForm } from "./add-customer-form";
import type { CreateCustomerInput } from "@/types";

interface AddCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (customerData: CreateCustomerInput) => Promise<void>;
}

export function AddCustomerDialog({
  open,
  onOpenChange,
  onAdd,
}: AddCustomerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
        </DialogHeader>
        <AddCustomerForm onAdd={onAdd} />
      </DialogContent>
    </Dialog>
  );
} 