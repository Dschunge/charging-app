"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { PayPalButton } from "./paypal-button";

const AMOUNT = "10.00"; // Default charging amount in USD

export function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const paymentMethods = [
    {
      id: "paypal",
      name: "PayPal",
      icon: "💳",
      available: true,
    },
    {
      id: "stripe",
      name: "Stripe",
      icon: "💰",
      available: false,
    },
    {
      id: "google-apple",
      name: "Google/Apple Pay",
      icon: "📱",
      available: false,
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Charging Information</CardTitle>
          <CardDescription>
            Please select a payment method to charge your golf cart
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="font-medium">Amount: ${AMOUNT} USD</p>
            <p>Charging time: 1 hours</p>
            <p>Location: Charging Station #1</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Select Payment Method</h2>
        <div className="grid grid-cols-1 gap-3">
          {paymentMethods.map((method) => (
            <Button
              key={method.id}
              variant={selectedMethod === method.id ? "default" : "outline"}
              className={`h-16 justify-start px-4 ${
                !method.available ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!method.available}
              onClick={() => setSelectedMethod(method.id)}
            >
              <span className="text-2xl mr-4">{method.icon}</span>
              <span className="font-medium">{method.name}</span>
              {!method.available && (
                <span className="ml-auto text-xs text-muted-foreground">
                  Coming soon
                </span>
              )}
            </Button>
          ))}
        </div>

        {selectedMethod === "paypal" && (
          <div className="mt-6">
            <h3 className="text-md font-medium mb-4">
              Complete payment with PayPal
            </h3>
            <PayPalButton amount={AMOUNT} />
          </div>
        )}
      </div>
    </div>
  );
}
