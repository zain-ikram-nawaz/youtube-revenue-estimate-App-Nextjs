// app/page.js (Home Page)
import HomeIntroduction from "../components/SeoText/homeText";
import HomeFAQ from "../components/FAQ/FAQ";
import Link from "next/link";
import { getAllLiveTools } from "../lib/tools";

export const revalidate = 3600;

const TOOLS = getAllLiveTools();

const homeFaqData = [
  {
    q: "How much does YouTube pay per 1,000 views?",
    a: "YouTube pays creators between $0.50 and $10 per 1,000 views (RPM) depending on niche, audience country, and ad engagement. Finance and tech channels in the US typically earn $5–$10 RPM, while entertainment or gaming channels in South Asia may earn $0.50–$2 RPM."
  },
  {
    q: "What is a YouTube RPM estimator?",
    a: "A YouTube RPM estimator is a tool that calculates your Revenue Per Mille — the amount you earn per 1,000 video views after YouTube keeps its 45% share. RPM varies by niche: Finance channels in the US earn $8–$15 RPM, education earns $4–$10, and kids content earns $1–$3. Our calculator estimates your RPM based on your content niche and audience country, giving you a realistic earnings range."
  },
  {
    q: "How do I use a YouTube CPM calculator?",
    a: "To estimate YouTube CPM (Cost Per Mille), select your audience's primary country in our calculator. CPM reflects what advertisers pay per 1,000 ad impressions before YouTube's 45% cut. US audiences command $10–$20 CPM, UK earns $8–$15, India earns $1–$3, and Pakistan earns $0.50–$2. Enter your views, niche, and country to convert CPM into your actual creator earnings."
  },
  {
    q: "Can I calculate YouTube earnings by channel name?",
    a: "Yes. The ChannelIncome tool accepts YouTube channel names, channel URLs, and video URLs — not just raw view counts. Enter any channel name or paste its YouTube URL, and the tool analyzes publicly available data (subscribers, estimated views) combined with RPM benchmarks for your niche and country to estimate realistic monthly and lifetime earnings."
  },
  {
    q: "Can I earn money by watching YouTube videos?",
    a: "YouTube does not pay users for watching videos. Our tool is made for creators who want to estimate their YouTube earnings from content creation and ad revenue."
  },
  {
    q: "When do you start earning money from YouTube?",
    a: "You can start earning after joining the YouTube Partner Program (YPP). Requirements are 1,000 subscribers and either 4,000 watch hours in the past 12 months or 10 million Shorts views. Once approved, ads run on your videos and you receive 55% of ad revenue."
  },
  {
    q: "What is the average income for 1 million YouTube subscribers?",
    a: "A channel with 1 million subscribers can earn between $5,000 and $50,000 per month from ad revenue alone. The wide range depends on upload frequency, niche CPM, and audience location. Many top creators also earn from sponsorships, memberships, and merchandise on top of this."
  },
  {
    q: "What is the difference between CPM and RPM on YouTube?",
    a: "CPM (Cost Per Mille) is what advertisers pay per 1,000 ad impressions — this is the advertiser-side metric. RPM (Revenue Per Mille) is what creators actually earn per 1,000 views after YouTube takes its 45% share. RPM is always lower than CPM and is the number that actually matters for your bank account."
  },
  {
    q: "YouTube se paise kaise milte hain? (How do YouTube payments work?)",
    a: "YouTube payments are processed through AdSense and sent monthly once your balance reaches $100. You earn 55% of the ad revenue generated on your videos. In India and Pakistan, earnings are usually $1–$3 RPM due to lower advertiser CPM rates compared to the US or UK."
  },
  {
    q: "How can I increase my YouTube earnings?",
    a: "Three proven ways: (1) Switch to a higher-CPM niche like finance, tech, or education; (2) Create content targeting Tier-1 audiences in the US, UK, or Canada; (3) Improve watch time — longer watch sessions mean more mid-roll ads, which directly increases RPM."
  },
  {
    q: "How does the YouTube Revenue Calculator work?",
    a: "Enter your estimated monthly views, select your content niche, and choose your audience's primary country. The calculator applies average RPM values for that niche-country combination to generate a realistic low-to-high earnings range. It uses the same revenue logic as YouTube — views × RPM / 1,000."
  },
  {
    q: "Is ChannelIncome free to use?",
    a: "Yes, completely free with no signup required. The YouTube revenue calculator, CPM/RPM tables, and all creator guides are available at no cost."
  },
  {
    q: "How accurate are YouTube revenue estimates?",
    a: "No third-party tool can access your actual YouTube Studio data. Our estimates are based on real CPM/RPM benchmarks across niches and countries, giving you a realistic range rather than a single inflated number. For exact figures, YouTube Studio Analytics is the only accurate source."
  }
];

export const metadata = {
  title: {
    absolute: "YouTube Money Calculator — Free Channel Earnings Estimator 2026",
  },
  description:
    "Check any YouTube channel's earnings instantly. Enter channel name, views & niche to get a real CPM/RPM-based estimate. Free, no signup. Updated for 2026.",
  alternates: {
    canonical: "https://channelincome.com",
  },
  keywords: [
    "youtube revenue calculator",
    "youtube money calculator",
    "youtube earnings calculator",
    "youtube rpm estimator",
    "youtube cpm calculator",
    "youtube income estimator",
    "youtube earnings calculator by channel name",
    "youtube channel earnings calculator",
    "cpm calculator youtube",
  ],
  openGraph: {
    title: "YouTube Money Calculator — Check Any Channel's Earnings Free",
    description:
      "Instant YouTube earnings estimate by channel name, views, niche & country. Real CPM & RPM data. Free, no signup needed.",
    url: "https://channelincome.com",
    type: "website",
    images: [
      {
        url: "https://channelincome.com/icon.png",
        width: 1200,
        height: 630,
        alt: "ChannelIncome Free YouTube Money Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Money Calculator — Check Any Channel's Earnings Free",
    description:
      "Instant YouTube earnings estimate by channel name, views, niche & country. Real CPM & RPM data. Free forever.",
    images: ["https://channelincome.com/icon.png"],
  },
};

// ✅ WebSite Schema with SearchAction (enables Sitelinks Searchbox in Google)
function JsonLdWebSite() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ChannelIncome",
    url: "https://channelincome.com",
    description: "Free YouTube revenue calculator and creator analytics tools.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://channelincome.com/guide?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ✅ SoftwareApplication Schema
function JsonLdApp() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    name: "YouTube Revenue Calculator",
    alternateName: ["YouTube Money Calculator", "YouTube CPM Calculator", "YouTube RPM Estimator", "YouTube Earnings Estimator"],
    operatingSystem: "Web",
    applicationCategory: "FinanceApplication",
    browserRequirements: "Requires JavaScript. Works on all modern browsers.",
    brand: {
      "@type": "Brand",
      name: "ChannelIncome",
    },
    description:
      "Free YouTube revenue calculator to estimate channel earnings by channel name, views, CPM, RPM, niche, and audience country. Updated for 2026.",
    url: "https://channelincome.com/tool/youtube-revenue-calculator",
    featureList: [
      "YouTube RPM estimator by niche",
      "YouTube CPM calculator by country",
      "Earnings range calculator",
      "YouTube earnings by channel name lookup",
      "YouTube income estimator",
      "Niche and country comparison tool"
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "ChannelIncome",
      url: "https://channelincome.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ✅ Dataset Schema (AEO: makes CPM/RPM tables citable by AI)
function JsonLdDataset() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "YouTube CPM & RPM Rates by Niche and Country (2026)",
    description: "Real-world YouTube CPM (Cost Per Mille) rates by country and RPM (Revenue Per Mille) rates by content niche, updated for 2026. Covers 7 niches and 7 countries/regions.",
    url: "https://channelincome.com",
    creator: {
      "@type": "Organization",
      name: "ChannelIncome",
      url: "https://channelincome.com"
    },
    temporalCoverage: "2026",
    variableMeasured: [
      {
        "@type": "PropertyValue",
        name: "RPM by Niche",
        description: "Revenue Per Mille (creator earnings per 1,000 views) segmented by content niche",
        unitText: "USD"
      },
      {
        "@type": "PropertyValue",
        name: "CPM by Country",
        description: "Cost Per Mille (advertiser spend per 1,000 impressions) segmented by audience country",
        unitText: "USD"
      }
    ]
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ✅ FAQ Schema
function JsonLdFAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqData.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

export default async function Home() {
  return (
    <>
      <JsonLdWebSite />
      <JsonLdApp />
      <JsonLdDataset />
      <JsonLdFAQ />

      {/* ── TOOLS GRID (above the fold — internal linking + crawlable content) ── */}
      <section className="bg-background px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-3 tracking-tight leading-tight">
              YouTube Money Calculator — Check Any Channel&apos;s Earnings
            </h1>
            <p className="text-muted text-sm md:text-base max-w-2xl mx-auto">
              Free tools to estimate YouTube revenue, CPM, RPM, and channel earnings by name, niche & country. No signup required.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="group bg-background border border-border rounded-2xl p-5 shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
              >
                <span className="text-2xl block mb-2">{tool.icon}</span>
                <span className="block text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {tool.shortName}
                </span>
                <span className="block text-xs text-muted leading-snug mt-1">
                  {tool.desc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HomeIntroduction />
      <HomeFAQ faq={homeFaqData} />
    </>
  );
}
