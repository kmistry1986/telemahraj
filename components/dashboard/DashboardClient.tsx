"use client";

import { useState } from "react";
import Link from "next/link";
import { formatMoney, calcFee } from "@/lib/utils";
import { PLATFORM_FEE_PCT } from "@/types/database";

export interface DashboardBooking {
  id: string;
  what: string;
  who: string;
  when: string;
  payoutCents: number;
}

export interface DashboardProps {
  mahrajId: string;
  mahrajName: string;
  rating: number;
  monthEarningsCents: number;
  nextCeremony: string;
  upcoming: DashboardBooking[];
  pending: DashboardBooking[];
  itemListCeremony: string;
  items: string[];
  videoCount: number;
}

const NAV_ITEMS = [
  { label: "Overview", active: true },
  { label: "Bookings" },
  { label: "Services and prices" },
  { label: "Availability" },
  { label: "Item lists" },
  { label: "Videos" },
  { label: "Public profile", key: "profile" },
  { label: "Payouts" },
];

export default function DashboardClient(props: DashboardProps) {
  const [requestState, setRequestState] = useState<"pending" | "accepted" | "declined">("pending");
  const [price, setPrice] = useState(251);

  const request = props.pending[0];
  const feeAmt = Math.round(price * PLATFORM_FEE_PCT) / 100;
  const youGet = price - feeAmt;

  const upcoming =
    requestState === "accepted" && request ? [...props.upcoming, request] : props.upcoming;

  return (
    <div className="min-h-screen bg-warm-surface flex flex-wrap">
      {/* Sidebar nav */}
      <nav className="flex-[1_1_240px] max-w-[260px] bg-dark text-white p-6 flex flex-col gap-1">
        <Link href="/" className="text-white no-underline font-heading font-bold text-xl px-3.5 pb-5">
          TeleMahraj <span className="text-sm font-medium text-orange-300">for Mahrajs</span>
        </Link>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.key === "profile" ? `/mahraj/${props.mahrajId}` : "/dashboard"}
            className={`text-white no-underline px-3.5 py-3 rounded-xl font-medium min-h-[24px] hover:bg-[#2A2440] ${
              item.active ? "bg-[#2A2440] font-bold" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Main content */}
      <main className="flex-[999_1_640px] min-w-0 p-8 flex flex-col gap-6 max-w-[1180px]">
        {/* Greeting */}
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-slate-900">Namaste,</span>
            <h1 className="font-heading text-4xl font-bold">{props.mahrajName}</h1>
          </div>
          <button className="px-5 py-3 rounded-full bg-brand text-white font-bold hover:bg-brand-dark">
            Add a service
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Upcoming ceremonies", value: String(upcoming.length) },
            { label: "Earned this month", value: formatMoney(props.monthEarningsCents) },
            { label: "Rating", value: props.rating > 0 ? `★ ${props.rating}` : "New", color: "text-amber-rating" },
            { label: "Next ceremony", value: props.nextCeremony },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 flex flex-col gap-1.5">
              <span className="text-slate-900">{s.label}</span>
              <strong className={`font-heading text-3xl ${s.color ?? ""}`}>{s.value}</strong>
            </div>
          ))}
        </div>

        {/* Booking request (only if there is a pending request) */}
        {request && (
          requestState === "pending" ? (
            <section className="bg-warm-bg border-2 border-brand rounded-2xl p-6 flex flex-wrap gap-5 items-center justify-between">
              <div className="flex flex-col gap-1.5 flex-[1_1_360px]">
                <span className="text-xs font-bold tracking-widest uppercase text-brand">New request</span>
                <h2 className="font-heading text-2xl font-bold">{request.what} &middot; {request.when}</h2>
                <span className="text-slate-900">{request.who}</span>
                <span className="text-slate-900">
                  You receive <strong className="text-dark">{formatMoney(request.payoutCents)}</strong> after the {PLATFORM_FEE_PCT}% platform fee
                </span>
              </div>
              <div className="flex gap-2.5">
                <button
                  onClick={() => setRequestState("declined")}
                  className="h-12 px-5 rounded-full border border-dark bg-white text-dark font-bold"
                >
                  Decline
                </button>
                <button
                  onClick={() => setRequestState("accepted")}
                  className="h-12 px-5 rounded-full bg-brand text-white font-bold hover:bg-brand-dark"
                >
                  Accept
                </button>
              </div>
            </section>
          ) : (
            <section className={`rounded-2xl px-6 py-5 font-bold ${
              requestState === "accepted" ? "bg-green-100 text-green-900" : "bg-warm-surface text-slate-900"
            }`}>
              {requestState === "accepted"
                ? "Accepted. The family has been notified and their samagri kit is on the way."
                : "Declined. The family will be shown other available Mahrajs."}
            </section>
          )
        )}

        {/* Bookings + Calculator */}
        <div className="flex flex-wrap gap-6 items-start">
          <section className="flex-[999_1_420px] min-w-0 bg-white rounded-2xl p-6 flex flex-col gap-1">
            <h2 className="font-heading text-xl font-bold mb-2.5">Upcoming</h2>
            {upcoming.length === 0 && <p className="text-slate-900 text-sm m-0 py-2">No upcoming ceremonies yet.</p>}
            {upcoming.map((b) => (
              <div key={b.id} className="flex flex-wrap gap-2 justify-between items-center py-3.5 border-t border-warm-border first:border-0">
                <div className="flex flex-col gap-0.5">
                  <strong>{b.what}</strong>
                  <span className="text-slate-900 text-sm">{b.who}</span>
                </div>
                <span className="text-sm font-bold px-3 py-1.5 rounded-full bg-warm-surface">{b.when}</span>
              </div>
            ))}
          </section>

          <section className="flex-[1_1_320px] bg-white rounded-2xl p-6 flex flex-col gap-3.5">
            <h2 className="font-heading text-xl font-bold">Pricing calculator</h2>
            <p className="text-slate-900 text-sm m-0">You set your own prices. See exactly what you keep.</p>
            <label className="flex flex-col gap-1.5 font-bold">
              Your price for a ceremony
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value) || 0)}
                min={0}
                step={1}
                className="h-12 border border-warm-muted rounded-xl px-3 text-slate-900 font-normal"
              />
            </label>
            <div className="flex justify-between text-sm">
              <span>Platform fee ({PLATFORM_FEE_PCT}%)</span>
              <span>${feeAmt.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-warm-border pt-3">
              <strong>You receive</strong>
              <strong className="font-heading text-2xl">${youGet.toFixed(2)}</strong>
            </div>
          </section>
        </div>

        {/* Item list */}
        {props.items.length > 0 && (
          <section className="bg-white rounded-2xl p-6 flex flex-col gap-3.5">
            <div className="flex flex-wrap justify-between gap-3 items-center">
              <h2 className="font-heading text-xl font-bold">Item list: {props.itemListCeremony}</h2>
              <span className="text-slate-900 text-sm">Families can order this as a kit in one tap</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {props.items.map((item) => (
                <span key={item} className="border border-warm-muted rounded-full px-3.5 py-2 text-sm">{item}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="flex-[1_1_260px] flex flex-col gap-1.5 text-sm font-bold">
                Add an item
                <input type="text" placeholder="e.g. Panchamrut ingredients" className="h-11 border border-warm-muted rounded-xl px-3 text-slate-900 font-normal" />
              </label>
              <button className="self-end h-11 px-5 rounded-full border border-dark text-dark font-bold hover:bg-warm-surface">
                Add
              </button>
            </div>
          </section>
        )}

        {/* Videos */}
        <section className="bg-white rounded-2xl p-6 flex flex-wrap gap-5 items-center justify-between">
          <div className="flex flex-col gap-1 flex-[1_1_360px]">
            <h2 className="font-heading text-xl font-bold">Your guidance videos</h2>
            <span className="text-slate-900">{props.videoCount} published &middot; Families who watch setup videos are better prepared on the day.</span>
          </div>
          <button className="h-12 px-5 rounded-full border border-dashed border-dark text-dark font-bold hover:bg-warm-surface">
            Upload a video
          </button>
        </section>
      </main>
    </div>
  );
}
