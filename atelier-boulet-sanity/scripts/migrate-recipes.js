// Migration automatique des recettes Hugo vers Sanity
import {createClient} from '@sanity/client'
import fs from 'fs'
import path from 'path'

const client = createClient({
  projectId: 'r3z1isef',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03'
})

// Mapping des collections Hugo vers Sanity
const collectionMapping = {
  'projets-a-tester': 'projets-a-tester',
  'atelier-boulet': 'atelier-boulet'
}

// Parser le frontmatter
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) return null
  
  const frontmatter = {}
  const lines = match[1].split('\n')
  
  for (const line of lines) {
    if (line.trim() && line.includes(':')) {
      const [key, ...valueParts] = line.split(':')
      let value = valueParts.join(':').trim()
      
      // Nettoyer les guillemets
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1)
      }
      
      frontmatter[key.trim()] = value
    }
  }
  
  return {
    frontmatter,
    content: match[2].trim()
  }
}

// Convertir Markdown en blocs Sanity
function markdownToBlocks(markdown) {
  // Séparation par sections
  const sections = markdown.split(/\n\n+/)
  const blocks = []
  
  for (const section of sections) {
    if (section.trim()) {
      // Détecter les titres
      if (section.startsWith('# ')) {
        blocks.push({
          _type: 'block',
          _key: Math.random().toString(36).substr(2, 9),
          style: 'h1',
          children: [{
            _type: 'span',
            _key: Math.random().toString(36).substr(2, 9),
            text: section.replace('# ', ''),
            marks: []
          }]
        })
      } else if (section.startsWith('## ')) {
        blocks.push({
          _type: 'block',
          _key: Math.random().toString(36).substr(2, 9),
          style: 'h2',
          children: [{
            _type: 'span',
            _key: Math.random().toString(36).substr(2, 9),
            text: section.replace('## ', ''),
            marks: []
          }]
        })
      } else {
        // Paragraphe normal
        blocks.push({
          _type: 'block',
          _key: Math.random().toString(36).substr(2, 9),
          style: 'normal',
          children: [{
            _type: 'span',
            _key: Math.random().toString(36).substr(2, 9),
            text: section.trim(),
            marks: []
          }]
        })
      }
    }
  }
  
  return blocks
}

// Récupérer l'ID de collection
async function getCollectionId(slug) {
  const query = `*[_type == "collection" && slug.current == $slug][0]._id`
  const result = await client.fetch(query, { slug })
  return result
}

// Parser ingrédients depuis le shortcode
function parseIngredients(content) {
  const ingredientsRegex = /{{< ingredients >}}([\s\S]*?){{< \/ingredients >}}/
  const match = content.match(ingredientsRegex)
  
  if (!match) return []
  
  const ingredientsList = match[1].trim().split('\n')
  const ingredients = []
  
  for (const line of ingredientsList) {
    if (line.trim() && line.includes('-')) {
      const text = line.replace(/^-\s*/, '').trim()
      
      // Séparer quantité et nom
      const parts = text.split(' ')
      let quantity = ''
      let name = text
      
      // Essayer de détecter une quantité au début
      if (parts.length > 1 && /^\d/.test(parts[0])) {
        quantity = parts[0] + (parts[1] && parts[1].length < 4 ? ' ' + parts[1] : '')
        name = parts.slice(quantity.split(' ').length).join(' ')
      }
      
      ingredients.push({
        _key: Math.random().toString(36).substr(2, 9),
        name: name || text,
        quantity: quantity,
        notes: '',
        amazonLink: ''
      })
    }
  }
  
  return ingredients
}

// Parser instructions
function parseInstructions(content) {
  const instructionsRegex = /{{< preparation >}}([\s\S]*?){{< \/preparation >}}/
  const match = content.match(instructionsRegex)
  
  if (!match) return []
  
  const instructionsList = match[1].trim().split('\n')
  const instructions = []
  let stepNumber = 1
  
  for (const line of instructionsList) {
    if (line.trim() && line.includes('-')) {
      const instruction = line.replace(/^-\s*/, '').trim()
      
      if (instruction) {
        instructions.push({
          _key: Math.random().toString(36).substr(2, 9),
          stepNumber: stepNumber++,
          instruction: instruction,
          tip: '',
          image: null
        })
      }
    }
  }
  
  return instructions
}

// Recettes à migrer
const recipesToMigrate = [
  {
    file: '../content/posts/projets-a-tester/brownies-2025-06-08T14-56-07.md',
    targetCollection: 'projets-a-tester'
  },
  {
    file: '../content/posts/atelier-boulet/filet-de-porc-sauce-creme-au-whisky-et-pleurotes-2025-06-09T02-11-49.md',
    targetCollection: 'atelier-boulet'
  },
  {
    file: '../content/posts/atelier-boulet/general-tao-croustillant-au-panko-2025-06-09T02-11-48.md',
    targetCollection: 'atelier-boulet'
  },
  {
    file: '../content/posts/atelier-boulet/sauce-pour-buf-au-brocoli-2025-06-09T02-22-31.md',
    targetCollection: 'atelier-boulet'
  },
  {
    file: '../content/posts/bbq-moderne/cote-de-porc-bbq-moutarde-et-erable-2025-06-09T21-48-14.md',
    targetCollection: 'bbq-moderne'
  }
]

async function migrateRecipes() {
  console.log('🚀 Migration des recettes Hugo vers Sanity...\n')
  
  for (const recipeInfo of recipesToMigrate) {
    try {
      console.log(`📖 Migration: ${path.basename(recipeInfo.file)}`)
      
      // Lire le fichier
      const filePath = path.resolve(recipeInfo.file)
      const content = fs.readFileSync(filePath, 'utf8')
      
      // Parser frontmatter
      const parsed = parseFrontmatter(content)
      if (!parsed) {
        console.log(`❌ Erreur parsing: ${recipeInfo.file}`)
        continue
      }
      
      // Récupérer l'ID de la collection
      const collectionId = await getCollectionId(recipeInfo.targetCollection)
      if (!collectionId) {
        console.log(`❌ Collection non trouvée: ${recipeInfo.targetCollection}`)
        continue
      }
      
      // Extraire l'histoire familiale (après "Histoire familiale #")
      let familyStoryContent = ''
      const familyStoryMatch = parsed.content.match(/Histoire familiale\s*#\s*([\s\S]*?)(?=\n\n|\n#{1,2}|$)/i)
      if (familyStoryMatch) {
        familyStoryContent = familyStoryMatch[1].trim()
      }
      
      // Créer le document recette
      const recipe = {
        _type: 'recipe',
        title: parsed.frontmatter.title || 'Sans titre',
        slug: {
          current: parsed.frontmatter.title?.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || 'recette-sans-titre'
        },
        collection: {
          _type: 'reference',
          _ref: collectionId
        },
        familyStory: familyStoryContent ? markdownToBlocks(familyStoryContent) : [],
        ingredients: parseIngredients(parsed.content),
        instructions: parseInstructions(parsed.content),
        prepTime: null,
        cookTime: null,
        servings: null,
        difficulty: 'intermediaire',
        searchableIngredients: [],
        publishedAt: new Date().toISOString(),
        featured: false
      }
      
      // Créer la recette
      const result = await client.create(recipe)
      console.log(`✅ Recette créée: ${recipe.title}`)
      
    } catch (error) {
      console.error(`❌ Erreur migration ${recipeInfo.file}:`, error.message)
    }
  }
  
  console.log('\n🎉 Migration terminée!')
}

migrateRecipes()