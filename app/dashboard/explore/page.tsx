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
    <div>
      <PageHeading>Explore</PageHeading>
      <PageSubHeading>Discover upcoming public events near you!</PageSubHeading>
      <div className="col-span-full flex w-full flex-col gap-8">
        <CardGrid>
          {isLoading && (
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
            upcomingEvents?.map(({ id, title, date, body, owned_by }) => (
              <EventCard
                handleDelete={handleDelete}
                key={id as Key}
                id={id}
                title={title}
                date={date}
                body={body}
                isOwned={userID === owned_by}
                isPast={false}
              />
            ))
          )}

          {!isLoading && !errors && upcomingEvents?.length === 0 && (
            <p>We could not find any upcoming events near you.</p>
          )}
        </CardGrid>

        {!errors && pastEvents && pastEvents.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-semibold">Past events</h2>
            <CardGrid>
              {pastEvents.map(({ id, title, date, body }) => (
                <div
                  key={id as Key}
                  className="pointer-events-none opacity-50 grayscale select-none"
                  aria-disabled="true"
                  inert
                >
                  <EventCard
                    handleDelete={handleDelete}
                    id={id}
                    title={title}
                    date={date}
                    body={body}
                    isOwned={false}
                    isPast={true}
                  />
                </div>
              ))}
            </CardGrid>
          </section>
        )}
      </div>
    </div>
  );
};

export default ExploreEvents;
