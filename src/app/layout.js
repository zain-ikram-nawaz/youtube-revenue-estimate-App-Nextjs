import "./globals.css";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-raw",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta-raw",
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-jbmono-raw",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E0201A",
};

export const metadata = {
  metadataBase: new URL("https://channelincome.com"),
  manifest: "/manifest.json",
  title: {
    default: "ChannelIncome | Free YouTube Revenue & RPM/CPM Tools for Creators",
    template: "%s | ChannelIncome",
  },
  description:
    "Free tools for YouTube creators to estimate revenue, calculate RPM and CPM, and grow their channel. Trusted by creators worldwide.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  verification: {
    google: "ceGH6h4gKdjlKm13KVCK5w3B6H-4X24LNgFnyrGUl44",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  // Global Twitter Card fallback
  twitter: {
    card: "summary_large_image",
    site: "@channelincome",
    creator: "@channelincome",
    images: ["https://channelincome.com/icon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${jbMono.variable}`}>
      <body className="antialiased font-sans">

        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="NIdfnJ32uBKcHx+IqKcQWg"
          strategy="afterInteractive"
        />

        {/* GTM Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'};var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-54N955N7');`,
          }}
        />

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-E89R0241YL" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E89R0241YL');
          `}
        </Script>

        {/* Organization Schema */}
        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ChannelIncome",
              "url": "https://channelincome.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://channelincome.com/icon.png",
                "width": 512,
                "height": 512
              },
              "description": "Free YouTube revenue calculator and creator analytics tools. Estimate CPM, RPM, and channel earnings instantly.",
              "sameAs": ["https://www.youtube.com/@channelincome"],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "support@channelincome.com",
                "contactType": "customer support"
              }
            }),
          }}
        />

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-54N955N7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Navbar />

    <main className="pt-16">
  {children}
</main>

        <Footer />
      </body>
    </html>
  );
}
