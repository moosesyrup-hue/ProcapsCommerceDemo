import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarPickerProps {
  selectedDate: string; // Format: "Month Day, Year" e.g., "December 19, 2025"
  onDateSelect: (date: string) => void;
  minDaysAhead?: number; // Minimum days from today (lead time)
  maxMonthsAhead?: number; // Maximum months ahead to allow
}

export function CalendarPicker({
  selectedDate,
  onDateSelect,
  minDaysAhead = 3,
  maxMonthsAhead = 12,
}: CalendarPickerProps) {
  // Parse selected date or default to today
  const parseSelectedDate = () => {
    if (!selectedDate) return new Date();
    const date = new Date(selectedDate);
    return isNaN(date.getTime()) ? new Date() : date;
  };

  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = parseSelectedDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    
    // If selected date is in the past, open to current month
    if (selectedDate < today) {
      return new Date(today.getFullYear(), today.getMonth(), 1);
    }
    
    // Otherwise open to the month of the selected date
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });

  // Calculate boundaries
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Start from today (no lead time restriction for viewing/selecting)
  const minDate = new Date(today);
  
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + maxMonthsAhead);

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Check if date is selected
  const isDateSelected = (day: number): boolean => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const selected = parseSelectedDate();
    return (
      checkDate.getDate() === selected.getDate() &&
      checkDate.getMonth() === selected.getMonth() &&
      checkDate.getFullYear() === selected.getFullYear()
    );
  };

  // Check if date is disabled
  const isDateDisabled = (day: number): boolean => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < minDate || checkDate > maxDate;
  };

  // Check if date is today
  const isToday = (day: number): boolean => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return (
      checkDate.getDate() === today.getDate() &&
      checkDate.getMonth() === today.getMonth() &&
      checkDate.getFullYear() === today.getFullYear()
    );
  };

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Handle date click
  const handleDateClick = (day: number) => {
    if (isDateDisabled(day)) return;
    
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    
    onDateSelect(formattedDate);
  };

  // Build calendar grid
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const days: (number | null)[] = [];

  // Add empty slots for days before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  // Add actual days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Check if we can navigate
  const canGoPrevious = currentMonth > new Date(today.getFullYear(), today.getMonth(), 1);
  const canGoNext = currentMonth < new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);

  return (
    <div className="bg-white border border-[#D9E2E2] rounded-[8px] p-[16px] max-w-[340px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-[16px]">
        <button
          onClick={goToPreviousMonth}
          disabled={!canGoPrevious}
          className="p-[4px] rounded-[6px] hover:bg-[#F5F9F9] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          aria-label="Previous month"
        >
          <ChevronLeft className="size-[18px] text-[#003b3c]" />
        </button>
        
        <h3 className="font-['Inter',sans-serif] text-[14px] font-medium text-[#003b3c]">
          {monthName}
        </h3>
        
        <button
          onClick={goToNextMonth}
          disabled={!canGoNext}
          className="p-[4px] rounded-[6px] hover:bg-[#F5F9F9] transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          aria-label="Next month"
        >
          <ChevronRight className="size-[18px] text-[#003b3c]" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-[2px] mb-[6px]">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div
            key={index}
            className="text-center font-['Inter',sans-serif] text-[10px] font-medium text-[#406c6d] uppercase tracking-[0.05em] py-[4px]"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-[3px] mb-[12px]">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const disabled = isDateDisabled(day);
          const selected = isDateSelected(day);
          const today = isToday(day);

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              disabled={disabled}
              className={`
                aspect-square rounded-[4px] font-['Inter',sans-serif] text-[13px]
                transition-all flex items-center justify-center
                ${disabled 
                  ? 'text-[#C2CFCF] cursor-not-allowed' 
                  : 'text-[#003b3c] cursor-pointer hover:bg-[#E0F7F8] hover:border-[#48E1DC]'
                }
                ${selected 
                  ? 'bg-[#009296] text-white font-medium hover:bg-[#007d81] border-[#009296]' 
                  : 'bg-white border border-[#D9E2E2]'
                }
                ${today && !selected 
                  ? 'border-[#48E1DC] border-2' 
                  : ''
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend - More compact */}
      <div className="pt-[12px] border-t border-[#D9E2E2] flex flex-wrap gap-x-[16px] gap-y-[6px] text-[10px] font-['Inter',sans-serif] mb-[10px]">
        <div className="flex items-center gap-[4px]">
          <div className="size-[14px] rounded-[3px] border-2 border-[#48E1DC]" />
          <span className="text-[#406c6d]">Today</span>
        </div>
        <div className="flex items-center gap-[4px]">
          <div className="size-[14px] rounded-[3px] bg-[#009296]" />
          <span className="text-[#406c6d]">Selected</span>
        </div>
      </div>

      {/* Helper Text - More concise */}
      <p className="font-['Inter',sans-serif] text-[11px] text-[#406c6d] leading-[1.4]">
        Select any date for next delivery. Future deliveries continue at your regular frequency.
      </p>
    </div>
  );
}