import React from 'react';
import { AnalysisResult, DefectType } from '../types';
import { CheckCircle2, AlertTriangle, XCircle, Zap, RefreshCw, ClipboardCheck } from 'lucide-react';

interface AnalysisResultsProps {
  result: AnalysisResult;
  onReset: () => void;
}

const getSeverityColor = (category: string) => {
  switch (category) {
    case 'Normal': return 'text-green-400 border-green-500/30 bg-green-500/10';
    case 'Microcrack': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
    case 'Finger Interruption': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    case 'Hotspot': return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
    case 'Broken Cell': return 'text-red-400 border-red-500/30 bg-red-500/10';
    default: return 'text-slate-400 border-slate-500/30 bg-slate-500/10';
  }
};

const getIcon = (category: string) => {
  switch (category) {
    case 'Normal': return <CheckCircle2 className="w-6 h-6" />;
    case 'Microcrack': return <Zap className="w-6 h-6" />;
    case 'Finger Interruption': return <ActivityIcon />;
    case 'Hotspot': return <AlertTriangle className="w-6 h-6" />;
    case 'Broken Cell': return <XCircle className="w-6 h-6" />;
    default: return <ClipboardCheck className="w-6 h-6" />;
  }
};

const ActivityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, onReset }) => {
  const colorClass = getSeverityColor(result.category);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        {/* Classification Badge & Score */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-lg font-semibold text-slate-200">Analysis Report</h3>
             <span className="px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-xs font-mono">
               ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
             </span>
          </div>

          <div className={`p-4 rounded-xl border ${colorClass} mb-6 flex items-center gap-4`}>
            <div className="p-3 bg-white/5 rounded-full">
              {getIcon(result.category)}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider opacity-80 font-semibold mb-1">Detected Class</p>
              <h2 className="text-2xl font-bold">{result.category}</h2>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs uppercase tracking-wider opacity-80 font-semibold mb-1">Confidence</p>
              <p className="text-2xl font-bold">{result.confidence.toFixed(1)}%</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <h4 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">Technical Assessment</h4>
              <p className="text-slate-200 leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
              <h4 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">Recommendation</h4>
              <p className="text-slate-200 leading-relaxed">
                {result.recommendation}
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-700 flex justify-end">
            <button
              onClick={onReset}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Analyze Another Image
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
