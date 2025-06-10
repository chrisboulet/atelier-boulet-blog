// Script pour créer les 8 collections de base
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'r3z1isef',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-05-03'
})

const collections = [
  {
    _type: 'collection',
    title: 'Maman Monique',
    slug: { current: 'maman-monique' },
    emoji: '👵',
    description: 'Les recettes traditionnelles de Maman Monique, transmises avec amour',
    color: '#dc2626',
    order: 1,
    featured: true
  },
  {
    _type: 'collection',
    title: 'Ma Tante Marie',
    slug: { current: 'tante-marie' },
    emoji: '👩‍🍳',
    description: 'Les créations extraordinaires de Marie Hains, une cuisinière légendaire',
    color: '#ea580c',
    order: 2,
    featured: true
  },
  {
    _type: 'collection',
    title: "L'atelier Boulet",
    slug: { current: 'atelier-boulet' },
    emoji: '🍽️',
    description: 'Adaptations maison de mes années au Picadilly Pub',
    color: '#2563eb',
    order: 3,
    featured: true
  },
  {
    _type: 'collection',
    title: 'BBQ Moderne',
    slug: { current: 'bbq-moderne' },
    emoji: '🔥',
    description: 'L\'art du fumage et des grillades modernes',
    color: '#16a34a',
    order: 4,
    featured: true
  },
  {
    _type: 'collection',
    title: 'Belle-maman Céline',
    slug: { current: 'belle-maman-celine' },
    emoji: '💝',
    description: 'En mémoire de Céline, ses recettes classiques qui nous manquent',
    color: '#db2777',
    order: 5,
    featured: false
  },
  {
    _type: 'collection',
    title: 'Créations Isabelle',
    slug: { current: 'creations-isabelle' },
    emoji: '🎨',
    description: 'Les innovations culinaires de ma merveilleuse conjointe',
    color: '#9333ea',
    order: 6,
    featured: false
  },
  {
    _type: 'collection',
    title: 'Inspiration Marmitons',
    slug: { current: 'inspiration-marmitons' },
    emoji: '👨‍🍳',
    description: 'Adaptations des recettes du club "Les Marmitons de Québec"',
    color: '#ca8a04',
    order: 7,
    featured: false
  },
  {
    _type: 'collection',
    title: 'Projets à tester',
    slug: { current: 'projets-a-tester' },
    emoji: '🧪',
    description: 'Idées de recettes en développement et expérimentations',
    color: '#0891b2',
    order: 8,
    featured: false
  }
]

async function createCollections() {
  console.log('🚀 Création des 8 collections familiales...')
  
  try {
    for (const collection of collections) {
      const result = await client.create(collection)
      console.log(`✅ Collection créée: ${collection.emoji} ${collection.title}`)
    }
    
    console.log('\n🎉 Toutes les collections ont été créées avec succès!')
    console.log('\n📋 Collections créées:')
    collections.forEach(col => {
      console.log(`   ${col.emoji} ${col.title} (${col.slug.current})`)
    })
    
  } catch (error) {
    console.error('❌ Erreur lors de la création des collections:', error)
  }
}

createCollections()