import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tool',
  title: 'Ustensile',
  type: 'document',
  description: 'Ustensiles de cuisine avec liens affiliés Amazon',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de l\'ustensile',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      }
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: '🔥 BBQ & Fumage', value: 'bbq'},
          {title: '🍳 Cuisson & Poêles', value: 'cuisson'},
          {title: '🔪 Couteaux & Découpe', value: 'couteaux'},
          {title: '🥄 Ustensiles de base', value: 'ustensiles'},
          {title: '⚡ Électroménager', value: 'electromenager'},
          {title: '🥣 Préparation & Mélange', value: 'preparation'},
          {title: '📏 Mesure & Précision', value: 'mesure'},
          {title: '🍰 Pâtisserie', value: 'patisserie'},
          {title: '🏺 Conservation', value: 'conservation'},
          {title: '🧽 Nettoyage', value: 'nettoyage'}
        ]
      }
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'À quoi sert cet ustensile, pourquoi le recommander'
    }),
    defineField({
      name: 'essential',
      title: 'Essentiel pour débuter',
      type: 'boolean',
      description: 'Cet ustensile est-il indispensable dans une cuisine?'
    }),
    defineField({
      name: 'priceRange',
      title: 'Gamme de prix',
      type: 'string',
      options: {
        list: [
          {title: '💚 Budget (0-25$)', value: 'budget'},
          {title: '🟡 Milieu (25-75$)', value: 'milieu'},
          {title: '🟠 Premium (75-200$)', value: 'premium'},
          {title: '🔴 Professionnel (200$+)', value: 'professionnel'}
        ]
      }
    }),
    defineField({
      name: 'amazonProducts',
      title: 'Produits Amazon recommandés',
      type: 'array',
      of: [{
        type: 'object',
        name: 'amazonProduct',
        fields: [
          {
            name: 'productName',
            title: 'Nom du produit',
            type: 'string',
            validation: (Rule) => Rule.required()
          },
          {
            name: 'amazonLink',
            title: 'Lien Amazon (tag: ateliercboulet-20)',
            type: 'url',
            validation: (Rule) => Rule.required()
          },
          {
            name: 'price',
            title: 'Prix approximatif',
            type: 'string',
            description: 'Ex: "25-35$"'
          },
          {
            name: 'recommended',
            title: 'Choix recommandé',
            type: 'boolean',
            description: 'Ton produit coup de cœur'
          },
          {
            name: 'notes',
            title: 'Notes personnelles',
            type: 'text',
            description: 'Pourquoi tu recommandes ce produit spécifiquement'
          },
          {
            name: 'image',
            title: 'Image du produit',
            type: 'image',
            options: {
              hotspot: true,
            }
          }
        ],
        preview: {
          select: {
            name: 'productName',
            price: 'price',
            recommended: 'recommended'
          },
          prepare(selection) {
            const {name, price, recommended} = selection
            return {
              title: name,
              subtitle: `${price || ''} ${recommended ? '⭐ Recommandé' : ''}`.trim()
            }
          }
        }
      }],
      validation: (Rule) => Rule.min(1).error('Au moins un produit Amazon requis')
    }),
    defineField({
      name: 'alternatives',
      title: 'Alternatives maison',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Substituts ou alternatives si on n\'a pas cet ustensile'
    }),
    defineField({
      name: 'maintenanceTips',
      title: 'Conseils d\'entretien',
      type: 'text',
      description: 'Comment bien entretenir cet ustensile'
    }),
    defineField({
      name: 'usageFrequency',
      title: 'Fréquence d\'utilisation',
      type: 'string',
      options: {
        list: [
          {title: '📅 Quotidien', value: 'quotidien'},
          {title: '📆 Hebdomadaire', value: 'hebdomadaire'},
          {title: '🗓️ Occasionnel', value: 'occasionnel'},
          {title: '🎉 Spécialisé', value: 'specialise'}
        ]
      }
    })
  ],

  preview: {
    select: {
      title: 'name',
      category: 'category',
      essential: 'essential',
      priceRange: 'priceRange'
    },
    prepare(selection) {
      const {title, category, essential, priceRange} = selection
      
      const categoryLabels = {
        'bbq': '🔥 BBQ',
        'cuisson': '🍳 Cuisson',
        'couteaux': '🔪 Couteaux',
        'ustensiles': '🥄 Ustensiles',
        'electromenager': '⚡ Électro',
        'preparation': '🥣 Préparation',
        'mesure': '📏 Mesure',
        'patisserie': '🍰 Pâtisserie',
        'conservation': '🏺 Conservation',
        'nettoyage': '🧽 Nettoyage'
      }
      
      const priceLabels = {
        'budget': '💚',
        'milieu': '🟡',
        'premium': '🟠',
        'professionnel': '🔴'
      }
      
      return {
        title: title,
        subtitle: `${categoryLabels[category] || category} ${priceLabels[priceRange] || ''} ${essential ? '⭐ Essentiel' : ''}`.trim()
      }
    }
  },

  orderings: [
    {
      title: 'Par catégorie',
      name: 'categoryAsc',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'essential', direction: 'desc'},
        {field: 'name', direction: 'asc'}
      ]
    },
    {
      title: 'Essentiels d\'abord',
      name: 'essentialFirst',
      by: [
        {field: 'essential', direction: 'desc'},
        {field: 'category', direction: 'asc'},
        {field: 'name', direction: 'asc'}
      ]
    }
  ]
})