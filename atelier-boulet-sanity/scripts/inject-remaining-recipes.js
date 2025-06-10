// Injection directe des 4 recettes manquantes dans Sanity
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'r3z1isef',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // Utiliser variable d'environnement
  apiVersion: '2024-05-04'
})

// Récupérer les IDs des collections
async function getCollectionIds() {
  const collections = await client.fetch(`
    *[_type == "collection"] {
      "id": _id,
      "slug": slug.current
    }
  `)
  
  const collectionMap = {}
  collections.forEach(col => {
    collectionMap[col.slug] = col.id
  })
  
  return collectionMap
}

// Fonction utilitaire pour créer les blocs de texte Sanity
function createTextBlocks(text) {
  return text.split('\n\n').map(paragraph => ({
    _type: 'block',
    _key: Math.random().toString(36).substr(2, 9),
    style: 'normal',
    children: [{
      _type: 'span',
      _key: Math.random().toString(36).substr(2, 9),
      text: paragraph.trim(),
      marks: []
    }]
  }))
}

// Les 4 recettes à créer
const recipesToCreate = [
  {
    title: "Filet de Porc, Sauce Crème au Whisky et Pleurotes - Ma tradition de la fête des pères",
    slug: "filet-de-porc-sauce-creme-au-whisky-et-pleurotes",
    collection: "atelier-boulet",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: "intermediaire",
    
    familyStory: `Cette recette, c'est mon classique depuis 2010 si ma mémoire est bonne! En fait, la cuisson de la viande est assez standard - c'est la sauce qui est reine ici! Je la modifie un peu chaque fois, et je vous invite à faire de même.

Évidemment, le secret est dans la qualité des ingrédients et de l'alcool. Ça prend de la patience, mais c'est tellement bon! Je suis obligé de la faire au moins une fois chaque été, souvent à la fête des pères... pour moi en fait! C'est devenu ma tradition personnelle - après tout, les pères aussi ont droit à leurs petits plaisirs culinaires!`,

    ingredients: [
      { name: "Filets de porc", quantity: "600 g (4 filets)" },
      { name: "Pleurotes frais", quantity: "300 g" },
      { name: "Crème 35%", quantity: "250 ml (1 tasse)" },
      { name: "Whisky ou bourbon", quantity: "60 ml (1/4 tasse)" },
      { name: "Échalotes françaises", quantity: "2 moyennes" },
      { name: "Ail", quantity: "2 gousses" },
      { name: "Beurre", quantity: "30 ml (2 c. à soupe)" },
      { name: "Huile d'olive", quantity: "15 ml (1 c. à soupe)" },
      { name: "Thym frais", quantity: "5 ml (1 c. à thé)" },
      { name: "Sel et poivre", quantity: "Au goût" }
    ],

    tools: [
      { 
        name: "Poêle en fonte ou acier inoxydable", 
        essential: true,
        amazonLink: "https://www.amazon.ca/dp/B00006JSUA?tag=ateliercboulet-20",
        description: "Essentielle pour une belle saisie et un bon déglaçage - évitez l'antiadhésif!"
      },
      { 
        name: "Thermomètre à viande instant", 
        essential: false,
        amazonLink: "https://www.amazon.ca/dp/B01IHHLB3W?tag=ateliercboulet-20",
        description: "Pour la cuisson parfaite à 60°C - fini le porc trop cuit!"
      }
    ],

    instructions: [
      { stepNumber: 1, instruction: "Sortir les filets de porc du réfrigérateur 30 minutes avant la cuisson pour qu'ils soient à température ambiante" },
      { stepNumber: 2, instruction: "Hacher finement les échalotes et l'ail. Nettoyer et trancher les pleurotes" },
      { stepNumber: 3, instruction: "Assaisonner généreusement les filets de sel et poivre des deux côtés" },
      { stepNumber: 4, instruction: "Dans une grande poêle, chauffer l'huile et le beurre à feu moyen-élevé" },
      { stepNumber: 5, instruction: "Saisir les filets de porc 3-4 minutes de chaque côté jusqu'à belle coloration dorée" },
      { stepNumber: 6, instruction: "Retirer les filets et les garder au chaud. Réduire le feu à moyen" },
      { stepNumber: 7, instruction: "Dans la même poêle, faire revenir les échalotes 2 minutes, puis ajouter l'ail et les pleurotes" },
      { stepNumber: 8, instruction: "Déglacer avec le whisky (attention aux flammes!), laisser réduire 1 minute" },
      { stepNumber: 9, instruction: "Ajouter la crème et le thym, laisser mijoter 3-4 minutes jusqu'à épaississement" },
      { stepNumber: 10, instruction: "Remettre les filets dans la sauce, cuire 2-3 minutes jusqu'à température interne de 60°C" },
      { stepNumber: 11, instruction: "Rectifier l'assaisonnement et servir immédiatement avec la sauce" }
    ],

    searchableIngredients: ["porc", "pleurotes", "crème", "whisky", "sauce"]
  },

  {
    title: "Général Tao Croustillant au Panko - Mon anniversaire 2025 avec Nicolas",
    slug: "general-tao-croustillant-au-panko",
    collection: "atelier-boulet", 
    prepTime: 30,
    cookTime: 20,
    servings: 4,
    difficulty: "intermediaire",

    familyStory: `Cette recette a été ma création pour mon souper d'anniversaire de 2025! Quelle après-midi extraordinaire de cuisine avec mon fils aîné Nicolas. Nous avons fait ces morceaux de poulet ensemble tout l'après-midi pour le bonheur de nos convives.

On a aussi fait des wontons du même souffle... mais ça, c'est pour une autre histoire! Le Général Tao a été dérivé de ma batch précédente pour essayer d'y ajouter du croquant, d'où le panko. Et ce fut un réel succès!

Cuisiner avec Nicolas pour mon anniversaire, voir sa concentration quand il enrobait chaque morceau de poulet, entendre ses commentaires sur la sauce... ces moments père-fils en cuisine valent tous les cadeaux du monde.`,

    ingredients: [
      { name: "Cuisses de poulet désossées", quantity: "1 kg, coupées en cubes" },
      { name: "Chapelure panko", quantity: "250 ml (1 tasse)" },
      { name: "Farine tout usage", quantity: "125 ml (1/2 tasse)" },
      { name: "Fécule de maïs", quantity: "60 ml (1/4 tasse)" },
      { name: "Œufs", quantity: "2 battus" },
      { name: "Sauce soya", quantity: "60 ml (1/4 tasse)" },
      { name: "Ketchup", quantity: "45 ml (3 c. à soupe)" },
      { name: "Vinaigre de riz", quantity: "30 ml (2 c. à soupe)" },
      { name: "Sucre", quantity: "45 ml (3 c. à soupe)" },
      { name: "Ail", quantity: "3 gousses hachées" },
      { name: "Gingembre frais", quantity: "15 ml (1 c. à soupe) râpé" },
      { name: "Huile pour friture", quantity: "Pour la friture" },
      { name: "Graines de sésame", quantity: "15 ml (1 c. à soupe)" },
      { name: "Oignons verts", quantity: "2 hachés" }
    ],

    tools: [
      { 
        name: "Friteuse ou grande casserole", 
        essential: true,
        amazonLink: "https://www.amazon.ca/dp/B000FJR1VY?tag=ateliercboulet-20",
        description: "Pour une friture uniforme et sécuritaire"
      },
      { 
        name: "Thermomètre à huile", 
        essential: true,
        amazonLink: "https://www.amazon.ca/dp/B0021AEAG2?tag=ateliercboulet-20",
        description: "La température exacte (175°C) est cruciale pour le croustillant"
      }
    ],

    instructions: [
      { stepNumber: 1, instruction: "Préparer 3 bols: farine dans le premier, œufs battus dans le deuxième, panko dans le troisième" },
      { stepNumber: 2, instruction: "Couper le poulet en cubes d'environ 3 cm. Assaisonner de sel et poivre" },
      { stepNumber: 3, instruction: "Chauffer l'huile à 175°C (350°F) dans une friteuse ou grande casserole" },
      { stepNumber: 4, instruction: "Pendant ce temps, préparer la sauce: mélanger sauce soya, ketchup, vinaigre, sucre, ail et gingembre" },
      { stepNumber: 5, instruction: "Enrober chaque morceau de poulet: farine, puis œuf, puis panko en pressant bien" },
      { stepNumber: 6, instruction: "Frire les morceaux par petites quantités, 4-5 minutes jusqu'à doré et croustillant" },
      { stepNumber: 7, instruction: "Égoutter sur papier absorbant. Répéter jusqu'à épuisement du poulet" },
      { stepNumber: 8, instruction: "Dans un wok ou grande poêle, chauffer la sauce à feu moyen" },
      { stepNumber: 9, instruction: "Ajouter la fécule de maïs diluée dans un peu d'eau pour épaissir" },
      { stepNumber: 10, instruction: "Incorporer le poulet frit dans la sauce, mélanger délicatement" },
      { stepNumber: 11, instruction: "Garnir de graines de sésame et oignons verts. Servir immédiatement sur riz" }
    ],

    searchableIngredients: ["poulet", "panko", "général tao", "sauce", "asiatique"]
  },

  {
    title: "Sauce pour Bœuf au Brocoli - Après plusieurs essais",
    slug: "sauce-pour-boeuf-au-brocoli",
    collection: "atelier-boulet",
    prepTime: 5,
    cookTime: 10,
    servings: 4,
    difficulty: "facile",

    familyStory: `Cette recette, c'est le résultat de plusieurs essais... et mes cobayes (la famille quoi!) ont souffert un peu de mes tentatives. Trop salé, trop sucré, goûte rien... j'ai tout essayé!

Mais au final, celle-ci semble être la bonne... jusqu'à maintenant du moins. Qui sait, je vais peut-être encore la travailler! C'est ça la beauté de développer ses propres recettes - on n'arrête jamais vraiment de les peaufiner.`,

    ingredients: [
      { name: "Sauce soya légère", quantity: "60 ml (1/4 tasse)" },
      { name: "Bouillon de bœuf", quantity: "125 ml (1/2 tasse)" },
      { name: "Sauce d'huître", quantity: "30 ml (2 c. à soupe)" },
      { name: "Fécule de maïs", quantity: "15 ml (1 c. à soupe)" },
      { name: "Sucre", quantity: "5 ml (1 c. à thé)" },
      { name: "Huile de sésame", quantity: "5 ml (1 c. à thé)" },
      { name: "Ail", quantity: "2 gousses hachées" },
      { name: "Gingembre frais", quantity: "5 ml (1 c. à thé) râpé" },
      { name: "Poivre noir", quantity: "Une pincée" }
    ],

    tools: [
      { 
        name: "Fouet", 
        essential: false,
        amazonLink: "https://www.amazon.ca/dp/B00004OCNJ?tag=ateliercboulet-20",
        description: "Pour bien mélanger et éviter les grumeaux de fécule"
      }
    ],

    instructions: [
      { stepNumber: 1, instruction: "Dans un bol, délayer la fécule de maïs avec 2 c. à soupe d'eau froide" },
      { stepNumber: 2, instruction: "Ajouter la sauce soya, le bouillon de bœuf, la sauce d'huître et le sucre" },
      { stepNumber: 3, instruction: "Incorporer l'ail haché, le gingembre râpé et le poivre" },
      { stepNumber: 4, instruction: "Bien mélanger tous les ingrédients au fouet" },
      { stepNumber: 5, instruction: "Dans un wok ou grande poêle, verser la sauce et chauffer à feu moyen" },
      { stepNumber: 6, instruction: "Remuer constamment jusqu'à épaississement (2-3 minutes)" },
      { stepNumber: 7, instruction: "Terminer avec l'huile de sésame hors du feu" },
      { stepNumber: 8, instruction: "Utiliser immédiatement avec votre bœuf et brocolis sautés" }
    ],

    searchableIngredients: ["sauce", "bœuf", "brocoli", "soya", "asiatique"]
  },

  {
    title: "Côtes de porc BBQ moutarde et érable sur Blackstone",
    slug: "cotes-de-porc-bbq-moutarde-et-erable",
    collection: "bbq-moderne",
    prepTime: 20,
    cookTime: 180,
    servings: 4,
    difficulty: "intermediaire",

    familyStory: `Cette recette marque une nouvelle étape dans mon évolution BBQ! Depuis que j'ai ma Blackstone, je repense complètement ma façon d'approcher les grillades. Ces côtes, je les prépare maintenant sur ma plancha - une technique que j'ai développée pour avoir un contrôle parfait de la cuisson.

Le mélange moutarde-érable, c'est devenu ma signature. Mes invités me demandent toujours le secret, et la réponse est simple: de la patience et de bons produits québécois!`,

    ingredients: [
      { name: "Côtes de porc style Saint-Louis", quantity: "1,5 kg (2 racks)" },
      { name: "Moutarde de Dijon", quantity: "60 ml (1/4 tasse)" },
      { name: "Sirop d'érable pur", quantity: "125 ml (1/2 tasse)" },
      { name: "Cassonade", quantity: "45 ml (3 c. à soupe)" },
      { name: "Paprika fumé", quantity: "15 ml (1 c. à soupe)" },
      { name: "Poudre d'ail", quantity: "5 ml (1 c. à thé)" },
      { name: "Poudre d'oignon", quantity: "5 ml (1 c. à thé)" },
      { name: "Sel", quantity: "10 ml (2 c. à thé)" },
      { name: "Poivre noir", quantity: "5 ml (1 c. à thé)" },
      { name: "Vinaigre de cidre", quantity: "30 ml (2 c. à soupe)" }
    ],

    tools: [
      { 
        name: "Plancha Blackstone ou BBQ", 
        essential: true,
        amazonLink: "https://www.amazon.ca/dp/B07MVBM4YW?tag=ateliercboulet-20",
        description: "Ma Blackstone préférée pour un contrôle parfait de la cuisson"
      },
      { 
        name: "Thermomètre à viande", 
        essential: true,
        amazonLink: "https://www.amazon.ca/dp/B01IHHLB3W?tag=ateliercboulet-20",
        description: "Indispensable pour atteindre 90°C interne parfait"
      },
      { 
        name: "Pinceau à badigeonner", 
        essential: false,
        amazonLink: "https://www.amazon.ca/dp/B074ZLBX9Q?tag=ateliercboulet-20",
        description: "Pour appliquer uniformément le glaçage érable-moutarde"
      }
    ],

    instructions: [
      { stepNumber: 1, instruction: "Retirer la membrane du dos des côtes avec un couteau et du papier absorbant" },
      { stepNumber: 2, instruction: "Mélanger tous les ingrédients secs pour créer le rub d'épices" },
      { stepNumber: 3, instruction: "Frotter généreusement les côtes avec le mélange d'épices des deux côtés" },
      { stepNumber: 4, instruction: "Laisser reposer 30 minutes à température ambiante pour que les épices pénètrent" },
      { stepNumber: 5, instruction: "Préchauffer la Blackstone à feu moyen-doux (150°C/300°F)" },
      { stepNumber: 6, instruction: "Placer les côtes côté chair vers le bas, cuire 1h30 en retournant aux 30 minutes" },
      { stepNumber: 7, instruction: "Pendant ce temps, mélanger moutarde, sirop d'érable et vinaigre pour le glaçage" },
      { stepNumber: 8, instruction: "Badigeonner les côtes avec le glaçage, cuire encore 30 minutes" },
      { stepNumber: 9, instruction: "Vérifier la température interne: 90°C pour des côtes tendres" },
      { stepNumber: 10, instruction: "Badigeonner une dernière fois et laisser reposer 10 minutes avant de découper" },
      { stepNumber: 11, instruction: "Découper entre les os et servir avec le reste de glaçage en accompagnement" }
    ],

    searchableIngredients: ["côtes", "porc", "bbq", "érable", "moutarde", "plancha"]
  }
]

async function createRecipes() {
  console.log('🚀 Injection des 4 recettes manquantes dans Sanity...\n')
  
  try {
    // Récupérer les IDs des collections
    const collectionIds = await getCollectionIds()
    console.log('📊 Collections trouvées:', Object.keys(collectionIds))
    
    for (const recipeData of recipesToCreate) {
      console.log(`\n📖 Création: ${recipeData.title}`)
      
      const collectionId = collectionIds[recipeData.collection]
      if (!collectionId) {
        console.log(`❌ Collection ${recipeData.collection} non trouvée`)
        continue
      }
      
      // Transformer les données au format Sanity
      const sanityRecipe = {
        _type: 'recipe',
        title: recipeData.title,
        slug: { current: recipeData.slug },
        collection: { _type: 'reference', _ref: collectionId },
        familyStory: createTextBlocks(recipeData.familyStory),
        prepTime: recipeData.prepTime,
        cookTime: recipeData.cookTime,
        servings: recipeData.servings,
        difficulty: recipeData.difficulty,
        
        ingredients: recipeData.ingredients.map(ing => ({
          _key: Math.random().toString(36).substr(2, 9),
          name: ing.name,
          quantity: ing.quantity,
          notes: ing.notes || '',
          amazonLink: ing.amazonLink || ''
        })),
        
        tools: recipeData.tools.map(tool => ({
          _key: Math.random().toString(36).substr(2, 9),
          name: tool.name,
          essential: tool.essential,
          amazonLink: tool.amazonLink,
          description: tool.description
        })),
        
        instructions: recipeData.instructions.map(inst => ({
          _key: Math.random().toString(36).substr(2, 9),
          stepNumber: inst.stepNumber,
          instruction: inst.instruction,
          tip: inst.tip || ''
        })),
        
        searchableIngredients: recipeData.searchableIngredients,
        publishedAt: new Date().toISOString(),
        featured: false
      }
      
      // Créer la recette
      const result = await client.create(sanityRecipe)
      console.log(`✅ ${recipeData.title} créée!`)
      console.log(`   📊 ${recipeData.ingredients.length} ingrédients, ${recipeData.instructions.length} étapes, ${recipeData.tools.length} ustensiles`)
      
    }
    
    console.log('\n🎉 Toutes les recettes ont été créées avec succès!')
    console.log('\n🍽️ Tu as maintenant 5 recettes complètes dans ton système Sanity + Astro!')
    
  } catch (error) {
    console.error('❌ Erreur lors de la création:', error.message)
  }
}

createRecipes()