"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

interface PayPalProviderProps {
  children: React.ReactNode;
}

export function PayPalProvider({ children }: PayPalProviderProps) {
  // Replace with your actual PayPal client ID
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test";

  return (
    <PayPalScriptProvider
      options={{
        clientId: clientId,
        currency: "USD",
        intent: "capture",
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}
