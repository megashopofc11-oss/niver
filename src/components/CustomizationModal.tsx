import React, { useState } from 'react';
import { ExperienceConfig } from '../types';
import { X, Upload, RotateCcw, Save, Music, Image as ImageIcon, Sparkles } from 'lucide-react';
import { DEFAULT_CONFIG } from '../data/defaultExperience';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ExperienceConfig;
  onSaveConfig: (newConfig: ExperienceConfig) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [formData, setFormData] = useState<ExperienceConfig>(config);
  const [activeTab, setActiveTab] = useState<'general' | 'photos'>('general');

  if (!isOpen) return null;

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({ ...prev, honoreeName: name }));
  };

  const handleAudioTypeChange = (type: 'youtube' | 'custom_mp3') => {
    setFormData((prev) => ({ ...prev, audioSourceType: type }));
  };

  const handleYoutubeIdChange = (id: string) => {
    let cleanId = id;
    if (id.includes('youtu.be/')) {
      cleanId = id.split('youtu.be/')[1].split('?')[0];
    } else if (id.includes('watch?v=')) {
      cleanId = id.split('watch?v=')[1].split('&')[0];
    }
    setFormData((prev) => ({ ...prev, youtubeVideoId: cleanId }));
  };

  const handlePhotoUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setFormData((prev) => {
        const newStories = [...prev.stories];
        newStories[index] = { ...newStories[index], imageUrl: dataUrl };
        return { ...prev, stories: newStories };
      });
    };
    reader.readAsDataURL(file);
  };

  const handleQuoteChange = (index: number, quote: string) => {
    setFormData((prev) => {
      const newStories = [...prev.stories];
      newStories[index] = { ...newStories[index], quote };
      return { ...prev, stories: newStories };
    });
  };

  const handleSave = () => {
    onSaveConfig(formData);
    onClose();
  };

  const handleResetDefaults = () => {
    if (window.confirm('Deseja restaurar as configurações e fotos originais da modelo?')) {
      setFormData(DEFAULT_CONFIG);
      onSaveConfig(DEFAULT_CONFIG);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-card-luxury w-full max-w-2xl max-h-[90vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-[#F5A1C4]/25">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#F5A1C4]/15 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#F5A1C4]" />
            <h2 className="text-xl font-luxury text-[#FFF5FA]">Personalizar Homenagem</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#F5A1C4] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#F5A1C4]/15 px-6 gap-6 text-sm">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-3 font-medium transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'general'
                ? 'border-[#E83E86] text-[#FFF5FA]'
                : 'border-transparent text-[#F5A1C4]/60 hover:text-[#F5A1C4]'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Nome & Áudio</span>
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`py-3 font-medium transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'photos'
                ? 'border-[#E83E86] text-[#FFF5FA]'
                : 'border-transparent text-[#F5A1C4]/60 hover:text-[#F5A1C4]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>10 Fotos da Modelo & Frases</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {activeTab === 'general' ? (
            <div className="space-y-5">
              {/* Honoree Name */}
              <div>
                <label className="block text-xs font-medium text-[#F5A1C4] mb-1.5">
                  Nome da Aniversariante
                </label>
                <input
                  type="text"
                  value={formData.honoreeName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ex: Isabella"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#09070B] border border-[#F5A1C4]/25 text-[#FFF5FA] placeholder-[#F5A1C4]/40 focus:outline-none focus:border-[#E83E86]"
                />
              </div>

              {/* Audio Source Option */}
              <div>
                <label className="block text-xs font-medium text-[#F5A1C4] mb-2">
                  Trilha Sonora da Homenagem
                </label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => handleAudioTypeChange('youtube')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      formData.audioSourceType === 'youtube'
                        ? 'border-[#E83E86] bg-[#9D174D]/35 text-[#FFF5FA] shadow-sm'
                        : 'border-[#F5A1C4]/20 bg-[#09070B] text-[#F5A1C4]/70 hover:bg-[#9D174D]/20'
                    }`}
                  >
                    <div className="font-semibold text-xs mb-1">YouTube Oficial</div>
                    <div className="text-[11px] text-[#F5A1C4]/70">Telemensagem recomendada</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAudioTypeChange('custom_mp3')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      formData.audioSourceType === 'custom_mp3'
                        ? 'border-[#E83E86] bg-[#9D174D]/35 text-[#FFF5FA] shadow-sm'
                        : 'border-[#F5A1C4]/20 bg-[#09070B] text-[#F5A1C4]/70 hover:bg-[#9D174D]/20'
                    }`}
                  >
                    <div className="font-semibold text-xs mb-1">Áudio Sem Anúncios</div>
                    <div className="text-[11px] text-[#F5A1C4]/70">MP3 próprio ou acústico</div>
                  </button>
                </div>

                {formData.audioSourceType === 'youtube' ? (
                  <div>
                    <label className="block text-[11px] text-[#F5A1C4] mb-1">
                      ID ou Link do Vídeo YouTube:
                    </label>
                    <input
                      type="text"
                      value={formData.youtubeVideoId}
                      onChange={(e) => handleYoutubeIdChange(e.target.value)}
                      placeholder="ysoEwjtOAtw"
                      className="w-full px-4 py-2 rounded-xl bg-[#09070B] border border-[#F5A1C4]/25 text-[#FFF5FA] placeholder-[#F5A1C4]/40 focus:outline-none focus:border-[#E83E86] text-xs font-mono"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] text-[#F5A1C4] mb-1">
                      URL do Arquivo MP3 (opcional):
                    </label>
                    <input
                      type="url"
                      value={formData.customMp3Url}
                      onChange={(e) => setFormData((prev) => ({ ...prev, customMp3Url: e.target.value }))}
                      placeholder="https://exemplo.com/audio.mp3 (deixe vazio para piano acústico)"
                      className="w-full px-4 py-2 rounded-xl bg-[#09070B] border border-[#F5A1C4]/25 text-[#FFF5FA] placeholder-[#F5A1C4]/40 focus:outline-none focus:border-[#E83E86] text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Message final */}
              <div>
                <label className="block text-xs font-medium text-[#F5A1C4] mb-1.5">
                  Mensagem de Encerramento
                </label>
                <textarea
                  rows={3}
                  value={formData.finalMessage}
                  onChange={(e) => setFormData((prev) => ({ ...prev, finalMessage: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#09070B] border border-[#F5A1C4]/25 text-[#FFF5FA] placeholder-[#F5A1C4]/40 focus:outline-none focus:border-[#E83E86] text-xs"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-xs text-[#F5A1C4]/80">
                A galeria já está configurada com a mesma modelo consistente em todas as 10 fotos. Você também pode carregar fotos personalizadas do seu dispositivo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.stories.map((story, idx) => (
                  <div
                    key={story.id}
                    className="p-3.5 rounded-2xl bg-[#09070B] border border-[#F5A1C4]/20 flex flex-col gap-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#FFF5FA]">
                        Foto {idx + 1}: {story.title}
                      </span>
                      <span className="text-[10px] text-[#F5A1C4] uppercase tracking-wider">
                        {story.patternType}
                      </span>
                    </div>

                    <div className="relative w-full h-28 rounded-lg overflow-hidden bg-black/60 border border-[#F5A1C4]/20 group">
                      <img
                        src={story.imageUrl}
                        alt={`Preview ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 20%' }}
                      />
                      <label className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-xs text-[#FFF5FA] gap-1">
                        <Upload className="w-4 h-4 text-[#F5A1C4]" />
                        <span>Trocar Foto</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handlePhotoUpload(idx, e)}
                        />
                      </label>
                    </div>

                    <textarea
                      rows={2}
                      value={story.quote}
                      onChange={(e) => handleQuoteChange(idx, e.target.value)}
                      placeholder="Frase comemorativa..."
                      className="w-full p-2 rounded-lg bg-[#09070B] border border-[#F5A1C4]/20 text-[#FFF5FA] text-xs focus:outline-none focus:border-[#E83E86]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#F5A1C4]/15 flex items-center justify-between bg-black/30">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 text-xs text-[#F5A1C4]/70 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrões</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#F5A1C4] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-medium bg-[#9D174D] hover:bg-[#E83E86] text-[#FFF5FA] shadow-lg shadow-[#9D174D]/40 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
