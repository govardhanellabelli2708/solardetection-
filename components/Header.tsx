import React from 'react';
import { Sun, Activity } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Sun className="w-8 h-8 text-yellow-500" />
            <Activity className="w-4 h-4 text-blue-500 absolute -bottom-1 -right-1 bg-slate-900 rounded-full" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">
              Solar<span className="text-blue-500">EL</span> Inspector
            </h1>
            <p className="text-xs text-slate-400 font-medium">AI-Powered PV Quality Assurance</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-4 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Models</a>
            <a href="#" className="hover:text-white transition-colors">History</a>
          </nav>
          <div className="h-4 w-px bg-slate-700"></div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
            <span className="text-xs text-slate-300 font-mono">SYSTEM READY</span>
          </div>
        </div>
      </div>
    </header>
  );
};
