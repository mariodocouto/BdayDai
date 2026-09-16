import React, { useState } from 'react';
import { Heart, Sparkles, Clock, Send, Gift } from 'lucide-react';
import { CountdownState } from '../utils/countdown';
import { SiteConfig } from '../config';
import { triggerRomanticHearts, triggerReunionCelebration } from '../utils/confetti';

interface FinalCountdownSectionProps {
  countdown: CountdownState;
  config: SiteConfig;
}

export const FinalCountdownSection: React.FC<FinalCountdownSectionProps> = ({ countdown, config }) => {
  const [showSecret, setShowSecret] = useState(false);

  const handleSecretReveal = () => {
    setShowSecret(!showSecret);
    if (!showSecret) {
      triggerRomanticHearts(0.5, 0.7);
    }
  };

  return (
    <footer id="final-countdown" className="relative py-24 sm:py-32 px-4 sm:px-6 text-center max-w-4xl mx-auto overflow-hidden">
      {/* Luz ambiente de encerramento */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-radial from-[#661e3f]/25 via-transparent to-transparent blur-3xl pointer-events-none"></div>

      {/* A Progressão Poética */}
      <div className="relative z-10 max-w-lg mx-auto mb-16 space-y-3">
        <p className="text-xs uppercase font-mono tracking-[0.3em] text-[#a88299]">
          Nossa Linha do Tempo
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#d8b5c9] font-medium">
          <span className="px-3 py-1 rounded-full bg-[#20101f] border border-[#48203c]">Estamos longe.</span>
          <span className="text-[#8c355f]">➔</span>
          <span className="px-3 py-1 rounded-full bg-[#20101f] border border-[#48203c]">Temos nossas memórias.</span>
          <span className="text-[#8c355f]">➔</span>
          <span className="px-3 py-1 rounded-full bg-[#20101f] border border-[#48203c]">Temos uma passagem.</span>
          <span className="text-[#8c355f]">➔</span>
          <span className="px-3 py-1 rounded-full bg-[#38162e] border border-[#833860] text-[#fca9c4] font-semibold">Temos uma data.</span>
        </div>
      </div>

      {/* "Enquanto isso..." e Countdown Final */}
      <div className="relative z-10">
        <h3 className="text-2xl sm:text-4xl font-serif text-[#f4d0df] font-light mb-8">
          Enquanto isso...
        </h3>

        {/* Countdown em Destaque Especial */}
        <div className="max-w-2xl mx-auto mb-8">
          {countdown.isReached ? (
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#531834] to-[#250b18] border-2 border-[#b54070] shadow-2xl shadow-[#b54070]/20 text-center animate-pulse">
              <span className="text-3xl sm:text-6xl font-serif text-white font-bold block mb-3">
                Chegou a hora.
              </span>
              <p className="text-lg sm:text-xl text-[#ffd2e2] font-light mb-4">
                A distância acabou. Agora falta só abrir os braços.
              </p>
              <button
                id="celebrate-reunion-btn"
                onClick={triggerReunionCelebration}
                className="px-6 py-3 rounded-full bg-white text-[#531834] font-semibold text-sm hover:bg-[#ffe3ee] transition-colors shadow-lg cursor-pointer"
              >
                Comemorar o Reencontro!
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-4 p-4 sm:p-6 rounded-3xl bg-[#1d0e1c]/90 border border-[#522241]/70 backdrop-blur-md shadow-2xl">
              {/* Dias */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-[#281324] border border-[#4e213f]/60">
                <span className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight">
                  {countdown.days.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest text-[#d8a4bf] uppercase font-sans mt-1">
                  Dias
                </span>
              </div>

              {/* Horas */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-[#281324] border border-[#4e213f]/60">
                <span className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight">
                  {countdown.hours.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest text-[#d8a4bf] uppercase font-sans mt-1">
                  Horas
                </span>
              </div>

              {/* Minutos */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-[#281324] border border-[#4e213f]/60">
                <span className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight">
                  {countdown.minutes.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest text-[#d8a4bf] uppercase font-sans mt-1">
                  Minutos
                </span>
              </div>

              {/* Segundos */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-[#34162e] border border-[#7d325a]/70 shadow-lg shadow-[#7d325a]/10">
                <span className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#fca9c4] tracking-tight animate-pulse">
                  {countdown.seconds.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest text-[#f5bfd5] uppercase font-sans mt-1 font-medium">
                  Segundos
                </span>
              </div>
            </div>
          )}

          {/* Frase Emocional Final */}
          <p className="mt-4 text-sm sm:text-base text-[#d8b5c9] font-light leading-relaxed">
            Cada segundo que passa é um segundo a menos para te encontrar.
          </p>
        </div>

        {/* Despedida e Assinatura Final */}
        <div className="mt-12 space-y-2">
          <p className="font-serif text-3xl sm:text-4xl text-white font-medium">
            Te espero, {config.recipientNickname}.
          </p>
          <p className="text-sm sm:text-base font-mono text-[#e890ad] tracking-widest">
            24.10.2026 — 09:19h
          </p>
          <p className="text-xs text-[#9e7690] font-sans font-light">
            O momento exato em que a distância deixa de existir.
          </p>
        </div>

        {/* Botão de Surpresa Secreta ("Mais uma coisa, Dai...") */}
        <div className="mt-14">
          <button
            id="secret-easter-egg-btn"
            onClick={handleSecretReveal}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#2a1324] hover:bg-[#3d1833] text-[#fca9c4] border border-[#6b2a50]/60 transition-all duration-300 shadow-lg hover:shadow-[#a13f6b]/20 cursor-pointer text-xs sm:text-sm font-medium"
          >
            <Gift className="w-4 h-4 text-[#e65c83] group-hover:rotate-12 transition-transform" />
            <span>{config.easterEgg.buttonLabel}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ffd0df]" />
          </button>

          {/* Mensagem Secreta Revelada */}
          {showSecret && (
            <div className="mt-6 max-w-lg mx-auto p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#2b1225] to-[#1a0b17] border-2 border-[#943864]/70 shadow-2xl text-left animate-fade-in relative">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#fca9c4] mb-2">
                <Heart className="w-3.5 h-3.5 fill-[#e65c83] text-[#e65c83]" />
                <span>{config.easterEgg.secretTitle}</span>
              </div>
              <p className="text-sm text-[#ecd0de] font-sans font-light leading-relaxed">
                {config.easterEgg.secretMessage}
              </p>
              <div className="mt-4 pt-3 border-t border-[#461b36] flex items-center justify-between text-[11px] text-[#a57e96] font-mono">
                <span>Com todo o meu amor,</span>
                <span className="text-white font-serif italic text-sm">{config.senderName} ❤️</span>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé Minimalista */}
        <div className="mt-20 pt-8 border-t border-[#2d1425] text-xs text-[#7d566f] font-mono flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Feito com todo carinho por Lucas para Daiane</span>
          <span>21.03 • 21.09 • 24.10.2026</span>
        </div>
      </div>
    </footer>
  );
};
