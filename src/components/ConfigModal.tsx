import React, { useState } from 'react';
import {
  X,
  Settings,
  Image as ImageIcon,
  Ticket,
  RotateCcw,
  Check,
  Sparkles,
  Upload,
  ArrowUp,
  ArrowDown,
  Gift,
  FileText,
  Heart,
} from 'lucide-react';
import { SiteConfig, PhotoMemory } from '../config';
import { triggerBirthdayBlast } from '../utils/confetti';

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
  const [activeTab, setActiveTab] = useState<'photos' | 'couple' | 'ticket' | 'texts' | 'actions'>('photos');
  const [editingConfig, setEditingConfig] = useState<SiteConfig>(config);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  // Move photo up in chronological order
  const handleMovePhoto = (currentIndex: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= editingConfig.photos.length) return;

    const newPhotos = [...editingConfig.photos];
    const temp = newPhotos[currentIndex];
    newPhotos[currentIndex] = newPhotos[targetIndex];
    newPhotos[targetIndex] = temp;

    // Atualiza os números de ordem
    const updatedWithOrder = newPhotos.map((p, idx) => ({
      ...p,
      order: idx + 1,
    }));

    setEditingConfig({
      ...editingConfig,
      photos: updatedWithOrder,
    });
  };

  const handlePhotoChange = (index: number, field: keyof PhotoMemory, value: string) => {
    const newPhotos = [...editingConfig.photos];
    newPhotos[index] = { ...newPhotos[index], [field]: value };
    setEditingConfig({ ...editingConfig, photos: newPhotos });
  };

  const handleFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handlePhotoChange(index, 'url', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCouplePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditingConfig({
            ...editingConfig,
            birthdayCouplePhoto: event.target.result as string,
          });
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
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm">
      <div className="relative max-w-3xl w-full bg-white border border-rose-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-rose-100 flex items-center justify-between bg-rose-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-rose-950">
                Personalizar Presente da Dai
              </h3>
              <p className="text-xs text-rose-600">
                Altere a ordem lógica das fotos, troque fotos, passagem e textos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-rose-400 hover:text-rose-700 hover:bg-rose-100/70 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-rose-100 bg-rose-50/30 overflow-x-auto text-xs font-semibold scrollbar-none px-4 pt-2">
          {[
            { id: 'photos', label: '12 Fotos & Ordem Lógica', icon: ImageIcon },
            { id: 'couple', label: 'Foto de Casal (Aniversário)', icon: Heart },
            { id: 'ticket', label: 'Passagem Aérea', icon: Ticket },
            { id: 'texts', label: 'Textos & Homenagem', icon: FileText },
            { id: 'actions', label: 'Testes & Reset', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 px-4 py-3 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-rose-600 text-rose-700 bg-white rounded-t-xl font-bold'
                    : 'border-transparent text-rose-600/70 hover:text-rose-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: 12 FOTOS & ORDEM LÓGICA */}
          {activeTab === 'photos' && (
            <div className="space-y-4">
              <div className="bg-rose-50 p-3.5 rounded-2xl border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p>
                  <strong>Dica do Lucas:</strong> Use os botões <strong>Subir (▲)</strong> e{' '}
                  <strong>Descer (▼)</strong> para definir a ordem cronológica e lógica exata dos momentos de vocês!
                </p>
              </div>

              <div className="space-y-4">
                {editingConfig.photos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    className="p-4 rounded-2xl bg-white border border-rose-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center"
                  >
                    {/* Controles de Ordem e Preview */}
                    <div className="flex sm:flex-col items-center gap-2">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMovePhoto(idx, 'up')}
                        title="Mover para antes"
                        className="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                      >
                        <ArrowUp size={16} />
                      </button>
                      <span className="text-xs font-mono font-bold text-rose-900 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        #{(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <button
                        type="button"
                        disabled={idx === editingConfig.photos.length - 1}
                        onClick={() => handleMovePhoto(idx, 'down')}
                        title="Mover para depois"
                        className="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                      >
                        <ArrowDown size={16} />
                      </button>
                    </div>

                    {/* Imagem Thumbnail */}
                    <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-rose-100 border border-rose-200 relative">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Inputs de Título, Legenda e Imagem */}
                    <div className="flex-1 w-full space-y-2 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="font-semibold text-rose-800">Título do Momento:</label>
                          <input
                            type="text"
                            value={photo.title}
                            onChange={(e) => handlePhotoChange(idx, 'title', e.target.value)}
                            className="w-full mt-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50/50 text-rose-950 focus:bg-white focus:outline-rose-500"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-rose-800">Nota / Tag:</label>
                          <input
                            type="text"
                            value={photo.note}
                            onChange={(e) => handlePhotoChange(idx, 'note', e.target.value)}
                            className="w-full mt-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50/50 text-rose-950 focus:bg-white focus:outline-rose-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-rose-800">Legenda Carinhosa:</label>
                        <input
                          type="text"
                          value={photo.caption}
                          onChange={(e) => handlePhotoChange(idx, 'caption', e.target.value)}
                          className="w-full mt-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50/50 text-rose-950 focus:bg-white focus:outline-rose-500"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="Link da imagem (URL)"
                          value={photo.url}
                          onChange={(e) => handlePhotoChange(idx, 'url', e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50/50 text-rose-950 text-[11px] focus:bg-white focus:outline-rose-500"
                        />
                        <label className="px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-medium cursor-pointer flex items-center gap-1.5 whitespace-nowrap text-[11px]">
                          <Upload size={13} />
                          <span>Subir do celular/PC</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(idx, e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: FOTO DE CASAL EM DESTAQUE (ANIVERSÁRIO) */}
          {activeTab === 'couple' && (
            <div className="space-y-6">
              <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 text-xs text-rose-800">
                <p>
                  Esta é a <strong>Foto Principal de Vocês Dois Juntos</strong> que é revelada em destaque
                  quando a Dai clica para abrir a homenagem de aniversário no <strong>Passo 5</strong>!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-white border border-rose-200 shadow-sm">
                <div className="w-40 h-48 rounded-2xl overflow-hidden bg-rose-100 border-2 border-rose-200 shrink-0 shadow-md">
                  <img
                    src={editingConfig.birthdayCouplePhoto || editingConfig.photos[0]?.url}
                    alt="Foto de Casal"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 w-full space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-rose-800">URL da Foto de Casal:</label>
                    <input
                      type="text"
                      value={editingConfig.birthdayCouplePhoto}
                      onChange={(e) =>
                        setEditingConfig({ ...editingConfig, birthdayCouplePhoto: e.target.value })
                      }
                      className="w-full mt-1 px-3 py-2 rounded-xl border border-rose-200 bg-rose-50/50 text-rose-950 focus:bg-white focus:outline-rose-500 text-xs"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium cursor-pointer inline-flex items-center gap-2 shadow-sm text-xs">
                      <Upload size={14} />
                      <span>Subir Foto de Vocês Dois Juntos</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCouplePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="font-semibold text-rose-800 block mt-3">
                      Mensagem de Homenagem de Aniversário:
                    </label>
                    <textarea
                      rows={4}
                      value={editingConfig.birthdayTributeMessage}
                      onChange={(e) =>
                        setEditingConfig({ ...editingConfig, birthdayTributeMessage: e.target.value })
                      }
                      className="w-full mt-1 p-3 rounded-xl border border-rose-200 bg-rose-50/50 text-rose-950 focus:bg-white focus:outline-rose-500 text-xs font-serif leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PASSAGEM AÉREA */}
          {activeTab === 'ticket' && (
            <div className="space-y-4">
              <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 text-xs text-rose-800">
                <p>
                  Aqui você pode anexar o <strong>comprovante ou imagem real da passagem aérea</strong> para o Canadá
                  ou personalizar o número do voo e datas.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-rose-200 space-y-4">
                {editingConfig.flightTicket.ticketImageUrl && (
                  <div className="w-full max-h-56 rounded-xl overflow-hidden bg-rose-100 border border-rose-200 flex items-center justify-center">
                    <img
                      src={editingConfig.flightTicket.ticketImageUrl}
                      alt="Passagem"
                      className="max-h-56 object-contain"
                    />
                  </div>
                )}

                <div className="space-y-2 text-xs">
                  <label className="font-semibold text-rose-800">URL da Imagem da Passagem:</label>
                  <div className="flex gap-2">
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
                      className="flex-1 px-3 py-2 rounded-xl border border-rose-200 bg-rose-50/50 text-rose-950 text-xs"
                    />
                    <label className="px-3.5 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-medium cursor-pointer flex items-center gap-1.5 whitespace-nowrap text-xs">
                      <Upload size={14} />
                      <span>Subir Imagem</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleTicketUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div>
                    <label className="font-semibold text-rose-800">Voo:</label>
                    <input
                      type="text"
                      value={editingConfig.flightTicket.flightNumber}
                      onChange={(e) =>
                        setEditingConfig({
                          ...editingConfig,
                          flightTicket: {
                            ...editingConfig.flightTicket,
                            flightNumber: e.target.value,
                          },
                        })
                      }
                      className="w-full mt-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50/50 text-rose-950"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-rose-800">Data:</label>
                    <input
                      type="text"
                      value={editingConfig.flightTicket.date}
                      onChange={(e) =>
                        setEditingConfig({
                          ...editingConfig,
                          flightTicket: {
                            ...editingConfig.flightTicket,
                            date: e.target.value,
                          },
                        })
                      }
                      className="w-full mt-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50/50 text-rose-950"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TEXTOS & HOMENAGEM */}
          {activeTab === 'texts' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-rose-200 space-y-3">
                <label className="font-bold text-rose-950 text-sm">Carta para a Dai:</label>
                <div>
                  <label className="text-rose-700 font-semibold">Saudação:</label>
                  <input
                    type="text"
                    value={editingConfig.letter.greeting}
                    onChange={(e) =>
                      setEditingConfig({
                        ...editingConfig,
                        letter: { ...editingConfig.letter, greeting: e.target.value },
                      })
                    }
                    className="w-full mt-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50/50 text-rose-950"
                  />
                </div>

                {editingConfig.letter.paragraphs.map((para, pIdx) => (
                  <div key={pIdx}>
                    <label className="text-rose-700 font-semibold">Parágrafo {pIdx + 1}:</label>
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => {
                        const newP = [...editingConfig.letter.paragraphs];
                        newP[pIdx] = e.target.value;
                        setEditingConfig({
                          ...editingConfig,
                          letter: { ...editingConfig.letter, paragraphs: newP },
                        });
                      }}
                      className="w-full mt-1 p-2.5 rounded-xl border border-rose-200 bg-rose-50/50 text-rose-950 font-serif leading-relaxed"
                    />
                  </div>
                ))}

                <div>
                  <label className="text-rose-700 font-semibold">P.S. Final:</label>
                  <input
                    type="text"
                    value={editingConfig.letter.postScript || ''}
                    onChange={(e) =>
                      setEditingConfig({
                        ...editingConfig,
                        letter: { ...editingConfig.letter, postScript: e.target.value },
                      })
                    }
                    className="w-full mt-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50/50 text-rose-950 italic"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AÇÕES & TESTES */}
          {activeTab === 'actions' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-rose-200 space-y-4 text-xs">
                <h4 className="font-bold text-rose-950 text-sm">Ferramentas de Teste para Lucas</h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50 border border-rose-200">
                    <div>
                      <p className="font-semibold text-rose-950">Testar Chuva de Confetes de Aniversário</p>
                      <p className="text-[11px] text-rose-600">Dispara a celebração visual com corações</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => triggerBirthdayBlast()}
                      className="px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium cursor-pointer shadow-sm"
                    >
                      Disparar 🎉
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50 border border-rose-200">
                    <div>
                      <p className="font-semibold text-rose-950">Simular Reencontro (Zerar Cronômetro)</p>
                      <p className="text-[11px] text-rose-600">
                        {isSimulatedReunion ? 'Modo Reencontro ATIVO' : 'Contagem normal ativa'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onSimulateReunionToggle}
                      className={`px-3.5 py-1.5 rounded-full font-medium cursor-pointer shadow-sm ${
                        isSimulatedReunion
                          ? 'bg-amber-500 text-white'
                          : 'bg-rose-200 text-rose-900 hover:bg-rose-300'
                      }`}
                    >
                      {isSimulatedReunion ? 'Restaurar Data' : 'Simular Chegada'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50 border border-rose-200">
                    <div>
                      <p className="font-semibold text-rose-950">Restaurar Configurações Originais</p>
                      <p className="text-[11px] text-rose-600">Volta fotos e textos para o padrão</p>
                    </div>
                    <button
                      type="button"
                      onClick={onResetConfig}
                      className="px-3.5 py-1.5 rounded-full bg-rose-200 hover:bg-rose-300 text-rose-900 font-medium cursor-pointer shadow-sm flex items-center gap-1"
                    >
                      <RotateCcw size={13} />
                      <span>Restaurar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-rose-100 bg-rose-50/50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-semibold text-rose-700 hover:bg-rose-100 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md hover:shadow-rose-600/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check size={16} />
                <span>Salvo com Sucesso!</span>
              </>
            ) : (
              <span>Salvar Alterações</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
