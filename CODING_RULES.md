# 📋 RÈGLES DE CODAGE - L'ATELIER BOULET

*Version 1.0 - 9 juin 2025*

## 🎯 PRINCIPES GÉNÉRAUX

### **Langue et Localisation**
- **Langue principale** : Français (Québec) - `fr-CA`
- **Interface** : 100% française, aucun texte anglais visible
- **Dates** : Format français `"9 juin 2025"` 
- **Mesures** : Système métrique + unités nord-américaines
- **Terminologie** : Adaptée au contexte culinaire québécois

### **Architecture Hugo**
- **Thème** : Blowfish (sous-module Git)
- **Structure** : Collections thématiques par catégories familiales
- **Shortcodes** : Réutilisables, sémantiques, accessibles
- **Performance** : Images WebP, lazy loading, minification

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

### **Recettes**
- **Front matter obligatoire** :
  ```yaml
  ---
  title: "Nom de la recette"
  date: 2025-06-09
  draft: false
  categories: ["maman", "tante-marie", "bbq-moderne", "picky-pub"]
  tags: ["plat-principal", "dessert", "accompagnement"]
  cookTime: "30min"
  prepTime: "15min"
  servings: 4
  difficulty: "Facile"
  collections: ["Maman"]
  histoire: "Contexte familial/personnel de la recette"
  ---
  ```

- **Structure obligatoire** :
  1. Introduction avec histoire familiale
  2. Shortcode `{{< recipe-info >}}`
  3. Shortcode `{{< ingredients-list >}}`
  4. Shortcode `{{< preparation-list >}}`
  5. Shortcode `{{< recipe-notes >}}` (optionnel)
  6. Shortcode `{{< download-pdf >}}`

### **Collections Thématiques**
- **"Maman"** : Recettes maternelles classiques
- **"Ma Tante Marie"** : Spécialités de Marie Hains + anecdotes
- **"BBQ Moderne"** : Créations fumage/grillades
- **"Picky Pub"** : Adaptations restaurant-maison

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
- **Temps sur page** : Indicateur d'engagement
- **Taux de rebond** : < 60% objectif
- **PDF downloads** : Tracking des téléchargements
- **Recettes populaires** : Analytics pour futurs livres

### **Événements Personnalisés**
```javascript
// Exemple tracking PDF
gtag('event', 'download_pdf', {
  'recipe_name': '[nom-recette]',
  'collection': '[collection]'
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
- **Tests** : Lighthouse, HTML validator
- **Déploiement** : GitHub Pages automatique
- **Cache** : Invalidation Cloudflare si applicable

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

### **SEO**
- **Google Search Console** : Monitoring performance
- **Ubersuggest** : Recherche mots-clés
- **Schema.org** : Validation markup

---

*Ces règles évoluent avec le projet. Chaque modification doit être documentée et validée.*

**Dernière mise à jour** : 9 juin 2025 par Christian (L'atelier Boulet)