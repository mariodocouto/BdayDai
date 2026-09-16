import React, { useState } from 'react';
import { X, Settings, Image as ImageIcon, Ticket, RotateCcw, Check, Sparkles, Upload } from 'lucide-react';
import { SiteConfig, PhotoMemory } from '../config';

interface ConfigModalProps {
  config: SiteConfig;
  isOpen: boolean;
  onClose: () => void;
  onUpdateConfig: (newConfig: SiteConfig) => void;
  onResetConfig: () => void;
  onSimulateReunionToggle: () => void;
  isSimulatedReunion: boolean;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  config,
  isOpen,
  onClose,
  onUpdateConfig,
  onResetConfig,
  onSimulateReunionToggle,
  isSimulatedReunion,
}) => {
  const [activeTab, setActiveTab] = useState<'photos' | 'ticket' | 'texts' | 'preview'>('photos');
  const [editingConfig, setEditingConfig] = useState<SiteConfig>(config);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePhotoUrlChange = (photoId: number, newUrl: string) => {
    const updatedPhotos = editingConfig.photos.map((p) =>
      p.id === photoId ? { ...p, url: newUrl } : p
    );
    setEditingConfig({ ...editingConfig, photos: updatedPhotos });
  };

  const handlePhotoTitleChange = (photoId: number, newTitle: string) => {
    const updatedPhotos = editingConfig.photos.map((p) =>
      p.id === photoId ? { ...p, title: newTitle } : p
    );
    setEditingConfig({ ...editingConfig, photos: updatedPhotos });
  };

  const handleFileUpload = (photoId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handlePhotoUrlChange(photoId, event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTicketUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditingConfig({
            ...editingConfig,
            flightTicket: {
              ...editingConfig.flightTicket,
              ticketImageUrl: event.target.result as string,
            },
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdateConfig(editingConfig);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative max-w-3xl w-full bg-[#1b0e1b] border border-[#6b2a52] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#3b1731] flex items-center justify-between bg-[#231123]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#461734] flex items-center justify-center text-[#fca9c4]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Personalizar Presente da Dai
              </h3>
              <p className="text-xs text-[#b88fa8]">
                Adicione suas 12 fotos reais, imagem da passagem e ajustes rápidos
              </p>
            </div>
          </div>
          <button
            id="close-config-modal-btn"
            onClick={onClose}
            aria-label="Fechar configurações"
            className="w-9 h-9 rounded-full bg-[#2d1427] hover:bg-[#4d1f3e] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas */}
        <div className="flex border-b border-[#3b1731] bg-[#160a16] text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-[#251224] text-[#fca9c4] border-b-2 border-[#e65c83]'
                : 'text-[#9c778f] hover:text-[#e5bfd3]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>12 Fotos do Casal</span>
          </button>

          <button
            onClick={() => setActiveTab('ticket')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'ticket'
                ? 'bg-[#251224] text-[#fca9c4] border-b-2 border-[#e65c83]'
                : 'text-[#9c778f] hover:text-[#e5bfd3]'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>Passagem Aérea</span>
          </button>

          <button
            onClick={() => setActiveTab('texts')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'texts'
                ? 'bg-[#251224] text-[#fca9c4] border-b-2 border-[#e65c83]'
                : 'text-[#9c778f] hover:text-[#e5bfd3]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Nomes & Datas</span>
          </button>
        </div>

        {/* Conteúdo da Aba */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* ABA FOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#281324] border border-[#522241] text-xs text-[#d8b5c9]">
                💡 <strong>Dica para Lucas:</strong> Você pode clicar no botão <strong>Upload Foto</strong> para selecionar a foto direto do seu celular/computador, ou colar o link de uma imagem. O site salva automaticamente no navegador.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {editingConfig.photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="p-3.5 rounded-2xl bg-[#20101f] border border-[#3f1c35] flex items-center gap-3.5"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-[#522241]">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-[#fca9c4] font-bold">
                          FOTO {(index + 1).toString().padStart(2, '0')}
                        </span>
                        <label className="text-[10px] bg-[#421934] hover:bg-[#62214b] text-white px-2 py-1 rounded cursor-pointer transition-colors flex items-center gap-1">
                          <Upload className="w-2.5 h-2.5" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(photo.id, e)}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={photo.title}
                        onChange={(e) => handlePhotoTitleChange(photo.id, e.target.value)}
                        placeholder="Título da lembrança"
                        className="w-full text-xs bg-[#160a16] border border-[#3f1c35] rounded px-2 py-1 text-white focus:outline-none focus:border-[#a13f6b]"
                      />
                      <input
                        type="text"
                        value={photo.url}
                        onChange={(e) => handlePhotoUrlChange(photo.id, e.target.value)}
                        placeholder="URL da foto"
                        className="w-full text-[10px] bg-[#160a16] border border-[#3f1c35] rounded px-2 py-0.5 text-[#caa1b7] mt-1 focus:outline-none focus:border-[#a13f6b]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA PASSAGEM */}
          {activeTab === 'ticket' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-[#281324] border border-[#522241] text-[#d8b5c9]">
                Envie aqui a foto real da sua passagem aérea ou comprovante da viagem para o Canadá.
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-[#20101f] border border-[#3f1c35]">
                <div className="w-48 h-32 rounded-xl bg-black overflow-hidden border border-[#522241] flex items-center justify-center shrink-0">
                  {editingConfig.flightTicket.ticketImageUrl ? (
                    <img
                      src={editingConfig.flightTicket.ticketImageUrl}
                      alt="Passagem"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-2 text-[#8c6780] text-xs">
                      Nenhuma foto enviada ainda
                    </div>
                  )}
                </div>

                <div className="space-y-3 flex-1 w-full">
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#611e40] hover:bg-[#7e2553] text-white cursor-pointer font-medium text-xs transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Carregar Foto da Passagem</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleTicketUpload}
                    />
                  </label>

                  <div>
                    <label className="text-xs text-[#a88299] block mb-1">
                      Ou cole o link direto da imagem:
                    </label>
                    <input
                      type="text"
                      value={editingConfig.flightTicket.ticketImageUrl}
                      onChange={(e) =>
                        setEditingConfig({
                          ...editingConfig,
                          flightTicket: {
                            ...editingConfig.flightTicket,
                            ticketImageUrl: e.target.value,
                          },
                        })
                      }
                      placeholder="https://..."
                      className="w-full text-xs bg-[#160a16] border border-[#3f1c35] rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA NOMES & DATAS */}
          {activeTab === 'texts' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#a88299] block mb-1">Nome da Namorada:</label>
                  <input
                    type="text"
                    value={editingConfig.recipientName}
                    onChange={(e) =>
                      setEditingConfig({ ...editingConfig, recipientName: e.target.value })
                    }
                    className="w-full bg-[#160a16] border border-[#3f1c35] rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#a88299] block mb-1">Apelido Carinhoso:</label>
                  <input
                    type="text"
                    value={editingConfig.recipientNickname}
                    onChange={(e) =>
                      setEditingConfig({ ...editingConfig, recipientNickname: e.target.value })
                    }
                    className="w-full bg-[#160a16] border border-[#3f1c35] rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#3b1731]">
                <label className="text-xs text-[#a88299] block mb-1">
                  Testar Modo "Chegou a Hora!" (Simulação do Reencontro):
                </label>
                <button
                  type="button"
                  onClick={onSimulateReunionToggle}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    isSimulatedReunion
                      ? 'bg-[#e65c83] text-white'
                      : 'bg-[#2c1324] border border-[#5d2749] text-[#fca9c4]'
                  }`}
                >
                  {isSimulatedReunion
                    ? '✓ Modo Reencontro Ativado (Contador Zerado)'
                    : 'Simular momento exato do reencontro'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#3b1731] bg-[#231123] flex flex-wrap items-center justify-between gap-3">
          <button
            id="reset-config-btn"
            onClick={onResetConfig}
            className="flex items-center gap-1.5 text-xs text-[#a88299] hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              id="cancel-config-btn"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-[#caa1b7] hover:text-white transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              id="save-config-btn"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#942a57] to-[#711e40] hover:from-[#aa3265] hover:to-[#83234b] text-white text-xs font-medium flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Salvo!</span>
                </>
              ) : (
                <span>Salvar Alterações</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
