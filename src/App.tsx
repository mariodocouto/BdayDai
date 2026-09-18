import React, { useState, useEffect } from 'react';
import { siteConfig, SiteConfig } from './config';
import { calculateCountdown, CountdownState } from './utils/countdown';
import { ambientPlayer } from './utils/audio';
import { FloatingHeartsBackground } from './components/FloatingHeartsBackground';
import { StoryWalkHeader } from './components/StoryWalkHeader';
import { Step1Intro } from './components/Step1Intro';
import { Step2Timeline } from './components/Step2Timeline';
import { Step3LivingMoments } from './components/Step3LivingMoments';
import { Step4PhotoAlbum } from './components/Step4PhotoAlbum';
import { Step5BirthdayCelebration } from './components/Step5BirthdayCelebration';
import { Step6Reunion } from './components/Step6Reunion';
import { ConfigModal } from './components/ConfigModal';

const LOCAL_STORAGE_KEY = 'lucas_dai_gift_config_v2';

export default function App() {
  // Carrega configuração customizada do localStorage se houver
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load stored config:', e);
    }
    return siteConfig;
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isSimulatedReunion, setIsSimulatedReunion] = useState(false);

  // Contagem regressiva em tempo real até 24.10.2026 às 09:19h
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

  // Rastreia qual seção está em visualização para atualizar a barra superior dinamicamente
  useEffect(() => {
    const handleScroll = () => {
      const steps = [1, 2, 3, 4, 5, 6];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = steps.length - 1; i >= 0; i--) {
        const stepNum = steps[i];
        const el = document.getElementById(`step-${stepNum}`);
        if (el && el.offsetTop <= scrollPos) {
          setCurrentStep(stepNum);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToStep = (stepNum: number) => {
    setCurrentStep(stepNum);
    const targetElement = document.getElementById(`step-${stepNum}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartStory = () => {
    // Inicia a melodia romântica suave se ainda não estiver tocando
    if (!isPlayingSound) {
      ambientPlayer.play(config.audio.customAudioUrl);
      setIsPlayingSound(true);
    }
    goToStep(2);
  };

  const handleToggleSound = () => {
    const newState = ambientPlayer.togglePlay(config.audio.customAudioUrl);
    setIsPlayingSound(newState);
  };

  const handleUpdateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  };

  const handleResetConfig = () => {
    setConfig(siteConfig);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn('Could not remove from localStorage:', e);
    }
    setIsSimulatedReunion(false);
  };

  return (
    <div className="relative min-h-screen bg-rose-50/20 text-rose-950 font-sans selection:bg-rose-200 selection:text-rose-900">
      {/* Fundo com corações flutuantes suaves em toda a tela */}
      <FloatingHeartsBackground />

      {/* Barra de Progresso e Navegação dos Passos */}
      <StoryWalkHeader
        currentStep={currentStep}
        totalSteps={6}
        onSelectStep={goToStep}
        isPlayingSound={isPlayingSound}
        onToggleSound={handleToggleSound}
        onOpenConfig={() => setIsConfigOpen(true)}
      />

      {/* Conteúdo Narrativo Passo a Passo ("Clicar e Andar") */}
      <main className="relative z-10 pt-14">
        {/* Passo 1: Abertura ("Hoje é um dia muito especial...") */}
        <Step1Intro
          config={config}
          onStartClick={handleStartStory}
        />

        {/* Passo 2: O Início ("Desde que a gente se conheceu em 21/03/2026...") */}
        <Step2Timeline
          config={config}
          onNextClick={() => goToStep(3)}
        />

        {/* Passo 3: Nossa História ("Foram momentos, vivendo, rindo e sonhando...") */}
        <Step3LivingMoments
          config={config}
          onNextClick={() => goToStep(4)}
        />

        {/* Passo 4: Álbum de Fotos em Ordem Lógica (1..12 com opção de reordenar para Lucas) */}
        <Step4PhotoAlbum
          photos={config.photos}
          onOpenOrganizer={() => setIsConfigOpen(true)}
          onNextClick={() => goToStep(5)}
        />

        {/* Passo 5: O Clímax do Aniversário ("FELIZ ANIVERSÁRIO, DAI! 🎉🎂" com Foto de Casal) */}
        <Step5BirthdayCelebration
          config={config}
          onNextClick={() => goToStep(6)}
        />

        {/* Passo 6: O Futuro e Reencontro ("Em breve a gente está junto... 24/10/2026") */}
        <Step6Reunion
          config={config}
          countdown={countdown}
        />
      </main>

      {/* Modal de Personalização e Ajustes para Lucas */}
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
