import React, { useState } from 'react';
import { X, Upload, Link as LinkIcon } from 'lucide-react';
import { useErp } from '../../context/ErpContext';

interface MediaUploadModalProps {
  onClose: () => void;
}

export const MediaUploadModal: React.FC<MediaUploadModalProps> = ({ onClose }) => {
  const { addMedia } = useErp();

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<'coffret' | 'tableau' | 'atelier' | 'mariage' | 'autre'>('coffret');
  const [preview, setPreview] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ''));
      const reader = new FileReader();
      reader.onloadend = () => {
        const res = reader.result as string;
        setUrl(res);
        setPreview(res);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    addMedia({
      title: title.trim() || 'Photo WriticArt Dakar',
      url: url.trim(),
      category,
      size: 'Local / Web',
      type: 'image'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] dark:bg-[#181716] text-[#1E1C1A] dark:text-[#FAF8F5] rounded-3xl max-w-lg w-full border border-[#DED4C3] dark:border-[#2E2A26] shadow-2xl p-6 sm:p-8 my-8 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold mb-1">
          Ajouter une Photo à la Médiathèque
        </h3>
        <p className="text-xs text-[#8C8074] dark:text-[#9A9084] mb-6 font-sans">
          Téléversez un fichier depuis votre appareil ou collez l'URL d'une image web.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* File input / dropzone */}
          <div className="border-2 border-dashed border-[#DED4C3] dark:border-[#38332E] rounded-2xl p-6 text-center hover:border-[#E68314] transition-colors bg-white/50 dark:bg-[#121110]">
            <Upload className="w-8 h-8 mx-auto text-[#B86209] dark:text-[#E68314] mb-2" />
            <label className="cursor-pointer text-xs font-['Cinzel'] font-bold text-[#E68314] hover:underline block">
              Sélectionner un fichier sur votre ordinateur
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <p className="text-[10px] text-[#8C8074] mt-1">PNG, JPG, WEBP jusqu'à 5 MB</p>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#E8DFD1] dark:border-[#2E2A26]" />
            <span className="flex-shrink mx-4 text-[10px] uppercase font-['Cinzel'] text-[#8C8074]">Ou par lien URL</span>
            <div className="flex-grow border-t border-[#E8DFD1] dark:border-[#2E2A26]" />
          </div>

          <div>
            <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
              Adresse web de l'image (URL)
            </label>
            <div className="relative">
              <LinkIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8074]" />
              <input
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setPreview(e.target.value);
                }}
                placeholder="https://..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs focus:outline-none focus:border-[#E68314]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
              Titre / Légende de la photo
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex : Coffret Writic'Love Homme & Dorure Or"
              className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs focus:outline-none focus:border-[#E68314]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
              Catégorie de la Photo
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs font-['Cinzel'] focus:outline-none focus:border-[#E68314]"
            >
              <option value="coffret">Coffrets 365 Jours</option>
              <option value="tableau">Tableaux & Toiles</option>
              <option value="mariage">Mariages & Vœux</option>
              <option value="atelier">Atelier & Outils</option>
              <option value="autre">Autre création</option>
            </select>
          </div>

          {/* Preview */}
          {preview && (
            <div className="p-3 bg-white dark:bg-[#121110] rounded-xl border border-[#E8DFD1] space-y-1">
              <span className="text-[10px] text-[#8C8074] block uppercase font-['Cinzel']">Aperçu :</span>
              <img src={preview} alt="Preview" className="h-28 w-auto rounded object-cover mx-auto" />
            </div>
          )}

          <div className="pt-4 border-t border-[#E8DFD1] dark:border-[#2E2A26] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border text-xs"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] hover:bg-[#E68314] text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-colors shadow"
            >
              Ajouter à la Médiathèque
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
