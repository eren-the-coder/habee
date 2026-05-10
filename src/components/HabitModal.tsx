import { useState, useEffect } from 'react';
import { Habit } from '../types';
import { COLORS, DAY_NAMES_FULL, COLOR_BG_MAP } from '../utils/helpers';
import { X, Check } from 'lucide-react';

interface HabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, emoji: string, color: string, activeDays: number[], weeklyGoal: number) => void;
  habit?: Habit;
  title: string;
}

export function HabitModal({ isOpen, onClose, onSave, habit, title }: HabitModalProps) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('⭐');
  const [color, setColor] = useState('emerald');
  const [activeDays, setActiveDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [weeklyGoal, setWeeklyGoal] = useState(7);

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setEmoji(habit.emoji);
      setColor(habit.color);
      setActiveDays(habit.activeDays);
      setWeeklyGoal(Math.min(habit.weeklyGoal, habit.activeDays.length) || 1);
    } else {
      setName('');
      setEmoji('⭐');
      setColor('emerald');
      setActiveDays([0, 1, 2, 3, 4, 5, 6]);
      setWeeklyGoal(7);
    }
  }, [habit, isOpen]);

  const getFirstGrapheme = (value: string) => {
    if (!value) return '';
    const Segmenter = (Intl as any).Segmenter;
    if (typeof Segmenter === 'function') {
      const segmenter = new Segmenter(undefined, { granularity: 'grapheme' });
      const first = segmenter.segment(value).first();
      return first?.segment ?? '';
    }
    return Array.from(value)[0] || '';
  };

  const toggleDay = (dayIndex: number) => {
    const newActiveDays = activeDays.includes(dayIndex)
      ? activeDays.filter(d => d !== dayIndex)
      : [...activeDays, dayIndex].sort();
    setActiveDays(newActiveDays);
    if (weeklyGoal > newActiveDays.length) {
      setWeeklyGoal(newActiveDays.length || 1);
    }
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim(), emoji || '⭐', color, activeDays, weeklyGoal);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">{title}</h3>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Nom de l'habitude
            </label>
            <input
              type="text"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              placeholder="Ex: Méditation, Sport..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Emoji
            </label>
            <input
              type="text"
              value={emoji}
              onChange={(e: any) => setEmoji(getFirstGrapheme(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-2xl text-center"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Couleur
            </label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  className={`
                    w-10 h-10 rounded-xl transition-all duration-200
                    hover:scale-110 ${COLOR_BG_MAP[c.value]}
                    ${color === c.value ? 'ring-2 ring-offset-2 ring-slate-400' : ''}
                  `}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Jours actifs
            </label>
            <div className="flex flex-wrap gap-2">
              {DAY_NAMES_FULL.map((day, i) => (
                <button
                  key={i}
                  onClick={() => toggleDay(i)}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${activeDays.includes(i)
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
                  `}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Objectif hebdomadaire : {weeklyGoal} jour{weeklyGoal > 1 ? 's' : ''}
            </label>
            <input
              type="range"
              min="1"
              max={activeDays.length || 1}
              value={weeklyGoal}
              onChange={(e: any) => setWeeklyGoal(parseInt(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-100 text-slate-600 font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
          >
            <X className="w-5 h-5" />
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 px-4 py-3 rounded-xl bg-blue-500 text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-5 h-5" />
            {habit ? 'Enregistrer' : 'Créer'}
          </button>
        </div>
      </div>
    </div>
  );
}