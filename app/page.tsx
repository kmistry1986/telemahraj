import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getMahrajs, getCeremonies } from "@/lib/queries";
import { CEREMONY_CATEGORIES } from "@/types/database";

export default async function HomePage() {
  // In production these pull from Supabase; for now we use fallback data
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
      <section className="bg-dark text-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20 flex flex-col gap-8 items-center text-center">
          <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight max-w-3xl">
            Your traditions, your way.
          </h1>
          <p className="text-lg text-white/80 max-w-xl">
            Find a trusted Mahraj near you, customize your ceremony, and celebrate with your family, in person or virtually.
          </p>

          {/* Search form */}
          <div className="w-full max-w-3xl bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
            <select className="flex-1 h-12 px-4 rounded-xl bg-warm-surface text-slate-900 border-0 font-medium">
              <option value="">Any ceremony</option>
              <option>Griha Pravesh</option>
              <option>Satyanarayan Katha</option>
              <option>Vivah</option>
              <option>Namkaran</option>
            </select>
            <input
              type="text"
              placeholder="City or zip code"
              className="flex-1 h-12 px-4 rounded-xl bg-warm-surface text-slate-900 border-0"
            />
            <input
              type="date"
              className="flex-1 h-12 px-4 rounded-xl bg-warm-surface text-slate-900 border-0"
            />
            <Link
              href="/search"
              className="h-12 px-8 rounded-xl bg-brand text-white font-bold flex items-center justify-center no-underline hover:bg-brand-dark"
            >
              Search
            </Link>
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <h2 className="font-heading text-3xl font-bold mb-8">What is the occasion?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CEREMONY_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/rituals?category=${cat.id}`}
              className="border border-warm-border rounded-2xl p-5 text-dark no-underline font-bold hover:border-brand hover:bg-warm-bg transition-colors min-h-[80px] flex items-end"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-warm-surface">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <h2 className="font-heading text-3xl font-bold mb-4">Your ceremony, your way</h2>
          <p className="text-slate-900 mb-10 text-lg">Every family is different. TeleMahraj puts you in control.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 flex flex-col gap-3">
                <span className="text-3xl">{f.icon}</span>
                <strong className="font-heading text-lg">{f.title}</strong>
                <span className="text-slate-900 text-sm leading-relaxed">{f.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Mahrajs */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-heading text-3xl font-bold">Mahrajs near you</h2>
          <Link href="/search" className="font-bold">See all</Link>
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
                <span className="text-sm text-slate-900">{m.city} &middot; {m.languages?.join(", ")}</span>
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
                <span className="text-slate-900 text-sm">{s.desc}</span>
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
            <p className="text-slate-900 text-lg">Set your own prices, manage bookings, and reach families in your area.</p>
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

// ---- Static data ----

const FEATURES = [
  { icon: "🎯", title: "Pick your segments", desc: "Choose which parts of the ceremony to include and skip. See the price update in real time." },
  { icon: "🌐", title: "In person or virtual", desc: "Attend in person, join virtually, or both. Family anywhere in the world can watch live." },
  { icon: "📖", title: "Explanations in English", desc: "Toggle real-time English explanations so everyone understands what is happening and why." },
  { icon: "📦", title: "Samagri delivered", desc: "Order a complete kit built from your Mahraj's own item list. Arrives before the ceremony." },
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
