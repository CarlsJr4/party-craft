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
  // NOTE: This type is based off the profiles table
  type guestListType = {
    id: string | null; // Represents user uuid in DB
    email: string | null;
    role: string | null;
  };

  const { events } = useContext(EventContext);
  const [guestList, setGuestList] = useState<guestListType[]>([]);

  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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
  }, [params.id, supabase]);
  const [eventStatus, setEventStatus] = useState<EventType[] | null>([]);

  // notFound causes an error inside of useEffect so we call it here
  if (eventStatus === null) {
    notFound();
  }

  async function handleSignup() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    try {
      const { data: guestData, error: guestDataError } = await supabase
        .from('signups')
        .insert({ event_id: params.id, user_id: user?.id })
        .select();
      if (guestDataError) {
        throw new Error();
      }
      const { data: guestProfileData, error: guestProfileError } =
        await supabase
          .from('profiles')
          .select()
          .eq('id', guestData[0].user_id!);
      const newGuestList = [...guestList];
      if (guestProfileData !== null) {
        const { email, id, role } = guestProfileData[0];
        newGuestList.push({ email: email, id: id, role: role });
        setGuestList(newGuestList);
      }
    } catch {
      console.log('foo');
    }
    return;
  }

  async function handleCancelSignup() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    // TODO: Add delete RLS to signup table
    if (user) {
      const { error } = await supabase
        .from('signups')
        .delete()
        .eq('event_id', params.id)
        .eq('user_id', user?.id);
      const updatedGuests = guestList.filter(guest => guest.id !== user?.id);
      setGuestList(updatedGuests);
    }
    return;
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
          <Button onClick={() => handleSignup()}>Sign up</Button>
          <Button onClick={() => handleCancelSignup()}>Cancel sign-up</Button>
          <p>{filteredEvent.body}</p>
          <p>Guest list:</p>
          {guestList.map(guest => (
            <p key={guest.id}>{guest.email}</p>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default EventPage;
