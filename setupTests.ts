import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '@/app/mocks/server';
import 'dotenv/config';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
