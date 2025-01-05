"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TopPagesProps {
  data: Array<{
    path: string;
    _count: number;
  }>;
}

export function TopPages({ data = [] }: TopPagesProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Page</TableHead>
          <TableHead className="text-right">Views</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((page) => (
          <TableRow key={page.path}>
            <TableCell className="font-medium">{page.path}</TableCell>
            <TableCell className="text-right">{page._count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 