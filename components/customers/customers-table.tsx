"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useCustomers } from "@/hooks/use-customers";
import { CustomerActions } from "@/components/customers/customer-actions";
import { customerEvents } from "@/lib/events";
import { CustomersTableSkeleton } from "./customers-table-skeleton";
import type { Customer } from "@/types";

interface CustomersTableProps {
  filters: {
    status: string;
    plan: string;
  };
  onEdit: (id: string, updatedCustomer: Partial<Customer>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function CustomersTable({ filters, onEdit, onDelete }: CustomersTableProps) {
  const [search, setSearch] = useState("");
  const { customers, loading, refreshCustomers } = useCustomers(filters);

  // Subscribe to customer events with proper cleanup
  useEffect(() => {
    const cleanup = customerEvents.subscribe(() => {
      refreshCustomers();
    });
    
    // Return cleanup function that doesn't return a value
    return () => {
      cleanup();
    };
  }, [refreshCustomers]);

  const filteredCustomers = customers?.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <CustomersTableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search customers..."
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers?.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.status}</TableCell>
                  <TableCell>{customer.plan}</TableCell>
                  <TableCell>{new Date(customer.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <CustomerActions
                      customer={customer}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 