import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        // TODO: Update database with purchase info
        // Store session ID, customer email, plan type
        console.log('Payment successful:', session.id);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        // TODO: Update subscription status in database
        console.log('Subscription updated:', subscription.id);
        break;

      case 'invoice.paid':
        const invoice = event.data.object as Stripe.Invoice;
        // TODO: Handle paid invoices
        console.log('Invoice paid:', invoice.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 400 }
    );
  }
}
