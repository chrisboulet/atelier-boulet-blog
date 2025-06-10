import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ingredient',
  title: 'Ingrédient',
  type: 'document',
  description: 'Base de données d\'ingrédients pour recherche avancée',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de l\'ingrédient',
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
          {title: '🥩 Viandes & Poissons', value: 'viandes'},
          {title: '🥕 Légumes', value: 'legumes'},
          {title: '🍎 Fruits', value: 'fruits'},
          {title: '🧄 Aromates & Épices', value: 'aromates'},
          {title: '🥛 Produits laitiers', value: 'laitiers'},
          {title: '🌾 Céréales & Légumineuses', value: 'cereales'},
          {title: '🫒 Huiles & Condiments', value: 'condiments'},
          {title: '🍯 Sucrants', value: 'sucrants'},
          {title: '🥃 Alcools & Liquides', value: 'liquides'},
          {title: '🧂 Assaisonnements', value: 'assaisonnements'}
        ]
      }
    }),
    defineField({
      name: 'alternativeNames',
      title: 'Noms alternatifs',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Autres façons de nommer cet ingrédient'
    }),
    defineField({
      name: 'season',
      title: 'Saison optimale',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: '🌸 Printemps', value: 'printemps'},
          {title: '☀️ Été', value: 'ete'},
          {title: '🍂 Automne', value: 'automne'},
          {title: '❄️ Hiver', value: 'hiver'},
          {title: '🌍 Toute l\'année', value: 'toute-annee'}
        ]
      }
    }),
    defineField({
      name: 'amazonProducts',
      title: 'Produits Amazon recommandés',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'productName',
            title: 'Nom du produit',
            type: 'string'
          },
          {
            name: 'amazonLink',
            title: 'Lien Amazon (tag: ateliercboulet-20)',
            type: 'url'
          },
          {
            name: 'notes',
            title: 'Notes',
            type: 'string',
            description: 'Pourquoi recommander ce produit'
          }
        ]
      }],
      description: '💰 MONÉTISATION: Liens affiliés pour cet ingrédient'
    }),
    defineField({
      name: 'storageInstructions',
      title: 'Conservation',
      type: 'text',
      description: 'Comment bien conserver cet ingrédient'
    }),
    defineField({
      name: 'nutritionalInfo',
      title: 'Infos nutritionnelles',
      type: 'text',
      description: 'Bénéfices nutritionnels principaux'
    })
  ],

  preview: {
    select: {
      title: 'name',
      category: 'category'
    },
    prepare(selection) {
      const {title, category} = selection
      const categoryLabels = {
        'viandes': '🥩 Viandes & Poissons',
        'legumes': '🥕 Légumes',
        'fruits': '🍎 Fruits',
        'aromates': '🧄 Aromates & Épices',
        'laitiers': '🥛 Produits laitiers',
        'cereales': '🌾 Céréales & Légumineuses',
        'condiments': '🫒 Huiles & Condiments',
        'sucrants': '🍯 Sucrants',
        'liquides': '🥃 Alcools & Liquides',
        'assaisonnements': '🧂 Assaisonnements'
      }
      
      return {
        title: title,
        subtitle: categoryLabels[category] || category
      }
    }
  },

  orderings: [
    {
      title: 'Par catégorie',
      name: 'categoryAsc',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'name', direction: 'asc'}
      ]
    },
    {
      title: 'Alphabétique',
      name: 'nameAsc',
      by: [
        {field: 'name', direction: 'asc'}
      ]
    }
  ]
})