import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function EventCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-[250px]" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-[200px]" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EventCardSkeleton;
