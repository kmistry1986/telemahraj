"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const CATEGORIES = [
  { id: "baby", label: "New baby" },
  { id: "home", label: "New home" },
  { id: "wedding", label: "Wedding" },
  { id: "business", label: "New business" },
  { id: "milestone", label: "Milestones" },
  { id: "remembrance", label: "Remembrance" },
];

const CEREMONIES: Record<string, { name: string; duration: string; timing: string; items: string; meaning: string }[]> = {
  baby: [
    { name: "Namkaran", duration: "1 hour", timing: "11th or 12th day after birth", items: "Cradle, new clothes, honey, ghee", meaning: "Naming ceremony. The child receives their formal name through Vedic rites." },
    { name: "Annaprashan", duration: "45 minutes", timing: "6th month", items: "Silver bowl and spoon, kheer, rice", meaning: "First solid food. The baby is fed kheer or rice by the family elder." },
  ],
  home: [
    { name: "Griha Pravesh", duration: "2.5 hours", timing: "Morning, muhurat-based", items: "Kalash, coconut, mango leaves, havan samagri", meaning: "First entry into a new home. Invokes blessings for prosperity and protection." },
    { name: "Vastu Shanti", duration: "2 hours", timing: "Before or after Griha Pravesh", items: "Vastu yantra, grains, colored powders", meaning: "Pacifies the Vastu devtas. Performed to correct or bless the directional energies of the home." },
  ],
  wedding: [
    { name: "Vivah", duration: "4 to 6 hours", timing: "Muhurat-based, often evening", items: "Mandap, sacred fire, garlands, sindoor", meaning: "Full wedding ceremony with pheras around the sacred fire, binding vows, and family blessings." },
    { name: "Griha Shanti", duration: "1.5 hours", timing: "Day after wedding", items: "Kalash, havan samagri, new clothes", meaning: "Post-wedding blessing of the couple's new home and married life." },
  ],
  business: [
    { name: "Lakshmi Ganesh Pooja", duration: "1.5 hours", timing: "Morning, auspicious day", items: "Ganesh and Lakshmi murtis, flowers, sweets", meaning: "Invoking Ganesh to remove obstacles and Lakshmi for prosperity in a new business." },
    { name: "Satyanarayan Katha", duration: "1.5 hours", timing: "Purnima (full moon) preferred", items: "Panchamrut, fruits, tulsi, sapari", meaning: "Devotional katha expressing gratitude and seeking blessings for continued success." },
  ],
  milestone: [
    { name: "Satyanarayan Katha", duration: "1.5 hours", timing: "Purnima (full moon) preferred", items: "Panchamrut, fruits, tulsi, sapari", meaning: "Celebrated for graduations, promotions, anniversaries, and answered prayers." },
    { name: "Ayush Homam", duration: "2 hours", timing: "Birthday, morning", items: "Havan samagri, herbal offerings, ghee", meaning: "A fire ritual invoking longevity and health, often performed on milestone birthdays." },
  ],
  remembrance: [
    { name: "Shraddh", duration: "1.5 hours", timing: "Pitru Paksha or annual tithi", items: "Til, kusha grass, pind ingredients", meaning: "Annual ceremony honoring departed ancestors. Offerings of food and prayers for their peace." },
  ],
};

export default function RitualsPage() {
  const [activeCategory, setActiveCategory] = useState("baby");
  const ceremonies = CEREMONIES[activeCategory] ?? [];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <h1 className="font-heading text-3xl font-bold mb-6">Ritual guide</h1>
          <p className="text-slate-900 text-sm mb-6">Learn about Hindu ceremonies by life event. Each one includes timing, items needed, and meaning.</p>
          <nav className="flex flex-col gap-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-left px-4 py-3 rounded-xl font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-dark text-white font-bold"
                    : "text-dark hover:bg-warm-surface"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 flex flex-col gap-6">
          <h2 className="font-heading text-2xl font-bold capitalize">{CATEGORIES.find(c => c.id === activeCategory)?.label}</h2>
          {ceremonies.map(c => (
            <article key={c.name} className="border border-warm-border rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="font-heading text-xl font-bold">{c.name}</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-brand uppercase tracking-wider">Duration</span>
                  <span className="text-slate-900">{c.duration}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-brand uppercase tracking-wider">Timing</span>
                  <span className="text-slate-900">{c.timing}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-brand uppercase tracking-wider">Key items</span>
                  <span className="text-slate-900">{c.items}</span>
                </div>
              </div>
              <p className="text-slate-900 m-0 leading-relaxed">{c.meaning}</p>
              <Link
                href={`/search?ceremony=${encodeURIComponent(c.name)}`}
                className="self-start px-5 py-2.5 rounded-full bg-brand text-white font-bold no-underline hover:bg-brand-dark"
              >
                Find a Mahraj for {c.name}
              </Link>
            </article>
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
}
