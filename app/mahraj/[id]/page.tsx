import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MahrajProfile, { type MahrajProfileData } from "@/components/mahraj/MahrajProfile";
import { getMahrajProfile } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function MahrajProfilePage({ params }: { params: { id: string } }) {
  let profile: any;
  try {
    profile = await getMahrajProfile(params.id);
  } catch {
    notFound();
  }
  if (!profile || !profile.id) notFound();

  const today = new Date().toISOString().split("T")[0];

  const data: MahrajProfileData = {
    id: profile.id,
    display_name: profile.display_name || "Mahraj",
    initials: profile.initials || (profile.display_name || "M").slice(0, 2).toUpperCase(),
    city: profile.city || "",
    state: profile.state || "",
    years_experience: profile.years_experience ?? 0,
    rating_avg: Number(profile.rating_avg ?? 0),
    rating_count: profile.rating_count ?? 0,
    bio: profile.bio || "",
    languages: profile.languages ?? [],
    formats: profile.formats ?? [],
    services: (profile.services ?? []).map((s: any) => ({
      id: s.id,
      name: s.name,
      base_price: Number(s.base_price),
      duration_minutes: s.duration_minutes ?? 0,
      format: s.format ?? "both",
    })),
    reviews: (profile.reviews ?? []).map((r: any) => ({
      id: r.id,
      rating: r.rating ?? 5,
      text: r.text || r.comment || "",
      tags: r.tags ?? [],
      user_name: r.user?.full_name || "A family",
    })),
    prep_videos: (profile.prep_videos ?? []).map((v: any) => ({
      id: v.id,
      title: v.title,
      duration_seconds: v.duration_seconds ?? 0,
    })),
    availability: (profile.availability ?? [])
      .filter((a: any) => {
        const d = a.date || a.available_date;
        const slots = a.time_slots ?? [];
        return d && d >= today && a.blocked !== true && a.is_available !== false && slots.length > 0;
      })
      .map((a: any) => ({ date: a.date || a.available_date, time_slots: a.time_slots ?? [] }))
      .sort((a: any, b: any) => a.date.localeCompare(b.date)),
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <MahrajProfile m={data} />
      <Footer />
    </div>
  );
}
