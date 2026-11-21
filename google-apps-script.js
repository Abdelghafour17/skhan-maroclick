/**
 * SKHAN — Réception des commandes dans Google Sheets (GRATUIT)
 * ------------------------------------------------------------
 * 1. Ouvrir https://sheets.new  → créer une feuille "Commandes SKHAN"
 * 2. Menu Extensions → Apps Script → coller TOUT ce fichier → Enregistrer
 * 3. Bouton "Déployer" → "Nouveau déploiement" → type "Application Web"
 *      - Exécuter en tant que : Moi
 *      - Qui a accès : Tout le monde
 *    → Déployer → Autoriser → copier l'URL (finit par /exec)
 * 4. Coller cette URL dans index.html → CONFIG.GOOGLE_SHEET_URL
 * 5. (Optionnel) remplir NOTIFY_EMAIL pour recevoir un mail à chaque commande
 */

const NOTIFY_EMAIL = ""; // ex: "vous@gmail.com" — laisser vide pour désactiver
const SHEET_NAME = "Commandes";

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow(["Date", "Nom", "Téléphone", "Ville", "Adresse", "Offre", "Qté", "Total (MAD)", "Statut", "Source", "Navigateur"]);
      sh.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#DC2626").setFontColor("#FFFFFF");
      sh.setFrozenRows(1);
    }
    const d = JSON.parse(e.postData.contents);
    sh.appendRow([d.date, d.name, "'" + d.phone, d.city, d.address, d.offer, d.qty, d.total, "جديد", d.source, d.ua]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "🔥 Nouvelle commande SKHAN — " + d.name + " (" + d.total + " MAD)",
        body: "Nom: " + d.name + "\nTél: " + d.phone + "\nVille: " + d.city + "\nAdresse: " + d.address + "\nOffre: " + d.offer + "\nTotal: " + d.total + " MAD\n\nAppeler: tel:" + d.phone
      });
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("SKHAN webhook OK");
}
