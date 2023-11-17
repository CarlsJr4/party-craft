import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { Database } from '@/types/database.types';
import EventType from '@/types/EventType';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_LOCAL_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_LOCAL_SUPABASE_ANON_KEY!
);

// Grab API data
export async function GET() {
  const { data, error } = await supabase.from('events').select('*');
  if (error) return NextResponse.error();
  return NextResponse.json(data, { status: 200 });
}

// Create new event data
export async function POST(request: Request) {
  const reqData: EventType = await request.json();
  const { data, error } = await supabase
    .from('events')
    .insert({ ...reqData, date: reqData.date.toString() })
    .select();
  if (error) {
    return NextResponse.error();
  }
  return NextResponse.json(data, { status: 201 });
}
