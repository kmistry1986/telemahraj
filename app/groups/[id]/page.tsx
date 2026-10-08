import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GroupDetail from "@/components/groups/GroupDetail";
import {
  getBhajanGroupById,
  getBhajanGroupBySlug,
  getGroupNextEvent,
  getGroupEvents,
  getGroupSongs,
  getEventPrasadSignups,
} from "@/lib/queries";
import type {
  BhajanGroup,
  BhajanGroupEvent,
  BhajanSong,
  PrasadSignup,
} from "@/types/database";

const FALLBACK_GROUP: BhajanGroup = {
  id: "1", name: "Troy Saturday Satsang",
  description: "Monthly bhajans hosted at a different member's home. Everyone brings a dish and a voice.",
  city: "Troy", state: "MI", member_count: 42, created_by: "", created_at: "",
  frequency: "Monthly", languages: ["Gujarati", "Hindi"],
  tags: ["family-friendly", "potluck"], slug: "troy-saturday-satsang", active: true,
};

const FALLBACK_EVENT: BhajanGroupEvent = {
  id: "e1", group_id: "1", title: "October Satsang",
  event_date: "2026-10-17", event_time: "18:30",
  host_name: "The Mehta Family", host_address: "2145 Long Lake Rd, Troy, MI",
  city: "Troy", state: "MI", rsvp_count: 18, virtual_enabled: true,
  notes: undefined, created_at: "",
};

const FALLBACK_SONGS: BhajanSong[] = [
  { id: "s1", group_id: "1", name: "Achyutam Keshavam", deity: "Krishna", meta: "Krishna · requested by Mira", vote_count: 14, created_at: "" },
  { id: "s2", group_id: "1", name: "Shri Ramchandra Kripalu", deity: "Ram", meta: "Ram · requested by Dev", vote_count: 11, created_at: "" },
  { id: "s3", group_id: "1", name: "Om Jai Jagdish Hare", deity: "Vishnu", meta: "Aarti · closing", vote_count: 9, created_at: "" },
  { id: "s4", group_id: "1", name: "Hanuman Chalisa", deity: "Hanuman", meta: "Hanuman · group recitation", vote_count: 8, created_at: "" },
  { id: "s5", group_id: "1", name: "Vaishnav Jan To", meta: "Gujarati · new this month", vote_count: 5, created_at: "" },
];

const FALLBACK_PRASAD: PrasadSignup[] = [
  { id: "p1", event_id: "e1", item: "Kheer (serves 40)", claimed_name: "Anjali M.", created_at: "" },
  { id: "p2", event_id: "e1", item: "Fruit platter", created_at: "" },
  { id: "p3", event_id: "e1", item: "Dudh pauva", created_at: "" },
  { id: "p4", event_id: "e1", item: "Puri and shaak", claimed_name: "The Patels", created_at: "" },
  { id: "p5", event_id: "e1", item: "Paper plates and cups", created_at: "" },
];

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BhajanGroupPage({ params }: Props) {
  const { id } = await params;

  let group: BhajanGroup;
  let nextEvent: BhajanGroupEvent | null;
  let songs: BhajanSong[];
  let prasad: PrasadSignup[];

  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    group = isUuid ? await getBhajanGroupById(id) : await getBhajanGroupBySlug(id);
    nextEvent = await getGroupNextEvent(group.id);
    songs = await getGroupSongs(group.id);
    prasad = nextEvent ? await getEventPrasadSignups(nextEvent.id) : [];
  } catch {
    group = FALLBACK_GROUP;
    nextEvent = FALLBACK_EVENT;
    songs = FALLBACK_SONGS;
    prasad = FALLBACK_PRASAD;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <GroupDetail
        group={group}
        nextEvent={nextEvent}
        songs={songs}
        prasad={prasad}
      />
      <Footer />
    </div>
  );
}
