import React from 'react';
import { Cloud, MailCheck, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { OrderDispatchInfo } from '../types';

interface OrderDispatchBadgesProps {
  dispatch?: OrderDispatchInfo;
}

export const OrderDispatchBadges: React.FC<OrderDispatchBadgesProps> = ({ dispatch }) => {
  const { tr } = useLanguage();
  if (!dispatch) return null;

  const hasCloudSuccess = dispatch.emailSent || dispatch.sheetSynced;

  return (
    <div className="pt-2 space-y-2">
      {hasCloudSuccess ? (
        <div className="flex flex-wrap gap-2">
          {dispatch.emailSent && (
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-semibold shadow-sm">
              <MailCheck className="w-3.5 h-3.5" />
              <span>
                {tr('Email envoyé automatiquement à l’atelier', 'Automatic email sent to WriticArt')}
              </span>
            </span>
          )}
          {dispatch.sheetSynced && (
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#231B26] text-[#F3D69B] border border-[#C5A059]/40 text-[11px] font-semibold shadow-sm">
              <Cloud className="w-3.5 h-3.5 text-[#E68314]" />
              <span>
                {tr('Synchronisée sur Google Sheets', 'Saved to Google Sheets')}
              </span>
            </span>
          )}
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/70 flex items-start space-x-2 text-[11px] text-amber-900 dark:text-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <span>
            {tr(
              'Demande enregistrée sur cet appareil. Pour une prise en charge immédiate tant que l’envoi cloud est hors-ligne, envoyez également le récapitulatif ci-dessous via WhatsApp ou Email.',
              'Request saved locally on this device. For immediate confirmation while cloud relay is offline, please also click WhatsApp or Email below.'
            )}
          </span>
        </div>
      )}
    </div>
  );
};
