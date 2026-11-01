import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { CatalogProduct } from '../../types';
import { useErp } from '../../context/ErpContext';

interface ProductEditorModalProps {
  product: CatalogProduct | null;
  onClose: () => void;
}

export const ProductEditorModal: React.FC<ProductEditorModalProps> = ({ product, onClose }) => {
  const { addProduct, updateProduct } = useErp();

  const [name, setName] = useState(product?.name || '');
  const [subtitle, setSubtitle] = useState(product?.subtitle || '');
  const [category, setCategory] = useState<'writiclove' | 'tableau' | 'cadre' | 'accessoire' | 'mariage'>(product?.category || 'writiclove');
  const [categoryLabel, setCategoryLabel] = useState(product?.categoryLabel || 'Coffrets 365 Jours');
  const [priceFCFA, setPriceFCFA] = useState(product?.priceFCFA || 30000);
  const [badge, setBadge] = useState(product?.badge || '');
  const [inStock, setInStock] = useState(product?.inStock !== false);
  const [image, setImage] = useState(product?.image || '');
  const [description, setDescription] = useState(product?.description || '');
  const [featuresStr, setFeaturesStr] = useState(product?.features?.join('\n') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const features = featuresStr
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    if (product) {
      updateProduct(product.id, {
        name,
        subtitle,
        category,
        categoryLabel,
        priceFCFA,
        badge: badge || undefined,
        inStock,
        image,
        description,
        features
      });
    } else {
      addProduct({
        name,
        subtitle,
        category,
        categoryLabel,
        priceFCFA,
        badge: badge || undefined,
        inStock,
        image: image || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
        description,
        features: features.length ? features : ['Création artisanale WriticArt Dakar', 'Finitions dorées à la main']
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] dark:bg-[#181716] text-[#1E1C1A] dark:text-[#FAF8F5] rounded-3xl max-w-2xl w-full border border-[#DED4C3] dark:border-[#2E2A26] shadow-2xl p-6 sm:p-8 my-8 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold mb-1">
          {product ? 'Modifier la Fiche Produit' : 'Ajouter une Nouvelle Création au Catalogue'}
        </h3>
        <p className="text-xs text-[#8C8074] dark:text-[#9A9084] mb-6 font-sans">
          Mise à jour en direct des tarifs en FCFA, visuels et spécifications.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
                Nom de l'Œuvre / Coffret *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex : Coffret Writic'Love Homme"
                className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] font-semibold focus:outline-none focus:border-[#E68314]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
                Sous-titre descriptif
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Ex : 365 Jours d'Amour — Noir & Or"
                className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] focus:outline-none focus:border-[#E68314]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
                Prix de vente (FCFA) *
              </label>
              <input
                type="number"
                required
                value={priceFCFA}
                onChange={(e) => setPriceFCFA(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] font-['Cinzel'] font-bold text-sm focus:outline-none focus:border-[#E68314]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
                Badge promotionnel (optionnel)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Ex : Best-Seller, Coup de Cœur..."
                className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
                Catégorie
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setCategory(val);
                  if (val === 'writiclove') setCategoryLabel('Coffrets 365 Jours');
                  else if (val === 'tableau') setCategoryLabel('Tableaux & Toiles');
                  else if (val === 'cadre') setCategoryLabel('Cadres Décoratifs');
                  else if (val === 'accessoire') setCategoryLabel('Accessoires & Cire');
                  else if (val === 'mariage') setCategoryLabel('Événements & Mariages');
                }}
                className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] font-['Cinzel']"
              >
                <option value="writiclove">Coffrets 365 Jours</option>
                <option value="tableau">Tableaux & Toiles</option>
                <option value="cadre">Cadres Décoratifs</option>
                <option value="accessoire">Accessoires & Sceaux</option>
                <option value="mariage">Mariages & Prestige</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
                URL de la Photo
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
              Description de l'œuvre
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez la création, les émotions et le procédé artisanal..."
              className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074] mb-1">
              Caractéristiques & Points forts (une ligne par puce)
            </label>
            <textarea
              rows={3}
              value={featuresStr}
              onChange={(e) => setFeaturesStr(e.target.value)}
              placeholder="365 cartes imprimées sur papier 350g&#10;Scellé au cachet de cire WA&#10;Livraison express Dakar"
              className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] font-mono"
            />
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="instock"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="rounded text-[#E68314]"
            />
            <label htmlFor="instock" className="cursor-pointer font-medium">
              Produit disponible et visible en ligne sur la boutique
            </label>
          </div>

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
              {product ? 'Enregistrer les Modifications' : 'Ajouter au Catalogue'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
