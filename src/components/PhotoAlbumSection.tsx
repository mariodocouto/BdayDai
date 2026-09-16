import React, { useState } from 'react';
import { Heart, Camera, ZoomIn, Sparkles } from 'lucide-react';
import { PhotoMemory } from '../config';
import { PhotoModal } from './PhotoModal';

interface PhotoAlbumSectionProps {
  photos: PhotoMemory[];
  onUploadPhotosClick?: () => void;
}

export const PhotoAlbumSection: React.FC<PhotoAlbumSectionProps> = ({ photos, onUploadPhotosClick }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);

  // Variações sutis de rotação para parecer um mural de polaroids autêntico
  const rotations = [
    '-rotate-1',
    'rotate-2',
    '-rotate-2',
    'rotate-1',
    '-rotate-1',
    'rotate-2',
    '-rotate-2',
    'rotate-1',
    '-rotate-1',
    'rotate-2',
    '-rotate-2',
    'rotate-1',
  ];

  return (
    <section id="memories" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-radial from-[#571d3a]/15 via-transparent to-transparent blur-3xl pointer-events-none"></div>

      {/* Introdução Narrativa */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#271322]/80 border border-[#5a2745]/50 text-[#e4a4bd] text-xs uppercase tracking-widest mb-3">
          <Camera className="w-3.5 h-3.5 text-[#e5779a]" />
          <span>Álbum de Lembranças • 12 Momentos</span>
        </div>
        
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-white font-bold tracking-tight mb-4">
          “Enquanto a gente espera o próximo capítulo...”
        </h2>
        
        <p className="text-sm sm:text-base text-[#d8b5c9] font-light leading-relaxed font-sans max-w-xl mx-auto">
          Cada foto guarda um pedaço do nosso amor que nem mesmo o fuso do Canadá consegue apagar. Toque em qualquer foto para ver de perto.
        </p>
      </div>

      {/* Grid Scrapbook Editorial dos 12 Espaços de Fotos */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {photos.map((photo, index) => {
          const rotationClass = rotations[index % rotations.length];
          const photoNumber = `FOTO ${(index + 1).toString().padStart(2, '0')}`;

          return (
            <div
              key={photo.id}
              className={`group relative transition-all duration-300 transform hover:-translate-y-2 hover:rotate-0 hover:z-20 cursor-pointer ${rotationClass}`}
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Estilo Moldura Polaroid / Cartão de Lembrança */}
              <div className="p-3 sm:p-4 rounded-2xl bg-[#1f101d] border border-[#4d213f]/60 group-hover:border-[#963765]/80 shadow-xl shadow-black/40 transition-all duration-300">
                {/* Tag de identificação FOTO 01 .. 12 */}
                <div className="flex items-center justify-between text-[10px] font-mono text-[#a88299] mb-2 px-1">
                  <span className="bg-[#2d1425] px-2 py-0.5 rounded text-[#fca9c4] font-semibold tracking-wider">
                    {photoNumber}
                  </span>
                  <span className="flex items-center gap-1 text-[#cca7be]">
                    <Sparkles className="w-3 h-3 text-[#e65c83]" />
                    {photo.note}
                  </span>
                </div>

                {/* Imagem */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#110810]">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Overlay sutil ao passar o mouse */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b0816]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="inline-flex items-center gap-1 text-xs text-white bg-[#5e203f]/90 px-3 py-1.5 rounded-full backdrop-blur-sm border border-[#a13f6b]/50">
                      <ZoomIn className="w-3.5 h-3.5 text-[#fca9c4]" />
                      <span>Ver de pertinho</span>
                    </span>
                  </div>
                </div>

                {/* Legenda de Álbum */}
                <div className="mt-3.5 px-1">
                  <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#fca9c4] transition-colors line-clamp-1">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-[#caa1b7] font-light font-sans mt-1 line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conclusão Narrativa do Álbum */}
      <div className="relative z-10 text-center mt-16 max-w-xl mx-auto">
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#8b3259] to-transparent mx-auto mb-6"></div>
        <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#f8cbdc] drop-shadow-sm">
          “...eu volto para todos os capítulos que já vivemos.”
        </p>
        <p className="text-xs sm:text-sm text-[#b891a8] mt-3 font-sans font-light">
          E sei que o próximo capítulo, ao seu lado no Canadá, será o mais lindo de todos.
        </p>
      </div>

      {/* Modal de Foto Aberta */}
      <PhotoModal
        photo={selectedPhoto}
        allPhotos={photos}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={(p) => setSelectedPhoto(p)}
      />
    </section>
  );
};
