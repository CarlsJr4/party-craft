import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const GuestSkeleton = () => {
  return (
    <Card className="items-center mt-3">
      <Skeleton className="h-10 w-10 rounded-full mt-3" />
      <CardContent>
        <Skeleton className="h-4 w-[150px] mt-3" />
        <Skeleton className="h-4 w-[150px] mt-3" />
      </CardContent>
    </Card>
  );
};

export default GuestSkeleton;
