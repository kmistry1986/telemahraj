"use client";

import { useState } from "react";
import Link from "next/link";
import type { BhajanGroup, BhajanGroupEvent, BhajanSong, PrasadSignup } from "@/types/database";

interface GroupDetailProps {
  group: BhajanGroup;
  nextEvent: BhajanGroupEvent | null;
  songs: BhajanSong[];
  prasadItems: PrasadSignup[];
}

export default function GroupDetail({ group, nextEvent, songs, prasadItems }: GroupDetailProps) {
  const [going, setGoing] = useState(false);
  const [votes, setVotes] = useState<Record<string, boolean>>({});
  const [claimed, setClaimed] = useState<Record<string, boolean>>({});

  const toggleVote = (id: string) =>
    setVotes((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleClaim = (id: string) =>
    setClaimed((prev) => ({ ...prev, [id]: !prev[id] }));

  const sortedSongs = songs
    .map((s) => ({
      ...s,
      totalVotes: (s.vote_count ?? 0) + (votes[s.id] ? 1 : 0),
      voted: !!votes[s.id],
    }))
    .sort((a, b) => b.totalVotes - a.totalVotes);

  const formatEventDate = (event: BhajanGroupEvent) => {
    const date = new Date(event.event_date + "T00:00:00");
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dateNum = date.getDate();

    // Format time from HH:MM:SS to readable
    const [h, m] = event.event_time.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const displayTime = `${displayHour}:${m} ${ampm}`;

    return `${day}, ${month} ${dateNum} · ${displayTime}`;
  };

  return (
    <>
      {/* Banner */}
      <section className="bg-warm-bg">
        <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-wrap gap-6 items-end justify-between">
          <div className="flex flex-col gap-2.5 flex-[1_1_480px]">
            <span className="text-xs font-bold text-brand tracking-widest uppercase">
              Bhajan group &middot; {group.member_count} members
            </span>
            <h1 className="font-heading text-5xl font-bold tracking-tight">{group.name}</h1>
            <p className="text-slate-900 text-lg m-0">{group.description}</p>
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
          {nextEvent && (
            <section className="border border-warm-border rounded-3xl p-6 flex flex-wrap gap-5 items-center justify-between">
              <div className="flex flex-col gap-1.5 flex-[1_1_320px]">
                <span className="font-bold text-brand">Next bhajan</span>
                <h2 className="font-heading text-2xl font-bold">{formatEventDate(nextEvent)}</h2>
                <span className="text-slate-900">
                  {nextEvent.host_name ? `Hosted by ${nextEvent.host_name}` : "Host TBD"}
                  {nextEvent.host_address && ` · ${nextEvent.host_address}`}
                  {nextEvent.city && `, ${nextEvent.city}`}
                  {nextEvent.state && `, ${nextEvent.state}`}
                </span>
                <span className="text-slate-900">
                  {(nextEvent.rsvp_count ?? 0) + (going ? 1 : 0)} attending in person
                  {nextEvent.virtual_enabled && " · Live feed for everyone else"}
                </span>
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
                {nextEvent.virtual_enabled && (
                  <Link
                    href="/live/1"
                    className="h-12 rounded-full border border-dark text-dark font-bold no-underline flex items-center justify-center hover:bg-warm-surface"
                  >
                    Join the live feed
                  </Link>
                )}
              </div>
            </section>
          )}

          {/* Bhajan list */}
          <section className="border border-warm-border rounded-3xl p-6 flex flex-col gap-1">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-2">
              <h2 className="font-heading text-2xl font-bold">Bhajan list</h2>
              <span className="text-slate-900 text-sm">Vote to request. Top requests are sung first.</span>
            </div>
            {sortedSongs.map((b) => (
              <div key={b.id} className="flex flex-wrap gap-3 items-center justify-between py-3 border-t border-warm-border first:border-0">
                <div className="flex flex-col gap-0.5 flex-[1_1_260px]">
                  <strong className="text-[17px]">{b.name}</strong>
                  <span className="text-slate-900 text-sm">
                    {[b.deity, b.meta].filter(Boolean).join(" · ")}
                  </span>
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
            {sortedSongs.length === 0 && (
              <p className="text-slate-900 text-sm py-4 text-center">No bhajans added yet. Be the first to share one!</p>
            )}
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
          {prasadItems.length > 0 && (
            <section className="bg-warm-surface rounded-3xl p-6 flex flex-col gap-1.5">
              <h2 className="font-heading text-xl font-bold mb-1.5">Prasad sign-up</h2>
              {prasadItems.map((p) => {
                const mine = !!claimed[p.id];
                const displayWho = p.claimed_name || (mine ? "You" : "Open");
                const isOpen = !p.claimed_by && !p.claimed_name && !mine;
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
            </section>
          )}

          {/* Group info */}
          <section className="border border-warm-border rounded-3xl p-6 flex flex-col gap-2.5">
            <h2 className="font-heading text-xl font-bold">About this group</h2>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-dark/60">Location</span>
                <span className="font-medium">{group.city}, {group.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark/60">Frequency</span>
                <span className="font-medium">{group.frequency || "Monthly"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark/60">Members</span>
                <span className="font-medium">{group.member_count}</span>
              </div>
              {(group.languages ?? []).length > 0 && (
                <div className="flex justify-between">
                  <span className="text-dark/60">Languages</span>
                  <span className="font-medium">{group.languages!.join(", ")}</span>
                </div>
              )}
            </div>
          </section>

          {/* Mandir directory teaser */}
          <section className="border border-warm-border rounded-3xl p-6 flex flex-col gap-2.5">
            <span className="text-xs font-bold tracking-widest uppercase text-brand">Coming soon</span>
            <h2 className="font-heading text-xl font-bold">Mandir directory</h2>
            <p className="text-slate-900 m-0 leading-relaxed">Find mandirs near you, with events posted by verified temple representatives.</p>
          </section>
        </aside>
      </div>
    </>
  );
}
