"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { formatMoney } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "kit", label: "Complete kits" },
  { id: "ess", label: "Essentials" },
  { id: "dec", label: "Decor" },
  { id: "murti", label: "Murtis" },
  { id: "wed", label: "Wedding" },
];

const PRODUCTS = [
  { id: "p1", cat: "ess", name: "Havan samagri, 500 g", note: "Blend of herbs, wood and resins", price: 1400 },
  { id: "p2", cat: "ess", name: "Pure cow ghee, 500 ml", note: "For diyas and havan", price: 1800 },
  { id: "p3", cat: "ess", name: "Kumkum, haldi and chandan set", note: "Three-pack", price: 900 },
  { id: "p4", cat: "dec", name: "Brass diya set of 5", note: "Reusable, polished", price: 2400 },
  { id: "p5", cat: "dec", name: "Toran door hanging", note: "Marigold and mango leaf style", price: 1900 },
  { id: "p6", cat: "kit", name: "Satyanarayan Katha kit", note: "Matched to most Mahraj lists", price: 7900 },
  { id: "p7", cat: "kit", name: "Lakshmi Ganesh Pooja kit", note: "Includes murti pair", price: 9500 },
  { id: "p8", cat: "murti", name: "Ganesh murti, 6 in", note: "Brass", price: 3900 },
];

const KIT_ITEMS = [
  "Copper kalash", "Coconut and mango leaves", "Havan samagri, 500 g", "Pure ghee, 250 ml",
  "Kumkum, haldi, chandan", "Navgraha cloth set", "Diyas and cotton wicks", "Mauli and janoi",
];

export default function ShopContent() {
  const [activeCat, setActiveCat] = useState("all");
  const [cart, setCart] = useState(0);

  const filtered = activeCat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCat);
  const catTitle = activeCat === "all" ? "Popular items" : CATEGORIES.find(c => c.id === activeCat)?.label ?? "";

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero + categories */}
      <section className="max-w-[1200px] mx-auto px-6 pt-10 pb-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-5xl font-bold tracking-tight">Pooja shop</h1>
            <p className="text-slate-900 text-lg mt-2 m-0">Complete kits built from each Mahraj&apos;s own item list, plus everyday essentials. Shipped to your door.</p>
          </div>
          <span className="flex items-center gap-2 font-bold text-lg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.5 11h11L21 7H6.5"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>
            Cart ({cart})
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`px-4 py-2.5 rounded-full font-bold transition-colors ${
                activeCat === c.id
                  ? "bg-dark text-white"
                  : "border border-warm-muted bg-white text-dark hover:border-dark"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured kit */}
      <section className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="bg-warm-bg rounded-3xl p-8 flex flex-wrap gap-8 items-center">
          <div className="flex-1 min-w-[300px] max-w-[420px] aspect-[4/3] rounded-2xl bg-[#F3E3CF] flex items-center justify-center text-brand-dark font-bold">
            [Kit photo]
          </div>
          <div className="flex-1 min-w-[420px] flex flex-col gap-3.5">
            <span className="text-xs font-bold text-brand uppercase tracking-widest">Matched to your booking</span>
            <h2 className="font-heading text-3xl font-bold">Griha Pravesh complete kit</h2>
            <p className="text-slate-900 m-0">Built from Pt. Ramesh Shastri&apos;s item list. Arrives 3 days before your ceremony.</p>
            <ul className="m-0 pl-5 grid grid-cols-2 gap-x-5 gap-y-1.5 text-slate-900">
              {KIT_ITEMS.map(item => <li key={item}>{item}</li>)}
            </ul>
            <div className="flex flex-wrap gap-4 items-center">
              <strong className="font-heading text-3xl">$129</strong>
              <button
                onClick={() => setCart(c => c + 1)}
                className="px-5 py-3.5 rounded-full bg-brand text-white font-bold hover:bg-brand-dark"
              >
                Add kit to cart
              </button>
              <span className="text-slate-900 text-sm">Fresh items like flowers and fruit are not included</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="max-w-[1200px] mx-auto px-6 pt-8 pb-6 flex flex-col gap-5">
        <h2 className="font-heading text-2xl font-bold">{catTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map(p => (
            <article key={p.id} className="border border-warm-border rounded-2xl overflow-hidden flex flex-col">
              <div className="aspect-square bg-warm-surface flex items-center justify-center text-slate-900 text-sm">[Photo]</div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-heading text-lg font-bold">{p.name}</h3>
                <span className="text-slate-900 text-sm">{p.note}</span>
                <div className="flex justify-between items-center mt-auto pt-2">
                  <strong className="text-lg">{formatMoney(p.price)}</strong>
                  <button
                    onClick={() => setCart(c => c + 1)}
                    className="px-4 py-2.5 rounded-full border border-dark text-dark font-bold hover:bg-warm-surface"
                  >
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom banners */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20 grid sm:grid-cols-2 gap-5">
        <div className="border border-dashed border-warm-muted rounded-2xl p-6 flex flex-col gap-2">
          <span className="text-xs font-bold tracking-widest uppercase text-slate-900">Sponsored</span>
          <strong className="text-lg">[Partner ad slot: local sweets shop, florist or caterer]</strong>
          <span className="text-slate-900">Hidden for ad-free members.</span>
        </div>
        <div className="bg-dark text-white rounded-2xl p-6 flex flex-col gap-2">
          <span className="text-xs font-bold tracking-widest uppercase text-orange-300">Coming soon</span>
          <strong className="text-xl">Wedding cards and ceremony printing</strong>
          <span className="text-white/80">Invitations, ceremony programs and mandap signage, plus referrals to trusted wedding planners.</span>
        </div>
      </section>

      <Footer />
    </div>
  );
}
