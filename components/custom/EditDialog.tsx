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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Event</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit event</DialogTitle>
          <DialogDescription>
            Make changes to your event here. Click submit when you&apos;re done.
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
