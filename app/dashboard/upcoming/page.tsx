'use client';
import React, { Key, useEffect, useState } from 'react';
import EventCard from '@/components/custom/Eventcard';

type EventType = {
  id: Number;
  title: String;
  date: String;
  body: String;
};

// This component will retrieve events and render them on the screen
const UpcomingEvents = () => {
  useEffect(() => {
    fetch('http://localhost:3000/api/upcomingevents')
      .then(res => res.json())
      .then((res: EventType[]) => setEvents(res));
  }, []);

  const [events, setEvents] = useState<EventType[]>([] as EventType[]);
  return (
    <div>
      <h1>Your Upcoming Events:</h1>
      <div className="grid grid-cols-4 mt-5 gap-8">
        {events.length === 0 ? <p>You have no upcoming events</p> : ''}
        {events.map(({ id, title, date, body }) => {
          return (
            <EventCard key={id as Key} title={title} date={date} body={body} />
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingEvents;
