"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { formatMoney } from "@/lib/utils";

// Sample profile data (replace with server fetch in production)
const PROFILE = {
  id: "1",
  display_name: "Pt. Ramesh Shastri",
  title: "Pt.",
  initials: "RS",
  city: "Troy",
  state: "MI",
  languages: ["Gujarati", "Hindi", "Sanskrit", "English"],
  styles: ["Traditional"],
  formats: ["in_person", "virtual"],
  years_experience: 22,
  rating_avg: 4.9,
  rating_count: 127,
  bio: "I grew up in Vadodara and moved to Michigan in 2002. I perform traditional Gujarati and North Indian ceremonies for families across Metro Detroit. I enjoy explaining each step so families, especially younger members, understand the meaning behind our rituals. I am comfortable with both in-person and virtual formats.",
  services: [
    {
      id: "s1", name: "Griha Pravesh", base_price: 25100, duration_minutes: 150, format: "both" as const,
      segments: [
        { id: "sg1", name: "Ganesh Sthapana", duration_minutes: 15, price_cents: 2500, is_required: true, sort_order: 1 },
        { id: "sg2", name: "Navagraha Pooja", duration_minutes: 20, price_cents: 3500, is_required: false, sort_order: 2 },
        { id: "sg3", name: "Vastu Shanti Havan", duration_minutes: 25, price_cents: 4500, is_required: true, sort_order: 3 },
        { id: "sg4", name: "Lakshmi Pooja", duration_minutes: 20, price_cents: 3500, is_required: false, sort_order: 4 },
        { id: "sg5", name: "Griha Pravesh Vidhi", duration_minutes: 15, price_cents: 3000, is_required: true, sort_order: 5 },
        { id: "sg6", name: "Satyanarayan Katha", duration_minutes: 30, price_cents: 4500, is_required: false, sort_order: 6 },
        { id: "sg7", name: "Aarti and Prasad", duration_minutes: 10, price_cents: 1500, is_required: true, sort_order: 7 },
        { id: "sg8", name: "Havan Purnahuti", duration_minutes: 15, price_cents: 2100, is_required: false, sort_order: 8 },
      ],
    },
    { id: "s2", name: "Satyanarayan Katha", base_price: 15100, duration_minutes: 90, format: "both" as const, segments: [] },
    { id: "s3", name: "Namkaran", base_price: 12100, duration_minutes: 60, format: "both" as const, segments: [] },
    { id: "s4", name: "Vivah (full day)", base_price: 67100, duration_minutes: 360, format: "in_person" as const, segments: [] },
    { id: "s5", name: "Shraddh / Besnu", base_price: 15100, duration_minutes: 90, format: "both" as const, segments: [] },
  ],
  reviews: [
    { id: "r1", rating: 5, text: "Pt. Shastri made our griha pravesh so special. He explained every step and our parents were impressed.", tags: ["clear_explanations", "on_time"], user: { full_name: "Priya P." }, created_at: "2024-09-28" },
    { id: "r2", rating: 5, text: "We had the virtual option for our out-of-state family and it worked perfectly. Very professional setup.", tags: ["knowledgeable", "helpful_setup"], user: { full_name: "Ankit S." }, created_at: "2024-09-15" },
    { id: "r3", rating: 4, text: "Very knowledgeable. Took time with our kids and explained things at their level.", tags: ["great_with_kids", "knowledgeable"], user: { full_name: "Neha D." }, created_at: "2024-08-20" },
  ],
  prep_videos: [
    { id: "v1", title: "How to set up your havan kund", duration_seconds: 240 },
    { id: "v2", title: "Griha Pravesh: what to prepare the night before", duration_seconds: 180 },
    { id: "v3", title: "Understanding the Navgraha pooja", duration_seconds: 300 },
  ],
  availability: generateAvailability(),
};

function generateAvailability() {
  const slots = [];
  const now = new Date();
  for (let i = 3; i < 45; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    if (d.getDay() === 0) continue; // no Sundays
    if (Math.random() > 0.6) continue; // random availability
    slots.push({
      date: d.toISOString().split("T")[0],
      time_slots: d.getDay() === 6 ? ["09:00", "10:00", "14:00", "15:00"] : ["10:00", "14:00", "16:00"],
    });
  }
  return slots;
}

export default function MahrajProfilePage() {
  const m = PROFILE;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectedAvail = m.availability.find(a => a.date === selectedDate);

  const reviewBreakdown = {
    knowledge: 4.9,
    communication: 4.8,
    punctuality: 4.9,
    value: 4.7,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

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
                <span>{m.city}, {m.state}</span>
                <span>{m.years_experience} years experience</span>
                <span className="text-amber-rating font-bold">&#9733; {m.rating_avg} ({m.rating_count})</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {m.languages.map(l => (
                  <span key={l} className="bg-warm-surface rounded-full px-3 py-1 text-sm">{l}</span>
                ))}
                {m.formats.map(f => (
                  <span key={f} className="bg-warm-surface rounded-full px-3 py-1 text-sm">
                    {f === "in_person" ? "In person" : "Virtual"}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-slate-900 leading-relaxed">{m.bio}</p>

          {/* Services */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-4">Services and prices</h2>
            <div className="flex flex-col gap-3">
              {m.services.map(s => (
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

          {/* Prep videos */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-4">Preparation videos</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {m.prep_videos.map(v => (
                <div key={v.id} className="border border-warm-border rounded-2xl overflow-hidden">
                  <div className="aspect-video bg-warm-surface flex items-center justify-center text-slate-900 text-sm">[Video]</div>
                  <div className="p-4 flex flex-col gap-1">
                    <strong className="text-sm">{v.title}</strong>
                    <span className="text-slate-900 text-xs">{Math.floor(v.duration_seconds / 60)} min</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section>
            <h2 className="font-heading text-2xl font-bold mb-4">Reviews</h2>
            <div className="grid sm:grid-cols-4 gap-4 mb-6">
              {Object.entries(reviewBreakdown).map(([key, val]) => (
                <div key={key} className="bg-warm-surface rounded-xl p-4 flex flex-col gap-1">
                  <span className="text-sm text-slate-900 capitalize">{key}</span>
                  <strong className="font-heading text-xl">{val}</strong>
                  <div className="h-1.5 bg-warm-border rounded-full overflow-hidden">
                    <div className="h-full bg-amber-rating rounded-full" style={{ width: `${(val / 5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {m.reviews.map(r => (
                <div key={r.id} className="border border-warm-border rounded-2xl p-5 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <strong>{r.user.full_name}</strong>
                    <span className="text-amber-rating font-bold">{"&#9733;".repeat(r.rating)}</span>
                  </div>
                  <p className="text-slate-900 text-sm m-0">{r.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {r.tags.map(t => (
                      <span key={t} className="bg-warm-surface rounded-full px-3 py-1 text-xs text-slate-900">{t.replace(/_/g, " ")}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Availability sidebar */}
        <aside className="lg:w-96 shrink-0 sticky top-6">
          <div className="border border-warm-border rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold">Availability</h2>

            <div className="flex flex-wrap gap-2">
              {m.availability.slice(0, 14).map(a => {
                const d = new Date(a.date + "T00:00:00");
                const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
                const isSelected = selectedDate === a.date;
                return (
                  <button
                    key={a.date}
                    onClick={() => { setSelectedDate(a.date); setSelectedTime(null); }}
                    className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl border text-sm transition-colors ${
                      isSelected
                        ? "bg-brand text-white border-brand"
                        : "bg-white text-dark border-warm-muted hover:border-brand"
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
                  {selectedAvail.time_slots.map(t => {
                    const [h, mi] = t.split(":").map(Number);
                    const label = `${h % 12 || 12}:${String(mi).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
                    const isSelected = selectedTime === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`px-4 py-2 rounded-xl border font-medium transition-colors ${
                          isSelected
                            ? "bg-brand text-white border-brand"
                            : "bg-white text-dark border-warm-muted hover:border-brand"
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
                href={`/book/${m.services[0].id}?date=${selectedDate}&time=${selectedTime}`}
                className="mt-2 py-3.5 rounded-full bg-brand text-white font-bold text-center no-underline hover:bg-brand-dark"
              >
                Continue to booking
              </Link>
            )}
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
