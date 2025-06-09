# Guide d'Installation et Configuration

Ce guide vous accompagne dans l'installation et la configuration complète de L'atelier Boulet.

## 📋 Prérequis

### Logiciels Requis

1. **Hugo Extended** (version 0.110.0 ou supérieure)
   - [Instructions d'installation](https://gohugo.io/installation/)
   - Vérifier l'installation : `hugo version`
   - **Important** : La version Extended est nécessaire pour le support SCSS

2. **Git**
   - [Télécharger Git](https://git-scm.com/)
   - Vérifier l'installation : `git --version`

3. **Node.js** (version 14 ou supérieure)
   - [Télécharger Node.js](https://nodejs.org/)
   - Vérifier l'installation : `node --version` et `npm --version`

4. **Éditeur de texte**
   - Recommandé : [VS Code](https://code.visualstudio.com/) avec l'extension Hugo

## 🚀 Installation

### 1. Cloner le Repository

```bash
# Cloner le projet
git clone https://github.com/votre-username/atelier-boulet-blog.git

# Entrer dans le répertoire
cd atelier-boulet-blog
```

### 2. Installer les Dépendances du Thème

```bash
# Aller dans le répertoire du thème
cd themes/blowfish

# Installer les dépendances npm
npm install

# Revenir à la racine du projet
cd ../..
```

### 3. Vérifier l'Installation

```bash
# Lancer le serveur de développement
hugo server -D

# Le site devrait être accessible à http://localhost:1313/
```

## ⚙️ Configuration Initiale

### 1. Configuration de Base (config.toml)

```toml
# Informations de base du site
baseURL = "https://votre-domaine.com/"
title = "L'atelier Boulet"
languageCode = "fr-ca"
defaultContentLanguage = "fr-ca"

# Configuration du thème
theme = "blowfish"
```

### 2. Paramètres du Site

Éditer `config.toml` pour personnaliser :

```toml
[params]
  # Apparence
  colorScheme = "ocean"
  defaultAppearance = "light"
  autoSwitchAppearance = true
  
  # Page d'accueil
  homepage.layout = "background"
  homepage.homepageImage = "images/home-background.jpg"
  homepage.showRecent = true
  homepage.recentLimit = 6
  
  # En-tête et pied de page
  enableSearch = true
  enableCodeCopy = true
  
  # Métadonnées des articles
  article.showDate = true
  article.showAuthor = true
  article.showReadingTime = false
```

### 3. Configuration du Menu

```toml
# Menu principal
[[menu.main]]
  name = "Accueil"
  pageRef = "/"
  weight = 10

[[menu.main]]
  name = "Recettes"
  pageRef = "posts"
  weight = 20
```

### 4. Informations de l'Auteur

```toml
[params.author]
  name = "L'atelier Boulet"
  image = "images/avatar.jpg"
  headline = "Recettes savoureuses et simples"
  bio = "Bienvenue dans mon atelier culinaire où je partage mes meilleures recettes familiales."
  
  # Liens sociaux (optionnel)
  links = [
    { facebook = "https://facebook.com/atelierboulet" },
    { instagram = "https://instagram.com/atelierboulet" },
    { email = "contact@atelier-boulet.com" }
  ]
```

## 📁 Structure des Dossiers

### Créer la Structure de Base

```bash
# Créer les dossiers nécessaires
mkdir -p content/posts
mkdir -p static/images
mkdir -p assets/css
mkdir -p assets/js
mkdir -p layouts/shortcodes
mkdir -p layouts/partials
```

### Organisation Recommandée

```
content/
├── _index.md           # Page d'accueil
├── posts/              # Recettes
│   ├── _index.md      # Page liste des recettes
│   └── *.md           # Fichiers de recettes individuelles
└── about/             # Page à propos (optionnel)
    └── index.md
```

## 🎨 Personnalisation Initiale

### 1. Logo et Favicon

1. Placer votre logo dans `static/images/logo.png`
2. Générer les favicons avec [Favicon Generator](https://favicon.io/)
3. Placer les fichiers dans `static/` :
   - favicon.ico
   - favicon-16x16.png
   - favicon-32x32.png
   - apple-touch-icon.png

### 2. Image de Fond

Pour la page d'accueil avec layout "background" :

1. Ajouter une image haute résolution dans `static/images/home-background.jpg`
2. Dimensions recommandées : 1920x1080 minimum
3. Format : JPEG optimisé (< 500KB)

### 3. CSS Personnalisé

Créer `assets/css/custom.css` :

```css
/* Variables personnalisées */
:root {
  --primary-color: #2563eb;
  --secondary-color: #f97316;
  --font-family-heading: 'Playfair Display', serif;
  --font-family-body: 'Open Sans', sans-serif;
}

/* Styles personnalisés */
.prose h1 {
  font-family: var(--font-family-heading);
}
```

## 🔧 Configuration Avancée

### 1. Netlify CMS

Si vous utilisez Netlify CMS, configurer `static/admin/config.yml` :

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: static/images
public_folder: /images

collections:
  - name: "recettes"
    label: "Recettes"
    folder: "content/posts"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Titre", name: "title", widget: "string"}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Brouillon", name: "draft", widget: "boolean", default: false}
      - {label: "Tags", name: "tags", widget: "list"}
      - {label: "Contenu", name: "body", widget: "markdown"}
```

### 2. Google Analytics (Optionnel)

Dans `config.toml` :

```toml
[params]
  googleAnalytics = "UA-XXXXXXXXX-X"
```

### 3. Commentaires (Optionnel)

Pour activer Disqus :

```toml
[params]
  disqusShortname = "votre-shortname-disqus"
```

## 🧪 Vérification de l'Installation

### Checklist de Vérification

- [ ] Hugo server démarre sans erreur
- [ ] La page d'accueil s'affiche correctement
- [ ] Le menu de navigation fonctionne
- [ ] Les shortcodes de recettes sont reconnus
- [ ] Les styles CSS personnalisés sont appliqués
- [ ] Les images s'affichent correctement
- [ ] Le mode sombre fonctionne (si activé)

### Commandes Utiles

```bash
# Vérifier la configuration
hugo config

# Lister tous les contenus
hugo list all

# Construire le site (production)
hugo --minify

# Nettoyer le cache
hugo --gc
```

## 🐛 Résolution de Problèmes

### Erreurs Communes

1. **"Error: module 'blowfish' not found"**
   - Vérifier que le thème est bien dans `themes/blowfish`
   - S'assurer que le submodule Git est initialisé

2. **"SCSS processing failed"**
   - Installer Hugo Extended (pas la version standard)
   - Vérifier avec `hugo version` (doit mentionner "extended")

3. **"Page not found" sur les recettes**
   - Vérifier la structure dans `content/posts/`
   - S'assurer que `draft: false` dans le front matter

### Support

- Documentation Hugo : https://gohugo.io/documentation/
- Documentation Blowfish : https://blowfish.page/
- Issues du projet : https://github.com/votre-username/atelier-boulet-blog/issues

## ✅ Prochaines Étapes

Une fois l'installation terminée :

1. Créer votre première recette (voir [Guide des Shortcodes](shortcodes-guide.md))
2. Personnaliser l'apparence (voir [Guide de Personnalisation](customization.md))
3. Configurer le déploiement (voir [Guide de Déploiement](deployment.md))