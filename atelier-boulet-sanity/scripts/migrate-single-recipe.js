// Migration d'une seule recette - Côtes de porc BBQ
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
      
      const parts = text.split(' ')
      let quantity = ''
      let name = text
      
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

async function migrateCotesPorc() {
  console.log('🚀 Migration de la recette Côtes de porc BBQ...\n')
  
  try {
    const filePath = '../content/posts/bbq-moderne/cote-de-porc-bbq-moutarde-et-erable-2025-06-09T21-48-14.md'
    
    console.log(`📖 Migration: ${path.basename(filePath)}`)
    
    // Lire le fichier
    const content = fs.readFileSync(path.resolve(filePath), 'utf8')
    
    // Parser frontmatter
    const parsed = parseFrontmatter(content)
    if (!parsed) {
      console.log(`❌ Erreur parsing: ${filePath}`)
      return
    }
    
    // Récupérer l'ID de la collection BBQ Moderne
    const collectionId = await getCollectionId('bbq-moderne')
    if (!collectionId) {
      console.log(`❌ Collection BBQ Moderne non trouvée`)
      return
    }
    
    // Extraire l'histoire familiale
    let familyStoryContent = ''
    const familyStoryMatch = parsed.content.match(/Histoire familiale\s*#\s*([\s\S]*?)(?=\n\n|\n#{1,2}|$)/i)
    if (familyStoryMatch) {
      familyStoryContent = familyStoryMatch[1].trim()
    }
    
    // Créer le document recette
    const recipe = {
      _type: 'recipe',
      title: parsed.frontmatter.title || 'Côtes de porc BBQ, moutarde et érable',
      slug: {
        current: 'cotes-de-porc-bbq-moutarde-et-erable'
      },
      collection: {
        _type: 'reference',
        _ref: collectionId
      },
      familyStory: familyStoryContent ? markdownToBlocks(familyStoryContent) : [],
      ingredients: parseIngredients(parsed.content),
      instructions: parseInstructions(parsed.content),
      prepTime: 20,
      cookTime: 180, // 3 heures environ
      servings: 4,
      difficulty: 'intermediaire',
      searchableIngredients: ['porc', 'côtes', 'moutarde', 'érable', 'bbq', 'fumage'],
      publishedAt: new Date().toISOString(),
      featured: true
    }
    
    // Créer la recette
    const result = await client.create(recipe)
    console.log(`✅ Recette créée: ${recipe.title}`)
    console.log(`🔗 ID Sanity: ${result._id}`)
    
  } catch (error) {
    console.error(`❌ Erreur migration:`, error.message)
  }
  
  console.log('\n🎉 Migration de la recette Côtes de porc terminée!')
}

migrateCotesPorc()