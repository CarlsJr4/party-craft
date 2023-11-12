'use client';
import React, { Key, useEffect, useState } from 'react';
import EventCard from '@/components/custom/Eventcard';

type EventType = {
  id: Key;
  title: String;
  date: String;
  body: String;
  key: Key;
};

// This component will retrieve events and render them on the screen
const UpcomingEvents = () => {
  useEffect(() => {
    fetch('http://localhost:3000/api/upcomingevents')
      .then(res => res.json())
      .then((res: EventType[]) => setEvents(res))
      .catch(err => setErrors(err));
  }, []);

  const [events, setEvents] = useState<EventType[]>([] as EventType[]);
  const [errors, setErrors] = useState(null);

  const handleDelete = (id: Key) => {
    let filteredEvents = [...events];
    filteredEvents = filteredEvents.filter(event => event.id !== id);
    setEvents(filteredEvents);
  };

  return (
    <div>
      <h1>Your Upcoming Events:</h1>
      <div className="grid grid-cols-4 mt-5 gap-8">
        {errors && (
          <div>
            <p>Uh oh!</p>
            <p>There was an issue retrieving your events.</p>
          </div>
        )}
        {events.length === 0 && !errors ? (
          <p>You have no upcoming events</p>
        ) : (
          ''
        )}
        {events.map(({ id, title, date, body }) => {
          return (
            <EventCard
              handleDelete={handleDelete}
              key={id as Key}
              id={id}
              title={title}
              date={date}
              body={body}
            />
          );
        })}
        {/* <EventCard
          handleDelete={handleDelete}
          id={32}
          key={32}
          title="Test event"
          date="01/01/2000
          body="Test Body"
        /> */}
      </div>
    </div>
  );
};

export default UpcomingEvents;
