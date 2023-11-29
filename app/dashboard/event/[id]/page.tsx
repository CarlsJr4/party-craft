'use client';
import { EventContext } from '@/components/custom/DashboardWrapper';
import { Button } from '@/components/ui/button';
import EventType from '@/types/EventType';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database.types';

const EventPage = ({ params }: { params: { id: string } }) => {
  type guestListType = {
    email: string | null;
    id: string;
    role: string | null;
  };

  const { events } = useContext(EventContext);
  const [guestList, setGuestList] = useState<guestListType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:3000/api/events/${params.id}`
      );
      if (response.status === 404) {
        setEventStatus(null);
      }
    }

    async function fetchGuestList() {
      const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data: signupData, error: signupError } = await supabase
        .from('signups')
        .select()
        .eq('event_id', params.id);

      const signupIdList: (string | null)[] = [];

      signupData?.forEach(item => signupIdList.push(item.user_id));

      const { data, error } = await supabase
        .from('profiles')
        .select()
        .in('id', signupIdList);

      const retrievedGuests: guestListType[] = [];
      data?.forEach(profile => retrievedGuests.push(profile));
      setGuestList(retrievedGuests);
    }

    fetchGuestList();
    fetchData();
  }, [params.id]);
  const [eventStatus, setEventStatus] = useState<EventType[] | null>([]);

  // notFound causes an error inside of useEffect so we call it here
  if (eventStatus === null) {
    notFound();
  }

  let filteredEvent: EventType = events.filter(
    event => event.id === params.id
  )[0];

  return (
    <div>
      {filteredEvent ? (
        <>
          <h1>{filteredEvent.title}</h1>
          <p>{format(new Date(filteredEvent.date), 'PPP')}</p>
          <Button>Sign up</Button>
          <p>{filteredEvent.body}</p>
          <p>Guest list:</p>
          {guestList.map(guest => (
            <p key={guest.id}>{guest.role}</p>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default EventPage;
