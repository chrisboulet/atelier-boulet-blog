# L'atelier Boulet - Blog de Recettes de Cuisine

Un blog de recettes de cuisine moderne et élégant construit avec Hugo et le thème Blowfish. Cette solution offre une expérience utilisateur optimale avec des fonctionnalités avancées pour la gestion et la présentation de recettes culinaires.

## 🌟 Caractéristiques Principales

- **Site statique rapide** : Construit avec Hugo pour des performances optimales
- **Design moderne et responsive** : Utilise le thème Blowfish avec personnalisations
- **Shortcodes personnalisés** : Structure standardisée pour toutes les recettes
- **Génération PDF** : Téléchargement des recettes en format PDF
- **Système de soumission** : Interface web pour soumettre de nouvelles recettes
- **Support multilingue** : Configuré pour le français canadien
- **Mode sombre** : Adaptation automatique selon les préférences utilisateur
- **CMS intégré** : Netlify CMS pour la gestion de contenu

## 🚀 Démarrage Rapide

### Prérequis

- [Hugo Extended](https://gohugo.io/installation/) (version 0.110.0 ou supérieure)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (pour les outils de développement)

### Installation

1. Cloner le repository :
```bash
git clone https://github.com/votre-username/atelier-boulet-blog.git
cd atelier-boulet-blog
```

2. Installer les dépendances du thème :
```bash
cd themes/blowfish
npm install
cd ../..
```

3. Lancer le serveur de développement :
```bash
hugo server -D
```

Votre site sera accessible à l'adresse `http://localhost:1313/`

## 📖 Documentation

### Guides Détaillés

- [**Installation et Configuration**](docs/installation.md) - Guide complet pour configurer le blog
- [**Guide des Shortcodes**](docs/shortcodes-guide.md) - Comment utiliser les shortcodes de recettes
- [**Système de Soumission**](docs/submission-system.md) - Configuration du formulaire de soumission
- [**Personnalisation**](docs/customization.md) - Modifier l'apparence et les fonctionnalités
- [**Intégration n8n**](docs/n8n-integration.md) - Automatisation avec n8n
- [**Déploiement**](docs/deployment.md) - Déployer sur Netlify ou GitHub Pages

### Structure du Projet

```
atelier-boulet-blog/
├── config.toml          # Configuration principale Hugo
├── content/             # Contenu du site
│   ├── posts/          # Articles de recettes
│   └── _index.md       # Page d'accueil
├── layouts/            # Templates personnalisés
│   ├── shortcodes/     # Shortcodes Hugo
│   └── partials/       # Composants réutilisables
├── static/             # Fichiers statiques
│   ├── admin/          # Netlify CMS
│   ├── images/         # Images du site
│   └── soumettre-recette.html  # Formulaire de soumission
├── assets/             # Assets compilables
│   ├── css/           # Styles personnalisés
│   └── js/            # Scripts JavaScript
└── themes/            # Thèmes Hugo
    └── blowfish/      # Thème principal
```

## 🍳 Format des Recettes

Les recettes utilisent un format standardisé avec des shortcodes personnalisés :

```markdown
---
title: "Nom de la Recette"
date: 2025-01-08
draft: false
tags: ["dessert", "chocolat"]
---

Description de la recette...

![Image de la recette](image.jpg)

{{< recipe-info portions="8" prep="20 minutes" cuisson="30 minutes" >}}

{{< ingredients-list >}}
- 200g : Chocolat noir
- 150g : Beurre
- 3 : Œufs
{{< /ingredients-list >}}

{{< preparation-list >}}
- Préchauffer le four à 180°C
- Faire fondre le chocolat et le beurre
- Mélanger avec les œufs
{{< /preparation-list >}}

{{< recipe-notes >}}
- Conservation : 3 jours au frais
- Peut être congelé
{{< /recipe-notes >}}

{{< recipe-variations >}}
- Ajouter des noix
- Remplacer par du chocolat blanc
{{< /recipe-variations >}}

{{< download-pdf >}}
```

## 🎨 Personnalisation

### Modifier les Couleurs

Le thème utilise le schéma de couleurs "ocean". Pour changer :

1. Éditer `config.toml`
2. Modifier `colorScheme = "ocean"` avec l'un des schémas disponibles :
   - autumn, avocado, fire, forest, ocean, slate, etc.

### Ajouter du CSS Personnalisé

1. Créer/modifier `assets/css/custom.css`
2. Les styles seront automatiquement inclus

### Modifier le Menu

Éditer `config.toml` dans la section `[[menu.main]]`

## 🔧 Fonctionnalités Avancées

### Génération PDF

Les recettes peuvent être téléchargées en PDF grâce au shortcode `{{< download-pdf >}}`. Le PDF inclut :
- Toutes les sections de la recette
- Mise en page professionnelle
- Logo et informations du site

### Système de Soumission

Un formulaire web permet aux visiteurs de soumettre des recettes :
- Interface simple et moderne
- Validation des champs
- Prêt pour intégration backend

### Intégration n8n

Le projet inclut un script Node.js pour l'automatisation avec n8n :
- Formatage automatique des recettes
- Génération de noms de fichiers uniques
- Conversion JSON vers Markdown

## 📱 Responsive Design

Le site est entièrement responsive avec :
- Navigation mobile optimisée
- Images adaptatives
- Tableaux scrollables sur mobile
- Boutons et interactions tactiles

## 🚀 Déploiement

### Netlify (Recommandé)

1. Connecter votre repository GitHub à Netlify
2. Configuration de build :
   - Build command : `hugo`
   - Publish directory : `public`
3. Variables d'environnement :
   - `HUGO_VERSION` : 0.110.0

### GitHub Pages

Voir le [guide de déploiement](docs/deployment.md) pour les instructions détaillées.

## 🤝 Contribution

Les contributions sont bienvenues ! Veuillez :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- [Hugo](https://gohugo.io/) - Générateur de site statique
- [Blowfish Theme](https://blowfish.page/) - Thème Hugo moderne
- [Netlify](https://www.netlify.com/) - Hébergement et CMS
- [n8n](https://n8n.io/) - Automatisation des workflows

## 📞 Support

Pour toute question ou problème :
- Ouvrir une [issue](https://github.com/votre-username/atelier-boulet-blog/issues)
- Email : contact@atelier-boulet.com
- Site : [https://atelier.cboulet.info/](https://atelier.cboulet.info/)