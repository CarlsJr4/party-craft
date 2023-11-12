import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  const handleOpenChange = (open: boolean) => {
    console.log(open);
  };

  return (
    <Dialog>
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
        />
      </DialogContent>
    </Dialog>
  );
}
