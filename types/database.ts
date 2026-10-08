export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, "id" | "created_at">;
        Update: Partial<Omit<User, "id">>;
      };
      mahrajs: {
        Row: Mahraj;
        Insert: Omit<Mahraj, "id" | "created_at">;
        Update: Partial<Omit<Mahraj, "id">>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, "id" | "created_at">;
        Update: Partial<Omit<Service, "id">>;
      };
      service_segments: {
        Row: ServiceSegment;
        Insert: Omit<ServiceSegment, "id">;
        Update: Partial<Omit<ServiceSegment, "id">>;
      };
      bookings: {
        Row: Booking;
        Insert: Omit<Booking, "id" | "created_at">;
        Update: Partial<Omit<Booking, "id">>;
      };
      booking_customizations: {
        Row: BookingCustomization;
        Insert: Omit<BookingCustomization, "id">;
        Update: Partial<Omit<BookingCustomization, "id">>;
      };
      reviews: {
        Row: Review;
        Insert: Omit<Review, "id" | "created_at">;
        Update: Partial<Omit<Review, "id">>;
      };
      availability: {
        Row: Availability;
        Insert: Omit<Availability, "id">;
        Update: Partial<Omit<Availability, "id">>;
      };
      notifications: {
        Row: Notification;
        Insert: Omit<Notification, "id" | "created_at">;
        Update: Partial<Omit<Notification, "id">>;
      };
      item_lists: {
        Row: ItemList;
        Insert: Omit<ItemList, "id">;
        Update: Partial<Omit<ItemList, "id">>;
      };
      prep_videos: {
        Row: PrepVideo;
        Insert: Omit<PrepVideo, "id" | "created_at">;
        Update: Partial<Omit<PrepVideo, "id">>;
      };
      ceremonies: {
        Row: Ceremony;
        Insert: Omit<Ceremony, "id">;
        Update: Partial<Omit<Ceremony, "id">>;
      };
      bhajan_groups: {
        Row: BhajanGroup;
        Insert: Omit<BhajanGroup, "id" | "created_at">;
        Update: Partial<Omit<BhajanGroup, "id">>;
      };
      bhajan_group_events: {
        Row: BhajanGroupEvent;
        Insert: Omit<BhajanGroupEvent, "id" | "created_at">;
        Update: Partial<Omit<BhajanGroupEvent, "id">>;
      };
      bhajan_songs: {
        Row: BhajanSong;
        Insert: Omit<BhajanSong, "id" | "created_at">;
        Update: Partial<Omit<BhajanSong, "id">>;
      };
      bhajan_song_votes: {
        Row: BhajanSongVote;
        Insert: Omit<BhajanSongVote, "id" | "created_at">;
        Update: Partial<Omit<BhajanSongVote, "id">>;
      };
      prasad_signups: {
        Row: PrasadSignup;
        Insert: Omit<PrasadSignup, "id" | "created_at">;
        Update: Partial<Omit<PrasadSignup, "id">>;
      };
      bhajan_group_members: {
        Row: BhajanGroupMember;
        Insert: Omit<BhajanGroupMember, "id" | "joined_at">;
        Update: Partial<Omit<BhajanGroupMember, "id">>;
      };
      bhajan_event_rsvps: {
        Row: BhajanEventRsvp;
        Insert: Omit<BhajanEventRsvp, "id" | "created_at">;
        Update: Partial<Omit<BhajanEventRsvp, "id">>;
      };
      shop_products: {
        Row: ShopProduct;
        Insert: Omit<ShopProduct, "id" | "created_at">;
        Update: Partial<Omit<ShopProduct, "id">>;
      };
    };
  };
}

// ---- Core entities ----

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  city?: string;
  state?: string;
  avatar_url?: string;
  role: "family" | "mahraj" | "admin";
  created_at: string;
}

export interface Mahraj {
  id: string;
  user_id: string;
  display_name: string;
  title: string;
  bio?: string;
  city: string;
  state: string;
  zip?: string;
  lat?: number;
  lng?: number;
  languages: string[];
  styles: string[];
  formats: string[];
  years_experience?: number;
  rating_avg: number;
  rating_count: number;
  avatar_url?: string;
  initials: string;
  verified: boolean;
  active: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  mahraj_id: string;
  ceremony_id: string;
  name: string;
  description?: string;
  base_price: number;
  duration_minutes: number;
  format: "in_person" | "virtual" | "both";
  active: boolean;
  created_at: string;
}

export interface ServiceSegment {
  id: string;
  service_id: string;
  name: string;
  description?: string;
  duration_minutes: number;
  price_cents: number;
  is_required: boolean;
  sort_order: number;
}

export interface Booking {
  id: string;
  user_id: string;
  mahraj_id: string;
  service_id: string;
  date: string;
  time: string;
  status: "pending" | "accepted" | "declined" | "completed" | "cancelled";
  format: "in_person" | "virtual" | "hybrid";
  pace: "traditional" | "expedited";
  language: string;
  explanations_enabled: boolean;
  address?: string;
  city?: string;
  state?: string;
  total_price_cents: number;
  platform_fee_cents: number;
  mahraj_payout_cents: number;
  samagri_kit_added: boolean;
  notes?: string;
  created_at: string;
}

export interface BookingCustomization {
  id: string;
  booking_id: string;
  segment_id: string;
  included: boolean;
}

export interface Review {
  id: string;
  booking_id: string;
  user_id: string;
  mahraj_id: string;
  rating: number;
  text?: string;
  tags: string[];
  dakshina_cents?: number;
  created_at: string;
}

export interface Availability {
  id: string;
  mahraj_id: string;
  date: string;
  time_slots: string[];
  blocked: boolean;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  data?: Record<string, unknown>;
  created_at: string;
}

// ---- Extended entities ----

export interface ItemList {
  id: string;
  mahraj_id: string;
  ceremony_id: string;
  items: string[];
}

export interface PrepVideo {
  id: string;
  mahraj_id: string;
  ceremony_id?: string;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string;
  duration_seconds?: number;
  created_at: string;
}

export interface Ceremony {
  id: string;
  name: string;
  slug: string;
  category: "baby" | "home" | "wedding" | "business" | "milestone" | "remembrance";
  description?: string;
  typical_duration_minutes?: number;
  typical_timing?: string;
  key_items?: string[];
  meaning?: string;
}

export interface BhajanGroup {
  id: string;
  name: string;
  description?: string;
  city: string;
  state: string;
  member_count: number;
  created_by: string;
  created_at: string;
  frequency?: string;
  languages: string[];
  tags: string[];
  slug?: string;
  active: boolean;
}

export interface BhajanGroupEvent {
  id: string;
  group_id: string;
  title?: string;
  event_date: string;
  event_time: string;
  host_name?: string;
  host_address?: string;
  city?: string;
  state?: string;
  rsvp_count: number;
  virtual_enabled: boolean;
  notes?: string;
  created_at: string;
}

export interface BhajanSong {
  id: string;
  group_id: string;
  name: string;
  deity?: string;
  meta?: string;
  lyrics_url?: string;
  audio_url?: string;
  vote_count: number;
  added_by?: string;
  created_at: string;
}

export interface BhajanSongVote {
  id: string;
  song_id: string;
  user_id: string;
  created_at: string;
}

export interface PrasadSignup {
  id: string;
  event_id: string;
  item: string;
  claimed_by?: string;
  claimed_name?: string;
  created_at: string;
}

export interface BhajanGroupMember {
  id: string;
  group_id: string;
  user_id: string;
  role: "admin" | "member";
  joined_at: string;
}

export interface BhajanEventRsvp {
  id: string;
  event_id: string;
  user_id: string;
  status: "going" | "maybe" | "not_going";
  created_at: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  description?: string;
  category: "kit" | "essentials" | "decor" | "murti" | "wedding";
  price_cents: number;
  image_url?: string;
  in_stock: boolean;
  matched_ceremony_id?: string;
  created_at: string;
}

// ---- Computed / joined types ----

export interface MahrajWithServices extends Mahraj {
  services: Service[];
}

export interface MahrajProfile extends Mahraj {
  services: (Service & { segments: ServiceSegment[] })[];
  reviews: (Review & { user: Pick<User, "full_name"> })[];
  item_lists: ItemList[];
  prep_videos: PrepVideo[];
  availability: Availability[];
}

export interface BookingWithDetails extends Booking {
  mahraj: Pick<Mahraj, "display_name" | "title" | "initials" | "avatar_url">;
  service: Pick<Service, "name">;
  customizations: (BookingCustomization & { segment: ServiceSegment })[];
}

// ---- Constants ----

export const PLATFORM_FEE_PCT = 5;

export const REVIEW_TAGS = [
  { id: "on_time", label: "On time" },
  { id: "clear_explanations", label: "Clear explanations" },
  { id: "knowledgeable", label: "Very knowledgeable" },
  { id: "great_with_kids", label: "Great with kids" },
  { id: "helpful_setup", label: "Helpful with setup" },
  { id: "good_value", label: "Good value" },
] as const;

export const LANGUAGES = [
  "Gujarati", "Hindi", "Marathi", "Tamil", "Telugu",
  "Kannada", "Bengali", "Sanskrit", "English",
] as const;

export const CEREMONY_CATEGORIES = [
  { id: "baby", label: "New baby", icon: "Baby" },
  { id: "home", label: "New home", icon: "Home" },
  { id: "wedding", label: "Wedding", icon: "Heart" },
  { id: "business", label: "New business", icon: "Briefcase" },
  { id: "milestone", label: "Milestone", icon: "Star" },
  { id: "remembrance", label: "Remembrance", icon: "Flower" },
] as const;

export const DAKSHINA_OPTIONS = [
  { label: "None", cents: 0 },
  { label: "$11", cents: 1100 },
  { label: "$21", cents: 2100 },
  { label: "$51", cents: 5100 },
] as const;
