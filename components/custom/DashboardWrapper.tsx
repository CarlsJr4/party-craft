'use client';
import EventType from '@/types/EventType';
import React, { createContext, useEffect, useState } from 'react';
const EventContext = createContext({} as EventContextType);
const EventErrorContext = createContext(null);

type EventContextType = {
  events: EventType[];
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    fetch('http://localhost:3000/api/upcomingevents')
      .then(res => res.json())
      .then((res: EventType[]) => setEvents(res))
      .catch(err => setErrors(err));
  }, []);
  const [errors, setErrors] = useState(null);
  const [events, setEvents] = useState<EventType[]>([
    {
      id: 1,
      title: 'Ice skating with friends',
      date: new Date('Th Nov 09 2023 00:00:00 GMT-0800'),
      body: 'Visit the ice rink and skate with friends.',
    },
    {
      id: 2,
      title: 'Hiking with friends',
      date: new Date('Sun Nov 08 2023 00:00:00 GMT-0800'),
      body: 'Hike up the mountains with your friends.',
    },
  ] as EventType[]);
  return (
    <EventContext.Provider value={{ events, setEvents }}>
      <EventErrorContext.Provider value={errors}>
        {children}
      </EventErrorContext.Provider>
    </EventContext.Provider>
  );
};

export default DashboardWrapper;

export { EventContext, EventErrorContext };
