import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { ambientPlayer } from '../utils/audio';

interface AudioPlayerButtonProps {
  customAudioUrl?: string;
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({ customAudioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleSound = () => {
    setHasInteracted(true);
    const newState = ambientPlayer.togglePlay(customAudioUrl);
    setIsPlaying(newState);
  };

  useEffect(() => {
    return () => {
      ambientPlayer.stop();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {!hasInteracted && !isPlaying && (
        <div className="hidden sm:flex items-center gap-2 bg-[#251520]/90 backdrop-blur-md border border-[#8b4566]/40 text-[#f5e6eb] px-3 py-1.5 rounded-full text-xs animate-bounce shadow-lg">
          <Music className="w-3.5 h-3.5 text-[#e890a5]" />
          <span>Trilha sonora suave</span>
        </div>
      )}

      <button
        id="audio-toggle-btn"
        onClick={toggleSound}
        aria-label={isPlaying ? "Pausar música ambiente" : "Tocar música ambiente"}
        className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-xl cursor-pointer ${
          isPlaying
            ? 'bg-[#4a1c31]/80 border-[#d47094]/60 text-white shadow-[#a63462]/20'
            : 'bg-[#1e131d]/85 border-[#4e273f]/50 text-[#e4c9d5] hover:bg-[#2e1a2b] hover:border-[#833f63]/60'
        }`}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-[#f7a4be] animate-pulse" />
            <span className="text-xs font-medium tracking-wide">Melodia para Dai</span>
            {/* Visualizer bars */}
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 bg-[#f7a4be] rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-2"></span>
              <span className="w-0.5 bg-[#f7a4be] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.2s] h-3"></span>
              <span className="w-0.5 bg-[#f7a4be] rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.4s] h-1.5"></span>
            </div>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#c79bb2] group-hover:text-white transition-colors" />
            <span className="text-xs font-medium tracking-wide text-[#d6b7c7] group-hover:text-white">Ouvir melodia</span>
          </>
        )}
      </button>
    </div>
  );
};
