import React from 'react';
import { Calendar, Cake, Heart, Compass, Sparkles } from 'lucide-react';
import { SiteConfig } from '../config';
import { CountdownState } from '../utils/countdown';
import { triggerRomanticHearts } from '../utils/confetti';

interface MilestoneCelebrationProps {
  config: SiteConfig;
  countdown: CountdownState;
}

export const MilestoneCelebration: React.FC<MilestoneCelebrationProps> = ({ config, countdown }) => {
  return (
    <section id="milestones" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Luz ambiente suave */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-radial from-[#4a1c35]/25 via-transparent to-transparent blur-3xl pointer-events-none"></div>

      {/* Header da Seção */}
      <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2d1425]/80 border border-[#6d2f53]/50 text-[#f7b7cb] text-xs uppercase tracking-widest mb-3">
          <Cake className="w-3.5 h-3.5 text-[#f085a5]" />
          <span>21 de Setembro • Seu Dia Especial</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white font-bold tracking-tight mb-4">
          Aniversário & 6 Meses de Nós
        </h2>
        <p className="text-sm sm:text-base text-[#d8b5c9] font-light leading-relaxed font-sans">
          Dizem que coincidências não existem. No dia em que você celebra mais um ano dessa sua vida iluminada, celebramos também exatamente <strong className="text-white font-medium">seis meses</strong> desde aquele 21 de março em que nossos olhares se encontraram.
        </p>
      </div>

      {/* Cartão de Destaque Duplo */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {/* Marco 1: 21 de Março */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#1d111d]/90 border border-[#48243c]/60 backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:border-[#73335b]/70 hover:-translate-y-1 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono tracking-widest text-[#caa0b8] uppercase">Marco 01</span>
            <div className="w-8 h-8 rounded-full bg-[#36172b] flex items-center justify-center text-[#e97ba1]">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-serif font-bold text-white mb-1">
              21 de Março
            </div>
            <div className="text-xs text-[#e890ad] font-medium tracking-wide mb-3">
              Quando tudo começou
            </div>
            <p className="text-xs sm:text-sm text-[#caa1b7] font-light leading-relaxed">
              O início da história mais bonita que eu poderia viver. Seis meses atrás, o destino acertou em cheio ao me colocar no seu caminho.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-[#3b1c31] text-[11px] text-[#9c778f] flex items-center gap-1.5">
            <Heart className="w-3 h-3 text-[#d2587f]" />
            <span>O primeiro instante</span>
          </div>
        </div>

        {/* Marco 2: 21 de Setembro (Centro / Destaque de Aniversário) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#3a1529]/95 via-[#2b0f1e]/90 to-[#1d0a15]/95 border-2 border-[#b54070]/70 backdrop-blur-md relative overflow-hidden transition-all duration-300 shadow-2xl shadow-[#a13160]/20 md:-translate-y-2 flex flex-col justify-between">
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#d85885]/20 rounded-full blur-xl pointer-events-none"></div>

          <div className="flex items-center justify-between mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-[#581f3d] text-[#ffb0cb] text-[11px] font-semibold tracking-wider uppercase">
              Hoje • 21.09
            </span>
            <div className="w-9 h-9 rounded-full bg-[#551d3b] flex items-center justify-center text-[#fca9c4] shadow-inner">
              <Cake className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1">
              Parabéns, Dai!
            </div>
            <div className="text-xs sm:text-sm text-[#fca9c4] font-medium tracking-wide mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd0df]" />
              <span>Seu aniversário + 6 meses juntos</span>
            </div>
            <p className="text-xs sm:text-sm text-[#eed0df] font-light leading-relaxed">
              Não existe presente no mundo que pague a alegria de te chamar de meu amor. Você merece o Canadá inteiro, o mundo inteiro e todo o carinho que guardei aqui dentro.
            </p>
          </div>

          <button
            id="celebrate-dai-btn"
            onClick={() => triggerRomanticHearts(0.5, 0.4)}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#9e2c5b] to-[#781f44] hover:from-[#b5346a] hover:to-[#8c2450] text-white text-xs sm:text-sm font-medium tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Celebrar a Dai com carinho</span>
          </button>
        </div>

        {/* Marco 3: 24 de Outubro (O Reencontro) */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#1d111d]/90 border border-[#48243c]/60 backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:border-[#73335b]/70 hover:-translate-y-1 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono tracking-widest text-[#caa0b8] uppercase">Marco 03</span>
            <div className="w-8 h-8 rounded-full bg-[#36172b] flex items-center justify-center text-[#e97ba1]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-serif font-bold text-white mb-1">
              24 de Outubro
            </div>
            <div className="text-xs text-[#e890ad] font-medium tracking-wide mb-3">
              09:19h — O Reencontro
            </div>
            <p className="text-xs sm:text-sm text-[#caa1b7] font-light leading-relaxed">
              O momento em que a contagem zera, a saudade se desfaz e os 8.150 quilômetros deixam de ser uma distância para virarem um abraço apertado.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-[#3b1c31] text-[11px] text-[#9c778f] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e65c83] animate-ping"></span>
            <span className="text-[#caa1b7]">Faltam apenas {countdown.days} dias</span>
          </div>
        </div>
      </div>

      {/* Barra de Progresso da Jornada */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#1c0f1b]/80 border border-[#3e1b34]/60 backdrop-blur-md relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm text-[#d4b5c7] mb-3">
          <span className="font-medium">Jornada de 21 de Março até o Reencontro:</span>
          <span className="font-mono text-[#fca9c4] font-semibold">{countdown.percentageElapsed}% concluída</span>
        </div>
        <div className="w-full h-3 bg-[#2d1425] rounded-full overflow-hidden p-0.5 border border-[#4d1f3e]/40">
          <div
            className="h-full bg-gradient-to-r from-[#83264d] via-[#bd3d72] to-[#f085a5] rounded-full transition-all duration-1000"
            style={{ width: `${countdown.percentageElapsed}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-[11px] text-[#9e7690] mt-2 font-mono">
          <span>21.03 • Nos conhecemos</span>
          <span className="text-[#fca9c4] font-semibold">21.09 • Hoje (6 meses)</span>
          <span>24.10 • O Reencontro</span>
        </div>
      </div>
    </section>
  );
};
