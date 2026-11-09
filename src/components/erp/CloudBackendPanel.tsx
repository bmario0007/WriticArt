import React, { useState } from 'react';
import {
  Cloud,
  MailCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Copy,
  Check,
  Download,
  Send,
  UploadCloud,
  Sparkles
} from 'lucide-react';
import { useErp } from '../../context/ErpContext';
import {
  buildEnvSnippet,
  hasEnvCloudDefaults,
  pingAppsScriptBackend,
  testAppsScriptEmailBackend,
  testWeb3FormsConnection
} from '../../services/backendService';
import appsScriptCode from '../../../backend/writicart-apps-script.gs?raw';

export const CloudBackendPanel: React.FC = () => {
  const {
    cloudConfig,
    updateCloudConfig,
    resetCloudConfig,
    cloudSync,
    pullAdminFromCloud,
    pushCmsToCloud,
    retryUnsyncedOrders,
    unsyncedOrdersCount
  } = useErp();

  const [appsScriptUrl, setAppsScriptUrl] = useState(cloudConfig.appsScriptUrl);
  const [web3formsKey, setWeb3formsKey] = useState(cloudConfig.web3formsKey);
  const [adminEmail, setAdminEmail] = useState(cloudConfig.adminEmail);
  const [autoSyncPublicCms, setAutoSyncPublicCms] = useState(cloudConfig.autoSyncPublicCms);
  const [autoSyncOrdersOnAdminOpen, setAutoSyncOrdersOnAdminOpen] = useState(
    cloudConfig.autoSyncOrdersOnAdminOpen
  );

  const [statusFeedback, setStatusFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);

  const getCurrentPin = () => {
    return (
      sessionStorage.getItem('writicart_admin_session_pin') ||
      localStorage.getItem('writicart_admin_pin') ||
      '1234'
    );
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateCloudConfig({
      appsScriptUrl,
      web3formsKey,
      adminEmail,
      autoSyncPublicCms,
      autoSyncOrdersOnAdminOpen
    });
    setStatusFeedback({
      type: 'success',
      text: 'Configuration Cloud enregistrée dans ce navigateur. Testez la connexion ou exportez le .env.local pour tous les visiteurs.'
    });
  };

  const handleTestWeb3Forms = async () => {
    if (!web3formsKey.trim()) {
      setStatusFeedback({ type: 'error', text: 'Renseignez d’abord votre Access Key Web3Forms.' });
      return;
    }
    setIsTesting(true);
    setStatusFeedback({ type: 'info', text: 'Envoi d’un email test via Web3Forms...' });
    const res = await testWeb3FormsConnection(web3formsKey, adminEmail);
    setIsTesting(false);
    setStatusFeedback(
      res.ok
        ? { type: 'success', text: `Email test envoyé avec succès via Web3Forms (${adminEmail}) !` }
        : { type: 'error', text: `Échec Web3Forms : ${res.error || 'Vérifiez la clé'}` }
    );
  };

  const handleTestAppsScript = async () => {
    if (!appsScriptUrl.trim()) {
      setStatusFeedback({ type: 'error', text: 'Renseignez d’abord l’URL Web App Google Apps Script.' });
      return;
    }
    setIsTesting(true);
    setStatusFeedback({ type: 'info', text: 'Vérification de Google Apps Script (Ping + Test Email)...' });
    const ping = await pingAppsScriptBackend(appsScriptUrl);
    if (!ping.ok) {
      setIsTesting(false);
      setStatusFeedback({
        type: 'error',
        text: `Ping échoué : ${ping.error || 'URL inaccessible ou accès non réglé sur "Tout le monde"'}`
      });
      return;
    }
    const mailRes = await testAppsScriptEmailBackend(getCurrentPin(), appsScriptUrl, adminEmail);
    setIsTesting(false);
    setStatusFeedback(
      mailRes.ok
        ? {
            type: 'success',
            text: `Google Apps Script connecté ✓ Un email test vient d’être envoyé vers ${mailRes.sentTo || adminEmail}.`
          }
        : {
            type: 'info',
            text: `Ping réussi ✓ Attention pour l’email test : ${mailRes.error || 'vérifiez le PIN administrateur.'}`
          }
    );
  };

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(appsScriptCode);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2500);
    } catch {
      setStatusFeedback({ type: 'error', text: 'Impossible de copier dans le presse-papiers.' });
    }
  };

  const handleDownloadScript = () => {
    const blob = new Blob([appsScriptCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'writicart-apps-script.gs';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyEnv = async () => {
    const snippet = buildEnvSnippet({
      appsScriptUrl,
      web3formsKey,
      adminEmail,
      autoSyncPublicCms,
      autoSyncOrdersOnAdminOpen
    });
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedEnv(true);
      setTimeout(() => setCopiedEnv(false), 2500);
    } catch {
      setStatusFeedback({ type: 'error', text: 'Impossible de copier le bloc .env.' });
    }
  };

  const isGasConnected = Boolean(cloudConfig.appsScriptUrl);
  const isWeb3Connected = Boolean(cloudConfig.web3formsKey);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-[#181716] rounded-3xl p-6 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074]">
              Google Sheets + Apps Script
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                isGasConnected
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              {isGasConnected ? 'Connecté ✓' : 'À configurer'}
            </span>
          </div>
          <p className="text-xs text-[#6B6156] dark:text-[#A8A096] leading-relaxed">
            Centralise commandes, clients CRM, articles WordPress, catalogue et suivi commande public entre tous les appareils.
          </p>
        </div>

        <div className="bg-white dark:bg-[#181716] rounded-3xl p-6 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074]">
              Email Auto (Web3Forms)
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                isWeb3Connected
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              {isWeb3Connected ? 'Actif ✓' : 'Optionnel / Conseillé'}
            </span>
          </div>
          <p className="text-xs text-[#6B6156] dark:text-[#A8A096] leading-relaxed">
            Envoie un email instantané vers <strong>{cloudConfig.adminEmail}</strong> dès qu’un client clique sur Valider (en double sécurité avec Gmail Apps Script).
          </p>
        </div>

        <div className="bg-white dark:bg-[#181716] rounded-3xl p-6 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-['Cinzel'] uppercase font-bold text-[#8C8074]">
              File de Synchronisation
            </span>
            <span className="font-['Cinzel'] font-bold text-sm text-[#E68314]">
              {unsyncedOrdersCount} en attente
            </span>
          </div>
          <p className="text-xs text-[#6B6156] dark:text-[#A8A096] leading-relaxed">
            {cloudSync.lastSyncAt
              ? `Dernière synchro réussie : ${cloudSync.lastSyncAt}`
              : hasEnvCloudDefaults()
              ? 'Clés globales détectées dans le build (.env).'
              : 'Aucune synchro cloud effectuée pour l’instant.'}
          </p>
          {unsyncedOrdersCount > 0 && (isGasConnected || isWeb3Connected) && (
            <button
              type="button"
              disabled={cloudSync.isSyncing}
              onClick={() => void retryUnsyncedOrders()}
              className="mt-1 inline-flex items-center space-x-1.5 text-[11px] font-['Cinzel'] font-bold text-[#B86209] dark:text-[#E68314] hover:underline"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Renvoyer les commandes en attente</span>
            </button>
          )}
        </div>
      </div>

      {/* Sync Actions Bar */}
      <div className="bg-[#231B26] text-[#FAF8F5] rounded-3xl p-6 border border-[#C5A059]/40 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-[11px] font-['Cinzel'] uppercase tracking-wider text-[#E68314] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Synchronisation Atelier ↔ Google Sheets</span>
          </div>
          <p className="text-xs text-[#D3C7D6]">
            Récupérez les dernières commandes clients passées sur mobile ou publiez vos modifications CMS (produits, articles, Hero) pour tout le monde.
          </p>
          {cloudSync.message && (
            <p className="text-xs text-emerald-400 font-medium pt-1">✓ {cloudSync.message}</p>
          )}
          {cloudSync.error && (
            <p className="text-xs text-red-400 font-medium pt-1">⚠ {cloudSync.error}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            type="button"
            disabled={!isGasConnected || cloudSync.isSyncing}
            onClick={() => void pullAdminFromCloud(getCurrentPin())}
            className="px-4 py-2.5 rounded-full bg-white text-[#181716] hover:bg-[#FAF8F5] disabled:opacity-50 text-xs font-['Cinzel'] font-bold uppercase tracking-wider flex items-center space-x-2 shadow"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${cloudSync.isSyncing ? 'animate-spin' : ''}`} />
            <span>Importer Commandes</span>
          </button>

          <button
            type="button"
            disabled={!isGasConnected || cloudSync.isSyncing}
            onClick={() => void pushCmsToCloud(getCurrentPin())}
            className="px-4 py-2.5 rounded-full bg-[#E68314] hover:bg-[#C46A0B] disabled:opacity-50 text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider flex items-center space-x-2 shadow"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Publier CMS & Prix</span>
          </button>
        </div>
      </div>

      {/* Credentials Form */}
      <form
        onSubmit={handleSaveConfig}
        className="bg-white dark:bg-[#181716] rounded-3xl p-6 sm:p-8 border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm space-y-6"
      >
        <div className="flex items-center space-x-3 border-b border-[#E8DFD1] dark:border-[#2E2A26] pb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF8F0] dark:bg-[#201D1A] border border-[#E68314]/30 flex items-center justify-center text-[#E68314]">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">
              Paramètres de Connexion Cloud & Notifications
            </h3>
            <p className="text-xs text-[#8C8074]">
              Testez en direct depuis votre navigateur, puis copiez la config `.env.local` pour activer pour tous vos clients.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="cloud-gas-url" className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
              URL Web App Google Apps Script (Base Google Sheets + Email Gmail)
            </label>
            <input
              id="cloud-gas-url"
              type="url"
              value={appsScriptUrl}
              onChange={(e) => setAppsScriptUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/AKfycb.../exec"
              className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs font-mono focus:outline-none focus:border-[#E68314]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cloud-web3-key" className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                Access Key Web3Forms (gratuite sur web3forms.com)
              </label>
              <input
                id="cloud-web3-key"
                type="text"
                value={web3formsKey}
                onChange={(e) => setWeb3formsKey(e.target.value)}
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-xs font-mono focus:outline-none focus:border-[#E68314]"
              />
            </div>

            <div>
              <label htmlFor="cloud-admin-email" className="block text-[11px] font-['Cinzel'] uppercase font-bold text-[#70675E] dark:text-[#A8A096] mb-1.5">
                Email Atelier Destinataire des Alertes
              </label>
              <input
                id="cloud-admin-email"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="kaynubind@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-[#DED4C3] dark:border-[#38332E] dark:bg-[#121110] text-sm focus:outline-none focus:border-[#E68314]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <label className="flex items-center space-x-2.5 text-xs p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8DFD1] dark:border-[#2E2A26] cursor-pointer">
              <input
                type="checkbox"
                checked={autoSyncPublicCms}
                onChange={(e) => setAutoSyncPublicCms(e.target.checked)}
                className="accent-[#E68314] w-4 h-4"
              />
              <span>Charger automatiquement le CMS public depuis Google Sheets</span>
            </label>

            <label className="flex items-center space-x-2.5 text-xs p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#141312] border border-[#E8DFD1] dark:border-[#2E2A26] cursor-pointer">
              <input
                type="checkbox"
                checked={autoSyncOrdersOnAdminOpen}
                onChange={(e) => setAutoSyncOrdersOnAdminOpen(e.target.checked)}
                className="accent-[#E68314] w-4 h-4"
              />
              <span>Importer les nouvelles commandes à l’ouverture de l’ERP</span>
            </label>
          </div>
        </div>

        {statusFeedback && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-start space-x-2 border ${
              statusFeedback.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : statusFeedback.type === 'error'
                ? 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800 text-red-800 dark:text-red-300'
                : 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-300'
            }`}
          >
            {statusFeedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <span>{statusFeedback.text}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-[#181716] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#E68314] hover:text-white transition-colors shadow"
          >
            Enregistrer dans l’Atelier
          </button>

          <button
            type="button"
            disabled={isTesting}
            onClick={() => void handleTestAppsScript()}
            className="px-5 py-2.5 rounded-full border border-[#DED4C3] dark:border-[#38332E] hover:border-[#E68314] text-xs font-['Cinzel'] font-bold uppercase tracking-wider flex items-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5 text-[#E68314]" />
            <span>Tester Apps Script</span>
          </button>

          <button
            type="button"
            disabled={isTesting}
            onClick={() => void handleTestWeb3Forms()}
            className="px-5 py-2.5 rounded-full border border-[#DED4C3] dark:border-[#38332E] hover:border-[#E68314] text-xs font-['Cinzel'] font-bold uppercase tracking-wider flex items-center space-x-1.5"
          >
            <MailCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tester Email Web3Forms</span>
          </button>

          <button
            type="button"
            onClick={() => {
              resetCloudConfig();
              setStatusFeedback({ type: 'info', text: 'Paramètres réinitialisés aux variables .env.' });
            }}
            className="px-4 py-2.5 rounded-full text-xs text-[#8C8074] hover:text-red-500 ml-auto"
          >
            Réinitialiser
          </button>
        </div>
      </form>

      {/* Setup Helper: Copy .gs + Export .env */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#181716] rounded-3xl p-6 border border-[#E8DFD1] dark:border-[#2E2A26] space-y-4">
          <h4 className="font-['Cormorant_Garamond'] text-2xl font-bold">
            1. Script Google Apps Script prêt à coller
          </h4>
          <p className="text-xs text-[#6B6156] dark:text-[#A8A096] leading-relaxed">
            Créez un Google Sheet → <strong>Extensions → Apps Script</strong> → collez ce code puis cliquez sur <strong>Déployer → Application Web (Accès : Tout le monde)</strong>. Le script crée automatiquement vos 6 onglets et envoie les emails HTML sur Gmail.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void handleCopyScript()}
              className="px-4 py-2.5 rounded-full bg-[#231B26] text-white hover:bg-[#E68314] text-xs font-['Cinzel'] font-bold uppercase tracking-wider flex items-center space-x-1.5"
            >
              {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedScript ? 'Script copié !' : 'Copier le Code (.gs)'}</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadScript}
              className="px-4 py-2.5 rounded-full border border-[#DED4C3] dark:border-[#38332E] hover:border-[#E68314] text-xs font-['Cinzel'] font-bold uppercase tracking-wider flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger `.gs`</span>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#181716] rounded-3xl p-6 border border-[#E8DFD1] dark:border-[#2E2A26] space-y-4">
          <h4 className="font-['Cormorant_Garamond'] text-2xl font-bold">
            2. Activer pour tous les visiteurs (`.env.local`)
          </h4>
          <p className="text-xs text-[#6B6156] dark:text-[#A8A096] leading-relaxed">
            Les réglages ci-dessus fonctionnent dans ce navigateur. Pour que <strong>chaque client sur GitHub Pages</strong> enregistre ses commandes dans votre Sheet et déclenche vos emails, placez ce fichier <code>.env.local</code> puis redéployez le build :
          </p>
          <pre className="p-3 rounded-xl bg-[#121110] text-[#F3D69B] text-[10px] font-mono overflow-x-auto">
            {buildEnvSnippet({
              appsScriptUrl,
              web3formsKey,
              adminEmail,
              autoSyncPublicCms,
              autoSyncOrdersOnAdminOpen
            })}
          </pre>
          <button
            type="button"
            onClick={() => void handleCopyEnv()}
            className="px-4 py-2.5 rounded-full border border-[#DED4C3] dark:border-[#38332E] hover:border-[#E68314] text-xs font-['Cinzel'] font-bold uppercase tracking-wider flex items-center space-x-1.5"
          >
            {copiedEnv ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedEnv ? 'Bloc .env.local copié !' : 'Copier le fichier .env.local'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
