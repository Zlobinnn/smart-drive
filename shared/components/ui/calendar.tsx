import { useOrderStore } from "@/shared/store/useOrderStore";
import { Vehicle, Order } from "@prisma/client";
import React, { useState } from "react";
import { useOrders } from "@/shared/hooks/use-orders";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
  product: Vehicle;
}

const months = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];
const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const Calendar: React.FC<Props> = ({ className, product }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { orders, loading } = useOrders(product);
  const { selectedRange, setSelectedRange } = useOrderStore();

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonthDate);
  };

  const nextMonth = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    if (nextMonthDate <= maxDate) {
      setCurrentDate(nextMonthDate);
    }
  };

  const isNextMonthDisabled = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);
    return currentDate.getFullYear() === maxDate.getFullYear() &&
      currentDate.getMonth() >= maxDate.getMonth();
  };

  const isPrevMonthDisabled = () => {
    const now = new Date();
    return (
      currentDate.getFullYear() <= now.getFullYear() &&
      currentDate.getMonth() <= now.getMonth()
    );
  };

  const isPastDate = (date: Date) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return date < now;
  };

  const isDateBooked = (date: Date) => {
    return orders.some((order) => {
      const start = new Date(order.startDate);
      const end = new Date(order.endDate);
      return date >= start && date <= end;
    });
  };

  const doesRangeOverlap = (start: Date, end: Date) => {
    return orders.some((order) => {
      const orderStart = new Date(order.startDate);
      const orderEnd = new Date(order.endDate);
      return start <= orderEnd && end >= orderStart;
    });
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const isPast = isPastDate(newDate);
    const isBooked = isDateBooked(newDate);

    if (isPast || isBooked) {
      return;
    }

    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: newDate, end: null, days: 1 });
    } else if (selectedRange.start && !selectedRange.end) {
      if (newDate.getTime() === selectedRange.start.getTime()) {
        return;
      }

      const start = newDate < selectedRange.start ? newDate : selectedRange.start;
      const end = newDate > selectedRange.start ? newDate : selectedRange.start;

      if (doesRangeOverlap(start, end)) {
        setSelectedRange({ start: null, end: null, days: 0 });
        return;
      }

      if (newDate < selectedRange.start) {
        setSelectedRange({ start: newDate, end: selectedRange.start, days: 1 });
      } else {
        setSelectedRange({ ...selectedRange, end: newDate });
      }
    }
  };

  const isDateInRange = (date: Date) => {
    if (!selectedRange.start || !selectedRange.end) return false;
    return date >= selectedRange.start && date <= selectedRange.end;
  };

  const renderSkeleton = () => {
    return (
      <>
        {/* Скелетон заголовка */}
        <div className="flex justify-between items-center mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
        </div>

        {/* Скелетон дней недели */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {Array(7)
            .fill(0)
            .map((_, index) => (
              <div
                key={`skeleton-weekday-${index}`}
                className="h-6 w-6 mx-auto bg-gray-200 rounded animate-pulse"
              />
            ))}
          {/* Скелетон дней месяца */}
          {Array(35)
            .fill(0)
            .map((_, index) => (
              <div
                key={`skeleton-day-${index}`}
                className="h-10 w-10 mx-auto bg-gray-200 rounded-full animate-pulse"
              />
            ))}
        </div>
      </>
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected =
        selectedRange.start?.getTime() === date.getTime() ||
        selectedRange.end?.getTime() === date.getTime();
      const isInRange = isDateInRange(date);
      const isPast = isPastDate(date);
      const isBooked = isDateBooked(date);

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={cn(
            "h-10 flex items-center justify-center rounded-full",
            isSelected ? "bg-blue-500 text-white" : "",
            isInRange && !isSelected ? "bg-blue-100" : "",
            isPast || isBooked
              ? "text-gray-300 cursor-not-allowed"
              : "cursor-pointer hover:bg-gray-100"
          )}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div
      className={cn(
        "max-w-md mx-auto p-4 bg-white rounded-lg shadow-md select-none",
        className
      )}
    >
      {loading ? (
        renderSkeleton()
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              disabled={isPrevMonthDisabled()}
              className={cn(
                "p-2 rounded-full",
                isPrevMonthDisabled() ? "text-gray-300" : "hover:bg-gray-100"
              )}
            >
              ←
            </button>
            <h2 className="text-lg font-semibold">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={nextMonth}
              disabled={isNextMonthDisabled()}
              className={cn(
                "p-2 rounded-full",
                isNextMonthDisabled() ? "text-gray-300" : "hover:bg-gray-100"
              )}
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {weekdays.map((day) => (
              <div key={day} className="font-medium text-gray-600">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>

          {selectedRange.start && (
            <div className="mt-4 text-sm">
              <p>Начало: {selectedRange.start.toLocaleDateString("ru-RU")}</p>
              <p>
                Конец: {selectedRange.end?.toLocaleDateString("ru-RU") || "Не выбрано"}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};