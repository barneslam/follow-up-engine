import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const {
      meetingTitle,
      attendees,
      transcript,
      objective,
    } = await request.json();

    if (!transcript) {
      return NextResponse.json(
        { error: 'Missing transcript' },
        { status: 400 }
      );
    }

    const prompt = `You are a sales follow-up expert. Generate comprehensive post-meeting follow-up materials based on the meeting transcript.

Meeting Title: ${meetingTitle || 'Sales Meeting'}
Objective: ${objective || 'General discussion'}
Attendees: ${attendees?.join(', ') || 'Not specified'}

Transcript:
${transcript}

Generate the following in JSON format:
{
  "thankYouEmail": "Professional thank-you message",
  "detailedFollowupEmail": "Detailed follow-up email with next steps",
  "whatsappSummary": "Concise WhatsApp-friendly summary (emoji allowed)",
  "actionItems": [
    { "item": "action", "owner": "person", "dueDate": "YYYY-MM-DD", "priority": "High/Medium/Low" }
  ],
  "internalManagerEmail": "Email for manager with business implications",
  "pipelineImpact": "Deal stage update and probability",
  "revenuePotential": "Estimated revenue if deal closes",
  "riskAssessment": "Key risks identified",
  "recommendedNextSteps": ["step 1", "step 2", "step 3"],
  "missingInformation": ["gap 1", "gap 2"]
}`;

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
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

    const followupData = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      meetingId: id,
      ...followupData,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Follow-up generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate follow-up materials' },
      { status: 500 }
    );
  }
}
