# 🏗️ Architecture Moderne - L'atelier Boulet

## 📋 Vue d'ensemble

**Migration réussie** de Hugo statique vers un stack moderne **Sanity + Astro** avec objectif monétisation **100$/semaine**.

## 🎯 Stack Technologique

### **Backend - Sanity CMS (Spring 2025)**
- **Project ID:** `r3z1isef`
- **Dataset:** `production`
- **Version API:** `2024-05-04`
- **Nouvelles fonctionnalités:** Canvas, App SDK, Functions, Dashboard

### **Frontend - Astro**
- Framework moderne, optimisé SEO
- Génération statique + SSR hybride
- TypeScript + Tailwind CSS
- Interface Ricardo-style pour recettes

### **Intégrations**
- **Amazon Affiliates:** Tag `ateliercboulet-20`
- **Recherche:** MeiliSearch (à venir)
- **Analytics:** Google Analytics 4 (à configurer)
- **Email:** ConvertKit (à configurer)

## 📊 Structure des Données

### **Collections (8 total)**
1. **L'atelier Boulet** 🍳 (Vedette) - Créations de Christian
2. **Maman Monique** 👵 (Vedette) - Recettes familiales traditionnelles  
3. **Ma Tante Marie** 👩‍🍳 (Vedette) - Spécialités de tante Marie
4. **Belle-maman Céline** 💝 (Vedette) - En mémoire de Céline
5. **BBQ Moderne** 🔥 - Techniques BBQ et plancha
6. **Créations Isabelle** 💖 - Recettes de la conjointe
7. **Inspiration Marmitons** 🍽️ - Club culinaire de Québec
8. **Projets à tester** 🧪 - Expérimentations culinaires

### **Recettes (5 complètes)**
1. **Brownies de Jacob** (Projets à tester)
2. **Filet de Porc sauce whisky et pleurotes** (L'atelier Boulet)
3. **Général Tao croustillant au panko** (L'atelier Boulet)
4. **Sauce pour bœuf au brocoli** (L'atelier Boulet)
5. **Côtes de porc BBQ moutarde et érable** (BBQ Moderne)

## 🗂️ Structure des Fichiers

```
atelier-boulet-blog/
├── atelier-boulet-sanity/          # Backend Sanity
│   ├── schemas/                    # Schémas de données
│   │   ├── recipe.ts              # Schéma recettes
│   │   ├── collection.ts          # Schéma collections
│   │   ├── ingredient.ts          # Schéma ingrédients
│   │   └── tool.ts               # Schéma ustensiles
│   ├── scripts/                   # Scripts utilitaires
│   │   ├── inject-remaining-recipes.js
│   │   └── migrate-from-hugo.js
│   └── sanity.config.ts          # Configuration Sanity
│
├── atelier-boulet-frontend/        # Frontend Astro
│   ├── src/
│   │   ├── pages/                 # Pages du site
│   │   │   ├── index.astro       # Page d'accueil
│   │   │   ├── collections/       # Pages collections
│   │   │   │   ├── index.astro   # Liste collections
│   │   │   │   └── [slug].astro  # Page collection
│   │   │   └── recettes/         # Pages recettes
│   │   │       ├── index.astro   # Liste recettes
│   │   │       └── [slug].astro  # Page recette
│   │   ├── lib/
│   │   │   └── sanity.ts         # Client + queries GROQ
│   │   └── layouts/
│   │       └── Layout.astro      # Layout principal
│   └── package.json
│
└── docs/                          # Documentation
    ├── ARCHITECTURE_MODERNE.md
    ├── GUIDE_CREATION_RAPIDE.md
    └── SUIVI_HEBDO.md
```

## 🔧 Commandes de Développement

### **Sanity Studio**
```bash
cd atelier-boulet-sanity
npm run dev  # Studio sur http://localhost:3333
```

### **Frontend Astro**
```bash
cd atelier-boulet-frontend  
npm run dev  # Site sur http://localhost:4321
```

### **Scripts Utilitaires**
```bash
# Injection de recettes (avec SANITY_WRITE_TOKEN)
node scripts/inject-remaining-recipes.js

# Migration depuis Hugo
node scripts/migrate-from-hugo.js
```

## 🎨 Interface Utilisateur

### **Page d'Accueil**
- Hero avec branding "L'atelier Boulet"
- Collections vedettes en grid
- Recettes récentes
- Navigation intuitive

### **Pages Collections**
- Header avec emoji et description
- Grid des recettes de la collection
- Couleurs thématiques personnalisées

### **Pages Recettes - Style Ricardo**
- **Histoire familiale** collapsible en haut
- **Desktop:** Onglets côte à côte (Ingrédients | Instructions)
- **Mobile:** Navigation par onglets (Ingrédients prioritaires)
- **Ustensiles** avec liens Amazon affiliés
- Métadonnées complètes (temps, portions, difficulté)

## 💰 Stratégie de Monétisation

### **Amazon Affiliates (Actuel)**
- Tag: `ateliercboulet-20`
- Liens intégrés sur ustensiles et ingrédients
- Commission sur chaque vente

### **Prochaines Étapes Monétisation**
1. **SEO optimisé** pour trafic organique
2. **Newsletter ConvertKit** pour fidélisation
3. **Cours culinaires** en ligne
4. **Partenariats marques** québécoises
5. **Livre de recettes** numérique

## 🚀 Roadmap Technique

### **Phase 1 - Fondation (✅ Complété)**
- Migration Sanity + Astro
- 5 recettes avec histoires familiales
- 8 collections organisées
- Interface moderne

### **Phase 2 - IA et Automation (En cours)**
- **Canvas:** Rédaction d'histoires avec IA
- **App SDK:** Recherche par ingrédients
- **Functions:** Import automatique n8n
- **Analytics:** Tracking des performances

### **Phase 3 - Croissance**
- Centaines de recettes
- Recherche vocale
- App mobile
- Marketplace de recettes

## 🔐 Sécurité et Tokens

### **Variables d'Environnement**
```bash
# Sanity
SANITY_WRITE_TOKEN=sk...  # Token Editor pour scripts
PUBLIC_SANITY_PROJECT_ID=r3z1isef
PUBLIC_SANITY_DATASET=production

# Amazon
AMAZON_AFFILIATE_TAG=ateliercboulet-20
```

### **Permissions Sanity**
- **Studio:** Accès complet via interface web
- **Scripts:** Token Editor pour création/modification
- **Frontend:** Lecture publique via CDN

## 📈 Métriques de Succès

### **Objectifs Court Terme (3 mois)**
- 20 recettes complètes
- 1000 visiteurs/mois
- 50$/semaine revenus Amazon

### **Objectifs Moyen Terme (6 mois)**
- 50 recettes complètes
- 5000 visiteurs/mois
- **100$/semaine revenus** (OBJECTIF PRINCIPAL)

### **Objectifs Long Terme (12 mois)**
- 100+ recettes complètes
- 15000 visiteurs/mois
- 250$/semaine revenus diversifiés

## 🎯 Points Clés Architecture

### **Avantages Stack Moderne**
- **Scalabilité:** Centaines de recettes sans problème
- **Performance:** Astro + CDN = site ultra-rapide
- **SEO:** Génération statique optimisée
- **Flexibilité:** Sanity permet toute personnalisation
- **IA-Ready:** Canvas et Functions pour automation

### **Différences vs Hugo**
- **Édition:** Interface visuelle vs fichiers markdown
- **Collaboration:** Multi-utilisateurs vs développeur seul
- **Recherche:** IA avancée vs recherche basique
- **Intégrations:** API natives vs plugins limités
- **Monétisation:** Liens dynamiques vs statiques

## 🛠️ Maintenance et Support

### **Sauvegarde**
- **Sanity:** Backup automatique cloud
- **Code:** Git + GitHub
- **Assets:** Sanity Media Library

### **Monitoring**
- **Uptime:** Sanity 99.9% SLA
- **Performance:** Astro build optimisé
- **Erreurs:** Logs Sanity + Vercel

### **Support**
- **Sanity:** Documentation complète + communauté
- **Astro:** Framework moderne bien supporté
- **Amazon:** API affiliés stable

---

## 📝 Notes de Migration

**Migration réussie le:** 10 juin 2025  
**Durée:** ~4 heures intensives  
**Résultat:** Stack moderne professionnel prêt pour croissance

Cette architecture positionne **L'atelier Boulet** pour atteindre l'objectif **100$/semaine** avec une base technique solide et évolutive. 🍁👨‍🍳