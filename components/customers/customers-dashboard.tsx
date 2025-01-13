"use client";

import { useState } from "react";
import { CustomerMetrics } from "@/components/customers/customer-metrics";
import { CustomersTable } from "@/components/customers/customers-table";
import { CustomerFilters } from "@/components/customers/customer-filters";
import { DateRangeSelector } from "@/components/analytics/date-range-selector";
import { AddCustomerDialog } from "@/components/customers/add-customer-dialog";
import { useCustomers } from "@/hooks/use-customers";
import { useCustomerMetrics } from "@/hooks/use-customer-metrics";
import type { DateRange, Customer, CreateCustomerInput } from "@/types";
import { Button } from "@/components/ui/button";

export function CustomersDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [filters, setFilters] = useState({
    status: "all",
    plan: "all",
  });
  const [showForm, setShowForm] = useState(false);
  
  const { 
    addCustomer, 
    updateCustomer, 
    deleteCustomer,
    refreshCustomers 
  } = useCustomers(filters);
  
  const { refreshMetrics } = useCustomerMetrics(dateRange);

  const handleAddCustomer = async (customerData: CreateCustomerInput) => {
    try {
      await addCustomer(customerData);
      setShowForm(false);
      await Promise.all([refreshCustomers(), refreshMetrics()]);
    } catch (error) {
      console.error('Error in handleAddCustomer:', error);
    }
  };

  const handleUpdateCustomer = async (id: string, data: Partial<Customer>) => {
    try {
      await updateCustomer(id, data);
      await Promise.all([refreshCustomers(), refreshMetrics()]);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    try {
      await deleteCustomer(id);
      await Promise.all([refreshCustomers(), refreshMetrics()]);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <CustomerFilters 
          filters={filters} 
          onFilterChange={setFilters} 
        />
        <DateRangeSelector 
          onChange={(range) => {
            if (range.from && range.to) {
              setDateRange(range);
            }
          }} 
        />
      </div>
      
      <CustomerMetrics dateRange={dateRange} />
      <div className="flex justify-end">
        <Button
          onClick={() => setShowForm((prev) => !prev)}
          variant="default"
        >
          Add Customer
        </Button>
      </div>

      <AddCustomerDialog
        open={showForm}
        onOpenChange={setShowForm}
        onAdd={handleAddCustomer}
      />

      <CustomersTable
        filters={filters}
        onEdit={handleUpdateCustomer}
        onDelete={handleDeleteCustomer}
      />
    </div>
  );
} 