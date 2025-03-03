import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// This is a mock database. Replace with your actual database implementation
let mockDb = [];

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json(
      { error: 'Failed to fetch API keys' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name, type, monthlyLimit } = await request.json();
    
    // Generate a unique API key
    const apiKeyValue = `tvly-${type === 'production' ? 'prod' : 'dev'}-${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;

    const { data, error } = await supabase
      .from('api_keys')
      .insert([
        {
          name,
          value: apiKeyValue,
          usage: 0,
          // created_at will be automatically set by Supabase
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    );
  }
} 