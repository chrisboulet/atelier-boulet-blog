# Guide de Déploiement

Ce guide couvre le déploiement de L'atelier Boulet sur différentes plateformes d'hébergement.

## 🚀 Options de Déploiement

### Plateformes Recommandées

1. **Netlify** (Recommandé) - Déploiement automatique, CMS intégré
2. **Vercel** - Performance optimale, analytics intégrés
3. **GitHub Pages** - Gratuit, intégration GitHub native
4. **Cloudflare Pages** - CDN global, protection DDoS
5. **Auto-hébergement** - Contrôle total, personnalisation maximale

## 📦 Netlify (Recommandé)

### Avantages Netlify

- Déploiement continu automatique
- Netlify CMS pré-configuré
- Formulaires intégrés
- Functions serverless
- Previews de branches
- Analytics gratuits

### Configuration Étape par Étape

#### 1. Préparation du Repository

```bash
# S'assurer que le site fonctionne localement
hugo server -D

# Construire le site
hugo --minify

# Vérifier le dossier public/
ls -la public/
```

#### 2. Fichier netlify.toml

Créer `netlify.toml` à la racine :

```toml
[build]
  command = "hugo --gc --minify"
  publish = "public"

[build.environment]
  HUGO_VERSION = "0.110.0"
  HUGO_ENABLEGITINFO = "true"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=86400"

[[redirects]]
  from = "/admin"
  to = "/admin/"
  status = 301

[[plugins]]
  package = "@netlify/plugin-sitemap"
  
  [plugins.inputs]
    buildDir = "public"
    exclude = [
      "./404.html",
      "./admin/**"
    ]
```

#### 3. Déploiement Initial

1. **Via l'Interface Netlify**
   - Aller sur [app.netlify.com](https://app.netlify.com)
   - "New site from Git"
   - Connecter GitHub/GitLab/Bitbucket
   - Sélectionner le repository
   - Confirmer les paramètres de build

2. **Via Netlify CLI**
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialiser le site
netlify init

# Déployer
netlify deploy --prod
```

#### 4. Configuration du Domaine

```bash
# Domaine personnalisé
netlify domains:add atelier-boulet.com

# SSL automatique
# Netlify configure automatiquement Let's Encrypt
```

#### 5. Netlify CMS

Configuration dans `static/admin/config.yml` :

```yaml
backend:
  name: git-gateway
  branch: main
  commit_messages:
    create: 'Création {{collection}} "{{slug}}"'
    update: 'Mise à jour {{collection}} "{{slug}}"'
    delete: 'Suppression {{collection}} "{{slug}}"'
    uploadMedia: 'Ajout média "{{path}}"'
    deleteMedia: 'Suppression média "{{path}}"'

local_backend: true

media_folder: static/images
public_folder: /images

collections:
  - name: "recettes"
    label: "Recettes"
    folder: "content/posts"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    editor:
      preview: true
    fields:
      - {label: "Titre", name: "title", widget: "string"}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Brouillon", name: "draft", widget: "boolean", default: false}
      - {label: "Image", name: "image", widget: "image", required: false}
      - {label: "Tags", name: "tags", widget: "list"}
      - {label: "Catégories", name: "categories", widget: "list"}
      - {label: "Contenu", name: "body", widget: "markdown"}
```

### Netlify Functions

Pour des fonctionnalités serverless :

```javascript
// netlify/functions/submit-recipe.js
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Traiter la soumission
    // ...
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Recette reçue avec succès' 
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Erreur lors du traitement' 
      })
    };
  }
};
```

## 🔺 Vercel

### Configuration Vercel

#### 1. vercel.json

```json
{
  "buildCommand": "hugo --gc --minify",
  "outputDirectory": "public",
  "framework": null,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

#### 2. Déploiement

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Production
vercel --prod
```

#### 3. Variables d'Environnement

```bash
vercel env add HUGO_VERSION
# Entrer: 0.110.0

vercel env add HUGO_ENVIRONMENT
# Entrer: production
```

## 🐙 GitHub Pages

### Configuration GitHub Actions

#### 1. Workflow de Déploiement

Créer `.github/workflows/deploy.yml` :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.110.0'
          extended: true

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Build with Hugo
        env:
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 2. Configuration du Repository

1. Aller dans Settings → Pages
2. Source : "GitHub Actions"
3. Activer "Enforce HTTPS"

#### 3. Domaine Personnalisé

Créer `static/CNAME` :
```
atelier-boulet.com
```

Configuration DNS :
```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   username.github.io
```

## ☁️ Cloudflare Pages

### Configuration

#### 1. Connexion Repository

1. Dashboard Cloudflare → Pages
2. "Create a project"
3. Connecter GitHub/GitLab
4. Sélectionner le repository

#### 2. Paramètres de Build

```
Build command: hugo --gc --minify
Build output directory: public
Root directory: /
Environment variables:
  HUGO_VERSION: 0.110.0
```

#### 3. Fonctions Cloudflare

Créer `functions/api/submit-recipe.js` :

```javascript
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const data = await request.json();
    
    // Traiter la soumission
    // Utiliser env pour les secrets
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Recette reçue'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Erreur de traitement'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

## 🖥️ Auto-hébergement

### Docker

#### 1. Dockerfile

```dockerfile
# Build stage
FROM klakegg/hugo:0.110.0-ext-alpine AS builder

WORKDIR /src
COPY . .

RUN hugo --gc --minify

# Runtime stage
FROM nginx:alpine

COPY --from=builder /src/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### 2. nginx.conf

```nginx
user nginx;
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml 
               application/rss+xml application/javascript 
               application/json;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    }
}
```

#### 3. Docker Compose

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./letsencrypt:/etc/letsencrypt
    restart: unless-stopped

  certbot:
    image: certbot/certbot
    volumes:
      - ./letsencrypt:/etc/letsencrypt
      - ./webroot:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
```

### VPS avec Caddy

#### 1. Caddyfile

```caddyfile
atelier-boulet.com {
    root * /var/www/atelier-boulet
    file_server

    encode gzip

    header {
        X-Frame-Options DENY
        X-Content-Type-Options nosniff
        X-XSS-Protection "1; mode=block"
        Referrer-Policy strict-origin-when-cross-origin
    }

    @static {
        path *.ico *.css *.js *.gif *.jpg *.jpeg *.png *.svg *.woff *.woff2
    }
    header @static Cache-Control "public, max-age=31536000"

    handle_errors {
        @404 {
            expression {http.error.status_code} == 404
        }
        rewrite @404 /404.html
        file_server
    }
}
```

#### 2. Script de Déploiement

```bash
#!/bin/bash
# deploy.sh

set -e

echo "🚀 Démarrage du déploiement..."

# Variables
SITE_DIR="/var/www/atelier-boulet"
BACKUP_DIR="/var/backups/atelier-boulet"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Backup
echo "📦 Création backup..."
mkdir -p $BACKUP_DIR
tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" $SITE_DIR

# Pull latest changes
echo "📥 Récupération des changements..."
cd /home/deploy/atelier-boulet-blog
git pull origin main

# Build
echo "🔨 Construction du site..."
hugo --gc --minify

# Deploy
echo "📤 Déploiement..."
rsync -av --delete public/ $SITE_DIR/

# Clean old backups (keep last 5)
echo "🧹 Nettoyage des anciens backups..."
ls -t $BACKUP_DIR/backup_*.tar.gz | tail -n +6 | xargs -r rm

echo "✅ Déploiement terminé!"
```

## 🔍 Optimisations Post-Déploiement

### 1. Performance

#### Optimisation des Images

```bash
# Script d'optimisation
find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" \) \
  -exec jpegoptim --strip-all {} \;

find public/images -type f -name "*.png" \
  -exec pngquant --quality=65-80 {} \;
```

#### Configuration CDN

```javascript
// Cloudflare Workers pour cache
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const cache = caches.default
  let response = await cache.match(request)

  if (!response) {
    response = await fetch(request)
    const headers = { ...response.headers }
    
    if (response.ok) {
      headers['Cache-Control'] = 'public, max-age=86400'
      response = new Response(response.body, { ...response, headers })
      event.waitUntil(cache.put(request, response.clone()))
    }
  }

  return response
}
```

### 2. Monitoring

#### UptimeRobot

Configuration des monitors :
- HTTP(s) - Vérifier la disponibilité
- Keyword - Vérifier le contenu
- Page Speed - Performance

#### Google Analytics

```html
<!-- layouts/partials/extend-head.html -->
{{ if not .Site.IsServer }}
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
{{ end }}
```

### 3. Sécurité

#### Headers de Sécurité

```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

## 📊 Tests Post-Déploiement

### Checklist de Vérification

- [ ] Site accessible via HTTPS
- [ ] Redirection HTTP → HTTPS
- [ ] Toutes les pages se chargent
- [ ] Images s'affichent correctement
- [ ] CSS/JS chargés sans erreur
- [ ] Formulaires fonctionnels
- [ ] Mode mobile responsive
- [ ] Temps de chargement < 3s
- [ ] Score Lighthouse > 90
- [ ] Sitemap.xml généré
- [ ] robots.txt correct
- [ ] Analytics fonctionnel

### Outils de Test

1. **Performance**
   - [GTmetrix](https://gtmetrix.com/)
   - [PageSpeed Insights](https://pagespeed.web.dev/)
   - [WebPageTest](https://www.webpagetest.org/)

2. **SEO**
   - [Google Search Console](https://search.google.com/search-console)
   - [Bing Webmaster Tools](https://www.bing.com/webmasters)

3. **Sécurité**
   - [Security Headers](https://securityheaders.com/)
   - [SSL Labs](https://www.ssllabs.com/ssltest/)

## 🆘 Support et Ressources

- Documentation Hugo : https://gohugo.io/hosting-and-deployment/
- Forum Netlify : https://answers.netlify.com/
- Discord Vercel : https://vercel.com/discord
- Community Cloudflare : https://community.cloudflare.com/