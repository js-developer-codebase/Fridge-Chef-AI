'use server';

/**
 * @fileOverview Recipe generation flow.
 *
 * - generateRecipe - A function that generates a recipe based on the given ingredients.
 * - RecipeGenerationInput - The input type for the generateRecipe function.
 * - RecipeGenerationOutput - The return type for the generateRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecipeGenerationInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients the user has on hand.'),
});

export type RecipeGenerationInput = z.infer<typeof RecipeGenerationInputSchema>;

const RecipeGenerationOutputSchema = z.object({
  dishName: z.string().describe('The name of the dish.'),
  description: z.string().describe('A short description of the dish.'),
  requiredIngredients: z
    .string()
    .describe(
      'A comma-separated list of required ingredients, based only on user input, plus common pantry items if needed.'
    ),
  instructions: z.string().describe('Clear step-by-step instructions for the recipe.'),
});

export type RecipeGenerationOutput = z.infer<typeof RecipeGenerationOutputSchema>;

export async function generateRecipe(input: RecipeGenerationInput): Promise<RecipeGenerationOutput> {
  return recipeGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recipeGenerationPrompt',
  input: {schema: RecipeGenerationInputSchema},
  output: {schema: RecipeGenerationOutputSchema},
  prompt: `You are a world-class chef. Given the following ingredients, generate a recipe.

Ingredients: {{{ingredients}}}

Your recipe should include:

- A dish name
- A short description
- A list of required ingredients (based only on user input, plus common pantry items if needed)
- Clear step-by-step instructions`,
});

const recipeGenerationFlow = ai.defineFlow(
  {
    name: 'recipeGenerationFlow',
    inputSchema: RecipeGenerationInputSchema,
    outputSchema: RecipeGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
