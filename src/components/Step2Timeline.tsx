import React from 'react';
import { motion } from 'motion/react';
import { Heart, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { SiteConfig } from '../config';

interface Step2TimelineProps {
  config: SiteConfig;
  onNextClick: () => void;
}

export const Step2Timeline: React.FC<Step2TimelineProps> = ({ config, onNextClick }) => {
  const cards = [
    {
      title: "O Ponto de Partida",
      text: "Desde que a gente se conheceu naquele 21 de março de 2026...",
      sub: "O dia em que a minha vida ganhou um novo brilho.",
      highlight: true,
    },
    {
      title: "A Certeza Imediata",
      text: "Soube logo no início que queria me aproximar de ti, ouvir sua voz e descobrir cada detalhe do seu mundo...",
      sub: "O seu jeito me conquistou sem esforço.",
      highlight: false,
    },
    {
      title: "A Conexão Verdadeira",
      text: "E quanto mais o tempo passava, mais eu tinha certeza do que eu sentia e do quanto você era especial...",
      sub: "Cada conversa fazia a distância sumir.",
      highlight: false,
    },
    {
      title: "Hoje Faz 6 Meses",
      text: "Hoje, 21 de setembro, completamos exatamente 6 meses desde aquele primeiro instante. Seis meses que provaram a força do que a gente tem.",
      sub: "21.03 ➔ 21.09: Seis meses de nós dois.",
      highlight: true,
    },
  ];

  return (
    <section
      id="step-2"
      className="min-h-screen bg-white py-24 px-4 sm:px-6 flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl w-full mx-auto relative z-10 space-y-16">
        {/* Cabeçalho da Seção */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold tracking-wider uppercase border border-rose-200">
            <Calendar className="w-3.5 h-3.5 text-rose-500" />
            <span>Capítulo 01 • O Começo de Tudo</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-rose-950">
            Desde que a gente se conheceu...
          </h2>
          <p className="text-rose-700/80 font-serif text-lg italic max-w-md mx-auto">
            “21 de março de 2026 marcou o início de uma história que eu quero viver para sempre.”
          </p>
        </div>

        {/* Lista de cartões alternados estilo priscila-e-mario */}
        <div className="space-y-10 sm:space-y-14">
          {cards.map((card, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`flex ${isEven ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`p-6 sm:p-8 rounded-3xl shadow-sm border max-w-lg transition-all hover:shadow-md ${
                    card.highlight
                      ? 'bg-rose-50/90 border-rose-200 text-rose-950'
                      : 'bg-white border-rose-100 text-rose-900 shadow-rose-900/5'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Heart
                      size={16}
                      className={card.highlight ? 'text-rose-600 fill-rose-600' : 'text-rose-400'}
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-600 font-sans">
                      {card.title}
                    </span>
                  </div>
                  <p className="font-serif text-xl sm:text-2xl text-rose-900 leading-snug">
                    {card.text}
                  </p>
                  <p className="text-xs sm:text-sm text-rose-600/80 font-sans mt-3 italic flex items-center gap-1.5">
                    <Sparkles size={13} className="text-amber-500" />
                    {card.sub}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Botão de Avanço estilo "clicar e andar" */}
        <div className="text-center pt-8">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onNextClick}
            className="px-8 sm:px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-medium text-base sm:text-lg shadow-lg hover:shadow-rose-600/20 transition-all inline-flex items-center gap-2.5 group cursor-pointer"
          >
            <span>Continuar a nossa história</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
