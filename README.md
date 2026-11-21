# SKHAN — Landing page NSB-300C1 (COD Maroc)

## État du déploiement (21 nov. 2026)

| Élément | Où |
|---|---|
| Site en ligne | https://skhan.maroclick.com (alias : https://abdelghafour17.github.io/skhan-maroclick/) |
| Code source | https://github.com/Abdelghafour17/skhan-maroclick (branche `main`, GitHub Pages) |
| Commandes | Google Sheet "Commandes SKHAN", onglet `Commandes` + email à chaque commande |
| Webhook | Apps Script "SKHAN Webhook Commandes" (compte Gmail principal) |
| DNS | Hostinger → CNAME `skhan` → `abdelghafour17.github.io` |

Mettre à jour le site : modifier `index.html`, puis `git add -A && git commit -m "..." && git push`. GitHub Pages republie en 1 à 2 minutes.

Encore à faire : `WHATSAPP` dans CONFIG (numéro factice), pixels Facebook / TikTok.

Dossier prêt à déployer, 100 % gratuit.

```
SKHAN/
├── index.html              ← la landing page (tout est dedans)
├── img/                    ← photos optimisées (≈ 320 Ko au total)
├── google-apps-script.js   ← réception des commandes dans Google Sheets
└── README.md
```

## 1. Configurer (2 minutes)

Ouvrir `index.html`, bloc `window.CONFIG` en haut du fichier :

| Clé | Quoi mettre |
|---|---|
| `WHATSAPP` | Votre numéro au format `2126XXXXXXXX` (sans +) |
| `GOOGLE_SHEET_URL` | URL `/exec` obtenue à l'étape 2 |
| `FB_PIXEL_ID` | ID du pixel Facebook (Events Manager) |
| `TIKTOK_PIXEL_ID` | ID du pixel TikTok (Ads Manager → Assets → Events) |

Tant que `GOOGLE_SHEET_URL` est vide, les commandes sont quand même affichées au client avec le bouton WhatsApp, et sauvegardées dans le navigateur (`localStorage`), mais vous ne les recevez pas. À remplir avant de lancer les pubs.

## 2. Google Sheets (réception des commandes, gratuit)

Suivre les 5 étapes en tête de `google-apps-script.js`. Chaque commande arrive en ligne dans la feuille avec date, nom, téléphone, ville, adresse, offre, total. Option : email à chaque commande.

## 3. Déployer gratuitement

**Option A — Netlify Drop (le plus simple, 30 secondes)**
1. Aller sur https://app.netlify.com/drop
2. Glisser-déposer le dossier `SKHAN` entier
3. URL du type `https://xxxx.netlify.app` immédiatement en ligne, HTTPS, CDN
4. Site settings → Change site name → ex. `skhan-maroc.netlify.app`

**Option B — Cloudflare Pages (le plus rapide au Maroc)**
1. https://pages.cloudflare.com → Create project → Upload assets
2. Glisser le dossier `SKHAN`
3. URL `https://xxxx.pages.dev`

**Option C — GitHub Pages** si vous voulez versionner.

Domaine perso (optionnel, ~100 MAD/an) : acheter sur Namecheap / Hostinger / OVH, puis "Add custom domain" dans Netlify ou Cloudflare. Un domaine `.com` ou `.ma` augmente la confiance et le taux de conversion sur les pubs.

## 4. Événements pixel envoyés

| Moment | Facebook | TikTok |
|---|---|---|
| Chargement page | PageView, ViewContent | ViewContent |
| Clic CTA | ClickCTA (custom) | ClickButton |
| Soumission formulaire | InitiateCheckout, Lead, Purchase | SubmitForm, PlaceAnOrder, CompletePayment |

Optimiser les campagnes sur **Lead** (Facebook) et **SubmitForm** (TikTok) au début, puis Purchase quand le volume est là.

## 5. Checklist avant de lancer les pubs

- [ ] WHATSAPP renseigné et testé (bouton flottant vert)
- [ ] GOOGLE_SHEET_URL renseigné, commande test reçue dans la feuille
- [ ] Pixels renseignés, événements visibles dans Meta Pixel Helper / TikTok Pixel Helper
- [ ] Page testée sur un vrai téléphone (Android + iPhone)
- [ ] Faire 2 à 3 photos du produit sur fond propre (mur blanc, bonne lumière) et remplacer dans `img/` : les photos d'entrepôt convertissent moins bien
