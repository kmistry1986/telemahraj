"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { REVIEW_TAGS, DAKSHINA_OPTIONS } from "@/types/database";
import { ratingLabel } from "@/lib/utils";

export default function ReviewPage() {
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<Record<string, boolean>>({ clear_explanations: true, on_time: true });
  const [tipLabel, setTipLabel] = useState("$21");
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (id: string) =>
    setSelectedTags(prev => ({ ...prev, [id]: !prev[id] }));

  if (submitted) {
    return (
      <div className="min-h-screen bg-warm-surface">
        <Header />
        <div className="max-w-[680px] mx-auto px-6 py-12">
          <div className="bg-white rounded-3xl p-10 flex flex-col gap-4 items-start">
            <h1 className="font-heading text-4xl font-bold">Thank you</h1>
            <p className="text-slate-900 text-lg m-0 leading-relaxed">
              Your review is live on Pt. Shastri&apos;s profile. It helps families in your area choose with confidence.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/mahraj/1" className="px-6 py-3.5 rounded-full bg-brand text-white font-bold no-underline hover:bg-brand-dark">
                See the profile
              </Link>
              <Link href="/rituals" className="px-6 py-3.5 rounded-full border border-dark text-dark font-bold no-underline hover:bg-warm-surface">
                Plan your next pooja
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-surface">
      <Header />
      <div className="max-w-[680px] mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-8 flex flex-col gap-7">
          {/* Header */}
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-full bg-warm-bg text-brand flex items-center justify-center font-bold text-xl shrink-0">
              RS
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-heading text-3xl font-bold">How was your Griha Pravesh?</h1>
              <span className="text-slate-900">With Pt. Ramesh Shastri &middot; Sat, Oct 3</span>
            </div>
          </div>

          {/* Stars */}
          <div className="flex flex-col gap-2.5">
            <h2 className="font-heading text-lg font-bold">Overall</h2>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  className={`w-[52px] h-[52px] border-0 bg-transparent text-[40px] leading-none ${
                    n <= rating ? "text-amber-rating" : "text-slate-400"
                  }`}
                >
                  &#9733;
                </button>
              ))}
            </div>
            <span className="font-bold text-slate-900">{ratingLabel(rating)}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2.5">
            <h2 className="font-heading text-lg font-bold">What stood out?</h2>
            <div className="flex flex-wrap gap-2">
              {REVIEW_TAGS.map(t => (
                <button
                  key={t.id}
                  onClick={() => toggleTag(t.id)}
                  className={`px-4 py-2.5 rounded-full font-bold transition-colors ${
                    selectedTags[t.id]
                      ? "bg-dark text-white border border-dark"
                      : "bg-white text-dark border border-warm-muted"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text */}
          <label className="flex flex-col gap-2 font-bold">
            Tell other families about it
            <textarea
              rows={4}
              placeholder="What went well? Anything to know before booking?"
              className="border border-warm-muted rounded-2xl p-3.5 text-slate-900 font-normal resize-y"
            />
          </label>

          {/* Dakshina */}
          <div className="flex flex-col gap-2.5">
            <h2 className="font-heading text-lg font-bold">Add a dakshina (optional)</h2>
            <p className="text-slate-900 text-sm m-0">100% goes to the Mahraj.</p>
            <div className="flex flex-wrap gap-2">
              {DAKSHINA_OPTIONS.map(d => (
                <button
                  key={d.label}
                  onClick={() => setTipLabel(d.label)}
                  className={`min-w-[80px] min-h-[48px] rounded-2xl font-bold transition-colors ${
                    tipLabel === d.label
                      ? "border-2 border-brand bg-warm-bg text-brand-dark"
                      : "border-2 border-warm-border bg-white text-dark"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={() => setSubmitted(true)}
            className="w-full py-4 rounded-2xl bg-brand text-white font-bold text-lg hover:bg-brand-dark"
          >
            Submit review
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
