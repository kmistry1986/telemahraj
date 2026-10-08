import LiveCeremony, { type LiveStep } from "@/components/live/LiveCeremony";
import { getBookingWithService, getServiceWithSegments } from "@/lib/queries";

export const dynamic = "force-dynamic";

const GRIHA_PRAVESH_SERVICE_ID = "d0000000-0000-0000-0000-000000000001";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function segmentsToSteps(service: any): LiveStep[] {
  return (service?.service_segments ?? [])
    .slice()
    .sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((s: any) => ({ name: s.name, explain: s.description || `The Mahraj performs ${s.name}.` }));
}

function mahrajLabel(m: any) {
  return [m?.title, m?.display_name].filter(Boolean).join(" ") || "your Mahraj";
}

export default async function LiveCeremonyPage({ params }: { params: { id: string } }) {
  let title = "Live ceremony";
  let mahrajName = "your Mahraj";
  let reviewHref = `/review/${params.id}`;
  let languages: string[] = ["English", "Gujarati", "Hindi"];
  let steps: LiveStep[] = [];

  // Try to treat the id as a real booking
  if (UUID_RE.test(params.id)) {
    try {
      const booking = await getBookingWithService(params.id);
      if (booking?.service) {
        steps = segmentsToSteps(booking.service);
        mahrajName = mahrajLabel(booking.mahraj);
        const family = booking.user?.full_name ? `${booking.user.full_name.split(" ")[0]} family` : "Family";
        title = `${family} ${booking.service.name}`;
      }
    } catch {
      /* fall through to demo */
    }
  }

  // Fallback: the Griha Pravesh demo with real segment data
  if (steps.length === 0) {
    try {
      const service = await getServiceWithSegments(GRIHA_PRAVESH_SERVICE_ID);
      steps = segmentsToSteps(service);
      mahrajName = mahrajLabel(service.mahraj);
      title = `${service.name} ceremony`;
      reviewHref = `/mahraj/${service.mahraj?.id ?? ""}`;
    } catch {
      steps = [];
    }
  }

  if (steps.length === 0) {
    return (
      <div className="min-h-screen bg-[#100D1F] text-white flex items-center justify-center px-6 text-center">
        This ceremony is not available to stream right now.
      </div>
    );
  }

  return (
    <LiveCeremony
      title={title}
      mahrajName={mahrajName}
      reviewHref={reviewHref}
      languages={languages}
      steps={steps}
    />
  );
}
