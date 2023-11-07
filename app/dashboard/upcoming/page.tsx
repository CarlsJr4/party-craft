import React from 'react';
import EventCard from '@/components/ui/eventcard';

const page = () => {
  return (
    <div>
      <h1>Upcoming Events</h1>
      <div className="grid grid-cols-4 mt-5 gap-8">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};

export default page;
