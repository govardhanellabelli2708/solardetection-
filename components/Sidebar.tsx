import React from 'react';
import { DEFECT_CLASSES, CHART_DATA } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Info } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <div className="space-y-6 sticky top-24">
      
      {/* Chart Card */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
          Defect Distribution Stats
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CHART_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {CHART_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-center text-slate-500 mt-2">
          Historical data distribution of detected classes.
        </p>
      </div>

      {/* Definitions Card */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm max-h-[calc(100vh-500px)] overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Defect Glossary
          </h3>
        </div>
        
        <div className="space-y-4">
          {Object.entries(DEFECT_CLASSES).map(([key, info]) => (
            <div key={key} className="group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors">
                  {info.name}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded border ${
                  info.severity === 'Critical' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
                  info.severity === 'High' ? 'border-orange-500/30 text-orange-400 bg-orange-500/10' :
                  info.severity === 'Medium' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                  'border-green-500/30 text-green-400 bg-green-500/10'
                }`}>
                  {info.severity}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {info.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
