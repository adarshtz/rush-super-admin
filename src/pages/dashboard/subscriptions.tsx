import { useState } from "react";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { CreateSubscriptionDialog } from "@/components/dashboard/create-subscription-dialog";
import { subscriptionSchema } from "@/schema";

type Subscription = z.infer<typeof subscriptionSchema> & {
  id: string;
  active: boolean;
  createdAt: Date;
};

export function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: "1",
      name: "Basic Plan",
      price: 9.99,
      description: "A basic subscription plan with essential features",
      features: ["Email Support", "Basic Analytics", "1 User"],
      isActive: true,
      active: true,
      duration: "1 Month",
      createdAt: new Date("2023-01-01"),
    },
    {
      id: "2",
      name: "Pro Plan",
      price: 19.99,
      description: "A professional subscription plan with advanced features",
      features: [
        "Priority Support",
        "Advanced Analytics",
        "5 Users",
        "API Access",
      ],
      isActive: false,
      active: false,
      duration: "1 Month",
      createdAt: new Date("2023-02-01"),
    },
    {
      id: "3",
      name: "Enterprise Plan",
      price: 49.99,
      description: "An enterprise-level subscription plan with all features",
      features: [
        "24/7 Support",
        "Custom Analytics",
        "Unlimited Users",
        "API Access",
        "White Labeling",
        "Priority Development",
      ],
      isActive: true,
      active: true,
      duration: "1 Year",
      createdAt: new Date("2023-03-01"),
    },
  ]);

  function toggleSubscriptionStatus(id: string) {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? { ...sub, active: !sub.active, isActive: !sub.active }
          : sub
      )
    );
  }

  const activeSubscriptions = subscriptions.filter((sub) => sub.active);

  return (
    <div className="space-y-8 p-6 font-primary">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Subscription Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your subscription plans and pricing
          </p>
        </div>
        <CreateSubscriptionDialog />
      </div>

      {/* Active Subscriptions */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Active Subscriptions</CardTitle>
          <CardDescription>List of active subscription plans</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {activeSubscriptions.length === 0 ? (
            <div className="rounded-md bg-muted p-4 text-center">
              No active subscriptions found
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeSubscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  className="flex flex-col justify-between rounded-lg border shadow-sm transition-all hover:shadow-md"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold">
                        {subscription.name}
                      </h3>
                      <div className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        ${subscription.price.toFixed(2)}
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground mb-2">
                      {subscription.duration}
                    </div>

                    {subscription.description && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {subscription.description}
                      </p>
                    )}

                    {subscription.features &&
                      subscription.features.length > 0 && (
                        <div className="space-y-2 mt-4">
                          <h4 className="text-sm font-medium">Features:</h4>
                          <ul className="text-sm space-y-1.5">
                            {subscription.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <svg
                                  className="h-4 w-4 text-primary mr-2"
                                  fill="none"
                                  height="24"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>

                  <div className="flex items-center justify-between border-t p-4 bg-slate-50">
                    <p className="text-xs text-muted-foreground">
                      Created: {subscription.createdAt.toLocaleDateString()}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`active-${subscription.id}`}
                        checked={subscription.active}
                        onCheckedChange={() =>
                          toggleSubscriptionStatus(subscription.id)
                        }
                      />
                      <label
                        htmlFor={`active-${subscription.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Active
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Subscriptions */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>All Subscriptions</CardTitle>
          <CardDescription>
            Complete list of all subscription plans
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {subscriptions.length === 0 ? (
            <div className="rounded-md bg-muted p-4 text-center">
              No subscriptions found
            </div>
          ) : (
            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4 gap-4"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-medium">{subscription.name}</h3>
                      <div className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        ${subscription.price.toFixed(2)} /{" "}
                        {subscription.duration}
                      </div>
                      <div
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          subscription.active
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {subscription.active ? "Active" : "Inactive"}
                      </div>
                    </div>

                    {subscription.description && (
                      <p className="text-sm text-muted-foreground">
                        {subscription.description}
                      </p>
                    )}

                    {subscription.features &&
                      subscription.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {subscription.features
                            .slice(0, 3)
                            .map((feature, index) => (
                              <span
                                key={index}
                                className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700"
                              >
                                {feature}
                              </span>
                            ))}
                          {subscription.features.length > 3 && (
                            <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                              +{subscription.features.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                    <p className="text-xs text-muted-foreground mt-2">
                      Created: {subscription.createdAt.toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-center">
                    <Switch
                      id={`all-${subscription.id}`}
                      checked={subscription.active}
                      onCheckedChange={() =>
                        toggleSubscriptionStatus(subscription.id)
                      }
                    />
                    <label
                      htmlFor={`all-${subscription.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {subscription.active ? "Active" : "Inactive"}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
