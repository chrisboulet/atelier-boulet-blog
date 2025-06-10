# 🚀 CONFIGURATION SANITY SPRING 2025 - L'ATELIER BOULET

## Authentification Requise (Première étape)

**Tu dois d'abord te connecter à Sanity :**

```bash
# Dans le terminal, execute :
npx sanity login

# Choisis GitHub comme méthode d'authentification  
# Utilise ton compte: christian@cboulet.info
```

## Architecture Sanity 2025 Optimisée

### **1. Dashboard Central**
- Hub unifié pour toutes les opérations
- Accès Canvas, Studio, Media Library, Apps custom
- Vue d'ensemble performance contenus

### **2. Canvas pour Histoires Familiales**  
- Rédaction IA-assistée des histoires de recettes
- Interface libre sans contraintes de schéma
- Perfect pour tes anecdotes Tante Marie, Maman Monique, etc.

### **3. App SDK Custom "Recherche Ingrédients"**
```typescript
// Future app custom pour "5 ingrédients = suggestions recettes"
interface IngredientSearchApp {
  ingredients: string[]
  suggestions: Recipe[]
  filters: CollectionFilter[]
}
```

### **4. Functions Automation**
```typescript
// Automation import depuis n8n
export const importRecipeFromN8N = async (webhook: WebhookData) => {
  // Auto-création recettes depuis tes soumissions
}
```

### **5. Content Releases** 
- Planification publications hebdomadaires
- Staging des recettes avant publication
- Workflow éditorial structuré

## Commandes d'Installation 2025

```bash
# 1. Créer le projet avec les nouveautés 2025
mkdir atelier-boulet-sanity && cd atelier-boulet-sanity

# 2. Initialiser avec le nouveau CLI
npx create-sanity@latest --project-id r3z1isef --dataset production

# 3. Installer les nouveaux packages 2025
npm install @sanity/canvas @sanity/app-sdk @sanity/functions

# 4. Configuration française
npm install @sanity/locale-fr-ca
```

## Schémas Optimisés 2025

### **Recipe Schema avec IA**
```typescript
export default {
  name: 'recipe',
  title: 'Recette',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre de la recette',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'familyStory',
      title: 'Histoire familiale',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Rédigé avec Canvas AI'
    },
    {
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{type: 'collection'}],
      options: {
        list: [
          {title: '👵 Maman Monique', value: 'maman-monique'},
          {title: '👩‍🍳 Ma Tante Marie', value: 'tante-marie'},
          {title: '🍽️ L\'atelier Boulet', value: 'atelier-boulet'},
          {title: '🔥 BBQ Moderne', value: 'bbq-moderne'},
          {title: '💝 Belle-maman Céline', value: 'belle-maman-celine'},
          {title: '🎨 Créations Isabelle', value: 'creations-isabelle'},
          {title: '👨‍🍳 Inspiration Marmitons', value: 'inspiration-marmitons'},
          {title: '🧪 Projets à tester', value: 'projets-a-tester'}
        ]
      }
    },
    {
      name: 'ingredients',
      title: 'Ingrédients',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', type: 'string', title: 'Ingrédient'},
          {name: 'quantity', type: 'string', title: 'Quantité'},
          {name: 'amazonLink', type: 'url', title: 'Lien Amazon (tag: ateliercboulet-20)'}
        ]
      }]
    },
    {
      name: 'tools',
      title: 'Ustensiles recommandés',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', type: 'string', title: 'Ustensile'},
          {name: 'amazonLink', type: 'url', title: 'Lien Amazon (tag: ateliercboulet-20)'},
          {name: 'essential', type: 'boolean', title: 'Essentiel?'}
        ]
      }]
    },
    {
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'searchableIngredients',
      title: 'Ingrédients pour recherche',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Tags pour recherche avancée "5 ingrédients = suggestions"'
    }
  ]
}
```

## Canvas Configuration

```typescript
// Canvas pour histoires familiales avec IA
export const canvasConfig = {
  locale: 'fr-CA',
  aiAssistance: {
    enabled: true,
    tone: 'familial-québécois',
    context: 'histoires-culinaires-patrimoine'
  },
  templates: [
    'Histoire de Maman Monique',
    'Anecdote Tante Marie', 
    'Souvenir BBQ familial',
    'Tradition des Fêtes'
  ]
}
```

## Media Library 2025

```typescript
// Organisation optimisée pour blog culinaire
export const mediaConfig = {
  folders: [
    'recettes/maman-monique',
    'recettes/tante-marie',
    'recettes/atelier-boulet',
    'recettes/bbq-moderne',
    'recettes/belle-maman-celine',
    'recettes/creations-isabelle',
    'recettes/inspiration-marmitons',
    'recettes/projets-a-tester',
    'ustensiles-amazon',
    'ingredients-products'
  ],
  imageOptimization: {
    formats: ['webp', 'avif'],
    quality: 85,
    responsive: true
  }
}
```

## Prochaines Étapes

1. **TOI** : `npx sanity login` avec GitHub
2. **MOI** : Configuration complète Studio 2025
3. **ENSEMBLE** : Test Canvas pour première histoire familiale
4. **MOI** : Setup Astro frontend connecté
5. **TOI** : Premier test ajout recette via interface moderne

**Prêt à commencer l'authentification ?** 🚀