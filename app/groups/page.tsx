import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getBhajanGroups } from "@/lib/queries";
import type { BhajanGroup } from "@/types/database";

const SAMPLE_GROUPS: BhajanGroup[] = [
  {
    id: "1", name: "Troy Saturday Satsang", description: "Monthly bhajans hosted at a different member's home. Everyone brings a dish and a voice.",
    city: "Troy", state: "MI", member_count: 42, created_by: "", created_at: "", frequency: "Monthly",
    languages: ["Gujarati", "Hindi"], tags: ["family-friendly", "potluck"], slug: "troy-saturday-satsang", active: true,
  },
  {
    id: "2", name: "Chicago Devotional Circle", description: "Weekly Thursday evening bhajans at the community center. All are welcome.",
    city: "Chicago", state: "IL", member_count: 65, created_by: "", created_at: "", frequency: "Weekly",
    languages: ["Hindi", "Sanskrit"], tags: ["weekly", "open-to-all"], slug: "chicago-devotional-circle", active: true,
  },
  {
    id: "3", name: "Bay Area Krishna Bhajan Mandli", description: "Bi-monthly Krishna bhajans with live harmonium and tabla.",
    city: "Fremont", state: "CA", member_count: 38, created_by: "", created_at: "", frequency: "Bi-monthly",
    languages: ["Gujarati", "Hindi", "English"], tags: ["live-music", "krishna"], slug: "bay-area-krishna-bhajan", active: true,
  },
];

export default async function GroupsPage() {
  let groups: BhajanGroup[];
  try {
    groups = await getBhajanGroups();
    if (!groups.length) groups = SAMPLE_GROUPS;
  } catch {
    groups = SAMPLE_GROUPS;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-4xl font-bold">Bhajan Groups</h1>
            <p className="text-slate-600 mt-2">Find a local satsang community near you</p>
          </div>
          <button className="h-12 px-6 rounded-full bg-brand text-white font-bold hover:bg-brand-dark transition-colors">
            Start a group
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map(group => (
            <Link
              key={group.id}
              href={`/groups/${group.slug ?? group.id}`}
              className="group border border-warm-border rounded-2xl p-6 flex flex-col gap-3 hover:border-purple-300 hover:bg-purple-50/30 transition no-underline"
            >
              <h2 className="font-heading text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                {group.name}
              </h2>
              <p className="text-slate-600 text-sm line-clamp-2">{group.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                <span className="text-xs px-2.5 py-1 bg-warm-surface rounded-full font-medium text-slate-700">
                  {group.city}, {group.state}
                </span>
                <span className="text-xs px-2.5 py-1 bg-warm-surface rounded-full font-medium text-slate-700">
                  {group.member_count} members
                </span>
                {group.frequency && (
                  <span className="text-xs px-2.5 py-1 bg-warm-surface rounded-full font-medium text-slate-700">
                    {group.frequency}
                  </span>
                )}
              </div>
              {group.languages.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {group.languages.map(lang => (
                    <span key={lang} className="text-xs px-2 py-0.5 border border-warm-border rounded-full text-slate-500">
                      {lang}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
