import ChannelComparison from "../../../components/ChannelComparison/ChannelComparison";
import FAQ from "../../../components/FAQ/FAQ";
import RelatedTools from "../../../components/RelatedTools/RelatedTools";
import Script from "next/script";
import Link from "next/link";
export const revalidate = 3600;

export const metadata = {
  title: "YouTube Channel Comparison Tool — Compare Revenue & Stats (2026)",
  description:
    "Compare two YouTube channels side by side — subscribers, views, and estimated ad revenue. Free tool, no signup required.",
  alternates: {
    canonical: "https://channelincome.com/tool/youtube-channel-comparison",
  },
  keywords: [
    "youtube channel comparison tool",
    "compare youtube channels",
    "youtube channel vs channel",
    "youtube revenue comparison",
    "compare youtube earnings",
  ],
  openGraph: {
    title: "YouTube Channel Comparison Tool — Compare Revenue & Stats | ChannelIncome",
    description: "Compare two YouTube channels side by side — subscribers, views, and estimated ad revenue. Free, instant, no signup.",
    url: "https://channelincome.com/tool/youtube-channel-comparison",
    type: "website",
    images: [{ url: "https://channelincome.com/icon.png", width: 1200, height: 630, alt: "YouTube Channel Comparison Tool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Channel Comparison Tool — Compare Revenue & Stats",
    description: "Compare two YouTube channels side by side — subscribers, views, and estimated ad revenue.",
    images: ["https://channelincome.com/icon.png"],
  },
};

const faqData = [
  {
    q: "How do I compare two YouTube channels?",
    a: "Enter both channel names, URLs, or handles into the comparison tool, select a niche and audience region, and it returns side-by-side subscriber counts, total views, video counts, and estimated revenue for both channels.",
  },
  {
    q: "Does this tool compare estimated revenue, not just stats?",
    a: "Yes. Unlike most channel comparison tools that only show subscribers and views, ChannelIncome's comparison tool also estimates and compares ad revenue for both channels using the same RPM/CPM engine as our main calculator.",
  },
  {
    q: "Can I compare channels in different niches?",
    a: "Yes, but for the most accurate revenue comparison, select the niche and region that matches each channel's actual content. If the channels are in different niches, run the comparison twice using each channel's own niche for a fairer read.",
  },
  {
    q: "Is this comparison tool free?",
    a: "Yes, completely free with no signup required, just like every other ChannelIncome tool.",
  },
  {
    q: "How accurate is the revenue comparison?",
    a: "It uses the same CPM/RPM benchmark engine as our YouTube Revenue Calculator — a realistic estimate based on public stats, niche, and audience geography, not guaranteed figures. Neither channel's real YouTube Studio data is accessible to any third-party tool.",
  },
];

const schemas = {
  app: {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    name: "YouTube Channel Comparison Tool",
    url: "https://channelincome.com/tool/youtube-channel-comparison",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description: "Free tool to compare two YouTube channels side by side — subscribers, views, and estimated ad revenue.",
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
      { "@type": "ListItem", position: 2, name: "YouTube Channel Comparison", item: "https://channelincome.com/tool/youtube-channel-comparison" },
    ],
  },
};

export default function YouTubeChannelComparisonPage() {
  return (
    <>
      <Script id="comparison-app-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.app) }} />
      <Script id="comparison-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      <Script id="comparison-breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />

      <div className="min-h-screen bg-background text-foreground">
        <section aria-label="Quick Answer" className="bg-secondary border-b border-border px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-muted leading-relaxed">
              <strong className="text-foreground">Compare any two YouTube channels</strong> — subscribers, views, video count, and estimated ad revenue, side by side. Most comparison tools stop at stats; this one estimates who actually earns more.
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
              YouTube Channel <br />
              <span className="text-accent">Comparison Tool</span>
            </h1>
            <p className="text-[15px] text-white/70 leading-relaxed max-w-xl">
              Every other comparison tool shows you subscribers and views. We go further —
              estimating and comparing actual ad revenue for both channels, so you know not
              just who&apos;s bigger, but who&apos;s likely earning more.
            </p>
          </div>
        </section>

        <ChannelComparison />

        <section id="faq" className="bg-background px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-accent mb-2">FAQ</p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-2">
              Common questions about comparing YouTube channels
            </h2>
            <FAQ faq={faqData} />

            <div className="mt-8">
              <RelatedTools currentSlug="youtube-channel-comparison" />
            </div>

            <div className="mt-6 text-center">
              <Link href="/tool/youtube-revenue-calculator" className="text-primary font-semibold underline text-sm">
                Estimate a single channel&apos;s earnings →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
