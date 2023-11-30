import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function EventCardSkeleton() {
  return (
    <Card>
      <Skeleton className="h-4 w-[250px] ml-6 my-4" />
      <Skeleton className="h-4 w-[200px] ml-6 mb-7" />
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
