"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { RITUAL_CATEGORIES, RITUALS } from "@/lib/ritual-data";

export default function RitualsPage() {
  const [activeCategory, setActiveCategory] = useState("wedding");
  const [expandedCeremony, setExpandedCeremony] = useState<string | null>(null);
  const ceremonies = RITUALS[activeCategory] ?? [];

  const toggleExpand = (name: string) =>
    setExpandedCeremony(prev => (prev === name ? null : name));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <h1 className="font-heading text-3xl font-bold mb-6">Ritual Guide</h1>
          <p className="text-slate-900 text-sm mb-6">
            Explore over 40 Hindu ceremonies by life event. Each entry includes timing, required items, and the deeper meaning behind the ritual.
          </p>
          <nav className="flex flex-col gap-1">
            {RITUAL_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedCeremony(null);
                }}
                className={`text-left px-4 py-3 rounded-xl font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-dark text-white font-bold"
                    : "text-dark hover:bg-warm-surface"
                }`}
              >
                {cat.label}
                <span className="ml-2 text-sm opacity-60">({RITUALS[cat.id]?.length ?? 0})</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 flex flex-col gap-4">
          <h2 className="font-heading text-2xl font-bold capitalize">
            {RITUAL_CATEGORIES.find(c => c.id === activeCategory)?.label}
          </h2>
          <p className="text-slate-600 mb-2">
            {ceremonies.length} {ceremonies.length === 1 ? "ceremony" : "ceremonies"} in this category. Click any card to learn more.
          </p>
          {ceremonies.map(c => {
            const isExpanded = expandedCeremony === c.name;
            return (
              <article
                key={c.name}
                className="border border-warm-border rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleExpand(c.name)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-warm-surface/50 transition-colors"
                >
                  <div>
                    <h3 className="font-heading text-xl font-bold">{c.name}</h3>
                    <span className="text-sm text-slate-600">{c.duration} &middot; {c.timing}</span>
                  </div>
                  <span className={`text-xl transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                    &#9660;
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 flex flex-col gap-4 border-t border-warm-border pt-4">
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-brand uppercase tracking-wider">Duration</span>
                        <span className="text-slate-900">{c.duration}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-brand uppercase tracking-wider">Timing</span>
                        <span className="text-slate-900">{c.timing}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-brand uppercase tracking-wider">Key Items</span>
                        <span className="text-slate-900">{c.items}</span>
                      </div>
                    </div>
                    <p className="text-slate-900 m-0 leading-relaxed">{c.meaning}</p>
                    <Link
                      href={`/search?ceremony=${encodeURIComponent(c.name)}`}
                      className="self-start px-5 py-2.5 rounded-full bg-brand text-white font-bold no-underline hover:bg-brand-dark"
                    >
                      Find a Mahraj for {c.name}
                    </Link>
                  </div>
                )}
              </article>
            );
          })}
        </main>
      </div>
      <Footer />
    </div>
  );
}
