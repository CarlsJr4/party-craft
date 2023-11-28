import { HttpResponse, http } from 'msw';

const ownedByID = '4125d73b-4278-4e2c-aba3-053fa6ce45ef';
const notOwnedByID = 'e4c43ee5-e0f7-5fc8-b709-1ce13e073575';

// Mock Data
export const events = [
  // Ice skating with friends is an 'owned' event, and will always be in the future.
  // The rest of the events aren't owned, and could be in the past or the future.
  // IMPORTANT: Keep ice skating with friends owned and in the future.
  // Ice skating with friends is the subject of multiple tests
  {
    id: '85f4da4c-d0d0-4064-bf42-790b81ee127c',
    title: 'Ice skating with friends',
    date: new Date('Sun Nov 09 2099 00:00:00 GMT-0800').toISOString(),
    body: 'Visit the ice rink and skate with friends.',
    owned_by: ownedByID,
  },
  {
    id: 'b2849867-2510-4177-a35c-34170d8f8eb8',
    title: 'Hiking with friends',
    date: new Date('Sun Nov 08 2099 00:00:00 GMT-0800').toISOString(),
    body: 'Hike up the mountains with your friends.',
    owned_by: notOwnedByID,
  },
  {
    id: 'f8sf7ss87-3232-1123-a35c-34170d8f8eb8',
    title: 'Go to the iPhone introduction reveal',
    date: new Date('Fri Jun 27 2007 00:00:00 GMT-0800').toISOString(),
    body: 'Watch the iPhone get revealed to the public',
    owned_by: notOwnedByID,
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
  http.put(`http://localhost:3000/api/events/${events[0].id}`, () => {
    return HttpResponse.json(events[0], { status: 201 });
  }),
  http.post('http://localhost:3000/api/events', () => {
    return HttpResponse.json(events[0], { status: 201 });
  }),
];

// Define an error route

// Define a route that returns nothing
