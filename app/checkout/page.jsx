"use client";
import CheckoutForm from "./_component/CheckoutForm";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AlertSuccess from "../_component/global/alert_success";
import { useState, useEffect } from "react";

// تحميل المفتاح العام من Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_Publishable_key);

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  // جلب clientSecret من الخادم
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 5000, currency: "usd" }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching clientSecret:", error);
      }
    };

    fetchClientSecret();
  }, []);

  const options = {
    clientSecret,
    appearance: { theme: "stripe" }, // تخصيص المظهر (اختياري)
  };

  return (
    <div>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>Loading...</p> // عرض رسالة انتظار أثناء تحميل clientSecret
      )}
     
    </div>
  );
}
