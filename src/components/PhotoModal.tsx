import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { PhotoMemory } from '../config';

interface PhotoModalProps {
  photo: PhotoMemory | null;
  allPhotos: PhotoMemory[];
  onClose: () => void;
  onSelectPhoto: (photo: PhotoMemory) => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  photo,
  allPhotos,
  onClose,
  onSelectPhoto,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo]);

  if (!photo) return null;

  const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
    onSelectPhoto(allPhotos[prevIndex]);
  };
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allPhotos.length;
    onSelectPhoto(allPhotos[nextIndex]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0509]/95 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-[#1b0e1a] border border-[#5d2a4a]/70 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button
          id="close-photo-modal-btn"
          onClick={onClose}
          aria-label="Fechar visualização de foto"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#2a1324]/80 text-white hover:bg-[#4d1f3e] flex items-center justify-center transition-colors cursor-pointer border border-[#6b2a50]/50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Botões de Navegação */}
        <button
          id="prev-photo-btn"
          onClick={handlePrev}
          aria-label="Foto anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#2a1324]/80 text-white hover:bg-[#4d1f3e] flex items-center justify-center transition-colors cursor-pointer border border-[#6b2a50]/50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          id="next-photo-btn"
          onClick={handleNext}
          aria-label="Próxima foto"
          className="absolute right-3 md:right-[380px] top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#2a1324]/80 text-white hover:bg-[#4d1f3e] flex items-center justify-center transition-colors cursor-pointer border border-[#6b2a50]/50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Área da Imagem */}
        <div className="relative flex-1 bg-[#0f070e] flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[500px]">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-full object-contain max-h-[60vh] md:max-h-[85vh] p-2 select-none"
            loading="lazy"
          />
          {/* Badge da Foto */}
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-[#1b0e1a]/90 border border-[#522342] text-[11px] font-mono text-[#fca9c4]">
            FOTO {photo.id.toString().padStart(2, '0')} DE 12
          </div>
        </div>

        {/* Detalhes Emocionais da Memória */}
        <div className="w-full md:w-80 p-6 md:p-8 flex flex-col justify-between bg-[#190c18] border-t md:border-t-0 md:border-l border-[#3e1b34]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#caa0b8] mb-2">
              <Heart className="w-3.5 h-3.5 text-[#e65c83] fill-[#e65c83]" />
              <span>{photo.note}</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-3">
              {photo.title}
            </h3>
            <p className="text-sm text-[#d8b5c9] font-light leading-relaxed font-sans mb-4">
              {photo.caption}
            </p>
          </div>

          <div className="pt-6 border-t border-[#34172b]">
            <p className="text-xs text-[#a88299] italic font-serif">
              "Cada lembrança com você é uma certeza a mais de que o tempo longe vale cada segundo de espera."
            </p>
            <div className="mt-4 flex items-center justify-between text-[11px] text-[#7d566f] font-mono">
              <span>Lucas & Dai</span>
              <span>24.10.2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
