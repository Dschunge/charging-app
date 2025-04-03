import {
    //ApiError,
    //CheckoutPaymentIntent,
    Client,
    Environment,
    LogLevel,
    OrdersController,
} from "@paypal/paypal-server-sdk";


const NEXT_PUBLIC_PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string
const NEXT_PUBLIC_PAYPAL_SECRET = process.env.NEXT_PUBLIC_PAYPAL_SECRET as string

const client = new Client({
    clientCredentialsAuthCredentials: {
        oAuthClientId: NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        oAuthClientSecret: NEXT_PUBLIC_PAYPAL_SECRET,
    },
    timeout: 0,
    environment: Environment.Sandbox,
    logging: {
        logLevel: LogLevel.Info,
        logRequest: {
            logBody: true,
        },
        logResponse: {
            logHeaders: true,
        },
    },
});

export const ordersController = new OrdersController(client);

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
// const captureOrder = async (orderID: string) => {
//     const collect = {
//         id: orderID,
//         prefer: "return=minimal",
//     };

//     try {
//         const { body, ...httpResponse } = await ordersController.ordersCapture(
//             collect
//         );
//         // Get more response info...
//         // const { statusCode, headers } = httpResponse;
//         return {
//             jsonResponse: JSON.parse(body),
//             httpStatusCode: httpResponse.statusCode,
//         };
//     } catch (error) {
//         if (error instanceof ApiError) {
//             // const { statusCode, headers } = error;
//             throw new Error(error.message);
//         }
//     }
// };