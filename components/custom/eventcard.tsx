import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import React from 'react';

type EventTypeProps = {
  title: String;
  date: String;
  body: String;
};

const eventcard = ({ title, date, body }: EventTypeProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
      <CardFooter>
        <Button className="mr-2">Edit</Button>
        <Button>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default eventcard;
