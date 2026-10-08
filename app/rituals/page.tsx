"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CATEGORIES, type CeremonyDetail, type Category } from "@/lib/ritual-data";

/* ── Icon map ─────────────────────────────────────────────── */
const ICON_MAP: Record<string, string> = {
  ring: "💍",
  baby: "👶",
  home: "🏠",
  briefcase: "💼",
  star: "⭐",
  flower: "🪷",
};

/* ── Chevron SVG ──────────────────────────────────────────── */
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ── Ceremony Card ────────────────────────────────────────── */
function CeremonyCard({ c }: { c: CeremonyDetail }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="border border-warm-border rounded-2xl overflow-hidden bg-white">
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 sm:p-6 flex items-start gap-4 hover:bg-warm-bg/50 transition-colors cursor-pointer bg-transparent border-0"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h4 className="font-heading text-xl font-bold text-dark m-0">{c.name}</h4>
            {c.sanskrit && c.sanskrit !== c.name && (
              <span className="text-sm text-dark/40 italic">{c.sanskrit}</span>
            )}
          </div>
          <p className="text-dark/60 text-sm mt-2 leading-relaxed m-0">{c.description}</p>

          {/* Quick stats row */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand uppercase tracking-wider">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {c.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand uppercase tracking-wider">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {c.timing}
            </span>
          </div>
        </div>
        <ChevronDown open={open} />
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="border-t border-warm-border p-5 sm:p-6 flex flex-col gap-6 bg-warm-bg/30">
          {/* Significance */}
          <div>
            <h5 className="text-xs font-bold text-brand uppercase tracking-wider mb-2">Why it matters</h5>
            <p className="text-dark/80 text-sm leading-relaxed m-0">{c.significance}</p>
          </div>

          {/* Key Steps */}
          <div>
            <h5 className="text-xs font-bold text-brand uppercase tracking-wider mb-3">Key steps</h5>
            <ol className="list-none m-0 p-0 flex flex-col gap-2">
              {c.keySteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-dark/80 leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-brand/10 text-brand font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Items needed */}
          <div>
            <h5 className="text-xs font-bold text-brand uppercase tracking-wider mb-3">Items needed</h5>
            <div className="flex flex-wrap gap-2">
              {c.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-full bg-white border border-warm-border text-sm text-dark/70 font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Family role */}
          <div>
            <h5 className="text-xs font-bold text-brand uppercase tracking-wider mb-2">Family roles</h5>
            <p className="text-dark/80 text-sm leading-relaxed m-0">{c.familyRole}</p>
          </div>

          {/* Modern note */}
          {c.modernNote && (
            <div className="bg-white rounded-xl p-4 border border-warm-border flex gap-3 items-start">
              <span className="text-lg mt-0.5">💡</span>
              <div>
                <h5 className="text-xs font-bold text-dark/50 uppercase tracking-wider mb-1">Modern note</h5>
                <p className="text-dark/70 text-sm leading-relaxed m-0">{c.modernNote}</p>
              </div>
            </div>
          )}

          {/* CTA */}
          <Link
            href={`/search?ceremony=${encodeURIComponent(c.name)}`}
            className="self-start px-5 py-2.5 rounded-full bg-brand text-white font-bold no-underline hover:bg-brand-dark text-sm"
          >
            Find a Mahraj for {c.name}
          </Link>
        </div>
      )}
    </article>
  );
}

/* ── Main Page ────────────────────────────────────────────── */
export default function RitualsPage() {
  const [activeCategoryId, setActiveCategoryId] = useState(CATEGORIES[0].id);
  const category = CATEGORIES.find((c) => c.id === activeCategoryId) ?? CATEGORIES[0];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page header */}
      <div className="bg-warm-bg border-b border-warm-border">
        <div className="max-w-[1200px] mx-auto px-6 py-10 sm:py-14">
          <h1 className="font-heading text-4xl font-bold text-dark">Ritual guide</h1>
          <p className="text-dark/60 text-lg mt-3 max-w-2xl leading-relaxed">
            Everything you need to know about Hindu ceremonies — what happens, when, why, and what to bring. Pick a life event to explore.
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="border-b border-warm-border sticky top-0 bg-white z-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <nav className="flex gap-1 overflow-x-auto py-2 -mb-px scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`whitespace-nowrap px-4 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer border-0 flex items-center gap-2 ${
                  activeCategoryId === cat.id
                    ? "bg-dark text-white"
                    : "bg-transparent text-dark/60 hover:bg-warm-surface hover:text-dark"
                }`}
              >
                <span>{ICON_MAP[cat.icon] ?? "📿"}</span>
                {cat.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Category content */}
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        {/* Category intro */}
        <div className="max-w-3xl mb-10">
          <h2 className="font-heading text-3xl font-bold text-dark flex items-center gap-3">
            <span className="text-3xl">{ICON_MAP[category.icon] ?? "📿"}</span>
            {category.label}
          </h2>
          <p className="text-dark/60 mt-3 leading-relaxed text-lg">{category.intro}</p>
        </div>

        {/* Sub-sections */}
        <div className="flex flex-col gap-12">
          {category.subSections.map((section) => (
            <section key={section.label}>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-warm-border" />
                <h3 className="font-heading text-lg font-bold text-dark/80 uppercase tracking-wider whitespace-nowrap">
                  {section.label}
                </h3>
                <div className="h-px flex-1 bg-warm-border" />
              </div>

              <div className="flex flex-col gap-4">
                {section.ceremonies.map((c) => (
                  <CeremonyCard key={c.slug} c={c} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-warm-surface border border-warm-border rounded-3xl p-8 sm:p-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-dark">Ready to book a ceremony?</h2>
          <p className="text-dark/60 mt-2 max-w-lg mx-auto">
            Find a trusted Mahraj who speaks your language and understands your family's traditions.
          </p>
          <Link
            href="/search"
            className="inline-flex mt-6 px-8 py-3.5 rounded-full bg-brand text-white font-bold no-underline hover:bg-brand-dark"
          >
            Find a Mahraj
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
