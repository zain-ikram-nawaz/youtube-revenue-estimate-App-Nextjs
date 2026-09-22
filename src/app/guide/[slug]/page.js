import { notFound } from "next/navigation";
import { connectDB } from "../../lib/db";
import Guide from "../../../models/guide";
import Image from "next/image";
import { Clock, Calendar, ArrowLeft, ChevronRight, Tag } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import MarkdownRenderer from "../../../components/MarkdownRenderer/MarkdownRenderer";
import RelatedGuides from "../../../components/RelatedGuides/RelatedGuides";
import RelatedTools from "../../../components/RelatedTools/RelatedTools";
import { getRelatedGuides } from "../../hooks/getRelatedGuides";

export const revalidate = 3600;

// Pre-render known guide slugs at build time for better indexing
export async function generateStaticParams() {
  try {
    await connectDB();
    const guides = await Guide.find({ status: "published" }).select("slug").lean().maxTimeMS(5000);
    return guides.map((g) => ({ slug: g.slug }));
  } catch (e) {
    console.error("generateStaticParams error (returning empty):", e.message);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await connectDB();
  const guide = await Guide.findOne({ slug, status: "published" }).lean();
  if (!guide) notFound();

  const canonicalUrl = `https://channelincome.com/guide/${guide.slug}`;
  const ogImage = guide.coverImage || guide.thumbnail || "https://channelincome.com/icon.png";

  return {
    title: guide.metaTitle || `${guide.title} | ChannelIncome`,
    description: guide.metaDescription || guide.excerpt,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: guide.metaTitle || guide.title,
      description: guide.metaDescription || guide.excerpt,
      url: canonicalUrl,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: guide.coverImageAlt || guide.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.metaTitle || guide.title,
      description: guide.metaDescription || guide.excerpt,
      images: [ogImage],
    },
  };
}

function extractHeadings(markdown = "") {
  const lines = markdown.split("\n");
  const headings = [];
  lines.forEach((line) => {
    const h2 = line.match(/^## (.+)/);
    const h3 = line.match(/^### (.+)/);
    if (h2) headings.push({ level: 2, text: h2[1], id: h2[1].toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") });
    if (h3) headings.push({ level: 3, text: h3[1], id: h3[1].toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") });
  });
  return headings;
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  await connectDB();
  const guide = await Guide.findOne({ slug, status: "published" }).lean();
  if (!guide) notFound();

  const headings = extractHeadings(guide.content || "");
  const coverImage = guide.coverImage || guide.thumbnail;
  const readTime = guide.readTime || Math.max(1, Math.ceil((guide.content || "").split(/\s+/).length / 200));
  const relatedGuides = await getRelatedGuides({
    slug: guide.slug,
    tags: guide.tags || [],
    category: guide.category,
  });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.metaDescription || guide.excerpt,
      image: coverImage || "https://channelincome.com/icon.png",
      author:
        guide.author && guide.author !== "ChannelIncome Team"
          ? { "@type": "Person", name: guide.author }
          : {
              "@type": "Organization",
              name: "ChannelIncome Team",
              url: "https://channelincome.com/about-us",
            },
      publisher: {
        "@type": "Organization",
        name: "ChannelIncome",
        logo: { "@type": "ImageObject", url: "https://channelincome.com/icon.png" },
      },
      datePublished: guide.publishedAt || guide.createdAt,
      dateModified: guide.updatedAt || guide.createdAt,
      mainEntityOfPage: { "@type": "WebPage", "@id": `https://channelincome.com/guide/${guide.slug}` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://channelincome.com" },
        { "@type": "ListItem", position: 2, name: "Guides", item: "https://channelincome.com/guide" },
        { "@type": "ListItem", position: 3, name: guide.title, item: `https://channelincome.com/guide/${guide.slug}` },
      ],
    },
    ...(guide.faqs?.length > 0
      ? [{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: guide.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }]
      : []),
  ];

  return (
    <>
      <Script id="guide-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-background">
        {/* Sticky header */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <nav className="flex items-center gap-2 text-sm text-muted">
              <Link href="/guide" className="hover:text-primary transition font-medium flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Guides
              </Link>
              <ChevronRight className="w-4 h-4 text-border" />
              <span className="text-foreground font-semibold line-clamp-1 hidden sm:block max-w-xs">{guide.title}</span>
            </nav>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-muted">
                <Clock className="w-3.5 h-3.5 text-accent-hover" />
                {readTime} min read
              </div>
              <Link href="/tool/youtube-revenue-calculator"
                className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-full text-xs font-bold transition-colors">
                Calculator →
              </Link>
            </div>
          </div>
        </header>

        {/* Main layout: article + TOC sidebar */}
        <div className="max-w-6xl mx-auto px-4 py-10 flex gap-10">

          {/* Article */}
          <article className="flex-1 min-w-0">
            {/* Category badge */}
            {guide.category && (
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 uppercase tracking-wider">
                  <Tag className="w-3 h-3" /> {guide.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-black text-foreground leading-tight tracking-tight mb-5">
              {guide.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-8">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(guide.publishedAt || guide.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent-hover" />
                {readTime} min read
              </div>
              {guide.author && <span className="font-medium text-muted">By {guide.author}</span>}
              {guide.reviewedBy && (
                <span className="font-medium text-muted">
                  · Reviewed by {guide.reviewedBy}
                  {guide.lastReviewedAt &&
                    ` on ${new Date(guide.lastReviewedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
                </span>
              )}
            </div>

            {/* Excerpt / Quick answer */}
            {guide.excerpt && (
              <div className="mb-8 p-5 bg-secondary border-l-4 border-primary rounded-r-2xl">
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">Quick Answer</p>
                <p className="text-sm text-foreground leading-relaxed">{guide.excerpt}</p>
              </div>
            )}

            {/* Cover Image */}
            {coverImage && (
              <div className="relative w-full aspect-video mb-10 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={coverImage}
                  alt={guide.coverImageAlt || guide.title}
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Markdown Content */}
            {guide.content ? (
              <MarkdownRenderer content={guide.content} />
            ) : (
              guide.blocks?.length > 0 && (
                <p className="text-sm text-gray-400 italic">This is an older guide. Content may render differently.</p>
              )
            )}

            {/* Tags */}
            {guide.tags?.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-xs font-bold text-muted uppercase tracking-widest mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {guide.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-secondary border border-border text-xs font-medium text-muted rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            {guide.faqs?.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl font-black text-foreground mb-6">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {guide.faqs.map((faq, i) => (
                    <details key={i} className="group border border-border rounded-2xl overflow-hidden">
                      <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-foreground hover:bg-secondary list-none text-sm">
                        {faq.question}
                        <span className="text-primary ml-3 shrink-0 group-open:rotate-180 transition-transform text-base">↓</span>
                      </summary>
                      <div className="px-5 pb-5 text-sm text-muted leading-relaxed bg-secondary/50">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            <RelatedGuides guides={relatedGuides} />

            <div className="mt-12">
              <RelatedTools currentSlug="" limit={3} />
            </div>

            {/* CTA */}
            <div className="relative overflow-hidden mt-16 p-8 bg-ink rounded-3xl text-center shadow-xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(224,32,26,0.3),transparent)]" />
              <div className="relative z-10">
                <h3 className="font-display text-xl font-black text-white mb-2">Calculate Your YouTube Earnings</h3>
                <p className="text-white/70 text-sm mb-5 max-w-md mx-auto">
                  Use our free calculator — enter channel name, views, niche &amp; country for an instant revenue estimate.
                </p>
                <Link href="/tool/youtube-revenue-calculator"
                  className="inline-block px-8 py-3 bg-primary text-white font-black rounded-full hover:bg-primary-hover transition-colors shadow-lg text-sm">
                  Open Free Calculator →
                </Link>
              </div>
            </div>
          </article>

          {/* Table of Contents sidebar (desktop only) */}
          {headings.length >= 3 && (
            <aside className="hidden lg:block w-60 shrink-0">
              <div className="sticky top-24">
                <p className="text-xs font-bold text-muted uppercase tracking-widest mb-3">Contents</p>
                <nav className="space-y-1">
                  {headings.map((h, i) => (
                    <a
                      key={i}
                      href={`#${h.id}`}
                      className={`block text-xs text-muted hover:text-primary hover:font-semibold transition py-0.5 truncate ${
                        h.level === 3 ? "pl-3 text-muted/70" : "font-medium"
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
                <div className="mt-6 pt-6 border-t border-border">
                  <Link href="/tool/youtube-revenue-calculator"
                    className="block w-full text-center px-4 py-2.5 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary-hover transition-colors">
                    Revenue Calculator →
                  </Link>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
