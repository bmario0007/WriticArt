import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Printer, 
  CheckCircle2, 
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import type { QuoteConfiguration } from '../types';
import { atelierAudio } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import logoDark from '../assets/brand/logo-dark.jpg';

interface QuoteEngineModalProps {
  config: QuoteConfiguration;
  onClose: () => void;
}

export const QuoteEngineModal: React.FC<QuoteEngineModalProps> = ({
  config,
  onClose
}) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isSent, setIsSent] = useState(false);

  // Quote number generated
  const quoteNumber = 'DEV-WA-' + Math.floor(100000 + Math.random() * 900000);
  const today = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate detailed items in FCFA
  let baseUnitFCFA = 3000;
  if (config.eventType === 'tableau') baseUnitFCFA = 35000;
  else if (config.eventType === 'cadre') baseUnitFCFA = 20000;
  else if (config.eventType === 'writiclove') baseUnitFCFA = 30000;

  const paperExtra = config.paperType === 'deckle-edge' ? 1500 : config.paperType === 'parchemin-or' ? 2000 : config.paperType === 'noir-nuit' ? 1800 : 0;
  const inkExtra = config.inkType === 'or-24k' ? 2500 : config.inkType === 'blanc-nacré' ? 1500 : 0;
  const sealExtra = config.hasWaxSeal ? 1200 : 0;
  const ribbonExtra = config.hasSilkRibbon ? 1000 : 0;
  const goldExtra = config.hasGoldLeafFoil ? 1800 : 0;
  const envelopeExtra = config.hasHandmadeEnvelope ? 1500 : 0;

  const unitTotal = baseUnitFCFA + paperExtra + inkExtra + sealExtra + ribbonExtra + goldExtra + envelopeExtra;
  const subtotal = unitTotal * config.quantity;
  const rushFee = config.rushOrder ? subtotal * 0.25 : 0;
  const finalTotalFCFA = Math.round(subtotal + rushFee);
  const finalTotalEUR = (finalTotalFCFA / 655.957).toFixed(2);

  const handleSendWhatsApp = () => {
    atelierAudio.playWaxStamp();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E68314', '#181716', '#25D366']
    });

    const message = `Bonjour l'Atelier WriticArt ! ✨%0A%0AJe souhaite valider un devis :%0A- Devis : ${quoteNumber}%0A- Client : ${clientName || 'Client'} (${clientPhone || 'Non renseigné'})%0A- Email : ${clientEmail || 'Non renseigné'}%0A- Type d'œuvre : ${config.eventType}%0A- Quantité : ${config.quantity} pièce(s)%0A- Titre : ${config.customTitle}%0A- Message : ${config.customMessage}%0A- Total estimé : ${finalTotalFCFA.toLocaleString('fr-FR')} FCFA (~${finalTotalEUR} €)%0A%0AMerci de me confirmer la faisabilité et le délai !`;
    window.open(`https://wa.me/221772348521?text=${message}`, '_blank');
    setIsSent(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      
      <div className="bg-[#FAF8F5] rounded-3xl max-w-4xl w-full border border-[#DED4C3] shadow-2xl overflow-hidden my-8 relative">
        
        {/* Header bar */}
        <div className="bg-[#181716] text-[#FAF8F5] px-6 sm:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={logoDark}
              alt="WriticArt Logo"
              className="h-10 w-auto object-contain rounded"
            />
            <div>
              <span className="font-['Cormorant_Garamond'] text-xl font-semibold tracking-wide">
                WriticArt — Devis Officiel d'Atelier
              </span>
              <span className="block text-[10px] text-[#E68314] font-['Cinzel'] uppercase tracking-widest">
                {quoteNumber} • {today} • Dakar, Sénégal
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Imprimer ou enregistrer en PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* Workshop Official Coordinates */}
          <div className="p-4 rounded-2xl bg-[#FFF8F0] border border-[#E68314]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#554C43]">
            <div>
              <strong className="text-[#181716] block font-['Cinzel']">Atelier WriticArt</strong>
              <span>Dakar, Sénégal • « Transformer les mots en œuvres »</span>
            </div>
            <div className="sm:text-right space-y-0.5">
              <p>Email : <a href="mailto:kaynubind@gmail.com" className="font-semibold text-[#B86209] underline">kaynubind@gmail.com</a></p>
              <p>WhatsApp / Tél : <a href="https://wa.me/221772348521" className="font-semibold text-[#25D366]">+221 77 234 85 21</a></p>
            </div>
          </div>

          {/* Success Banner if inquiry submitted */}
          {isSent && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold block">Votre demande est en cours de transmission sur WhatsApp !</span>
                <span>L'équipe WriticArt va examiner votre projet et vous répondre dans les plus brefs délais.</span>
              </div>
            </div>
          )}

          {/* Client Information Form */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-[#E8DFD1]">
            <div>
              <label className="block text-[11px] uppercase font-['Cinzel'] tracking-wider text-[#B86209] font-bold mb-1">
                Votre Nom & Prénom *
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex : Mariama Diallo"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DED4C3] text-sm bg-white focus:outline-none focus:border-[#E68314]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-['Cinzel'] tracking-wider text-[#B86209] font-bold mb-1">
                Email de Contact *
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="mariama@exemple.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DED4C3] text-sm bg-white focus:outline-none focus:border-[#E68314]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-['Cinzel'] tracking-wider text-[#B86209] font-bold mb-1">
                Téléphone (WhatsApp) *
              </label>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="+221 77 ..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DED4C3] text-sm bg-white focus:outline-none focus:border-[#E68314]"
              />
            </div>
          </div>

          {/* Itemized Table Breakdown */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-[#E0D5C3] text-[#B86209] font-['Cinzel'] uppercase tracking-wider">
                  <th className="pb-3 font-bold">Désignation de la création</th>
                  <th className="pb-3 text-center font-bold">Qté</th>
                  <th className="pb-3 text-right font-bold">Prix Unitaire</th>
                  <th className="pb-3 text-right font-bold">Total FCFA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE7DA] text-[#3D3731]">
                <tr>
                  <td className="py-3">
                    <span className="font-semibold text-[#181716] block">
                      Création d'Art WriticArt ({config.eventType.toUpperCase()})
                    </span>
                    <span className="text-[11px] text-[#8C8074]">
                      « {config.customTitle || 'Création Personnalisée'} »
                    </span>
                  </td>
                  <td className="py-3 text-center">{config.quantity}</td>
                  <td className="py-3 text-right">{baseUnitFCFA.toLocaleString('fr-FR')} FCFA</td>
                  <td className="py-3 text-right font-medium">{(baseUnitFCFA * config.quantity).toLocaleString('fr-FR')} FCFA</td>
                </tr>

                {paperExtra > 0 && (
                  <tr>
                    <td className="py-3">
                      <span className="font-medium text-[#181716] block">
                        Finition Support Noble ({config.paperType})
                      </span>
                    </td>
                    <td className="py-3 text-center">{config.quantity}</td>
                    <td className="py-3 text-right">{paperExtra.toLocaleString('fr-FR')} FCFA</td>
                    <td className="py-3 text-right font-medium">{(paperExtra * config.quantity).toLocaleString('fr-FR')} FCFA</td>
                  </tr>
                )}

                {inkExtra > 0 && (
                  <tr>
                    <td className="py-3">
                      <span className="font-medium text-[#181716] block">
                        Pigments Précieux ({config.inkType})
                      </span>
                    </td>
                    <td className="py-3 text-center">{config.quantity}</td>
                    <td className="py-3 text-right">{inkExtra.toLocaleString('fr-FR')} FCFA</td>
                    <td className="py-3 text-right font-medium">{(inkExtra * config.quantity).toLocaleString('fr-FR')} FCFA</td>
                  </tr>
                )}

                {config.hasWaxSeal && (
                  <tr>
                    <td className="py-3">
                      <span className="font-medium text-[#181716] block">
                        Sceau de Cire d'Atelier ({config.waxColor} • {config.waxStamp})
                      </span>
                    </td>
                    <td className="py-3 text-center">{config.quantity}</td>
                    <td className="py-3 text-right">{sealExtra.toLocaleString('fr-FR')} FCFA</td>
                    <td className="py-3 text-right font-medium">{(sealExtra * config.quantity).toLocaleString('fr-FR')} FCFA</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="pt-4 border-t border-[#E8DFD1] flex flex-col items-end space-y-2">
            <div className="w-full sm:w-80 space-y-1.5 text-xs text-[#5F5851]">
              <div className="flex justify-between">
                <span>Sous-total HT :</span>
                <span className="font-medium text-[#181716]">{subtotal.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Délai d'exécution :</span>
                <span className="font-medium text-[#181716]">
                  {config.rushOrder ? 'Express Atelier (48h/72h)' : 'Standard (5-7 jours)'}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#181716] pt-2 border-t border-[#E8DFD1]">
                <span>Total Estimé :</span>
                <span className="text-[#B86209] font-['Cormorant_Garamond'] text-2xl font-bold">
                  {finalTotalFCFA.toLocaleString('fr-FR')} FCFA
                </span>
              </div>
              <div className="text-right text-[11px] text-[#8C8074]">
                Équivalent international : ~{finalTotalEUR} €
              </div>
            </div>
          </div>

          {/* Workshop Guarantee & CTA Actions */}
          <div className="pt-6 border-t border-[#E8DFD1] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs text-[#7A7167]">
              <ShieldCheck className="w-4 h-4 text-[#E68314]" />
              <span>Validation par photo du Bon à Tirer (BAT) avant expédition.</span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={handleSendWhatsApp}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Envoyer au +221 77 234 85 21</span>
              </button>

              <a
                href={`mailto:kaynubind@gmail.com?subject=Demande%20Devis%20${quoteNumber}&body=Bonjour%20WriticArt%2C%0A%0AJe%20souhaite%20commander%20:%20${encodeURIComponent(config.customTitle)}%20pour%20un%20total%20de%20${finalTotalFCFA}%20FCFA.`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#181716] text-[#FAF8F5] text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#E68314] transition-all flex items-center justify-center space-x-2 shadow-md"
              >
                <Send className="w-4 h-4 text-[#E68314]" />
                <span>Email : kaynubind@gmail.com</span>
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
