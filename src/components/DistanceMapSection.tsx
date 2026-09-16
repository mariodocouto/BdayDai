import React, { useState } from 'react';
import { Plane, Heart, Send, Globe, Compass } from 'lucide-react';
import { triggerRomanticHearts } from '../utils/confetti';
import { SiteConfig } from '../config';

interface DistanceMapSectionProps {
  config: SiteConfig;
}

export const DistanceMapSection: React.FC<DistanceMapSectionProps> = ({ config }) => {
  const [hugSent, setHugSent] = useState(false);

  const handleSendHug = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerRomanticHearts(x, y);
    setHugSent(true);
    setTimeout(() => setHugSent(false), 3500);
  };

  return (
    <section id="distance" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Luz ambiente */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-radial from-[#5a1e3b]/20 via-transparent to-transparent blur-3xl pointer-events-none"></div>

      {/* Header poético */}
      <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#271322]/80 border border-[#5a2745]/50 text-[#e4a4bd] text-xs uppercase tracking-widest mb-3">
          <Globe className="w-3.5 h-3.5 text-[#e5779a]" />
          <span>A Geografia do Nosso Amor</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white font-bold tracking-tight mb-4">
          8.150 Quilômetros
        </h2>
        <div className="space-y-2">
          <p className="text-lg sm:text-2xl text-[#f3cbdc] font-serif italic">
            "Entre nós existem milhares de quilômetros..."
          </p>
          <p className="text-sm sm:text-base text-[#d8b5c9] font-light font-sans max-w-xl mx-auto">
            ...mas nenhum deles conseguiu diminuir um único milímetro do que você faz meu coração sentir todos os dias.
          </p>
        </div>
      </div>

      {/* Trajetória Visual e Mapa da Rota */}
      <div className="relative z-10 p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#1f101e]/90 to-[#140b14]/95 border border-[#4a223e]/60 backdrop-blur-md shadow-2xl overflow-hidden">
        {/* Detalhes de coordenadas de fundo */}
        <div className="absolute top-4 right-6 text-[10px] font-mono text-[#7a556c] hidden sm:block">
          FLIGHT ROUTE • BRA ➔ CAN • GC DISTANCE: 8,150 KM
        </div>

        {/* Linha da rota com visual de cartão de navegação */}
        <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-6 my-4">
          {/* Origem: Brasil (Lucas) */}
          <div className="md:col-span-3 p-5 rounded-2xl bg-[#281324]/80 border border-[#582749]/50 text-center relative group transition-all duration-300 hover:border-[#833860]">
            <div className="text-4xl sm:text-5xl mb-2" role="img" aria-label="Bandeira do Brasil">
              🇧🇷
            </div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-white mb-0.5">
              Brasil
            </div>
            <div className="text-xs text-[#e592b0] font-medium tracking-wide">
              Onde {config.senderName} te espera
            </div>
            <div className="mt-3 text-[11px] font-mono text-[#a58197] bg-[#1d0e1b] py-1 px-2.5 rounded-lg inline-block border border-[#3e1b34]">
              LAT: -15.79° • LON: -47.88°
            </div>
            <div className="mt-2 text-xs text-[#d1adc1] italic">
              "Contando cada segundo..."
            </div>
          </div>

          {/* O Arco da Viagem / Trajetória Animada */}
          <div className="md:col-span-5 flex flex-col items-center justify-center py-4 px-2">
            <div className="w-full relative flex flex-col items-center">
              {/* Badge de distância */}
              <div className="mb-2 px-3 py-1 rounded-full bg-[#3c172e]/90 border border-[#782f55]/60 text-[#f5bfd5] text-[11px] font-mono tracking-wider flex items-center gap-1.5 shadow-md">
                <Compass className="w-3 h-3 text-[#f085a5]" />
                <span>~8.150 km de distância</span>
              </div>

              {/* Rota SVG Animada com Avião */}
              <div className="w-full h-20 relative flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80" preserveAspectRatio="none">
                  {/* Linha de fundo */}
                  <path
                    d="M 10,70 Q 150,-20 290,70"
                    fill="none"
                    stroke="#3e1b33"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Linha pontilhada animada de voo */}
                  <path
                    d="M 10,70 Q 150,-20 290,70"
                    fill="none"
                    stroke="#e65c83"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                    className="animate-flight-path"
                  />
                </svg>

                {/* Ícone do Avião posicionado no arco */}
                <div className="absolute top-1 animate-float-slow">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#8b2650] to-[#b5346a] flex items-center justify-center shadow-lg shadow-[#b5346a]/30 border border-[#f5bfd5]/40 text-white transform -rotate-12">
                    <Plane className="w-4 h-4 fill-white" />
                  </div>
                </div>
              </div>

              {/* Status do Voo do Coração */}
              <div className="mt-1 text-center">
                <span className="text-[11px] font-sans text-[#cda4be] tracking-wide block">
                  Destino Traçado • Voo LC-2410
                </span>
                <span className="text-xs text-[#fca9c4] font-serif font-medium">
                  24 de Outubro de 2026 • 09:19h
                </span>
              </div>
            </div>
          </div>

          {/* Destino: Canadá (Dai) */}
          <div className="md:col-span-3 p-5 rounded-2xl bg-[#281324]/80 border border-[#582749]/50 text-center relative group transition-all duration-300 hover:border-[#833860]">
            <div className="text-4xl sm:text-5xl mb-2" role="img" aria-label="Bandeira do Canadá">
              🇨🇦
            </div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-white mb-0.5">
              Canadá
            </div>
            <div className="text-xs text-[#e592b0] font-medium tracking-wide">
              Onde {config.recipientNickname} ilumina o mundo
            </div>
            <div className="mt-3 text-[11px] font-mono text-[#a58197] bg-[#1d0e1b] py-1 px-2.5 rounded-lg inline-block border border-[#3e1b34]">
              LAT: 43.65° • LON: -79.38°
            </div>
            <div className="mt-2 text-xs text-[#d1adc1] italic">
              "Onde meu coração já está."
            </div>
          </div>
        </div>

        {/* Botão Interativo: Mandar Abraço */}
        <div className="mt-8 pt-6 border-t border-[#3b1c31]/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#caa1b7] text-center sm:text-left font-light">
            Quando a saudade apertar aí no Canadá, lembre-se: estamos sob o mesmo céu.
          </p>
          <button
            id="send-hug-btn"
            onClick={handleSendHug}
            className={`px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md ${
              hugSent
                ? 'bg-[#3b1b2d] border border-[#a13f6b] text-[#fca9c4] scale-95'
                : 'bg-gradient-to-r from-[#912852] to-[#6d1b3c] hover:from-[#ab3162] hover:to-[#7f2047] text-white border border-[#d66a93]/40'
            }`}
          >
            {hugSent ? (
              <>
                <Heart className="w-4 h-4 fill-[#fca9c4] text-[#fca9c4] animate-ping" />
                <span>Abraço enviado até o Canadá!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#ffd0df]" />
                <span>Mandar um abraço pro Canadá</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
