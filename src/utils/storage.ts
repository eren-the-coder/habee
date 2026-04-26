import { Habit } from '../types';

const STORAGE_KEY = 'habee_app_data';

export function loadHabits(): Habit[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const habits = JSON.parse(stored);
      return habits.map((h: Habit) => ({
        ...h,
        history: h.history || {},
        activeDays: h.activeDays || [0, 1, 2, 3, 4, 5, 6],
        weeklyGoal: h.weeklyGoal || 7,
        bestStreak: h.bestStreak || 0,
        color: h.color || 'emerald',
      }));
    }
  } catch (e) {
    console.error('Error loading habits:', e);
  }
  return [];
}

export function saveHabits(habits: Habit[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  } catch (e) {
    console.error('Error saving habits:', e);
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}