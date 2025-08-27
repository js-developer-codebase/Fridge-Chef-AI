'use client';

import { useActionState } from 'react';
import { getRecipeAction, type ActionState } from '@/app/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChefHat, Flame } from 'lucide-react';
import { RecipeDisplay } from '@/components/recipe-display';
import { RecipeSkeleton } from '@/components/recipe-skeleton';
import { RecipeForm } from '@/components/recipe-form';

const initialState: ActionState = {
  data: null,
  error: null,
};

export default function Home() {
  const [state, formAction, isPending] = useActionState(
    getRecipeAction,
    initialState
  );

  return (
    <div className="flex min-h-screen flex-col items-center bg-background p-4 text-foreground sm:p-6 md:p-8">
      <main className="w-full max-w-2xl">
        <header className="mb-8 text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 p-4">
            <ChefHat className="h-12 w-12 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
            Fridge Chef AI
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Tell me what's in your fridge, and I'll whip up a recipe for you!
          </p>
        </header>

        <Card className="w-full border-2 border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl text-accent">
              <Flame className="text-primary" />
              Your Ingredients
            </CardTitle>
            <CardDescription>
              List the ingredients you have on hand, separated by commas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction}>
              <RecipeForm error={state.error} />
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 w-full">
          {isPending && <RecipeSkeleton />}
          {state.data && !isPending && <RecipeDisplay recipe={state.data} />}
        </div>
      </main>
    </div>
  );
}
