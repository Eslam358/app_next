import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json(); // قراءة البيانات من الطلب
    const { amount, currency } = body;

    // إنشاء PaymentIntent باستخدام Stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
