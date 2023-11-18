import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { Database } from '@/types/database.types';
import { Key } from 'react';
import { NextResponse } from 'next/server';
import EventType from '@/types/EventType';
import { cookies } from 'next/headers';

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

// Edit an event with ID
export async function PUT(request: Request) {
  const supabase = initSupabaseClient();
  const reqData: EventType = await request.json();
  // Need to get event using ID
  const { data, error } = await supabase
    .from('events')
    .update({
      title: reqData.title,
      body: reqData.body,
      date: reqData.date.toString(),
    })
    .eq('id', reqData.id)
    .select();
  if (error) return NextResponse.error();
  return NextResponse.json(data, { status: 201 });
}

// Delete an event with ID
export async function DELETE(request: Request) {
  const supabase = initSupabaseClient();
  const reqData: Key = await request.json();
  const { data, error } = await supabase
    .from('events')
    .delete()
    .eq('id', reqData);
  if (error) return NextResponse.error();
  return new Response(null, { status: 204 }); // We use new Response instead of NextResponse because NextResponse causes a TypeError in the console
}
