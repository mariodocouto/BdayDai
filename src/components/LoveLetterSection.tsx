import React from 'react';
import { Heart, Sparkles, Feather } from 'lucide-react';
import { SiteConfig } from '../config';

interface LoveLetterSectionProps {
  config: SiteConfig;
}

export const LoveLetterSection: React.FC<LoveLetterSectionProps> = ({ config }) => {
  const { letter } = config;

  return (
    <section id="letter" className="relative py-24 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Luz ambiente de vela / aconchego */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-radial from-[#571e3a]/25 via-transparent to-transparent blur-3xl pointer-events-none"></div>

      {/* Header Narrativo */}
      <div className="text-center max-w-xl mx-auto mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#271322]/80 border border-[#5a2745]/50 text-[#e4a4bd] text-xs uppercase tracking-widest mb-3">
          <Feather className="w-3.5 h-3.5 text-[#e5779a]" />
          <span>Palavras do Coração • Carta para Dai</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold tracking-tight">
          De Lucas para Dai
        </h2>
      </div>

      {/* Cartão da Carta Estilo Papel Aveludado com Lacre */}
      <div className="relative z-10 p-7 sm:p-12 rounded-3xl bg-gradient-to-b from-[#211220]/95 to-[#160c15]/95 border-2 border-[#5e2748]/70 shadow-2xl backdrop-blur-md">
        {/* Lacre de Cera Romântico "L & D" */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#9c2755] to-[#591430] border-2 border-[#fca9c4]/40 shadow-xl flex items-center justify-center text-white">
          <span className="font-serif text-xs font-bold tracking-tighter">L&D</span>
        </div>

        {/* Saudação */}
        <div className="pt-2 mb-8 text-left">
          <p className="font-serif text-2xl sm:text-3xl font-bold text-[#fce2ec] tracking-wide">
            {letter.greeting}
          </p>
          <div className="flex items-center gap-2 mt-1 text-xs text-[#a88299] font-mono">
            <span>21 de Setembro de 2026</span>
            <span>•</span>
            <span>Seu Aniversário & Nossos 6 Meses</span>
          </div>
        </div>

        {/* Parágrafos da Carta */}
        <div className="space-y-5 text-left text-sm sm:text-base text-[#e5ccd9] font-sans font-light leading-relaxed">
          {letter.paragraphs.map((paragraph, idx) => {
            // Destaque poético para a frase central
            if (paragraph.includes("Eu não posso diminuir fisicamente")) {
              return (
                <div
                  key={idx}
                  className="my-6 p-4 sm:p-5 rounded-2xl bg-[#2b1426] border-l-4 border-[#e65c83] text-[#fcd8e5] font-serif text-base sm:text-lg italic leading-snug shadow-inner"
                >
                  “Eu não posso diminuir a distância entre nós agora, mas posso prometer uma coisa: eu conto cada segundo que falta para ela acabar.”
                </div>
              );
            }

            return (
              <p key={idx} className="tracking-wide">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Despedida e Assinatura */}
        <div className="mt-10 pt-6 border-t border-[#3e1933] text-right">
          <p className="text-xs sm:text-sm text-[#caa1b7] font-light italic mb-2">
            {letter.closing}
          </p>
          <p className="font-script text-4xl sm:text-5xl text-[#fca9c4] drop-shadow-sm pr-2">
            {letter.signature}
          </p>

          {letter.postScript && (
            <div className="mt-8 pt-4 border-t border-dashed border-[#34162b] text-left">
              <p className="text-xs sm:text-sm text-[#b891a8] italic font-sans flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#e65c83] shrink-0 mt-0.5" />
                <span>{letter.postScript}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
