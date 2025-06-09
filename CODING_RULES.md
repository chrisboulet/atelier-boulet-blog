# 📋 RÈGLES DE CODAGE - L'ATELIER BOULET

*Version 1.1 - 9 juin 2025*

## 🎯 PRINCIPES GÉNÉRAUX

### **Mission du Projet**
- **Vision** : Héritage Culinaire Québécois - 3 générations de saveurs
- **Objectif financier** : 100$/semaine (400$/mois) d'ici 6 mois
- **Purpose** : Financer projets personnels via monétisation authentique
- **Impact** : Préserver patrimoine familial + créer revenus durables

### **Langue et Localisation**
- **Langue principale** : Français (Québec) - `fr-CA`
- **Interface** : 100% française, aucun texte anglais visible
- **Dates** : Format français `"9 juin 2025"` 
- **Mesures** : Système métrique + unités nord-américaines
- **Terminologie** : Adaptée au contexte culinaire québécois

### **Architecture Hugo**
- **Thème** : Blowfish (sous-module Git) - Couleurs "autumn"
- **Structure** : Collections thématiques par catégories familiales
- **Shortcodes** : Réutilisables, sémantiques, accessibles
- **Performance** : Images WebP, lazy loading, minification
- **Monétisation** : Liens affiliés intégrés naturellement

---

## 🏗️ STRUCTURE DU PROJET

```
/
├── content/
│   ├── posts/           # Recettes par collections
│   │   ├── maman/       # Collection "Maman"
│   │   ├── tante-marie/ # Collection "Ma Tante Marie"
│   │   ├── bbq-moderne/ # Collection "BBQ Moderne" 
│   │   └── picky-pub/   # Collection "Picky Pub"
│   ├── about.md
│   └── contact.md
├── layouts/
│   ├── shortcodes/      # Composants recettes
│   └── partials/        # Éléments réutilisables
├── assets/
│   ├── css/             # Styles personnalisés
│   └── images/          # Images optimisées
├── static/              # Fichiers statiques
├── config/              # Configuration multilingue
└── i18n/               # Traductions personnalisées
```

---

## 📝 RÈGLES DE CONTENU

### **🔒 RÈGLE SUPRÊME DES RECETTES**
> **SEUL LE PROPRIÉTAIRE DU BLOG (Christian) PEUT MODIFIER LES INGRÉDIENTS OU INSTRUCTIONS D'UNE RECETTE**
> 
> Claude peut :
> - ✅ Enrichir avec histoires familiales authentiques (sur demande)
> - ✅ Ajouter liens affiliés dans sections recommandations
> - ✅ Améliorer formatting et structure
> - ✅ Créer sections contextuelles (notes, variations, transmission)
> 
> Claude ne peut jamais :
> - ❌ Modifier quantités d'ingrédients
> - ❌ Changer étapes de préparation
> - ❌ Inventer histoires familiales
> - ❌ Substituer ingrédients sans autorisation explicite

### **Format Recipe-Heritage (Template Monétisé)**
- **Archetype** : `archetypes/recipe-heritage.md`
- **Front matter enrichi** :
  ```yaml
  ---
  title: "Nom de la recette - Contexte familial"
  date: 2025-06-09
  tags: ["plat-principal", "tradition-familiale", "recette-authentique"]
  summary: "Histoire courte + contexte de création"
  collection: "maman|tante-marie|bbq-moderne|atelier-boulet"
  ---
  ```

- **Structure enrichie obligatoire** :
  1. **Histoire familiale** (authentique uniquement)
  2. `{{< recipe-info >}}` avec timing réaliste
  3. **Section ustensiles recommandés** avec `{{< amazon-link >}}`
  4. `{{< ingredients-list >}}` avec mentions producteurs locaux
  5. `{{< preparation-list >}}` avec trucs familiaux
  6. `{{< recipe-notes >}}` secrets et anecdotes
  7. `{{< recipe-variations >}}` évolutions testées
  8. **Section "Transmettre la tradition"**
  9. `{{< download-pdf >}}`

### **Shortcode Amazon Affilié**
```hugo
{{< amazon-link "URL_PRODUIT" "NOM_PRODUIT" "PRIX_OPTIONNEL" >}}
```
- **Tag automatique** : `ateliercboulet-20` (spécifique L'atelier Boulet)
- **Attributs SEO** : `rel="noopener noreferrer sponsored"`
- **Style intégré** : Boutons avec hover Amazon orange
- **Usage** : Uniquement dans sections "ustensiles recommandés"

### **Collections Thématiques**
- **"Maman"** : Recettes maternelles classiques
- **"Ma Tante Marie"** : Spécialités de Marie Hains + anecdotes extraordinaires
- **"BBQ Moderne"** : Créations fumage/grillades (niche rentable)
- **"L'atelier Boulet"** : Adaptations Picadilly Pub vers maison

---

## 🎨 RÈGLES DE STYLE

### **CSS**
- **Mobile-first** : Design responsive obligatoire
- **Variables CSS** : Utiliser les custom properties du thème
- **Nommage** : Convention BEM pour les classes personnalisées
- **Performance** : Minification automatique en production

### **Images**
- **Format** : WebP prioritaire, fallback JPEG
- **Tailles** : Multiples résolutions (Hugo image processing)
- **Alt text** : Obligatoire, descriptif pour accessibilité
- **Lazy loading** : Automatique via thème

### **Couleurs**
```css
:root {
  --recipe-primary: #2563eb;
  --recipe-accent: #f59e0b;
  --recipe-background: #f8fafc;
  --recipe-text: #334155;
}
```

---

## 🔧 RÈGLES TECHNIQUES

### **Shortcodes Hugo**
- **Paramètres** : Validation obligatoire des inputs
- **Sécurité** : Échapper les contenus utilisateur
- **Accessibilité** : ARIA labels, structure sémantique
- **Performance** : Éviter JavaScript lourd côté client

### **Configuration**
- **Langue par défaut** : `fr-CA`
- **SEO** : Meta tags complets pour chaque page
- **Analytics** : Google Analytics 4 en production
- **Cache** : Headers appropriés pour ressources statiques

### **Git**
- **Branches** : `main` pour production, features en branches
- **Messages** : Français, conventionnels (`feat:`, `fix:`, `docs:`)
- **Thème** : Sous-module Git, ne pas modifier directement

---

## 📱 RÈGLES UX/UI

### **Navigation**
- **Menu principal** : Collections bien visibles
- **Recherche** : Filtres par collection, temps de cuisson
- **Breadcrumbs** : Navigation hiérarchique claire

### **Recettes**
- **Temps de lecture** : Estimé automatiquement
- **Impression** : Version print-friendly obligatoire
- **PDF** : Génération sans émojis, format professionnel
- **Partage** : Boutons réseaux sociaux intégrés

### **Performance**
- **Lighthouse** : Score > 90 obligatoire
- **Core Web Vitals** : Respect des métriques Google
- **Temps de chargement** : < 3s sur mobile 3G

---

## 🔒 RÈGLES DE SÉCURITÉ

### **Contenu**
- **Soumission recettes** : Protection par mot de passe
- **Validation** : Sanitisation des entrées utilisateur
- **HTTPS** : Force redirect en production
- **Headers** : CSP, HSTS configurés

### **Données**
- **Pas de cookies** : Tracking minimal respectueux
- **Analytics** : Anonymisation IP activée
- **Formulaires** : Protection anti-spam

---

## 🌍 RÈGLES SEO

### **Meta Tags**
```html
<title>Recette [Nom] | Collection [Famille] | L'atelier Boulet</title>
<meta name="description" content="[Description 150-160 chars]">
<meta property="og:type" content="article">
<meta name="keywords" content="recette québécoise, [collection], [ingredients]">
```

### **Schema.org**
- **Recipe markup** : Obligatoire pour toutes les recettes
- **Organization** : Données structurées du site
- **BreadcrumbList** : Navigation structurée

### **URLs**
- **Structure** : `/posts/[collection]/[nom-recette]/`
- **Slugs** : Français avec tirets, pas d'accents
- **Redirections** : 301 pour changements d'URL

---

## 🧪 RÈGLES DE TEST

### **Validation**
- **HTML** : W3C validator avant publication
- **Accessibilité** : Tests WAVE/axe obligatoires
- **Performance** : Lighthouse CI/CD
- **Liens** : Vérification automatique des liens morts

### **Responsive**
- **Breakpoints** : Mobile (320px), Tablet (768px), Desktop (1024px)
- **Tests** : Safari iOS, Chrome Android, Firefox desktop
- **Images** : Responsive dans tous contextes

---

## 📊 RÈGLES ANALYTICS

### **Métriques Clés**
- **Revenus mensuels** : Objectif 400$/mois (100$/semaine)
- **Conversions affiliés** : Taux de clic et ventes
- **Temps sur page** : Indicateur d'engagement
- **Taux de rebond** : < 60% objectif
- **PDF downloads** : Tracking des téléchargements
- **Recettes populaires** : Analytics pour futurs livres
- **Email signups** : Croissance liste pour produits digitaux

### **Événements Personnalisés**
```javascript
// Tracking monétisation
gtag('event', 'affiliate_click', {
  'recipe_name': '[nom-recette]',
  'product_type': '[ustensile/ingredient]',
  'affiliate_partner': '[amazon/canadian-tire]'
});

gtag('event', 'download_pdf', {
  'recipe_name': '[nom-recette]',
  'collection': '[collection]'
});

gtag('event', 'email_signup', {
  'lead_magnet': '[guide-bbq/newsletter]'
});
```

---

## 🚀 RÈGLES DE DÉPLOIEMENT

### **Environnements**
- **Développement** : `hugo server -D --bind 0.0.0.0`
- **Staging** : Branche `staging` déployée automatiquement
- **Production** : Merge sur `main` → GitHub Actions

### **CI/CD**
- **Build** : Hugo + optimisations
- **Tests** : Lighthouse, HTML validator, liens affiliés
- **Déploiement** : GitHub Pages automatique
- **Cache** : Invalidation Cloudflare si applicable
- **Monitoring** : Tracking revenus et performance

---

## 💰 RÈGLES MONÉTISATION

### **Stratégie 100$/Semaine**
- **Phase 1 (Mois 1-3)** : Amazon affiliés + AdSense = 50$/mois
- **Phase 2 (Mois 4-6)** : Produits digitaux + partenariats = 400$/mois
- **Phase 3 (Mois 7+)** : Services + contenu sponsorisé = 800$/mois+

### **Intégration Naturelle**
- **Liens affiliés** : Toujours contextuel, jamais forcé
- **Recommandations** : Uniquement produits testés/approuvés
- **Transparence** : Mentions légales claires
- **Valeur ajoutée** : Guides d'achat détaillés

### **Tracking Performance**
- **ROI par recette** : Quelles recettes génèrent le plus
- **Produits best-sellers** : Focus sur les plus rentables
- **Saisonnalité** : Adapter promotions aux périodes (BBQ été, etc.)
- **A/B testing** : Optimiser emplacements et messages

---

## 📚 RESSOURCES ET OUTILS

### **Développement**
- **Hugo** : v0.128.0+ (extended)
- **Node.js** : v18+ pour build process thème
- **Git** : Gestion des sous-modules

### **Design**
- **Figma** : Maquettes et prototypes
- **Canva** : Visuels réseaux sociaux
- **Photoshop/GIMP** : Traitement images recettes

### **SEO & Monétisation**
- **Google Search Console** : Monitoring performance
- **Ubersuggest** : Recherche mots-clés "recettes + ustensiles"
- **Schema.org** : Validation markup recettes
- **Amazon Associates** : Programme affilié principal
- **ConvertKit** : Email marketing et lead magnets
- **Canva** : Visuels pour produits digitaux

---

*Ces règles évoluent avec le projet. Chaque modification doit être documentée et validée.*

**Dernière mise à jour** : 9 juin 2025 par Christian (L'atelier Boulet)
- **v1.1** : Ajout règle suprême recettes + format Recipe-Heritage + shortcode amazon-link