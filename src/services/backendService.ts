import type {
  ArticlePost,
  CatalogProduct,
  CloudBackendConfig,
  ErpClient,
  ErpOrder,
  InventoryItem,
  OrderDispatchInfo,
  OrderStatus,
  SiteSettings
} from '../types';

const CLOUD_CONFIG_KEY = 'writicart_cloud_config_v1';

const ENV_DEFAULTS: CloudBackendConfig = {
  appsScriptUrl: (import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined)?.trim() || '',
  web3formsKey: (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined)?.trim() || '',
  adminEmail: (import.meta.env.VITE_ADMIN_EMAIL as string | undefined)?.trim() || 'kaynubind@gmail.com',
  autoSyncPublicCms: true,
  autoSyncOrdersOnAdminOpen: true
};

export function getCloudConfig(): CloudBackendConfig {
  try {
    const raw = localStorage.getItem(CLOUD_CONFIG_KEY);
    if (!raw) return { ...ENV_DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<CloudBackendConfig>;
    return {
      appsScriptUrl: parsed.appsScriptUrl !== undefined ? String(parsed.appsScriptUrl).trim() : ENV_DEFAULTS.appsScriptUrl,
      web3formsKey: parsed.web3formsKey !== undefined ? String(parsed.web3formsKey).trim() : ENV_DEFAULTS.web3formsKey,
      adminEmail: parsed.adminEmail !== undefined && parsed.adminEmail.trim()
        ? parsed.adminEmail.trim()
        : ENV_DEFAULTS.adminEmail,
      autoSyncPublicCms: parsed.autoSyncPublicCms ?? ENV_DEFAULTS.autoSyncPublicCms,
      autoSyncOrdersOnAdminOpen: parsed.autoSyncOrdersOnAdminOpen ?? ENV_DEFAULTS.autoSyncOrdersOnAdminOpen
    };
  } catch {
    return { ...ENV_DEFAULTS };
  }
}

export function saveCloudConfig(config: CloudBackendConfig): CloudBackendConfig {
  const normalized: CloudBackendConfig = {
    appsScriptUrl: config.appsScriptUrl.trim(),
    web3formsKey: config.web3formsKey.trim(),
    adminEmail: config.adminEmail.trim() || 'kaynubind@gmail.com',
    autoSyncPublicCms: Boolean(config.autoSyncPublicCms),
    autoSyncOrdersOnAdminOpen: Boolean(config.autoSyncOrdersOnAdminOpen)
  };
  try {
    localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(normalized));
  } catch {
    // ignore storage quota errors
  }
  return normalized;
}

export function resetCloudConfigToEnv(): CloudBackendConfig {
  try {
    localStorage.removeItem(CLOUD_CONFIG_KEY);
  } catch {
    // ignore
  }
  return { ...ENV_DEFAULTS };
}

export function hasEnvCloudDefaults(): boolean {
  return Boolean(ENV_DEFAULTS.appsScriptUrl || ENV_DEFAULTS.web3formsKey);
}

export function buildEnvSnippet(config: CloudBackendConfig): string {
  return [
    '# À enregistrer dans .env.local à la racine puis lancer : npm run build && npx gh-pages -d dist',
    `VITE_APPS_SCRIPT_URL=${config.appsScriptUrl || 'https://script.google.com/macros/s/VOTRE_ID/exec'}`,
    `VITE_WEB3FORMS_KEY=${config.web3formsKey || 'votre-cle-web3forms'}`,
    `VITE_ADMIN_EMAIL=${config.adminEmail || 'kaynubind@gmail.com'}`
  ].join('\n');
}

function buildPlainOrderSummary(order: ErpOrder): string {
  const itemsText = order.items
    .map(
      (i) =>
        `• ${i.title} (x${i.quantity}) — ${i.unitPriceFCFA.toLocaleString('fr-FR')} FCFA` +
        (i.options ? ` [${i.options}]` : '')
    )
    .join('\n');

  return [
    `Nouvelle commande WriticArt (${order.id})`,
    `Client : ${order.clientName}`,
    `Téléphone : ${order.clientPhone}`,
    `Email : ${order.clientEmail || '-'}`,
    `Adresse / Pays : ${order.city}`,
    `Offre : ${order.offerType || 'boutique'}${order.isPreorder ? ' (PRÉCOMMANDE)' : ''}`,
    order.questionType ? `Demande : ${order.questionType}` : '',
    order.deliveryType ? `Livraison : ${order.deliveryType}` : '',
    order.theme ? `Thème : ${order.theme}` : '',
    order.tableauFormula ? `Formule : ${order.tableauFormula}` : '',
    order.tableauSize ? `Taille : ${order.tableauSize}` : '',
    order.parfumChoice ? `Parfum : ${order.parfumChoice}` : '',
    `Paiement : ${order.paymentMethod}`,
    `Total : ${order.totalFCFA.toLocaleString('fr-FR')} FCFA (devise client : ${order.currencyUsed || 'FCFA'})`,
    order.customMessage ? `Message / Acrostiche :\n${order.customMessage}` : '',
    order.notes ? `Notes : ${order.notes}` : '',
    '',
    'Articles :',
    itemsText
  ]
    .filter(Boolean)
    .join('\n');
}

async function sendViaWeb3Forms(
  accessKey: string,
  order: ErpOrder
): Promise<{ ok: boolean; error?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `✨ Commande WriticArt ${order.id} — ${order.clientName} (${order.totalFCFA.toLocaleString('fr-FR')} FCFA)`,
        from_name: 'Atelier WriticArt Site',
        name: order.clientName,
        email: order.clientEmail || getCloudConfig().adminEmail,
        phone: order.clientPhone,
        reference: order.id,
        offer_type: order.offerType || 'boutique',
        city_country: order.city,
        delivery_type: order.deliveryType || '-',
        payment_method: order.paymentMethod,
        total_fcfa: `${order.totalFCFA.toLocaleString('fr-FR')} FCFA`,
        currency: order.currencyUsed || 'FCFA',
        message: buildPlainOrderSummary(order)
      })
    });

    const data = (await response.json()) as { success?: boolean; message?: string };
    return {
      ok: Boolean(response.ok && data.success),
      error: data.success ? undefined : data.message || `HTTP ${response.status}`
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Erreur réseau Web3Forms'
    };
  } finally {
    clearTimeout(timer);
  }
}

async function postAppsScript<T extends Record<string, unknown>>(
  scriptUrl: string,
  payload: Record<string, unknown>,
  timeoutMs = 15000
): Promise<{ ok: boolean; data?: T; error?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    // Content-Type text/plain + redirect follow avoids CORS OPTIONS preflight failure on script.google.com
    const response = await fetch(scriptUrl, {
      method: 'POST',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    let parsed: T & { ok?: boolean; error?: string };
    try {
      parsed = JSON.parse(text) as T & { ok?: boolean; error?: string };
    } catch {
      return {
        ok: false,
        error: 'Réponse non-JSON reçue d’Apps Script (vérifiez que « Qui a accès » est bien sur « Tout le monde »).'
      };
    }

    if (!response.ok || parsed.ok === false) {
      return {
        ok: false,
        data: parsed,
        error: parsed.error || `HTTP ${response.status}`
      };
    }
    return { ok: true, data: parsed };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Erreur réseau Apps Script'
    };
  } finally {
    clearTimeout(timer);
  }
}

async function getAppsScript<T extends Record<string, unknown>>(
  scriptUrl: string,
  queryParams: Record<string, string>,
  timeoutMs = 12000
): Promise<{ ok: boolean; data?: T; error?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const url = new URL(scriptUrl);
    for (const [k, v] of Object.entries(queryParams)) {
      url.searchParams.set(k, v);
    }
    const response = await fetch(url.toString(), {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal
    });
    const text = await response.text();
    const parsed = JSON.parse(text) as T & { ok?: boolean; error?: string };
    if (!response.ok || parsed.ok === false) {
      return { ok: false, data: parsed, error: parsed.error || `HTTP ${response.status}` };
    }
    return { ok: true, data: parsed };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Erreur GET Apps Script' };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Envoie silencieusement une commande vers Web3Forms et/ou Google Apps Script.
 */
export async function dispatchOrderToBackend(order: ErpOrder): Promise<OrderDispatchInfo> {
  const config = getCloudConfig();
  const hasWeb3 = Boolean(config.web3formsKey);
  const hasGas = Boolean(config.appsScriptUrl);

  if (!hasWeb3 && !hasGas) {
    return {
      sheetSynced: false,
      emailSent: false,
      channelsUsed: ['local'],
      warning: 'Mode local uniquement (configurez Google Sheets ou Web3Forms dans ERP → Cloud & Notifs).'
    };
  }

  const web3Promise: Promise<{ ok: boolean; error?: string } | null> = hasWeb3
    ? sendViaWeb3Forms(config.web3formsKey, order)
    : Promise.resolve(null);

  const gasPromise: Promise<{
    ok: boolean;
    data?: { sheetSynced?: boolean; mailSent?: boolean };
    error?: string;
  } | null> = hasGas
    ? postAppsScript<{ sheetSynced?: boolean; mailSent?: boolean }>(config.appsScriptUrl, {
        action: 'submit_order',
        order
      })
    : Promise.resolve(null);

  const [web3Res, gasRes] = await Promise.all([web3Promise, gasPromise]);

  const sheetSynced = Boolean(gasRes?.ok && gasRes.data?.sheetSynced !== false);
  const emailSent = Boolean(web3Res?.ok || (gasRes?.ok && gasRes.data?.mailSent));
  const channelsUsed: OrderDispatchInfo['channelsUsed'] = [];
  if (sheetSynced) channelsUsed.push('apps-script');
  if (web3Res?.ok) channelsUsed.push('web3forms');
  if (channelsUsed.length === 0) channelsUsed.push('local');

  const errors: string[] = [];
  if (hasWeb3 && web3Res && !web3Res.ok && web3Res.error) errors.push(`Web3Forms: ${web3Res.error}`);
  if (hasGas && gasRes && !gasRes.ok && gasRes.error) errors.push(`Google Sheets: ${gasRes.error}`);

  return {
    sheetSynced,
    emailSent,
    channelsUsed,
    warning: errors.length > 0 ? errors.join(' | ') : undefined
  };
}

export async function pingAppsScriptBackend(
  scriptUrl?: string
): Promise<{ ok: boolean; adminEmail?: string; error?: string }> {
  const url = (scriptUrl ?? getCloudConfig().appsScriptUrl).trim();
  if (!url) return { ok: false, error: 'URL Apps Script manquante' };
  const res = await getAppsScript<{ adminEmail?: string }>(url, { action: 'ping' });
  return { ok: res.ok, adminEmail: res.data?.adminEmail, error: res.error };
}

export async function testAppsScriptEmailBackend(
  pin: string,
  scriptUrl?: string,
  adminEmail?: string
): Promise<{ ok: boolean; sentTo?: string; error?: string }> {
  const cfg = getCloudConfig();
  const url = (scriptUrl ?? cfg.appsScriptUrl).trim();
  if (!url) return { ok: false, error: 'URL Apps Script manquante' };
  const res = await postAppsScript<{ sentTo?: string }>(url, {
    action: 'admin_test_email',
    pin,
    adminEmail: adminEmail ?? cfg.adminEmail
  });
  return { ok: res.ok, sentTo: res.data?.sentTo, error: res.error };
}

export async function testWeb3FormsConnection(
  accessKey?: string,
  adminEmail?: string
): Promise<{ ok: boolean; error?: string }> {
  const cfg = getCloudConfig();
  const key = (accessKey ?? cfg.web3formsKey).trim();
  if (!key) return { ok: false, error: 'Clé Web3Forms manquante' };
  const syntheticTestOrder: ErpOrder = {
    id: 'TEST-WA-' + Math.floor(1000 + Math.random() * 9000),
    clientName: 'Test Atelier WriticArt',
    clientPhone: '+221 77 234 85 21',
    clientEmail: adminEmail ?? cfg.adminEmail,
    city: 'Dakar (Test Configuration)',
    date: new Date().toLocaleDateString('fr-FR'),
    items: [{ title: 'Email Test Connexion Web3Forms', quantity: 1, unitPriceFCFA: 0 }],
    totalFCFA: 0,
    currencyUsed: 'FCFA',
    offerType: 'atelier',
    status: 'nouveau',
    paymentMethod: 'Wave',
    paymentStatus: 'paye',
    customMessage: 'Test automatique déclenché depuis Admin ERP → Cloud & Notifs.'
  };
  return sendViaWeb3Forms(key, syntheticTestOrder);
}

export async function fetchPublicCmsFromBackend(): Promise<{
  ok: boolean;
  products?: CatalogProduct[];
  articles?: ArticlePost[];
  siteSettings?: Partial<SiteSettings> | null;
}> {
  const url = getCloudConfig().appsScriptUrl;
  if (!url) return { ok: false };
  const res = await getAppsScript<{
    products?: CatalogProduct[];
    articles?: ArticlePost[];
    siteSettings?: Partial<SiteSettings> | null;
  }>(url, { action: 'public_cms' }, 9000);
  if (!res.ok || !res.data) return { ok: false };
  return {
    ok: true,
    products: res.data.products,
    articles: res.data.articles,
    siteSettings: res.data.siteSettings
  };
}

export async function trackOrderRemote(
  orderId: string
): Promise<{ ok: boolean; order?: ErpOrder | null; error?: string }> {
  const url = getCloudConfig().appsScriptUrl;
  if (!url) return { ok: false, error: 'Backend non configuré' };
  const res = await getAppsScript<{ order?: ErpOrder | null }>(url, {
    action: 'track_order',
    id: orderId
  });
  return { ok: res.ok, order: res.data?.order, error: res.error };
}

export async function adminVerifyPinRemote(
  pin: string
): Promise<{ ok: boolean; configured: boolean; authorized: boolean; error?: string }> {
  const url = getCloudConfig().appsScriptUrl;
  if (!url) return { ok: false, configured: false, authorized: false };
  const res = await postAppsScript<{ authorized?: boolean }>(url, {
    action: 'admin_verify_pin',
    pin
  });
  return {
    ok: res.ok,
    configured: true,
    authorized: Boolean(res.data?.authorized),
    error: res.error
  };
}

export async function adminChangePinRemote(
  pin: string,
  newPin: string
): Promise<{ ok: boolean; error?: string }> {
  const url = getCloudConfig().appsScriptUrl;
  if (!url) return { ok: false, error: 'Backend non configuré' };
  const res = await postAppsScript(url, {
    action: 'admin_change_pin',
    pin,
    newPin
  });
  return { ok: res.ok, error: res.error };
}

export async function adminPullFromBackend(pin: string): Promise<{
  ok: boolean;
  orders?: ErpOrder[];
  clients?: ErpClient[];
  products?: CatalogProduct[];
  articles?: ArticlePost[];
  inventory?: InventoryItem[];
  siteSettings?: Partial<SiteSettings> | null;
  error?: string;
}> {
  const url = getCloudConfig().appsScriptUrl;
  if (!url) return { ok: false, error: 'URL Apps Script non configurée' };
  const res = await postAppsScript<{
    orders?: ErpOrder[];
    clients?: ErpClient[];
    products?: CatalogProduct[];
    articles?: ArticlePost[];
    inventory?: InventoryItem[];
    siteSettings?: Partial<SiteSettings> | null;
  }>(url, { action: 'admin_pull', pin });
  if (!res.ok || !res.data) return { ok: false, error: res.error };
  return {
    ok: true,
    orders: res.data.orders,
    clients: res.data.clients,
    products: res.data.products,
    articles: res.data.articles,
    inventory: res.data.inventory,
    siteSettings: res.data.siteSettings
  };
}

export async function adminSyncCmsToBackend(
  pin: string,
  payload: {
    products?: CatalogProduct[];
    articles?: ArticlePost[];
    siteSettings?: SiteSettings;
    inventory?: InventoryItem[];
  }
): Promise<{ ok: boolean; syncedAt?: string; error?: string }> {
  const url = getCloudConfig().appsScriptUrl;
  if (!url) return { ok: false, error: 'URL Apps Script non configurée' };
  const res = await postAppsScript<{ syncedAt?: string }>(url, {
    action: 'admin_sync_cms',
    pin,
    ...payload
  });
  return { ok: res.ok, syncedAt: res.data?.syncedAt, error: res.error };
}

export async function adminUpdateOrderStatusRemote(
  pin: string,
  orderId: string,
  status: OrderStatus
): Promise<{ ok: boolean; error?: string }> {
  const url = getCloudConfig().appsScriptUrl;
  if (!url) return { ok: false };
  const res = await postAppsScript(url, {
    action: 'admin_update_order_status',
    pin,
    orderId,
    status
  });
  return { ok: res.ok, error: res.error };
}

export async function adminDeleteOrderRemote(
  pin: string,
  orderId: string
): Promise<{ ok: boolean; error?: string }> {
  const url = getCloudConfig().appsScriptUrl;
  if (!url) return { ok: false };
  const res = await postAppsScript(url, {
    action: 'admin_delete_order',
    pin,
    orderId
  });
  return { ok: res.ok, error: res.error };
}
