import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';
import { Key } from 'react';
import { NextResponse } from 'next/server';
import EventType from '@/types/EventType';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Edit an event with ID
export async function PUT(request: Request) {
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
  const reqData: Key = await request.json();
  const { data, error } = await supabase
    .from('events')
    .delete()
    .eq('id', reqData);
  if (error) return NextResponse.error();
  return new Response(null, { status: 204 }); // We use new Response instead of NextResponse because NextResponse causes a TypeError in the console
}
