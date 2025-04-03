import { ordersController } from "@/lib/paypal";
import { ApiError, CheckoutPaymentIntent } from "@paypal/paypal-server-sdk";
import { NextResponse } from "next/server";

export async function POST() {
    try {

        // fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a',
        //         'Authorization': 'Bearer 6V7rbVwmlM1gFZKW_8QtzWXqpcwQ6T5vhEGYNJDAAdn3paCgRpdeMdVYmWzgbKSsECednupJ3Zx5Xd-g'
        //     },
        //     body: JSON.stringify(
        //         {
        //             intent: CheckoutPaymentIntent.Capture,
        //             payment_source: {
        //                 paypal: {
        //                     experience_context: {
        //                         payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
        //                         landing_page: "LOGIN",
        //                         shipping_preference: "GET_FROM_FILE",
        //                         user_action: "PAY_NOW",
        //                         return_url: "https://example.com/returnUrl", 
        //                         cancel_url: "https://example.com/cancelUrl"
        //                     }
        //                 }
        //             },
        //             purchase_units: [{
        //                 invoice_id: "90210",
        //                 amount: {
        //                     currency_code: "USD",
        //                     value: "10.00",
        //                     breakdown: {
        //                         item_total: {
        //                             currency_code: "USD",
        //                             value: "10.00"
        //                         },
        //                         shipping: {
        //                             currency_code: "USD",
        //                             value: "0.00"
        //                         }
        //                     }
        //                 }, items: [{
        //                     name: "T - Shirt",
        //                     description: "Super Fresh Shirt",
        //                     unit_amount: {
        //                         currency_code: "USD",
        //                         value: "20.00"
        //                     },
        //                     quantity: "1",
        //                     category: "PHYSICAL_GOODS",
        //                     sku: "sku01",
        //                     image_url: "https://example.com/static/images/items/1/tshirt_green.jpg", 
        //                     url: "https://example.com/url-to-the-item-being-purchased-1", 
        //                     upc: {
        //                         type: "UPC - A",
        //                         code: "123456789012" }
        //                 },]
        //             }]
        //         })
        // });

        const collect = {
            body: {
                intent: CheckoutPaymentIntent.Capture,
                purchaseUnits: [
                    {
                        invoice_id: "90210",
                        amount: {
                            currencyCode: "USD",
                            value: "10.00",
                        },
                    },
                ],
            },
            prefer: "return=minimal",
        };

        try {
            const { body, ...httpResponse } = await ordersController.ordersCreate(
                collect
            );
            // Get more response info...
            // const { statusCode, headers } = httpResponse;
            console.log({ responsedata: JSON.parse(body.toString()) })
            return NextResponse.json({
                jsonResponse: JSON.parse(body.toString()),
                httpStatusCode: httpResponse.statusCode,
            });

        } catch (error) {
            if (error instanceof ApiError) {
                // const { statusCode, headers } = error;
                //throw new Error(error.message);
                return NextResponse.json(
                    { error: "Failed to create order: " + error.message },
                    { status: 500 }
                );
            }
        }


        // Mock response
    } catch (error) {
        console.error("Error creating PayPal order:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}
