# Guide des Shortcodes de Recettes

Les shortcodes personnalisés permettent de structurer vos recettes de manière cohérente et professionnelle. Ce guide détaille l'utilisation de chaque shortcode disponible.

## 📝 Vue d'Ensemble

Les shortcodes de recettes offrent :
- Structure standardisée pour toutes les recettes
- Présentation professionnelle et cohérente
- Responsive design automatique
- Support du mode sombre
- Génération PDF intégrée

## 🍳 Shortcodes Disponibles

### 1. recipe-info - Informations de Base

Affiche les informations essentielles de la recette dans un tableau élégant.

**Syntaxe :**
```markdown
{{< recipe-info portions="8" prep="20 minutes" cuisson="30 minutes" >}}
```

**Paramètres :**
- `portions` : Nombre de portions
- `prep` : Temps de préparation
- `cuisson` : Temps de cuisson

**Rendu :**
- Tableau avec icônes : 🍽️ Portions | ⏱️ Préparation | 🔥 Cuisson
- Style avec bordures arrondies et ombres
- Responsive sur mobile

### 2. ingredients-list - Liste des Ingrédients

Présente les ingrédients dans un tableau structuré.

**Syntaxe :**
```markdown
{{< ingredients-list >}}
- 200g : Chocolat noir 70%
- 150g : Beurre doux
- 3 : Œufs moyens
- 100g : Sucre en poudre
- 50g : Farine tout usage
{{< /ingredients-list >}}
```

**Format :**
- Format : `quantité : ingrédient`
- Un ingrédient par ligne
- Commence par un tiret `-`

**Rendu :**
- Tableau deux colonnes : Quantité | Ingrédient
- En-tête avec dégradé bleu foncé
- Hover effect sur les lignes

### 3. preparation-list - Étapes de Préparation

Liste numérotée des étapes de préparation.

**Syntaxe :**
```markdown
{{< preparation-list >}}
- Préchauffer le four à 180°C (350°F)
- Faire fondre le chocolat et le beurre au bain-marie
- Dans un bol, battre les œufs avec le sucre
- Incorporer le chocolat fondu au mélange œufs-sucre
- Ajouter la farine tamisée et mélanger délicatement
- Verser dans un moule beurré et enfourner 25 minutes
{{< /preparation-list >}}
```

**Format :**
- Une étape par ligne
- Commence par un tiret `-`
- Numérotation automatique

**Rendu :**
- Tableau avec numéros d'étapes
- En-tête avec dégradé orange
- Largeur optimale pour la lecture

### 4. recipe-notes - Notes et Conseils

Section pour les conseils et astuces.

**Syntaxe :**
```markdown
{{< recipe-notes >}}
- Conservation : Se conserve 3 jours dans une boîte hermétique
- Astuce : Pour un goût plus intense, utilisez du chocolat 85%
- Variante sans gluten : Remplacez la farine par de la poudre d'amandes
{{< /recipe-notes >}}
```

**Rendu :**
- Chaque note avec icône ampoule 💡
- Fond gris clair avec bordure orange
- Espacement optimisé

### 5. recipe-variations - Variations

Suggestions de variations de la recette.

**Syntaxe :**
```markdown
{{< recipe-variations >}}
- Brownies aux noix : Ajouter 100g de noix concassées
- Version caramel : Incorporer des morceaux de caramel salé
- Brownies marbrés : Ajouter une couche de pâte au chocolat blanc
{{< /recipe-variations >}}
```

**Rendu :**
- Chaque variation avec icône rotation 🔄
- Même style que les notes
- Encourage la créativité

### 6. download-pdf - Bouton PDF

Génère un bouton pour télécharger la recette en PDF.

**Syntaxe :**
```markdown
{{< download-pdf >}}
```

**Fonctionnalités :**
- Génération automatique du PDF
- Inclut toutes les sections de la recette
- Mise en page professionnelle
- Nom de fichier basé sur le titre

## 📋 Template Complet de Recette

Voici un template complet pour créer une nouvelle recette :

```markdown
---
title: "Brownies Fondants au Chocolat"
date: 2025-01-08
draft: false
tags: ["dessert", "chocolat", "facile"]
categories: ["Desserts"]
author: "L'atelier Boulet"
---

Les brownies parfaits : croustillants à l'extérieur, fondants à l'intérieur. Cette recette familiale est un incontournable pour tous les amateurs de chocolat.

![Brownies au chocolat](brownies.jpg "Brownies fondants maison")

{{< recipe-info portions="12" prep="15 minutes" cuisson="25 minutes" >}}

## Ingrédients

{{< ingredients-list >}}
- 200g : Chocolat noir 70%
- 150g : Beurre doux
- 3 : Œufs moyens
- 150g : Sucre en poudre
- 100g : Cassonade
- 75g : Farine tout usage
- 30g : Cacao en poudre non sucré
- 1 c. à café : Extrait de vanille
- 1 pincée : Sel
{{< /ingredients-list >}}

## Préparation

{{< preparation-list >}}
- Préchauffer le four à 180°C (350°F) et beurrer un moule carré de 20cm
- Faire fondre le chocolat et le beurre au bain-marie, bien mélanger
- Dans un grand bol, battre les œufs avec le sucre et la cassonade jusqu'à blanchissement
- Incorporer le chocolat fondu et la vanille au mélange œufs-sucre
- Tamiser ensemble la farine, le cacao et le sel
- Incorporer délicatement les ingrédients secs au mélange chocolaté
- Verser la pâte dans le moule et lisser la surface
- Enfourner pour 25 minutes (le centre doit rester légèrement tremblotant)
- Laisser refroidir complètement avant de démouler et couper
{{< /preparation-list >}}

## Conseils

{{< recipe-notes >}}
- Test de cuisson : Un cure-dent inséré doit ressortir avec quelques miettes humides
- Conservation : 5 jours dans une boîte hermétique ou 3 mois au congélateur
- Secret de chef : Ajoutez une pincée de fleur de sel sur le dessus avant cuisson
- Pour des brownies extra fondants, réduisez le temps de cuisson de 3-4 minutes
{{< /recipe-notes >}}

## Variations Gourmandes

{{< recipe-variations >}}
- Brownies aux noix de pécan : Incorporer 100g de noix de pécan grillées
- Version triple chocolat : Ajouter des pépites de chocolat blanc et au lait
- Brownies au beurre de cacahuète : Créer des tourbillons avec du beurre de cacahuète
- Sans gluten : Remplacer la farine par 50g de poudre d'amandes + 25g de fécule
{{< /recipe-variations >}}

{{< download-pdf >}}
```

## 🎨 Personnalisation des Shortcodes

### Modifier les Styles

Les styles sont définis dans `assets/css/recipe.css`. Variables principales :

```css
:root {
  --recipe-primary: #1e40af;      /* Bleu foncé */
  --recipe-secondary: #ea580c;    /* Orange */
  --recipe-accent: #fbbf24;       /* Jaune */
  --recipe-light-bg: #f3f4f6;     /* Gris clair */
  --recipe-border: #e5e7eb;       /* Bordure */
}
```

### Créer de Nouveaux Shortcodes

Pour ajouter un shortcode personnalisé :

1. Créer le fichier dans `layouts/shortcodes/`
2. Exemple : `recipe-equipment.html`

```html
<div class="recipe-equipment">
  <h3>🔧 Équipement Nécessaire</h3>
  <ul>
    {{ .Inner | markdownify }}
  </ul>
</div>
```

3. Utilisation :
```markdown
{{< recipe-equipment >}}
- Moule carré de 20cm
- Bain-marie
- Fouet électrique
{{< /recipe-equipment >}}
```

## 💡 Bonnes Pratiques

### Structure Cohérente

1. **Ordre recommandé des sections :**
   - Description/Introduction
   - Image principale
   - Informations (recipe-info)
   - Ingrédients
   - Préparation
   - Notes (optionnel)
   - Variations (optionnel)
   - Bouton PDF

2. **Images :**
   - Format : JPEG optimisé
   - Dimensions : 1200x800 minimum
   - Poids : < 500KB
   - Alt text descriptif

3. **Rédaction :**
   - Instructions claires et concises
   - Mesures précises
   - Temps réalistes
   - Vocabulaire accessible

### SEO et Accessibilité

1. **Métadonnées :**
   - Titre descriptif et accrocheur
   - Tags pertinents
   - Description dans l'introduction

2. **Accessibilité :**
   - Images avec alt text
   - Structure hiérarchique (h2, h3)
   - Contraste suffisant

## 🐛 Dépannage

### Problèmes Fréquents

1. **Shortcode non reconnu**
   - Vérifier l'orthographe exacte
   - S'assurer que le fichier existe dans `layouts/shortcodes/`

2. **Mise en forme incorrecte**
   - Respecter le format des listes (tiret + espace)
   - Vérifier la syntaxe d'ouverture/fermeture

3. **PDF ne se génère pas**
   - Vérifier la console JavaScript
   - S'assurer que jsPDF est chargé

### Debug

Pour déboguer un shortcode :

```markdown
<!-- Afficher le contenu brut -->
{{ printf "%#v" .Inner }}

<!-- Afficher les paramètres -->
{{ printf "%#v" .Params }}
```

## 📚 Ressources

- [Documentation Hugo Shortcodes](https://gohugo.io/content-management/shortcodes/)
- [Exemples de recettes](../content/posts/)
- [Fichiers des shortcodes](../layouts/shortcodes/)