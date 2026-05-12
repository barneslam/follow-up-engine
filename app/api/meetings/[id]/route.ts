import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // TODO: Fetch from Supabase
    const meeting = {
      id,
      title: 'Sample Meeting',
      startTime: new Date().toISOString(),
      status: 'scheduled',
      attendees: [],
      description: '',
    };

    return NextResponse.json({ meeting });
  } catch (error) {
    console.error('Error fetching meeting:', error);
    return NextResponse.json(
      { error: 'Meeting not found' },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, status, attendees, description } = await request.json();

    // TODO: Update meeting in Supabase
    const meeting = {
      id,
      title: title || 'Sample Meeting',
      status: status || 'scheduled',
      attendees: attendees || [],
      description: description || '',
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ meeting });
  } catch (error) {
    console.error('Error updating meeting:', error);
    return NextResponse.json(
      { error: 'Failed to update meeting' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // TODO: Delete meeting from Supabase
    return NextResponse.json({ deleted: true, id });
  } catch (error) {
    console.error('Error deleting meeting:', error);
    return NextResponse.json(
      { error: 'Failed to delete meeting' },
      { status: 500 }
    );
  }
}
