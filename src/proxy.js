import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { connectDB } from "./app/lib/db";
import Guide from "./models/guide";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("ycresttoken")?.value;

  if (pathname.startsWith("/components/")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Block other internal pages
  if (pathname === "/login" || pathname === "/unauthorized" || pathname === "/form") {
    // Agar token hai aur login pe jaana chahte hain
    if (token && pathname === "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    // Baki cases mein allow (unauthorized page dikhana hai)
  }

  const guestBlockedPaths = ["/admin", "/dashboard", "/register"];

  // If no token → Guest
  if (!token) {
    if (guestBlockedPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Guest allowed for other routes
    // We don't return yet (because 404 handling must still run)
  } else {
    // Token present → verify
    try {
      const { payload } = await jwtVerify(token, secret);

      // Only admin can access admin
      if (pathname.startsWith("/admin") && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      // Prevent login/register for logged-in user
      if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (err) {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("ycresttoken");
      return res;
    }
  }

  // Skip static/internal paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Guide detail pages: notFound() inside the page component does not
  // reliably produce a real 404 status under App Router dynamic rendering,
  // so verify slug existence here and rewrite to Next's real /404 when missing.
  const guideSlugMatch = pathname.match(/^\/guide\/([^/]+)\/?$/);
  if (guideSlugMatch) {
    const slug = decodeURIComponent(guideSlugMatch[1]);
    try {
      await connectDB();
      const exists = await Guide.exists({ slug });
      if (!exists) {
        return NextResponse.rewrite(new URL("/404", req.url));
      }
    } catch {
      // DB unreachable — fall through and let the page attempt its own render
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
