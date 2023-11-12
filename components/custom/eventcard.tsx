import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DeleteConfirm from '@/components/custom/DeleteConfirm';

import React, { Key } from 'react';

type EventTypeProps = {
  title: String;
  date: String;
  body: String;
  id: Key;
  handleDelete: (id: Key) => void;
};

const eventcard = ({ title, date, body, handleDelete, id }: EventTypeProps) => {
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
        <DeleteConfirm id={id} handleDelete={handleDelete} />
      </CardFooter>
    </Card>
  );
};

export default eventcard;
