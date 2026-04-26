import { Habit } from '../types';
import { computeStreak, getTodayYMD, COLOR_CLASSES } from '../utils/helpers';
import { Flame, Check } from 'lucide-react';

interface HabitCardProps {
  habit: Habit;
  onClick: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  isDragging: boolean;
  isDragOver: boolean;
}

export function HabitCard({ 
  habit, 
  onClick, 
  onDragStart, 
  onDragEnd, 
  onDragOver, 
  onDrop,
  isDragging,
  isDragOver 
}: HabitCardProps) {
  const streak = computeStreak(habit);
  const colors = COLOR_CLASSES[habit.color] || COLOR_CLASSES.emerald;
  const todayStr = getTodayYMD();
  const isDoneToday = habit.history[todayStr] === true;

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
      className={`
        bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm
        border cursor-grab active:cursor-grabbing transition-all duration-200
        ${isDragging ? 'opacity-40 scale-95' : ''}
        ${isDragOver ? `border-2 border-dashed ${colors.border} ${colors.light}` : 'border-slate-100'}
        hover:shadow-md hover:border-slate-200
      `}
    >
      <div className={`
        w-14 h-14 rounded-2xl flex items-center justify-center text-3xl
        ${colors.light} relative
      `}>
        {habit.emoji}
        {isDoneToday && (
          <div className={`absolute -top-1 -right-1 w-5 h-5 ${colors.bg} rounded-full flex items-center justify-center`}>
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-800 text-lg truncate">{habit.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          {streak > 0 ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
              <Flame className="w-4 h-4" />
              {streak} jour{streak > 1 ? 's' : ''} consécutif{streak > 1 ? 's' : ''}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-600">
              <span className="text-base">🌱</span>
              Commencez aujourd'hui
            </span>
          )}
        </div>
      </div>
    </div>
  );
}