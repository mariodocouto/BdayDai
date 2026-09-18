import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ChevronDown, Sparkles, Cake } from 'lucide-react';
import { SiteConfig } from '../config';

interface Step1IntroProps {
  config: SiteConfig;
  onStartClick: () => void;
}

export const Step1Intro: React.FC<Step1IntroProps> = ({ config, onStartClick }) => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowSubtitle(true), 1200);
    const t2 = setTimeout(() => setShowButton(true), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section
      id="step-1"
      className="min-h-screen relative flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-gradient-to-b from-rose-50 via-white to-rose-50/50"
    >
      {/* Decorative large floating hearts */}
      <motion.div
        className="absolute top-16 left-8 md:left-20 text-rose-200/60 pointer-events-none"
        animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart size={72} fill="currentColor" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-8 md:right-24 text-rose-200/50 pointer-events-none"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart size={60} fill="currentColor" />
      </motion.div>

      <div className="max-w-3xl mx-auto z-10 space-y-6">
        {/* Badge do casal */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs sm:text-sm font-medium shadow-sm border border-rose-200/60 mb-2"
        >
          <Cake className="w-4 h-4 text-rose-600" />
          <span>Para Daiane (Dai) • 21 de Setembro</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </motion.div>

        {/* Título Principal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-rose-950 leading-tight drop-shadow-sm"
        >
          Hoje é um dia <br />
          <span className="text-rose-600 italic">muito especial...</span>
        </motion.h1>

        {/* Frase animada que aparece suavemente */}
        <div className="min-h-[80px] flex items-center justify-center px-4">
          {showSubtitle && (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-lg sm:text-2xl md:text-3xl text-rose-700 font-light font-serif italic max-w-xl mx-auto leading-relaxed"
            >
              “E eu preparei algo para você ir descobrindo passo a passo... como a nossa história merece.”
            </motion.p>
          )}
        </div>

        {/* Botão de Começar interativo estilo priscila-e-mario */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="pt-6"
          >
            <motion.button
              id="start-story-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={onStartClick}
              className="px-8 sm:px-10 py-4 bg-rose-600 text-white rounded-full text-base sm:text-lg font-medium shadow-xl hover:bg-rose-700 transition-all flex items-center gap-3 mx-auto group cursor-pointer border border-rose-400/40"
            >
              <Heart size={20} fill="currentColor" className="text-rose-200 group-hover:scale-110 transition-transform" />
              <span>Começar a nossa história</span>
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </motion.button>
            <p className="text-xs text-rose-400 mt-3 font-sans">
              Toque para avançar e ouvir nossa melodia ✨
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
