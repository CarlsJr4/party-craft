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
import PageSubHeading from '@/components/custom/PageSubHeading';
import EventCardSkeleton from '@/components/custom/EventCardSkeleton';

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
    if (events) {
      let filteredEvents = [...events];
      filteredEvents = filteredEvents.filter(event => event.id !== id);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PROJECT_URL}/api/events/${id}`,
        {
          method: 'DELETE',
          body: JSON.stringify(id),
        }
      );
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
    }
  };

  // Events initialized as []
  // Null means no events
  // Empty events means initial loading state
  // Filled events array means events were returned

  return (
    <div>
      <PageHeading>Explore</PageHeading>
      <PageSubHeading>Discover upcoming public events near you:</PageSubHeading>
      <CardGrid>
        {events?.length === 0 && (
          <>
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </>
        )}
        {errors ? (
          <div>
            <p>Uh oh!</p>
            <p>There was an issue retrieving your events.</p>
          </div>
        ) : (
          <>
            {events
              ?.filter(item => new Date() < new Date(item.date))
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
          </>
        )}
        {!events && <p>We could not find any upcoming events near you.</p>}
      </CardGrid>
    </div>
  );
};

export default ExploreEvents;
