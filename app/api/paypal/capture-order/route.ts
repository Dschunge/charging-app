import { ordersController } from "@/lib/paypal";
import { ApiError } from "@paypal/paypal-server-sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { orderID } = await request.json();

        if (!orderID) {
            return NextResponse.json(
                { error: "Order ID is required" },
                { status: 400 }
            );
        }


        const collect = {
            id: orderID,
            prefer: "return=minimal",
        };

        try {
            const { body, ...httpResponse } = await ordersController.ordersCapture(
                collect
            );
            // Get more response info...
            // const { statusCode, headers } = httpResponse;
            return NextResponse.json({
                jsonResponse: JSON.parse(body.toString()),
                httpStatusCode: httpResponse.statusCode,
            })
        } catch (error) {
            if (error instanceof ApiError) {
                // const { statusCode, headers } = error;
                throw new Error(error.message);
            }
        }


    } catch (error) {
        console.error("Error capturing PayPal order:", error);
        return NextResponse.json(
            { error: "Failed to capture order" },
            { status: 500 }
        );
    }
}
