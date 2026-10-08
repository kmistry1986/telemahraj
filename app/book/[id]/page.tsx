import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BookingForm, { type BookingSegment } from "@/components/book/BookingForm";
import { getServiceWithSegments } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function BookPage({ params }: { params: { id: string } }) {
  let service: any;
  try {
    service = await getServiceWithSegments(params.id);
  } catch {
    notFound();
  }
  if (!service || !service.id) notFound();

  const mahraj = service.mahraj ?? {};
  const mahrajName = [mahraj.title, mahraj.display_name].filter(Boolean).join(" ") || "your Mahraj";

  const segments: BookingSegment[] = (service.service_segments ?? [])
    .slice()
    .sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((s: any) => ({
      id: s.id,
      name: s.name,
      duration_minutes: s.duration_minutes ?? 0,
      price_cents: s.price_cents ?? 0,
      is_required: !!s.is_required,
    }));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <BookingForm
        serviceId={service.id}
        serviceName={service.name}
        mahrajName={mahrajName}
        mahrajId={mahraj.id ?? ""}
        basePrice={Number(service.base_price)}
        baseDuration={service.duration_minutes ?? 0}
        languages={mahraj.languages ?? []}
        segments={segments}
      />
      <Footer />
    </div>
  );
}
