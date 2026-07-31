import ShortsCalculator from "../../../components/ShortsCalculator/ShortsCalculator";
import FAQ from "../../../components/FAQ/FAQ";
import RelatedTools from "../../../components/RelatedTools/RelatedTools";
import Script from "next/script";
import Link from "next/link";
export const revalidate = 3600;

export const metadata = {
  title: "YouTube Shorts Earnings Calculator — RPM by Niche & Country (2026)",
  description:
    "Estimate YouTube Shorts earnings by niche, country, and music usage. See how Shorts revenue compares to long-form video. Free, instant, no signup.",
  alternates: {
    canonical: "https://channelincome.com/tool/youtube-shorts-calculator",
  },
  keywords: [
    "youtube shorts calculator",
    "youtube shorts earnings calculator",
    "youtube shorts revenue calculator",
    "shorts rpm calculator",
    "how much do youtube shorts pay",
  ],
  openGraph: {
    title: "YouTube Shorts Earnings Calculator — RPM by Niche & Country | ChannelIncome",
    description: "Estimate YouTube Shorts earnings by niche, country, and music usage. Free, instant, no signup.",
    url: "https://channelincome.com/tool/youtube-shorts-calculator",
    type: "website",
    images: [{ url: "https://channelincome.com/icon.png", width: 1200, height: 630, alt: "YouTube Shorts Earnings Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Shorts Earnings Calculator — RPM by Niche & Country",
    description: "Estimate YouTube Shorts earnings by niche, country, and music usage.",
    images: ["https://channelincome.com/icon.png"],
  },
};

const niches = [
  ["Finance & Business", "$0.25 – $0.45"],
  ["Technology / AI", "$0.20 – $0.35"],
  ["Education / How-to", "$0.14 – $0.25"],
  ["Lifestyle / Vlogs", "$0.09 – $0.16"],
  ["Entertainment", "$0.06 – $0.11"],
  ["Gaming", "$0.05 – $0.10"],
  ["Kids Content", "$0.03 – $0.06"],
];

const faqData = [
  {
    q: "How much do YouTube Shorts pay per 1,000 views?",
    a: "YouTube Shorts typically pay $0.03–$0.45 per 1,000 views depending on niche, audience country, and whether the video uses licensed music. Finance and tech Shorts earn the most; gaming and kids content earn the least. This is far lower than long-form video RPM.",
  },
  {
    q: "Why do YouTube Shorts pay so much less than long-form videos?",
    a: "Shorts revenue comes from a shared ad pool split across everything a viewer watches in the Shorts feed, not ads on your specific video. Licensed music also reduces your share, since music licensing costs are deducted before the creator payout.",
  },
  {
    q: "Does using licensed music reduce Shorts earnings?",
    a: "Yes. Using one licensed track typically reduces your earnings by about 33%, and using two or more tracks can reduce earnings by roughly 50%, since licensing costs are deducted from the ad pool before revenue is shared with creators.",
  },
  {
    q: "Can I estimate Shorts earnings from just a video URL?",
    a: "Yes. Paste any public Shorts URL into the calculator and it pulls the video's real view count via the YouTube Data API, then applies niche, country, and music-based RPM to estimate earnings — no manual entry needed.",
  },
  {
    q: "Is it better to focus on Shorts or long-form videos for revenue?",
    a: "For pure ad revenue, long-form video almost always earns significantly more per view. Shorts are better suited for audience discovery and subscriber growth, then converting that audience to long-form content where the RPM is higher.",
  },
];

const schemas = {
  app: {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    name: "YouTube Shorts Earnings Calculator",
    url: "https://channelincome.com/tool/youtube-shorts-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description: "Free tool to estimate YouTube Shorts earnings by niche, country, and music usage.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    creator: { "@type": "Organization", name: "ChannelIncome", url: "https://channelincome.com" },
  },
  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://channelincome.com" },
      { "@type": "ListItem", position: 2, name: "YouTube Shorts Calculator", item: "https://channelincome.com/tool/youtube-shorts-calculator" },
    ],
  },
};

export default function YouTubeShortsCalculatorPage() {
  return (
    <>
      <Script id="shorts-app-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.app) }} />
      <Script id="shorts-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      <Script id="shorts-breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />

      <div className="min-h-screen bg-background text-foreground">
        <section aria-label="Quick Answer" className="bg-secondary border-b border-border px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-muted leading-relaxed">
              YouTube Shorts pay <strong className="text-foreground">$0.03–$0.45 per 1,000 views</strong> depending on niche, country, and music usage — far less than long-form video. Enter your views below for a personalized estimate and AI strategy.
            </p>
          </div>
        </section>

        <section className="relative bg-ink overflow-hidden px-4 py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_50%,rgba(224,32,26,0.28),transparent)]" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 py-1 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] font-medium tracking-widest text-white/70 uppercase">Free Tool · Updated 2026</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
              YouTube Shorts <br />
              <span className="text-accent">Earnings Calculator</span>
            </h1>
            <p className="text-[15px] text-white/70 leading-relaxed max-w-xl">
              Shorts RPM is a different (and much lower) number than long-form RPM.
              Enter your niche, country, and music usage for a realistic estimate —
              plus an AI-generated strategy based on your exact numbers.
            </p>
          </div>
        </section>

        <ShortsCalculator />

        <section className="bg-background border-y border-border px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-accent mb-2">2026 Rate Data</p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-2">
              YouTube Shorts RPM by niche (US audience, no music)
            </h2>
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary">
                    <th className="text-left px-4 py-2 border-b border-border text-xs font-semibold text-foreground uppercase">Niche</th>
                    <th className="text-right px-4 py-2 border-b border-border text-xs font-semibold text-foreground uppercase">Shorts RPM (per 1,000 views)</th>
                  </tr>
                </thead>
                <tbody>
                  {niches.map(([niche, rpm], i) => (
                    <tr key={niche} className={i % 2 === 0 ? "bg-background" : "bg-secondary"}>
                      <td className="px-4 py-2.5 text-xs text-foreground border-b border-border">{niche}</td>
                      <td className="px-4 py-2.5 text-xs text-right font-semibold text-accent border-b border-border">{rpm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-background px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-accent mb-2">FAQ</p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-2">
              Common questions about YouTube Shorts earnings
            </h2>
            <FAQ faq={faqData} />

            <div className="mt-8">
              <RelatedTools currentSlug="youtube-shorts-calculator" />
            </div>

            <div className="mt-6 text-center">
              <Link href="/tool/youtube-revenue-calculator" className="text-primary font-semibold underline text-sm">
                Estimate long-form channel earnings →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
