import { Quote } from '../types';

interface QuoteCardProps {
  quote: Quote;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-6">
      <p className="text-slate-800 font-medium text-lg leading-relaxed">
        "{quote.text}"
      </p>
      <p className="text-slate-500 text-sm text-right mt-2">
        — {quote.author}
      </p>
    </div>
  );
}