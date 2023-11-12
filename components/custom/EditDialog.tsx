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
  title: string;
  date: Date;
  body: string;
};

export default function EditDialog({ title, date, body }: EditDialogType) {
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
        <EventForm editTitle={title} editDate={date} editBody={body} />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
