export interface Habit {
  id: string;
  name: string;
  emoji: string;
  color: string;
  history: Record<string, boolean | undefined>;
  createdAt: string;
  activeDays: number[];
  weeklyGoal: number;
  bestStreak: number;
}

export type ViewMode = 'week' | 'month' | 'year';
export type FilterType = 'all' | 'unchecked';

export interface Quote {
  text: string;
  author: string;
}

export interface DayCell {
  date: Date;
  dateStr: string;
  dayNum: number;
  status: boolean | undefined;
  isPastOrToday: boolean;
  isToday: boolean;
}