'use client';
import React, { Key, useContext, useEffect, useState } from 'react';
import EventCard from '@/components/custom/eventcard';
import { useToast } from '@/components/ui/use-toast';
import {
  EventContext,
  EventErrorContext,
} from '@/components/custom/DashboardWrapper';
import { createBrowserClient } from '@supabase/ssr';
import CardGrid from '@/components/custom/CardGrid';
import PageHeading from '@/components/custom/PageHeading';

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
      <PageHeading>Explore</PageHeading>
      <p className="text-muted-foreground mt-2">
        Discover upcoming public events near you:
      </p>
      <CardGrid>
        {errors && (
          <div>
            <p>Uh oh!</p>
            <p>There was an issue retrieving your events.</p>
          </div>
        )}
        {events.length === 0 && !errors ? (
          <p>We could not find any upcoming events near you.</p>
        ) : (
          ''
        )}
        {events
          .filter(item => new Date() < new Date(item.date))
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
      </CardGrid>
    </div>
  );
};

export default ExploreEvents;
