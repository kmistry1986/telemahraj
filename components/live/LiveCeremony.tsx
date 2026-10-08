"use client";

import { useState } from "react";
import Link from "next/link";

export interface LiveStep {
  name: string;
  explain: string;
}

export interface LiveCeremonyProps {
  title: string;
  mahrajName: string;
  reviewHref: string;
  languages: string[];
  steps: LiveStep[];
}

export default function LiveCeremony({ title, mahrajName, reviewHref, languages, steps }: LiveCeremonyProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [explanations, setExplanations] = useState(true);
  const langOptions = languages.length ? languages : ["English"];
  const [language, setLanguage] = useState(langOptions[0]);

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  return (
    <div className="min-h-screen bg-[#100D1F] text-white">
      {/* Header */}
      <header className="max-w-[1320px] mx-auto px-6 py-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <Link href="/" className="text-white no-underline font-heading font-bold text-xl">TeleMahraj</Link>
          <span className="bg-red-600 text-white px-3 py-1 rounded-full font-bold text-xs">LIVE</span>
          <span className="text-base">{title} &middot; with {mahrajName}</span>
        </div>
        <div className="flex flex-wrap gap-2.5 items-center">
          <span className="text-sm">Family watching live</span>
          <button className="h-11 px-4 rounded-full border border-white bg-transparent text-white font-bold flex gap-2 items-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/><path d="M3 12a9 9 0 0 1 9 9M3 16a5 5 0 0 1 5 5M3 20h.01"/></svg>
            Cast to TV
          </button>
        </div>
      </header>

      <div className="max-w-[1320px] mx-auto px-6 pb-12 flex flex-wrap gap-6 items-start">
        {/* Main video + controls */}
        <main className="flex-[999_1_640px] min-w-0 flex flex-col gap-4">
          {/* Video */}
          <div className="aspect-video rounded-2xl bg-[#2A2440] relative overflow-hidden flex items-center justify-center">
            <span className="text-base opacity-85">[Live video from the ceremony]</span>
            {step && (
              <div className="absolute left-6 right-6 bottom-6 bg-[#100D1F] rounded-2xl p-5 flex flex-col gap-1.5">
                {explanations ? (
                  <>
                    <div className="text-xs font-bold tracking-widest uppercase text-orange-300">Explanation &middot; {language}</div>
                    <div className="text-xl leading-relaxed">{step.explain}</div>
                  </>
                ) : (
                  <div className="text-lg leading-relaxed">Now performing: {step.name}</div>
                )}
              </div>
            )}
          </div>

          {/* Step info + controls */}
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-slate-300">Step {currentStep + 1} of {steps.length}</span>
              <h1 className="font-heading text-3xl font-bold">{step?.name}</h1>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <label className="flex gap-2 items-center text-sm">
                Language
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="h-11 rounded-xl border border-slate-500 bg-[#100D1F] text-white px-2.5"
                >
                  {langOptions.map((l) => <option key={l}>{l}</option>)}
                </select>
              </label>
              <button
                onClick={() => setExplanations(!explanations)}
                className={`h-11 px-4 rounded-full font-bold ${
                  explanations ? "bg-brand text-white border-0" : "border border-white bg-transparent text-white"
                }`}
              >
                Explanations {explanations ? "on" : "off"}
              </button>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              className="h-11 px-5 rounded-full border border-white bg-transparent text-white font-bold"
            >
              Previous step
            </button>
            <button
              onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
              className="h-11 px-5 rounded-full bg-white text-[#100D1F] font-bold"
            >
              Next step
            </button>
            {isLast && (
              <Link
                href={reviewHref}
                className="h-11 px-5 rounded-full bg-brand text-white font-bold no-underline flex items-center"
              >
                Ceremony complete &middot; Rate {mahrajName}
              </Link>
            )}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="flex-[1_1_320px] max-w-[400px] flex flex-col gap-4">
          {/* Steps list */}
          <section className="bg-[#1E1933] rounded-2xl p-5 flex flex-col gap-1.5">
            <h2 className="font-heading text-xl font-bold mb-2">Ceremony steps</h2>
            {steps.map((s, i) => (
              <button
                key={s.name + i}
                onClick={() => setCurrentStep(i)}
                className={`flex gap-3 items-center text-left min-h-[48px] px-3 py-2 rounded-xl text-white text-base ${
                  i === currentStep ? "bg-brand font-bold" : "bg-transparent"
                }`}
              >
                <span className="w-7 h-7 rounded-full border border-white flex items-center justify-center text-sm font-bold shrink-0">
                  {i + 1}
                </span>
                <span>
                  {s.name}
                  {i < currentStep && " ✓"}
                </span>
              </button>
            ))}
          </section>

          {/* Family chat */}
          <section className="bg-[#1E1933] rounded-2xl p-5 flex flex-col gap-3">
            <h2 className="font-heading text-xl font-bold">Family chat</h2>
            <div className="text-sm leading-relaxed"><strong>Ba (Ahmedabad):</strong> Jai Shri Krishna! Very nice setup.</div>
            <div className="text-sm leading-relaxed"><strong>Kiran (Houston):</strong> Watching on the TV with the kids</div>
            <label className="flex flex-col gap-1.5 text-sm">
              Send a blessing
              <input
                type="text"
                placeholder="Type a message"
                className="h-11 rounded-xl border border-slate-500 bg-[#100D1F] text-white px-3"
              />
            </label>
          </section>
        </aside>
      </div>
    </div>
  );
}
