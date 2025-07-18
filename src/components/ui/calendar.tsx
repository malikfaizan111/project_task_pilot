import * as React from "react";
import { startOfToday } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import "react-day-picker/style.css";
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  // allow callers to override if needed:
  disabled,
  ...props
}: CalendarProps) {
  const today = startOfToday();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      // if the caller didn’t pass `disabled`, use our “before today” matcher
      disabled={
        disabled ??
        ((date) => {
          // block any date < today (so today is still selectable)
          return date < today;
        })
      }
      className={cn("p-3", className)}
      classNames={{
        /* your existing classNames here… */
        ...classNames,
      }}
      components={{
        IconLeft: (p) => <ChevronLeft className="h-4 w-4" {...p} />,
        IconRight: (p) => <ChevronRight className="h-4 w-4" {...p} />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";
export { Calendar };
