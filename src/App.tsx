import React, { useState, useEffect, useRef } from 'react';
import { siteConfig, SiteConfig } from './config';
import { calculateCountdown, CountdownState } from './utils/countdown';
import { AudioPlayerButton } from './components/AudioPlayerButton';
import { HeroSection } from './components/HeroSection';
import { MilestoneCelebration } from './components/MilestoneCelebration';
import { DistanceMapSection } from './components/DistanceMapSection';
import { PhotoAlbumSection } from './components/PhotoAlbumSection';
import { FlightTicketSection } from './components/FlightTicketSection';
import { LoveLetterSection } from './components/LoveLetterSection';
import { FinalCountdownSection } from './components/FinalCountdownSection';
import { ConfigModal } from './components/ConfigModal';
import { triggerRomanticHearts } from './utils/confetti';
import { Settings, Heart } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'lucas_dai_gift_config_v1';

export default function App() {
  // Carrega configuração customizada do localStorage se houver
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not load stored config:", e);
    }
    return siteConfig;
  });

  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isSimulatedReunion, setIsSimulatedReunion] = useState(false);

  // Contagem regressiva em tempo real
  const [countdown, setCountdown] = useState<CountdownState>(() =>
    calculateCountdown(config.reunion.targetEpochMs)
  );

  useEffect(() => {
    const updateCountdown = () => {
      if (isSimulatedReunion) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalMs: 0,
          isReached: true,
          totalHoursRemaining: 0,
          totalSecondsRemaining: 0,
          percentageElapsed: 100,
        });
      } else {
        setCountdown(calculateCountdown(config.reunion.targetEpochMs));
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [config.reunion.targetEpochMs, isSimulatedReunion]);

  const handleUpdateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  };

  const handleResetConfig = () => {
    setConfig(siteConfig);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn("Could not remove from localStorage:", e);
    }
    setIsSimulatedReunion(false);
  };

  const scrollToStory = () => {
    const el = document.getElementById('milestones');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#120a13] text-[#f4efe8] selection:bg-[#99334d] selection:text-white">
      {/* Botão de Configurações Discreto para Lucas no Canto Superior */}
      <div className="fixed top-4 right-4 z-40">
        <button
          id="open-config-modal-btn"
          onClick={() => setIsConfigOpen(true)}
          aria-label="Abrir painel de personalização"
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#200f1e]/70 hover:bg-[#341731] border border-[#522143]/50 text-[#caa1b7] hover:text-[#ffd2e2] text-xs backdrop-blur-md transition-all shadow-md cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5 text-[#e65c83] group-hover:rotate-45 transition-transform" />
          <span className="hidden sm:inline font-sans text-[11px]">Personalizar Presente</span>
        </button>
      </div>

      {/* Seção 1: Hero de Impacto com Countdown e Fusos */}
      <HeroSection
        countdown={countdown}
        config={config}
        onExploreClick={scrollToStory}
      />

      {/* Seção 2: Marco Emocional (Aniversário da Dai + 6 Meses desde 21.03.2026) */}
      <MilestoneCelebration
        config={config}
        countdown={countdown}
      />

      {/* Seção 3: História da Distância (Brasil 🇧🇷 ➔ Canadá 🇨🇦, 8.150 km) */}
      <DistanceMapSection
        config={config}
      />

      {/* Seção 4: O Álbum de 12 Fotografias e Lembranças */}
      <PhotoAlbumSection
        photos={config.photos}
        onUploadPhotosClick={() => setIsConfigOpen(true)}
      />

      {/* Seção 5: A Passagem Aérea para o Canadá */}
      <FlightTicketSection
        config={config}
      />

      {/* Seção 6: Carta Digital de Lucas para Dai */}
      <LoveLetterSection
        config={config}
      />

      {/* Seção 7: Conclusão, Countdown Final e Revelação Especial */}
      <FinalCountdownSection
        countdown={countdown}
        config={config}
      />

      {/* Player de Trilha Sonora Flutuante */}
      <AudioPlayerButton
        customAudioUrl={config.audio.customAudioUrl}
      />

      {/* Modal de Personalização (Lucas pode substituir fotos e passagem) */}
      <ConfigModal
        config={config}
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onUpdateConfig={handleUpdateConfig}
        onResetConfig={handleResetConfig}
        onSimulateReunionToggle={() => setIsSimulatedReunion(!isSimulatedReunion)}
        isSimulatedReunion={isSimulatedReunion}
      />
    </div>
  );
}
