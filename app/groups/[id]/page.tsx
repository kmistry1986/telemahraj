"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const BHAJANS_DATA = [
  { id: "b1", name: "Achyutam Keshavam", meta: "Krishna · requested by Mira", baseVotes: 14 },
  { id: "b2", name: "Shri Ramchandra Kripalu", meta: "Ram · requested by Dev", baseVotes: 11 },
  { id: "b3", name: "Om Jai Jagdish Hare", meta: "Aarti · closing", baseVotes: 9 },
  { id: "b4", name: "Hanuman Chalisa", meta: "Hanuman · group recitation", baseVotes: 8 },
  { id: "b5", name: "Vaishnav Jan To", meta: "Gujarati · new this month", baseVotes: 5 },
];

const PRASAD_DATA = [
  { id: "p1", item: "Kheer (serves 40)", takenBy: "Anjali M." },
  { id: "p2", item: "Fruit platter", takenBy: "" },
  { id: "p3", item: "Dudh pauva", takenBy: "" },
  { id: "p4", item: "Puri and shaak", takenBy: "The Patels" },
  { id: "p5", item: "Paper plates and cups", takenBy: "" },
];

export default function BhajanGroupPage() {
  const [going, setGoing] = useState(false);
  const [votes, setVotes] = useState<Record<string, boolean>>({ b2: true });
  const [claimed, setClaimed] = useState<Record<string, boolean>>({});

  const toggleVote = (id: string) =>
    setVotes(prev => ({ ...prev, [id]: !prev[id] }));

  const toggleClaim = (id: string) =>
    setClaimed(prev => ({ ...prev, [id]: !prev[id] }));

  const bhajans = BHAJANS_DATA
    .map(b => ({
      ...b,
      totalVotes: b.baseVotes + (votes[b.id] ? 1 : 0),
      voted: !!votes[b.id],
    }))
    .sort((a, b) => b.totalVotes - a.totalVotes);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner */}
      <section className="bg-warm-bg">
        <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-wrap gap-6 items-end justify-between">
          <div className="flex flex-col gap-2.5 flex-[1_1_480px]">
            <span className="text-xs font-bold text-brand tracking-widest uppercase">Bhajan group &middot; 42 members</span>
            <h1 className="font-heading text-5xl font-bold tracking-tight">Troy Saturday Satsang</h1>
            <p className="text-slate-900 text-lg m-0">Monthly bhajans hosted at a different member&apos;s home. Everyone brings a dish and a voice.</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button className="h-12 px-5 rounded-full border border-dark text-dark font-bold hover:bg-warm-surface">
              Invite members
            </button>
            <button className="h-12 px-5 rounded-full bg-brand text-white font-bold hover:bg-brand-dark">
              Schedule a bhajan
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-wrap gap-8 items-start">
        {/* Main content */}
        <main className="flex-[999_1_560px] min-w-0 flex flex-col gap-6">
          {/* Next event + RSVP */}
          <section className="border border-warm-border rounded-3xl p-6 flex flex-wrap gap-5 items-center justify-between">
            <div className="flex flex-col gap-1.5 flex-[1_1_320px]">
              <span className="font-bold text-brand">Next bhajan</span>
              <h2 className="font-heading text-2xl font-bold">Sat, Oct 17 &middot; 6:30 PM</h2>
              <span className="text-slate-900">Hosted by the Mehta family &middot; 2145 Long Lake Rd, Troy, MI</span>
              <span className="text-slate-900">{18 + (going ? 1 : 0)} attending in person &middot; Live feed for everyone else</span>
            </div>
            <div className="flex flex-col gap-2.5 min-w-[200px]">
              <button
                onClick={() => setGoing(!going)}
                className={`h-12 rounded-full font-bold ${
                  going
                    ? "bg-green-success text-white"
                    : "bg-brand text-white hover:bg-brand-dark"
                }`}
              >
                {going ? "You are going" : "RSVP"}
              </button>
              <Link
                href="/live/1"
                className="h-12 rounded-full border border-dark text-dark font-bold no-underline flex items-center justify-center hover:bg-warm-surface"
              >
                Join the live feed
              </Link>
            </div>
          </section>

          {/* Bhajan list */}
          <section className="border border-warm-border rounded-3xl p-6 flex flex-col gap-1">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
              <h2 className="font-heading text-2xl font-bold">Bhajan list</h2>
              <span className="text-slate-900 text-sm">Vote to request. Top requests are sung first.</span>
            </div>
            {bhajans.map(b => (
              <div key={b.id} className="flex flex-wrap gap-3 items-center justify-between py-3 border-t border-warm-border first:border-0">
                <div className="flex flex-col gap-0.5 flex-[1_1_260px]">
                  <strong className="text-[17px]">{b.name}</strong>
                  <span className="text-slate-900 text-sm">{b.meta}</span>
                </div>
                <button
                  onClick={() => toggleVote(b.id)}
                  className={`min-w-[96px] h-11 rounded-full font-bold ${
                    b.voted
                      ? "bg-brand text-white"
                      : "border border-warm-muted bg-white text-dark"
                  }`}
                >
                  &#9650; {b.totalVotes}
                </button>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-warm-border">
              <label className="flex-[1_1_260px] flex flex-col gap-1.5 text-sm font-bold">
                Share a new bhajan
                <input type="text" placeholder="Title, plus a link to lyrics or a recording" className="h-11 border border-warm-muted rounded-xl px-3 text-slate-900 font-normal" />
              </label>
              <button className="self-end h-11 px-5 rounded-full border border-dark text-dark font-bold hover:bg-warm-surface">
                Share
              </button>
            </div>
          </section>
        </main>

        {/* Sidebar */}
        <aside className="flex-[1_1_320px] max-w-[400px] flex flex-col gap-5">
          {/* Prasad sign-up */}
          <section className="bg-warm-surface rounded-3xl p-6 flex flex-col gap-1.5">
            <h2 className="font-heading text-xl font-bold mb-1.5">Prasad sign-up</h2>
            {PRASAD_DATA.map(p => {
              const mine = !!claimed[p.id];
              const displayWho = p.takenBy || (mine ? "You" : "Open");
              const isOpen = !p.takenBy && !mine;
              return (
                <div key={p.id} className="flex gap-3 items-center justify-between py-2.5 border-t border-warm-border first:border-0">
                  <div className="flex flex-col gap-0.5">
                    <strong>{p.item}</strong>
                    <span className="text-slate-900 text-sm">{displayWho}</span>
                  </div>
                  {isOpen && (
                    <button
                      onClick={() => toggleClaim(p.id)}
                      className="h-11 px-4 rounded-full border border-dark text-dark font-bold hover:bg-warm-bg"
                    >
                      I&apos;ll bring it
                    </button>
                  )}
                  {mine && (
                    <button
                      onClick={() => toggleClaim(p.id)}
                      className="h-11 px-4 rounded-full bg-green-success text-white font-bold"
                    >
                      Undo
                    </button>
                  )}
                </div>
              );
            })}
            <p className="text-slate-900 text-sm m-0 mt-2">Prasad ideas suggested by the host: kheer, fruit, dudh pauva.</p>
          </section>

          {/* Mandir directory teaser */}
          <section className="border border-warm-border rounded-3xl p-6 flex flex-col gap-2.5">
            <span className="text-xs font-bold tracking-widest uppercase text-brand">Coming soon</span>
            <h2 className="font-heading text-xl font-bold">Mandir directory</h2>
            <p className="text-slate-900 m-0 leading-relaxed">Find mandirs near you, with events posted by verified temple representatives.</p>
          </section>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
