"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LANGUAGES } from "@/types/database";

export interface MahrajResult {
  id: string;
  display_name: string;
  title: string;
  initials: string;
  city: string;
  state: string;
  languages: string[];
  styles: string[];
  formats: string[];
  rating_avg: number;
  rating_count: number;
  years_experience: number;
  bio: string;
  services: { name: string; base_price: number }[];
}

export default function SearchResults({ mahrajs }: { mahrajs: MahrajResult[] }) {
  const [format, setFormat] = useState("any");
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("rating");
  const [results, setResults] = useState(mahrajs);

  useEffect(() => {
    let filtered = mahrajs.slice();
    if (format !== "any") filtered = filtered.filter((m) => m.formats.includes(format));
    if (selectedLangs.length) filtered = filtered.filter((m) => selectedLangs.some((l) => m.languages.includes(l)));
    if (styles.length) filtered = filtered.filter((m) => styles.some((s) => m.styles.includes(s)));
    if (minRating) filtered = filtered.filter((m) => m.rating_avg >= minRating);

    filtered.sort((a, b) => {
      if (sort === "reviews") return b.rating_count - a.rating_count;
      if (sort === "price") {
        const ap = Math.min(...(a.services.length ? a.services.map((s) => s.base_price) : [Infinity]));
        const bp = Math.min(...(b.services.length ? b.services.map((s) => s.base_price) : [Infinity]));
        return ap - bp;
      }
      return b.rating_avg - a.rating_avg;
    });
    setResults(filtered);
  }, [format, selectedLangs, styles, minRating, sort, mahrajs]);

  const toggleLang = (l: string) =>
    setSelectedLangs((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]));
  const toggleStyle = (s: string) =>
    setStyles((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
      {/* Filters sidebar */}
      <aside className="lg:w-72 shrink-0 flex flex-col gap-6">
        <h1 className="font-heading text-3xl font-bold">Find a Mahraj</h1>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading font-bold">Format</h3>
          {["any", "in_person", "virtual"].map((f) => (
            <label key={f} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                checked={format === f}
                onChange={() => setFormat(f)}
                className="accent-brand"
              />
              <span className="text-slate-900">{f === "any" ? "Any" : f === "in_person" ? "In person" : "Virtual"}</span>
            </label>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading font-bold">Language</h3>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((l) => (
              <button
                key={l}
                onClick={() => toggleLang(l)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  selectedLangs.includes(l)
                    ? "bg-dark text-white border-dark"
                    : "bg-white text-dark border-warm-muted hover:border-dark"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading font-bold">Ceremony style</h3>
          {["Traditional", "Modern", "Arya Samaj"].map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={styles.includes(s)}
                onChange={() => toggleStyle(s)}
                className="accent-brand"
              />
              <span className="text-slate-900">{s}</span>
            </label>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-heading font-bold">Minimum rating</h3>
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="h-11 px-3 rounded-xl border border-warm-muted text-slate-900"
          >
            <option value={0}>Any</option>
            <option value={4}>4+ stars</option>
            <option value={4.5}>4.5+ stars</option>
            <option value={4.8}>4.8+ stars</option>
          </select>
        </div>
      </aside>

      {/* Results */}
      <main className="flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-900">{results.length} Mahraj{results.length !== 1 ? "s" : ""} found</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-10 px-3 rounded-xl border border-warm-muted text-slate-900 text-sm"
          >
            <option value="rating">Highest rated</option>
            <option value="reviews">Most reviewed</option>
            <option value="price">Lowest price</option>
          </select>
        </div>

        {results.map((m) => (
          <Link
            key={m.id}
            href={`/mahraj/${m.id}`}
            className="border border-warm-border rounded-2xl p-5 flex flex-col sm:flex-row gap-4 text-dark no-underline hover:border-brand transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-warm-bg text-brand-dark flex items-center justify-center font-bold text-xl shrink-0">
              {m.initials}
            </div>
            <div className="flex-1 flex flex-col gap-2 min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <strong className="font-heading text-xl">{m.display_name}</strong>
                {m.rating_count > 0 && (
                  <>
                    <span className="text-amber-rating font-bold">&#9733; {m.rating_avg}</span>
                    <span className="text-slate-900 text-sm">({m.rating_count} reviews)</span>
                  </>
                )}
              </div>
              <span className="text-slate-900 text-sm">
                {m.city}, {m.state} &middot; {m.languages.join(", ")} &middot; {m.years_experience} years
              </span>
              <p className="text-slate-900 text-sm m-0 line-clamp-2">{m.bio}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {m.services.slice(0, 3).map((s) => (
                  <span key={s.name} className="bg-warm-surface rounded-full px-3 py-1 text-sm">
                    {s.name} &middot; from ${Math.round(s.base_price / 100)}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}

        {results.length === 0 && (
          <div className="text-center py-16 text-slate-900">
            No Mahrajs match your filters. Try adjusting your criteria.
          </div>
        )}
      </main>
    </div>
  );
}
