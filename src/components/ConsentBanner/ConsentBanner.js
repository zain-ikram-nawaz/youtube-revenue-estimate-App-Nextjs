"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ci_consent";

function pushConsentUpdate(granted) {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
  });
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "granted") {
        pushConsentUpdate(true);
      } else if (!stored) {
        setVisible(true);
      }
      // "denied" needs no action — Consent Mode already defaults to denied.
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (granted) => {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    } catch {
      // localStorage unavailable — consent choice won't persist, but still apply for this session.
    }
    pushConsentUpdate(granted);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-50 bg-ink border-t border-white/10 px-4 py-4"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-xs text-white/70 leading-relaxed flex-1">
          We use cookies for analytics and, once ads are live, to show relevant advertising. You can
          accept or reject non-essential cookies at any time — see our{" "}
          <a href="/privacy-policy" className="underline text-white">
            Privacy Policy
          </a>{" "}
          for details.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => choose(false)}
            className="text-xs font-semibold px-4 py-2 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="text-xs font-semibold px-4 py-2 rounded-full bg-primary text-white hover:opacity-90 transition"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
