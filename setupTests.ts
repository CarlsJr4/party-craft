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
  // We need to mock this module because there is no user auth in the unit tests
  // This means that no edit or delete buttons will show up and the unit tests break
  vi.mock('@supabase/ssr', () => {
    const createBrowserClient = vi.fn().mockImplementation(() => {
      const mockAuth = {
        from: vi.fn(() => ({
          select: vi.fn(() => ({
            eq: vi.fn().mockResolvedValue({}),
            in: vi.fn().mockResolvedValue({}),
          })),
        })),
        auth: {
          getUser: vi.fn().mockResolvedValue({
            data: {
              user: {
                id: '4125d73b-4278-4e2c-aba3-053fa6ce45ef', // This is the owned_by value of the Ice Skating with Friends mock event
              },
            },
          }),
        },
      };
      return mockAuth;
    });
    return { createBrowserClient };
  });
  server.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
