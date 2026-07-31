import TikTokCalculator from "../../../components/TikTokCalculator/TikTokCalculator";
import FAQ from "../../../components/FAQ/FAQ";
import RelatedTools from "../../../components/RelatedTools/RelatedTools";
import Script from "next/script";
import Link from "next/link";
export const revalidate = 3600;

export const metadata = {
  title: "TikTok Money Calculator — Estimate Creator Earnings (2026)",
  description:
    "Estimate TikTok creator earnings from Creator Rewards and sponsorships based on followers, views, and niche. Free, instant, no signup.",
  alternates: {
    canonical: "https://channelincome.com/tool/tiktok-money-calculator",
  },
  keywords: [
    "tiktok money calculator",
    "tiktok earnings calculator",
    "how much does tiktok pay",
    "tiktok creator fund calculator",
    "tiktok sponsorship rate calculator",
  ],
  openGraph: {
    title: "TikTok Money Calculator — Estimate Creator Earnings | ChannelIncome",
    description: "Estimate TikTok creator earnings from Creator Rewards and sponsorships. Free, instant, no signup.",
    url: "https://channelincome.com/tool/tiktok-money-calculator",
    type: "website",
    images: [{ url: "https://channelincome.com/icon.png", width: 1200, height: 630, alt: "TikTok Money Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok Money Calculator — Estimate Creator Earnings",
    description: "Estimate TikTok creator earnings from Creator Rewards and sponsorships.",
    images: ["https://channelincome.com/icon.png"],
  },
};

const tiers = [
  ["Nano (under 10K)", "$10 – $100"],
  ["Micro (10K – 100K)", "$100 – $500"],
  ["Mid-tier (100K – 500K)", "$500 – $1,500"],
  ["Macro (500K – 1M)", "$1,500 – $4,000"],
  ["Mega (1M+)", "$4,000+"],
];

const faqData = [
  {
    q: "How much money does TikTok pay per 1,000 views?",
    a: "TikTok's Creator Rewards Program pays roughly $0.02–$0.06 per 1,000 views depending on content niche and engagement, which is far less than most creators expect. The bulk of real TikTok income for most creators comes from brand sponsorships, not the built-in rewards program.",
  },
  {
    q: "How much can I charge for a sponsored TikTok post?",
    a: "Sponsored post rates scale with follower count: roughly $10–$100 for nano-influencers (under 10K), $100–$500 for micro (10K–100K), $500–$1,500 for mid-tier (100K–500K), $1,500–$4,000 for macro (500K–1M), and $4,000+ for mega creators (1M+ followers).",
  },
  {
    q: "Is TikTok's Creator Fund the same as Creator Rewards?",
    a: "TikTok replaced the original Creator Fund with the Creator Rewards Program, which pays based on video quality, originality, and engagement rather than just raw view count — but the effective payout per 1,000 views remains a small fraction of what YouTube ad revenue pays.",
  },
  {
    q: "Is this TikTok money calculator free?",
    a: "Yes, completely free with no signup required.",
  },
];

const schemas = {
  app: {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    name: "TikTok Money Calculator",
    url: "https://channelincome.com/tool/tiktok-money-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description: "Free tool to estimate TikTok creator earnings from Creator Rewards and sponsorships.",
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
      { "@type": "ListItem", position: 2, name: "TikTok Money Calculator", item: "https://channelincome.com/tool/tiktok-money-calculator" },
    ],
  },
};

export default function TikTokMoneyCalculatorPage() {
  return (
    <>
      <Script id="tiktok-app-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.app) }} />
      <Script id="tiktok-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      <Script id="tiktok-breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />

      <div className="min-h-screen bg-background text-foreground">
        <section aria-label="Quick Answer" className="bg-secondary border-b border-border px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-muted leading-relaxed">
              TikTok Creator Rewards pay roughly <strong className="text-foreground">$0.02–$0.06 per 1,000 views</strong> — real income mostly comes from brand sponsorships, which scale with your follower tier. Enter your numbers below for a personalized estimate.
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
              TikTok Money <br />
              <span className="text-accent">Calculator</span>
            </h1>
            <p className="text-[15px] text-white/70 leading-relaxed max-w-xl">
              Most TikTok calculators only guess from your follower count. Ours combines
              Creator Rewards income with realistic sponsorship rates for your tier —
              plus an AI strategy based on your exact numbers.
            </p>
          </div>
        </section>

        <TikTokCalculator />

        <section className="bg-background border-y border-border px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-accent mb-2">2026 Rate Data</p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-2">
              TikTok sponsored post rates by follower tier
            </h2>
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary">
                    <th className="text-left px-4 py-2 border-b border-border text-xs font-semibold text-foreground uppercase">Follower Tier</th>
                    <th className="text-right px-4 py-2 border-b border-border text-xs font-semibold text-foreground uppercase">Rate per Sponsored Post</th>
                  </tr>
                </thead>
                <tbody>
                  {tiers.map(([tier, rate], i) => (
                    <tr key={tier} className={i % 2 === 0 ? "bg-background" : "bg-secondary"}>
                      <td className="px-4 py-2.5 text-xs text-foreground border-b border-border">{tier}</td>
                      <td className="px-4 py-2.5 text-xs text-right font-semibold text-accent border-b border-border">{rate}</td>
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
              Common questions about TikTok earnings
            </h2>
            <FAQ faq={faqData} />

            <div className="mt-8">
              <RelatedTools currentSlug="tiktok-money-calculator" />
            </div>

            <div className="mt-6 text-center">
              <Link href="/tool/youtube-revenue-calculator" className="text-primary font-semibold underline text-sm">
                Estimate YouTube earnings instead →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
