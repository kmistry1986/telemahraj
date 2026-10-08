import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DashboardClient, { type DashboardBooking } from "@/components/dashboard/DashboardClient";
import { getDashboardData, getDashboardStats } from "@/lib/queries";
import { calcFee } from "@/lib/utils";

export const dynamic = "force-dynamic";

// Until auth lands, the dashboard shows the demo Mahraj (Ramesh Shastri).
const CURRENT_MAHRAJ_ID = "b0000000-0000-0000-0000-000000000001";

function fmtDate(d: string | null) {
  if (!d) return "TBD";
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function payoutCents(b: any) {
  if (b.mahraj_payout_cents) return b.mahraj_payout_cents;
  const cents = b.total_price_cents || Math.round(Number(b.total_price ?? 0) * 100);
  return calcFee(cents).payout;
}

function who(b: any) {
  const name = b.user?.full_name || "A family";
  const place = b.city || b.user?.city || "";
  const virtual = b.virtual || b.format === "virtual";
  return [name, place, virtual ? "Virtual" : null].filter(Boolean).join(" · ");
}

function toBooking(b: any): DashboardBooking {
  return {
    id: b.id,
    what: b.service?.name || b.ceremony_type || "Ceremony",
    who: who(b),
    when: fmtDate(b.date || b.ceremony_date),
    payoutCents: payoutCents(b),
  };
}

export default async function DashboardPage() {
  let data: any = null;
  let stats = { upcomingCount: 0, monthEarningsCents: 0, rating: 0 };

  try {
    [data, stats] = await Promise.all([
      getDashboardData(CURRENT_MAHRAJ_ID),
      getDashboardStats(CURRENT_MAHRAJ_ID),
    ]);
  } catch {
    data = null;
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-2xl mx-auto px-6 py-20 text-center text-slate-900">
          Could not load the dashboard right now. Please try again shortly.
        </div>
        <Footer />
      </div>
    );
  }

  const upcoming = (data.upcoming ?? []).map(toBooking);
  const pending = (data.pending ?? []).map(toBooking);
  const firstList = (data.itemLists ?? [])[0];

  return (
    <DashboardClient
      mahrajId={CURRENT_MAHRAJ_ID}
      mahrajName={[data.mahraj?.title, data.mahraj?.display_name].filter(Boolean).join(" ") || "Mahraj"}
      rating={Number(data.mahraj?.rating_avg ?? 0)}
      monthEarningsCents={stats.monthEarningsCents}
      nextCeremony={upcoming.length ? upcoming[0].when.replace(/^[A-Za-z]+, /, "") : "—"}
      upcoming={upcoming}
      pending={pending}
      itemListCeremony={firstList?.ceremony?.name || "Your ceremony"}
      items={firstList?.items ?? []}
      videoCount={data.videoCount ?? 0}
    />
  );
}
