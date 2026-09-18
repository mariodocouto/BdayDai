import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cake, Sparkles, Heart, Gift, ArrowRight, Stars } from 'lucide-react';
import { SiteConfig } from '../config';
import { triggerBirthdayBlast, triggerRomanticHearts } from '../utils/confetti';

interface Step5BirthdayCelebrationProps {
  config: SiteConfig;
  onNextClick: () => void;
}

export const Step5BirthdayCelebration: React.FC<Step5BirthdayCelebrationProps> = ({
  config,
  onNextClick,
}) => {
  const [hasRevealed, setHasRevealed] = useState(false);

  const handleReveal = () => {
    setHasRevealed(true);
    triggerBirthdayBlast();
  };

  const handleMoreCelebration = () => {
    triggerBirthdayBlast();
  };

  return (
    <section
      id="step-5"
      className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-gradient-to-b from-rose-50 via-white to-rose-100/40 overflow-hidden"
    >
      {/* Luz ambiente de celebração */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10 text-center py-16">
        <AnimatePresence mode="wait">
          {!hasRevealed ? (
            /* Estado Inicial: Teaser antes de clicar */
            <motion.div
              key="teaser"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 max-w-2xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs sm:text-sm font-semibold border border-rose-200 shadow-sm">
                <Gift className="w-4 h-4 text-rose-600 animate-bounce" />
                <span>21 de Setembro • O Seu Grande Dia</span>
              </div>

              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-rose-950 leading-tight">
                Pronta para o seu <br />
                <span className="text-rose-600 italic">presente especial?</span>
              </h2>

              <p className="text-rose-700 font-serif text-lg sm:text-2xl italic leading-relaxed max-w-lg mx-auto">
                “Hoje o mundo inteiro comemora o nascimento da pessoa que faz o meu coração bater mais forte.”
              </p>

              <div className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleReveal}
                  className="px-10 sm:px-14 py-5 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-lg sm:text-xl font-bold shadow-2xl hover:shadow-rose-600/30 transition-all flex items-center gap-3 mx-auto cursor-pointer border border-rose-400/50"
                >
                  <Gift className="w-6 h-6 text-amber-200" />
                  <span>Clique aqui para abrir seu presente! 🎂</span>
                </motion.button>
                <p className="text-xs text-rose-500 mt-3 font-sans">
                  Prepare o coração para uma surpresa... ✨
                </p>
              </div>
            </motion.div>
          ) : (
            /* Clímax Revelado: FELIZ ANIVERSÁRIO! */
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', bounce: 0.4, duration: 1 }}
              className="space-y-10"
            >
              {/* Ícone de Bolo Festivo com Corações */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="inline-flex p-6 rounded-full bg-rose-100 text-rose-600 shadow-inner border border-rose-200/80 mb-2"
              >
                <Cake size={56} className="text-rose-600" />
              </motion.div>

              {/* Título de Feliz Aniversário */}
              <div className="space-y-3">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-rose-950 drop-shadow-sm"
                >
                  FELIZ ANIVERSÁRIO, DAI! 🎉🎂
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="text-2xl sm:text-3xl font-serif text-rose-700 italic font-medium"
                >
                  Hoje o dia é todinho seu, meu amor!
                </motion.p>
              </div>

              {/* Foto de Casal de Destaque + Moldura Especial */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="max-w-md sm:max-w-lg mx-auto"
              >
                <div className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-rose-200 shadow-2xl shadow-rose-900/10 transform rotate-[-1deg] hover:rotate-0 transition-transform">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-rose-100 shadow-inner">
                    <img
                      src={config.birthdayCouplePhoto || config.photos[0]?.url}
                      alt="Lucas e Dai"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rose-950/60 via-transparent to-transparent flex items-end p-4">
                      <div className="text-left text-white">
                        <span className="text-xs uppercase tracking-widest font-semibold bg-rose-600/90 px-2.5 py-1 rounded-full backdrop-blur-sm">
                          Nós Dois Juntos 💕
                        </span>
                        <p className="font-serif text-lg sm:text-xl font-bold mt-1.5 drop-shadow">
                          Daiane & Lucas
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <p className="font-serif text-sm sm:text-base text-rose-800 italic font-medium">
                      “O sorriso mais lindo do mundo comemorando mais um ano de vida.”
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Carta e Homenagem de Aniversário */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white/90 border border-rose-200 shadow-md text-left space-y-4"
              >
                <div className="flex items-center gap-2 text-rose-600 font-sans text-xs font-bold uppercase tracking-widest">
                  <Stars size={16} className="text-amber-500" />
                  <span>Meu Desejo Para Você</span>
                </div>

                <p className="font-serif text-lg sm:text-xl text-rose-950 leading-relaxed">
                  {config.birthdayTributeMessage}
                </p>

                <p className="text-rose-700 text-sm font-sans italic border-t border-rose-100 pt-3">
                  Parabéns pelos seus 6 meses de nós e pelo seu aniversário! Que o seu dia no Canadá seja cheio de carinho, paz e abraços quentinhos.
                </p>
              </motion.div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={handleMoreCelebration}
                  className="px-6 py-3.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 text-sm font-semibold border border-rose-300 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Sparkles size={16} className="text-amber-500" />
                  <span>Soltar mais confetes e corações! 🎉</span>
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onNextClick}
                  className="px-8 sm:px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-medium text-base sm:text-lg shadow-xl hover:shadow-rose-600/25 transition-all inline-flex items-center gap-2.5 group cursor-pointer"
                >
                  <span>E tem mais uma certeza no meu coração...</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
