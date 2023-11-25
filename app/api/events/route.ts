import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Database } from '@/types/database.types';
import EventType from '@/types/EventType';

function initSupabaseClient() {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
  return supabase;
}

// Grab API data
export async function GET(request: Request) {
  const path = request.url;
  // Depending on what the request URL is, we need to have filtering/RLS
  // Every route should call this GET request
  const supabase = initSupabaseClient();
  const { data, error } = await supabase.from('events').select('*');
  if (error) return NextResponse.error();
  return NextResponse.json(data, { status: 200 });
}

// Create new event data
export async function POST(request: Request) {
  const supabase = initSupabaseClient();
  const ownedByID = (await supabase.auth.getUser()).data.user?.id;
  const reqData: EventType = await request.json();
  const { data, error } = await supabase
    .from('events')
    .insert({ ...reqData, date: reqData.date.toString(), owned_by: ownedByID }) // Need to get current session ID
    .select();
  if (error) {
    return NextResponse.error();
  }
  return NextResponse.json(data, { status: 201 });
}
