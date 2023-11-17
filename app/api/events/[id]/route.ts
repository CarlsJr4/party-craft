import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';
import { Key } from 'react';
import { NextResponse } from 'next/server';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_LOCAL_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_LOCAL_SUPABASE_ANON_KEY!
);

// Edit an event with ID
export async function POST() {}

// Delete an event with ID
export async function DELETE(request: Request) {
  const reqData: Key = await request.json();
  const { data, error } = await supabase
    .from('events')
    .delete()
    .eq('id', reqData);
  if (error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
      },
      { status: 500 }
    );
  return new Response(null, { status: 204 });
}
