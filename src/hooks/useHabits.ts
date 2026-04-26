import { useState, useEffect, useCallback } from 'react';
import { Habit, FilterType } from '../types';
import { loadHabits, saveHabits, generateId } from '../utils/storage';
import { computeBestStreak, getTodayYMD } from '../utils/helpers';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    setHabits(loadHabits());
  }, []);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  const addHabit = useCallback((name: string, emoji: string, color: string, activeDays: number[], weeklyGoal: number) => {
    const newHabit: Habit = {
      id: generateId(),
      name: name.trim(),
      emoji: emoji || '⭐',
      color,
      history: {},
      createdAt: new Date().toISOString(),
      activeDays,
      weeklyGoal,
      bestStreak: 0,
    };
    setHabits((prev: any) => [...prev, newHabit]);
    return newHabit;
  }, []);

  const updateHabit = useCallback((id: string, updates: Partial<Habit>) => {
    setHabits((prev: any) => prev.map((h: any) => h.id === id ? { ...h, ...updates } : h));
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev: any) => prev.filter((h: any) => h.id !== id));
  }, []);

  const toggleDay = useCallback((habitId: string, dateStr: string) => {
    setHabits((prev: any) => prev.map((h: any) => {
      if (h.id !== habitId) return h;
      
      const currentStatus = h.history[dateStr];
      const newHistory = { ...h.history };
      
      if (currentStatus === undefined) {
        newHistory[dateStr] = false;
      } else if (currentStatus === false) {
        newHistory[dateStr] = true;
      } else {
        delete newHistory[dateStr];
      }
      
      const newBestStreak = Math.max(h.bestStreak, computeBestStreak({ ...h, history: newHistory }));
      
      return { ...h, history: newHistory, bestStreak: newBestStreak };
    }));
  }, []);

  const reorderHabits = useCallback((draggedId: string, targetId: string) => {
    setHabits((prev: any) => {
      const draggedIndex = prev.findIndex((h: any) => h.id === draggedId);
      const targetIndex = prev.findIndex((h: any) => h.id === targetId);
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const newHabits = [...prev];
      const [draggedItem] = newHabits.splice(draggedIndex, 1);
      newHabits.splice(targetIndex, 0, draggedItem);
      return newHabits;
    });
  }, []);

  const getFilteredHabits = useCallback(() => {
    if (filter === 'unchecked') {
      const todayStr = getTodayYMD();
      return habits.filter((h: any) => h.history[todayStr] !== true);
    }
    return habits;
  }, [habits, filter]);

  return {
    habits,
    filter,
    setFilter,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleDay,
    reorderHabits,
    getFilteredHabits,
  };
}