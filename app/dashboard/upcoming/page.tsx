'use client';
import React, { Key, useContext, useEffect, useState } from 'react';
import EventCard from '@/components/custom/EventCard';
import { useToast } from '@/components/ui/use-toast';
import {
  EventContext,
  EventErrorContext,
} from '@/components/custom/DashboardWrapper';

const UpcomingEvents = () => {
  const { toast } = useToast();
  const { events, setEvents } = useContext(EventContext);
  const errors = useContext(EventErrorContext);

  const handleDelete = async (id: Key) => {
    let filteredEvents = [...events];
    filteredEvents = filteredEvents.filter(event => event.id !== id);
    const response = await fetch(`http://localhost:3000/api/events/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(id),
    });
    if (response.status === 204) {
      setEvents(filteredEvents);
      toast({
        description: 'Event deleted.',
      });
    } else {
      toast({
        title: 'Uh oh!',
        description:
          'There was an issue deleting your event. Try again in a few seconds.',
      });
    }
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
        {events
          .filter(item => new Date() < new Date(item.date))
          .map(({ id, title, date, body }) => {
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
    </div>
  );
};

export default UpcomingEvents;
