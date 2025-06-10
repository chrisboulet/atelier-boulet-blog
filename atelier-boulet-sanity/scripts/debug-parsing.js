// Debug du parsing pour voir ce qui se passe
import fs from 'fs'

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
      
      frontmatter[key.trim()] = value
    }
  }
  
  return {
    frontmatter,
    content: match[2].trim()
  }
}

// Test avec Brownies
const filePath = '../content/posts/projets-a-tester/brownies-2025-06-08T14-56-07.md'
console.log('🔍 Debug parsing Brownies...\n')

try {
  const content = fs.readFileSync(filePath, 'utf8')
  console.log('📄 Contenu lu, longueur:', content.length)
  
  const parsed = parseFrontmatter(content)
  if (parsed) {
    console.log('\n📋 Frontmatter:')
    console.log(JSON.stringify(parsed.frontmatter, null, 2))
    
    console.log('\n📝 Début du contenu:')
    console.log(parsed.content.substring(0, 500) + '...')
    
    // Test regex histoire familiale
    const familyStoryMatch = parsed.content.match(/## Histoire familiale([\s\S]*?)(?=\n## |<!--more-->|$)/i)
    if (familyStoryMatch) {
      console.log('\n✅ Histoire familiale trouvée:')
      console.log(familyStoryMatch[1].trim())
    } else {
      console.log('\n❌ Histoire familiale NON trouvée')
      
      // Essayons d'autres patterns
      const patterns = [
        /Histoire familiale\s*#\s*([\s\S]*?)(?=\n\n|\n#{1,2}|$)/i,
        /## Histoire familiale\n([\s\S]*?)(?=\n## |<!--more-->|$)/i,
        /Histoire familiale([\s\S]*?)(?=<!--more-->|##)/i
      ]
      
      for (let i = 0; i < patterns.length; i++) {
        const testMatch = parsed.content.match(patterns[i])
        if (testMatch) {
          console.log(`\n✅ Pattern ${i+1} fonctionne:`)
          console.log(testMatch[1].trim().substring(0, 200) + '...')
          break
        }
      }
    }
    
    // Test ingrédients
    const ingredientsMatch = parsed.content.match(/{{<\s*ingredients-list\s*>}}([\s\S]*?){{<\s*\/ingredients-list\s*>}}/i)
    if (ingredientsMatch) {
      console.log('\n✅ Ingrédients trouvés:', ingredientsMatch[1].split('\n').length - 1, 'lignes')
    } else {
      console.log('\n❌ Ingrédients NON trouvés')
    }
    
    // Test instructions
    const instructionsMatch = parsed.content.match(/{{<\s*preparation-list\s*>}}([\s\S]*?){{<\s*\/preparation-list\s*>}}/i)
    if (instructionsMatch) {
      console.log('\n✅ Instructions trouvées:', instructionsMatch[1].split('\n').filter(l => l.trim()).length, 'étapes')
    } else {
      console.log('\n❌ Instructions NON trouvées')
    }
    
  } else {
    console.log('❌ Impossible de parser le frontmatter')
  }
  
} catch (error) {
  console.error('❌ Erreur:', error.message)
}