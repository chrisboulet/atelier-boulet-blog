# Guide de Personnalisation

Ce guide vous accompagne dans la personnalisation complète de votre blog de recettes, du design aux fonctionnalités.

## 🎨 Personnalisation du Design

### Schémas de Couleurs

Le thème Blowfish offre plusieurs schémas prédéfinis. Pour changer :

```toml
# config.toml
[params]
  colorScheme = "ocean"  # Schéma actuel
```

**Schémas disponibles :**
- `autumn` - Tons chauds automnaux
- `avocado` - Vert moderne et frais
- `fire` - Rouge et orange dynamiques
- `forest` - Vert forêt naturel
- `ocean` - Bleu océan (actuel)
- `slate` - Gris élégant
- `congo` - Palette africaine
- `neon` - Couleurs vives néon
- `terminal` - Style terminal rétro

### CSS Personnalisé

#### 1. Structure des Fichiers CSS

```
assets/
├── css/
│   ├── custom.css      # Vos styles personnalisés
│   └── recipe.css      # Styles des recettes
```

#### 2. Variables CSS Globales

Créer ou modifier `assets/css/custom.css` :

```css
/* Variables de couleurs personnalisées */
:root {
  /* Couleurs principales */
  --color-primary: #2563eb;      /* Bleu principal */
  --color-secondary: #f97316;    /* Orange secondaire */
  --color-accent: #10b981;       /* Vert accent */
  
  /* Couleurs neutres */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f4f4f5;
  --color-neutral-200: #e4e4e7;
  --color-neutral-800: #27272a;
  --color-neutral-900: #18181b;
  
  /* Typographie */
  --font-family-heading: 'Playfair Display', serif;
  --font-family-body: 'Inter', sans-serif;
  --font-family-mono: 'Fira Code', monospace;
  
  /* Espacements */
  --spacing-unit: 1rem;
  --content-width: 65ch;
  
  /* Animations */
  --transition-speed: 200ms;
  --animation-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Mode sombre */
[data-scheme="dark"] {
  --color-primary: #60a5fa;
  --color-secondary: #fb923c;
  --color-accent: #34d399;
}
```

#### 3. Styles des Recettes

Personnaliser l'apparence des recettes :

```css
/* assets/css/recipe.css */

/* Carte de recette sur la page d'accueil */
.recipe-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform var(--transition-speed) ease;
}

.recipe-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* Image de recette avec overlay */
.recipe-image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

.recipe-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  opacity: 0;
  transition: opacity var(--transition-speed);
}

.recipe-card:hover .recipe-image::after {
  opacity: 1;
}

/* Badges de catégorie */
.recipe-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--color-accent);
  color: white;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Temps de préparation avec icône */
.recipe-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-neutral-600);
}

.recipe-time::before {
  content: '⏱️';
  font-size: 1.25rem;
}
```

### Polices Personnalisées

#### 1. Google Fonts

Ajouter dans `layouts/partials/extend-head.html` :

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

<style>
  /* Appliquer les polices */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
  }
  
  body {
    font-family: 'Inter', sans-serif;
  }
</style>
```

#### 2. Polices Locales

Pour de meilleures performances :

```css
/* assets/css/fonts.css */
@font-face {
  font-family: 'Ma Police';
  src: url('/fonts/ma-police.woff2') format('woff2'),
       url('/fonts/ma-police.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

## 📱 Personnalisation Responsive

### Points de Rupture

```css
/* Système de grille responsive */
.recipe-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

/* Tablette */
@media (min-width: 768px) {
  .recipe-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .recipe-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Large Desktop */
@media (min-width: 1280px) {
  .recipe-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Navigation Mobile

```css
/* Menu hamburger personnalisé */
.mobile-menu-toggle {
  display: none;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
}

@media (max-width: 767px) {
  .mobile-menu-toggle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
  }
  
  .mobile-menu-toggle span {
    display: block;
    width: 24px;
    height: 2px;
    background: currentColor;
    transition: all 0.3s;
  }
  
  .mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }
  
  .mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
}
```

## 🍔 Personnalisation du Menu

### Configuration du Menu Principal

```toml
# config.toml

# Menu simple
[[menu.main]]
  name = "🏠 Accueil"
  pageRef = "/"
  weight = 10

[[menu.main]]
  name = "📖 Recettes"
  pageRef = "posts"
  weight = 20

[[menu.main]]
  name = "🏷️ Catégories"
  pageRef = "categories"
  weight = 30

# Menu avec sous-menus
[[menu.main]]
  name = "🍳 Recettes"
  weight = 20
  identifier = "recipes"

[[menu.main]]
  parent = "recipes"
  name = "Entrées"
  pageRef = "categories/entrees"
  weight = 21

[[menu.main]]
  parent = "recipes"
  name = "Plats"
  pageRef = "categories/plats"
  weight = 22

[[menu.main]]
  parent = "recipes"
  name = "Desserts"
  pageRef = "categories/desserts"
  weight = 23
```

### Menu Personnalisé avec Icônes

Créer `layouts/partials/extend-header.html` :

```html
<nav class="custom-nav">
  <ul class="nav-list">
    {{ range .Site.Menus.main }}
      <li class="nav-item">
        <a href="{{ .URL }}" class="nav-link">
          {{ if .Pre }}
            <span class="nav-icon">{{ .Pre }}</span>
          {{ end }}
          <span class="nav-text">{{ .Name }}</span>
        </a>
        
        {{ if .HasChildren }}
          <ul class="nav-submenu">
            {{ range .Children }}
              <li>
                <a href="{{ .URL }}">{{ .Name }}</a>
              </li>
            {{ end }}
          </ul>
        {{ end }}
      </li>
    {{ end }}
  </ul>
</nav>
```

## 🏠 Page d'Accueil Personnalisée

### Layouts Disponibles

```toml
# config.toml
[params.homepage]
  layout = "background"  # Options: page, profile, hero, card, background
  homepageImage = "images/home-bg.jpg"
  showRecent = true
  recentLimit = 9
```

### Layout Personnalisé

Créer `layouts/index.html` :

```html
{{ define "main" }}
<div class="homepage-custom">
  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">Bienvenue à L'atelier Boulet</h1>
      <p class="hero-subtitle">Des recettes familiales avec une touche moderne</p>
      <a href="/posts" class="hero-button">Découvrir les recettes</a>
    </div>
    <div class="hero-image">
      <img src="/images/hero-cooking.jpg" alt="Cuisine">
    </div>
  </section>
  
  <!-- Recettes à la Une -->
  <section class="featured-recipes">
    <h2>Recettes à la Une</h2>
    <div class="recipe-carousel">
      {{ range first 3 (where .Site.RegularPages "Params.featured" true) }}
        {{ partial "recipe-card.html" . }}
      {{ end }}
    </div>
  </section>
  
  <!-- Catégories Populaires -->
  <section class="popular-categories">
    <h2>Explorer par Catégorie</h2>
    <div class="category-grid">
      {{ range .Site.Taxonomies.categories }}
        <a href="{{ .Page.Permalink }}" class="category-card">
          <img src="/images/categories/{{ .Page.Title | urlize }}.jpg" alt="{{ .Page.Title }}">
          <h3>{{ .Page.Title }}</h3>
          <span>{{ len .Pages }} recettes</span>
        </a>
      {{ end }}
    </div>
  </section>
  
  <!-- Newsletter -->
  <section class="newsletter">
    <h2>Restez Informé</h2>
    <p>Recevez nos nouvelles recettes directement dans votre boîte mail</p>
    <form class="newsletter-form">
      <input type="email" placeholder="Votre email">
      <button type="submit">S'inscrire</button>
    </form>
  </section>
</div>
{{ end }}
```

## 🔌 Widgets et Composants

### Widget Recette du Jour

Créer `layouts/partials/recipe-of-day.html` :

```html
<div class="widget recipe-of-day">
  <h3>🌟 Recette du Jour</h3>
  {{ $pages := where .Site.RegularPages "Section" "posts" }}
  {{ $randomPage := index (shuffle $pages) 0 }}
  <div class="rod-content">
    {{ with $randomPage }}
      <img src="{{ .Params.image }}" alt="{{ .Title }}">
      <h4><a href="{{ .Permalink }}">{{ .Title }}</a></h4>
      <p>{{ .Summary | truncate 100 }}</p>
      <a href="{{ .Permalink }}" class="rod-link">Voir la recette →</a>
    {{ end }}
  </div>
</div>
```

### Widget Tags Populaires

```html
<div class="widget popular-tags">
  <h3>🏷️ Tags Populaires</h3>
  <div class="tag-cloud">
    {{ range $name, $taxonomy := .Site.Taxonomies.tags }}
      {{ $count := len $taxonomy.Pages }}
      {{ if gt $count 2 }}
        <a href="{{ "/tags/" | relLangURL }}{{ $name | urlize }}" 
           class="tag-item tag-size-{{ $count }}">
          {{ $name }} ({{ $count }})
        </a>
      {{ end }}
    {{ end }}
  </div>
</div>
```

## 🎯 Fonctionnalités Avancées

### Mode Zen Personnalisé

```javascript
// assets/js/custom-zen-mode.js
document.addEventListener('DOMContentLoaded', function() {
  const zenButton = document.createElement('button');
  zenButton.className = 'zen-mode-toggle';
  zenButton.innerHTML = '🧘 Mode Zen';
  zenButton.onclick = toggleZenMode;
  
  document.body.appendChild(zenButton);
  
  function toggleZenMode() {
    document.body.classList.toggle('zen-mode');
    if (document.body.classList.contains('zen-mode')) {
      zenButton.innerHTML = '❌ Quitter Zen';
      // Masquer les distractions
      document.querySelectorAll('.sidebar, .ads, .social-share').forEach(el => {
        el.style.display = 'none';
      });
    } else {
      zenButton.innerHTML = '🧘 Mode Zen';
      // Restaurer les éléments
      document.querySelectorAll('.sidebar, .ads, .social-share').forEach(el => {
        el.style.display = '';
      });
    }
  }
});
```

### Système de Favoris

```javascript
// assets/js/favorites.js
class RecipeFavorites {
  constructor() {
    this.favorites = JSON.parse(localStorage.getItem('recipeFavorites') || '[]');
    this.init();
  }
  
  init() {
    // Ajouter boutons favoris
    document.querySelectorAll('.recipe-card').forEach(card => {
      const btn = document.createElement('button');
      btn.className = 'favorite-btn';
      btn.innerHTML = '❤️';
      btn.onclick = () => this.toggleFavorite(card.dataset.recipeId);
      card.appendChild(btn);
    });
    
    this.updateUI();
  }
  
  toggleFavorite(recipeId) {
    const index = this.favorites.indexOf(recipeId);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(recipeId);
    }
    
    localStorage.setItem('recipeFavorites', JSON.stringify(this.favorites));
    this.updateUI();
  }
  
  updateUI() {
    document.querySelectorAll('.recipe-card').forEach(card => {
      const btn = card.querySelector('.favorite-btn');
      const isFavorite = this.favorites.includes(card.dataset.recipeId);
      btn.classList.toggle('active', isFavorite);
    });
  }
}

new RecipeFavorites();
```

## 🌐 Internationalisation

### Configuration Multilingue

```toml
# config.toml
defaultContentLanguage = "fr"
defaultContentLanguageInSubdir = false

[languages]
  [languages.fr]
    title = "L'atelier Boulet"
    weight = 1
    languageName = "Français"
    
  [languages.en]
    title = "Boulet's Kitchen"
    weight = 2
    languageName = "English"
    
    [languages.en.params]
      description = "Family recipes with a modern twist"
```

### Traductions Personnalisées

Créer `i18n/fr.yaml` :

```yaml
# Boutons
read_more: "Lire la suite"
view_recipe: "Voir la recette"
download_pdf: "Télécharger en PDF"

# Métadonnées
prep_time: "Temps de préparation"
cook_time: "Temps de cuisson"
servings: "Portions"

# Navigation
previous_recipe: "Recette précédente"
next_recipe: "Recette suivante"
back_to_recipes: "Retour aux recettes"
```

## 📦 Plugins et Extensions

### Intégration de Plugins JavaScript

```html
<!-- layouts/partials/extend-footer.html -->

<!-- Lightbox pour images -->
<script src="https://cdn.jsdelivr.net/npm/glightbox@3/dist/js/glightbox.min.js"></script>
<script>
  const lightbox = GLightbox({
    selector: '.recipe-image img'
  });
</script>

<!-- Animation au scroll -->
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script>
  AOS.init({
    duration: 800,
    once: true
  });
</script>

<!-- Partage social -->
<script>
  function shareRecipe(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    
    const shareUrls = {
      facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  }
</script>
```

## 🎉 Animations et Effets

### Animations CSS

```css
/* assets/css/animations.css */

/* Fade in au chargement */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.recipe-card {
  animation: fadeIn 0.6s ease-out;
  animation-fill-mode: both;
}

.recipe-card:nth-child(1) { animation-delay: 0.1s; }
.recipe-card:nth-child(2) { animation-delay: 0.2s; }
.recipe-card:nth-child(3) { animation-delay: 0.3s; }

/* Effet parallaxe */
.parallax-section {
  position: relative;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 400px;
}

/* Loading skeleton */
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## 🔧 Optimisation des Performances

### Images Optimisées

```html
<!-- layouts/partials/recipe-image.html -->
<picture class="recipe-image">
  <source 
    srcset="{{ .Params.image }}.webp" 
    type="image/webp">
  <source 
    srcset="{{ .Params.image }}" 
    type="image/jpeg">
  <img 
    src="{{ .Params.image }}" 
    alt="{{ .Title }}"
    loading="lazy"
    decoding="async"
    width="1200"
    height="800">
</picture>
```

### CSS Critical Path

```html
<!-- layouts/partials/critical-css.html -->
<style>
  /* CSS critique inline */
  :root {
    --color-primary: #2563eb;
    --color-bg: #ffffff;
    --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  
  body {
    margin: 0;
    font-family: var(--font-body);
    background: var(--color-bg);
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Éviter le layout shift */
  img {
    aspect-ratio: attr(width) / attr(height);
  }
</style>
```

## 📊 Monitoring et Analytics

### Configuration Analytics

```javascript
// assets/js/analytics.js

// Tracker personnalisé
class RecipeAnalytics {
  track(event, data) {
    if (typeof gtag !== 'undefined') {
      gtag('event', event, {
        event_category: 'Recipe',
        ...data
      });
    }
  }
  
  trackRecipeView(recipeTitle) {
    this.track('view_recipe', {
      event_label: recipeTitle,
      value: 1
    });
  }
  
  trackPDFDownload(recipeTitle) {
    this.track('download_pdf', {
      event_label: recipeTitle,
      value: 1
    });
  }
  
  trackSearch(searchTerm) {
    this.track('search', {
      search_term: searchTerm
    });
  }
}

window.recipeAnalytics = new RecipeAnalytics();
```

Cette documentation couvre les principaux aspects de la personnalisation. Pour des besoins spécifiques, n'hésitez pas à consulter la documentation Hugo et Blowfish.