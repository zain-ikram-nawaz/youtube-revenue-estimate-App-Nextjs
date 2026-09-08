"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function FAQPage({ faq = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faq || faq.length === 0) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-muted text-sm">
          No FAQs available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-secondary py-10 px-4 rounded-lg">

      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-display text-xl md:text-2xl font-extrabold text-foreground">
            {faq?.title || "Frequently Asked Questions"}
          </h2>

          <p className="text-muted text-xs mt-2">
            Everything you need to know about YouTube revenue estimation
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">

          {faq.map((f, i) => (
            <div
              key={i}
              className="border border-border rounded-lg bg-background transition-all duration-300 hover:border-primary"
            >

              {/* Question */}
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >

                <span className="text-foreground text-sm font-semibold pr-4">
                  {f?.q}
                </span>

                <span
                  className={`text-primary-hover transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>

              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-4 text-muted text-xs leading-relaxed border-t border-border pt-3">
                  {f?.a}
                </div>
              </div>

            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-8 text-center">

          <p className="text-muted text-xs mb-3">
            Still have questions?
          </p>

          <Link
            href="/contact-us"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors shadow-sm"
          >
            Contact Support
          </Link>

        </div>

      </div>
    </div>
  );
}
