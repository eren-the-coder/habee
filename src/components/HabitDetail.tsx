import { useState } from 'react';
import { Habit, ViewMode } from '../types';
import { getPeriodLabel, COLOR_CLASSES, exportHabitToJson } from '../utils/helpers';
import { WeekView } from './WeekView';
import { MonthView } from './MonthView';
import { YearView } from './YearView';
import { StatsCard } from './StatsCard';
import { ViewModeModal } from './ViewModeModal';
import { ArrowLeft, ChevronLeft, ChevronRight, Edit, Trash2, Calendar, Download } from 'lucide-react';

interface HabitDetailProps {
  habit: Habit;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleDay: (dateStr: string) => void;
}

export function HabitDetail({ habit, onBack, onEdit, onDelete, onToggleDay }: HabitDetailProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showViewModal, setShowViewModal] = useState(false);

  const colors = COLOR_CLASSES[habit.color] || COLOR_CLASSES.emerald;
  const periodLabel = getPeriodLabel(currentDate, viewMode);

  const navigate = (delta: number) => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(currentDate.getDate() + delta * 7);
    } else if (viewMode === 'month') {
      newDate.setMonth(currentDate.getMonth() + delta);
    } else {
      newDate.setFullYear(currentDate.getFullYear() + delta);
    }
    setCurrentDate(newDate);
  };

  const handleExport = () => {
    exportHabitToJson(habit);
  };

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 min-h-screen pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-slate-100 transition-all"
        >
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={handleExport}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
            title="Exporter en JSON"
          >
            <Download className="w-5 h-5 text-slate-600" />
          </button>
          <button
            onClick={onEdit}
            className="p-2 rounded-full hover:bg-slate-100 transition-all"
          >
            <Edit className="w-5 h-5 text-slate-600" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-full hover:bg-red-50 transition-all"
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      {/* Title */}
      <div className={`flex items-center justify-center gap-3 py-3 px-5 rounded-full mb-4 ${colors.light}`}>
        <span className="text-3xl">{habit.emoji}</span>
        <h2 className="text-xl font-bold text-slate-800">{habit.name}</h2>
      </div>

      {/* Stats */}
      <StatsCard habit={habit} />

      {/* View Selector */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowViewModal(true)}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-100 border border-slate-200 font-medium text-slate-700 hover:bg-slate-200 transition-all"
        >
          <Calendar className="w-4 h-4" />
          {viewMode === 'week' ? 'Semaine' : viewMode === 'month' ? 'Mois' : 'Année'}
          <ChevronRight className="w-4 h-4 rotate-90" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <span className="font-bold text-slate-700 bg-slate-50 px-4 py-2 rounded-full capitalize">
          {periodLabel}
        </span>
        <button
          onClick={() => navigate(1)}
          className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-all"
        >
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Calendar View */}
      {viewMode === 'week' && (
        <WeekView habit={habit} onToggleDay={onToggleDay} currentDate={currentDate} />
      )}
      {viewMode === 'month' && (
        <MonthView habit={habit} year={currentDate.getFullYear()} month={currentDate.getMonth()} />
      )}
      {viewMode === 'year' && (
        <YearView habit={habit} year={currentDate.getFullYear()} />
      )}

      {/* View Mode Modal */}
      <ViewModeModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        onSelect={setViewMode}
        currentMode={viewMode}
      />
    </div>
  );
}