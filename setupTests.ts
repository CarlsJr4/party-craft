import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '@/app/mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

server.events.on('request:start', ({ request }) => {
  console.log('MSW Intercepted:', request.method, request.url);
});
