"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import type { DateRange as DayPickerRange } from "react-day-picker";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "@/types";

interface DateRangeSelectorProps {
  onChange: (range: DateRange) => void;
  className?: string;
}

export function DateRangeSelector({ onChange, className }: DateRangeSelectorProps) {
  const [date, setDate] = useState<DayPickerRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const handleSelect = (range: DayPickerRange | undefined) => {
    setDate(range);
    if (range?.from && range?.to) {
      onChange({
        from: range.from,
        to: range.to
      });
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
} 