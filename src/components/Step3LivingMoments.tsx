import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, MessageCircleHeart, Smile, Globe, ArrowRight } from 'lucide-react';
import { SiteConfig } from '../config';

interface Step3LivingMomentsProps {
  config: SiteConfig;
  onNextClick: () => void;
}

export const Step3LivingMoments: React.FC<Step3LivingMomentsProps> = ({ config, onNextClick }) => {
  const highlights = [
    {
      icon: Smile,
      title: "As Risadas Compartilhadas",
      description: "Aquele riso fácil que só você consegue tirar de mim, transformando qualquer dia comum no melhor dia.",
    },
    {
      icon: MessageCircleHeart,
      title: "Mensagens Sem Fim",
      description: "Conversas que começavam cedo e iam até a madrugada, vencendo o sono e qualquer diferença de fuso.",
    },
    {
      icon: Globe,
      title: "Construindo o Futuro",
      description: "Planejar os nossos próximos passos juntos, sonhando com tudo o que ainda vamos viver lado a lado.",
    },
  ];

  return (
    <section
      id="step-3"
      className="min-h-screen bg-rose-50/60 py-24 px-4 sm:px-6 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-4xl w-full mx-auto relative z-10 space-y-14 text-center">
        {/* Badge */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-rose-700 text-xs font-semibold tracking-wider uppercase border border-rose-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Capítulo 02 • A Nossa Conexão</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-rose-950">
            Foram momentos incríveis, <br />
            <span className="text-rose-600 italic">vivendo cada segundo...</span>
          </h2>

          <p className="text-rose-800/80 font-serif text-lg sm:text-xl italic max-w-xl mx-auto">
            “Mesmo quando a distância pareceu grande, o nosso amor sempre foi infinitamente maior.”
          </p>
        </div>

        {/* Três pilares visuais da vivência do casal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-rose-100 shadow-sm hover:shadow-md transition-all space-y-3 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all">
                  <Icon size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold text-rose-950">
                  {item.title}
                </h3>
                <p className="text-rose-700/80 text-sm font-sans leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Destaque central */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-rose-200/80 max-w-2xl mx-auto shadow-sm"
        >
          <div className="flex items-center justify-center gap-2 mb-2 text-rose-600">
            <Heart size={18} fill="currentColor" />
            <span className="text-xs uppercase tracking-widest font-semibold font-sans">
              Memórias Guardadas com Carinho
            </span>
          </div>
          <p className="font-serif text-xl sm:text-2xl text-rose-900 leading-relaxed italic">
            “Se pudéssemos congelar o tempo, congelaríamos cada instante que já vivemos. Mas o melhor de tudo é saber que o nosso futuro é ainda mais bonito.”
          </p>
        </motion.div>

        {/* Botão de Avanço */}
        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onNextClick}
            className="px-8 sm:px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-medium text-base sm:text-lg shadow-lg hover:shadow-rose-600/20 transition-all inline-flex items-center gap-2.5 group cursor-pointer"
          >
            <span>Ver os nossos momentos gravados na memória</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
