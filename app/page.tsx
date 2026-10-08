import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getMahrajs } from "@/lib/queries";

const OCCASIONS = [
  { id: "baby", title: "A baby is born", ceremonies: "Namkaran, Chhathi, Annaprashan" },
  { id: "home", title: "Moving into a new home", ceremonies: "Griha Pravesh, Vastu Shanti" },
  { id: "wedding", title: "Getting married", ceremonies: "Sagai, Haldi, Vivah, Griha Shanti" },
  { id: "business", title: "Starting a business", ceremonies: "Lakshmi Pooja, Ganesh Pooja" },
  { id: "milestone", title: "Birthdays and milestones", ceremonies: "Ayush Homam, Satyanarayan Katha" },
  { id: "remembrance", title: "Remembering a loved one", ceremonies: "Shraddh, Antyeshti guidance" },
];

const FEATURES = [
  { icon: "ð¯", title: "Pick your segments", desc: "Choose which parts of the ceremony to include and skip. See the price update in real time." },
  { icon: "ð", title: "In person or virtual", desc: "Attend in person, join virtually, or both. Family anywhere in the world can watch live." },
  { icon: "ð", title: "Explanations in English", desc: "Toggle real-time English explanations so everyone understands what is happening and why." },
  { icon: "ð¦", title: "Samagri delivered", desc: "Order a complete kit built from your Mahraj's own item list. Arrives before the ceremony." },
];

const STEPS = [
  { title: "Choose a ceremony", desc: "Browse by occasion, or search by date and location." },
  { title: "Find your Mahraj", desc: "Filter by language, style, rating, and availability." },
  { title: "Customize it", desc: "Pick segments, set the pace, choose your language." },
  { title: "Celebrate", desc: "In person, virtually, or both. Samagri kit optional." },
];

const SAMPLE_MAHRAJS = [
  { id: "1", display_name: "Pt. Ramesh Shastri", initials: "RS", city: "Troy", state: "MI", languages: ["Gujarati", "Hindi", "Sanskrit"], rating_avg: 4.9 },
  { id: "2", display_name: "Pt. Vinay Joshi", initials: "VJ", city: "Novi", state: "MI", languages: ["Marathi", "Hindi"], rating_avg: 4.8 },
  { id: "3", display_name: "Sri Srinivas Iyer", initials: "SI", city: "Canton", state: "MI", languages: ["Tamil", "Sanskrit", "English"], rating_avg: 4.7 },
];

export default async function HomePage() {
  let mahrajs: any[] = [];
  try {
    mahrajs = await getMahrajs({ limit: 3 });
  } catch {
    mahrajs = SAMPLE_MAHRAJS;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-warm-bg">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-6">
            <span className="text-sm font-bold tracking-wider uppercase text-brand">
              Poojas made simple, for every generation
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-dark leading-tight">
              Book a Mahraj for any pooja, at home or live on your TV.
            </h1>
            <p className="text-lg text-dark/70 leading-relaxed max-w-lg">
              Choose the ceremony, the language and the pace. Get every item delivered to your door, and understand each step as it happens.
            </p>

            {/* Search form */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-warm-border flex flex-col gap-3 max-w-lg">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-dark/60 uppercase tracking-wide">Ceremony</label>
                  <select className="h-11 px-3 rounded-xl bg-warm-surface text-dark border border-warm-border font-medium text-sm">
                    <option>Griha Pravesh</option>
                    <option>Satyanarayan Katha</option>
                    <option>Vivah</option>
                    <option>Namkaran</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-dark/60 uppercase tracking-wide">City or ZIP</label>
                  <input
                    type="text"
                    defaultValue="Troy, MI 48084"
                    className="h-11 px-3 rounded-xl bg-warm-surface text-dark border border-warm-border text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-dark/60 uppercase tracking-wide">Date</label>
                  <input
                    type="date"
                    defaultValue="2026-11-14"
                    className="h-11 px-3 rounded-xl bg-warm-surface text-dark border border-warm-border text-sm"
                  />
                </div>
              </div>
              <Link
                href="/search"
                className="h-11 rounded-xl bg-brand text-white font-bold flex items-center justify-center gap-2 no-underline hover:bg-brand-dark text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Search
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-dark/60">
              <span>In person or virtual</span>
              <span>Verified, rated Mahrajs</span>
              <span>Samagri shipped home</span>
            </div>
          </div>

          {/* Right column: Live ceremony preview */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="bg-dark rounded-2xl p-6 text-white flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="bg-brand text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Live
                </span>
                <span className="text-sm text-white/70">Gujarati &middot; Explanations on</span>
              </div>
              <div className="aspect-video rounded-xl bg-dark-lighter flex items-center justify-center text-white/30 text-sm">
                {/* Ceremony video placeholder */}
              </div>
              <div>
                <span className="text-sm text-white/60">Now: Step 3 of 7</span>
                <h3 className="font-heading text-2xl font-bold mt-1">Ganesh Sthapana</h3>
                <p className="text-white/70 text-sm mt-2 leading-relaxed">
                  Lord Ganesh is invited first to remove obstacles before the main pooja begins.
                </p>
              </div>
            </div>
            <Link href="/search?format=virtual" className="block mt-4 font-bold text-sm">
              See the virtual ceremony experience
            </Link>
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-heading text-3xl font-bold">What is the occasion?</h2>
            <p className="text-dark/60 mt-2">Not sure which pooja fits? Start with the moment you are celebrating.</p>
          </div>
          <Link href="/rituals" className="font-bold text-sm whitespace-nowrap">Open the full ritual guide</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OCCASIONS.map((occ) => (
            <Link
              key={occ.id}
              href={`/rituals?category=${occ.id}`}
              className="border border-warm-border rounded-2xl p-5 text-dark no-underline hover:border-brand hover:bg-warm-bg transition-colors flex flex-col gap-2"
            >
              <strong className="font-heading text-lg">{occ.title}</strong>
              <span className="text-sm text-dark/50">{occ.ceremonies}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-warm-surface">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <h2 className="font-heading text-3xl font-bold mb-2">Your ceremony, your way</h2>
          <p className="text-dark/70 mb-10 text-lg">Tradition stays intact. You decide how it fits your family.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 flex flex-col gap-3">
                <span className="text-3xl">{f.icon}</span>
                <strong className="font-heading text-lg">{f.title}</strong>
                <span className="text-dark/50 text-sm leading-relaxed">{f.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Mahrajs */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-heading text-3xl font-bold">Mahrajs near you</h2>
          <Link href="/search" className="font-bold text-sm">See all</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {(mahrajs.length ? mahrajs : SAMPLE_MAHRAJS).map((m) => (
            <Link
              key={m.id}
              href={`/mahraj/${m.id}`}
              className="border border-warm-border rounded-2xl p-5 flex gap-4 items-center text-dark no-underline hover:border-brand transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-warm-bg text-brand-dark flex items-center justify-center font-bold text-lg shrink-0">
                {m.initials}
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <strong className="font-heading">{m.display_name}</strong>
                <span className="text-sm text-dark/50">{m.city} &middot; {m.languages?.join(", ")}</span>
              </div>
              <span className="text-amber-rating font-bold whitespace-nowrap">&#9733; {m.rating_avg}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Virtual CTA */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16">
        <div className="bg-dark text-white rounded-3xl p-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 flex flex-col gap-4">
            <span className="text-sm font-bold tracking-wider uppercase text-orange-300">Live and virtual</span>
            <h2 className="font-heading text-3xl font-bold">Join from anywhere</h2>
            <p className="text-white/80">
              Can&apos;t be there in person? Join the live ceremony feed with real-time explanations, step tracking, and family chat.
            </p>
            <Link
              href="/search?format=virtual"
              className="self-start mt-2 px-6 py-3 rounded-full bg-brand text-white font-bold no-underline hover:bg-brand-dark"
            >
              Find virtual ceremonies
            </Link>
          </div>
          <div className="w-full md:w-80 aspect-video rounded-2xl bg-dark-lighter flex items-center justify-center text-white/40 text-sm">
            [Virtual ceremony preview]
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-warm-bg">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <h2 className="font-heading text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {STEPS.map((s, i) => (
              <div key={s.title} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand text-white font-bold flex items-center justify-center text-lg">
                  {i + 1}
                </div>
                <strong className="font-heading text-lg">{s.title}</strong>
                <span className="text-dark/50 text-sm">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mahraj CTA */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="bg-warm-surface border border-warm-border rounded-3xl p-10 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-3xl font-bold">Are you a Mahraj?</h2>
            <p className="text-dark/60 text-lg">Set your own prices, manage bookings, and reach families in your area.</p>
          </div>
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-full bg-brand text-white font-bold no-underline hover:bg-brand-dark whitespace-nowrap"
          >
            Create your profile
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
