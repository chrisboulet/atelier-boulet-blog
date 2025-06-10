import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nom de la collection',
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
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      description: 'Emoji représentant la collection (ex: 👵, 🔥, 🍽️)'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description courte de la collection'
    }),
    defineField({
      name: 'longDescription',
      title: 'Description détaillée',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Description complète avec histoire familiale'
    }),
    defineField({
      name: 'featured',
      title: 'Collection vedette',
      type: 'boolean',
      description: 'Afficher en priorité sur la page d\'accueil'
    }),
    defineField({
      name: 'color',
      title: 'Couleur thématique',
      type: 'string',
      options: {
        list: [
          {title: 'Rouge (Maman Monique)', value: '#dc2626'},
          {title: 'Orange (Tante Marie)', value: '#ea580c'},
          {title: 'Bleu (L\'atelier Boulet)', value: '#2563eb'},
          {title: 'Vert (BBQ Moderne)', value: '#16a34a'},
          {title: 'Rose (Belle-maman Céline)', value: '#db2777'},
          {title: 'Violet (Créations Isabelle)', value: '#9333ea'},
          {title: 'Jaune (Inspiration Marmitons)', value: '#ca8a04'},
          {title: 'Teal (Projets à tester)', value: '#0891b2'}
        ]
      }
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Ordre dans le menu (1 = premier)'
    })
  ],
  
  preview: {
    select: {
      title: 'title',
      emoji: 'emoji',
      description: 'description'
    },
    prepare(selection) {
      const {title, emoji, description} = selection
      return {
        title: `${emoji} ${title}`,
        subtitle: description
      }
    }
  },
  
  orderings: [
    {
      title: 'Par ordre d\'affichage',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ]
})