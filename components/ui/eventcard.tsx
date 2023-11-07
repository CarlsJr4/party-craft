import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

import React from 'react';

const eventcard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Carl&apos;s 27th Birthday</CardTitle>
        <CardDescription>December 2nd, 1996</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, est?</p>
      </CardContent>
      <CardFooter>
        <Button className="mr-2">Edit</Button>
				<Button>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default eventcard;
