import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function InfoSection() {
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About Golf Cart Charging</CardTitle>
          <CardDescription>How our charging stations work</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Charging Process</h3>
            <p>
              Our charging stations provide fast and reliable power for your
              golf cart. Simply connect your cart to the charging port after
              payment, and the charging will begin automatically.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Charging Time</h3>
            <p>
              A standard charge of $10.00 provides approximately 2 hours of
              charging time, which is sufficient for a full day of golfing for
              most cart models.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Charging Locations</CardTitle>
          <CardDescription>
            Find charging stations around the golf course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2">🔌</span>
              <div>
                <p className="font-medium">Station #1 - Clubhouse</p>
                <p className="text-sm text-muted-foreground">
                  Located near the main entrance
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🔌</span>
              <div>
                <p className="font-medium">Station #2 - Halfway House</p>
                <p className="text-sm text-muted-foreground">
                  Between holes 9 and 10
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🔌</span>
              <div>
                <p className="font-medium">Station #3 - Golf Club</p>
                <p className="text-sm text-muted-foreground">
                  Near the practice area
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Support</CardTitle>
          <CardDescription>Need help with charging?</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            If you encounter any issues with our charging stations, please
            contact our support team:
          </p>
          <div className="space-y-2">
            <p className="flex items-center">
              <span className="mr-2">📞</span> (555) 123-4567
            </p>
            <p className="flex items-center">
              <span className="mr-2">✉️</span> support@golfcartcharging.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
