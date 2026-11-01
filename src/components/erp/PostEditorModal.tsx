import React, { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import type { ArticlePost } from '../../types';
import { useErp } from '../../context/ErpContext';

interface PostEditorModalProps {
  post: ArticlePost | null;
  onClose: () => void;
}

export const PostEditorModal: React.FC<PostEditorModalProps> = ({ post, onClose }) => {
  const { addArticle, updateArticle, mediaList } = useErp();

  const [title, setTitle] = useState(post?.title || '');
  const [category, setCategory] = useState(post?.category || 'Couple & Amour');
  const [author, setAuthor] = useState(post?.author || 'Atelier WriticArt Dakar');
  const [readTime, setReadTime] = useState(post?.readTime || '4 min');
  const [coverImage, setCoverImage] = useState(post?.coverImage || (mediaList[0]?.url || ''));
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [status, setStatus] = useState<'publie' | 'brouillon'>(post?.status || 'publie');
  const [featured, setFeatured] = useState(post?.featured || false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (post) {
      updateArticle(post.id, {
        title,
        category,
        author,
        readTime,
        coverImage,
        excerpt,
        content,
        status,
        featured
      });
    } else {
      addArticle({
        title,
        category,
        author,
        readTime,
        coverImage,
        excerpt,
        content,
        status,
        featured
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] dark:bg-[#181716] text-[#1E1C1A] dark:text-[#FAF8F5] rounded-3xl max-w-4xl w-full border border-[#DED4C3] dark:border-[#2E2A26] shadow-2xl p-6 sm:p-8 my-8 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD1] dark:border-[#2E2A26] mb-6">
          <div>
            <span className="text-[10px] uppercase font-['Cinzel'] tracking-widest text-[#B86209] dark:text-[#E68314] font-bold block">
              Éditeur d'Article WordPress • Journal d'Atelier
            </span>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">
              {post ? 'Modifier l\'Article' : 'Rédiger un Nouvel Article d\'Atelier'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 8 cols: Main article editor */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
                  Titre de l'Article *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex : Comment le rituel 365 Jours transforme un couple..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm font-semibold focus:outline-none focus:border-[#E68314]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
                  Extrait Court (Résumé pour l'accueil et réseaux)
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Résumé en 2-3 phrases accrocheuses..."
                  className="w-full px-4 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs focus:outline-none focus:border-[#E68314]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
                  Contenu Complet de l'Article
                </label>
                <textarea
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Rédigez votre article d'artisanat, conseils amoureux ou anecdotes d'atelier..."
                  className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs font-sans leading-relaxed focus:outline-none focus:border-[#E68314]"
                />
              </div>
            </div>

            {/* Right 4 cols: Publication settings */}
            <div className="lg:col-span-4 space-y-4 bg-white dark:bg-[#121110] p-5 rounded-2xl border border-[#E8DFD1] dark:border-[#2E2A26]">
              
              <div>
                <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
                  État de Publication
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#1C1A18] text-xs font-['Cinzel'] font-bold focus:outline-none focus:border-[#E68314]"
                >
                  <option value="publie">✓ En Ligne (Publié)</option>
                  <option value="brouillon">✎ Brouillon Privé</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
                  Catégorie
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#1C1A18] text-xs focus:outline-none focus:border-[#E68314]"
                >
                  <option value="Couple & Amour">Couple & Amour</option>
                  <option value="Savoir-Faire">Savoir-Faire & Dorure</option>
                  <option value="Mariage & Cérémonie">Mariage & Cérémonie</option>
                  <option value="Coulisses Atelier">Coulisses Atelier</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
                  Auteur de l'Article
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#1C1A18] text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
                  Temps de lecture estimé
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="Ex : 5 min"
                  className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#1C1A18] text-xs"
                />
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074]">
                  Image à la Une (Couverture)
                </label>
                {coverImage && (
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-[#DED4C3]">
                    <img src={coverImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="URL de l'image..."
                  className="w-full px-3 py-1.5 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#1C1A18] text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowMediaPicker(!showMediaPicker)}
                  className="w-full py-2 rounded-xl border border-dashed border-[#B86209] text-[11px] font-['Cinzel'] font-bold text-[#B86209] dark:text-[#E68314] hover:bg-[#FFF8F0] dark:hover:bg-[#1E1914] transition-colors flex items-center justify-center space-x-1"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Choisir dans la Médiathèque</span>
                </button>

                {showMediaPicker && (
                  <div className="grid grid-cols-3 gap-1.5 p-2 bg-[#FAF8F5] dark:bg-[#1C1A18] rounded-xl max-h-36 overflow-y-auto border border-[#E8DFD1]">
                    {mediaList.map((m) => (
                      <img
                        key={m.id}
                        src={m.url}
                        alt={m.title}
                        onClick={() => {
                          setCoverImage(m.url);
                          setShowMediaPicker(false);
                        }}
                        className="w-full aspect-square object-cover rounded cursor-pointer hover:scale-105 transition-transform border"
                        title={m.title}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="feat"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded text-[#E68314]"
                />
                <label htmlFor="feat" className="text-xs cursor-pointer font-medium">
                  Mettre à la une sur le Journal
                </label>
              </div>

            </div>

          </div>

          {/* Footer Submit Buttons */}
          <div className="pt-4 border-t border-[#E8DFD1] dark:border-[#2E2A26] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border text-xs font-['Cinzel'] hover:bg-black/5"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] hover:bg-[#E68314] text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-colors shadow-lg"
            >
              {post ? 'Mettre à Jour l\'Article' : 'Publier l\'Article'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
