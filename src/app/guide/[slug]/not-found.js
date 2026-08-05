import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Guide Not Found",
  robots: { index: false, follow: true },
};

export default function GuideNotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="font-display text-3xl md:text-4xl font-black text-foreground mb-3">
        Guide Not Found
      </h1>
      <p className="text-muted max-w-md mb-8 text-sm leading-relaxed">
        This guide doesn&apos;t exist or may have been moved. Browse our full guide library or jump straight to the calculator.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/guide"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-full transition-colors text-sm"
        >
          <Search className="w-4 h-4" /> Browse All Guides
        </Link>
        <Link
          href="/tool/youtube-revenue-calculator"
          className="inline-flex items-center gap-2 px-6 py-3 bg-secondary border border-border hover:border-primary/40 text-foreground font-bold rounded-full transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Calculator
        </Link>
      </div>
    </div>
  );
}
