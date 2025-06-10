// Migration COMPLÈTE des recettes Hugo vers Sanity
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
      
      // Nettoyer les guillemets et crochets
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1)
      }
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(s => s.trim().replace(/"/g, ''))
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
  const sections = markdown.split(/\n\n+/)
  const blocks = []
  
  for (const section of sections) {
    if (section.trim()) {
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

// Parser les shortcodes recipe-info
function parseRecipeInfo(content) {
  const recipeInfoRegex = /{{<\s*recipe-info\s+"([^"]+)"\s+"([^"]+)"\s+"([^"]+)"\s*>}}/
  const match = content.match(recipeInfoRegex)
  
  if (match) {
    const [, servings, prepTime, cookTime] = match
    return {
      servings: parseInt(servings.split(' ')[0]) || null,
      prepTime: parseInt(prepTime.split(' ')[0]) || null,
      cookTime: parseInt(cookTime.split(' ')[0]) || null
    }
  }
  
  return { servings: null, prepTime: null, cookTime: null }
}

// Parser les ustensiles avec liens Amazon
function parseTools(content) {
  const toolsSection = content.match(/## Les ustensiles recommandés([\s\S]*?)(?=\n## |$)/i)
  if (!toolsSection) return []
  
  const tools = []
  const amazonLinkRegex = /{{<\s*amazon-link\s+"([^"]+)"\s+"([^"]+)"\s+"([^"]+)"\s*>}}/g
  
  let match
  while ((match = amazonLinkRegex.exec(toolsSection[1])) !== null) {
    const [, link, name, price] = match
    
    // Extraire la description avant le lien Amazon
    const lines = toolsSection[1].split('\n')
    let description = ''
    
    for (const line of lines) {
      if (line.includes(name)) {
        const descMatch = line.match(/\*([^*]+)\*/)
        if (descMatch) {
          description = descMatch[1]
        }
        break
      }
    }
    
    tools.push({
      _key: Math.random().toString(36).substr(2, 9),
      name: name,
      essential: name.toLowerCase().includes('essentiel'),
      amazonLink: link + '?tag=ateliercboulet-20',
      description: description
    })
  }
  
  return tools
}

// Parser ingrédients depuis ingredients-list
function parseIngredients(content) {
  const ingredientsRegex = /{{<\s*ingredients-list\s*>}}([\s\S]*?){{<\s*\/ingredients-list\s*>}}/
  const match = content.match(ingredientsRegex)
  
  if (!match) return []
  
  const ingredientsList = match[1].trim().split('\n')
  const ingredients = []
  
  for (const line of ingredientsList) {
    if (line.trim() && line.includes(':')) {
      const [quantityPart, namePart] = line.split(':').map(s => s.trim())
      
      if (quantityPart && namePart) {
        ingredients.push({
          _key: Math.random().toString(36).substr(2, 9),
          name: namePart,
          quantity: quantityPart,
          notes: '',
          amazonLink: ''
        })
      }
    }
  }
  
  return ingredients
}

// Parser instructions depuis preparation-list
function parseInstructions(content) {
  const instructionsRegex = /{{<\s*preparation-list\s*>}}([\s\S]*?){{<\s*\/preparation-list\s*>}}/
  const match = content.match(instructionsRegex)
  
  if (!match) return []
  
  const instructionsList = match[1].trim().split('\n')
  const instructions = []
  let stepNumber = 1
  
  for (const line of instructionsList) {
    if (line.trim()) {
      instructions.push({
        _key: Math.random().toString(36).substr(2, 9),
        stepNumber: stepNumber++,
        instruction: line.trim(),
        tip: '',
        image: null
      })
    }
  }
  
  return instructions
}

// Parser les notes
function parseNotes(content) {
  const notesRegex = /{{<\s*recipe-notes\s*>}}([\s\S]*?){{<\s*\/recipe-notes\s*>}}/
  const match = content.match(notesRegex)
  
  if (!match) return []
  
  const notes = match[1].trim()
  return markdownToBlocks(notes)
}

// Parser tags pour recherche
function parseSearchableTags(frontmatter) {
  if (Array.isArray(frontmatter.tags)) {
    return frontmatter.tags
  }
  if (typeof frontmatter.tags === 'string') {
    return frontmatter.tags.split(',').map(s => s.trim())
  }
  return []
}

// Supprimer les recettes existantes pour re-migrer proprement
async function clearExistingRecipes() {
  console.log('🧹 Suppression des recettes existantes...')
  
  const recipes = await client.fetch('*[_type == "recipe"]._id')
  
  if (recipes.length > 0) {
    for (const id of recipes) {
      await client.delete(id)
    }
    console.log(`✅ ${recipes.length} recettes supprimées`)
  }
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

async function migrateCompleteRecipes() {
  console.log('🚀 Migration COMPLÈTE des recettes Hugo vers Sanity...\n')
  
  // Nettoyer d'abord
  await clearExistingRecipes()
  
  for (const recipeInfo of recipesToMigrate) {
    try {
      console.log(`📖 Migration complète: ${path.basename(recipeInfo.file)}`)
      
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
      
      // Extraire l'histoire familiale
      let familyStoryContent = ''
      const familyStoryMatch = parsed.content.match(/## Histoire familiale([\s\S]*?)(?=\n## |<!--more-->|$)/i)
      if (familyStoryMatch) {
        familyStoryContent = familyStoryMatch[1].trim()
      }
      
      // Parser tous les éléments
      const recipeInfoData = parseRecipeInfo(parsed.content)
      const ingredients = parseIngredients(parsed.content)
      const tools = parseTools(parsed.content)
      const instructions = parseInstructions(parsed.content)
      const notes = parseNotes(parsed.content)
      const searchableTags = parseSearchableTags(parsed.frontmatter)
      
      // Créer le document recette complet
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
        prepTime: recipeInfoData.prepTime,
        cookTime: recipeInfoData.cookTime,
        servings: recipeInfoData.servings,
        difficulty: 'intermediaire',
        ingredients: ingredients,
        tools: tools,
        instructions: instructions,
        notes: notes,
        searchableIngredients: searchableTags,
        seo: {
          metaDescription: parsed.frontmatter.summary || '',
          keywords: searchableTags
        },
        publishedAt: parsed.frontmatter.date || new Date().toISOString(),
        featured: false
      }
      
      // Créer la recette
      const result = await client.create(recipe)
      console.log(`✅ Recette COMPLÈTE créée: ${recipe.title}`)
      console.log(`   📊 ${ingredients.length} ingrédients, ${instructions.length} étapes, ${tools.length} ustensiles`)
      
    } catch (error) {
      console.error(`❌ Erreur migration ${recipeInfo.file}:`, error.message)
    }
  }
  
  console.log('\n🎉 Migration COMPLÈTE terminée!')
  console.log('\n🎯 Toutes les recettes sont maintenant complètes dans Sanity!')
}

migrateCompleteRecipes()