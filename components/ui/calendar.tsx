"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Select a Date</h2>
      <div className="flex items-center space-x-2">
        <Button onClick={() => handleDateChange(new Date())}>Today</Button>
        <span>{selectedDate ? selectedDate.toDateString() : "No date selected"}</span>
      </div>
    </div>
  );
}
