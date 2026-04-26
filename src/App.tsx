import { useState, useEffect, useCallback } from 'react';
import { useHabits } from './hooks/useHabits';
import { getRandomQuote } from './utils/quotes';
import { Quote } from './types';
import { QuoteCard } from './components/QuoteCard';
import { HabitCard } from './components/HabitCard';
import { HabitDetail } from './components/HabitDetail';
import { HabitModal } from './components/HabitModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { EmptyState } from './components/EmptyState';
import { Plus, CheckCircle, Filter } from 'lucide-react';

export default function App() {
  const {
    habits,
    filter,
    setFilter,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleDay,
    reorderHabits,
    getFilteredHabits,
  } = useHabits();

  const [quote, setQuote] = useState<Quote>({ text: "", author: "" });
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  const selectedHabit = habits.find((h: any) => h.id === selectedHabitId);
  const filteredHabits = getFilteredHabits();

  const handleDragStart = useCallback((id: string) => (e: React.DragEvent) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedId(null);
    setDragOverId(null);
  }, []);

  const handleDragOver = useCallback((id: string) => (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedId && draggedId !== id) {
      setDragOverId(id);
    }
  }, [draggedId]);

  const handleDrop = useCallback((targetId: string) => (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedId && draggedId !== targetId) {
      reorderHabits(draggedId, targetId);
    }
    setDraggedId(null);
    setDragOverId(null);
  }, [draggedId, reorderHabits]);

  const handleCreateHabit = useCallback((name: string, emoji: string, color: string, activeDays: number[], weeklyGoal: number) => {
    addHabit(name, emoji, color, activeDays, weeklyGoal);
  }, [addHabit]);

  const handleUpdateHabit = useCallback((name: string, emoji: string, color: string, activeDays: number[], weeklyGoal: number) => {
    if (selectedHabitId) {
      updateHabit(selectedHabitId, { name, emoji, color, activeDays, weeklyGoal });
    }
  }, [selectedHabitId, updateHabit]);

  const handleDeleteHabit = useCallback(() => {
    if (selectedHabitId) {
      deleteHabit(selectedHabitId);
      setSelectedHabitId(null);
      setShowDeleteModal(false);
    }
  }, [selectedHabitId, deleteHabit]);

  // Detail View
  if (selectedHabit) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 max-w-lg mx-auto">
        <HabitDetail
          habit={selectedHabit}
          onBack={() => setSelectedHabitId(null)}
          onEdit={() => setShowEditModal(true)}
          onDelete={() => setShowDeleteModal(true)}
          onToggleDay={(dateStr) => toggleDay(selectedHabit.id, dateStr)}
        />
        
        <HabitModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateHabit}
          habit={selectedHabit}
          title="Modifier l'habitude"
        />
        
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteHabit}
          habitName={selectedHabit.name}
        />
      </div>
    );
  }

  // Home View
  return (
    <div className="min-h-screen bg-slate-50 p-4 max-w-lg mx-auto pb-24">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <CheckCircle className="w-8 h-8 text-blue-500" />
          Habee
        </h1>
        <p className="text-slate-500 mt-1">Cultivez vos habitudes, un jour à la fois</p>
      </header>

      {/* Quote */}
      <QuoteCard quote={quote} />

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-3 px-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 ${
            filter === 'all'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Filter className="w-4 h-4" />
          Toutes
        </button>
        <button
          onClick={() => setFilter('unchecked')}
          className={`flex-1 py-3 px-4 rounded-full font-semibold transition-all ${
            filter === 'unchecked'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Non validées
        </button>
      </div>

      {/* Habits List */}
      {filteredHabits.length === 0 ? (
        <EmptyState onAdd={() => setShowCreateModal(true)} />
      ) : (
        <div className="space-y-3">
          {(filteredHabits as any).map((habit: any) => {
            const Card = HabitCard as any;
            return (
              <Card
                key={habit.id}
                habit={habit}
                onClick={() => setSelectedHabitId(habit.id)}
                onDragStart={handleDragStart(habit.id)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver(habit.id)}
                onDrop={handleDrop(habit.id)}
                isDragging={draggedId === habit.id}
                isDragOver={dragOverId === habit.id}
              />
            );
          })}
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setShowCreateModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all hover:scale-105 z-40"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Create Modal */}
      <HabitModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateHabit}
        title="Nouvelle habitude"
      />
    </div>
  );
}