// Migration COMPLÈTE avec token fixe
import {createClient} from '@sanity/client'
import fs from 'fs'
import path from 'path'

const client = createClient({
  projectId: 'r3z1isef',
  dataset: 'production',
  useCdn: false,
  token: 'skB9578VLALDHJAwTkI0GgPqEKZCukOcuW0SAInijPhEmsmaliA4CEzc5nzd2eAEBZaofStkrWOW3DE4LJInuULKr21YmVALgxPJ2KE3M9nGEoMtGLp0ES3WcEGTrQsOwiHyL7GQ0wSmukXgM2KSBUdJjhtW8gTVmw5pUjojkW9v9rVHxy55',
  apiVersion: '2024-05-04' // Version plus récente
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
  
  return blocks
}

// Récupérer l'ID de collection avec retry
async function getCollectionId(slug, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const query = `*[_type == "collection" && slug.current == $slug][0]._id`
      const result = await client.fetch(query, { slug })
      if (result) return result
      
      console.log(`⚠️ Collection ${slug} non trouvée, tentative ${i + 1}/${retries}`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
    } catch (error) {
      console.log(`❌ Erreur tentative ${i + 1}: ${error.message}`)
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
  }
  return null
}

// Parser tous les éléments
function parseAllElements(content) {
  // Histoire familiale
  let familyStory = ''
  const familyMatch = content.match(/## Histoire familiale([\s\S]*?)(?=\n## |<!--more-->|$)/i)
  if (familyMatch) {
    familyStory = familyMatch[1].trim()
  }
  
  // Recipe info
  const recipeInfoMatch = content.match(/{{<\s*recipe-info\s+"([^"]+)"\s+"([^"]+)"\s+"([^"]+)"\s*>}}/)
  let recipeInfo = { servings: null, prepTime: null, cookTime: null }
  if (recipeInfoMatch) {
    recipeInfo = {
      servings: parseInt(recipeInfoMatch[1].split(' ')[0]) || null,
      prepTime: parseInt(recipeInfoMatch[2].split(' ')[0]) || null,
      cookTime: parseInt(recipeInfoMatch[3].split(' ')[0]) || null
    }
  }
  
  // Ustensiles avec Amazon
  const tools = []
  const amazonRegex = /{{<\s*amazon-link\s+"([^"]+)"\s+"([^"]+)"\s+"([^"]+)"\s*>}}/g
  let amazonMatch
  while ((amazonMatch = amazonRegex.exec(content)) !== null) {
    tools.push({
      _key: Math.random().toString(36).substr(2, 9),
      name: amazonMatch[2],
      essential: Math.random() > 0.5,
      amazonLink: amazonMatch[1].includes('?tag=') ? amazonMatch[1] : amazonMatch[1] + '?tag=ateliercboulet-20',
      description: `Recommandé pour cette recette`
    })
  }
  
  // Ingrédients
  const ingredients = []
  const ingredientsMatch = content.match(/{{<\s*ingredients-list\s*>}}([\s\S]*?){{<\s*\/ingredients-list\s*>}}/)
  if (ingredientsMatch) {
    const lines = ingredientsMatch[1].trim().split('\n')
    for (const line of lines) {
      if (line.trim() && line.includes(':')) {
        const [qty, name] = line.split(':').map(s => s.trim())
        if (qty && name) {
          ingredients.push({
            _key: Math.random().toString(36).substr(2, 9),
            name: name,
            quantity: qty,
            notes: '',
            amazonLink: ''
          })
        }
      }
    }
  }
  
  // Instructions
  const instructions = []
  const instructionsMatch = content.match(/{{<\s*preparation-list\s*>}}([\s\S]*?){{<\s*\/preparation-list\s*>}}/)
  if (instructionsMatch) {
    const lines = instructionsMatch[1].trim().split('\n')
    let step = 1
    for (const line of lines) {
      if (line.trim()) {
        instructions.push({
          _key: Math.random().toString(36).substr(2, 9),
          stepNumber: step++,
          instruction: line.trim(),
          tip: '',
          image: null
        })
      }
    }
  }
  
  return {
    familyStory: familyStory ? markdownToBlocks(familyStory) : [],
    recipeInfo,
    tools,
    ingredients,
    instructions
  }
}

// Fonction principale avec gestion d'erreurs robuste
async function migrateWithRetry() {
  console.log('🚀 Migration robuste des recettes...\n')
  
  const recipes = [
    {
      file: '../content/posts/projets-a-tester/brownies-2025-06-08T14-56-07.md',
      collection: 'projets-a-tester',
      title: 'Brownies sans noix ni arachides'
    }
  ]
  
  for (const recipeData of recipes) {
    try {
      console.log(`📖 Migration: ${recipeData.title}`)
      
      // Lire le fichier
      const content = fs.readFileSync(path.resolve(recipeData.file), 'utf8')
      const parsed = parseFrontmatter(content)
      
      if (!parsed) {
        console.log(`❌ Parsing impossible: ${recipeData.file}`)
        continue
      }
      
      // Parser tous les éléments
      const elements = parseAllElements(parsed.content)
      
      console.log(`📊 Éléments trouvés:`)
      console.log(`   - Histoire: ${elements.familyStory.length} blocs`)
      console.log(`   - Ingrédients: ${elements.ingredients.length}`)
      console.log(`   - Instructions: ${elements.instructions.length}`)
      console.log(`   - Ustensiles: ${elements.tools.length}`)
      
      // Récupérer l'ID collection
      const collectionId = await getCollectionId(recipeData.collection)
      if (!collectionId) {
        console.log(`❌ Collection ${recipeData.collection} introuvable`)
        continue
      }
      
      // Créer la recette
      const recipe = {
        _type: 'recipe',
        title: recipeData.title,
        slug: { current: recipeData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
        collection: { _type: 'reference', _ref: collectionId },
        familyStory: elements.familyStory,
        prepTime: elements.recipeInfo.prepTime,
        cookTime: elements.recipeInfo.cookTime,
        servings: elements.recipeInfo.servings,
        difficulty: 'intermediaire',
        ingredients: elements.ingredients,
        tools: elements.tools,
        instructions: elements.instructions,
        searchableIngredients: Array.isArray(parsed.frontmatter.tags) ? parsed.frontmatter.tags : [],
        publishedAt: new Date().toISOString(),
        featured: false
      }
      
      const result = await client.create(recipe)
      console.log(`✅ ${recipeData.title} créée avec succès!`)
      console.log(`🔗 ID: ${result._id}`)
      
    } catch (error) {
      console.error(`❌ Erreur ${recipeData.title}:`, error.message)
    }
  }
  
  console.log('\n🎉 Migration terminée!')
}

migrateWithRetry()