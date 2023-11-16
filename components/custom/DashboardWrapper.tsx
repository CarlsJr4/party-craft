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
    fetch('http://localhost:3000/api/events')
      .then(res => res.json())
      .then((res: EventType[]) => setEvents(res))
      .catch(err => setErrors(err));
  }, []);
  const [errors, setErrors] = useState(null);
  const [events, setEvents] = useState<EventType[]>([] as EventType[]);
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
