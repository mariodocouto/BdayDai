import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { getLiveTimezones } from '../utils/countdown';

export const WorldClockPills: React.FC = () => {
  const [times, setTimes] = useState(() => getLiveTimezones());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimes(getLiveTimezones());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-sans">
      {/* Horário Lucas (Brasil) */}
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#201524]/70 border border-[#482845]/60 backdrop-blur-md text-[#dec4d4] shadow-sm">
        <span className="text-base" role="img" aria-label="Brasil">🇧🇷</span>
        <span className="font-medium text-[#f2e6ee]">Brasil:</span>
        <span className="font-mono text-[#fcd1e0] tracking-wider font-semibold">{times.brazilTime}</span>
        <span className="text-[10px] text-[#a8899e] uppercase tracking-wider hidden sm:inline">(Lucas)</span>
      </div>

      {/* Indicador de Conexão */}
      <div className="flex items-center text-[#9b587a] text-xs px-1">
        <Clock className="w-3.5 h-3.5 animate-pulse" />
      </div>

      {/* Horário Dai (Canadá) */}
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#201524]/70 border border-[#522d4f]/60 backdrop-blur-md text-[#dec4d4] shadow-sm">
        <span className="text-base" role="img" aria-label="Canadá">🇨🇦</span>
        <span className="font-medium text-[#f2e6ee]">Canadá:</span>
        <span className="font-mono text-[#fcd1e0] tracking-wider font-semibold">{times.canadaTime}</span>
        <span className="text-[10px] text-[#a8899e] uppercase tracking-wider hidden sm:inline">(Dai)</span>
      </div>
    </div>
  );
};
