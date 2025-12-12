import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface MacroChartProps {
  protein: number;
  carbs: number;
  fat: number;
}

export const MacroChart: React.FC<MacroChartProps> = ({ protein, carbs, fat }) => {
  const data = [
    { name: 'Protein', value: protein, color: '#3b82f6' }, // blue-500
    { name: 'Carbs', value: carbs, color: '#10b981' }, // emerald-500
    { name: 'Fat', value: fat, color: '#f59e0b' }, // amber-500
  ];

  // Handle case where all are 0 to avoid breaking chart
  if (protein === 0 && carbs === 0 && fat === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-300">
        No macro data available
      </div>
    );
  }

  return (
    <div className="w-full h-64 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `${value}g`}
            contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            itemStyle={{ color: '#1e293b', fontWeight: 600 }}
          />
        </PieChart>
      </ResponsiveContainer>
      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
         <span className="text-sm text-slate-400 font-medium">Total</span>
         <span className="text-2xl font-bold text-slate-800">
            {protein + carbs + fat}g
         </span>
      </div>
    </div>
  );
};