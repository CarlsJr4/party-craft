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

type EventType = {
  id: Key;
  title: string;
  date: Date;
  body: string;
  key: Key;
};

type EventTypeProps = {
  title: string;
  date: Date;
  body: string;
  id: Key;
  eventData: EventType[];
  handleDelete: (id: Key) => void;
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
};

const EventCard = ({
  title,
  date,
  body,
  handleDelete,
  eventData,
  id,
  setEvents,
}: EventTypeProps) => {
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
          eventData={eventData}
          existingTitle={title}
          existingDate={date}
          existingBody={body}
          setEvents={setEvents}
        />
        <DeleteConfirm id={id} handleDelete={handleDelete} />
      </CardFooter>
    </Card>
  );
};

export default EventCard;
