import TagExtractor from "../../../components/TagExtractor/TagExtractor";
import FAQ from "../../../components/FAQ/FAQ";
import RelatedTools from "../../../components/RelatedTools/RelatedTools";
import Script from "next/script";
import Link from "next/link";
export const revalidate = 3600;

export const metadata = {
  title: "YouTube Tag Extractor & Keyword Generator — Free Tool (2026)",
  description:
    "Extract any YouTube video's tags and get AI-generated keyword suggestions to improve discoverability. Free, instant, no signup.",
  alternates: {
    canonical: "https://channelincome.com/tool/youtube-tag-extractor",
  },
  keywords: [
    "youtube tag extractor",
    "youtube tag generator",
    "youtube keyword extractor",
    "extract youtube video tags",
    "youtube seo keyword tool",
  ],
  openGraph: {
    title: "YouTube Tag Extractor & Keyword Generator | ChannelIncome",
    description: "Extract any YouTube video's tags and get AI-generated keyword suggestions. Free, instant, no signup.",
    url: "https://channelincome.com/tool/youtube-tag-extractor",
    type: "website",
    images: [{ url: "https://channelincome.com/icon.png", width: 1200, height: 630, alt: "YouTube Tag Extractor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Tag Extractor & Keyword Generator",
    description: "Extract any YouTube video's tags and get AI-generated keyword suggestions.",
    images: ["https://channelincome.com/icon.png"],
  },
};

const faqData = [
  {
    q: "How do I extract tags from a YouTube video?",
    a: "Paste the video's URL into the tag extractor. It pulls the video's real tags directly from YouTube's data via the official API — no guessing or scraping involved.",
  },
  {
    q: "What if a video has no visible tags?",
    a: "Some creators leave tags empty, or YouTube doesn't expose them for certain videos. When that happens, our tool generates 15 AI keyword suggestions based on the video's title and description, so you still get usable SEO keywords.",
  },
  {
    q: "Do YouTube tags still matter for SEO in 2026?",
    a: "Tags are a minor ranking signal compared to your title, thumbnail, and audience retention, but they still help YouTube understand context and can support discoverability for close variations of your topic. They're worth setting, just not the highest-leverage lever.",
  },
  {
    q: "Is this tool free to use?",
    a: "Yes, completely free with no signup required.",
  },
];

const schemas = {
  app: {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "WebApplication"],
    name: "YouTube Tag & Keyword Extractor",
    url: "https://channelincome.com/tool/youtube-tag-extractor",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    description: "Free tool to extract a YouTube video's tags and generate AI keyword suggestions.",
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
      { "@type": "ListItem", position: 2, name: "YouTube Tag Extractor", item: "https://channelincome.com/tool/youtube-tag-extractor" },
    ],
  },
};

export default function YouTubeTagExtractorPage() {
  return (
    <>
      <Script id="tags-app-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.app) }} />
      <Script id="tags-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      <Script id="tags-breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />

      <div className="min-h-screen bg-background text-foreground">
        <section aria-label="Quick Answer" className="bg-secondary border-b border-border px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-muted leading-relaxed">
              Paste any YouTube video URL to see its <strong className="text-foreground">real tags</strong> pulled directly from YouTube's data — plus 15 AI-generated keyword suggestions to improve discoverability.
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
              YouTube Tag &amp; <br />
              <span className="text-accent">Keyword Extractor</span>
            </h1>
            <p className="text-[15px] text-white/70 leading-relaxed max-w-xl">
              Real tags, pulled directly from YouTube — plus AI-generated keyword ideas
              when a video's tags are thin or missing entirely.
            </p>
          </div>
        </section>

        {/* ════════════════════════════
            HOW IT WORKS
        ════════════════════════════ */}
        <section className="bg-background border-y border-border px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-accent mb-2">How it works</p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-4">
              Real tags first, AI suggestions as a fallback
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-8 max-w-2xl">
              Paste a video URL and the tool calls YouTube&apos;s official Data API to pull that video&apos;s
              actual tags — the same metadata field creators fill in when uploading. If a video has no tags
              set, or YouTube doesn&apos;t expose them for that video, the tool falls back to generating 15
              keyword suggestions from the video&apos;s title and description instead of returning an empty
              result.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: "Official API, not scraping",
                  desc: "Tags are fetched through YouTube's Data API, which reflects exactly what the uploader entered — no HTML scraping or guesswork involved.",
                },
                {
                  title: "AI fallback when tags are empty",
                  desc: "Some creators skip tags entirely. When that happens, the tool analyzes the title and description to generate 15 relevant keyword suggestions instead.",
                },
                {
                  title: "Tags are a minor signal",
                  desc: "Title, thumbnail, and audience retention drive far more of YouTube's ranking than tags do. Use extracted tags to spot competitor keyword patterns, not as a growth silver bullet.",
                },
                {
                  title: "Works on any public video",
                  desc: "Paste a link to your own upload or a competitor's video — the extractor works the same way for any public YouTube video URL.",
                },
              ].map(({ title, desc }) => (
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

        <TagExtractor />

        <section id="faq" className="bg-background px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-accent mb-2">FAQ</p>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight mb-2">
              Common questions about YouTube tags
            </h2>
            <FAQ faq={faqData} />

            <div className="mt-8">
              <RelatedTools currentSlug="youtube-tag-extractor" />
            </div>

            <div className="mt-6 text-center">
              <Link href="/tool/youtube-revenue-calculator" className="text-primary font-semibold underline text-sm">
                Estimate your channel's earnings →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
