"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getCookie, setCookie } from "@/lib/utils/cookies";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = getCookie("analytics-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie("analytics-consent", "true", 365);
    setShowBanner(false);
  };

  const handleDecline = () => {
    setCookie("analytics-consent", "false", 365);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg">
      <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          <p>
            We use cookies to improve your experience and analyze site usage.
            Read our{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDecline}>
            Decline
          </Button>
          <Button onClick={handleAccept}>
            Accept Cookies
          </Button>
        </div>
      </div>
    </div>
  );
} 