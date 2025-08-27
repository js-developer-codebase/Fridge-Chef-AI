'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export function RecipeForm({ error }: { error?: string | null }) {
  const { pending } = useFormStatus();
  return (
    <div className="space-y-6">
      <div className="grid w-full gap-2">
        <Label htmlFor="ingredients" className="sr-only">
          Ingredients
        </Label>
        <Textarea
          id="ingredients"
          name="ingredients"
          placeholder="e.g., chicken breast, broccoli, garlic, olive oil, lemon"
          rows={5}
          required
          className="bg-background"
          disabled={pending}
        />
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </div>
      <Button type="submit" disabled={pending} className="w-full md:w-auto">
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Recipe'
        )}
      </Button>
    </div>
  );
}
