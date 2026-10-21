'use client';
import React, { Key, useContext, useEffect, useState } from 'react';
import EventCard from '@/components/custom/eventcard';
import { useToast } from '@/components/ui/use-toast';
import {
  EventContext,
  EventErrorContext,
} from '@/components/custom/DashboardWrapper';
import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database.types';
import CardGrid from '@/components/custom/CardGrid';
import PageHeading from '@/components/custom/PageHeading';
import PageSubHeading from '@/components/custom/PageSubHeading';
import EventCardSkeleton from '@/components/custom/EventCardSkeleton';
import { Separator } from '@/components/ui/separator';

const ExploreEvents = () => {
  const { toast } = useToast();
  const { events, setEvents, isLoading } = useContext(EventContext);
  const errors = useContext(EventErrorContext);
  const [userID, setUserID] = useState<string | undefined>('');
  const [signedUpEventIDs, setSignedUpEventIds] = useState<(string | null)[]>(
    [],
  );

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
  }, []);

  useEffect(() => {
    async function getSignedUpEvents() {
      const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      if (userID) {
        const { data, error } = await supabase
          .from('signups')
          .select()
          .eq('user_id', userID);

        const signups: (string | null)[] = [];
        data?.forEach(signup => signups.push(signup.event_id));
        setSignedUpEventIds(signups);
      }
    }
    getSignedUpEvents();
  }, [userID]);

  // For preventing events happening today from being hidden
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const isPastEvent = (date: Date | string | null) =>
    !!date && new Date(date) < startOfToday;

  // Everything relevant to this user: events they own or signed up for
  const myEvents = events?.filter(
    ({ owned_by, id, date }) =>
      date && (owned_by === userID || signedUpEventIDs.includes(id)),
  );

  const ownedEvents = myEvents?.filter(
    ({ owned_by, date }) => owned_by === userID && !isPastEvent(date),
  );
  const upcomingEvents = myEvents?.filter(
    ({ owned_by, date }) => owned_by !== userID && !isPastEvent(date),
  );
  const pastEvents = myEvents?.filter(({ date }) => isPastEvent(date));

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

  return (
    <div className="flex flex-col gap-8">
      {errors ? (
        <div>
          <p>Uh oh!</p>
          <p>There was an issue retrieving your events.</p>
        </div>
      ) : (
        <>
          <section>
            <PageHeading>My Events</PageHeading>
            <PageSubHeading>Events you own will show up here!</PageSubHeading>
            <CardGrid>
              {isLoading && (
                <>
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                </>
              )}
              {ownedEvents?.map(({ id, title, date, body }) => (
                <EventCard
                  handleDelete={handleDelete}
                  key={id as Key}
                  id={id}
                  title={title}
                  date={date}
                  body={body}
                  isOwned
                />
              ))}
              {!isLoading && ownedEvents?.length === 0 && (
                <p>Click the create button to get started.</p>
              )}
            </CardGrid>
          </section>

          <Separator className="my-5" />

          <section>
            <PageHeading>Upcoming Events</PageHeading>
            <PageSubHeading>
              Events you are invited to will show up here!
            </PageSubHeading>
            <CardGrid>
              {upcomingEvents?.map(({ id, title, date, body }) => (
                <EventCard
                  handleDelete={handleDelete}
                  key={id as Key}
                  id={id}
                  title={title}
                  date={date}
                  body={body}
                  isOwned={false}
                />
              ))}
              {!isLoading && upcomingEvents?.length === 0 && (
                <p>You haven&apos;t signed up for any upcoming events.</p>
              )}
            </CardGrid>
          </section>

          <Separator className="my-5" />

          {pastEvents && pastEvents.length > 0 && (
            <section>
              <PageHeading>Past Events</PageHeading>
              <CardGrid>
                {pastEvents.map(({ id, title, date, body, owned_by }) => (
                  <div key={id as Key}>
                    <EventCard
                      handleDelete={handleDelete}
                      id={id}
                      title={title}
                      date={date}
                      body={body}
                      isOwned={userID === owned_by}
                      isPast
                    />
                  </div>
                ))}
              </CardGrid>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default ExploreEvents;
