import Link from 'next/link';
import { RITUAL_CATEGORIES, RITUALS } from '@/lib/ritual-data';

const OCCASIONS = RITUAL_CATEGORIES.map(cat => ({
  id: cat.id,
  label: cat.label,
  count: RITUALS[cat.id]?.length ?? 0,
}));

export default function Home() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-32 sm:pt-32 sm:pb-40">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-purple-500/20 text-purple-200 text-sm font-semibold rounded-full border border-purple-400/30">
              ✨ Connect with Certified Mahrajs
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Spiritual Ceremonies, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">On Demand</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Book certified Mahrajs for weddings, housewarmings, and sacred ceremonies. Virtual or in-person. Customized to your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search" className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg hover:bg-gray-100 transition">
              Find a Mahraj
            </Link>
            <Link href="/auth/signup?role=mahraj" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition">
              List Your Services
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 px-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center text-center">
            <div>
              <p className="text-3xl font-bold text-slate-900">1K+</p>
              <p className="text-sm text-gray-600">Mahrajs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">5K+</p>
              <p className="text-sm text-gray-600">Ceremonies</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">4.8★</p>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">USA</p>
              <p className="text-sm text-gray-600">Coverage</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">24h</p>
              <p className="text-sm text-gray-600">Support</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">100%</p>
              <p className="text-sm text-gray-600">Verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ceremonies / Occasions */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Ceremonies for Every Occasion</h2>
            <p className="text-xl text-gray-600">Over 40 Hindu ceremonies across 6 life events</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OCCASIONS.map(occasion => (
              <Link
                key={occasion.id}
                href={`/rituals?category=${occasion.id}`}
                className="group p-6 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50/30 transition no-underline"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">{occasion.label}</h3>
                <p className="text-gray-600">{occasion.count} ceremonies</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/rituals" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition inline-block no-underline">
              Explore the Ritual Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600">Seamless ceremony booking from search to celebration</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🔍',
                title: 'Smart Search',
                desc: 'Filter by location, date, ceremony type, language, and experience level'
              },
              {
                icon: '⭐',
                title: 'Verified Reviews',
                desc: 'Read authentic feedback from past customers. All Mahrajs verified'
              },
              {
                icon: '🎯',
                title: 'Customizable',
                desc: 'Choose ceremony components, pacing, and options that match your vision'
              },
              {
                icon: '💳',
                title: 'Secure Payments',
                desc: 'Safe checkout with PayPal. Instant confirmation to your Mahraj'
              },
              {
                icon: '📱',
                title: 'Virtual or In-Person',
                desc: 'Attend live in your home or virtually via the app'
              },
              {
                icon: '🤝',
                title: 'Direct Communication',
                desc: 'Message your Mahraj directly to discuss ceremony details'
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 border border-gray-200 rounded-xl bg-white hover:border-purple-300 hover:bg-purple-50/30 transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '1', title: 'Search', desc: 'Find mahrajs in your area' },
              { num: '2', title: 'Select', desc: 'Choose ceremony & customize' },
              { num: '3', title: 'Confirm', desc: 'Secure payment & details' },
              { num: '4', title: 'Celebrate', desc: 'Enjoy your ceremony' }
            ].map((step, i) => (
              <div key={i}>
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.num}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Ready to Begin?</h2>
          <p className="text-xl text-gray-600 mb-8">Start your spiritual journey with GODS today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition">
              Explore Mahrajs
            </Link>
            <Link href="/auth/signup" className="px-8 py-4 border-2 border-slate-900 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
