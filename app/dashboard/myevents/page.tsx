'use client';
import React, { Key, useContext, useEffect, useState } from 'react';
import EventCard from '@/components/custom/eventcard';
import { useToast } from '@/components/ui/use-toast';
import {
  EventContext,
  EventErrorContext,
} from '@/components/custom/DashboardWrapper';
import { createBrowserClient } from '@supabase/ssr';

const ExploreEvents = () => {
  const { toast } = useToast();
  const { events, setEvents } = useContext(EventContext);
  const errors = useContext(EventErrorContext);
  const [userID, setUserID] = useState<string | undefined>('');

  useEffect(() => {
    async function getUserID() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserID(user?.id);
    }
    getUserID();
  });

  const handleDelete = async (id: Key) => {
    let filteredEvents = [...events];
    filteredEvents = filteredEvents.filter(event => event.id !== id);
    const response = await fetch(`http://localhost:3000/api/events/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(id),
    });
    if (response.status === 204) {
      setEvents(filteredEvents);
      toast({
        description: 'Event deleted.',
      });
    } else {
      toast({
        title: 'Uh oh!',
        description:
          'There was an issue deleting your event. Try again in a few seconds.',
      });
    }
  };

  return (
    <div>
      <h1>Your events</h1>
      <p>
        Events you&apos;ve been invited to, saved, and created will show up
        here:
      </p>
      <div className="grid grid-cols-4 mt-5 gap-8">
        {errors && (
          <div>
            <p>Uh oh!</p>
            <p>There was an issue retrieving your events.</p>
          </div>
        )}
        {events.length === 0 && !errors ? <p>No events found.</p> : ''}
        {events
          .filter(({ owned_by }) => owned_by === userID)
          .map(({ id, title, date, body, owned_by }) => {
            return (
              <EventCard
                handleDelete={handleDelete}
                key={id as Key}
                id={id}
                title={title}
                date={date}
                body={body}
                isOwned={userID === owned_by ? true : false}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ExploreEvents;
