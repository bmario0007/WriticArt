import React, { useState } from 'react';
import { X, Copy, Check, PhoneCall, QrCode, ShieldCheck } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { atelierAudio } from '../../utils/soundEffects';

interface WavePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalFCFA: number;
  customerName?: string;
}

export const WavePaymentModal: React.FC<WavePaymentModalProps> = ({
  isOpen,
  onClose,
  totalFCFA,
  customerName
}) => {
  const { formatPrice, currency } = useCurrency();
  const [method, setMethod] = useState<'wave' | 'om'>('wave');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const PHONE_NUMBER = '+221 77 234 85 21';
  const RAW_PHONE = '221772348521';

  const handleCopy = () => {
    navigator.clipboard.writeText(PHONE_NUMBER);
    setCopied(true);
    atelierAudio.playGoldChime();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendProofWhatsApp = () => {
    atelierAudio.playWaxStamp();
    const text = `Bonjour l'Atelier WriticArt ! ✨%0A%0AJ'ai initié mon paiement par *${method === 'wave' ? 'Wave' : 'Orange Money'}*%0A💰 Montant : *${totalFCFA.toLocaleString('fr-FR')} FCFA*%0A${customerName ? `👤 Nom du payeur : *${customerName}*%0A` : ''}%0AVoici la capture de confirmation pour validation et expédition de ma commande. Merci !`;
    window.open(`https://wa.me/${RAW_PHONE}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex justify-center items-center">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-[#FAF8F5] dark:bg-[#161412] text-[#181716] dark:text-[#FAF8F5] rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] shadow-2xl p-6 sm:p-8 space-y-6 z-10 font-sans">
        
        {/* Top close */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD1] dark:border-[#2E2A26]">
          <div className="flex items-center space-x-2">
            <span className="font-['Cinzel'] text-xs font-bold uppercase tracking-widest text-[#B86209] dark:text-[#E68314]">
              Paiement Sénégal
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#8C8074]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Method selector tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#EFE8DC]/80 dark:bg-[#1E1C1A] rounded-2xl border border-[#DED4C3] dark:border-[#38332E]">
          <button
            type="button"
            onClick={() => setMethod('wave')}
            className={`py-2.5 rounded-xl text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
              method === 'wave'
                ? 'bg-[#1CA0F2] text-white shadow-md'
                : 'text-[#685F56] dark:text-[#A8A096] hover:text-[#181716] dark:hover:text-white'
            }`}
          >
            <span>🌊 Wave Sénégal</span>
          </button>

          <button
            type="button"
            onClick={() => setMethod('om')}
            className={`py-2.5 rounded-xl text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
              method === 'om'
                ? 'bg-[#FF7900] text-white shadow-md'
                : 'text-[#685F56] dark:text-[#A8A096] hover:text-[#181716] dark:hover:text-white'
            }`}
          >
            <span>🟠 Orange Money</span>
          </button>
        </div>

        {/* Amount to Pay Callout */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1E1C1A] border border-[#E8DFD1] dark:border-[#2E2A26] text-center space-y-1">
          <span className="text-[10px] text-[#8C8074] uppercase font-['Cinzel'] block">Montant exact à transférer</span>
          <p className="font-['Cormorant_Garamond'] text-3xl font-bold text-[#E68314]">
            {totalFCFA.toLocaleString('fr-FR')} FCFA
          </p>
          {currency !== 'FCFA' && (
            <p className="text-xs text-[#8C8074]">
              (Équivalent affiché : {formatPrice(totalFCFA)})
            </p>
          )}
        </div>

        {/* Recipient Details & Copy */}
        <div className="p-4 rounded-2xl bg-[#FFF8F0] dark:bg-[#1C1814] border border-[#E68314]/30 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8C8074]">Bénéficiaire :</span>
            <strong className="font-['Cinzel'] text-[#181716] dark:text-white">Atelier WriticArt</strong>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E68314]/20">
            <span className="text-[#8C8074]">Numéro Marchand :</span>
            <div className="flex items-center space-x-2">
              <strong className="font-mono text-sm text-[#181716] dark:text-white">{PHONE_NUMBER}</strong>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-white dark:bg-[#2A2622] border border-[#DED4C3] dark:border-[#38332E] hover:border-[#E68314] text-[#8C8074] hover:text-[#E68314] transition-colors"
                title="Copier le numéro"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-2 text-xs text-[#70675E] dark:text-[#A8A096]">
          <h4 className="font-['Cinzel'] text-[11px] font-bold uppercase text-[#181716] dark:text-white flex items-center space-x-1.5">
            <QrCode className="w-3.5 h-3.5 text-[#E68314]" />
            <span>Instructions de règlement en 3 étapes :</span>
          </h4>
          <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-relaxed">
            <li>Ouvrez votre application <strong>{method === 'wave' ? 'Wave' : 'Orange Money'}</strong> sur votre téléphone.</li>
            <li>Transférez le montant de <strong>{totalFCFA.toLocaleString('fr-FR')} FCFA</strong> vers <strong>{PHONE_NUMBER}</strong>.</li>
            <li>Cliquez sur le bouton ci-dessous pour nous envoyer votre capture de paiement sur WhatsApp pour expédition immédiate.</li>
          </ol>
        </div>

        {/* Confirm on WhatsApp */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleSendProofWhatsApp}
            className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <PhoneCall className="w-4 h-4" />
            <span>J'ai Payé : Envoyer la Preuve sur WhatsApp</span>
          </button>

          <p className="text-[10px] text-center text-[#8C8074] flex items-center justify-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-[#E68314]" />
            <span>Validation immédiate par l'artisan • Expédition sous 24h</span>
          </p>
        </div>

      </div>
    </div>
  );
};
