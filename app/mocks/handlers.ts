import { HttpResponse, http } from 'msw';

// Mock Data
export const events = [
  {
    id: 1,
    title: 'Ice skating with friends',
    date: new Date('Sun Nov 12 2023 00:00:00 GMT-0800').toDateString(),
    body: 'Visit the ice rink and skate with friends.',
  },
  {
    id: 2,
    title: 'Hiking with friends',
    date: new Date('Sun Nov 13 2023 00:00:00 GMT-0800').toDateString(),
    body: 'Hike up the mountains with your friends.',
  },
];

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
  http.get('http://localhost:3000/api/upcomingevents', () => {
    return HttpResponse.json(events, { status: 200 });
  }),
];