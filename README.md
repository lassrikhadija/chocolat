# Maison Cacao — Démo Nextiweb

Site vitrine pour une chocolaterie artisanale fictive du Vieux-Montréal.
Quatrième projet du portfolio **Nextiweb.ca** (agence web canadienne).

**Concept** : « L'art du chocolat, magnifié » — esthétique cacao profond + crème + cuivre, dédiée à une maison fève à tablette.

---

## Fonctionnalités

- **Bilingue FR / EN** avec balises `hreflang` (SEO multilingue propre)
- **One-page responsive** (desktop, tablette, mobile)
- **10 sections** : Hero · Histoire · Collections · Chocolatier · Atelier · Avis · FAQ · Commande/Atelier · Contact · Footer
- **Collections interactives** avec 3 onglets (Tablettes single-origin, Truffes & Ganaches, Pralinés Maison) et 12 références
- **Formulaire commande/réservation** (démo, validation HTML5 + JS)
- **FAQ accordéon** avec Schema.org `FAQPage`
- **Galerie photo** en mosaïque
- **Infolettre** dans le footer
- **Badge « Démo Nextiweb »** flottant pointant vers nextiweb.ca

## SEO & Performance

- Schema.org `Store` + `FoodEstablishment` + `FAQPage` complet (rich snippets Google)
- Open Graph + Twitter Cards dans les 2 langues
- `sitemap.xml` + `robots.txt`
- Balises `hreflang` croisées (fr-CA ↔ en-CA)
- Logo SVG inline (favicon vectoriel net sur tous les écrans)
- Lazy loading + `width`/`height` sur toutes les images (zéro CLS)
- Preconnect Google Fonts + Unsplash + DNS prefetch OpenStreetMap
- Accessibilité : skip-link, ARIA, focus visible, `prefers-reduced-motion`

## Charte graphique

| Élément | Valeur |
|---|---|
| Fond principal | `#14090a` (cacao profond) |
| Surface carte | `#2a1c16` (truffe) |
| Texte | `#f3e8d6` (crème praliné) |
| Accent principal | `#c8924a` (cuivre patiné) |
| Accent clair | `#e3b478` (cuivre lumineux) |
| Police titres | Playfair Display (serif italique chic) |
| Police corps | Inter |

Aucune emoji, aucune icône type IA — uniquement des SVG line-art épurés et des glyphes typographiques (★, +).

## Structure

```
04-chocolat-demo/
├── index.html                  # Version FR (langue par défaut)
├── index-en.html               # Version EN
├── robots.txt
├── sitemap.xml
├── css/style.css               # Charte cacao + crème + cuivre
├── js/script.js                # Interactions + i18n
├── images/
│   ├── logo-mark.svg           # Favicon SVG inline
│   └── optimized/              # (à remplir : photos boutique/atelier)
└── README.md
```

## Images

Le démo utilise pour le moment des photographies **Unsplash** chargées via leur CDN (chocolat noir, atelier, truffes, etc.). Pour une mise en production avec les vraies photos de la chocolaterie cliente :

1. Déposer les photos dans `images/optimized/` (formats `.jpg` + `.webp`)
2. Remplacer chaque URL `https://images.unsplash.com/...` par le chemin local correspondant
3. Idéalement, encadrer chaque `<img>` dans une balise `<picture>` avec une `<source>` WebP

## Stack

- HTML5 sémantique
- CSS pur (variables CSS, grid, flexbox) — **pas de framework**
- JavaScript vanilla — **pas de dépendance**
- Polices Google : Playfair Display + Inter + Italiana
- Carte : OpenStreetMap (sans API key, sans tracking)

## Déploiement Hostinger

1. Uploader tout le dossier (sauf `README.md`) à la racine du domaine
2. Vérifier que le `.htaccess` Hostinger sert `index.html` par défaut
3. Pour la version EN, accessible via `/index-en.html`
4. Mettre à jour les URLs dans `index.html`, `index-en.html`, `sitemap.xml` et le Schema.org JSON-LD si le domaine final diffère de `maison-cacao.ca`
5. Forcer HTTPS depuis le panneau Hostinger

## Licence

Site démo créé à des fins de portfolio. Tous droits réservés à **Nextiweb.ca**.

---

*Conçu par [Nextiweb.ca](https://nextiweb.ca) — Création de sites web sur mesure au Canada.*
