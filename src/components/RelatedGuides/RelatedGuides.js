import Image from "next/image";
import Link from "next/link";

export default function RelatedGuides({ guides }) {
  if (!guides?.length) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="font-display text-xl font-black text-foreground mb-5">
        Related Guides
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {guides.map((guide) => (
          <Link
            key={guide._id}
            href={`/guide/${guide.slug}`}
            className="group block bg-secondary border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-sm transition-all"
          >
            <div className="relative h-28 w-full bg-border/30 overflow-hidden">
              <Image
                src={guide.coverImage || guide.thumbnail || "/icon.png"}
                alt={guide.coverImageAlt || guide.title}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-3">
              <p className="text-xs font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {guide.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
