import { Habit } from '../types';
import { getWeekDays, DAY_NAMES, COLOR_CLASSES } from '../utils/helpers';

interface WeekViewProps {
  habit: Habit;
  onToggleDay: (dateStr: string) => void;
  currentDate: Date;
}

export function WeekView({ habit, onToggleDay, currentDate }: WeekViewProps) {
  const days = getWeekDays(currentDate);
  const colors = COLOR_CLASSES[habit.color] || COLOR_CLASSES.emerald;

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-2 text-center">
        {DAY_NAMES.map((day, i) => (
          <div key={i} className="text-xs font-semibold text-slate-500 uppercase">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const status = habit.history[day.dateStr];
          let cellClass = 'bg-slate-50 text-slate-600 border-slate-200';
          
          if (status === true) {
            cellClass = colors.done;
          } else if (status === false) {
            cellClass = colors.notDone;
          }
          
          const isClickable = day.isPastOrToday;
          
          return (
            <button
              key={day.dateStr}
              onClick={() => isClickable && onToggleDay(day.dateStr)}
              disabled={!isClickable}
              className={`
                aspect-square rounded-xl flex items-center justify-center
                font-semibold text-sm border-2 transition-all duration-200
                ${cellClass}
                ${isClickable ? 'cursor-pointer hover:scale-105 hover:shadow-sm' : 'opacity-50 cursor-not-allowed'}
                ${day.isToday ? 'ring-2 ring-offset-1 ring-slate-400' : ''}
              `}
            >
              {day.dayNum}
            </button>
          );
        })}
      </div>
    </div>
  );
}