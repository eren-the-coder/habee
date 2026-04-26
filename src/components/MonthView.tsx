import { Habit } from '../types';
import { getMonthDays, DAY_NAMES, COLOR_CLASSES } from '../utils/helpers';

interface MonthViewProps {
  habit: Habit;
  year: number;
  month: number;
}

export function MonthView({ habit, year, month }: MonthViewProps) {
  const days = getMonthDays(year, month);
  const colors = COLOR_CLASSES[habit.color] || COLOR_CLASSES.emerald;

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-1 text-center">
        {DAY_NAMES.map((day, i) => (
          <div key={i} className="text-xs font-semibold text-slate-400 uppercase py-1">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (!day) {
            return <div key={`empty-${i}`} className="aspect-square" />;
          }
          
          const status = habit.history[day.dateStr];
          let cellClass = 'bg-slate-50';
          
          if (status === true) {
            cellClass = colors.done.split(' ')[0];
          } else if (status === false) {
            cellClass = colors.notDone.split(' ')[0];
          }
          
          return (
            <div
              key={day.dateStr}
              className={`
                aspect-square rounded-lg flex items-center justify-center
                text-xs font-medium ${cellClass}
              `}
            >
              {day.dayNum}
            </div>
          );
        })}
      </div>
      
      <p className="text-center text-xs text-slate-400 mt-4">
        Vue mois : lecture seule
      </p>
    </div>
  );
}