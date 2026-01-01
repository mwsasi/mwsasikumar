import React from 'react';
import { NutritionData } from '../types.ts';
import { MacroChart } from './MacroChart.tsx';
import { Flame, CheckCircle2, Info } from 'lucide-react';

interface NutritionDisplayProps {
  data: NutritionData;
}

export const NutritionDisplay: React.FC<NutritionDisplayProps> = ({ data }) => {
  const { foodName, servingSize, calories, macros, details, summary, healthTips } = data;

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 capitalize">{foodName}</h2>
            <p className="text-slate-500 mt-1 font-medium">Serving Size: {servingSize}</p>
            <p className="text-slate-600 mt-4 leading-relaxed max-w-2xl">{summary}</p>
          </div>
          <div className="flex-shrink-0 bg-orange-50 rounded-xl p-4 border border-orange-100 min-w-[140px] text-center">
            <div className="flex items-center justify-center text-orange-500 mb-1">
              <Flame size={24} fill="currentColor" />
            </div>
            <span className="block text-3xl font-bold text-slate-900">{calories}</span>
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Calories</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Macros Chart & List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
            <span className="w-1 h-6 bg-emerald-500 rounded-full mr-3"></span>
            Macronutrients
          </h3>
          <div className="flex-1 flex flex-col items-center justify-center min-h-[250px]">
             <MacroChart protein={macros.protein} carbs={macros.carbs} fat={macros.fat} />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-6">
             <MacroBadge label="Protein" value={macros.protein} color="bg-blue-500" />
             <MacroBadge label="Carbs" value={macros.carbs} color="bg-emerald-500" />
             <MacroBadge label="Fat" value={macros.fat} color="bg-amber-500" />
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="space-y-6">
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <span className="w-1 h-6 bg-indigo-500 rounded-full mr-3"></span>
              Nutrition Details
            </h3>
            <div className="space-y-4">
              <DetailRow label="Dietary Fiber" value={`${details.fiber}g`} />
              <DetailRow label="Sugar" value={`${details.sugar}g`} />
              <DetailRow label="Sodium" value={`${details.sodium}mg`} />
              <DetailRow label="Cholesterol" value={`${details.cholesterol}mg`} />
            </div>
           </div>

           {/* Health Tips */}
           <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
              <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center">
                <Info size={20} className="mr-2" />
                Key Insights
              </h3>
              <ul className="space-y-3">
                {healthTips.map((tip, index) => (
                  <li key={index} className="flex items-start text-emerald-800 text-sm md:text-base">
                    <CheckCircle2 size={18} className="mr-2 mt-0.5 flex-shrink-0 opacity-70" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

const MacroBadge = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className="flex flex-col items-center p-3 rounded-lg bg-slate-50 border border-slate-100">
    <div className={`w-3 h-3 rounded-full mb-2 ${color}`}></div>
    <span className="text-xl font-bold text-slate-700">{value}g</span>
    <span className="text-xs text-slate-400 font-medium uppercase">{label}</span>
  </div>
);

const DetailRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
    <span className="text-slate-500 font-medium">{label}</span>
    <span className="text-slate-800 font-semibold">{value}</span>
  </div>
);