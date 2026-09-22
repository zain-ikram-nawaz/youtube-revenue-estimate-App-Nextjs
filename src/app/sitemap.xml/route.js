import { connectDB } from "../lib/db";
import Guide from "../../models/guide";

const BASE_URL = "https://channelincome.com";
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

let cachedSitemap = null;
let lastGenerated = 0;

// Priority map — each page gets its correct priority
const staticPageConfig = [
  { path: "/",                              changefreq: "daily",   priority: "1.0" },
  { path: "/tool/youtube-revenue-calculator", changefreq: "weekly",  priority: "0.9" },
  { path: "/tool/youtube-channel-comparison", changefreq: "weekly",  priority: "0.8" },
  { path: "/tool/youtube-shorts-calculator", changefreq: "weekly",  priority: "0.8" },
  { path: "/tool/youtube-tag-extractor",    changefreq: "weekly",  priority: "0.8" },
  { path: "/tool/tiktok-money-calculator",  changefreq: "weekly",  priority: "0.8" },
  { path: "/guide",                         changefreq: "daily",   priority: "0.8" },
  { path: "/about-us",                      changefreq: "monthly", priority: "0.5" },
  { path: "/contact-us",                    changefreq: "monthly", priority: "0.4" },
  { path: "/privacy-policy",               changefreq: "monthly", priority: "0.3" },
  { path: "/terms-of-service",             changefreq: "monthly", priority: "0.3" },
  { path: "/disclaimer",                   changefreq: "monthly", priority: "0.3" },
];

// Fallback static sitemap (used if DB is down — ensures sitemap never 500s)
function generateStaticSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                     xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  const today = new Date().toISOString().split("T")[0];

  staticPageConfig.forEach(({ path, changefreq, priority }) => {
    sitemap += `<url><loc>${BASE_URL}${path}</loc><lastmod>${today}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
  });

  sitemap += `</urlset>`;
  return sitemap;
}

export async function GET() {
  const now = Date.now();

  // Serve cached sitemap if within 24 hours
  if (cachedSitemap && now - lastGenerated < CACHE_DURATION) {
    return new Response(cachedSitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": `s-maxage=86400, stale-while-revalidate=59`,
      },
    });
  }

  try {
    await connectDB();
    const guides = await Guide.find({ status: "published" }).sort({ updatedAt: -1 }).maxTimeMS(5000);

    // Build XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                       xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

    // Add static pages with correct priorities
    staticPageConfig.forEach(({ path, changefreq, priority }) => {
      sitemap += `<url><loc>${BASE_URL}${path}</loc><lastmod>2026-05-30</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
    });

    // Add dynamic guides
    guides.forEach((guide) => {
      sitemap += `<url><loc>${BASE_URL}/guide/${guide.slug}</loc><lastmod>${guide.updatedAt.toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
    });

    sitemap += `</urlset>`;

    // Cache it
    cachedSitemap = sitemap;
    lastGenerated = now;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": `s-maxage=86400, stale-while-revalidate=59`,
      },
    });
  } catch (error) {
    console.error("Sitemap generation error (serving static fallback):", error);

    // CRITICAL: Return static sitemap instead of 500 — Google never sees an error
    const fallback = generateStaticSitemap();
    cachedSitemap = fallback;
    lastGenerated = now;

    return new Response(fallback, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": `s-maxage=3600, stale-while-revalidate=59`,
      },
    });
  }
}
