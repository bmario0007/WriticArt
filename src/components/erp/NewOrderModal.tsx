import React, { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { useErp } from '../../context/ErpContext';
import type { OrderItemLine } from '../../types';

interface NewOrderModalProps {
  onClose: () => void;
}

export const NewOrderModal: React.FC<NewOrderModalProps> = ({ onClose }) => {
  const { addOrder, products } = useErp();

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('+221 ');
  const [clientEmail, setClientEmail] = useState('');
  const [city, setCity] = useState('Dakar (Almadies)');
  const [offerType, setOfferType] = useState<'tableau' | 'writiclove' | 'box' | 'atelier'>('writiclove');
  const [currencyUsed, setCurrencyUsed] = useState<'FCFA' | 'EUR'>('FCFA');
  const [paymentMethod, setPaymentMethod] = useState<
    'Wave' | 'Orange Money' | 'Espèces' | 'Virement' | 'Carte Bancaire' | 'Autre'
  >('Wave');
  const [paymentStatus, setPaymentStatus] = useState<'paye' | 'acompte' | 'en_attente'>('paye');
  const [notes, setNotes] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  const [items, setItems] = useState<OrderItemLine[]>([
    {
      title: 'Pack Couple WriticLove (365 + 1 Cartes)',
      quantity: 1,
      unitPriceFCFA: 50000,
      options: 'Précommande • Pack Homme + Femme'
    }
  ]);

  const handleAddItem = (productName: string, price: number) => {
    setItems((prev) => [...prev, { title: productName, quantity: 1, unitPriceFCFA: price }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQty = (index: number, qty: number) => {
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, quantity: Math.max(1, qty) } : it))
    );
  };

  const totalFCFA = items.reduce((acc, it) => acc + it.unitPriceFCFA * it.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    addOrder({
      clientName,
      clientPhone,
      clientEmail: clientEmail || undefined,
      city,
      items,
      totalFCFA,
      currencyUsed,
      offerType,
      isPreorder: offerType === 'writiclove' || offerType === 'box',
      status: 'nouveau',
      paymentMethod,
      paymentStatus,
      notes: notes || undefined,
      customMessage: customMessage || undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] dark:bg-[#181716] text-[#1E1C1A] dark:text-[#FAF8F5] rounded-3xl max-w-2xl w-full border border-[#DED4C3] dark:border-[#2E2A26] shadow-2xl p-6 sm:p-8 my-8 relative">
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold mb-1">
          Nouvelle Commande Atelier
        </h3>
        <p className="text-xs text-[#8C8074] dark:text-[#9A9084] mb-6 font-sans">
          Enregistrement manuel d’une commande passée par téléphone, WhatsApp ou au comptoir.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Client info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#B86209] dark:text-[#E68314] mb-1">
                Nom du Client *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex : Mariama Diallo"
                className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] focus:outline-none focus:border-[#E68314]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#B86209] dark:text-[#E68314] mb-1">
                Téléphone (WhatsApp) *
              </label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="+221 77 ..."
                className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] focus:outline-none focus:border-[#E68314]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#B86209] dark:text-[#E68314] mb-1">
                Email Client (optionnel)
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="client@exemple.com"
                className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] focus:outline-none focus:border-[#E68314]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#B86209] dark:text-[#E68314] mb-1">
                Adresse / Ville de livraison
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex : Dakar (Almadies) ou Paris (France)"
                className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] focus:outline-none focus:border-[#E68314]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#B86209] dark:text-[#E68314] mb-1">
                Type d’offre
              </label>
              <select
                value={offerType}
                onChange={(e) => setOfferType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] focus:outline-none focus:border-[#E68314]"
              >
                <option value="tableau">Tableau Personnalisé</option>
                <option value="writiclove">Coffret WriticLove (365 + 1)</option>
                <option value="box">Box WriticArt (Lancement Février)</option>
                <option value="atelier">Atelier / Création Sur-Mesure</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#B86209] dark:text-[#E68314] mb-1">
                Monnaie choisie par le client
              </label>
              <select
                value={currencyUsed}
                onChange={(e) => setCurrencyUsed(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] focus:outline-none focus:border-[#E68314]"
              >
                <option value="FCFA">FCFA (XOF)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#B86209] dark:text-[#E68314] mb-1">
                Mode de Paiement
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] focus:outline-none focus:border-[#E68314]"
              >
                <option value="Wave">Wave</option>
                <option value="Orange Money">Orange Money</option>
                <option value="Carte Bancaire">Carte Bancaire / PayPal</option>
                <option value="Virement">Virement bancaire</option>
                <option value="Espèces">Espèces à la livraison</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#B86209] dark:text-[#E68314] mb-1">
                Statut du Paiement
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] focus:outline-none focus:border-[#E68314]"
              >
                <option value="paye">Intégralement Payé</option>
                <option value="acompte">Acompte versé</option>
                <option value="en_attente">En attente de paiement</option>
              </select>
            </div>
          </div>

          {/* Items selection */}
          <div className="pt-3 border-t border-[#E8DFD1] dark:border-[#2E2A26]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-['Cinzel'] uppercase font-bold text-[#B86209] dark:text-[#E68314]">
                Articles commandés
              </span>
              <div className="flex space-x-1">
                {products.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleAddItem(p.name, p.priceFCFA)}
                    className="text-[10px] px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 hover:bg-[#E68314] hover:text-white transition-colors"
                  >
                    + {p.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {items.map((it, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 p-2 rounded-xl bg-white dark:bg-[#121110] border border-[#E8DFD1] dark:border-[#2E2A26] text-xs"
                >
                  <span className="flex-1 font-medium truncate">{it.title}</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-[10px] text-[#8C8074]">Qté :</span>
                    <input
                      type="number"
                      min="1"
                      value={it.quantity}
                      onChange={(e) => handleUpdateQty(idx, parseInt(e.target.value, 10) || 1)}
                      className="w-12 px-1.5 py-0.5 border rounded text-center dark:bg-[#1C1A18]"
                    />
                  </div>
                  <span className="font-bold text-[#181716] dark:text-[#FAF8F5]">
                    {(it.unitPriceFCFA * it.quantity).toLocaleString('fr-FR')} FCFA
                  </span>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Custom Message & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
            <div>
              <label className="block text-[11px] font-sans text-[#7A7167] mb-1">
                Message personnalisé ou acrostiche :
              </label>
              <textarea
                rows={2}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Prénom ou message souhaité..."
                className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans text-[#7A7167] mb-1">
                Notes internes d’atelier :
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex : Livraison France incluse / Parfum Oud Royal..."
                className="w-full px-3 py-2 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs"
              />
            </div>
          </div>

          {/* Total & Action */}
          <div className="pt-4 border-t border-[#E8DFD1] dark:border-[#2E2A26] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#8C8074] uppercase block">Total Commande ({currencyUsed})</span>
              <span className="font-['Cinzel'] text-xl font-bold text-[#E68314]">
                {totalFCFA.toLocaleString('fr-FR')} FCFA
              </span>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#E68314] transition-colors shadow-md"
            >
              Enregistrer la Commande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
