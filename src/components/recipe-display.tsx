import type { RecipeGenerationOutput } from '@/ai/flows/recipe-generation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle2, CircleDot, Utensils } from 'lucide-react';

interface RecipeDisplayProps {
  recipe: RecipeGenerationOutput;
}

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  const ingredients = recipe.requiredIngredients.split(',').map(item => item.trim()).filter(Boolean);
  const instructions = recipe.instructions.split('\n').filter(line => line.trim() !== '');

  return (
    <Card className="w-full animate-in fade-in-50 duration-500 border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">
          {recipe.dishName}
        </CardTitle>
        <CardDescription className="text-base">
          {recipe.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-headline text-xl font-semibold text-accent">
            <Utensils className="h-5 w-5" />
            Ingredients
          </h3>
          <ul className="space-y-2">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-headline text-xl font-semibold text-accent">
            <CircleDot className="h-5 w-5" />
            Instructions
          </h3>
          <ol className="space-y-3">
            {instructions.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
