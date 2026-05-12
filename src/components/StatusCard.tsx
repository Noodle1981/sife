import React from 'react';

interface StatusCardProps {
  uptime: number;
  timestamp: string;
}

export const StatusCard: React.FC<StatusCardProps> = ({ uptime, timestamp }) => {
  return (
    <div className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-md shadow-xl hover:border-blue-500/50 transition-all duration-300 group">
      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 group-hover:text-blue-400 transition-colors">
        Node.js Backend Engine
      </h2>
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="text-emerald-400 font-semibold tracking-tight">System Operational</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase">Uptime</span>
            <span className="text-lg font-mono text-blue-400">{uptime.toFixed(1)}s</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase">Last Heartbeat</span>
            <span className="text-sm text-slate-300">{new Date(timestamp).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
