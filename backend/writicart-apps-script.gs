/**
 * WRITICART — Backend Cloud Sans Serveur (Google Sheets + Gmail/MailApp)
 * Copiez ce fichier intégralement dans Extensions > Apps Script de votre Google Sheet.
 *
 * Fonctionnalités :
 * - Enregistrement centralisé des commandes (Formulaires 1, 2, 3, Panier & Devis)
 * - Notification Email automatique HTML vers l'atelier (kaynubind@gmail.com) à chaque commande
 * - Fiche Clients CRM auto-alimentée
 * - Synchronisation bidirectionnelle du catalogue, des articles WordPress, des stocks et réglages
 * - Suivi commande public filtré (sans fuite de données personnelles sensibles)
 * - Protection des routes d'administration par code PIN (PropertiesService, défaut : 1234)
 */

var WRITICART_CONFIG = {
  ADMIN_EMAIL: 'kaynubind@gmail.com',
  SITE_NAME: 'WriticArt Atelier',
  DEFAULT_PIN: '1234'
};

var SHEETS = {
  ORDERS: 'Orders',
  CLIENTS: 'Clients',
  PRODUCTS: 'Products',
  ARTICLES: 'Articles',
  INVENTORY: 'Inventory',
  SETTINGS: 'Settings'
};

var HEADERS = {
  Orders: [
    'id', 'date', 'clientName', 'clientPhone', 'clientEmail', 'city',
    'offerType', 'isPreorder', 'questionType', 'deliveryType', 'theme',
    'tableauFormula', 'tableauSize', 'parfumChoice', 'totalFCFA', 'currencyUsed',
    'status', 'paymentMethod', 'paymentStatus', 'customMessage', 'notes',
    'itemsJson', 'createdAtIso'
  ],
  Clients: [
    'id', 'name', 'phone', 'email', 'city', 'totalOrders',
    'totalSpentFCFA', 'lastOrderDate', 'vipStatus', 'notes'
  ],
  Products: [
    'id', 'name', 'category', 'categoryLabel', 'subtitle', 'priceFCFA',
    'badge', 'inStock', 'image', 'description', 'featuresJson'
  ],
  Articles: [
    'id', 'title', 'slug', 'excerpt', 'content', 'category', 'author',
    'date', 'readTime', 'coverImage', 'status', 'featured'
  ],
  Inventory: [
    'id', 'name', 'category', 'currentStock', 'minThreshold', 'unit',
    'unitCostFCFA', 'sellingPriceFCFA'
  ],
  Settings: ['key', 'valueJson']
};

function getAdminPin_() {
  var props = PropertiesService.getScriptProperties();
  return props.getProperty('WRITICART_ADMIN_PIN') || WRITICART_CONFIG.DEFAULT_PIN;
}

function getAdminEmail_() {
  var props = PropertiesService.getScriptProperties();
  return props.getProperty('WRITICART_ADMIN_EMAIL') || WRITICART_CONFIG.ADMIN_EMAIL;
}

function isAuthorized_(pin) {
  return String(pin || '').trim() === String(getAdminPin_()).trim();
}

function jsonOut_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function sanitizeTextCell_(val) {
  var str = val === null || val === undefined ? '' : String(val);
  if (/^[=@\t\r]/.test(str)) {
    return "'" + str;
  }
  return str;
}

function escapeHtml_(val) {
  return String(val === null || val === undefined ? '' : val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function ensureSheet_(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold').setBackground('#231B26').setFontColor('#FAF8F5');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function ensureAllSheets_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return {
    ss: ss,
    orders: ensureSheet_(ss, SHEETS.ORDERS, HEADERS.Orders),
    clients: ensureSheet_(ss, SHEETS.CLIENTS, HEADERS.Clients),
    products: ensureSheet_(ss, SHEETS.PRODUCTS, HEADERS.Products),
    articles: ensureSheet_(ss, SHEETS.ARTICLES, HEADERS.Articles),
    inventory: ensureSheet_(ss, SHEETS.INVENTORY, HEADERS.Inventory),
    settings: ensureSheet_(ss, SHEETS.SETTINGS, HEADERS.Settings)
  };
}

function sheetToObjects_(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  var values = sheet.getDataRange().getValues();
  var headers = values[0];
  var rows = [];
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    if (!row[0] && row[0] !== 0) continue;
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
    }
    rows.push(obj);
  }
  return rows;
}

function parseJsonSafe_(str, fallback) {
  if (!str) return fallback;
  try {
    return JSON.parse(str);
  } catch (err) {
    return fallback;
  }
}

function rowToOrder_(r) {
  return {
    id: String(r.id || ''),
    date: String(r.date || ''),
    clientName: String(r.clientName || ''),
    clientPhone: String(r.clientPhone || ''),
    clientEmail: r.clientEmail ? String(r.clientEmail) : undefined,
    city: String(r.city || ''),
    offerType: r.offerType ? String(r.offerType) : undefined,
    isPreorder: r.isPreorder === true || r.isPreorder === 'true' || r.isPreorder === 'TRUE',
    questionType: r.questionType ? String(r.questionType) : undefined,
    deliveryType: r.deliveryType ? String(r.deliveryType) : undefined,
    theme: r.theme ? String(r.theme) : undefined,
    tableauFormula: r.tableauFormula ? String(r.tableauFormula) : undefined,
    tableauSize: r.tableauSize ? String(r.tableauSize) : undefined,
    parfumChoice: r.parfumChoice ? String(r.parfumChoice) : undefined,
    totalFCFA: Number(r.totalFCFA || 0),
    currencyUsed: r.currencyUsed === 'EUR' ? 'EUR' : 'FCFA',
    status: String(r.status || 'nouveau'),
    paymentMethod: String(r.paymentMethod || 'Wave'),
    paymentStatus: String(r.paymentStatus || 'en_attente'),
    customMessage: r.customMessage ? String(r.customMessage) : undefined,
    notes: r.notes ? String(r.notes) : undefined,
    items: parseJsonSafe_(r.itemsJson, []),
    syncStatus: 'synced'
  };
}

function rowToClient_(r) {
  return {
    id: String(r.id || ''),
    name: String(r.name || ''),
    phone: String(r.phone || ''),
    email: String(r.email || ''),
    city: String(r.city || ''),
    totalOrders: Number(r.totalOrders || 0),
    totalSpentFCFA: Number(r.totalSpentFCFA || 0),
    lastOrderDate: String(r.lastOrderDate || ''),
    vipStatus: r.vipStatus === true || r.vipStatus === 'true' || r.vipStatus === 'TRUE',
    notes: r.notes ? String(r.notes) : undefined
  };
}

function rowToProduct_(r) {
  return {
    id: String(r.id || ''),
    name: String(r.name || ''),
    category: String(r.category || 'writiclove'),
    categoryLabel: String(r.categoryLabel || ''),
    subtitle: String(r.subtitle || ''),
    priceFCFA: Number(r.priceFCFA || 0),
    badge: r.badge ? String(r.badge) : undefined,
    inStock: r.inStock !== false && r.inStock !== 'false' && r.inStock !== 'FALSE',
    image: String(r.image || ''),
    description: String(r.description || ''),
    features: parseJsonSafe_(r.featuresJson, [])
  };
}

function rowToArticle_(r) {
  return {
    id: String(r.id || ''),
    title: String(r.title || ''),
    slug: String(r.slug || ''),
    excerpt: String(r.excerpt || ''),
    content: String(r.content || ''),
    category: String(r.category || ''),
    author: String(r.author || ''),
    date: String(r.date || ''),
    readTime: String(r.readTime || '4 min'),
    coverImage: String(r.coverImage || ''),
    status: r.status === 'brouillon' ? 'brouillon' : 'publie',
    featured: r.featured === true || r.featured === 'true' || r.featured === 'TRUE'
  };
}

function rowToInventory_(r) {
  return {
    id: String(r.id || ''),
    name: String(r.name || ''),
    category: String(r.category || 'coffret'),
    currentStock: Number(r.currentStock || 0),
    minThreshold: Number(r.minThreshold || 0),
    unit: String(r.unit || ''),
    unitCostFCFA: Number(r.unitCostFCFA || 0),
    sellingPriceFCFA: r.sellingPriceFCFA !== '' && r.sellingPriceFCFA !== undefined ? Number(r.sellingPriceFCFA) : undefined
  };
}

function appendOrderRow_(sheet, order) {
  var headers = HEADERS.Orders;
  var row = [
    sanitizeTextCell_(order.id),
    sanitizeTextCell_(order.date),
    sanitizeTextCell_(order.clientName),
    sanitizeTextCell_(order.clientPhone),
    sanitizeTextCell_(order.clientEmail || ''),
    sanitizeTextCell_(order.city),
    sanitizeTextCell_(order.offerType || 'boutique'),
    Boolean(order.isPreorder),
    sanitizeTextCell_(order.questionType || ''),
    sanitizeTextCell_(order.deliveryType || ''),
    sanitizeTextCell_(order.theme || ''),
    sanitizeTextCell_(order.tableauFormula || ''),
    sanitizeTextCell_(order.tableauSize || ''),
    sanitizeTextCell_(order.parfumChoice || ''),
    Number(order.totalFCFA || 0),
    sanitizeTextCell_(order.currencyUsed || 'FCFA'),
    sanitizeTextCell_(order.status || 'nouveau'),
    sanitizeTextCell_(order.paymentMethod || 'Wave'),
    sanitizeTextCell_(order.paymentStatus || 'en_attente'),
    sanitizeTextCell_(order.customMessage || ''),
    sanitizeTextCell_(order.notes || ''),
    JSON.stringify(order.items || []),
    new Date().toISOString()
  ];
  // Force plain-text format before appending so phone numbers starting with '+' never trigger formula #ERROR!
  var nextRow = sheet.getLastRow() + 1;
  var range = sheet.getRange(nextRow, 1, 1, headers.length);
  range.setNumberFormat('@');
  sheet.getRange(nextRow, 15).setNumberFormat('#,##0'); // totalFCFA numeric
  range.setValues([row]);
}

function upsertClientRow_(sheet, order) {
  var rows = sheetToObjects_(sheet);
  var phoneNorm = String(order.clientPhone || '').replace(/[^0-9]/g, '');
  var matchIndex = -1;

  for (var i = 0; i < rows.length; i++) {
    var rowPhoneNorm = String(rows[i].phone || '').replace(/[^0-9]/g, '');
    if ((phoneNorm && rowPhoneNorm === phoneNorm) ||
        String(rows[i].name || '').toLowerCase() === String(order.clientName || '').toLowerCase()) {
      matchIndex = i;
      break;
    }
  }

  if (matchIndex >= 0) {
    var existing = rows[matchIndex];
    var targetRowNum = matchIndex + 2;
    var updatedOrders = Number(existing.totalOrders || 0) + 1;
    var updatedSpent = Number(existing.totalSpentFCFA || 0) + Number(order.totalFCFA || 0);
    var vip = updatedSpent >= 50000;
    sheet.getRange(targetRowNum, 6).setValue(updatedOrders);
    sheet.getRange(targetRowNum, 7).setValue(updatedSpent);
    sheet.getRange(targetRowNum, 8).setValue(sanitizeTextCell_(order.date));
    sheet.getRange(targetRowNum, 9).setValue(vip);
  } else {
    var nextRow = sheet.getLastRow() + 1;
    var clientRow = [
      'cli_' + Date.now(),
      sanitizeTextCell_(order.clientName),
      sanitizeTextCell_(order.clientPhone),
      sanitizeTextCell_(order.clientEmail || ''),
      sanitizeTextCell_(order.city),
      1,
      Number(order.totalFCFA || 0),
      sanitizeTextCell_(order.date),
      Number(order.totalFCFA || 0) >= 50000,
      sanitizeTextCell_('Ajouté automatiquement via ' + order.id)
    ];
    var r = sheet.getRange(nextRow, 1, 1, HEADERS.Clients.length);
    r.setNumberFormat('@');
    sheet.getRange(nextRow, 6, 1, 2).setNumberFormat('#,##0');
    r.setValues([clientRow]);
  }
}

function sendOrderNotificationEmail_(order) {
  try {
    var toEmail = getAdminEmail_();
    var waPhone = String(order.clientPhone || '').replace(/[^0-9]/g, '');
    var itemsLines = (order.items || []).map(function (it) {
      return '- ' + it.title + ' (x' + it.quantity + ') — ' +
        Number(it.unitPriceFCFA || 0).toLocaleString('fr-FR') + ' FCFA' +
        (it.options ? ' [' + it.options + ']' : '');
    }).join('\n');

    var itemsHtml = (order.items || []).map(function (it) {
      return '<li><strong>' + escapeHtml_(it.title) + '</strong> (x' + Number(it.quantity || 1) + ') — ' +
        Number(it.unitPriceFCFA || 0).toLocaleString('fr-FR') + ' FCFA' +
        (it.options ? '<br><small style="color:#666;">' + escapeHtml_(it.options) + '</small>' : '') + '</li>';
    }).join('');

    var subject = '✨ Nouvelle commande WriticArt ' + order.id + ' — ' + order.clientName +
      ' (' + Number(order.totalFCFA || 0).toLocaleString('fr-FR') + ' FCFA)';

    var plainBody = [
      'Nouvelle demande enregistrée sur ' + WRITICART_CONFIG.SITE_NAME,
      '====================================================',
      'Référence : ' + order.id,
      'Offre : ' + (order.offerType || 'boutique') + (order.isPreorder ? ' (PRÉCOMMANDE)' : ''),
      'Client : ' + order.clientName,
      'Téléphone : ' + order.clientPhone,
      'Email : ' + (order.clientEmail || '-'),
      'Adresse / Pays : ' + order.city,
      'Livraison : ' + (order.deliveryType || '-'),
      'Paiement souhaité : ' + order.paymentMethod,
      'Total : ' + Number(order.totalFCFA || 0).toLocaleString('fr-FR') + ' FCFA (devise client : ' + (order.currencyUsed || 'FCFA') + ')',
      order.theme ? 'Thème : ' + order.theme : '',
      order.tableauFormula ? 'Formule : ' + order.tableauFormula : '',
      order.tableauSize ? 'Format : ' + order.tableauSize : '',
      order.parfumChoice ? 'Parfum : ' + order.parfumChoice : '',
      order.customMessage ? 'Message / Acrostiche : ' + order.customMessage : '',
      '',
      'Détail articles :',
      itemsLines,
      '',
      waPhone ? 'Contacter sur WhatsApp : https://wa.me/' + waPhone : ''
    ].filter(Boolean).join('\n');

    var htmlBody =
      '<div style="font-family:Georgia,serif;max-width:620px;margin:0 auto;border:1px solid #E8DFD1;border-radius:16px;overflow:hidden;">' +
        '<div style="background:#231B26;color:#FAF8F5;padding:20px 24px;border-bottom:3px solid #E68314;">' +
          '<p style="margin:0;font-size:11px;letter-spacing:2px;color:#E68314;text-transform:uppercase;">WriticArt — « Les écrits restent »</p>' +
          '<h2 style="margin:6px 0 0;font-weight:normal;">Nouvelle Commande ' + escapeHtml_(order.id) + '</h2>' +
        '</div>' +
        '<div style="padding:24px;background:#FAF8F5;color:#181716;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;">' +
          '<p><strong>Client :</strong> ' + escapeHtml_(order.clientName) + '<br>' +
          '<strong>Téléphone :</strong> ' + escapeHtml_(order.clientPhone) + '<br>' +
          '<strong>Email :</strong> ' + escapeHtml_(order.clientEmail || '-') + '<br>' +
          '<strong>Adresse :</strong> ' + escapeHtml_(order.city) + '</p>' +
          '<p><strong>Livraison :</strong> ' + escapeHtml_(order.deliveryType || '-') + '<br>' +
          '<strong>Paiement :</strong> ' + escapeHtml_(order.paymentMethod) + '<br>' +
          '<strong>Total :</strong> <span style="color:#E68314;font-weight:bold;">' +
            Number(order.totalFCFA || 0).toLocaleString('fr-FR') + ' FCFA (' + escapeHtml_(order.currencyUsed || 'FCFA') + ')' +
          '</span></p>' +
          (order.theme || order.parfumChoice || order.customMessage
            ? '<div style="background:#FFF8F0;border-left:3px solid #E68314;padding:12px 14px;margin:14px 0;">' +
                (order.theme ? '<div><strong>Thème :</strong> ' + escapeHtml_(order.theme) + '</div>' : '') +
                (order.tableauSize ? '<div><strong>Format :</strong> ' + escapeHtml_(order.tableauSize) + '</div>' : '') +
                (order.parfumChoice ? '<div><strong>Parfum :</strong> ' + escapeHtml_(order.parfumChoice) + '</div>' : '') +
                (order.customMessage ? '<div><strong>Texte / Acrostiche :</strong> ' + escapeHtml_(order.customMessage) + '</div>' : '') +
              '</div>'
            : '') +
          '<ul>' + itemsHtml + '</ul>' +
          (waPhone
            ? '<p style="margin-top:20px;"><a href="https://wa.me/' + escapeHtml_(waPhone) + '" style="background:#25D366;color:#fff;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:bold;">Contacter le client sur WhatsApp</a></p>'
            : '') +
        '</div>' +
      '</div>';

    var options = { htmlBody: htmlBody };
    if (order.clientEmail && String(order.clientEmail).indexOf('@') > 0) {
      options.replyTo = String(order.clientEmail).trim();
    }

    // Notification strictement adressée à l'atelier pour protéger le quota Gmail et éviter tout abus de relais
    MailApp.sendEmail(toEmail, subject, plainBody, options);
    return true;
  } catch (err) {
    Logger.log('MailApp error: ' + err);
    return false;
  }
}

function replaceSheetData_(sheet, headers, rowsArray, numericCols) {
  sheet.clearContents();
  sheet.appendRow(headers);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold').setBackground('#231B26').setFontColor('#FAF8F5');
  if (rowsArray.length > 0) {
    var range = sheet.getRange(2, 1, rowsArray.length, headers.length);
    range.setNumberFormat('@');
    if (numericCols && numericCols.length) {
      for (var k = 0; k < numericCols.length; k++) {
        sheet.getRange(2, numericCols[k], rowsArray.length, 1).setNumberFormat('#,##0');
      }
    }
    range.setValues(rowsArray);
  }
}

function doGet(e) {
  try {
    var params = (e && e.parameter) || {};
    var action = String(params.action || 'ping');
    var db = ensureAllSheets_();

    if (action === 'ping') {
      return jsonOut_({
        ok: true,
        service: 'WriticArt Google Apps Script Backend',
        adminEmail: getAdminEmail_(),
        timestamp: new Date().toISOString()
      });
    }

    if (action === 'public_cms') {
      var products = sheetToObjects_(db.products).map(rowToProduct_);
      var articles = sheetToObjects_(db.articles)
        .map(rowToArticle_)
        .filter(function (a) { return a.status === 'publie'; });
      var settingsRows = sheetToObjects_(db.settings);
      var siteSettings = null;
      for (var i = 0; i < settingsRows.length; i++) {
        if (settingsRows[i].key === 'siteSettings') {
          siteSettings = parseJsonSafe_(settingsRows[i].valueJson, null);
        }
      }
      return jsonOut_({
        ok: true,
        products: products,
        articles: articles,
        siteSettings: siteSettings
      });
    }

    if (action === 'track_order') {
      var idQuery = String(params.id || '').trim().toLowerCase();
      if (!idQuery) return jsonOut_({ ok: false, error: 'Missing id' });
      var rawOrders = sheetToObjects_(db.orders).map(rowToOrder_);
      var match = null;
      for (var m = 0; m < rawOrders.length; m++) {
        if (rawOrders[m].id.toLowerCase() === idQuery) {
          match = rawOrders[m];
          break;
        }
      }
      if (!match) return jsonOut_({ ok: true, order: null });
      // Expose seulement les informations nécessaires au suivi client (sans email/téléphone/notes internes)
      return jsonOut_({
        ok: true,
        order: {
          id: match.id,
          date: match.date,
          city: match.city,
          offerType: match.offerType,
          isPreorder: match.isPreorder,
          deliveryType: match.deliveryType,
          totalFCFA: match.totalFCFA,
          currencyUsed: match.currencyUsed,
          status: match.status,
          items: match.items,
          clientName: match.clientName,
          clientPhone: '***',
          paymentMethod: match.paymentMethod,
          paymentStatus: match.paymentStatus
        }
      });
    }

    return jsonOut_({ ok: false, error: 'Unknown GET action: ' + action });
  } catch (err) {
    return jsonOut_({ ok: false, error: err && err.message ? err.message : String(err) });
  }
}

function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var payload = JSON.parse(raw);
    var action = String(payload.action || '');
    var db = ensureAllSheets_();

    if (action === 'submit_order') {
      var order = payload.order;
      if (!order || !order.id || !order.clientName) {
        return jsonOut_({ ok: false, error: 'Invalid order payload' });
      }

      var lock = LockService.getScriptLock();
      lock.waitLock(10000);
      var alreadyExists = false;
      var mailSent = false;
      try {
        var existingOrders = sheetToObjects_(db.orders);
        alreadyExists = existingOrders.some(function (r) {
          return String(r.id) === String(order.id);
        });

        if (!alreadyExists) {
          appendOrderRow_(db.orders, order);
          upsertClientRow_(db.clients, order);
          mailSent = sendOrderNotificationEmail_(order);
        }
      } finally {
        lock.releaseLock();
      }

      return jsonOut_({
        ok: true,
        id: order.id,
        duplicate: alreadyExists,
        sheetSynced: true,
        mailSent: mailSent
      });
    }

    if (action === 'admin_verify_pin') {
      return jsonOut_({
        ok: true,
        authorized: isAuthorized_(payload.pin)
      });
    }

    if (!isAuthorized_(payload.pin)) {
      return jsonOut_({ ok: false, error: 'PIN administrateur incorrect' });
    }

    if (action === 'admin_pull') {
      var orders = sheetToObjects_(db.orders).map(rowToOrder_).reverse();
      var clients = sheetToObjects_(db.clients).map(rowToClient_).reverse();
      var products = sheetToObjects_(db.products).map(rowToProduct_);
      var articles = sheetToObjects_(db.articles).map(rowToArticle_);
      var inventory = sheetToObjects_(db.inventory).map(rowToInventory_);
      var settingsRows = sheetToObjects_(db.settings);
      var siteSettings = null;
      for (var s = 0; s < settingsRows.length; s++) {
        if (settingsRows[s].key === 'siteSettings') {
          siteSettings = parseJsonSafe_(settingsRows[s].valueJson, null);
        }
      }
      return jsonOut_({
        ok: true,
        orders: orders,
        clients: clients,
        products: products,
        articles: articles,
        inventory: inventory,
        siteSettings: siteSettings
      });
    }

    if (action === 'admin_update_order_status') {
      var targetId = String(payload.orderId || '');
      var newStatus = String(payload.status || '');
      var values = db.orders.getDataRange().getValues();
      var statusCol = HEADERS.Orders.indexOf('status') + 1;
      for (var r = 1; r < values.length; r++) {
        if (String(values[r][0]) === targetId) {
          db.orders.getRange(r + 1, statusCol).setValue(newStatus);
          return jsonOut_({ ok: true, id: targetId, status: newStatus });
        }
      }
      return jsonOut_({ ok: false, error: 'Commande introuvable dans Sheets: ' + targetId });
    }

    if (action === 'admin_delete_order') {
      var delId = String(payload.orderId || '');
      var rows = db.orders.getDataRange().getValues();
      for (var d = rows.length - 1; d >= 1; d--) {
        if (String(rows[d][0]) === delId) {
          db.orders.deleteRow(d + 1);
          return jsonOut_({ ok: true, deletedId: delId });
        }
      }
      return jsonOut_({ ok: true, deletedId: delId });
    }

    if (action === 'admin_sync_cms') {
      if (payload.products && payload.products.length) {
        var prodRows = payload.products.map(function (p) {
          return [
            sanitizeTextCell_(p.id),
            sanitizeTextCell_(p.name),
            sanitizeTextCell_(p.category),
            sanitizeTextCell_(p.categoryLabel),
            sanitizeTextCell_(p.subtitle),
            Number(p.priceFCFA || 0),
            sanitizeTextCell_(p.badge || ''),
            Boolean(p.inStock),
            sanitizeTextCell_(p.image && String(p.image).indexOf('data:') !== 0 ? String(p.image) : ''),
            sanitizeTextCell_(p.description),
            JSON.stringify(p.features || [])
          ];
        });
        replaceSheetData_(db.products, HEADERS.Products, prodRows, [6]);
      }

      if (payload.articles && payload.articles.length) {
        var artRows = payload.articles.map(function (a) {
          return [
            sanitizeTextCell_(a.id),
            sanitizeTextCell_(a.title),
            sanitizeTextCell_(a.slug),
            sanitizeTextCell_(a.excerpt),
            sanitizeTextCell_(a.content),
            sanitizeTextCell_(a.category),
            sanitizeTextCell_(a.author),
            sanitizeTextCell_(a.date),
            sanitizeTextCell_(a.readTime),
            sanitizeTextCell_(a.coverImage && String(a.coverImage).indexOf('data:') !== 0 ? String(a.coverImage) : ''),
            sanitizeTextCell_(a.status),
            Boolean(a.featured)
          ];
        });
        replaceSheetData_(db.articles, HEADERS.Articles, artRows, []);
      }

      if (payload.inventory && payload.inventory.length) {
        var invRows = payload.inventory.map(function (inv) {
          return [
            sanitizeTextCell_(inv.id),
            sanitizeTextCell_(inv.name),
            sanitizeTextCell_(inv.category),
            Number(inv.currentStock || 0),
            Number(inv.minThreshold || 0),
            sanitizeTextCell_(inv.unit),
            Number(inv.unitCostFCFA || 0),
            inv.sellingPriceFCFA !== undefined ? Number(inv.sellingPriceFCFA) : ''
          ];
        });
        replaceSheetData_(db.inventory, HEADERS.Inventory, invRows, [4, 5, 7, 8]);
      }

      if (payload.siteSettings) {
        replaceSheetData_(
          db.settings,
          HEADERS.Settings,
          [['siteSettings', JSON.stringify(payload.siteSettings)]],
          []
        );
      }

      return jsonOut_({ ok: true, syncedAt: new Date().toISOString() });
    }

    if (action === 'admin_change_pin') {
      var nextPin = String(payload.newPin || '').trim();
      if (nextPin.length < 4) return jsonOut_({ ok: false, error: 'PIN trop court (min 4)' });
      PropertiesService.getScriptProperties().setProperty('WRITICART_ADMIN_PIN', nextPin);
      return jsonOut_({ ok: true });
    }

    if (action === 'admin_test_email') {
      var testEmail = String(payload.adminEmail || getAdminEmail_()).trim();
      if (testEmail) {
        PropertiesService.getScriptProperties().setProperty('WRITICART_ADMIN_EMAIL', testEmail);
      }
      MailApp.sendEmail(
        testEmail || getAdminEmail_(),
        '✅ Test connexion Backend WriticArt Atelier',
        'Votre Google Apps Script WriticArt est bien connecté !\n\nDate : ' + new Date().toLocaleString('fr-FR')
      );
      return jsonOut_({ ok: true, sentTo: testEmail || getAdminEmail_() });
    }

    return jsonOut_({ ok: false, error: 'Unknown POST action: ' + action });
  } catch (err) {
    return jsonOut_({ ok: false, error: err && err.message ? err.message : String(err) });
  }
}
