import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'r3z1isef',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-05-04',
  useCdn: true, // Pour de meilleures performances en production
})

// Queries GROQ pour récupérer les données
export const queries = {
  // Récupérer toutes les collections
  collections: `
    *[_type == "collection"] | order(order asc) {
      _id,
      title,
      slug,
      emoji,
      description,
      color,
      featured,
      "recipeCount": count(*[_type == "recipe" && references(^._id)])
    }
  `,
  
  // Récupérer toutes les recettes avec leurs collections
  allRecipes: `
    *[_type == "recipe"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      familyStory,
      prepTime,
      cookTime,
      servings,
      difficulty,
      featuredImage,
      publishedAt,
      featured,
      collection->{
        title,
        slug,
        emoji,
        color
      }
    }
  `,
  
  // Récupérer les recettes d'une collection spécifique
  recipesByCollection: `
    *[_type == "recipe" && collection._ref == $collectionId] | order(publishedAt desc) {
      _id,
      title,
      slug,
      familyStory,
      prepTime,
      cookTime,
      servings,
      difficulty,
      featuredImage,
      publishedAt,
      collection->{
        title,
        slug,
        emoji,
        color
      }
    }
  `,
  
  // Récupérer une recette complète
  recipeBySlug: `
    *[_type == "recipe" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      familyStory,
      prepTime,
      cookTime,
      servings,
      difficulty,
      ingredients[]{
        _key,
        name,
        quantity,
        notes,
        amazonLink
      },
      tools[]{
        _key,
        name,
        essential,
        amazonLink,
        description
      },
      instructions[]{
        _key,
        stepNumber,
        instruction,
        tip
      },
      notes,
      searchableIngredients,
      seo,
      featuredImage,
      publishedAt,
      collection->{
        title,
        slug,
        emoji,
        color
      }
    }
  `,
  
  // Récupérer les recettes vedettes pour la page d'accueil
  featuredRecipes: `
    *[_type == "recipe" && featured == true] | order(publishedAt desc)[0...6] {
      _id,
      title,
      slug,
      familyStory[0],
      prepTime,
      cookTime,
      servings,
      featuredImage,
      collection->{
        title,
        slug,
        emoji,
        color
      }
    }
  `,
  
  // Récupérer une collection par slug
  collectionBySlug: `
    *[_type == "collection" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      emoji,
      description,
      longDescription,
      color,
      "recipeCount": count(*[_type == "recipe" && references(^._id)])
    }
  `
}

// Types TypeScript pour les données Sanity
export interface Collection {
  _id: string
  title: string
  slug: { current: string }
  emoji: string
  description: string
  longDescription?: any[]
  color: string
  featured: boolean
  recipeCount?: number
}

export interface Recipe {
  _id: string
  title: string
  slug: { current: string }
  familyStory: any[]
  prepTime: number | null
  cookTime: number | null
  servings: number | null
  difficulty: 'facile' | 'intermediaire' | 'difficile'
  ingredients?: Ingredient[]
  tools?: Tool[]
  instructions?: Instruction[]
  notes?: any[]
  searchableIngredients: string[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
  featuredImage?: any
  publishedAt: string
  featured: boolean
  collection: {
    title: string
    slug: { current: string }
    emoji: string
    color: string
  }
}

export interface Ingredient {
  _key: string
  name: string
  quantity: string
  notes?: string
  amazonLink?: string
}

export interface Tool {
  _key: string
  name: string
  essential: boolean
  amazonLink?: string
  description?: string
}

export interface Instruction {
  _key: string
  stepNumber: number
  instruction: string
  tip?: string
}