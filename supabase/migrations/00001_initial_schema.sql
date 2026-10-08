-- TeleMahraj: Initial database schema
-- All 14 tables matching types/database.ts

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "postgis";

-- ============================================================
-- 1. users
-- ============================================================
create table public.users (
  id          uuid primary key default uuid_generate_v4(),
  email       text unique not null,
  full_name   text not null,
  phone       text,
  city        text,
  state       text,
  avatar_url  text,
  role        text not null default 'family'
              check (role in ('family', 'mahraj', 'admin')),
  created_at  timestamptz not null default now()
);

-- ============================================================
-- 2. mahrajs
-- ============================================================
create table public.mahrajs (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references public.users(id) on delete cascade,
  display_name     text not null,
  title            text not null default 'Pt.',
  bio              text,
  city             text not null,
  state            text not null,
  zip              text,
  lat              double precision,
  lng              double precision,
  languages        text[] not null default '{}',
  styles           text[] not null default '{}',
  formats          text[] not null default '{}',
  years_experience integer,
  rating_avg       numeric(2,1) not null default 0,
  rating_count     integer not null default 0,
  avatar_url       text,
  initials         text not null default '',
  verified         boolean not null default false,
  active           boolean not null default true,
  created_at       timestamptz not null default now()
);

create index idx_mahrajs_user    on public.mahrajs(user_id);
create index idx_mahrajs_city    on public.mahrajs(city, state);
create index idx_mahrajs_active  on public.mahrajs(active) where active = true;

-- ============================================================
-- 3. ceremonies  (reference table — created before services)
-- ============================================================
create table public.ceremonies (
  id                       uuid primary key default uuid_generate_v4(),
  name                     text not null,
  slug                     text unique not null,
  category                 text not null
                           check (category in ('baby','home','wedding','business','milestone','remembrance')),
  description              text,
  typical_duration_minutes integer,
  typical_timing           text,
  key_items                text[],
  meaning                  text
);

-- ============================================================
-- 4. services
-- ============================================================
create table public.services (
  id               uuid primary key default uuid_generate_v4(),
  mahraj_id        uuid not null references public.mahrajs(id) on delete cascade,
  ceremony_id      uuid not null references public.ceremonies(id),
  name             text not null,
  description      text,
  base_price       integer not null default 0,         -- cents
  duration_minutes integer not null default 60,
  format           text not null default 'both'
                   check (format in ('in_person','virtual','both')),
  active           boolean not null default true,
  created_at       timestamptz not null default now()
);

create index idx_services_mahraj   on public.services(mahraj_id);
create index idx_services_ceremony on public.services(ceremony_id);

-- ============================================================
-- 5. service_segments
-- ============================================================
create table public.service_segments (
  id               uuid primary key default uuid_generate_v4(),
  service_id       uuid not null references public.services(id) on delete cascade,
  name             text not null,
  description      text,
  duration_minutes integer not null default 10,
  price_cents      integer not null default 0,
  is_required      boolean not null default false,
  sort_order       integer not null default 0
);

create index idx_segments_service on public.service_segments(service_id);

-- ============================================================
-- 6. bookings
-- ============================================================
create table public.bookings (
  id                    uuid primary key default uuid_generate_v4(),
  user_id               uuid not null references public.users(id),
  mahraj_id             uuid not null references public.mahrajs(id),
  service_id            uuid not null references public.services(id),
  date                  date not null,
  time                  time not null,
  status                text not null default 'pending'
                        check (status in ('pending','accepted','declined','completed','cancelled')),
  format                text not null default 'in_person'
                        check (format in ('in_person','virtual','hybrid')),
  pace                  text not null default 'traditional'
                        check (pace in ('traditional','expedited')),
  language              text not null default 'English',
  explanations_enabled  boolean not null default true,
  address               text,
  city                  text,
  state                 text,
  total_price_cents     integer not null default 0,
  platform_fee_cents    integer not null default 0,
  mahraj_payout_cents   integer not null default 0,
  samagri_kit_added     boolean not null default false,
  notes                 text,
  created_at            timestamptz not null default now()
);

create index idx_bookings_user   on public.bookings(user_id);
create index idx_bookings_mahraj on public.bookings(mahraj_id);
create index idx_bookings_date   on public.bookings(date);

-- ============================================================
-- 7. booking_customizations
-- ============================================================
create table public.booking_customizations (
  id          uuid primary key default uuid_generate_v4(),
  booking_id  uuid not null references public.bookings(id) on delete cascade,
  segment_id  uuid not null references public.service_segments(id),
  included    boolean not null default true
);

create index idx_customizations_booking on public.booking_customizations(booking_id);

-- ============================================================
-- 8. reviews
-- ============================================================
create table public.reviews (
  id              uuid primary key default uuid_generate_v4(),
  booking_id      uuid not null references public.bookings(id),
  user_id         uuid not null references public.users(id),
  mahraj_id       uuid not null references public.mahrajs(id),
  rating          integer not null check (rating between 1 and 5),
  text            text,
  tags            text[] not null default '{}',
  dakshina_cents  integer,
  created_at      timestamptz not null default now()
);

create index idx_reviews_mahraj on public.reviews(mahraj_id);
create index idx_reviews_user   on public.reviews(user_id);

-- ============================================================
-- 9. availability
-- ============================================================
create table public.availability (
  id          uuid primary key default uuid_generate_v4(),
  mahraj_id   uuid not null references public.mahrajs(id) on delete cascade,
  date        date not null,
  time_slots  text[] not null default '{}',
  blocked     boolean not null default false,
  unique(mahraj_id, date)
);

create index idx_availability_mahraj on public.availability(mahraj_id, date);

-- ============================================================
-- 10. notifications
-- ============================================================
create table public.notifications (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.users(id) on delete cascade,
  type        text not null,
  title       text not null,
  body        text not null,
  read        boolean not null default false,
  data        jsonb,
  created_at  timestamptz not null default now()
);

create index idx_notifications_user on public.notifications(user_id, read);

-- ============================================================
-- 11. item_lists
-- ============================================================
create table public.item_lists (
  id           uuid primary key default uuid_generate_v4(),
  mahraj_id    uuid not null references public.mahrajs(id) on delete cascade,
  ceremony_id  uuid not null references public.ceremonies(id),
  items        text[] not null default '{}',
  unique(mahraj_id, ceremony_id)
);

-- ============================================================
-- 12. prep_videos
-- ============================================================
create table public.prep_videos (
  id               uuid primary key default uuid_generate_v4(),
  mahraj_id        uuid not null references public.mahrajs(id) on delete cascade,
  ceremony_id      uuid references public.ceremonies(id),
  title            text not null,
  description      text,
  video_url        text not null,
  thumbnail_url    text,
  duration_seconds integer,
  created_at       timestamptz not null default now()
);

create index idx_prep_videos_mahraj on public.prep_videos(mahraj_id);

-- ============================================================
-- 13. bhajan_groups
-- ============================================================
create table public.bhajan_groups (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  description   text,
  city          text not null,
  state         text not null,
  member_count  integer not null default 0,
  created_by    uuid not null references public.users(id),
  created_at    timestamptz not null default now()
);

-- ============================================================
-- 14. shop_products
-- ============================================================
create table public.shop_products (
  id                   uuid primary key default uuid_generate_v4(),
  name                 text not null,
  description          text,
  category             text not null
                       check (category in ('kit','essentials','decor','murti','wedding')),
  price_cents          integer not null default 0,
  image_url            text,
  in_stock             boolean not null default true,
  matched_ceremony_id  uuid references public.ceremonies(id),
  created_at           timestamptz not null default now()
);

create index idx_shop_products_category on public.shop_products(category);

-- ============================================================
-- Row Level Security (basic policies — open read, auth write)
-- ============================================================

alter table public.users enable row level security;
alter table public.mahrajs enable row level security;
alter table public.services enable row level security;
alter table public.service_segments enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_customizations enable row level security;
alter table public.reviews enable row level security;
alter table public.availability enable row level security;
alter table public.notifications enable row level security;
alter table public.item_lists enable row level security;
alter table public.prep_videos enable row level security;
alter table public.ceremonies enable row level security;
alter table public.bhajan_groups enable row level security;
alter table public.shop_products enable row level security;

-- Public read for reference / listing tables
create policy "Public read ceremonies"      on public.ceremonies      for select using (true);
create policy "Public read shop_products"   on public.shop_products   for select using (true);
create policy "Public read bhajan_groups"   on public.bhajan_groups   for select using (true);
create policy "Public read mahrajs"         on public.mahrajs         for select using (active = true);
create policy "Public read services"        on public.services        for select using (active = true);
create policy "Public read service_segments" on public.service_segments for select using (true);
create policy "Public read reviews"         on public.reviews         for select using (true);
create policy "Public read availability"    on public.availability    for select using (true);
create policy "Public read item_lists"      on public.item_lists      for select using (true);
create policy "Public read prep_videos"     on public.prep_videos     for select using (true);

-- Users can read/update their own row
create policy "Users read own"    on public.users for select using (auth.uid() = id);
create policy "Users update own"  on public.users for update using (auth.uid() = id);

-- Mahrajs can manage their own data
create policy "Mahraj manage services"   on public.services   for all using (mahraj_id in (select id from public.mahrajs where user_id = auth.uid()));
create policy "Mahraj manage segments"   on public.service_segments for all using (service_id in (select id from public.services where mahraj_id in (select id from public.mahrajs where user_id = auth.uid())));
create policy "Mahraj manage availability" on public.availability for all using (mahraj_id in (select id from public.mahrajs where user_id = auth.uid()));
create policy "Mahraj manage item_lists"   on public.item_lists   for all using (mahraj_id in (select id from public.mahrajs where user_id = auth.uid()));
create policy "Mahraj manage prep_videos"  on public.prep_videos  for all using (mahraj_id in (select id from public.mahrajs where user_id = auth.uid()));

-- Bookings: users see own, mahrajs see theirs
create policy "Users read own bookings"   on public.bookings for select using (auth.uid() = user_id);
create policy "Mahraj read own bookings"  on public.bookings for select using (mahraj_id in (select id from public.mahrajs where user_id = auth.uid()));
create policy "Users create bookings"     on public.bookings for insert with check (auth.uid() = user_id);
create policy "Mahraj update bookings"    on public.bookings for update using (mahraj_id in (select id from public.mahrajs where user_id = auth.uid()));

-- Reviews: anyone can read (above), authenticated users can create
create policy "Users create reviews" on public.reviews for insert with check (auth.uid() = user_id);

-- Notifications: users see only their own
create policy "Users read own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Users update own notifications" on public.notifications for update using (auth.uid() = user_id);
