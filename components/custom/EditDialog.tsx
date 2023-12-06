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

type EditDialogType = {
  id: Key;
  existingTitle: string;
  existingDate: Date;
  existingBody: string;
};

export default function EditDialog({
  existingTitle,
  existingDate,
  existingBody,
  id,
}: EditDialogType) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
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
          isEditing={true}
          existingTitle={existingTitle}
          existingDate={existingDate}
          existingBody={existingBody}
          setDialogOpenState={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
