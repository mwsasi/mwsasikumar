import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto group">
      <div className="absolute inset-0 bg-emerald-200 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
      <div className="relative flex items-center bg-white rounded-full shadow-lg border border-slate-200 hover:border-emerald-300 transition-colors duration-300 p-2">
        <div className="pl-4 text-slate-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Avocado Toast, Grilled Salmon, Large Pizza Slice..."
          className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-lg text-slate-700 placeholder:text-slate-400 font-medium w-full"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className={`
            p-3 rounded-full flex items-center justify-center transition-all duration-300
            ${query.trim() && !isLoading 
              ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md transform hover:scale-105' 
              : 'bg-slate-100 text-slate-300 cursor-not-allowed'}
          `}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </form>
  );
};