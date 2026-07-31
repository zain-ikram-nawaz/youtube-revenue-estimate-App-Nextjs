import YoutubeAnalyzer from "../../../components/YoutubeChecker/YoutubeChecker";

import FAQ from "../../../components/FAQ/FAQ";
import Script from "next/script";
import Link from "next/link";
import { Zap } from "lucide-react";
import RelatedTools from "../../../components/RelatedTools/RelatedTools";
export const revalidate = 3600;

export const metadata = {
  title: "YouTube Revenue Calculator — Free CPM & RPM Estimator (2026)",
  description:
    "See how much any YouTube channel makes. Enter a channel name → get instant CPM & RPM-based earnings. Free, no signup. 2026 data.",
  alternates: {
    canonical: "https://channelincome.com/tool/youtube-revenue-calculator"
  },
  keywords: [
    "youtube revenue calculator",
    "youtube cpm calculator",
    "youtube rpm estimator",
    "youtube earnings estimator",
    "youtube income estimator",
    "youtube earnings calculator by channel name",
    "cpm calculator youtube",
    "youtube money calculator",
  ],
  openGraph: {
    title: "YouTube Revenue Calculator — Free CPM & RPM Estimator | ChannelIncome",
    description:
      "See how much any YouTube channel makes — instant CPM & RPM-based earnings estimate by channel name. Free, no signup.",
    url: "https://channelincome.com/tool/youtube-revenue-calculator",
    siteName: "ChannelIncome",
    locale: "en_US",
    type: "website",
    images: [{
      url: "https://channelincome.com/icon.png",
      width: 1200,
      height: 630,
      alt: "YouTube Revenue Calculator — Free CPM & RPM Estimator | ChannelIncome"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Revenue Calculator — Free CPM & RPM Estimator",
    description:
      "Calculate YouTube earnings by channel name, views, niche & country. Real CPM & RPM data. Free, instant, no signup.",
    images: ["https://channelincome.com/icon.png"],
    creator: "@channelincome"
  }
};


export default async function YouTubeRevenueCalculator() {
const niches = [
  ["Finance & Business",  "$8 – $15"],
  ["Technology / AI",     "$5 – $12"],
  ["Education / How-to",  "$4 – $10"],
  ["Lifestyle / Vlogs",   "$2 – $6"],
  ["Entertainment",       "$2 – $5"],
  ["Gaming",              "$2 – $5"],
  ["Kids Content",        "$1 – $3"],
];
const countries = [
  ["United States",      "$10 – $20"],
  ["United Kingdom",     "$8 – $15"],
  ["Canada / Australia", "$8 – $14"],
  ["Germany / Europe",   "$6 – $12"],
  ["Middle East",        "$4 – $8"],
  ["India",              "$1 – $3"],
  ["Pakistan",           "$0.5 – $2"],
];

const pills = [
  { title: "Views",           desc: "More views = more ad impressions = more revenue potential." },
  { title: "CPM",             desc: "What advertisers pay per 1,000 impressions — before YouTube's 45% cut." },
  { title: "RPM",             desc: "What you actually receive per 1,000 views after YouTube keeps its share." },
  { title: "Niche & Country", desc: "The two factors most calculators ignore — and the ones that matter most." },
];

  const faqData = [
    {
      q: "How to make money on YouTube?",
      a: "Join the YouTube Partner Program (requires 1,000 subscribers + 4,000 watch hours or 10M Shorts views), then monetize through ads, channel memberships, Super Thanks, and brand sponsorships."
    },
    {
      q: "How much money per 1,000 views on YouTube?",
      a: "On average, creators earn between $1 and $10 per 1,000 views (RPM). Finance and tech channels in the US sit at the top ($8–$15 RPM). Gaming and entertainment in South Asia sit at the bottom ($0.50–$2 RPM)."
    },
    {
      q: "What is YouTube CPM?",
      a: "CPM (Cost Per Mille) is the amount advertisers pay per 1,000 ad impressions. It's the advertiser-facing number. Creators don't receive the full CPM — they receive RPM, which is CPM minus YouTube's 45% share."
    },
    {
      q: "What is YouTube RPM?",
      a: "RPM (Revenue Per Mille) is what a creator actually earns per 1,000 video views after YouTube's revenue share. It is always lower than CPM and is the metric that directly impacts your channel income."
    },
    {
      q: "YouTube se paise kab milte hain? (When does YouTube pay you?)",
      a: "YouTube pays monthly through AdSense once your balance reaches $100. Payments are sent between the 21st and 26th of each month for the previous month's earnings. Indian and Pakistani creators receive payments via wire transfer or check."
    },
    {
      q: "Can this estimate include Shorts revenue?",
      a: "This calculator focuses on long-form video ad revenue. YouTube Shorts monetization uses a different model (Shorts ad pool revenue share) with generally lower RPM. For Shorts, the actual revenue per 1,000 views is typically lower than for regular videos."
    },
    {
      q: "How accurate are these YouTube revenue estimates?",
      a: "Estimates are based on real average CPM and RPM benchmarks across niches and countries. No external tool has access to your YouTube Studio data, so treat these as planning ranges. For exact figures, YouTube Studio Analytics is the only authoritative source."
    },
    {
      q: "How can I increase YouTube earnings?",
      a: "Three high-impact strategies: (1) Shift to a higher-CPM niche like finance or tech; (2) Create content that attracts viewers in Tier-1 countries (US, UK, Canada); (3) Improve average view duration — longer watch time enables more mid-roll ads, increasing RPM."
    },
    {
      q: "How accurate is this YouTube CPM calculator?",
      a: "The calculator uses real 2026 CPM benchmarks by country and niche. Since CPM fluctuates with advertiser demand and seasonality, estimates represent the realistic average range rather than a guaranteed figure. Q4 (October–December) CPMs are typically 30–50% higher due to holiday ad budgets. For exact figures, your YouTube Studio Analytics is the only authoritative source."
    },
    {
      q: "What is the difference between a YouTube revenue estimator and a YouTube income calculator?",
      a: "They are the same concept under different names. Whether called a YouTube revenue estimator, income calculator, earnings calculator, or money calculator — all estimate how much a channel earns from YouTube ad revenue based on views, RPM, and CPM. ChannelIncome's tool goes further by factoring in your content niche and audience geography — the two variables with the biggest real-world impact on earnings."
    }
  ];

  const schemas = {
    app: {
      "@context": "https://schema.org",
      "@type": ["SoftwareApplication", "WebApplication"],
      name: "YouTube Revenue Calculator",
      alternateName: ["YouTube CPM Calculator", "YouTube RPM Estimator", "YouTube Income Estimator", "YouTube Earnings Estimator", "YouTube Money Calculator"],
      url: "https://channelincome.com/tool/youtube-revenue-calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      browserRequirements: "Requires JavaScript. Works on all modern browsers.",
      description: "Free YouTube revenue calculator to estimate channel earnings by channel name, views, CPM, RPM, niche, and audience country. Updated for 2026.",
      featureList: [
        "YouTube RPM estimator by niche",
        "YouTube CPM calculator by country",
        "Channel revenue range calculator",
        "YouTube earnings by channel name lookup",
        "Niche and country comparison tool",
        "AI-powered channel analysis"
      ],
      creator: {
        "@type": "Organization",
        name: "ChannelIncome",
        url: "https://channelincome.com"
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      }
    },

    dataset: {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "YouTube CPM & RPM Rates by Niche and Country (2026)",
      description: "YouTube CPM rates by country and RPM rates by content niche for 2026. Finance: $8–$15 RPM. Technology/AI: $5–$12 RPM. US CPM: $10–$20. UK CPM: $8–$15.",
      url: "https://channelincome.com/tool/youtube-revenue-calculator",
      creator: { "@type": "Organization", name: "ChannelIncome", url: "https://channelincome.com" },
      temporalCoverage: "2026"
    },

    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a
        }
      }))
    },

    howTo: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Calculate YouTube Revenue",
      description: "Use the ChannelIncome YouTube Revenue Calculator to estimate your channel earnings in under 30 seconds.",
      step: [
        { "@type": "HowToStep", position: 1, name: "Enter your monthly views", text: "Type in your average monthly view count. You can find this in YouTube Studio under Analytics > Overview." },
        { "@type": "HowToStep", position: 2, name: "Select your content niche", text: "Choose the category that best describes your content — Finance, Gaming, Education, etc. This sets the RPM range." },
        { "@type": "HowToStep", position: 3, name: "Choose your audience country", text: "Select the country where most of your viewers are based. This adjusts the CPM for that market." },
        { "@type": "HowToStep", position: 4, name: "Get your earnings estimate", text: "The calculator returns a realistic low-to-high monthly and yearly revenue range based on real RPM/CPM data." }
      ]
    },

    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://channelincome.com" },
        { "@type": "ListItem", position: 2, name: "YouTube Revenue Calculator", item: "https://channelincome.com/tool/youtube-revenue-calculator" }
      ]
    }
  };

  return (
  <>
      {/* ── Schemas ── */}
      <Script id="app-schema"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.app) }} />
      <Script id="dataset-schema"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.dataset) }} />
      <Script id="faq-schema"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      <Script id="howto-schema"      type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.howTo) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />

      <main className="min-h-screen bg-background text-foreground">

        {/* ════════════════════════════
            QUICK ANSWER (GEO + AEO)
        ════════════════════════════ */}
        <section
          aria-label="Quick Answer"
          className="bg-secondary border-b border-border px-4 py-4"
        >
          <div className="max-w-4xl mx-auto flex items-start gap-3">
            <span className="flex-shrink-0 text-[11px] font-bold uppercase tracking-widest text-primary mt-0.5"></span>
            <p className="text-xs text-muted leading-relaxed">
              YouTube pays <strong className="text-foreground">$0.50–$10 per 1,000 views (RPM)</strong>. Finance channels in the US earn the most. Gaming and kids content in South Asia earn the least. Enter your views, niche, and country below for a personalized estimate.
            </p>
          </div>
          <div className="max-w-4xl mx-auto mt-2 text-[11px] text-muted">
            Written by Zain Ikram Nawaz, ChannelIncome founder · Rate tables last reviewed July 2026 ·{" "}
            <Link href="/disclaimer" className="underline hover:text-primary">
              Estimates only, not financial or investment advice
            </Link>
          </div>
        </section>

        {/* ════════════════════════════
            HERO — near-black ink bg, red glow
        ════════════════════════════ */}
        <section className="relative bg-ink overflow-hidden px-4 py-14 md:py-20">
          {/* subtle accent glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_50%,rgba(224,32,26,0.28),transparent)]" />

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* eyebrow */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-3 py-1 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] font-medium tracking-widest text-white/70 uppercase">Free Tool · Updated 2026</span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
              YouTube Revenue <br />
              <span className="text-accent">Calculator 2026</span>
            </h1>

            <p className="text-[15px] text-white/70 leading-relaxed max-w-xl mb-8">
              Most calculators give you one number based on views alone — and it's almost always wrong.
              A finance channel with 100,000 views in the US earns 4–5× more than a gaming channel
              with the same views in Pakistan. Ours accounts for niche and audience country,
              so you get an estimate that actually reflects how YouTube ad revenue works.
            </p>

            <Link
              href="#youtube-tool"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover active:scale-95 text-white text-sm font-bold px-6 py-3 rounded-full shadow-lg transition-all"
            >
              <Zap className="w-4 h-4" /> Calculate My Earnings
            </Link>
          </div>
        </section>

        {/* ════════════════════════════
            HOW IT WORKS
        ════════════════════════════ */}
        <section className="bg-background border-y border-border px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-accent mb-2">How it works</p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-4">
              Three inputs. One realistic estimate.
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-8 max-w-2xl">
              The estimate comes from your view count, your content niche, and where your audience is located.
              Select a niche — Finance, Gaming, Education — and the calculator applies the average RPM
              advertisers pay for that category. Select your audience region and it adjusts for CPM
              differences between countries. A viewer in the US generates significantly more ad revenue
              than a viewer in South Asia, even watching the exact same video.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pills.map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-3 bg-secondary border border-border rounded-lg p-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
                    <p className="text-xs text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="youtube-tool" className="bg-secondary border-b border-border">
          <YoutubeAnalyzer seoSections={{ faq: faqData }} />
        </section>


        <section className="bg-background border-b border-border px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-accent mb-2">2026 Rate Data</p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-2">
              YouTube CPM &amp; RPM rates — by niche and country
            </h2>
            <p className="text-sm text-muted mb-8">
              These are the real numbers behind the calculator. Finance content in the US sits at the top.
              Kids content in low-CPM countries sits at the bottom. Everything else falls in between.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Niche table */}
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="bg-primary px-4 py-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-background">RPM by Niche</h3>
                  <span className="text-[11px] text-background/60">2026 averages</span>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left text-[11px] font-semibold text-foreground uppercase tracking-wider px-4 py-2 border-b border-border">Niche</th>
                      <th className="text-right text-[11px] font-semibold text-foreground uppercase tracking-wider px-4 py-2 border-b border-border">Typical RPM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {niches.map(([niche, rpm], i) => (
                      <tr key={niche} className={i % 2 === 0 ? "bg-background" : "bg-secondary"}>
                        <td className="px-4 py-2.5 text-foreground border-b border-border text-xs">{niche}</td>
                        <td className="px-4 py-2.5 text-right font-semibold text-accent border-b border-border text-xs">{rpm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[11px] text-muted px-4 py-2.5 border-t border-border bg-secondary">
                  RPM = revenue after YouTube's 45% share
                </p>
              </div>
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="bg-primary px-4 py-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-background">CPM by Country</h3>
                  <span className="text-[11px] text-background/60">2026 averages</span>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left text-[11px] font-semibold text-foreground uppercase tracking-wider px-4 py-2 border-b border-border">Country / Region</th>
                      <th className="text-right text-[11px] font-semibold text-foreground uppercase tracking-wider px-4 py-2 border-b border-border">Avg CPM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countries.map(([country, cpm], i) => (
                      <tr key={country} className={i % 2 === 0 ? "bg-background" : "bg-secondary"}>
                        <td className="px-4 py-2.5 text-foreground border-b border-border text-xs">{country}</td>
                        <td className="px-4 py-2.5 text-right font-semibold text-accent border-b border-border text-xs">{cpm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[11px] text-muted px-4 py-2.5 border-t border-border bg-secondary">
                  CPM = advertiser cost before YouTube's cut
                </p>
              </div>

            </div>
          </div>
        </section>

        <section className="bg-secondary border-b border-border px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-accent mb-2">Methodology</p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-4">
              How we calculate your estimate
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted leading-relaxed">
              <div className="bg-background border border-border rounded-lg p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">Data Sources</h3>
                <p>Our CPM and RPM benchmarks come from publicly available industry data and cross-niche analysis. Rates are updated periodically to reflect current advertiser spending patterns.</p>
              </div>
              <div className="bg-background border border-border rounded-lg p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">Revenue Formula</h3>
                <p>Estimated earnings = (Monthly Views ÷ 1,000) × RPM. We apply niche and country multipliers based on real-world CPM differences between markets and content categories.</p>
              </div>
              <div className="bg-background border border-border rounded-lg p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">YouTube's Revenue Share</h3>
                <p>YouTube keeps 45% of ad revenue. Creators receive 55%. Our RPM figures already reflect this split, so the range you see is what lands in your AdSense account — not the gross advertiser spend.</p>
              </div>
              <div className="bg-background border border-border rounded-lg p-4">
                <h3 className="text-sm font-semibold text-foreground mb-2">Privacy &amp; Data</h3>
                <p>We don't store your inputs. The calculation runs client-side and nothing is saved to our servers. We only analyze publicly visible channel metrics when you enter a channel URL.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-background px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-accent mb-2">FAQ</p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-2">
              Common questions about YouTube revenue
            </h2>
            <p className="text-sm text-muted mb-8">
              Everything creators ask about YouTube earnings, RPM, CPM, and monetization in 2026.
            </p>

            <FAQ faq={faqData} />

            {/* Accuracy note */}
            <div className="mt-8 flex gap-4 items-start bg-secondary border border-border rounded-lg p-5">
              <span className="text-xl flex-shrink-0 mt-0.5">✅</span>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">A note on accuracy</h3>
                <p className="text-xs text-muted leading-relaxed">
                  No external calculator has access to your actual YouTube Studio data.
                  What this tool does is give you a realistic range based on how ad revenue
                  actually works — factoring in niche and geography, not just views.
                  Use it to compare potential across niches and plan your content strategy.
                  For exact figures, YouTube Studio is the only source. This tool is for
                  informational and planning purposes only — it is not financial, investment,
                  or tax advice.
                </p>
                <div className="flex flex-wrap gap-3 mt-3">
                  <Link
                    href="/guide"
                    className="text-xs font-semibold text-primary hover:opacity-80 transition-opacity"
                  >
                    Read our YouTube growth guides →
                  </Link>
                  <Link
                    href="/disclaimer"
                    className="text-xs font-semibold text-muted hover:text-primary transition-colors"
                  >
                    See full disclaimer →
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <RelatedTools currentSlug="youtube-revenue-calculator" />
            </div>
          </div>
        </section>

      </main>

      <div className="fixed bottom-4 right-4 md:hidden z-50">
        <Link
          href="#youtube-tool"
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold px-5 py-3.5 rounded-full shadow-lg active:scale-95 transition-all tracking-wide"
        >
          <Zap className="w-3.5 h-3.5" /> ESTIMATE NOW
        </Link>
      </div>
    </>
  );
}
