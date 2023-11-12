'use client';
import React, { Key, useEffect, useState } from 'react';
import EventCard from '@/components/custom/Eventcard';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

type EventType = {
  id: Key;
  title: string;
  date: Date;
  body: string;
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

  const [events, setEvents] = useState<EventType[]>([
    {
      id: 1,
      title: 'Ice skating with friends',
      date: new Date('Sun Nov 12 2023 00:00:00 GMT-0800'),
      body: 'Visit the ice rink and skate with friends.',
    },
    {
      id: 2,
      title: 'Hiking with friends',
      date: new Date('Sun Nov 13 2023 00:00:00 GMT-0800'),
      body: 'Hike up the mountains with your friends.',
    },
  ] as EventType[]);
  const [errors, setErrors] = useState(null);
  const { toast } = useToast();

  const handleDelete = (id: Key) => {
    let filteredEvents = [...events];
    filteredEvents = filteredEvents.filter(event => event.id !== id);
    setEvents(filteredEvents);
    toast({
      description: 'Event deleted.',
    });
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
      </div>
      <Toaster />
    </div>
  );
};

export default UpcomingEvents;
