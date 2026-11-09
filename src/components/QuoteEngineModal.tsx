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
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useErp } from '../context/ErpContext';
import confetti from 'canvas-confetti';
import logoDark from '../assets/brand/logo-dark.jpg';

interface QuoteEngineModalProps {
  config: QuoteConfiguration;
  onClose: () => void;
}

export const QuoteEngineModal: React.FC<QuoteEngineModalProps> = ({ config, onClose }) => {
  const { tr } = useLanguage();
  const { formatPrice, formatExactBoth, currency } = useCurrency();
  const { addOrder } = useErp();

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isSent, setIsSent] = useState(false);

  const [quoteNumber] = useState(() => 'DEV-WA-' + Math.floor(100000 + Math.random() * 900000));
  const today = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate detailed items in FCFA aligned with StudioConfigurator
  let baseUnitFCFA = 5000;
  if (config.eventType === 'tableau') baseUnitFCFA = 10000;
  else if (config.eventType === 'cadre') baseUnitFCFA = 15000;
  else if (config.eventType === 'writiclove') baseUnitFCFA = 30000;

  const paperExtra =
    config.paperType === 'deckle-edge'
      ? 1500
      : config.paperType === 'parchemin-or'
      ? 2000
      : config.paperType === 'noir-nuit'
      ? 1800
      : 0;
  const inkExtra = config.inkType === 'or-24k' ? 2500 : config.inkType === 'blanc-nacré' ? 1500 : 0;
  const sealExtra = config.hasWaxSeal ? 1200 : 0;
  const ribbonExtra = config.hasSilkRibbon ? 1000 : 0;
  const goldExtra = config.hasGoldLeafFoil ? 1800 : 0;
  const envelopeExtra = config.hasHandmadeEnvelope ? 1500 : 0;

  const unitTotal = baseUnitFCFA + paperExtra + inkExtra + sealExtra + ribbonExtra + goldExtra + envelopeExtra;
  const subtotal = unitTotal * config.quantity;
  const rushFee = config.rushOrder ? subtotal * 0.25 : 0;
  const finalTotalFCFA = Math.round(subtotal + rushFee);
  const bothFinal = formatExactBoth(finalTotalFCFA);

  const saveQuoteToErp = () => {
    addOrder({
      clientName: clientName.trim() || 'Client Studio Sur-Mesure',
      clientPhone: clientPhone.trim() || '+221 (Non renseigné)',
      clientEmail: clientEmail.trim() || undefined,
      city: 'Atelier Sur-Mesure (À confirmer)',
      items: [
        {
          title: `Devis Atelier (${quoteNumber}) — ${config.customTitle || config.eventType}`,
          quantity: config.quantity,
          unitPriceFCFA: unitTotal,
          options: `${config.paperType} • ${config.inkType} • ${config.calligraphyStyle}`
        }
      ],
      totalFCFA: finalTotalFCFA,
      currencyUsed: currency,
      offerType: config.eventType === 'tableau' ? 'tableau' : config.eventType === 'writiclove' ? 'writiclove' : 'atelier',
      questionType: 'Demande de devis Atelier Sur-Mesure',
      status: 'nouveau',
      paymentMethod: 'Wave',
      paymentStatus: 'en_attente',
      customMessage: config.customMessage,
      notes: `Devis : ${quoteNumber} | Devise : ${currency}`
    });
  };

  const handleSendWhatsApp = () => {
    atelierAudio.playWaxStamp();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E68314', '#231B26', '#25D366']
    });

    if (!isSent) {
      saveQuoteToErp();
    }

    const message = [
      `Bonjour l'Atelier WriticArt ! ✨`,
      ``,
      `Je souhaite valider ce devis (${quoteNumber}) :`,
      `- Client : ${clientName || 'Client'} (${clientPhone || 'Non renseigné'})`,
      `- Email : ${clientEmail || 'Non renseigné'}`,
      `- Création : ${config.eventType} (${config.quantity} pièce(s))`,
      `- Titre : ${config.customTitle}`,
      `- Message : ${config.customMessage}`,
      `- Total estimé : ${bothFinal.fcfa} (${bothFinal.eur}) (Monnaie choisie : ${currency})`
    ].join('\n');

    window.open(`https://wa.me/221772348521?text=${encodeURIComponent(message)}`, '_blank');
    setIsSent(true);
  };

  const handleRecordOnly = () => {
    if (!isSent) {
      saveQuoteToErp();
      setIsSent(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] dark:bg-[#181716] rounded-3xl max-w-4xl w-full border border-[#DED4C3] dark:border-[#2E2A26] shadow-2xl overflow-hidden my-8 relative transition-colors duration-300">
        {/* Header bar */}
        <div className="bg-[#231B26] text-[#FAF8F5] px-6 sm:px-8 py-5 flex items-center justify-between border-b border-[#C5A059]/40">
          <div className="flex items-center space-x-3">
            <img
              src={logoDark}
              alt="WriticArt Logo"
              className="h-10 w-auto object-contain rounded"
            />
            <div>
              <span className="font-['Cormorant_Garamond'] text-xl font-semibold tracking-wide">
                {tr('WriticArt — Devis Officiel d’Atelier', 'WriticArt — Official Workshop Quote')}
              </span>
              <span className="block text-[10px] text-[#E68314] font-['Cinzel'] uppercase tracking-widest">
                {quoteNumber} • {today} • Dakar, Sénégal
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              aria-label={tr('Imprimer', 'Print')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={tr('Imprimer ou enregistrer en PDF', 'Print or save as PDF')}
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              aria-label={tr('Fermer', 'Close')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Workshop Official Coordinates */}
          <div className="p-4 rounded-2xl bg-[#FFF8F0] dark:bg-[#1E1B18] border border-[#E68314]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#554C43] dark:text-[#C5BCB2]">
            <div>
              <strong className="text-[#181716] dark:text-[#FAF8F5] block font-['Cinzel']">
                WriticArt — « {tr('Les écrits restent', 'Words that stay')} »
              </strong>
              <span>Dakar, Sénégal &amp; France / International</span>
            </div>
            <div className="sm:text-right space-y-0.5">
              <p>
                Email :{' '}
                <a href="mailto:kaynubind@gmail.com" className="font-semibold text-[#B86209] dark:text-[#E68314] underline">
                  kaynubind@gmail.com
                </a>
              </p>
              <p>
                WhatsApp :{' '}
                <a href="https://wa.me/221772348521" className="font-semibold text-[#25D366]">
                  +221 77 234 85 21
                </a>
              </p>
            </div>
          </div>

          {/* Success Banner */}
          {isSent && (
            <div
              role="status"
              aria-live="polite"
              className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center space-x-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold block">
                  {tr('Demande de devis enregistrée ! Vous serez contacté(e) par la suite.', 'Quote request saved! You will be contacted shortly.')}
                </span>
                <span>
                  {tr(
                    `Référence : ${quoteNumber} • Monnaie enregistrée : ${currency}`,
                    `Reference: ${quoteNumber} • Currency saved: ${currency}`
                  )}
                </span>
              </div>
            </div>
          )}

          {/* Client Information Form */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-[#E8DFD1] dark:border-[#2E2A26]">
            <div>
              <label className="block text-[11px] uppercase font-['Cinzel'] tracking-wider text-[#B86209] font-bold mb-1">
                {tr('Prénom / Nom *', 'Full Name *')}
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex : Mariama Diallo"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DED4C3] dark:border-[#38332E] text-sm bg-white dark:bg-[#121110] text-[#181716] dark:text-[#FAF8F5] focus:outline-none focus:border-[#E68314]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-['Cinzel'] tracking-wider text-[#B86209] font-bold mb-1">
                {tr('Email de Contact *', 'Email *')}
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="mariama@exemple.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DED4C3] dark:border-[#38332E] text-sm bg-white dark:bg-[#121110] text-[#181716] dark:text-[#FAF8F5] focus:outline-none focus:border-[#E68314]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-['Cinzel'] tracking-wider text-[#B86209] font-bold mb-1">
                {tr('Téléphone (WhatsApp) *', 'Phone (WhatsApp) *')}
              </label>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="+221 77 ..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DED4C3] dark:border-[#38332E] text-sm bg-white dark:bg-[#121110] text-[#181716] dark:text-[#FAF8F5] focus:outline-none focus:border-[#E68314]"
              />
            </div>
          </div>

          {/* Itemized Table Breakdown */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-[#E0D5C3] dark:border-[#2E2A26] text-[#B86209] font-['Cinzel'] uppercase tracking-wider">
                  <th className="pb-3 font-bold">{tr('Désignation de la création', 'Artwork Item')}</th>
                  <th className="pb-3 text-center font-bold">{tr('Qté', 'Qty')}</th>
                  <th className="pb-3 text-right font-bold">{tr('Prix Unitaire', 'Unit Price')}</th>
                  <th className="pb-3 text-right font-bold">{tr('Total', 'Total')} ({currency})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE7DA] dark:divide-[#2E2A26] text-[#3D3731] dark:text-[#D5CCC2]">
                <tr>
                  <td className="py-3">
                    <span className="font-semibold text-[#181716] dark:text-[#FAF8F5] block">
                      {tr('Création WriticArt', 'WriticArt Creation')} ({config.eventType.toUpperCase()})
                    </span>
                    <span className="text-[11px] text-[#8C8074] dark:text-[#9E9488]">
                      « {config.customTitle || tr('Création Personnalisée', 'Custom Artwork')} »
                    </span>
                  </td>
                  <td className="py-3 text-center">{config.quantity}</td>
                  <td className="py-3 text-right">{formatPrice(baseUnitFCFA)}</td>
                  <td className="py-3 text-right font-medium">{formatPrice(baseUnitFCFA * config.quantity)}</td>
                </tr>

                {paperExtra > 0 && (
                  <tr>
                    <td className="py-3">
                      <span className="font-medium text-[#181716] dark:text-[#FAF8F5] block">
                        {tr('Finition Support Noble', 'Fine Paper Finish')} ({config.paperType})
                      </span>
                    </td>
                    <td className="py-3 text-center">{config.quantity}</td>
                    <td className="py-3 text-right">{formatPrice(paperExtra)}</td>
                    <td className="py-3 text-right font-medium">{formatPrice(paperExtra * config.quantity)}</td>
                  </tr>
                )}

                {inkExtra > 0 && (
                  <tr>
                    <td className="py-3">
                      <span className="font-medium text-[#181716] dark:text-[#FAF8F5] block">
                        {tr('Pigments Précieux', 'Specialty Ink')} ({config.inkType})
                      </span>
                    </td>
                    <td className="py-3 text-center">{config.quantity}</td>
                    <td className="py-3 text-right">{formatPrice(inkExtra)}</td>
                    <td className="py-3 text-right font-medium">{formatPrice(inkExtra * config.quantity)}</td>
                  </tr>
                )}

                {config.hasWaxSeal && (
                  <tr>
                    <td className="py-3">
                      <span className="font-medium text-[#181716] dark:text-[#FAF8F5] block">
                        {tr('Sceau de Cire d’Atelier', 'Workshop Wax Seal')} ({config.waxColor})
                      </span>
                    </td>
                    <td className="py-3 text-center">{config.quantity}</td>
                    <td className="py-3 text-right">{formatPrice(sealExtra)}</td>
                    <td className="py-3 text-right font-medium">{formatPrice(sealExtra * config.quantity)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="pt-4 border-t border-[#E8DFD1] dark:border-[#2E2A26] flex flex-col items-end space-y-2">
            <div className="w-full sm:w-80 space-y-1.5 text-xs text-[#5F5851] dark:text-[#A8A096]">
              <div className="flex justify-between">
                <span>{tr('Sous-total :', 'Subtotal:')}</span>
                <span className="font-medium text-[#181716] dark:text-[#FAF8F5]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#181716] dark:text-[#FAF8F5] pt-2 border-t border-[#E8DFD1] dark:border-[#2E2A26]">
                <span>{tr('Total Estimé :', 'Estimated Total:')}</span>
                <span className="text-[#B86209] dark:text-[#E68314] font-['Cormorant_Garamond'] text-2xl font-bold">
                  {formatPrice(finalTotalFCFA)}
                </span>
              </div>
              <div className="text-right text-[11px] text-[#8C8074] dark:text-[#9E9488]">
                {bothFinal.fcfa} • {bothFinal.eur} (1 EUR = 655,957 FCFA)
              </div>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="pt-6 border-t border-[#E8DFD1] dark:border-[#2E2A26] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs text-[#7A7167] dark:text-[#A8A096]">
              <ShieldCheck className="w-4 h-4 text-[#E68314]" />
              <span>{tr('Validation par photo avant expédition.', 'Photo approval before dispatch.')}</span>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleRecordOnly}
                className="px-5 py-3 rounded-full border border-[#DED4C3] dark:border-[#38332E] text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:border-[#E68314]"
              >
                {tr('Enregistrer la demande', 'Save Quote Request')}
              </button>

              <button
                onClick={handleSendWhatsApp}
                className="px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp (+221 77 234 85 21)</span>
              </button>

              <a
                href={`mailto:kaynubind@gmail.com?subject=${encodeURIComponent(`Devis ${quoteNumber}`)}&body=${encodeURIComponent(`Bonjour WriticArt,\nDevis ${quoteNumber} — Total : ${bothFinal.fcfa} (${bothFinal.eur})`)}`}
                className="px-5 py-3 rounded-full bg-[#231B26] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#E68314] transition-all flex items-center justify-center space-x-2 shadow-md"
              >
                <Send className="w-4 h-4 text-[#E68314]" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
