import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import { PhotoMemory } from '../config';

interface PhotoModalProps {
  photo: PhotoMemory | null;
  allPhotos?: PhotoMemory[];
  onClose: () => void;
  onSelectPhoto?: (photo: PhotoMemory) => void;
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
      if (e.key === 'ArrowRight' && allPhotos && onSelectPhoto) handleNext();
      if (e.key === 'ArrowLeft' && allPhotos && onSelectPhoto) handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, allPhotos, onSelectPhoto]);

  if (!photo) return null;

  const currentIndex = allPhotos ? allPhotos.findIndex((p) => p.id === photo.id) : 0;
  const handlePrev = () => {
    if (!allPhotos || !onSelectPhoto) return;
    const prevIndex = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
    onSelectPhoto(allPhotos[prevIndex]);
  };
  const handleNext = () => {
    if (!allPhotos || !onSelectPhoto) return;
    const nextIndex = (currentIndex + 1) % allPhotos.length;
    onSelectPhoto(allPhotos[nextIndex]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white border border-rose-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button
          id="close-photo-modal-btn"
          onClick={onClose}
          aria-label="Fechar visualização de foto"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 text-rose-700 hover:bg-rose-100 flex items-center justify-center transition-colors cursor-pointer border border-rose-200 shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Botões de Navegação se allPhotos existir */}
        {allPhotos && allPhotos.length > 1 && (
          <>
            <button
              id="prev-photo-btn"
              onClick={handlePrev}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 text-rose-700 hover:bg-rose-100 flex items-center justify-center transition-colors cursor-pointer border border-rose-200 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="next-photo-btn"
              onClick={handleNext}
              aria-label="Próxima foto"
              className="absolute right-3 md:right-[340px] top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 text-rose-700 hover:bg-rose-100 flex items-center justify-center transition-colors cursor-pointer border border-rose-200 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Área da Imagem */}
        <div className="relative flex-1 bg-rose-50/50 flex items-center justify-center overflow-hidden min-h-[280px] md:min-h-[480px]">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-full object-contain max-h-[55vh] md:max-h-[82vh] p-4 select-none"
            loading="lazy"
          />
          {/* Badge da Foto */}
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/95 border border-rose-200 text-[11px] font-mono font-bold text-rose-900 shadow-sm">
            MOMENTO {(photo.order ?? photo.id).toString().padStart(2, '0')}
          </div>
        </div>

        {/* Detalhes Emocionais da Memória */}
        <div className="w-full md:w-80 p-6 md:p-8 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-rose-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-widest text-rose-600 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{photo.note}</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-rose-950 mb-3">
              {photo.title}
            </h3>
            <p className="text-sm text-rose-800 font-sans leading-relaxed mb-4">
              {photo.caption}
            </p>
          </div>

          <div className="pt-6 border-t border-rose-100">
            <p className="text-xs text-rose-600 italic font-serif leading-relaxed">
              “Cada lembrança com você é uma certeza a mais de que o tempo longe vale cada segundo de espera.”
            </p>
            <div className="mt-4 flex items-center justify-between text-[11px] text-rose-400 font-mono">
              <span>Lucas & Dai</span>
              <span>24.10.2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
