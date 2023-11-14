import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DeleteConfirm from '@/components/custom/DeleteConfirm';
import EditDialog from '@/components/custom/EditDialog';
import { format } from 'date-fns';

import React, { Key } from 'react';
import EventType from '@/types/EventType';

type EventTypeProps = {
  title: string;
  date: Date;
  body: string;
  id: Key;
  handleDelete: (id: Key) => void;
};

const EventCard = ({ title, date, body, handleDelete, id }: EventTypeProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{format(new Date(date), 'PPP')}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
      <CardFooter>
        <EditDialog
          id={id}
          existingTitle={title}
          existingDate={date}
          existingBody={body}
        />
        <DeleteConfirm id={id} handleDelete={handleDelete} />
      </CardFooter>
    </Card>
  );
};

export default EventCard;
