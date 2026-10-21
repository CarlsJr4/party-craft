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
  const { events, setEvents, isLoading } = useContext(EventContext);
  const errors = useContext(EventErrorContext);
  const [userID, setUserID] = useState<string | undefined>('');

  useEffect(() => {
    async function getUserID() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
        `${process.env.NEXT_PUBLIC_CUSTOM_PROJECT_URL}/api/events/${id}`,
        {
          method: 'DELETE',
          body: JSON.stringify(id),
        },
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

  // For preventing events happening today from being hidden
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const upcomingEvents = events?.filter(
    item =>
      item.owned_by !== userID &&
      item.date &&
      new Date(item.date) >= startOfToday,
  );

  const pastEvents = events?.filter(
    item =>
      item.owned_by !== userID &&
      item.date &&
      new Date(item.date) < startOfToday,
  );

  return (
    <div className="flex flex-col gap-10">
      <section>
        <PageHeading>Explore</PageHeading>
        <PageSubHeading>Public events will show up here!</PageSubHeading>
        {errors ? (
          <div>
            <p>Uh oh!</p>
            <p>There was an issue retrieving your events.</p>
          </div>
        ) : (
          <CardGrid>
            {isLoading && (
              <>
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
              </>
            )}
            {upcomingEvents?.map(({ id, title, date, body }) => (
              <EventCard
                handleDelete={handleDelete}
                key={id as Key}
                id={id}
                title={title}
                date={date}
                body={body}
                isOwned={false}
                isPast={false}
              />
            ))}
            {!isLoading && upcomingEvents?.length === 0 && (
              <p>We could not find any upcoming events near you.</p>
            )}
          </CardGrid>
        )}
      </section>

      {!errors && pastEvents && pastEvents.length > 0 && (
        <section className="border-t pt-10">
          <PageHeading>Past Events</PageHeading>
          <CardGrid>
            {pastEvents.map(({ id, title, date, body }) => (
              <div key={id as Key}>
                <EventCard
                  handleDelete={handleDelete}
                  id={id}
                  title={title}
                  date={date}
                  body={body}
                  isOwned={false}
                  isPast
                />
              </div>
            ))}
          </CardGrid>
        </section>
      )}
    </div>
  );
};

export default ExploreEvents;
