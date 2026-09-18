import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, MapPin, Heart, Clock, Send, Sparkles, Ticket, ShieldCheck } from 'lucide-react';
import { SiteConfig } from '../config';
import { CountdownState } from '../utils/countdown';
import { triggerRomanticHearts } from '../utils/confetti';

interface Step6ReunionProps {
  config: SiteConfig;
  countdown: CountdownState;
}

export const Step6Reunion: React.FC<Step6ReunionProps> = ({ config, countdown }) => {
  const [sentHug, setSentHug] = useState(false);
  const [hugCount, setHugCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const handleSendHug = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerRomanticHearts(x, y);

    setSentHug(true);
    setHugCount((prev) => prev + 1);
    setTimeout(() => setSentHug(false), 3000);
  };

  return (
    <section
      id="step-6"
      className="min-h-screen bg-gradient-to-b from-white via-rose-50/70 to-rose-100/60 py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Luz ambiente */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-rose-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10 space-y-16 text-center">
        {/* Cabeçalho */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-100 text-rose-800 text-xs sm:text-sm font-semibold border border-rose-200 shadow-sm">
            <Plane className="w-4 h-4 text-rose-600" />
            <span>Capítulo Final • O Reencontro no Canadá</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-rose-950">
            E em breve a gente <br />
            <span className="text-rose-600 italic">está junto...</span>
          </h2>

          <p className="text-base sm:text-xl text-rose-800 font-serif italic max-w-xl mx-auto leading-relaxed">
            “8.150 km separam o Brasil do Canadá, mas cada segundo que passa é um segundo a menos longe de você.”
          </p>
        </div>

        {/* Bloco do Contador Regressivo em Tempo Real */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-10 rounded-3xl bg-white border border-rose-200 shadow-xl shadow-rose-900/5 space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-100 pb-4">
            <div className="flex items-center gap-2 text-rose-700 text-xs sm:text-sm font-semibold font-sans">
              <Clock className="w-4 h-4 text-rose-500" />
              <span>Contagem Regressiva para 24.10.2026 às 09:19h</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/70">
              <span>🇧🇷 10:19h</span>
              <span>•</span>
              <span>🇨🇦 09:19h</span>
            </div>
          </div>

          {/* Unidades do Countdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'DIAS', val: countdown.days },
              { label: 'HORAS', val: countdown.hours },
              { label: 'MINUTOS', val: countdown.minutes },
              { label: 'SEGUNDOS', val: countdown.seconds },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200/80 flex flex-col items-center justify-center shadow-inner"
              >
                <span className="font-serif text-3xl sm:text-5xl font-bold text-rose-950 font-mono tracking-tight">
                  {item.val.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs tracking-widest font-sans font-bold text-rose-600 mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-rose-600 font-sans italic">
            {countdown.isReached
              ? '✨ O momento chegou! O cronômetro zerou e a saudade acabou!'
              : 'Falta cada vez menos para o nosso abraço no aeroporto.'}
          </p>
        </motion.div>

        {/* O Cartão de Embarque / Passagem para o Canadá */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white border-2 border-rose-200/90 shadow-xl overflow-hidden text-left"
        >
          {/* Topo do Bilhete */}
          <div className="bg-rose-600 p-4 sm:p-5 text-white flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-rose-200" />
              <span className="font-serif text-lg font-bold tracking-wide">
                CARTÃO DE EMBARQUE • VOO LC-2410
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs bg-rose-700/80 px-3 py-1 rounded-full font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>PASSAGEM CONFIRMADA</span>
            </div>
          </div>

          {/* Corpo do Bilhete */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div>
                <p className="text-xs text-rose-500 uppercase tracking-widest font-bold font-sans">
                  Origem
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-950 mt-0.5">
                  Brasil 🇧🇷
                </h3>
                <p className="text-xs text-rose-600 font-sans">Lucas te esperando</p>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-[11px] font-mono text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 mb-1">
                  8.150 km em linha reta
                </span>
                <div className="w-full flex items-center gap-2">
                  <div className="h-0.5 flex-1 bg-rose-200 border-dashed"></div>
                  <Plane className="w-5 h-5 text-rose-600 rotate-90" />
                  <div className="h-0.5 flex-1 bg-rose-200 border-dashed"></div>
                </div>
                <span className="text-xs font-serif italic text-rose-700 mt-1">
                  Rumo ao seu abraço
                </span>
              </div>

              <div className="sm:text-right">
                <p className="text-xs text-rose-500 uppercase tracking-widest font-bold font-sans">
                  Destino
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-950 mt-0.5">
                  Canadá 🇨🇦
                </h3>
                <p className="text-xs text-rose-600 font-sans">Ao lado da Dai</p>
              </div>
            </div>

            {/* Detalhes de Voo */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-rose-100 text-xs sm:text-sm font-sans">
              <div>
                <span className="text-rose-500 block text-[11px]">DATA DO EMBARQUE</span>
                <strong className="text-rose-950 font-serif text-base">24 OUT 2026</strong>
              </div>
              <div>
                <span className="text-rose-500 block text-[11px]">HORÁRIO CHEGADA</span>
                <strong className="text-rose-950 font-serif text-base">09:19h (Canadá)</strong>
              </div>
              <div>
                <span className="text-rose-500 block text-[11px]">ASSENTO</span>
                <strong className="text-rose-950 font-serif text-base">01A • Ao Seu Lado</strong>
              </div>
              <div>
                <span className="text-rose-500 block text-[11px]">PORTÃO</span>
                <strong className="text-rose-950 font-serif text-base">O Seu Coração</strong>
              </div>
            </div>

            {/* Slot para Imagem Real da Passagem se Lucas tiver adicionado */}
            {config.flightTicket.ticketImageUrl && (
              <div className="mt-4 p-3 rounded-2xl bg-rose-50 border border-rose-200">
                <p className="text-xs font-semibold text-rose-700 mb-2 font-sans flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Comprovante da Passagem:</span>
                </p>
                <img
                  src={config.flightTicket.ticketImageUrl}
                  alt="Passagem Aérea"
                  className="w-full max-h-72 object-contain rounded-xl shadow-sm bg-white"
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Carta Digital de Lucas para Dai */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 rounded-3xl bg-white border border-rose-200/80 shadow-md text-left space-y-6 relative"
        >
          <div className="border-b border-rose-100 pb-4 flex items-center justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-950">
              {config.letter.greeting}
            </h3>
            <span className="text-xs text-rose-500 font-serif italic">
              21 de Setembro de 2026
            </span>
          </div>

          <div className="space-y-4 font-serif text-lg sm:text-xl text-rose-900 leading-relaxed">
            {config.letter.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="pt-4 border-t border-rose-100 text-right space-y-1">
            <p className="font-serif italic text-rose-700 text-sm sm:text-base">
              {config.letter.closing}
            </p>
            <p className="font-script text-3xl sm:text-4xl text-rose-600 font-bold">
              {config.letter.signature}
            </p>
          </div>

          {config.letter.postScript && (
            <div className="pt-2 text-xs sm:text-sm font-sans text-rose-600 italic bg-rose-50/70 p-3.5 rounded-2xl border border-rose-200/50">
              {config.letter.postScript}
            </div>
          )}
        </motion.div>

        {/* Ação Interativa: Mandar um Abraço para o Canadá */}
        <div className="space-y-3 pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendHug}
            className="px-8 sm:px-12 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-medium text-base sm:text-lg shadow-xl hover:shadow-rose-600/25 transition-all inline-flex items-center gap-3 cursor-pointer mx-auto"
          >
            <Heart size={20} fill="currentColor" className="text-rose-200 animate-pulse" />
            <span>Mandar um abraço quentinho pro Canadá</span>
            <Send size={18} />
          </motion.button>

          {sentHug && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-serif italic text-rose-700"
            >
              ❤️ Abraço #{hugCount} enviado diretamente para o seu coração aí no Canadá!
            </motion.p>
          )}
        </div>

        {/* Easter Egg / Surpresa Final */}
        <div className="pt-6">
          <button
            onClick={() => setShowSecret(!showSecret)}
            className="text-xs text-rose-500 hover:text-rose-700 underline underline-offset-4 font-sans cursor-pointer transition-colors"
          >
            {config.easterEgg.buttonLabel}
          </button>

          <AnimatePresence>
            {showSecret && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="mt-4 p-6 rounded-3xl bg-rose-100/90 border border-rose-300 max-w-xl mx-auto text-center space-y-2 shadow-md"
              >
                <div className="flex items-center justify-center gap-1.5 text-rose-700 font-serif font-bold text-lg">
                  <Sparkles size={16} className="text-amber-500" />
                  <span>{config.easterEgg.secretTitle}</span>
                </div>
                <p className="font-serif text-sm sm:text-base text-rose-900 leading-relaxed italic">
                  “{config.easterEgg.secretMessage}”
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Rodapé Romântico estilo priscila-e-mario */}
        <footer className="pt-16 pb-8 border-t border-rose-200 text-center space-y-2">
          <p className="font-serif text-xl text-rose-900 font-bold">
            Independente de qualquer distância... o meu coração é todo seu.
          </p>
          <p className="font-serif text-base text-rose-700 italic">
            Feliz Aniversário, Dai! Nos vemos em 24 de outubro de 2026.
          </p>
          <p className="text-xs text-rose-400 font-sans pt-4">
            Feito com todo amor por Lucas • 21 de Setembro de 2026
          </p>
        </footer>
      </div>
    </section>
  );
};
