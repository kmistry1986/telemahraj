import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { formatMoney } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-warm-surface text-dark",
  accepted: "bg-green-100 text-green-900",
  confirmed: "bg-green-100 text-green-900",
  completed: "bg-warm-surface text-slate-900",
  declined: "bg-red-100 text-red-900",
  cancelled: "bg-red-100 text-red-900",
};

function fmtDate(d: string | null) {
  if (!d) return "Date TBD";
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" });
}

function fmtTime(t: string | null) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

export default async function AccountPage() {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/login?redirect=/account");

  const name =
    (userData.user.user_metadata?.full_name as string) || userData.user.email?.split("@")[0] || "there";

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, service:services(name), mahraj:mahrajs(display_name, title, city, state)")
    .eq("user_id", userData.user.id)
    .order("date", { ascending: false });

  const list = (bookings ?? []) as any[];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-[900px] w-full mx-auto px-6 py-10 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-slate-900">Namaste,</span>
          <h1 className="font-heading text-4xl font-bold">{name}</h1>
        </div>

        <h2 className="font-heading text-2xl font-bold">My bookings</h2>

        {list.length === 0 ? (
          <div className="border border-warm-border rounded-2xl p-10 flex flex-col gap-4 items-start">
            <p className="text-slate-900 m-0">You have not booked any ceremonies yet.</p>
            <Link href="/search" className="px-6 py-3 rounded-full bg-brand text-white font-bold no-underline hover:bg-brand-dark">
              Find a Mahraj
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {list.map((b) => {
              const mahraj = [b.mahraj?.title, b.mahraj?.display_name].filter(Boolean).join(" ") || "Mahraj";
              const badge = STATUS_STYLE[b.status] || "bg-warm-surface text-dark";
              return (
                <div key={b.id} className="border border-warm-border rounded-2xl p-6 flex flex-wrap gap-4 justify-between items-start">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <strong className="font-heading text-xl">{b.service?.name || b.ceremony_type || "Ceremony"}</strong>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${badge}`}>{b.status}</span>
                    </div>
                    <span className="text-slate-900 text-sm">with {mahraj}</span>
                    <span className="text-slate-900 text-sm">
                      {fmtDate(b.date || b.ceremony_date)}{(b.time || b.ceremony_time) ? ` · ${fmtTime(b.time || b.ceremony_time)}` : ""}
                    </span>
                    <span className="text-slate-900 text-sm">
                      {b.virtual || b.format === "virtual" ? "Virtual" : (b.location || "In person")}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <strong className="font-heading text-xl">
                      {formatMoney(b.total_price_cents || Math.round(Number(b.total_price ?? 0) * 100))}
                    </strong>
                    {b.status === "pending" && <span className="text-slate-900 text-xs">Awaiting Mahraj confirmation</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
