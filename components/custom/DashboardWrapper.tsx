'use client';
import EventType from '@/types/EventType';
import React, { createContext, useEffect, useState } from 'react';
const EventContext = createContext({} as EventContextType);
const EventErrorContext = createContext(null);

type EventContextType = {
  events: EventType[] | null;
  setEvents: React.Dispatch<React.SetStateAction<EventType[] | null>>;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CUSTOM_PROJECT_URL}/api/events`)
      .then(res => res.json())
      .then((res: EventType[] | null) => {
        setEvents(res);
      })
      .catch(err => {
        setErrors(err);
      })
      .finally(() => setLoading(false));
  }, []);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [events, setEvents] = useState<EventType[] | null>([] as EventType[]);
  return (
    <EventContext.Provider value={{ events, setEvents, isLoading, setLoading }}>
      <EventErrorContext.Provider value={errors}>
        {children}
      </EventErrorContext.Provider>
    </EventContext.Provider>
  );
};

export default DashboardWrapper;

export { EventContext, EventErrorContext };
