import { NextResponse } from 'next/server';
import EventType from '@/types/EventType';
import { supabase } from '@/app/layout';

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
