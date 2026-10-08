import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GroupDetail from "@/components/groups/GroupDetail";
import { getBhajanGroupBySlug, getGroupNextEvent, getGroupSongs, getEventPrasadSignups } from "@/lib/queries";
import type { BhajanGroup, BhajanGroupEvent, BhajanSong, PrasadSignup } from "@/types/database";

// Fallback data when Supabase is unreachable
const FALLBACK_GROUP: BhajanGroup = {
  id: "40000000-0000-0000-0000-000000000001",
  name: "Troy Saturday Satsang",
  description: "Monthly bhajans hosted at a different member's home. Everyone brings a dish and a voice.",
  city: "Troy",
  state: "MI",
  member_count: 42,
  frequency: "Monthly",
  languages: ["Gujarati", "Hindi"],
  tags: ["Krishna", "Ram", "Aarti"],
  slug: "troy-saturday-satsang",
  active: true,
  created_by: "00000000-0000-0000-0000-000000000000",
  created_at: "",
};

const FALLBACK_SONGS: BhajanSong[] = [
  { id: "b1", group_id: "", name: "Achyutam Keshavam", deity: "Krishna", meta: "requested by Mira", vote_count: 14, created_at: "" },
  { id: "b2", group_id: "", name: "Shri Ramchandra Kripalu", deity: "Ram", meta: "requested by Dev", vote_count: 11, created_at: "" },
  { id: "b3", group_id: "", name: "Om Jai Jagdish Hare", deity: "Aarti", meta: "closing", vote_count: 9, created_at: "" },
  { id: "b4", group_id: "", name: "Hanuman Chalisa", deity: "Hanuman", meta: "group recitation", vote_count: 8, created_at: "" },
  { id: "b5", group_id: "", name: "Vaishnav Jan To", deity: "Gujarati", meta: "new this month", vote_count: 5, created_at: "" },
];

const FALLBACK_PRASAD: PrasadSignup[] = [
  { id: "p1", event_id: "", item: "Kheer (serves 40)", claimed_name: "Anjali M.", created_at: "" },
  { id: "p2", event_id: "", item: "Fruit platter", created_at: "" },
  { id: "p3", event_id: "", item: "Dudh pauva", created_at: "" },
  { id: "p4", event_id: "", item: "Puri and shaak", claimed_name: "The Patels", created_at: "" },
  { id: "p5", event_id: "", item: "Paper plates and cups", created_at: "" },
];

export default async function BhajanGroupPage({ params }: { params: { id: string } }) {
  let group: BhajanGroup = FALLBACK_GROUP;
  let nextEvent: BhajanGroupEvent | null = null;
  let songs: BhajanSong[] = FALLBACK_SONGS;
  let prasadItems: PrasadSignup[] = FALLBACK_PRASAD;

  try {
    group = await getBhajanGroupBySlug(params.id);

    const [eventResult, songsResult] = await Promise.all([
      getGroupNextEvent(group.id),
      getGroupSongs(group.id),
    ]);

    nextEvent = eventResult;
    songs = songsResult.length > 0 ? songsResult : FALLBACK_SONGS;

    if (nextEvent) {
      prasadItems = await getEventPrasadSignups(nextEvent.id);
    }
  } catch {
    // Use fallback data
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <GroupDetail
        group={group}
        nextEvent={nextEvent}
        songs={songs}
        prasadItems={prasadItems}
      />
      <Footer />
    </div>
  );
}
