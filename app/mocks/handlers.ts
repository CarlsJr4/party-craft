import { HttpResponse, http } from 'msw';

// Mock Data
export const events = [
  {
    id: '85f4da4c-d0d0-4064-bf42-790b81ee127c',
    title: 'Ice skating with friends',
    date: new Date('Sun Nov 09 2023 00:00:00 GMT-0800'),
    body: 'Visit the ice rink and skate with friends.',
  },
  {
    id: 'b2849867-2510-4177-a35c-34170d8f8eb8',
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

  http.get(`http://localhost:3000/api/events/${events[0].id}`, () => {
    return HttpResponse.json(events[0], { status: 200 });
  }),
  http.delete(`http://localhost:3000/api/events/${events[0].id}`, () => {
    return new Response(null, { status: 204 });
  }),
  http.post('http://localhost:3000/api/events', () => {
    return HttpResponse.json(events[0], { status: 201 });
  }),
];

// Define an error route

// Define a route that returns nothing
