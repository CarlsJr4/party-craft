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

const ExploreEvents = () => {
  const { toast } = useToast();
  const { events, setEvents } = useContext(EventContext);
  const errors = useContext(EventErrorContext);
  const [userID, setUserID] = useState<string | undefined>('');
  const [signedUpEventIDs, setSignedUpEventIds] = useState<(string | null)[]>(
    []
  );

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
  }, []);

  useEffect(() => {
    async function getSignedUpEvents() {
      const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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

  return (
    <div>
      <PageHeading>Your events</PageHeading>
      <PageSubHeading>
        Events you&apos;ve been invited to, saved, and created will show up
        here:
      </PageSubHeading>
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
              ?.filter(
                ({ owned_by, id }) =>
                  owned_by === userID || signedUpEventIDs.includes(id)
              )
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
      </CardGrid>
    </div>
  );
};

export default ExploreEvents;
