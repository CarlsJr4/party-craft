import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '@/app/mocks/server';
import 'dotenv/config';

beforeAll(() => {
  // Mocks next/navigation to fix mounting errors when using useRouter()
  vi.mock('next/navigation', () => {
    const actual = vi.importActual('next/navigation');
    return {
      ...actual,
      useRouter: vi.fn(() => ({
        push: vi.fn(),
      })),
      useSearchParams: vi.fn(() => ({
        get: vi.fn(),
      })),
      usePathname: vi.fn(),
    };
  });
  server.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
