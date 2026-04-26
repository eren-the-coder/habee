import { Habit } from '../types';
import { computeStreak, calculateSuccessRate } from '../utils/helpers';
import { Flame, Trophy, Target, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  habit: Habit;
}

export function StatsCard({ habit }: StatsCardProps) {
  const streak = computeStreak(habit);
  const successRate = calculateSuccessRate(habit, 30);
  const bestStreak = habit.bestStreak;

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <div className="bg-orange-50 rounded-2xl p-4 text-center">
        <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1" />
        <p className="text-2xl font-bold text-orange-600">{streak}</p>
        <p className="text-xs text-orange-600">Série actuelle</p>
      </div>
      
      <div className="bg-amber-50 rounded-2xl p-4 text-center">
        <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-1" />
        <p className="text-2xl font-bold text-amber-600">{bestStreak}</p>
        <p className="text-xs text-amber-600">Meilleure série</p>
      </div>
      
      <div className="bg-emerald-50 rounded-2xl p-4 text-center">
        <Target className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
        <p className="text-2xl font-bold text-emerald-600">{successRate}%</p>
        <p className="text-xs text-emerald-600">Taux de réussite</p>
      </div>
      
      <div className="bg-blue-50 rounded-2xl p-4 text-center">
        <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-1" />
        <p className="text-2xl font-bold text-blue-600">{habit.weeklyGoal}</p>
        <p className="text-xs text-blue-600">Jours/semaine</p>
      </div>
    </div>
  );
}