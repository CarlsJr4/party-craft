'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';

import { cn } from '@/lib/utils';
import { Toaster } from '../ui/toaster';
import { DialogClose } from '@radix-ui/react-dialog';
import { DialogFooter } from '../ui/dialog';

const formSchema = z.object({
  eventname: z.string().min(3, {
    message: 'Event name must be at least 3 characters.',
  }),
  eventdesc: z.string({}).min(1, {
    message: 'Event description cannot be blank.',
  }),
  eventdate: z.date({
    required_error: 'Please pick a date.',
  }),
});

type EventFormType = {
  existingTitle?: string;
  existingBody?: string;
  existingDate?: Date;
  isEditing?: true;
};

const EventForm = ({
  existingTitle,
  existingBody,
  existingDate,
  isEditing,
}: EventFormType) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventname: existingTitle || '',
      eventdesc: existingBody || '',
      eventdate: (existingDate && new Date(existingDate)) || undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // On submit, update the state of the events
    // Differentiate based on if user is creating or editing
    // Update state
    if (isEditing) {
      toast({
        title: 'Success!',
        description: 'Your changes have been saved.',
      });
    } else {
      form.reset();
      toast({
        title: 'Hooray!',
        description: 'Event created!',
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="eventname"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Event name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="eventdesc"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Event description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="eventdate"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Event date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date =>
                          date < new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {isEditing ? (
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </form>
      </Form>
    </>
  );
};

export default EventForm;
