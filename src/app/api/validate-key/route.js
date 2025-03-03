import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { apiKey } = await request.json();

    // Check if API key exists in database
    const { data, error } = await supabase
      .from('api_keys')
      .select('id, value')
      .eq('value', apiKey)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Invalid API key' }, 
        { status: 401 }
      );
    }

    // Set a cookie to maintain the session
    cookies().set('api_key', apiKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 // 1 hour
    });

    return NextResponse.json({ 
      success: true,
      message: 'Valid API key'
    });
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate API key' },
      { status: 500 }
    );
  }
} 