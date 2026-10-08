"use client";

import { useState } from "react";
import Link from "next/link";
import { formatMoney } from "@/lib/utils";

export interface ProfileService {
  id: string;
  name: string;
  base_price: number;
  duration_minutes: number;
  format: string;
}

export interface ProfileReview {
  id: string;
  rating: number;
  text: string;
  tags: string[];
  user_name: string;
}

export interface ProfileVideo {
  id: string;
  title: string;
  duration_seconds: number;
}

export interface ProfileAvailability {
  date: string;
  time_slots: string[];
}

export interface MahrajProfileData {
  id: string;
  display_name: string;
  initials: string;
  city: string;
  state: string;
  years_experience: number;
  rating_avg: number;
  rating_count: number;
  bio: string;
  languages: string[];
  formats: string[];
  services: ProfileService[];
  reviews: ProfileReview[];
  prep_videos: ProfileVideo[];
  availability: ProfileAvailability[];
}

const TAG_LABELS: Record<string, string> = {
  on_time: "On time",
  clear_explanations: "Clear explanations",
  knowledgeable: "Very knowledgeable",
  great_with_kids: "Great with kids",
  helpful_setup: "Helpful with setup",
  good_value: "Good value",
};

export default function MahrajProfile({ m }: { m: MahrajProfileData }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectedAvail = m.availability.find((a) => a.date === selectedDate);

  // Tag frequency across reviews — real "what families mention" summary
  const tagCounts: Record<string, number> = {};
  m.reviews.forEach((r) => (r.tags ?? []).forEach((t) => (tagCounts[t] = (tagCounts[t] ?? 0) + 1)));
  const topTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  const bookHref = m.services.length ? `/book/${m.services[0].id}` : "/search";

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8 items-start">
      {/* Main content */}
      <main className="flex-1 min-w-0 flex flex-col gap-8">
        {/* Profile header */}
        <div className="flex flex-wrap gap-6 items-start">
          <div className="w-24 h-24 rounded-full bg-warm-bg text-brand-dark flex items-center justify-center font-bold text-3xl shrink-0">
            {m.initials}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <h1 className="font-heading text-4xl font-bold">{m.display_name}</h1>
            <div className="flex flex-wrap gap-4 text-slate-900">
              {m.city && <span>{m.city}, {m.state}</span>}
              {m.years_experience > 0 && <span>{m.years_experience} years experience</span>}
              {m.rating_count > 0 && (
                <span className="text-amber-rating font-bold">&#9733; {m.rating_avg} ({m.rating_count})</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {m.languages.map((l) => (
                <span key={l} className="bg-warm-surface rounded-full px-3 py-1 text-sm">{l}</span>
              ))}
              {m.formats.map((f) => (
                <span key={f} className="bg-warm-surface rounded-full px-3 py-1 text-sm">
                  {f === "in_person" ? "In person" : "Virtual"}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        {m.bio && <p className="text-slate-900 leading-relaxed">{m.bio}</p>}

        {/* Services */}
        {m.services.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-bold mb-4">Services and prices</h2>
            <div className="flex flex-col gap-3">
              {m.services.map((s) => (
                <div key={s.id} className="border border-warm-border rounded-2xl p-5 flex flex-wrap gap-4 justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <strong className="font-heading text-lg">{s.name}</strong>
                    <span className="text-slate-900 text-sm">
                      {Math.floor(s.duration_minutes / 60)}h{s.duration_minutes % 60 ? ` ${s.duration_minutes % 60}m` : ""} &middot;{" "}
                      {s.format === "both" ? "In person or virtual" : s.format === "in_person" ? "In person" : "Virtual"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <strong className="font-heading text-2xl">{formatMoney(s.base_price)}</strong>
                    <Link
                      href={`/book/${s.id}`}
                      className="px-5 py-2.5 rounded-full bg-brand text-white font-bold no-underline hover:bg-brand-dark"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Prep videos */}
        {m.prep_videos.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-bold mb-4">Preparation videos</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {m.prep_videos.map((v) => (
                <div key={v.id} className="border border-warm-border rounded-2xl overflow-hidden">
                  <div className="aspect-video bg-warm-surface flex items-center justify-center text-slate-900 text-sm">[Video]</div>
                  <div className="p-4 flex flex-col gap-1">
                    <strong className="text-sm">{v.title}</strong>
                    <span className="text-slate-900 text-xs">{Math.round(v.duration_seconds / 60)} min</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reviews */}
        {m.reviews.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-bold mb-4">Reviews</h2>
            {topTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {topTags.map(([tag, count]) => (
                  <span key={tag} className="bg-warm-surface rounded-full px-3.5 py-1.5 text-sm text-slate-900">
                    {TAG_LABELS[tag] ?? tag.replace(/_/g, " ")} &middot; {count}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-4">
              {m.reviews.map((r) => (
                <div key={r.id} className="border border-warm-border rounded-2xl p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <strong>{r.user_name}</strong>
                    <span className="text-amber-rating font-bold">{"★".repeat(r.rating)}</span>
                  </div>
                  {r.text && <p className="text-slate-900 text-sm m-0">{r.text}</p>}
                  <div className="flex flex-wrap gap-2">
                    {(r.tags ?? []).map((t) => (
                      <span key={t} className="bg-warm-surface rounded-full px-3 py-1 text-xs text-slate-900">
                        {TAG_LABELS[t] ?? t.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Availability sidebar */}
      <aside className="lg:w-96 shrink-0 sticky top-6">
        <div className="border border-warm-border rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="font-heading text-xl font-bold">Availability</h2>

          {m.availability.length === 0 && (
            <p className="text-slate-900 text-sm m-0">No open dates right now. Check back soon or send a request.</p>
          )}

          <div className="flex flex-wrap gap-2">
            {m.availability.slice(0, 14).map((a) => {
              const d = new Date(a.date + "T00:00:00");
              const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
              const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
              const isSelected = selectedDate === a.date;
              return (
                <button
                  key={a.date}
                  onClick={() => {
                    setSelectedDate(a.date);
                    setSelectedTime(null);
                  }}
                  className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl border text-sm transition-colors ${
                    isSelected ? "bg-brand text-white border-brand" : "bg-white text-dark border-warm-muted hover:border-brand"
                  }`}
                >
                  <span className="text-xs">{dayName}</span>
                  <strong>{label}</strong>
                </button>
              );
            })}
          </div>

          {selectedAvail && (
            <div className="flex flex-col gap-3">
              <h3 className="font-heading font-bold text-sm">Available times</h3>
              <div className="flex flex-wrap gap-2">
                {selectedAvail.time_slots.map((t) => {
                  const [h, mi] = t.split(":").map(Number);
                  const label = `${h % 12 || 12}:${String(mi).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
                  const isSelected = selectedTime === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`px-4 py-2 rounded-xl border font-medium transition-colors ${
                        isSelected ? "bg-brand text-white border-brand" : "bg-white text-dark border-warm-muted hover:border-brand"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedDate && selectedTime && (
            <Link
              href={`${bookHref}?date=${selectedDate}&time=${selectedTime}`}
              className="mt-2 py-3.5 rounded-full bg-brand text-white font-bold text-center no-underline hover:bg-brand-dark"
            >
              Continue to booking
            </Link>
          )}
        </div>
      </aside>
    </div>
  );
}
