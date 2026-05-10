import { Habit, DayCell, ViewMode } from '../types';

export function formatYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getTodayYMD(): string {
  return formatYMD(new Date());
}

export function computeStreak(habit: Habit): number {
  const today = new Date();
  let currentDate = new Date(today);
  let streak = 0;
  let daysChecked = 0;
  const maxDays = 365; // Prevent infinite loop

  // Find the most recent day that is checked
  while (daysChecked < maxDays) {
    const key = formatYMD(currentDate);
    if (habit.history[key] === true) {
      streak = 1;
      break;
    }
    currentDate.setDate(currentDate.getDate() - 1);
    daysChecked++;
  }

  if (streak === 0) return 0;

  // Now count consecutive days backwards from this day
  const startDate = new Date(currentDate);
  while (daysChecked < maxDays) {
    startDate.setDate(startDate.getDate() - 1);
    const key = formatYMD(startDate);
    if (habit.history[key] === true) {
      streak++;
    } else {
      break;
    }
    daysChecked++;
  }

  return streak;
}

export function computeBestStreak(habit: Habit): number {
  const dates = Object.keys(habit.history)
    .filter(d => habit.history[d] === true)
    .sort();

  if (dates.length === 0) return 0;

  let bestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const prevDate = new Date(dates[i - 1]);
    const currDate = new Date(dates[i]);
    const diffDays = Math.round((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      currentStreak++;
      bestStreak = Math.max(bestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return bestStreak;
}

export function getWeekDays(refDate: Date): DayCell[] {
  const start = new Date(refDate);
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(start);
  monday.setDate(start.getDate() + diff);

  const week: DayCell[] = [];
  const todayStr = getTodayYMD();

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = formatYMD(d);
    week.push({
      date: d,
      dateStr,
      dayNum: d.getDate(),
      status: undefined,
      isPastOrToday: dateStr <= todayStr,
      isToday: dateStr === todayStr,
    });
  }

  return week;
}

export function getMonthDays(year: number, month: number): (DayCell | null)[] {
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = getTodayYMD();

  const cells: (DayCell | null)[] = [];

  for (let i = 0; i < startWeekday; i++) {
    cells.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    const dateStr = formatYMD(dateObj);
    cells.push({
      date: dateObj,
      dateStr,
      dayNum: d,
      status: undefined,
      isPastOrToday: dateStr <= todayStr,
      isToday: dateStr === todayStr,
    });
  }

  return cells;
}

export function getYearMonths(year: number): { name: string; days: (DayCell | null)[] }[] {
  const months: { name: string; days: (DayCell | null)[] }[] = [];

  for (let m = 0; m < 12; m++) {
    months.push({
      name: new Date(year, m).toLocaleString('fr', { month: 'long' }),
      days: getMonthDays(year, m),
    });
  }

  return months;
}

export function getPeriodLabel(date: Date, viewMode: ViewMode): string {
  if (viewMode === 'week') {
    const weekDays = getWeekDays(date);
    const start = weekDays[0];
    return `Semaine du ${start.dayNum} ${start.date.toLocaleString('fr', { month: 'short' })}`;
  } else if (viewMode === 'month') {
    return date.toLocaleString('fr', { month: 'long', year: 'numeric' });
  } else {
    return date.getFullYear().toString();
  }
}

export function calculateSuccessRate(habit: Habit, days: number = 30): number {
  const today = new Date();
  let completed = 0;
  let total = 0;

  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = formatYMD(d);
    const status = habit.history[dateStr];
    if (status !== undefined) {
      total++;
      if (status === true) completed++;
    }
  }

  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

export const COLORS = [
  { name: 'Émeraude', value: 'emerald' },
  { name: 'Bleu', value: 'blue' },
  { name: 'Violet', value: 'violet' },
  { name: 'Rose', value: 'pink' },
  { name: 'Ambre', value: 'amber' },
  { name: 'Rouge', value: 'red' },
  { name: 'Cyan', value: 'cyan' },
  { name: 'Indigo', value: 'indigo' },
];

export const DAY_NAMES = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
export const DAY_NAMES_FULL = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export const COLOR_CLASSES: Record<string, { bg: string; text: string; light: string; border: string; done: string; notDone: string }> = {
  emerald: {
    bg: 'bg-emerald-500',
    text: 'text-emerald-600',
    light: 'bg-emerald-50',
    border: 'border-emerald-200',
    done: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    notDone: 'bg-red-100 text-red-700 border-red-300'
  },
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-600',
    light: 'bg-blue-50',
    border: 'border-blue-200',
    done: 'bg-blue-100 text-blue-700 border-blue-300',
    notDone: 'bg-red-100 text-red-700 border-red-300'
  },
  violet: {
    bg: 'bg-violet-500',
    text: 'text-violet-600',
    light: 'bg-violet-50',
    border: 'border-violet-200',
    done: 'bg-violet-100 text-violet-700 border-violet-300',
    notDone: 'bg-red-100 text-red-700 border-red-300'
  },
  pink: {
    bg: 'bg-pink-500',
    text: 'text-pink-600',
    light: 'bg-pink-50',
    border: 'border-pink-200',
    done: 'bg-pink-100 text-pink-700 border-pink-300',
    notDone: 'bg-red-100 text-red-700 border-red-300'
  },
  amber: {
    bg: 'bg-amber-500',
    text: 'text-amber-600',
    light: 'bg-amber-50',
    border: 'border-amber-200',
    done: 'bg-amber-100 text-amber-700 border-amber-300',
    notDone: 'bg-red-100 text-red-700 border-red-300'
  },
  red: {
    bg: 'bg-red-500',
    text: 'text-red-600',
    light: 'bg-red-50',
    border: 'border-red-200',
    done: 'bg-red-100 text-red-700 border-red-300',
    notDone: 'bg-slate-100 text-slate-700 border-slate-300'
  },
  cyan: {
    bg: 'bg-cyan-500',
    text: 'text-cyan-600',
    light: 'bg-cyan-50',
    border: 'border-cyan-200',
    done: 'bg-cyan-100 text-cyan-700 border-cyan-300',
    notDone: 'bg-red-100 text-red-700 border-red-300'
  },
  indigo: {
    bg: 'bg-indigo-500',
    text: 'text-indigo-600',
    light: 'bg-indigo-50',
    border: 'border-indigo-200',
    done: 'bg-indigo-100 text-indigo-700 border-indigo-300',
    notDone: 'bg-red-100 text-red-700 border-red-300'
  },
};

export const COLOR_BG_MAP: Record<string, string> = {
  emerald: 'bg-emerald-500',
  blue: 'bg-blue-500',
  violet: 'bg-violet-500',
  pink: 'bg-pink-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
  cyan: 'bg-cyan-500',
  indigo: 'bg-indigo-500',
};

// Exporte une habitude en JSON
export function exportHabitToJson(habit: Habit): void {
  const exportData = {
    name: habit.name,
    emoji: habit.emoji,
    color: habit.color,
    activeDays: habit.activeDays,
    weeklyGoal: habit.weeklyGoal,
    history: habit.history,
    bestStreak: habit.bestStreak,
    exportedAt: new Date().toISOString()
  };

  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `habitude-${habit.name.toLowerCase().replace(/\s+/g, '-')}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}