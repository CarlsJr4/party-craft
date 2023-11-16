import { HttpResponse, http } from 'msw';
import { format } from 'date-fns';

// Mock Data
export const events = [
  {
    id: 1,
    title: 'Ice skating with friends',
    date: new Date('Sun Nov 09 2023 00:00:00 GMT-0800'),
    body: 'Visit the ice rink and skate with friends.',
  },
  {
    id: 2,
    title: 'Hiking with friends',
    date: new Date('Sun Nov 08 2023 00:00:00 GMT-0800'),
    body: 'Hike up the mountains with your friends.',
  },
];

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
  http.get('http://localhost:3000/api/events', () => {
    return HttpResponse.json(events, { status: 200 });
  }),

  http.get('http://localhost:3000/api/events/1', () => {
    return HttpResponse.json(events[0], { status: 200 });
  }),
];

// Define an error route

// Define a route that returns nothing
