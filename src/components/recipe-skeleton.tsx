import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function RecipeSkeleton() {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <Skeleton className="h-8 w-3/4 rounded-md" />
        <Skeleton className="mt-2 h-4 w-full rounded-md" />
        <Skeleton className="mt-1 h-4 w-5/6 rounded-md" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Skeleton className="mb-4 h-6 w-1/3 rounded-md" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <Skeleton className="mb-4 h-6 w-1/3 rounded-md" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
