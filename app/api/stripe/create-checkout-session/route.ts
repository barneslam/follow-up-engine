import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { priceId, mode } = await request.json();

    if (!priceId || !mode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // In a real implementation, you would use actual Stripe price IDs
    // For now, we'll create the session with placeholder values
    const session = await stripe.checkout.sessions.create({
      mode: mode as 'payment' | 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      billing_address_collection: 'auto',
      phone_number_collection: {
        enabled: false,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
