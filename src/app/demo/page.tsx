"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import * as Sentry from "@sentry/nextjs";
import { useAuth } from "@clerk/nextjs";

// Different log levels
// Sentry.logger.trace("Entering function", { fn: "processOrder" });
// Sentry.logger.debug("Cache lookup", { key: "user:123" });
// Sentry.logger.info("Order created", { orderId: "order_456" });
// Sentry.logger.warn("Rate limit approaching", { current: 95, max: 100 });
// Sentry.logger.error("Payment failed", { reason: "card_declined" });
// Sentry.logger.fatal("Database unavailable", { host: "primary" });

const Page = () => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleBlocking = async () => {
    setLoading(true);
    await fetch("/api/demo/blocking", {
      method: "POST",
    });
    setLoading(false);
  };

  // 1) Client error - throws in the browser
  const handleClientError = () => {
    Sentry.logger.error("Client error: Something went wrong in the browser!", {
      userId,
    });
    throw new Error("Client error: Something went wrong in the browser!");
  };

  // 2) API error - triggers server-side error
  const handleApiError = async () => {
    await fetch("/api/demo/error", {
      method: "POST",
    });
  };

  // 3) Inngest error - triggers error in background job
  const handleInngestError = async () => {
    await fetch("/api/demo/inngest-error", {
      method: "POST",
    });
  };

  return (
    <div className="p-8 space-x-4">
      <Button onClick={handleBlocking} disabled={loading}>
        {loading ? "Loading..." : "Blocking"}
      </Button>
      <Button variant="destructive" onClick={handleClientError}>
        Client error
      </Button>
      <Button variant="destructive" onClick={handleApiError}>
        API error
      </Button>
      <Button variant="destructive" onClick={handleInngestError}>
        Inngest error
      </Button>
    </div>
  );
};

export default Page;
