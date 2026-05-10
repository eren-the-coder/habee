import { Quote } from '../types';

interface QuoteCardProps {
  quote: Quote;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
      <p className="text-slate-800 dark:text-slate-200 font-medium text-lg leading-relaxed">
        "{quote.text}"
      </p>
      <p className="text-slate-500 dark:text-slate-400 text-sm text-right mt-2">
        — {quote.author}
      </p>
    </div>
  );
}