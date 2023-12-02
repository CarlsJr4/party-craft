'use client';
import { EventContext } from '@/components/custom/DashboardWrapper';
import { Button } from '@/components/ui/button';
import EventType from '@/types/EventType';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database.types';
import PageHeading from '@/components/custom/PageHeading';
import PageSubHeading from '@/components/custom/PageSubHeading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import EventCardSkeleton from '@/components/custom/EventCardSkeleton';

const EventPage = ({ params }: { params: { id: string } }) => {
  // NOTE: This type is based off the profiles table
  type guestListType = {
    id: string | null; // Represents user uuid in DB
    email: string | null;
    role: string | null;
  };

  const { events } = useContext(EventContext);
  const [guestList, setGuestList] = useState<guestListType[]>([]);
  const [isSignedUp, toggleSignedUp] = useState(false);
  const [filteredEvent, setFilteredEvent] = useState<EventType | null>(
    {} as EventType
  );

  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const retrievedEvent =
      events?.filter(event => event.id === params.id)[0] || null;

    if (retrievedEvent) {
      setFilteredEvent(retrievedEvent);
    } else {
      setFilteredEvent(null);
    }

    async function fetchGuestList() {
      const { data: signupData, error: signupError } = await supabase
        .from('signups')
        .select()
        .eq('event_id', params.id);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const signupIdList: (string | null)[] = [];

      signupData?.forEach(item => signupIdList.push(item.user_id));

      if (user && !signupIdList.includes(user?.id)) {
        toggleSignedUp(false);
      } else {
        toggleSignedUp(true);
      }

      const { data, error } = await supabase
        .from('profiles')
        .select()
        .in('id', signupIdList);

      const retrievedGuests: guestListType[] = [];
      data?.forEach(profile => retrievedGuests.push(profile));
      setGuestList(retrievedGuests);
    }

    fetchGuestList();
  }, [events, params.id, supabase]);

  // notFound causes an error inside of useEffect so we call it here

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
      toggleSignedUp(true);
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
      toggleSignedUp(false);
    }
    return;
  }

  return (
    <div>
      {filteredEvent === null && (
        <>
          <PageHeading>Uh oh!</PageHeading>
          <PageSubHeading>
            This event does not exist or has been deleted.
          </PageSubHeading>
        </>
      )}
      {filteredEvent && Object.keys(filteredEvent).length === 0 && (
        <>
          <Skeleton className="h-4 w-[350px] ml-6 my-4" />
          <Skeleton className="h-4 w-[150px] ml-6 my-4" />
          <Skeleton className="h-[30px] w-[75px] rounded-full ml-6 my-4" />
          <Skeleton className="h-4 w-[250px] ml-6 my-4" />
          <Skeleton className="h-4 w-[50px] ml-6 my-4" />
        </>
      )}
      {filteredEvent && Object.keys(filteredEvent).length > 0 ? (
        <>
          <PageHeading>{filteredEvent.title}</PageHeading>
          <PageSubHeading>
            {format(new Date(filteredEvent.date), 'PPP')}
          </PageSubHeading>
          <div className="mt-1">
            {isSignedUp ? (
              <Button onClick={() => handleCancelSignup()}>
                Cancel sign-up
              </Button>
            ) : (
              <Button onClick={() => handleSignup()}>Sign up</Button>
            )}
          </div>

          <div className="my-7">
            <p>{filteredEvent.body}</p>
          </div>

          <h3 className="text-xl font-semibold">Who&apos;s going:</h3>

          <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
            {guestList.map(guest => (
              <Card key={guest.id} className="items-center">
                <CardHeader>
                  {' '}
                  <Avatar>
                    <AvatarImage
                      src={`https://picsum.photos/460/460?random=${guest.id}`}
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <p className="text-center">{guest?.role || 'Guest'}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};
export default EventPage;
