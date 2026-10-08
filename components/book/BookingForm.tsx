"use client";

import { useState } from "react";
import Link from "next/link";
import { formatMoney, calcFee, formatMinutes } from "@/lib/utils";
import { PLATFORM_FEE_PCT } from "@/types/database";

export interface BookingSegment {
  id: string;
  name: string;
  duration_minutes: number;
  price_cents: number;
  is_required: boolean;
}

export interface BookingFormProps {
  serviceName: string;
  mahrajName: string;
  mahrajId: string;
  basePrice: number; // cents
  baseDuration: number; // minutes
  languages: string[];
  segments: BookingSegment[];
}

const KIT_PRICE_CENTS = 12900;

export default function BookingForm({
  serviceName,
  mahrajName,
  mahrajId,
  basePrice,
  baseDuration,
  languages,
  segments,
}: BookingFormProps) {
  const hasSegments = segments.length > 0;
  const langOptions = languages.length ? languages : ["English"];

  const [included, setIncluded] = useState<Record<string, boolean>>(
    Object.fromEntries(segments.map((s) => [s.id, true]))
  );
  const [pace, setPace] = useState<"traditional" | "expedited">("traditional");
  const [language, setLanguage] = useState(langOptions[0]);
  const [explanations, setExplanations] = useState(true);
  const [format, setFormat] = useState<"in_person" | "virtual" | "hybrid">("in_person");
  const [addKit, setAddKit] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const activeSegments = segments.filter((s) => included[s.id]);
  const ceremonyPrice = hasSegments ? activeSegments.reduce((sum, s) => sum + s.price_cents, 0) : basePrice;
  const totalMinutes = hasSegments
    ? activeSegments.reduce((sum, s) => sum + s.duration_minutes, 0)
    : baseDuration;
  const adjustedMinutes = pace === "expedited" ? Math.round(totalMinutes * 0.7) : totalMinutes;
  const subtotal = ceremonyPrice + (addKit ? KIT_PRICE_CENTS : 0);
  const { fee } = calcFee(ceremonyPrice);

  const toggleSegment = (id: string) => {
    const seg = segments.find((s) => s.id === id);
    if (seg?.is_required) return;
    setIncluded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (confirmed) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl p-10 flex flex-col gap-6 items-start">
          <div className="w-16 h-16 rounded-full bg-green-success text-white flex items-center justify-center text-2xl font-bold">&#10003;</div>
          <h1 className="font-heading text-4xl font-bold">Booking confirmed</h1>
          <p className="text-slate-900 text-lg m-0">
            Your {serviceName} with {mahrajName} is scheduled. You will receive a confirmation email with
            preparation details and your Mahraj&apos;s setup video.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/mahraj/${mahrajId}`} className="px-6 py-3 rounded-full bg-brand text-white font-bold no-underline hover:bg-brand-dark">
              View Mahraj profile
            </Link>
            <Link href="/" className="px-6 py-3 rounded-full border border-dark text-dark font-bold no-underline hover:bg-warm-surface">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8 items-start">
      <main className="flex-1 min-w-0 flex flex-col gap-8">
        <div>
          <h1 className="font-heading text-3xl font-bold">Customize your {serviceName}</h1>
          <p className="text-slate-900 mt-2 m-0">
            With {mahrajName}
            {hasSegments ? " · Choose segments, set the pace, pick your language." : " · Set the pace, pick your language."}
          </p>
        </div>

        {/* Segments */}
        {hasSegments ? (
          <section className="border border-warm-border rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="font-heading text-xl font-bold">Ceremony segments</h2>
            <p className="text-slate-900 text-sm m-0">Toggle segments on or off. Required segments cannot be removed.</p>
            <div className="flex flex-col gap-3">
              {segments.map((s) => (
                <div key={s.id} className="flex items-center gap-4 py-3 border-t border-warm-border first:border-0">
                  <button
                    onClick={() => toggleSegment(s.id)}
                    disabled={s.is_required}
                    className={`w-11 h-6 rounded-full relative transition-colors ${
                      included[s.id] ? "bg-brand" : "bg-warm-muted"
                    } ${s.is_required ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        included[s.id] ? "left-[22px]" : "left-0.5"
                      }`}
                    />
                  </button>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <strong>{s.name}</strong>
                      {s.is_required && <span className="text-xs text-brand font-bold">Required</span>}
                    </div>
                    <span className="text-slate-900 text-sm">{formatMinutes(s.duration_minutes)}</span>
                  </div>
                  <strong className="text-slate-900">{formatMoney(s.price_cents)}</strong>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="border border-warm-border rounded-2xl p-6 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex flex-col gap-1">
              <h2 className="font-heading text-xl font-bold">{serviceName}</h2>
              <span className="text-slate-900 text-sm">Complete ceremony · {formatMinutes(baseDuration)}</span>
            </div>
            <strong className="font-heading text-2xl">{formatMoney(basePrice)}</strong>
          </section>
        )}

        {/* Pace */}
        <section className="border border-warm-border rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="font-heading text-xl font-bold">Pace</h2>
          <div className="flex gap-3">
            {(["traditional", "expedited"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPace(p)}
                className={`flex-1 py-3 rounded-xl border font-bold transition-colors ${
                  pace === p ? "bg-dark text-white border-dark" : "bg-white text-dark border-warm-muted hover:border-dark"
                }`}
              >
                {p === "traditional" ? "Traditional" : "Expedited (30% shorter)"}
              </button>
            ))}
          </div>
        </section>

        {/* Language */}
        <section className="border border-warm-border rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="font-heading text-xl font-bold">Language and explanations</h2>
          <div className="flex flex-wrap gap-3 items-center">
            <label className="font-bold text-sm">Primary language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="h-11 px-3 rounded-xl border border-warm-muted text-slate-900"
            >
              {langOptions.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <button
              onClick={() => setExplanations(!explanations)}
              className={`w-11 h-6 rounded-full relative transition-colors ${explanations ? "bg-brand" : "bg-warm-muted"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${explanations ? "left-[22px]" : "left-0.5"}`} />
            </button>
            <div className="flex flex-col">
              <strong>English explanations</strong>
              <span className="text-slate-900 text-sm">The Mahraj explains each step in English as it happens</span>
            </div>
          </label>
        </section>

        {/* Format */}
        <section className="border border-warm-border rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="font-heading text-xl font-bold">Attendance format</h2>
          <div className="flex flex-wrap gap-3">
            {([
              { value: "in_person" as const, label: "In person", desc: "Mahraj comes to your home" },
              { value: "virtual" as const, label: "Virtual", desc: "Join via live video feed" },
              { value: "hybrid" as const, label: "Both", desc: "In person + virtual for remote family" },
            ]).map((f) => (
              <button
                key={f.value}
                onClick={() => setFormat(f.value)}
                className={`flex-1 min-w-[140px] py-4 px-4 rounded-xl border text-left transition-colors flex flex-col gap-1 ${
                  format === f.value ? "bg-dark text-white border-dark" : "bg-white text-dark border-warm-muted hover:border-dark"
                }`}
              >
                <strong>{f.label}</strong>
                <span className={`text-sm ${format === f.value ? "text-white/70" : "text-slate-900"}`}>{f.desc}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Samagri kit */}
        <section className="bg-warm-bg border border-warm-border rounded-2xl p-6 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex flex-col gap-2 flex-1">
            <strong className="font-heading text-lg">Add Samagri kit</strong>
            <span className="text-slate-900 text-sm">Complete kit from {mahrajName}&apos;s item list. Delivered 3 days before.</span>
            <span className="text-slate-900 text-xs">Copper kalash, coconut, mango leaves, havan samagri, ghee, kumkum, haldi, navgraha cloth, diyas</span>
          </div>
          <div className="flex items-center gap-4">
            <strong className="font-heading text-2xl">{formatMoney(KIT_PRICE_CENTS)}</strong>
            <button
              onClick={() => setAddKit(!addKit)}
              className={`px-5 py-2.5 rounded-full font-bold transition-colors ${
                addKit ? "bg-green-success text-white" : "border border-dark text-dark hover:bg-warm-surface"
              }`}
            >
              {addKit ? "Added" : "Add kit"}
            </button>
          </div>
        </section>
      </main>

      {/* Price sidebar */}
      <aside className="lg:w-96 shrink-0 sticky top-6">
        <div className="border border-warm-border rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="font-heading text-xl font-bold">Summary</h2>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-900">
                {hasSegments ? `Ceremony (${activeSegments.length} segments)` : "Ceremony"}
              </span>
              <strong>{formatMoney(ceremonyPrice)}</strong>
            </div>
            {addKit && (
              <div className="flex justify-between">
                <span className="text-slate-900">Samagri kit</span>
                <strong>{formatMoney(KIT_PRICE_CENTS)}</strong>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-900">Platform fee ({PLATFORM_FEE_PCT}%)</span>
              <span>{formatMoney(fee)}</span>
            </div>
            <div className="flex justify-between border-t border-warm-border pt-3 mt-1">
              <strong>Total</strong>
              <strong className="font-heading text-2xl">{formatMoney(subtotal + Math.round(subtotal * PLATFORM_FEE_PCT / 100))}</strong>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-sm text-slate-900">
            <span>Duration: ~{formatMinutes(adjustedMinutes)}{pace === "expedited" ? " (expedited)" : ""}</span>
            <span>Language: {language}{explanations ? " + English explanations" : ""}</span>
            <span>Format: {format === "in_person" ? "In person" : format === "virtual" ? "Virtual" : "In person + virtual"}</span>
          </div>
          <button
            onClick={() => setConfirmed(true)}
            className="w-full py-3.5 rounded-full bg-brand text-white font-bold hover:bg-brand-dark"
          >
            Confirm booking
          </button>
        </div>
      </aside>
    </div>
  );
}
