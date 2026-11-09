import React from 'react';
import { X, Printer } from 'lucide-react';
import type { ErpOrder } from '../../types';
import logoDark from '../../assets/brand/logo-dark.jpg';

interface PrintInvoiceModalProps {
  order: ErpOrder | null;
  onClose: () => void;
}

export const PrintInvoiceModal: React.FC<PrintInvoiceModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-[#181716] rounded-3xl max-w-2xl w-full shadow-2xl p-6 sm:p-10 my-8 relative border border-[#DED4C3] font-sans">
        
        {/* Modal actions (hidden on print) */}
        <div className="flex items-center justify-between pb-6 border-b border-[#ECE3D5] mb-6 print:hidden">
          <span className="text-xs uppercase font-['Cinzel'] tracking-wider text-[#B86209] font-bold">
            Aperçu Document Officiel d'Atelier
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-full bg-[#181716] text-white hover:bg-[#E68314] transition-colors text-xs font-['Cinzel'] flex items-center space-x-1.5 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 text-[#6E645A]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE INVOICE CONTENT */}
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={logoDark}
                alt="WriticArt Logo"
                className="h-12 w-auto object-contain rounded"
              />
              <div>
                <h2 className="font-['Cormorant_Garamond'] text-2xl font-bold tracking-wide">
                  Atelier WriticArt
                </h2>
                <p className="text-[10px] text-[#7E7469] font-['Cinzel'] tracking-widest uppercase">
                  Haute Papeterie & Calligraphie d'Art • Dakar, Sénégal
                </p>
                <p className="text-[11px] text-[#554C43]">
                  WhatsApp : +221 77 234 85 21 | Email : kaynubind@gmail.com
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FFF8F0] border border-[#E68314]/30 text-[#B86209] text-xs font-['Cinzel'] font-bold">
                Bon de Commande / Facture
              </span>
              <p className="text-sm font-bold font-['Cinzel'] text-[#181716] mt-1">
                {order.id}
              </p>
              <p className="text-[11px] text-[#8C8074]">Date : {order.date}</p>
            </div>
          </div>

          {/* Client box */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8DFD1] grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] uppercase font-['Cinzel'] text-[#8C8074] font-bold block">Destinataire / Client</span>
              <p className="font-bold text-sm text-[#181716]">{order.clientName}</p>
              <p className="text-[#554C43]">{order.clientPhone}</p>
              {order.clientEmail && <p className="text-[#554C43]">{order.clientEmail}</p>}
            </div>
            <div>
              <span className="text-[10px] uppercase font-['Cinzel'] text-[#8C8074] font-bold block">Lieu de Livraison & Paiement</span>
              <p className="font-medium text-[#181716]">{order.city}</p>
              <p className="text-[#554C43]">
                Mode : {order.paymentMethod} ({order.paymentStatus === 'paye' ? 'Réglé' : order.paymentStatus === 'acompte' ? 'Acompte' : 'En attente'}) • Monnaie client : <strong>{order.currencyUsed || 'FCFA'}</strong>
              </p>
              {(order.theme || order.parfumChoice || order.deliveryType) && (
                <p className="text-[11px] text-[#B86209] mt-0.5">
                  {[order.theme && `Thème : ${order.theme}`, order.parfumChoice && `Parfum : ${order.parfumChoice}`, order.deliveryType].filter(Boolean).join(' • ')}
                </p>
              )}
            </div>
          </div>

          {/* Custom dedication if any */}
          {order.customMessage && (
            <div className="p-3 rounded-xl bg-[#FFFBF5] border border-[#E8DFD1] text-xs italic text-[#7E7469]">
              <strong className="font-['Cinzel'] font-bold uppercase not-italic text-[#B86209] text-[10px] block mb-0.5">
                Texte Manuscrit / Dédicace :
              </strong>
              « {order.customMessage} »
            </div>
          )}

          {/* Items Table */}
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DED4C3] text-[#8C8074] font-['Cinzel'] uppercase text-[10px]">
                <th className="py-2">Description</th>
                <th className="py-2 text-center">Qté</th>
                <th className="py-2 text-right">Prix Unitaire</th>
                <th className="py-2 text-right">Total FCFA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE7DA]">
              {order.items.map((it, idx) => (
                <tr key={idx} className="py-2.5">
                  <td className="py-2.5">
                    <span className="font-medium text-[#181716] block">{it.title}</span>
                    {it.options && <span className="text-[10px] text-[#8C8074]">{it.options}</span>}
                  </td>
                  <td className="py-2.5 text-center">{it.quantity}</td>
                  <td className="py-2.5 text-right">{it.unitPriceFCFA.toLocaleString('fr-FR')} FCFA</td>
                  <td className="py-2.5 text-right font-semibold">
                    {(it.unitPriceFCFA * it.quantity).toLocaleString('fr-FR')} FCFA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="pt-3 border-t border-[#DED4C3] flex justify-end">
            <div className="w-64 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-[#8C8074]">Sous-total :</span>
                <span>{order.totalFCFA.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div className="flex justify-between font-bold text-base text-[#181716] pt-1 border-t border-[#ECE3D5]">
                <span>Total Net :</span>
                <span className="text-[#B86209] font-['Cinzel']">
                  {order.totalFCFA.toLocaleString('fr-FR')} FCFA
                </span>
              </div>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-8 border-t border-[#ECE3D5] flex justify-between items-end text-xs text-[#8C8074]">
            <div>
              <p className="font-['Cinzel'] text-[10px] uppercase font-bold text-[#181716]">Bon pour Accord & Cachet Atelier</p>
              <div className="w-28 h-16 border-b border-dashed border-[#8C8074] mt-2 flex items-center justify-center">
                <span className="text-[9px] uppercase font-['Cinzel'] text-[#E68314] font-bold">WriticArt Dakar</span>
              </div>
            </div>

            <div className="text-right text-[10px]">
              <p className="font-semibold text-[#181716]">« Les écrits restent »</p>
              <p>Les mots ont un super pouvoir. WriticArt leur donne une forme pour qu’ils restent.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
