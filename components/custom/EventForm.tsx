'use client';

import React, { Dispatch, Key, SetStateAction, useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';
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
import { DialogFooter } from '../ui/dialog';
import { EventContext } from './DashboardWrapper';

import { createBrowserClient } from '@supabase/ssr';
import EventType from '@/types/EventType';

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
  id?: Key;
  existingTitle?: string;
  existingBody?: string;
  existingDate?: Date;
  isEditing?: true;
  setDialogOpenState: Dispatch<SetStateAction<boolean>>;
};

const EventForm = ({
  id,
  isEditing,
  existingTitle,
  existingBody,
  existingDate,
  setDialogOpenState,
}: EventFormType) => {
  const { toast } = useToast();
  const { events, setEvents } = useContext(EventContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventname: existingTitle || '',
      eventdesc: existingBody || '',
      eventdate: (existingDate && new Date(existingDate)) || undefined,
    },
  });

  async function onSubmit({
    eventdate,
    eventdesc,
    eventname,
  }: z.infer<typeof formSchema>) {
    if (isEditing && events) {
      let newEvents = [...events];
      newEvents = newEvents.map(event =>
        event.id === id
          ? {
              ...event,
              title: eventname,
              body: eventdesc,
              date: eventdate,
            }
          : event
      );
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CUSTOM_PROJECT_URL}/api/events/${id}`,
          {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id,
              title: eventname,
              body: eventdesc,
              date: eventdate,
            }),
          }
        );
        if (res.status !== 201) {
          throw new Error();
        }
        setEvents(newEvents);
        toast({
          title: 'Success!',
          description: 'Your changes have been saved.',
        });
        setDialogOpenState(false);
      } catch {
        toast({
          title: 'Uh oh!',
          description:
            'There was an issue editing your event. Try again in a few seconds.',
        });
      }
    } else if (events) {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const newEvent: EventType = {
        title: eventname,
        id: uuidv4(),
        body: eventdesc,
        date: eventdate,
        owned_by: user!.id, // Used ! here because middleware and RLS already prevent unauthenticated users from seeing this page
      };
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CUSTOM_PROJECT_URL}/api/events`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
          }
        );
        if (res.status !== 201) {
          throw new Error();
        }
        form.reset();
        let updatedEvents = [...events];
        updatedEvents.unshift(newEvent); // We need to add owned_by here. Can we get it from the response data?
        setEvents(updatedEvents);
        toast({
          title: 'Hooray!',
          description: 'Event created!',
        });
        setDialogOpenState(false);
      } catch (error) {
        toast({
          title: 'Uh oh!',
          description:
            'There was an issue creating your event. Try again in a few seconds.',
        });
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
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
                  <FormLabel className="mr-2">Event date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                            'rounded-md'
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
            <DialogFooter className="mt-8">
              <Button type="submit">Save</Button>
            </DialogFooter>
          ) : (
            <Button type="submit" className="mt-8 self-start">
              Submit
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};

export default EventForm;
