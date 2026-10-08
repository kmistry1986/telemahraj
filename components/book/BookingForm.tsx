"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatMoney, calcFee, formatMinutes } from "@/lib/utils";
import { PLATFORM_FEE_PCT } from "@/types/database";
import { createClient } from "@/lib/supabase/client";

export interface BookingSegment {
  id: string;
  name: string;
  duration_minutes: number;
  price_cents: number;
  is_required: boolean;
}

export interface BookingFormProps {
  serviceId: string;
  serviceName: string;
  mahrajName: string;
  mahrajId: string;
  basePrice: number; // cents
  baseDuration: number; // minutes
  languages: string[];
  segments: BookingSegment[];
}

const KIT_PRICE_CENTS = 12900;
const TIME_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "18:00"];

function timeLabel(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

export default function BookingForm({
  serviceId,
  serviceName,
  mahrajName,
  mahrajId,
  basePrice,
  baseDuration,
  languages,
  segments,
}: BookingFormProps) {
  const router = useRouter();
  const hasSegments = segments.length > 0;
  const langOptions = languages.length ? languages : ["English"];
  const today = new Date().toISOString().split("T")[0];

  const [included, setIncluded] = useState<Record<string, boolean>>(
    Object.fromEntries(segments.map((s) => [s.id, true]))
  );
  const [pace, setPace] = useState<"traditional" | "expedited">("traditional");
  const [language, setLanguage] = useState(langOptions[0]);
  const [explanations, setExplanations] = useState(true);
  const [format, setFormat] = useState<"in_person" | "virtual" | "hybrid">("in_person");
  const [addKit, setAddKit] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const activeSegments = segments.filter((s) => included[s.id]);
  const ceremonyPrice = hasSegments ? activeSegments.reduce((sum, s) => sum + s.price_cents, 0) : basePrice;
  const totalMinutes = hasSegments
    ? activeSegments.reduce((sum, s) => sum + s.duration_minutes, 0)
    : baseDuration;
  const adjustedMinutes = pace === "expedited" ? Math.round(totalMinutes * 0.7) : totalMinutes;
  const subtotal = ceremonyPrice + (addKit ? KIT_PRICE_CENTS : 0);
  const platformFeeCents = Math.round(subtotal * PLATFORM_FEE_PCT / 100);
  const totalCents = subtotal + platformFeeCents;
  const { fee } = calcFee(ceremonyPrice);
  const mahrajPayoutCents = ceremonyPrice - fee;

  const needsAddress = format !== "virtual";

  const toggleSegment = (id: string) => {
    const seg = segments.find((s) => s.id === id);
    if (seg?.is_required) return;
    setIncluded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  async function handleConfirm() {
    setError(null);
    if (!date || !time) {
      setError("Please choose a date and time.");
      return;
    }
    if (needsAddress && !address.trim()) {
      setError("Please enter the ceremony address.");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      router.push(`/login?redirect=${encodeURIComponent(`/book/${serviceId}`)}`);
      return;
    }

    const { error: insertError } = await supabase.from("bookings").insert({
      user_id: userData.user.id,
      mahraj_id: mahrajId,
      service_id: serviceId,
      ceremony_date: date,
      ceremony_time: time,
      date,
      time,
      location: format === "virtual" ? "Virtual" : address.trim(),
      address: format === "virtual" ? null : address.trim(),
      virtual: format === "virtual",
      ceremony_type: serviceName,
      language,
      explanations_enabled: explanations,
      format,
      pace,
      total_price: totalCents / 100,
      total_price_cents: totalCents,
      platform_fee_cents: platformFeeCents,
      mahraj_payout_cents: mahrajPayoutCents,
      samagri_kit_added: addKit,
      status: "pending",
    });

    setSubmitting(false);
    if (insertError) {
      setError(insertError.message || "Could not create the booking. Please try again.");
      return;
    }
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl p-10 flex flex-col gap-6 items-start">
          <div className="w-16 h-16 rounded-full bg-green-success text-white flex items-center justify-center text-2xl font-bold">&#10003;</div>
          <h1 className="font-heading text-4xl font-bold">Booking requested</h1>
          <p className="text-slate-900 text-lg m-0">
            Your {serviceName} with {mahrajName} has been requested for {new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {timeLabel(time)}. You will hear back once the Mahraj confirms.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/account" className="px-6 py-3 rounded-full bg-brand text-white font-bold no-underline hover:bg-brand-dark">
              View my bookings
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

        {/* Date, time & location */}
        <section className="border border-warm-border rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="font-heading text-xl font-bold">Date, time & location</h2>
          <div className="flex flex-wrap gap-4">
            <label className="flex flex-col gap-1.5 font-bold text-sm flex-1 min-w-[160px]">
              Date
              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-12 border border-warm-muted rounded-xl px-3 text-slate-900 font-normal"
              />
            </label>
            <label className="flex flex-col gap-1.5 font-bold text-sm flex-1 min-w-[160px]">
              Time
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-12 border border-warm-muted rounded-xl px-3 text-slate-900 font-normal"
              >
                <option value="">Select a time</option>
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>{timeLabel(t)}</option>
                ))}
              </select>
            </label>
          </div>
          {needsAddress && (
            <label className="flex flex-col gap-1.5 font-bold text-sm">
              Ceremony address
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street, city, state"
                className="h-12 border border-warm-muted rounded-xl px-3 text-slate-900 font-normal"
              />
            </label>
          )}
        </section>

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
              <span>{formatMoney(platformFeeCents)}</span>
            </div>
            <div className="flex justify-between border-t border-warm-border pt-3 mt-1">
              <strong>Total</strong>
              <strong className="font-heading text-2xl">{formatMoney(totalCents)}</strong>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-sm text-slate-900">
            <span>Duration: ~{formatMinutes(adjustedMinutes)}{pace === "expedited" ? " (expedited)" : ""}</span>
            <span>Language: {language}{explanations ? " + English explanations" : ""}</span>
            <span>Format: {format === "in_person" ? "In person" : format === "virtual" ? "Virtual" : "In person + virtual"}</span>
          </div>
          {error && <p className="text-red-600 text-sm m-0">{error}</p>}
          <button
            onClick={handleConfirm}
            disabled={submitting}
            className="w-full py-3.5 rounded-full bg-brand text-white font-bold hover:bg-brand-dark disabled:opacity-60"
          >
            {submitting ? "Requesting…" : "Confirm booking"}
          </button>
          <p className="text-slate-900 text-xs m-0 text-center">You will be asked to log in if you have not already.</p>
        </div>
      </aside>
    </div>
  );
}
