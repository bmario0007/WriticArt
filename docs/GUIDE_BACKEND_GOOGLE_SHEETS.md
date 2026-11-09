# Guide de Branchement Backend WriticArt (5 minutes, 100 % gratuit)

Ce guide permet de connecter votre boutique statique (`GitHub Pages`) à une vraie base de données **Google Sheets** + des **notifications email automatiques** vers `kaynubind@gmail.com` à chaque commande, sans carte bancaire ni serveur à maintenir.

---

## Étape 1 — Notifications Email Instantanées (Web3Forms • 2 minutes)

1. Rendez-vous sur **[web3forms.com](https://web3forms.com/)**.
2. Entrez l'adresse email qui doit recevoir les commandes : `kaynubind@gmail.com` puis cliquez sur **Create Access Key**.
3. Copiez la clé (`Access Key`) reçue par email.

*(Même si Web3Forms n'est pas renseigné, le script Google Apps Script ci-dessous envoie lui aussi un email HTML via votre compte Gmail.)*

---

## Étape 2 — Base de données Google Sheets + Apps Script (3 minutes)

1. Ouvrez [sheets.google.com](https://sheets.google.com/) et créez un nouveau tableur nommé **`WriticArt ERP & Commandes`**.
2. Dans le menu du tableur, cliquez sur **Extensions → Apps Script**.
3. Supprimez le texte par défaut dans `Code.gs` et collez tout le contenu de `backend/writicart-apps-script.gs` (également copiable en 1 clic depuis l'onglet **Cloud & Notifs** de `#/erp`).
4. Cliquez sur **Enregistrer** (`Ctrl + S`).
5. Cliquez sur **Déployer → Nouveau déploiement** :
   - Cliquez sur la roue crantée ⚙️ **Sélectionner un type → Application Web**.
   - **Description :** `WriticArt Backend v1`
   - **Exécuter en tant que :** `Moi (kaynubind@gmail.com)`
   - **Qui a accès :** **`Tout le monde`** *(indispensable pour que les visiteurs du site puissent soumettre leurs commandes)*.
6. Cliquez sur **Déployer**, autorisez l'accès Gmail/Sheets quand Google le demande (*Paramètres avancés → Accéder à ...*), puis copiez l'**URL de l'application Web** (`https://script.google.com/macros/s/.../exec`).

> ⚠️ **Important :** Lors d'une mise à jour future du script `.gs`, pensez à choisir **Déployer → Gérer les déploiements → Modifier → Nouvelle version**.

---

## Étape 3 — Activation sur le site public (pour tous vos clients)

Vous pouvez d'abord tester instantanément depuis l'interface `#/erp` → onglet **Cloud & Notifs** (en collant l'URL et la clé et en cliquant sur **Tester**).

Pour que **tous vos clients** (sur leurs propres téléphones et ordinateurs) enregistrent leurs commandes dans ce Google Sheet :

1. Créez un fichier `.env.local` à la racine du projet à partir de `.env.example` :

```env
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/VOTRE_ID/exec
VITE_WEB3FORMS_KEY=votre-cle-web3forms-ici
VITE_ADMIN_EMAIL=kaynubind@gmail.com
```

2. Reconstruisez et redéployez sur GitHub Pages :

```bash
npm run build
npx gh-pages -d dist
```

---

## Dépannage rapide

- **Les lignes s'affichent-elles immédiatement dans `#/erp` ?**  
  Oui : à la connexion dans l'ERP (onglet **Commandes** ou **Cloud & Notifs**), cliquez sur **Synchroniser depuis Google Sheets** (ou activez la synchronisation auto) pour récupérer les commandes passées par vos clients depuis n'importe quel appareil.
- **Un numéro `+221...` affiche `#ERROR!` dans Sheets ?**  
  Le script force automatiquement le format texte (`@`) sur chaque ligne ajoutée pour afficher `+221 77 ...` proprement sans formule.
- **Code PIN Administrateur :**  
  Le PIN par défaut est `1234`. Quand vous le changez dans **Réglages**, il se met à jour dans les propriétés sécurisées du Google Apps Script (`PropertiesService`).
