import React from 'react';
import { Heart, Volume2, VolumeX, Settings, Sparkles } from 'lucide-react';

interface StoryWalkHeaderProps {
  currentStep: number;
  totalSteps: number;
  onSelectStep: (step: number) => void;
  isPlayingSound: boolean;
  onToggleSound: () => void;
  onOpenConfig: () => void;
}

export const StoryWalkHeader: React.FC<StoryWalkHeaderProps> = ({
  currentStep,
  totalSteps,
  onSelectStep,
  isPlayingSound,
  onToggleSound,
  onOpenConfig,
}) => {
  const steps = [
    { num: 1, label: 'Hoje ✨' },
    { num: 2, label: 'O Início' },
    { num: 3, label: 'Nossa Conexão' },
    { num: 4, label: 'Fotos' },
    { num: 5, label: 'Aniversário! 🎂' },
    { num: 6, label: 'Em Breve 🇨🇦' },
  ];

  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-md border-b border-rose-100 shadow-xs transition-all">
      {/* Barra de progresso delicada no topo */}
      <div className="h-1 w-full bg-rose-100 overflow-hidden">
        <div
          className="h-full bg-rose-500 transition-all duration-500 ease-out rounded-r-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2">
        {/* Identificação Carinhosa */}
        <div
          onClick={() => onSelectStep(1)}
          className="flex items-center gap-1.5 cursor-pointer select-none group"
        >
          <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
            <Heart size={14} fill="currentColor" />
          </div>
          <span className="font-serif text-base font-bold text-rose-950 hidden xs:inline">
            Para Dai
          </span>
        </div>

        {/* Pílulas de Navegação dos Passos */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 scrollbar-none max-w-[58%] sm:max-w-none">
          {steps.map((s) => {
            const isActive = currentStep === s.num;
            const isCompleted = currentStep > s.num;
            return (
              <button
                key={s.num}
                onClick={() => onSelectStep(s.num)}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-xs font-semibold'
                    : isCompleted
                    ? 'bg-rose-100/70 text-rose-800 hover:bg-rose-200'
                    : 'text-rose-600/70 hover:text-rose-900 hover:bg-rose-50'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </nav>

        {/* Controles: Áudio + Configuração do Lucas */}
        <div className="flex items-center gap-2">
          {/* Botão de Som */}
          <button
            onClick={onToggleSound}
            aria-label={isPlayingSound ? 'Desativar som' : 'Ativar melodia suave'}
            title={isPlayingSound ? 'Pausar melodia' : 'Tocar melodia'}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isPlayingSound
                ? 'bg-rose-100 border-rose-300 text-rose-700'
                : 'bg-white border-rose-200 text-rose-400 hover:text-rose-700'
            }`}
          >
            {isPlayingSound ? (
              <Volume2 size={16} className="animate-pulse text-rose-600" />
            ) : (
              <VolumeX size={16} />
            )}
          </button>

          {/* Botão de Ajustes Discreto para Lucas */}
          <button
            onClick={onOpenConfig}
            aria-label="Abrir painel de personalização"
            title="Personalizar fotos, textos e passagem"
            className="p-2 rounded-full bg-white hover:bg-rose-50 border border-rose-200 text-rose-500 hover:text-rose-700 transition-all cursor-pointer"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
