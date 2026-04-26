import { X, Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  habitName: string;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, habitName }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-slate-800 mb-4 text-center flex items-center justify-center gap-2">
          <Trash2 className="w-6 h-6 text-red-500" />
          Supprimer l'habitude
        </h3>
        
        <p className="text-slate-600 text-center mb-6">
          Êtes-vous sûr de vouloir supprimer <strong>"{habitName}"</strong> ?
          <br />
          <span className="text-red-500 text-sm">Cette action est irréversible.</span>
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-100 text-slate-600 font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
          >
            <X className="w-5 h-5" />
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-semibold flex items-center justify-center gap-2 hover:bg-red-600 transition-all"
          >
            <Trash2 className="w-5 h-5" />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}