import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Calendar,
  Label,
  cn
} from '@wearemobi/ui';

export interface MobiDateTimeProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const MobiDateTime: React.FC<MobiDateTimeProps> = ({
  date,
  onDateChange,
  label,
  placeholder = "Pick a date",
  className,
  disabled
}) => {
  return (
    <div className={cn("space-y-1.5 flex flex-col", className)}>
      {label && <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
