import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'recipe',
  title: 'Recette',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la recette',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{type: 'collection'}],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'familyStory',
      title: 'Histoire familiale',
      type: 'array',
      of: [{type: 'block'}],
      description: '🎯 MONÉTISATION: Histoire authentique + liens Amazon intégrés'
    }),
    defineField({
      name: 'featuredImage',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
          description: 'Important pour SEO'
        }
      ]
    }),
    defineField({
      name: 'prepTime',
      title: 'Temps de préparation (minutes)',
      type: 'number'
    }),
    defineField({
      name: 'cookTime',
      title: 'Temps de cuisson (minutes)',
      type: 'number'
    }),
    defineField({
      name: 'servings',
      title: 'Nombre de portions',
      type: 'number'
    }),
    defineField({
      name: 'difficulty',
      title: 'Niveau de difficulté',
      type: 'string',
      options: {
        list: [
          {title: '🟢 Facile', value: 'facile'},
          {title: '🟡 Intermédiaire', value: 'intermediaire'},
          {title: '🔴 Difficile', value: 'difficile'}
        ]
      }
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingrédients',
      type: 'array',
      of: [{
        type: 'object',
        name: 'ingredient',
        fields: [
          {
            name: 'name',
            title: 'Ingrédient',
            type: 'string',
            validation: (Rule) => Rule.required()
          },
          {
            name: 'quantity',
            title: 'Quantité',
            type: 'string'
          },
          {
            name: 'notes',
            title: 'Notes',
            type: 'string',
            description: 'Ex: "ou au goût", "facultatif"'
          },
          {
            name: 'amazonLink',
            title: 'Lien Amazon (tag: ateliercboulet-20)',
            type: 'url',
            description: '💰 MONÉTISATION: Lien affilié Amazon Canada'
          }
        ],
        preview: {
          select: {
            name: 'name',
            quantity: 'quantity'
          },
          prepare(selection) {
            const {name, quantity} = selection
            return {
              title: `${quantity || ''} ${name}`.trim()
            }
          }
        }
      }],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: 'tools',
      title: 'Ustensiles recommandés',
      type: 'array',
      of: [{
        type: 'object',
        name: 'tool',
        fields: [
          {
            name: 'name',
            title: 'Ustensile',
            type: 'string',
            validation: (Rule) => Rule.required()
          },
          {
            name: 'essential',
            title: 'Essentiel',
            type: 'boolean',
            description: 'Cet ustensile est-il indispensable?'
          },
          {
            name: 'amazonLink',
            title: 'Lien Amazon (tag: ateliercboulet-20)',
            type: 'url',
            description: '💰 MONÉTISATION: Lien affilié Amazon Canada'
          },
          {
            name: 'description',
            title: 'Description/alternative',
            type: 'string',
            description: 'Ex: "ou une grande poêle"'
          }
        ],
        preview: {
          select: {
            name: 'name',
            essential: 'essential'
          },
          prepare(selection) {
            const {name, essential} = selection
            return {
              title: name,
              subtitle: essential ? '⭐ Essentiel' : 'Recommandé'
            }
          }
        }
      }]
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [{
        type: 'object',
        name: 'step',
        fields: [
          {
            name: 'stepNumber',
            title: 'Étape',
            type: 'number'
          },
          {
            name: 'instruction',
            title: 'Instruction',
            type: 'text',
            validation: (Rule) => Rule.required()
          },
          {
            name: 'tip',
            title: 'Astuce pro',
            type: 'string',
            description: 'Conseil technique du chef'
          },
          {
            name: 'image',
            title: 'Image de l\'étape',
            type: 'image',
            options: {
              hotspot: true,
            }
          }
        ],
        preview: {
          select: {
            stepNumber: 'stepNumber',
            instruction: 'instruction'
          },
          prepare(selection) {
            const {stepNumber, instruction} = selection
            return {
              title: `Étape ${stepNumber}`,
              subtitle: instruction?.substring(0, 60) + '...'
            }
          }
        }
      }],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: 'notes',
      title: 'Notes de chef',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Conseils, variations, conservation...'
    }),
    defineField({
      name: 'searchableIngredients',
      title: 'Tags ingrédients (recherche)',
      type: 'array',
      of: [{type: 'string'}],
      description: '🔍 RECHERCHE AVANCÉE: Mots-clés pour "5 ingrédients = suggestions"',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'nutrition',
      title: 'Informations nutritionnelles',
      type: 'object',
      fields: [
        {name: 'calories', title: 'Calories par portion', type: 'number'},
        {name: 'protein', title: 'Protéines (g)', type: 'number'},
        {name: 'carbs', title: 'Glucides (g)', type: 'number'},
        {name: 'fat', title: 'Lipides (g)', type: 'number'}
      ],
      options: {
        collapsible: true,
        collapsed: true
      }
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Titre SEO',
          type: 'string',
          description: 'Si vide, utilise le titre de la recette'
        },
        {
          name: 'metaDescription',
          title: 'Description SEO',
          type: 'text',
          description: '150-160 caractères pour Google'
        },
        {
          name: 'keywords',
          title: 'Mots-clés SEO',
          type: 'array',
          of: [{type: 'string'}],
          options: {
            layout: 'tags'
          }
        }
      ],
      options: {
        collapsible: true,
        collapsed: true
      }
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'featured',
      title: 'Recette vedette',
      type: 'boolean',
      description: 'Afficher sur la page d\'accueil'
    })
  ],

  preview: {
    select: {
      title: 'title',
      collection: 'collection.title',
      emoji: 'collection.emoji',
      media: 'featuredImage'
    },
    prepare(selection) {
      const {title, collection, emoji, media} = selection
      return {
        title: title,
        subtitle: `${emoji || ''} ${collection || 'Sans collection'}`.trim(),
        media: media
      }
    }
  },

  orderings: [
    {
      title: 'Par date de publication',
      name: 'publishedAtDesc',
      by: [
        {field: 'publishedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Par collection',
      name: 'collectionAsc',
      by: [
        {field: 'collection.title', direction: 'asc'},
        {field: 'publishedAt', direction: 'desc'}
      ]
    }
  ]
})