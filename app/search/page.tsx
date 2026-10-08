import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchResults, { type MahrajResult } from "@/components/search/SearchResults";
import { getMahrajs } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function SearchPage() {
  let mahrajs: MahrajResult[] = [];

  try {
    const data = await getMahrajs();
    mahrajs = data.map((m) => ({
      id: m.id,
      display_name: m.display_name || "Mahraj",
      title: m.title || "",
      initials: m.initials || (m.display_name || "M").slice(0, 2).toUpperCase(),
      city: m.city || "",
      state: m.state || "",
      languages: m.languages ?? [],
      styles: m.styles ?? [],
      formats: m.formats ?? [],
      rating_avg: Number(m.rating_avg ?? 0),
      rating_count: m.rating_count ?? 0,
      years_experience: m.years_experience ?? 0,
      bio: m.bio || "",
      services: (m.services ?? []).map((s) => ({ name: s.name, base_price: Number(s.base_price) })),
    }));
  } catch {
    mahrajs = [];
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SearchResults mahrajs={mahrajs} />
      <Footer />
    </div>
  );
}
