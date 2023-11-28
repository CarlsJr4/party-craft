'use client';
import { EventContext } from '@/components/custom/DashboardWrapper';
import { Button } from '@/components/ui/button';
import EventType from '@/types/EventType';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

const EventPage = ({ params }: { params: { id: string } }) => {
  const { events } = useContext(EventContext);
  useEffect(() => {
    fetch(`http://localhost:3000/api/events/${params.id}`).then(res => {
      if (res.status === 404) {
        setEventStatus(null);
      }
    });
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default EventPage;
