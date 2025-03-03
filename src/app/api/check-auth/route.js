import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const apiKey = cookies().get('api_key')?.value;

    if (!apiKey) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }

    // Verify API key is still valid
    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('value', apiKey)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check authorization' },
      { status: 500 }
    );
  }
} 