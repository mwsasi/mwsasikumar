import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar.tsx';
import { NutritionDisplay } from './components/NutritionDisplay.tsx';
import { analyzeFood } from './services/geminiService.ts';
import { NutritionData } from './types.ts';
import { Loader2, UtensilsCrossed } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<NutritionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await analyzeFood(query);
      if (result.isValidFood) {
        setData(result);
      } else {
        setError("We couldn't identify that as a valid food item. Please try searching for something edible!");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while analyzing the food. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-500 p-2 rounded-lg text-white">
              <UtensilsCrossed size={24} />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              NutriScan AI
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 mt-8 md:mt-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Know what you eat.
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Instantly analyze calories, macronutrients, and health benefits of any food using advanced AI.
          </p>
        </div>

        <div className="mb-12">
          <SearchBar onSearch={handleSearch} isLoading={loading} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 animate-pulse">
            <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
            <p className="text-slate-500 font-medium">Consulting nutritional database...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-sm">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Results State */}
        {!loading && data && (
          <div className="transition-all duration-500">
             <NutritionDisplay data={data} />
          </div>
        )}

        {/* Initial Empty State */}
        {!loading && !data && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-30 select-none pointer-events-none">
             <div className="h-32 bg-white rounded-xl border border-dashed border-slate-300"></div>
             <div className="h-32 bg-white rounded-xl border border-dashed border-slate-300"></div>
             <div className="h-32 bg-white rounded-xl border border-dashed border-slate-300"></div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;