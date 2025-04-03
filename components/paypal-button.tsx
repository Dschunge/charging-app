"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useState } from "react";

interface PayPalButtonProps {
  amount: string;
}

export function PayPalButton({ amount }: PayPalButtonProps) {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const createOrder = async () => {
    try {
      // Call our backend API to create a PayPal order
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
        }),
      });

      const data = await response.json();
      console.log({ data });

      if (!response.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      return data.jsonResponse.id;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      throw error;
    }
  };

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const onApprove = async (data: any) => {
    console.log({ data });
    try {
      // Call our backend API to capture the payment
      const response = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderID: data.orderID }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to capture payment");
      }

      console.log("Payment captured:", result);
      setPaymentStatus("Payment successful! Your golf cart is now charging.");
      const res = await fetch("/api/homeassistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          webhookID: "-HHuZ1QQhsCD-q4UIwLNnwT3t",
        }),
      });
      console.log({ res });
    } catch (error) {
      console.error("Error capturing PayPal payment:", error);
      setPaymentStatus("Payment failed. Please try again.");
      throw error;
    }
  };

  return (
    <div className="w-full">
      <PayPalButtons
        style={{ layout: "vertical", shape: "rect" }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={() => setPaymentStatus("Payment failed. Please try again.")}
      />
      {paymentStatus && (
        <div
          className={`mt-4 p-2 text-center rounded ${
            paymentStatus.includes("successful")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {paymentStatus}
        </div>
      )}
    </div>
  );
}
