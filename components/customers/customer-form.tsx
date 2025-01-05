"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Customer, CreateCustomerInput } from "@/types";

interface CustomerFormProps {
  customer?: Customer;
  onSubmit: (data: CreateCustomerInput) => Promise<void>;
  submitText?: string;
}

export function CustomerForm({ 
  customer, 
  onSubmit,
  submitText = "Save Changes" 
}: CustomerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateCustomerInput>({
    name: customer?.name ?? "",
    email: customer?.email ?? "",
    status: (customer?.status ?? "active") as CreateCustomerInput["status"],
    plan: (customer?.plan ?? "free") as CreateCustomerInput["plan"],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
        <Select 
          value={formData.status} 
          onValueChange={(value) => 
            setFormData(prev => ({ 
              ...prev, 
              status: value as CreateCustomerInput["status"] 
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Select 
          value={formData.plan}
          onValueChange={(value) => 
            setFormData(prev => ({ 
              ...prev, 
              plan: value as CreateCustomerInput["plan"] 
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="starter">Starter</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : submitText}
      </Button>
    </form>
  );
} 