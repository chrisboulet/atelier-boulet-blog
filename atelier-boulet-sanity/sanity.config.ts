import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'atelier-boulet',
  title: "L'atelier Boulet - Blog Culinaire Québécois",
  
  projectId: 'r3z1isef',
  dataset: 'production',
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            // Collections organizées
            S.listItem()
              .title('📚 Collections')
              .child(
                S.list()
                  .title('Collections Familiales')
                  .items([
                    S.listItem()
                      .title('👵 Maman Monique')
                      .child(
                        S.documentList()
                          .title('Recettes de Maman Monique')
                          .filter('_type == "recipe" && collection._ref in *[_type=="collection" && slug.current=="maman-monique"]._id')
                      ),
                    S.listItem()
                      .title('👩‍🍳 Ma Tante Marie')
                      .child(
                        S.documentList()
                          .title('Recettes de Tante Marie')
                          .filter('_type == "recipe" && collection._ref in *[_type=="collection" && slug.current=="tante-marie"]._id')
                      ),
                    S.listItem()
                      .title('🍽️ L\'atelier Boulet')
                      .child(
                        S.documentList()
                          .title('Adaptations du Picadilly Pub')
                          .filter('_type == "recipe" && collection._ref in *[_type=="collection" && slug.current=="atelier-boulet"]._id')
                      ),
                    S.listItem()
                      .title('🔥 BBQ Moderne')
                      .child(
                        S.documentList()
                          .title('Recettes BBQ & Fumage')
                          .filter('_type == "recipe" && collection._ref in *[_type=="collection" && slug.current=="bbq-moderne"]._id')
                      ),
                    S.listItem()
                      .title('💝 Belle-maman Céline')
                      .child(
                        S.documentList()
                          .title('En mémoire de Céline')
                          .filter('_type == "recipe" && collection._ref in *[_type=="collection" && slug.current=="belle-maman-celine"]._id')
                      ),
                    S.listItem()
                      .title('🎨 Créations Isabelle')
                      .child(
                        S.documentList()
                          .title('Innovations culinaires d\'Isabelle')
                          .filter('_type == "recipe" && collection._ref in *[_type=="collection" && slug.current=="creations-isabelle"]._id')
                      ),
                    S.listItem()
                      .title('👨‍🍳 Inspiration Marmitons')
                      .child(
                        S.documentList()
                          .title('Adaptations des Marmitons de Québec')
                          .filter('_type == "recipe" && collection._ref in *[_type=="collection" && slug.current=="inspiration-marmitons"]._id')
                      ),
                    S.listItem()
                      .title('🧪 Projets à tester')
                      .child(
                        S.documentList()
                          .title('Recettes en développement')
                          .filter('_type == "recipe" && collection._ref in *[_type=="collection" && slug.current=="projets-a-tester"]._id')
                      ),
                  ])
              ),
            
            // Toutes les recettes
            S.listItem()
              .title('🍽️ Toutes les Recettes')
              .child(S.documentTypeList('recipe').title('Recettes')),
            
            // Gestion des collections
            S.listItem()
              .title('🏷️ Gestion Collections')
              .child(S.documentTypeList('collection').title('Collections')),
            
            // Ingrédients pour recherche
            S.listItem()
              .title('🥕 Ingrédients')
              .child(S.documentTypeList('ingredient').title('Base d\'ingrédients')),
            
            // Ustensiles Amazon
            S.listItem()
              .title('🔧 Ustensiles')
              .child(S.documentTypeList('tool').title('Ustensiles & Liens Amazon')),
          ])
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes
  },
  
  // Configuration française québécoise
  i18n: {
    locale: 'fr-CA',
    messages: {
      'fr-CA': {
        'studio.title': "L'atelier Boulet",
        'navbar.create-new-document': 'Nouvelle recette',
        'navbar.search-placeholder': 'Rechercher une recette...'
      }
    }
  }
})