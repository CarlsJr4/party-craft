import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import EventForm from '@/components/custom/EventForm';
import { Key, useState } from 'react';
import EventType from '@/types/EventType';

type EditDialogType = {
  id: Key;
  existingTitle: string;
  existingDate: Date;
  existingBody: string;
  eventData: EventType[];
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
};

export default function EditDialog({
  existingTitle,
  existingDate,
  existingBody,
  setEvents,
  id,
  eventData,
}: EditDialogType) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit event</DialogTitle>
          <DialogDescription>
            Make changes to your event here.
          </DialogDescription>
        </DialogHeader>
        <EventForm
          id={id}
          eventData={eventData}
          isEditing={true}
          existingTitle={existingTitle}
          existingDate={existingDate}
          existingBody={existingBody}
          setDialogOpenState={setOpen}
          setEvents={setEvents}
        />
      </DialogContent>
    </Dialog>
  );
}
