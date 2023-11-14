'use client';
import { EventContext } from '@/components/custom/DashboardWrapper';
import { format } from 'date-fns';
import React, { useContext } from 'react';

const EventPage = ({ params }: { params: { id: string } }) => {
  const { events } = useContext(EventContext);
  let filteredEvent = events.filter(event => event.id === parseInt(params.id));
  return (
    <div>
      <h1>{filteredEvent[0].title}</h1>
      <p>{format(filteredEvent[0].date, 'PPP')}</p>
      <p>{filteredEvent[0].body}</p>
    </div>
  );
};
export default EventPage;
