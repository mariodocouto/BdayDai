import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Sparkles, ZoomIn, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { PhotoMemory } from '../config';
import { PhotoModal } from './PhotoModal';

interface Step4PhotoAlbumProps {
  photos: PhotoMemory[];
  onOpenOrganizer: () => void;
  onNextClick: () => void;
}

export const Step4PhotoAlbum: React.FC<Step4PhotoAlbumProps> = ({
  photos,
  onOpenOrganizer,
  onNextClick,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);

  // Ordena as fotos pela ordem lógica definida
  const sortedPhotos = [...photos].sort((a, b) => (a.order ?? a.id) - (b.order ?? b.id));

  return (
    <section
      id="step-4"
      className="min-h-screen bg-white py-24 px-4 sm:px-6 flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-rose-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-12">
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs uppercase tracking-widest font-semibold">
            <Camera className="w-3.5 h-3.5 text-rose-600" />
            <span>Capítulo 03 • Álbum de Memórias</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-rose-950 font-bold tracking-tight">
            Nossos Momentos Vividos
          </h2>

          <p className="text-base sm:text-lg text-rose-700 font-serif italic max-w-xl mx-auto">
            “Guardei cada pedacinho nosso em ordem no coração. Toque em qualquer foto para ver de pertinho.”
          </p>

          {/* Botão de Organizar Fotos discreto e amigável para Lucas */}
          <div className="pt-2">
            <button
              onClick={onOpenOrganizer}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-medium border border-rose-200 transition-all shadow-sm cursor-pointer hover:border-rose-300"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-rose-600" />
              <span>Organizar ordem lógica das fotos / Trocar fotos</span>
            </button>
          </div>
        </div>

        {/* Grid dos 12 Momentos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sortedPhotos.map((photo, index) => {
            const momentOrder = (index + 1).toString().padStart(2, '0');
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="p-4 rounded-3xl bg-rose-50/70 hover:bg-rose-100/70 border border-rose-100 hover:border-rose-300 shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1.5">
                  {/* Tag do momento */}
                  <div className="flex items-center justify-between text-xs text-rose-700 mb-2.5 px-1">
                    <span className="bg-rose-200/70 text-rose-900 font-bold px-2.5 py-0.5 rounded-full text-[11px] tracking-wider">
                      MOMENTO {momentOrder}
                    </span>
                    <span className="flex items-center gap-1 text-rose-600 text-xs font-sans">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {photo.note}
                    </span>
                  </div>

                  {/* Foto com moldura romântica */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-rose-100/50 shadow-inner">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Overlay de clique */}
                    <div className="absolute inset-0 bg-rose-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 text-xs text-white bg-rose-700/90 px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                        <ZoomIn size={14} />
                        <span>Ver ampliado</span>
                      </span>
                    </div>
                  </div>

                  {/* Legenda */}
                  <div className="mt-4 px-1 text-left">
                    <h3 className="font-serif text-lg font-bold text-rose-950 group-hover:text-rose-700 transition-colors line-clamp-1">
                      {photo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-rose-700 font-sans mt-1 line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Botão de Avanço estilo "clicar e andar" */}
        <div className="text-center pt-8">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onNextClick}
            className="px-8 sm:px-12 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-medium text-base sm:text-lg shadow-xl hover:shadow-rose-600/20 transition-all inline-flex items-center gap-3 group cursor-pointer"
          >
            <span>Chegamos ao motivo mais especial de hoje...</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Modal Lightbox de Foto */}
      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}
    </section>
  );
};
