import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description:
    "ChannelIncome does not store your personal data. Learn what we collect, what we don't, and how your privacy is protected when using our free YouTube revenue calculator.",
  openGraph: {
    title: "Privacy Policy | ChannelIncome",
    description:
      "ChannelIncome does not store your personal data. Learn exactly how your privacy is protected when using our free YouTube revenue calculator.",
    url: "https://channelincome.com/privacy-policy",
    type: "website",
  },
  alternates: { canonical: "https://channelincome.com/privacy-policy" },
};

export default function PrivacyPolicy() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    name: "ChannelIncome Privacy Policy",
    url: "https://channelincome.com/privacy-policy",
    datePublished: "2025-10-01",
    dateModified: "2026-06-01",
    publisher: {
      "@type": "Organization",
      name: "ChannelIncome",
      url: "https://channelincome.com",
      logo: {
        "@type": "ImageObject",
        url: "https://channelincome.com/icon.png",
      },
    },
  };

  const summary = [
    { item: "Personal data collected", value: "None — we do not collect names, emails, or channel data" },
    { item: "YouTube channel data", value: "Not stored after your session ends" },
    { item: "Analytics", value: "Google Analytics tracks site usage (anonymous)" },
    { item: "Advertising", value: "Google AdSense and partners may use cookies to serve and measure ads" },
    { item: "Cookies", value: "Session cookies plus optional analytics/ad cookies — you choose via our consent banner" },
    { item: "Third-party sharing", value: "We do not sell your data; ad partners process data under their own policies" },
    { item: "GDPR / EEA, UK, CH visitors", value: "Ads and analytics cookies are off by default until you consent" },
  ];

  return (
    <div className="min-h-screen bg-secondary py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Header */}
        <div className="bg-background rounded-3xl shadow-sm border border-border p-5 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-3 shadow-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="font-display text-lg md:text-xl font-extrabold text-foreground mb-2 leading-snug">
            Privacy Policy
          </h1>
          <p className="text-xs text-muted leading-relaxed">
            How ChannelIncome protects your data while you use our free YouTube revenue calculator.
          </p>
        </div>

        {/* At-a-Glance Table (AEO-friendly) */}
        <div className="bg-background rounded-lg shadow-sm border border-border p-5">
          <h2 className="text-sm font-bold text-foreground mb-4 border-l-2 border-primary pl-3">
            Privacy at a Glance
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-secondary">
                  <th className="text-left px-3 py-2 border border-border font-semibold text-foreground">Topic</th>
                  <th className="text-left px-3 py-2 border border-border font-semibold text-foreground">What ChannelIncome Does</th>
                </tr>
              </thead>
              <tbody>
                {summary.map((row, i) => (
                  <tr key={row.item} className={i % 2 === 0 ? "bg-background" : "bg-secondary"}>
                    <td className="px-3 py-2 border border-border font-semibold text-foreground">{row.item}</td>
                    <td className="px-3 py-2 border border-border text-muted">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Full Policy */}
        <div className="bg-background rounded-lg shadow-sm border border-border p-5">
          <h2 className="text-sm font-bold text-foreground mb-3 border-l-2 border-primary pl-3">
            Privacy &amp; Data Protection Policy
          </h2>

          <div className="space-y-3 text-xs text-muted leading-relaxed">
            <p>
              At <strong className="text-foreground">ChannelIncome</strong>, your privacy is our top priority.
              We are committed to protecting your personal information and ensuring full transparency in how we handle data.
            </p>
            <p>
              <strong className="text-foreground">What data we don&#39;t collect:</strong> We do not collect, store, or share personal data from users. When you use our YouTube revenue calculator, we do not save your name, email, or YouTube channel information on our servers after your session ends.
            </p>
            <p>
              <strong className="text-foreground">Third-party services:</strong> ChannelIncome uses Google APIs (YouTube Data API and reCAPTCHA) only to fetch publicly available YouTube channel data and to protect against bot abuse. These requests comply with Google&#39;s terms of service.
            </p>
            <p>
              <strong className="text-foreground">Analytics:</strong> We use Google Analytics to track site performance and usage patterns. This data is anonymous — it does not personally identify you and is used only to improve the tool.
            </p>
            <p>
              <strong className="text-foreground">Cookies:</strong> ChannelIncome uses standard session cookies required for the site to function. We also use Google Analytics and, where enabled, Google AdSense — both of which may set cookies for analytics measurement and ad delivery. You can control these via the cookie consent banner shown on your first visit, or at any time in your browser settings.
            </p>
            <p>
              <strong className="text-foreground">Advertising (Google AdSense):</strong> ChannelIncome may display ads served by Google AdSense and its advertising partners. Google and its partners use cookies — including the DoubleClick cookie — to serve ads based on your prior visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet. You may opt out of personalized advertising by visiting{" "}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Ads Settings</a>{" "}
              or{" "}
              <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary underline">aboutads.info/choices</a>.
            </p>
            <p>
              <strong className="text-foreground">Your consent choices:</strong> For visitors in the EEA, UK, and Switzerland, analytics and advertising cookies are disabled by default (Google Consent Mode) until you actively accept them through our consent banner. You can change your choice at any time by clearing your browser&#39;s local storage for this site and reloading the page.
            </p>
            <p>
              <strong className="text-foreground">Data deletion:</strong> By design, your YouTube channel data is not retained after each calculator session. We keep no database of your searches or estimates.
            </p>
            <p>
              <strong className="text-foreground">Policy updates:</strong> We may update this policy to reflect changes in our practices or legal requirements. Continued use of the site means you accept any updates.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs text-muted">Last updated: June 2026 · <strong>GDPR Compliant</strong></p>
            <Link
              href="/tool/youtube-revenue-calculator"
              className="text-xs font-semibold text-primary hover:opacity-80 transition"
            >
              Back to the Revenue Calculator →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
