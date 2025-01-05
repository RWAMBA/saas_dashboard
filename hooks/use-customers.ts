import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Customer, CreateCustomerInput } from "@/types";
import { customerEvents } from '@/lib/events';

interface UseCustomersOptions {
  status: string;
  plan: string;
}

export function useCustomers(filters: UseCustomersOptions) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        status: filters.status,
        plan: filters.plan,
      });
      
      const response = await fetch(`/api/customers?${params}`);
      if (!response.ok) throw new Error('Failed to fetch customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch customers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.plan, toast]);

  const addCustomer = async (customerData: CreateCustomerInput) => {
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create customer');
      }
      
      const newCustomer = await response.json();
      setCustomers(prev => [newCustomer, ...prev]);
      customerEvents.emit();
      toast({
        title: "Success",
        description: "Customer added successfully",
      });
      return newCustomer;
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create customer",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteCustomer = async (id: string) => {
    // Store the customer data before deletion for potential rollback
    const customerToDelete = customers.find(c => c.id === id);
    if (!customerToDelete) return;

    // Optimistically update UI
    setCustomers(prev => prev.filter(customer => customer.id !== id));
    
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        // Revert optimistic update if delete fails
        setCustomers(prev => [...prev, customerToDelete]);
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete customer');
      }

      customerEvents.emit();
      toast({
        title: "Success",
        description: "Customer deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete customer",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateCustomer = async (id: string, data: Partial<Customer>) => {
    const originalCustomer = customers.find(c => c.id === id);
    if (!originalCustomer) return;

    // Optimistically update UI
    setCustomers(prev => 
      prev.map(customer => 
        customer.id === id ? { ...customer, ...data } : customer
      )
    );

    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        // Revert optimistic update if update fails
        setCustomers(prev => 
          prev.map(customer => 
            customer.id === id ? originalCustomer : customer
          )
        );
        const error = await response.json();
        throw new Error(error.error || 'Failed to update customer');
      }

      const updatedCustomer = await response.json();
      customerEvents.emit();
      toast({
        title: "Success",
        description: "Customer updated successfully",
      });
      return updatedCustomer;
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update customer",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return { 
    customers, 
    loading,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    refreshCustomers: fetchCustomers
  };
} 