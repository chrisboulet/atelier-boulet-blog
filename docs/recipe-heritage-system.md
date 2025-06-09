# 📚 SYSTÈME RECIPE-HERITAGE - L'ATELIER BOULET

*Version 1.0 - 9 juin 2025*

## 🎯 OBJECTIF

Transformer les recettes basiques en **contenus monétisés authentiques** avec histoires familiales, liens affiliés intégrés naturellement, et structure SEO optimisée pour l'objectif 100$/semaine.

---

## 🏗️ ARCHITECTURE DU SYSTÈME

### **Template de Base** (`archetypes/recipe-heritage.md`)
Template enrichi avec sections monétisation + storytelling familial

### **Shortcode Amazon** (`layouts/shortcodes/amazon-link.html`)
- Tag automatique : `ateliercboulet-20`
- Paramètres : URL, nom produit, prix optionnel
- Style intégré avec hover Amazon orange
- Attributs SEO corrects

### **CSS Affiliés** (`assets/css/custom.css`)
- Boutons amazon-affiliate-link stylés
- Mode sombre supporté
- Responsive design

---

## 📝 STRUCTURE RECIPE-HERITAGE

```markdown
---
title: "Nom Recette - Contexte Familial"
date: 2025-06-09
tags: ["base", "tradition-familiale", "recette-authentique"]
summary: "Histoire courte + contexte création"
collection: "maman|tante-marie|bbq-moderne|atelier-boulet"
---

## Histoire familiale
[AUTHENTIQUE UNIQUEMENT - jamais inventée]

<!--more-->

{{< recipe-info "portions" "prep" "cuisson" >}}

## Les ustensiles recommandés
- **Produit** - {{< amazon-link "URL" "Nom" "Prix" >}}
  *Explication personnelle d'usage*

{{< download-pdf "Nom Recette" >}}

## Ingrédients
{{< ingredients-list >}}
Quantité : Ingrédient - mentions producteurs locaux
{{< /ingredients-list >}}

## Préparation
{{< preparation-list >}}
Étape avec trucs familiaux
{{< /preparation-list >}}

## Notes et secrets de famille
{{< recipe-notes >}}
- Astuces transmises de génération en génération
{{< /recipe-notes >}}

## Variations testées
{{< recipe-variations >}}
- Évolutions essayées au fil des ans
{{< /recipe-variations >}}

## Transmettre la tradition
*Réflexion sur héritage culinaire et transmission*

### Producteurs québécois recommandés
- Mentions sans liens affiliés (support local)
```

---

## 💰 INTÉGRATION MONÉTISATION

### **Zones Affiliés Autorisées**
1. **Ustensiles recommandés** : Section dédiée après recipe-info
2. **Ingrédients spécialisés** : Mentions dans ingredients-list
3. **Jamais** : Dans histoire familiale ou préparation

### **Principes d'Intégration**
- **Authenticité** : Seulement produits réellement utilisés
- **Valeur ajoutée** : Explications personnelles d'usage
- **Équilibre** : 80% contenu / 20% monétisation
- **Transparence** : Liens clairement identifiés

### **Shortcode Amazon Usage**
```hugo
{{< amazon-link "https://amazon.ca/dp/XXXX" "Nom du produit" "Prix$" >}}
```
- URL complète Amazon Canada
- Nom descriptif précis
- Prix optionnel (recommandé pour conversion)
- Tag `ateliercboulet-20` ajouté automatiquement

---

## 🔄 PROCESSUS DE CONVERSION

### **Étapes pour Enrichir une Recette Existante**

1. **Demander l'histoire** : Obtenir contexte familial authentique
2. **Identifier ustensiles** : Lister outils réellement utilisés
3. **Rechercher produits** : Trouver équivalents Amazon Canada
4. **Enrichir structure** : Ajouter sections heritage
5. **Optimiser SEO** : Title, tags, summary appropriés
6. **Valider authenticité** : Vérifier que tout est véridique

### **🔒 RÈGLES STRICTES**
- **Histoires** : Jamais inventées, toujours demander à Christian
- **Ingrédients** : Jamais modifier sans autorisation explicite
- **Instructions** : Jamais changer les étapes de préparation
- **Quantités** : Jamais modifier les mesures

---

## 📊 MÉTRIQUES DE SUCCÈS

### **KPIs par Recette**
- **Clics affiliés** : Tracking via GTM
- **Conversions** : Ventes générées
- **Temps sur page** : Engagement contenu
- **Partages sociaux** : Viralité familiale
- **PDF downloads** : Utilité pratique

### **Objectifs Monétisation**
- **Phase 1** : 25$/mois (recettes enrichies)
- **Phase 2** : 100$/mois (optimisation conversion)
- **Phase 3** : 400$/mois (objectif 100$/semaine atteint)

---

## 🛠️ OUTILS ET RESSOURCES

### **Amazon Associates**
- Compte : `ateliercboulet-20`
- Programme : Amazon.ca Associates
- SiteStripe : Outil de génération liens
- Rapports : Tracking mensuel obligatoire

### **Producteurs Locaux** (Support sans monétisation)
- Mentions gratuites pour authenticité québécoise
- Liens vers sites/coordonnées sans affiliés
- Valorisation terroir local

### **Validation Contenus**
- Histoires : Vérifiées avec Christian uniquement
- Produits : Testés personnellement
- Liens : Fonctionnels et corrects
- Prix : Mis à jour régulièrement

---

## 🚀 ÉVOLUTIONS FUTURES

### **Phase 2 - Produits Digitaux**
- E-books thématiques par collection
- Guides d'achat saisonniers
- Plans de repas familiaux

### **Phase 3 - Services**
- Consultations culinaires virtuelles
- Ateliers transmission recettes familiales
- Accompagnement preservation patrimoniale

---

## 📝 EXEMPLES RÉUSSIS

### **Brownies sans noix** ✅
- Histoire Jacob authentique
- Liens ustensiles contextuels
- Ironie finale engageante

### **Filet porc whisky** ✅  
- Tradition fête des pères personnelle
- Évolution recette sur 15 ans
- Qualité ingrédients mise en valeur

### **Général Tao panko** ✅
- Moment père-fils émouvant
- Innovation technique expliquée
- Transmission passion culinaire

---

*Ce système évolue avec les retours utilisateurs et performances monétisation. L'authenticité reste prioritaire sur la rentabilité.*