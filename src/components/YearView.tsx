import { Habit } from '../types';
import { getYearMonths, DAY_NAMES, COLOR_CLASSES } from '../utils/helpers';

interface YearViewProps {
  habit: Habit;
  year: number;
}

export function YearView({ habit, year }: YearViewProps) {
  const months = getYearMonths(year);
  const colors = COLOR_CLASSES[habit.color] || COLOR_CLASSES.emerald;

  return (
    <div className="space-y-6">
      {months.map((month, mIndex) => (
        <div key={mIndex} className="bg-slate-50 rounded-2xl p-4">
          <h4 className="font-bold text-slate-700 mb-3 capitalize">
            {month.name}
          </h4>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAY_NAMES.map((day, i) => (
              <div key={i} className="text-xs font-semibold text-slate-400 text-center">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {month.days.map((day, i) => {
              if (!day) {
                return <div key={`empty-${i}`} className="aspect-square" />;
              }
              
              const status = habit.history[day.dateStr];
              let cellClass = 'bg-white';
              
              if (status === true) {
                cellClass = colors.done.split(' ')[0];
              } else if (status === false) {
                cellClass = colors.notDone.split(' ')[0];
              }
              
              return (
                <div
                  key={day.dateStr}
                  className={`
                    aspect-square rounded flex items-center justify-center
                    text-xs font-medium ${cellClass}
                  `}
                >
                  {day.dayNum}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      
      <p className="text-center text-xs text-slate-400">
        Vue année : lecture seule
      </p>
    </div>
  );
}