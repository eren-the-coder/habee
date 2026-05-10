import { Plus } from 'lucide-react';

interface EmptyStateProps {
  onAdd: () => void;
}

export function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-4">🌱</div>
      <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
        Aucune habitude
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-6 max-w-xs">
        Commencez votre voyage vers une vie plus organisée en ajoutant votre première habitude.
      </p>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
      >
        <Plus className="w-5 h-5" />
        Ajouter une habitude
      </button>
    </div>
  );
}