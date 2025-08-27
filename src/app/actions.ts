'use server';

import {
  generateRecipe,
  type RecipeGenerationOutput,
} from '@/ai/flows/recipe-generation';
import { z } from 'zod';

const formSchema = z.object({
  ingredients: z
    .string()
    .min(10, 'Please list at least a few ingredients to get a good recipe.'),
});

export interface ActionState {
  data?: RecipeGenerationOutput | null;
  error?: string | null;
}

export async function getRecipeAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const validatedFields = formSchema.safeParse({
    ingredients: formData.get('ingredients'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.ingredients?.[0],
    };
  }

  try {
    const recipe = await generateRecipe({
      ingredients: validatedFields.data.ingredients,
    });
    return { data: recipe };
  } catch (error) {
    console.error(error);
    return { error: 'Sorry, I had trouble generating a recipe. Please try again.' };
  }
}
