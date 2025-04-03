// curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxNjQ5MDM2MGFhYjA0ZTIwYWQxZGEwOTg3YzNkODVlYiIsImlhdCI6MTc0MTQ0NzExMCwiZXhwIjoyMDU2ODA3MTEwfQ.W0-obBF5Rb5l0jUyDzsf_8XMDGjQdemFpnEVyyKQC5s" http://172.16.8.139:8123/api/webhook/-k-vD1UuMylH4eyXvG1ZjzXkV

import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { webhookID } = await request.json();
    console.log({ webhookID })
    try {
        const response = await fetch(`http://172.16.8.139:8123/api/webhook/${webhookID}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxNjQ5MDM2MGFhYjA0ZTIwYWQxZGEwOTg3YzNkODVlYiIsImlhdCI6MTc0MTQ0NzExMCwiZXhwIjoyMDU2ODA3MTEwfQ.W0-obBF5Rb5l0jUyDzsf_8XMDGjQdemFpnEVyyKQC5s'
            },
            //body: {}),
        });

        //const result = await response;
        console.log({ response });
        return NextResponse.json(
            { message: "Charging started" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error calling Homeassistant Webhook:", error);
        return NextResponse.json(
            { error: "Failed to call Homeassistant Webhook Id: " + webhookID },
            { status: 500 }
        );
    }
}