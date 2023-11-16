import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { Database } from '@/database.types';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Grab API data
export async function GET() {
  const { data, error } = await supabase.from('events').select('*');
  if (error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  return NextResponse.json(data, { status: 200 });
}

// Create new event data
export async function POST() {}