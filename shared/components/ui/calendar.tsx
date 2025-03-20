import React, { useState } from "react";

interface Props {
  className?: string;
}

const months = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];
const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const Calendar: React.FC<Props> = ({ className }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: newDate, end: null });
    } else if (selectedRange.start && !selectedRange.end) {
      if (newDate < selectedRange.start) {
        setSelectedRange({ start: newDate, end: selectedRange.start });
      } else {
        setSelectedRange({ ...selectedRange, end: newDate });
      }
    }
  };

  const isDateInRange = (date: Date) => {
    if (!selectedRange.start || !selectedRange.end) return false;
    return date >= selectedRange.start && date <= selectedRange.end;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells before first day
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected = selectedRange.start?.getTime() === date.getTime() || 
                        selectedRange.end?.getTime() === date.getTime();
      const isInRange = isDateInRange(date);

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-10 flex items-center justify-center cursor-pointer rounded-full
            ${isSelected ? "bg-blue-500 text-white" : ""}
            ${isInRange && !isSelected ? "bg-blue-100" : ""}
            ${!isSelected && !isInRange ? "hover:bg-gray-100" : ""}`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className={`${className} max-w-md mx-auto p-4 bg-white rounded-lg shadow-md`}>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          ←
        </button>
        <h2 className="text-lg font-semibold">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-full"
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
          <p>Конец: {selectedRange.end?.toLocaleDateString("ru-RU") || "Не выбрано"}</p>
        </div>
      )}
    </div>
  );
};