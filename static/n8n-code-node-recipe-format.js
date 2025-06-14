// Code node pour n8n - Format de recette amélioré
// À copier dans le node Code de votre workflow n8n

const recipeData = items[0].json.choices[0].message.content;
const recipe = JSON.parse(recipeData);

// Générer un nom de fichier unique avec timestamp
const timestamp = new Date().toISOString().replace(/:/g, '-').substring(0, 19);
const fileName = `${recipe.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${timestamp}.md`;

// Créer le contenu Markdown avec les nouveaux shortcodes
let content = `---
title: "${recipe.title}"
date: ${new Date().toISOString()}
tags: [${recipe.tags.map(tag => `"${tag}"`).join(',')}]
---

${recipe.description}

{{< figure src="/images/recipes/${fileName.replace('.md', '.jpg')}" alt="${recipe.title}" class="recipe-image" >}}

{{< recipe-info "${recipe.portions || '4 portions'}" "${recipe.prepTime || '20 minutes'}" "${recipe.cookTime || '30 minutes'}" >}}

{{< download-pdf "${recipe.title}" >}}

## Ingrédients

{{< ingredients-list >}}
${recipe.ingredients.map(ing => `${ing.quantity} : ${ing.item}`).join('\n')}
{{< /ingredients-list >}}

## Préparation

{{< preparation-list >}}
${recipe.steps.join('\n')}
{{< /preparation-list >}}
`;

// Ajouter les notes si présentes
if (recipe.notes && recipe.notes.length > 0) {
  content += `\n## Notes\n\n{{< recipe-notes >}}\n`;
  recipe.notes.forEach(note => {
    content += `- ${note}\n`;
  });
  content += `{{< /recipe-notes >}}\n`;
}

// Ajouter les variations si présentes
if (recipe.variations && recipe.variations.length > 0) {
  content += `\n## Variations\n\n{{< recipe-variations >}}\n`;
  recipe.variations.forEach(variation => {
    content += `- ${variation}\n`;
  });
  content += `{{< /recipe-variations >}}\n`;
}

// Encoder le contenu en base64
const contentBase64 = Buffer.from(content).toString('base64');

return [{
  json: {
    path: `content/posts/${fileName}`,
    contentBase64: contentBase64,
    message: `Ajout de la recette: ${recipe.title}`
  }
}];