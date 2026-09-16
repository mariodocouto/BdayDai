import React from 'react';
import { Heart, ChevronDown, Sparkles } from 'lucide-react';
import { CountdownState } from '../utils/countdown';
import { SiteConfig } from '../config';
import { WorldClockPills } from './WorldClockPills';

interface HeroSectionProps {
  countdown: CountdownState;
  config: SiteConfig;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ countdown, config, onExploreClick }) => {
  return (
    <header className="relative min-h-screen flex flex-col items-center justify-between px-4 sm:px-6 py-12 text-center overflow-hidden">
      {/* Luz ambiente atmosférica e gradientes quentes e acolhedores */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[680px] h-[340px] sm:h-[680px] bg-radial from-[#671d3e]/30 via-[#2d1123]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-1/4 w-[280px] sm:w-[480px] h-[280px] sm:h-[480px] bg-radial from-[#80324b]/20 via-transparent to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-1/4 w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] bg-radial from-[#532644]/25 via-transparent to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Top Tag: Indicação Carinhosa */}
      <div className="relative z-10 pt-4 sm:pt-6 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2a1725]/80 border border-[#6f3353]/40 text-[#f5d9e5] backdrop-blur-md shadow-md text-xs tracking-widest uppercase">
          <Sparkles className="w-3 h-3 text-[#f2a8c1]" />
          <span>Presente Especial de Aniversário</span>
          <Heart className="w-3 h-3 text-[#e65c83] fill-[#e65c83]" />
        </div>
      </div>

      {/* Bloco Central de Poesia e Abertura */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto py-8 sm:py-12 flex flex-col items-center">
        {/* Dedicatória Íntima */}
        <p className="font-script text-4xl sm:text-6xl md:text-7xl text-[#f7cad7] mb-3 tracking-wide drop-shadow-sm">
          Para {config.recipientNickname}.
        </p>

        {/* Frases Narrativas */}
        <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
          <p className="text-base sm:text-xl md:text-2xl text-[#d4b5c7] font-light leading-relaxed font-sans">
            Porque alguns quilômetros parecem infinitos quando existe saudade.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-[#e9ccd9] font-medium tracking-wide">
            Mas agora existe um dia, uma hora e um bilhete para acabar com toda a distância.
          </p>
        </div>

        {/* Revelação da Data do Reencontro */}
        <div className="mt-8 mb-6 inline-block">
          <div className="relative px-6 sm:px-10 py-3 rounded-2xl bg-gradient-to-r from-[#321626]/70 via-[#441a33]/80 to-[#321626]/70 border border-[#83385e]/50 backdrop-blur-lg shadow-2xl">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#d69bb8] block font-sans font-medium mb-1">
              O Momento Mais Esperado do Ano
            </span>
            <div className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold tracking-wider text-white drop-shadow">
              24.10.2026 <span className="text-[#e26991] font-light">—</span> 09:19
            </div>
            <div className="text-[11px] sm:text-xs text-[#c7a4b8] mt-1.5 font-sans">
              {config.reunion.timezoneLabel}
            </div>
          </div>
        </div>

        {/* O Contador Hero */}
        <div className="w-full max-w-2xl mt-4">
          {countdown.isReached ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#4d1730] to-[#250d1a] border border-[#a13f6b] shadow-2xl animate-pulse text-center">
              <span className="text-3xl sm:text-5xl font-serif text-white font-bold block mb-2">
                Chegou a hora.
              </span>
              <p className="text-base sm:text-lg text-[#fcd3e1] font-light">
                A distância acabou. Agora falta só abrir os braços e viver o nosso reencontro.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {/* DIAS */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-[#231221]/85 border border-[#5d2a4a]/60 backdrop-blur-md shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                  {countdown.days.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest text-[#d8a4bf] uppercase font-sans mt-1">
                  Dias
                </span>
              </div>

              {/* HORAS */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-[#231221]/85 border border-[#5d2a4a]/60 backdrop-blur-md shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                  {countdown.hours.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest text-[#d8a4bf] uppercase font-sans mt-1">
                  Horas
                </span>
              </div>

              {/* MINUTOS */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-[#231221]/85 border border-[#5d2a4a]/60 backdrop-blur-md shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                  {countdown.minutes.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest text-[#d8a4bf] uppercase font-sans mt-1">
                  Minutos
                </span>
              </div>

              {/* SEGUNDOS */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-[#2b1429]/90 border border-[#853460]/70 backdrop-blur-md shadow-lg shadow-[#853460]/10 transition-transform duration-300 hover:scale-[1.02]">
                <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#fca9c4] tracking-tight animate-pulse">
                  {countdown.seconds.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest text-[#f5bfd5] uppercase font-sans mt-1 font-medium">
                  Segundos
                </span>
              </div>
            </div>
          )}

          {/* Subtítulo Poético sob o Contador */}
          <p className="mt-4 text-xs sm:text-sm text-[#caa1b7] font-light">
            Cada segundo que passa é um segundo a menos para te abraçar.
          </p>
        </div>

        {/* Relógios de Fuso Brasil & Canadá */}
        <div className="mt-8">
          <WorldClockPills />
        </div>
      </div>

      {/* Seta de Scroll Elegante */}
      <div className="relative z-10 pb-4">
        <button
          id="scroll-to-story-btn"
          onClick={onExploreClick}
          aria-label="Rolar para ver a história"
          className="group flex flex-col items-center gap-1.5 text-xs text-[#c59cb3] hover:text-[#f7c2d5] transition-colors cursor-pointer"
        >
          <span className="tracking-widest uppercase text-[10px] font-medium font-sans">Nossa História</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#e6759c]" />
        </button>
      </div>
    </header>
  );
};
