import { NextRequest, NextResponse } from 'next/server';

// TODO: Integrate with Supabase
export async function GET(_request: NextRequest) {
  try {
    // Placeholder: In production, fetch from Supabase
    const meetings = [
      {
        id: '1',
        title: 'Acme Corp - Discovery Call',
        startTime: new Date(Date.now() - 86400000).toISOString(),
        status: 'completed',
        attendees: ['John Smith', 'Jane Doe'],
      },
      {
        id: '2',
        title: 'TechStart Inc - Demo',
        startTime: new Date(Date.now() + 86400000).toISOString(),
        status: 'scheduled',
        attendees: ['Bob Johnson'],
      },
    ];

    return NextResponse.json({ meetings });
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch meetings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, startTime, attendees, description } = await request.json();

    if (!title || !startTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Create meeting in Supabase
    const meeting = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      startTime,
      attendees: attendees || [],
      description: description || '',
      status: 'scheduled',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ meeting }, { status: 201 });
  } catch (error) {
    console.error('Error creating meeting:', error);
    return NextResponse.json(
      { error: 'Failed to create meeting' },
      { status: 500 }
    );
  }
}
