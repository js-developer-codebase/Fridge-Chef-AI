// Pantry Suggestions Flow
'use server';
/**
 * @fileOverview This file defines a Genkit flow that suggests common pantry items to complement a user's ingredients.
 *
 * - suggestPantryItems - A function that suggests pantry items based on a list of ingredients.
 * - SuggestPantryItemsInput - The input type for the suggestPantryItems function.
 * - SuggestPantryItemsOutput - The return type for the suggestPantryItems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPantryItemsInputSchema = z.object({
  ingredients: z
    .array(z.string())
    .describe('A list of ingredients the user has available.'),
  recipeType: z.string().optional().describe('The type of recipe the user wants to make (e.g., pasta, soup, salad).'),
});
export type SuggestPantryItemsInput = z.infer<typeof SuggestPantryItemsInputSchema>;

const SuggestPantryItemsOutputSchema = z.object({
  pantryItems: z
    .array(z.string())
    .describe('A list of pantry items that would complement the given ingredients.'),
});
export type SuggestPantryItemsOutput = z.infer<typeof SuggestPantryItemsOutputSchema>;

export async function suggestPantryItems(input: SuggestPantryItemsInput): Promise<SuggestPantryItemsOutput> {
  return suggestPantryItemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPantryItemsPrompt',
  input: {schema: SuggestPantryItemsInputSchema},
  output: {schema: SuggestPantryItemsOutputSchema},
  prompt: `Based on the ingredients you have and the type of recipe you want to make, suggest some common pantry items that would complement these ingredients. Only suggest ingredients that are typically found in a pantry.

Ingredients: {{ingredients}}
Recipe Type: {{recipeType}}

Pantry Items:`,
});

const suggestPantryItemsFlow = ai.defineFlow(
  {
    name: 'suggestPantryItemsFlow',
    inputSchema: SuggestPantryItemsInputSchema,
    outputSchema: SuggestPantryItemsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
