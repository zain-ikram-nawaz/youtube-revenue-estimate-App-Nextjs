import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page({ data }) {
  const safeData = useMemo(() => {
    if (!data) return [];
    const parsed = JSON.parse(JSON.stringify(data));
    return [...parsed].reverse().slice(0, 12);
  }, [data]);

  if (!data || data?.length === 0) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted">No guides found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {safeData.map((guide) => (
            <div
              key={guide._id}
              className="group bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="relative h-40 w-full bg-secondary overflow-hidden">
                <Image
                  src={guide?.coverImage || guide?.thumbnail || "/icon.png"}
                  alt={guide?.coverImageAlt || guide?.title || "Guide"}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-4">
                <Link href={`/guide/${guide.slug}`}>
                  <h3 className="text-sm font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {guide?.title}
                  </h3>
                </Link>

                <p className="text-xs text-muted mb-4 line-clamp-2">
                  {guide?.metaDescription}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">
                    {new Date(guide?.createdAt).toLocaleDateString("en-GB")}
                  </span>
                  <Link href={`/guide/${guide.slug}`} className="text-xs font-bold text-primary hover:text-primary-hover transition-colors">
                    View Guide →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
