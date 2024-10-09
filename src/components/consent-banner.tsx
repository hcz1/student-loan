"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if consent has been given before
    const consent = localStorage.getItem("cookieConsent");
    if (consent === null) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    window.gtag("consent", "update", {
      ad_user_data: "granted",
      ad_personalization: "granted",
      ad_storage: "granted",
      analytics_storage: "granted",
    });
    setShowBanner(false);
  };

  const handleReject = () => {
    window.gtag("consent", "update", {
      ad_user_data: "denied",
      ad_personalization: "denied",
      ad_storage: "denied",
      analytics_storage: "granted",
    });
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[rgba(178,178,252,1)] border-t-4 border-black p-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <p className="text-black dark:text-gray-900 font-bold mb-4 sm:mb-0">
          This website uses cookies to ensure you get the best experience.
        </p>
        <div className="flex space-x-4">
          <Button
            onClick={handleAccept}
            className="bg-black text-white dark:bg-gray-300 dark:text-gray-900 hover:bg-white hover:text-black dark:hover:bg-gray-900 dark:hover:text-gray-300 border-2 border-black dark:border-gray-300 font-bold transition-colors"
          >
            Accept
          </Button>
          <Button
            onClick={handleReject}
            variant="outline"
            className="bg-white text-black dark:bg-gray-800 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-gray-300 dark:hover:text-gray-900 border-2 border-black dark:border-gray-300 font-bold transition-colors"
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}
