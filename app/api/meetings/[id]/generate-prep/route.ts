import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { objective, documents, customComments } = await request.json();

    if (!objective) {
      return NextResponse.json(
        { error: 'Missing objective' },
        { status: 400 }
      );
    }

    const docContext = documents?.length
      ? `\n\nDocuments provided:\n${documents.join('\n')}`
      : '';

    const prompt = `You are a sales meeting preparation expert. Generate comprehensive pre-meeting preparation materials.

Meeting objective: ${objective}
${customComments ? `Additional context: ${customComments}` : ''}${docContext}

Generate the following in JSON format:
{
  "agenda": "Brief 5-point meeting agenda",
  "agendaEmail": "Email draft to send before meeting",
  "questions": ["question 1", "question 2", "question 3", "question 4", "question 5"],
  "internalBrief": "Internal brief for your team",
  "risks": "Key risks and mitigation strategies"
}`;

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    // Extract JSON from response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse response as JSON');
    }

    const prepData = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      meetingId: id,
      ...prepData,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Prep generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate prep materials' },
      { status: 500 }
    );
  }
}
