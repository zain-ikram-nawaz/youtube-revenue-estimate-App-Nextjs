import { NextResponse } from "next/server";

// Redirect old /api/sitemap.xml → new /sitemap.xml
// This ensures Google's cached sitemap URL still resolves
export async function GET() {
  return NextResponse.redirect("https://channelincome.com/sitemap.xml", {
    status: 301,
    headers: {
      "Cache-Control": "public, max-age=86400",
    },
  });
}
