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
import Link from 'next/link';

type EventCardProps = {
  title: string;
  isOwned: boolean;
  date: Date;
  body: string;
  id: Key;
  handleDelete: (id: Key) => void;
};

const EventCard = ({
  title,
  date,
  body,
  handleDelete,
  id,
  isOwned,
}: EventCardProps) => {
  return (
    <Card>
      <CardHeader>
        <Link href={`/dashboard/event/${id}`}>
          <CardTitle className="underline">{title}</CardTitle>
        </Link>
        <CardDescription>{format(new Date(date), 'PPP')}</CardDescription>
      </CardHeader>
      <CardContent>
        {body.length > 99 ? <p>{body.substring(0, 100)}...</p> : <p>{body}</p>}
      </CardContent>
      {isOwned ? (
        <CardFooter className="grid-cols-2 gap-1 mt-auto">
          <EditDialog
            id={id}
            existingTitle={title}
            existingDate={date}
            existingBody={body}
          />
          <DeleteConfirm id={id} handleDelete={handleDelete} />
        </CardFooter>
      ) : (
        ''
      )}
    </Card>
  );
};

export default EventCard;
