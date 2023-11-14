'use client';
import { EventContext } from '@/components/custom/DashboardWrapper';
import EventType from '@/types/EventType';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

const EventPage = ({ params }: { params: { id: string } }) => {
  const { events } = useContext(EventContext);
  useEffect(() => {
    fetch(`http://localhost:3000/api/upcomingevents/${params.id}`).then(res => {
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

  let filteredEvent: EventType[] = events.filter(
    event => event.id === parseInt(params.id)
  );

  return (
    <div>
      <h1>{filteredEvent[0] && filteredEvent[0].title}</h1>
      <p>
        {filteredEvent[0] && format(new Date(filteredEvent[0].date), 'PPP')}
      </p>
      <p>{filteredEvent[0] && filteredEvent[0].body}</p>
      <p>Guest list:</p>
    </div>
  );
};
export default EventPage;
