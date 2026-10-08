import { PLATFORM_FEE_PCT } from "@/types/database";

export function formatMoney(cents: number): string {
  const dollars = cents / 100;
  return "$" + dollars.toLocaleString("en-US", {
    minimumFractionDigits: dollars % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  });
}

export function calcFee(priceCents: number, feePct = PLATFORM_FEE_PCT) {
  const fee = Math.round(priceCents * feePct / 100);
  return { fee, payout: priceCents - fee };
}

export function formatDate(date: string): string {
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatMinutes(mins: number): string {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function ratingLabel(r: number): string {
  const labels = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];
  return labels[Math.round(r)] ?? "";
}
