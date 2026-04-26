import { ViewMode } from '../types';
import { X, Check, Calendar, CalendarDays, CalendarRange } from 'lucide-react';

interface ViewModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (mode: ViewMode) => void;
  currentMode: ViewMode;
}

const modes: { value: ViewMode; label: string; icon: any }[] = [
  { value: 'week', label: 'Vue semaine', icon: <Calendar className="w-5 h-5" /> },
  { value: 'month', label: 'Vue mois', icon: <CalendarDays className="w-5 h-5" /> },
  { value: 'year', label: 'Vue année', icon: <CalendarRange className="w-5 h-5" /> },
];

export function ViewModeModal({ isOpen, onClose, onSelect, currentMode }: ViewModeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">
          Choisir la vue
        </h3>
        
        <div className="space-y-2">
          {modes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => {
                onSelect(mode.value);
                onClose();
              }}
              className={`
                w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-all
                ${currentMode === mode.value 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}
              `}
            >
              {mode.icon}
              <span className="font-medium">{mode.label}</span>
              {currentMode === mode.value && <Check className="w-5 h-5 ml-auto" />}
            </button>
          ))}
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-3 rounded-xl bg-slate-100 text-slate-600 font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
        >
          <X className="w-5 h-5" />
          Annuler
        </button>
      </div>
    </div>
  );
}