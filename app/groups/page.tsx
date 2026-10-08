import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getBhajanGroups } from "@/lib/queries";
import type { BhajanGroup } from "@/types/database";

const SAMPLE_GROUPS: BhajanGroup[] = [
  {
    id: "40000000-0000-0000-0000-000000000001",
    name: "Troy Saturday Satsang",
    city: "Troy",
    state: "MI",
    member_count: 42,
    frequency: "Monthly",
    description: "Monthly bhajans hosted at a different member's home. Everyone brings a dish and a voice.",
    languages: ["Gujarati", "Hindi"],
    tags: ["Krishna", "Ram", "Aarti"],
    slug: "troy-saturday-satsang",
    active: true,
    created_by: "00000000-0000-0000-0000-000000000000",
    created_at: "",
  },
  {
    id: "40000000-0000-0000-0000-000000000002",
    name: "Novi Hanuman Mandal",
    city: "Novi",
    state: "MI",
    member_count: 28,
    frequency: "Every Tuesday",
    description: "Weekly Hanuman Chalisa recitation followed by bhajans and prasad. All ages welcome.",
    languages: ["Hindi", "Sanskrit"],
    tags: ["Hanuman", "Chalisa", "Weekly"],
    slug: "novi-hanuman-mandal",
    active: true,
    created_by: "00000000-0000-0000-0000-000000000000",
    created_at: "",
  },
];

export default async function BhajanGroupsPage() {
  let groups: BhajanGroup[] = [];
  try {
    groups = await getBhajanGroups();
  } catch {
    groups = SAMPLE_GROUPS;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-warm-bg">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <span className="text-xs font-bold text-brand tracking-widest uppercase">Community</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mt-2">Bhajan Groups</h1>
          <p className="text-dark/70 text-lg mt-3 max-w-2xl">
            Find a local satsang, kirtan circle, or study group near you. Join to RSVP for events, vote on bhajans, and sign up for prasad.
          </p>
        </div>
      </section>

      {/* Groups grid */}
      <section className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          <span className="text-dark/60 font-medium">{groups.length} groups near Troy, MI</span>
          <button className="h-10 px-5 rounded-full bg-brand text-white font-bold text-sm hover:bg-brand-dark">
            Start a group
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {groups.map((group) => (
            <Link
              key={group.id}
              href={`/groups/${group.slug || group.id}`}
              className="border border-warm-border rounded-2xl p-6 text-dark no-underline hover:border-brand hover:bg-warm-bg/50 transition-colors flex flex-col gap-3 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading text-xl font-bold group-hover:text-brand-dark transition-colors">{group.name}</h2>
                  <span className="text-sm text-dark/50">
                    {group.city}, {group.state} · {group.member_count} members · {group.frequency || "Monthly"}
                  </span>
                </div>
                <span className="shrink-0 text-3xl">🙏</span>
              </div>

              <p className="text-dark/70 text-sm leading-relaxed m-0">{group.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {(group.tags ?? []).map((tag) => (
                  <span key={tag} className="text-xs font-medium bg-warm-surface text-dark/70 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
                {(group.languages ?? []).map((lang) => (
                  <span key={lang} className="text-xs font-medium bg-brand/10 text-brand-dark px-2.5 py-1 rounded-full">
                    {lang}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-warm-border mt-1">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-brand uppercase tracking-wide">Frequency</span>
                  <span className="text-sm font-medium">{group.frequency || "Monthly"}</span>
                </div>
                <span className="text-xs text-dark/50">{group.member_count} members</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16">
        <div className="bg-warm-surface border border-warm-border rounded-3xl p-10 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-2xl font-bold">Don&apos;t see your group?</h2>
            <p className="text-dark/60 m-0">Start one in minutes. Invite members, schedule events, and manage bhajan lists all in one place.</p>
          </div>
          <button className="px-8 py-4 rounded-full bg-brand text-white font-bold whitespace-nowrap hover:bg-brand-dark">
            Start a bhajan group
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
