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
import { useState } from 'react';

type EditDialogType = {
  existingTitle: string;
  existingDate: Date;
  existingBody: string;
};

export default function EditDialog({
  existingTitle,
  existingDate,
  existingBody,
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
          isEditing={true}
          existingTitle={existingTitle}
          existingDate={existingDate}
          existingBody={existingBody}
          setEditDialogOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
