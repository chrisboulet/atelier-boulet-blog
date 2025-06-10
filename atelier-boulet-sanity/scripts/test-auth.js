// Test de l'authentification Sanity
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'r3z1isef',
  dataset: 'production',
  useCdn: false,
  token: 'skB9578VLALDHJAwTkI0GgPqEKZCukOcuW0SAInijPhEmsmaliA4CEzc5nzd2eAEBZaofStkrWOW3DE4LJInuULKr21YmVALgxPJ2KE3M9nGEoMtGLp0ES3WcEGTrQsOwiHyL7GQ0wSmukXgM2KSBUdJjhtW8gTVmw5pUjojkW9v9rVHxy55',
  apiVersion: '2023-05-03'
})

async function testAuth() {
  try {
    console.log('🔑 Test de l\'authentification Sanity...')
    console.log('Token:', process.env.SANITY_API_TOKEN ? 'Présent' : 'Manquant')
    
    // Test simple
    const collections = await client.fetch('*[_type == "collection"]{title, slug}')
    console.log('✅ Authentification réussie!')
    console.log(`📊 Collections trouvées: ${collections.length}`)
    
    for (const col of collections) {
      console.log(`   - ${col.title} (${col.slug?.current})`)
    }
    
  } catch (error) {
    console.error('❌ Erreur authentification:', error.message)
    console.error('🔍 Détails:', error.statusCode, error.response?.body)
  }
}

testAuth()