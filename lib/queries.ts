import { supabase } from "./supabase";
import type {
  Mahraj, MahrajProfile, Service, ServiceSegment,
  Review, Availability, Ceremony, ShopProduct,
  BhajanGroup, BhajanGroupEvent, BhajanSong, PrasadSignup,
  Booking, ItemList, PrepVideo, User,
} from "@/types/database";

// ---- Mahraj queries ----

export async function getMahrajs(filters?: {
  language?: string;
  format?: string;
  style?: string;
  minRating?: number;
  city?: string;
  limit?: number;
}) {
  let q = supabase
    .from("mahrajs")
    .select("*, services(*)")
    .eq("active", true)
    .order("rating_avg", { ascending: false });

  if (filters?.language) q = q.contains("languages", [filters.language]);
  if (filters?.format) q = q.contains("formats", [filters.format]);
  if (filters?.style) q = q.contains("styles", [filters.style]);
  if (filters?.minRating) q = q.gte("rating_avg", filters.minRating);
  if (filters?.city) q = q.ilike("city", `%${filters.city}%`);
  if (filters?.limit) q = q.limit(filters.limit);

  const { data, error } = await q;
  if (error) throw error;
  return data as (Mahraj & { services: Service[] })[];
}

export async function getMahrajProfile(id: string): Promise<MahrajProfile> {
  const [mahraj, services, reviews, itemLists, videos, avail] = await Promise.all([
    supabase.from("mahrajs").select("*").eq("id", id).single(),
    supabase.from("services").select("*, service_segments(*)").eq("mahraj_id", id).eq("active", true),
    supabase.from("reviews").select("*, user:users(full_name)").eq("mahraj_id", id).order("created_at", { ascending: false }).limit(20),
    supabase.from("item_lists").select("*").eq("mahraj_id", id),
    supabase.from("prep_videos").select("*").eq("mahraj_id", id).order("created_at", { ascending: false }),
    supabase.from("availability").select("*").eq("mahraj_id", id).gte("date", new Date().toISOString().split("T")[0]),
  ]);

  if (mahraj.error) throw mahraj.error;

  const mahrajData = mahraj.data as Record<string, any>;

  return {
    ...mahrajData,
    services: (services.data ?? []).map((s: any) => ({
      ...s,
      segments: s.service_segments ?? [],
    })),
    reviews: reviews.data ?? [],
    item_lists: itemLists.data ?? [],
    prep_videos: videos.data ?? [],
    availability: avail.data ?? [],
  } as unknown as MahrajProfile;
}

export async function getNearbyMahrajs(city: string, limit = 3) {
  const { data, error } = await supabase
    .from("mahrajs")
    .select("id, display_name, title, city, state, languages, rating_avg, rating_count, initials, avatar_url")
    .eq("active", true)
    .ilike("city", `%${city}%`)
    .order("rating_avg", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data as Mahraj[];
}

// ---- Service / Ceremony queries ----

export async function getServiceWithSegments(serviceId: string) {
  const { data, error } = await supabase
    .from("services")
    .select("*, service_segments(*), mahraj:mahrajs(id, display_name, title, initials, avatar_url)")
    .eq("id", serviceId)
    .single();
  if (error) throw error;
  return data as Service & { segments: ServiceSegment[]; mahraj: Pick<Mahraj, "id" | "display_name" | "title" | "initials" | "avatar_url"> };
}

export async function getCeremonies() {
  const { data, error } = await supabase
    .from("ceremonies")
    .select("*")
    .order("category")
    .order("name");
  if (error) throw error;
  return data as Ceremony[];
}

export async function getCeremoniesByCategory(category: string) {
  const { data, error } = await supabase
    .from("ceremonies")
    .select("*")
    .eq("category", category);
  if (error) throw error;
  return data as Ceremony[];
}

// ---- Booking queries ----

export async function createBooking(booking: Omit<Booking, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("bookings")
    .insert(booking as any)
    .select()
    .single();
  if (error) throw error;
  return data as Booking;
}

export async function getMahrajBookings(mahrajId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, service:services(name), user:users(full_name)")
    .eq("mahraj_id", mahrajId)
    .in("status", ["pending", "accepted"])
    .order("date");
  if (error) throw error;
  return data;
}

// ---- Review queries ----

export async function createReview(review: Omit<Review, "id" | "created_at">) {
  const { data, error } = await supabase
    .from("reviews")
    .insert(review as any)
    .select()
    .single();
  if (error) throw error;
  return data as Review;
}

export async function getMahrajReviews(mahrajId: string, limit = 10) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*, user:users(full_name)")
    .eq("mahraj_id", mahrajId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data as (Review & { user: Pick<User, "full_name"> })[];
}

// ---- Shop queries ----

export async function getShopProducts(category?: string) {
  let q = supabase.from("shop_products").select("*").eq("in_stock", true);
  if (category && category !== "all") q = q.eq("category", category);
  const { data, error } = await q.order("created_at", { ascending: false });
  if (error) throw error;
  return data as ShopProduct[];
}

// ---- Bhajan group queries ----

export async function getBhajanGroups(city?: string) {
  let q = supabase.from("bhajan_groups").select("*").eq("active", true);
  if (city) q = q.ilike("city", `%${city}%`);
  const { data, error } = await q.order("member_count", { ascending: false });
  if (error) throw error;
  return data as BhajanGroup[];
}

export async function getBhajanGroupBySlug(slug: string) {
  const { data, error } = await supabase
    .from("bhajan_groups")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();
  if (error) throw error;
  return data as BhajanGroup;
}

export async function getGroupNextEvent(groupId: string) {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("bhajan_group_events")
    .select("*")
    .eq("group_id", groupId)
    .gte("event_date", today)
    .order("event_date", { ascending: true })
    .order("event_time", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data as BhajanGroupEvent | null;
}

export async function getGroupEvents(groupId: string) {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("bhajan_group_events")
    .select("*")
    .eq("group_id", groupId)
    .gte("event_date", today)
    .order("event_date", { ascending: true })
    .order("event_time", { ascending: true });
  if (error) throw error;
  return data as BhajanGroupEvent[];
}

export async function getGroupSongs(groupId: string) {
  const { data, error } = await supabase
    .from("bhajan_songs")
    .select("*")
    .eq("group_id", groupId)
    .order("vote_count", { ascending: false });
  if (error) throw error;
  return data as BhajanSong[];
}

export async function getEventPrasadSignups(eventId: string) {
  const { data, error } = await supabase
    .from("prasad_signups")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data as PrasadSignup[];
}

// ---- Dashboard queries ----

export async function getDashboardStats(mahrajId: string) {
  const now = new Date();
  const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;

  const [upcoming, earnings, mahraj] = await Promise.all([
    supabase.from("bookings").select("id", { count: "exact" }).eq("mahraj_id", mahrajId).eq("status", "accepted").gte("date", now.toISOString().split("T")[0]),
    supabase.from("bookings").select("mahraj_payout_cents").eq("mahraj_id", mahrajId).eq("status", "completed").gte("date", monthStart),
    supabase.from("mahrajs").select("rating_avg").eq("id", mahrajId).single(),
  ]);

  const totalEarnings = ((earnings.data ?? []) as any[]).reduce((sum: number, b: any) => sum + (b.mahraj_payout_cents ?? 0), 0);

  return {
    upcomingCount: upcoming.count ?? 0,
    monthEarningsCents: totalEarnings,
    rating: (mahraj.data as any)?.rating_avg ?? 0,
  };
}
