import React, { Key, useContext } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { EventContext } from '@/components/custom/DashboardWrapper';
import { Trash2Icon } from 'lucide-react';

type DeleteConfirmProps = {
  handleDelete: (id: Key) => void;
  id: Key;
};

const DeleteConfirm = ({ handleDelete, id }: DeleteConfirmProps) => {
  const { events } = useContext(EventContext);
  const eventToDelete = events!.filter(event => event.id === id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <span>Delete</span>
          <Trash2Icon className="h-4 w-4 ml-2" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete
            <p>
              &quot;<span>{eventToDelete[0].title}</span>?&quot;
            </p>
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Your event will be gone forever!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive"
            onClick={() => handleDelete(id)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirm;
