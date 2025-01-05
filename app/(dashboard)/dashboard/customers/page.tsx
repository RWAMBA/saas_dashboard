import { Suspense } from "react";
import { CustomersDashboard } from "@/components/customers/customers-dashboard";
import { CustomersTableSkeleton } from "@/components/customers/customers-table-skeleton";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
        <p className="text-muted-foreground">
          Manage and analyze your customer base
        </p>
      </div>
      
      <Suspense fallback={<CustomersTableSkeleton />}>
        <CustomersDashboard />
      </Suspense>
    </div>
  );
} 