-- TeleMahraj: Seed data matching the prototype screens
-- Run after migrations. All UUIDs are deterministic so foreign keys work.

-- ============================================================
-- Users
-- ============================================================
insert into public.users (id, email, full_name, phone, city, state, role) values
  ('a0000000-0000-0000-0000-000000000001', 'ramesh@example.com',  'Ramesh Shastri',   '248-555-0101', 'Troy',        'MI', 'mahraj'),
  ('a0000000-0000-0000-0000-000000000002', 'anand@example.com',   'Anand Trivedi',    '248-555-0102', 'Novi',        'MI', 'mahraj'),
  ('a0000000-0000-0000-0000-000000000003', 'devang@example.com',  'Devang Joshi',     '248-555-0103', 'Canton',      'MI', 'mahraj'),
  ('a0000000-0000-0000-0000-000000000004', 'suresh@example.com',  'Suresh Bhatt',     '248-555-0104', 'Farmington',  'MI', 'mahraj'),
  ('a0000000-0000-0000-0000-000000000005', 'harish@example.com',  'Harish Vyas',      '248-555-0105', 'Ann Arbor',   'MI', 'mahraj'),
  ('a0000000-0000-0000-0000-000000000010', 'patel@example.com',   'Amit Patel',       '248-555-0201', 'Troy',        'MI', 'family'),
  ('a0000000-0000-0000-0000-000000000011', 'shah@example.com',    'Priya Shah',       '248-555-0202', 'Novi',        'MI', 'family'),
  ('a0000000-0000-0000-0000-000000000012', 'desai@example.com',   'Ravi Desai',       '248-555-0203', 'Troy',        'MI', 'family'),
  ('a0000000-0000-0000-0000-000000000013', 'mehta@example.com',   'Sanjay Mehta',     '248-555-0204', 'Troy',        'MI', 'family'),
  ('a0000000-0000-0000-0000-000000000014', 'neha@example.com',    'Neha Kapoor',      '248-555-0205', 'Troy',        'MI', 'family');

-- ============================================================
-- Mahrajs
-- ============================================================
insert into public.mahrajs (id, user_id, display_name, title, bio, city, state, zip, languages, styles, formats, years_experience, rating_avg, rating_count, initials, verified, active) values
  ('b0000000-0000-0000-0000-000000000001',
   'a0000000-0000-0000-0000-000000000001',
   'Ramesh Shastri', 'Pt.',
   'Born in Vadodara and trained at Kashi Vidyapeeth. I have been serving families in the Metro Detroit area for over twenty years, performing everything from Griha Pravesh to Vivah ceremonies. I believe in explaining every step so the family feels connected to the meaning behind the ritual.',
   'Troy', 'MI', '48098',
   '{Gujarati,Hindi,Sanskrit,English}', '{Traditional}', '{in_person,virtual}',
   22, 4.9, 127, 'RS', true, true),

  ('b0000000-0000-0000-0000-000000000002',
   'a0000000-0000-0000-0000-000000000002',
   'Anand Trivedi', 'Sri',
   'Specializing in North Indian ceremonies with clear explanations in Hindi and English.',
   'Novi', 'MI', '48375',
   '{Hindi,Sanskrit,English}', '{Traditional,Modern}', '{in_person,virtual}',
   15, 4.8, 89, 'AT', true, true),

  ('b0000000-0000-0000-0000-000000000003',
   'a0000000-0000-0000-0000-000000000003',
   'Devang Joshi', 'Pt.',
   'Arya Samaj and traditional Vedic ceremonies. Virtual-first approach for families across the country.',
   'Canton', 'MI', '48187',
   '{Gujarati,Hindi,English}', '{Traditional,Arya Samaj}', '{in_person,virtual}',
   18, 4.7, 64, 'DJ', true, true),

  ('b0000000-0000-0000-0000-000000000004',
   'a0000000-0000-0000-0000-000000000004',
   'Suresh Bhatt', 'Acharya',
   'South Indian poojas and homams for the Michigan diaspora.',
   'Farmington', 'MI', '48335',
   '{Tamil,Telugu,Sanskrit,English}', '{Traditional}', '{in_person}',
   12, 4.6, 42, 'SB', true, true),

  ('b0000000-0000-0000-0000-000000000005',
   'a0000000-0000-0000-0000-000000000005',
   'Harish Vyas', 'Pt.',
   'Modern approach to timeless rituals. Great with young families.',
   'Ann Arbor', 'MI', '48103',
   '{Hindi,Marathi,English}', '{Modern}', '{virtual}',
   8, 4.5, 31, 'HV', false, true);

-- ============================================================
-- Ceremonies
-- ============================================================
insert into public.ceremonies (id, name, slug, category, description, typical_duration_minutes, typical_timing, key_items, meaning) values
  ('c0000000-0000-0000-0000-000000000001', 'Griha Pravesh',      'griha-pravesh',      'home',        'Blessing a new home before the family moves in.',                    120, 'Morning, muhurat-based',   '{Copper kalash,Coconut,Mango leaves,Havan samagri,Ghee}',        'Invites prosperity and divine protection into a new home.'),
  ('c0000000-0000-0000-0000-000000000002', 'Satyanarayan Katha', 'satyanarayan-katha', 'milestone',   'Devotional storytelling of Lord Vishnu, often for thanks or vows.', 90,  'Evening, flexible',        '{Panchamrut,Banana leaves,Fruits,Sindhoor}',                      'A vow of gratitude and prayer for continued blessings.'),
  ('c0000000-0000-0000-0000-000000000003', 'Namkaran',           'namkaran',           'baby',        'Naming ceremony for a newborn.',                                    60,  'Morning, 11th or 12th day', '{Rice grains,Gold pen,Honey,Ghee}',                               'The child receives their formal name and blessings from family.'),
  ('c0000000-0000-0000-0000-000000000004', 'Vivah',              'vivah',              'wedding',     'Traditional Hindu wedding ceremony.',                                180, 'Muhurat-based',            '{Mandap,Sacred fire,Garlands,Mangalsutra}',                       'A sacred union of two souls witnessed by fire and family.'),
  ('c0000000-0000-0000-0000-000000000005', 'Mundan',             'mundan',             'baby',        'First head-shaving ceremony.',                                      45,  'Morning',                  '{Silver bowl,New clothes}',                                       'Marks the child''s first rite of passage and purification.'),
  ('c0000000-0000-0000-0000-000000000006', 'Ganesh Pooja',       'ganesh-pooja',       'business',    'Invocation of Lord Ganesh before a new venture.',                   60,  'Morning',                  '{Ganesh murti,Modak,Durva grass,Red flowers}',                    'Removes obstacles and blesses the start of something new.'),
  ('c0000000-0000-0000-0000-000000000007', 'Shradh',             'shradh',             'remembrance', 'Annual remembrance and offering for ancestors.',                    90,  'Based on tithi',           '{Tarpan items,Sesame seeds,Barley}',                              'Honoring departed souls and ensuring their peace.'),
  ('c0000000-0000-0000-0000-000000000008', 'Lakshmi Pooja',      'lakshmi-pooja',      'home',        'Worship of Goddess Lakshmi, commonly on Diwali.',                   60,  'Evening, Diwali',          '{Lakshmi murti,Coins,Lotus,Sweets}',                              'Invoking the goddess of wealth, fortune and prosperity.'),
  ('c0000000-0000-0000-0000-000000000009', 'Thread Ceremony',    'thread-ceremony',    'milestone',   'Upanayana — sacred thread initiation.',                             120, 'Muhurat-based',            '{Janoi,Yagnopavit,New clothes,Danda}',                            'Marks the beginning of formal education and spiritual life.'),
  ('c0000000-0000-0000-0000-000000000010', 'Vastu Shanti',       'vastu-shanti',       'home',        'Pacifying the five elements of a space.',                           90,  'Morning',                  '{Navgraha items,Havan samagri,Ghee,Flowers}',                     'Harmonizing the energies of a home or office.');

-- ============================================================
-- Services (for Pt. Ramesh Shastri)
-- ============================================================
insert into public.services (id, mahraj_id, ceremony_id, name, description, base_price, duration_minutes, format) values
  ('d0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Griha Pravesh',      'Full home blessing with havan and Vastu pooja.',      25100, 120, 'both'),
  ('d0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000002', 'Satyanarayan Katha', 'Complete katha with prasad distribution.',             20100, 90,  'both'),
  ('d0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000003', 'Namkaran',           'Naming ceremony with horoscope reading.',             15100, 60,  'both'),
  ('d0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000004', 'Vivah',              'Full wedding ceremony, 6-8 segments, all traditions.', 67100, 180, 'both'),
  ('d0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000006', 'Ganesh Pooja',       'Invocation for new business or venture.',             15100, 60,  'both');

-- Services for other mahrajs
insert into public.services (id, mahraj_id, ceremony_id, name, base_price, duration_minutes, format) values
  ('d0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'Griha Pravesh',      27100, 120, 'both'),
  ('d0000000-0000-0000-0000-000000000011', 'b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000004', 'Vivah',              75100, 180, 'in_person'),
  ('d0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000002', 'Satyanarayan Katha', 18100, 90,  'virtual'),
  ('d0000000-0000-0000-0000-000000000013', 'b0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000008', 'Lakshmi Pooja',      22100, 60,  'in_person'),
  ('d0000000-0000-0000-0000-000000000014', 'b0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000003', 'Namkaran',           12100, 60,  'virtual');

-- ============================================================
-- Service segments (Griha Pravesh for Pt. Shastri, matches booking page)
-- ============================================================
insert into public.service_segments (id, service_id, name, description, duration_minutes, price_cents, is_required, sort_order) values
  ('e0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'Sankalp',           'Statement of intention and dedication',        10, 2500,  true,  1),
  ('e0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000001', 'Ganesh Sthapana',   'Invoking Ganesh to remove obstacles',          10, 2500,  true,  2),
  ('e0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000001', 'Kalash Sthapana',   'Setting up the sacred pot',                    10, 2500,  true,  3),
  ('e0000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000001', 'Navgraha Pooja',    'Prayers to the nine planets',                  15, 3500,  false, 4),
  ('e0000000-0000-0000-0000-000000000005', 'd0000000-0000-0000-0000-000000000001', 'Vastu Havan',       'Sacred fire for the home',                     20, 5000,  true,  5),
  ('e0000000-0000-0000-0000-000000000006', 'd0000000-0000-0000-0000-000000000001', 'Lakshmi Pooja',     'Invocation of prosperity',                     15, 3500,  false, 6),
  ('e0000000-0000-0000-0000-000000000007', 'd0000000-0000-0000-0000-000000000001', 'Aarti',             'Closing aarti with the family',                10, 2500,  true,  7),
  ('e0000000-0000-0000-0000-000000000008', 'd0000000-0000-0000-0000-000000000001', 'Prasad and Ashirvad', 'Blessings and distribution of prasad',       10, 2500,  true,  8);

-- ============================================================
-- Item lists
-- ============================================================
insert into public.item_lists (id, mahraj_id, ceremony_id, items) values
  ('f0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001',
   '{Copper kalash,Coconut,Mango leaves,Havan samagri,Ghee,Kumkum and haldi,Navgraha cloth,Diyas}'),
  ('f0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000002',
   '{Panchamrut ingredients,Banana leaves,Fruits,Sindhoor,Flowers,Prasad sweets}');

-- ============================================================
-- Prep videos
-- ============================================================
insert into public.prep_videos (id, mahraj_id, ceremony_id, title, description, video_url, duration_seconds) values
  ('10000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001',
   'How to set up your Griha Pravesh at home', 'Where to place the kalash, how to arrange the havan area, and what to have ready.', 'https://example.com/video1', 312),
  ('10000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', null,
   'What to expect during your first pooja', 'A walkthrough for families new to Hindu ceremonies.', 'https://example.com/video2', 245),
  ('10000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000004',
   'Preparing for a Vivah ceremony', 'Timeline, outfit guide and mandap setup tips for the family.', 'https://example.com/video3', 480);

-- ============================================================
-- Availability (Pt. Shastri — next few weeks)
-- ============================================================
insert into public.availability (mahraj_id, date, time_slots, blocked) values
  ('b0000000-0000-0000-0000-000000000001', '2026-10-10', '{09:00,10:00,14:00,15:00,16:00}', false),
  ('b0000000-0000-0000-0000-000000000001', '2026-10-11', '{09:00,10:00,11:00}',              false),
  ('b0000000-0000-0000-0000-000000000001', '2026-10-17', '{09:00,10:00,14:00,15:00}',        false),
  ('b0000000-0000-0000-0000-000000000001', '2026-10-18', '{09:00,10:00,14:00}',              false),
  ('b0000000-0000-0000-0000-000000000001', '2026-10-24', '{09:00,10:00,14:00,15:00,16:00}', false),
  ('b0000000-0000-0000-0000-000000000001', '2026-10-25', '{}',                               true);

-- ============================================================
-- Bookings (matches dashboard page)
-- ============================================================
insert into public.bookings (id, user_id, mahraj_id, service_id, date, time, status, format, pace, language, explanations_enabled, city, state, total_price_cents, platform_fee_cents, mahraj_payout_cents) values
  ('20000000-0000-0000-0000-000000000001',
   'a0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001',
   '2026-10-10', '09:00', 'accepted', 'hybrid', 'traditional', 'Gujarati', true,
   'Troy', 'MI', 25100, 1255, 23845),
  ('20000000-0000-0000-0000-000000000002',
   'a0000000-0000-0000-0000-000000000011', 'b0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000002',
   '2026-10-18', '10:00', 'accepted', 'in_person', 'traditional', 'Hindi', true,
   'Novi', 'MI', 20100, 1005, 19095),
  ('20000000-0000-0000-0000-000000000003',
   'a0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000003',
   '2026-10-24', '14:00', 'accepted', 'virtual', 'traditional', 'English', true,
   'Troy', 'MI', 15100, 755, 14345);

-- ============================================================
-- Reviews (matches Mahraj profile and review page)
-- ============================================================
insert into public.reviews (id, booking_id, user_id, mahraj_id, rating, text, tags, dakshina_cents) values
  ('30000000-0000-0000-0000-000000000001',
   '20000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000001',
   5, 'Pt. Shastri made our Griha Pravesh so special. He explained every step in Gujarati and English so everyone could follow along. The kids loved it.',
   '{on_time,clear_explanations,great_with_kids}', 5100),
  ('30000000-0000-0000-0000-000000000002',
   '20000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000011', 'b0000000-0000-0000-0000-000000000001',
   5, 'Very thorough and patient. Arrived early to help with setup and stayed to answer all our questions.',
   '{on_time,knowledgeable,helpful_setup}', 2100),
  ('30000000-0000-0000-0000-000000000003',
   '20000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000001',
   4, 'Great virtual experience. The explanations overlay made it easy for family watching from India to follow.',
   '{clear_explanations,good_value}', 1100);

-- ============================================================
-- Bhajan groups
-- ============================================================
insert into public.bhajan_groups (id, name, description, city, state, member_count, created_by) values
  ('40000000-0000-0000-0000-000000000001',
   'Troy Saturday Satsang',
   'Monthly bhajans hosted at a different member''s home. Everyone brings a dish and a voice.',
   'Troy', 'MI', 42,
   'a0000000-0000-0000-0000-000000000013'),
  ('40000000-0000-0000-0000-000000000002',
   'Novi Bhajan Mandali',
   'Weekly bhajan group meeting every Sunday at the community center.',
   'Novi', 'MI', 28,
   'a0000000-0000-0000-0000-000000000011');

-- ============================================================
-- Shop products (matches shop page)
-- ============================================================
insert into public.shop_products (id, name, description, category, price_cents, in_stock, matched_ceremony_id) values
  ('50000000-0000-0000-0000-000000000001', 'Griha Pravesh complete kit', 'Built from Pt. Ramesh Shastri''s item list. Arrives 3 days before your ceremony.', 'kit', 12900, true, 'c0000000-0000-0000-0000-000000000001'),
  ('50000000-0000-0000-0000-000000000002', 'Havan samagri, 500 g',       'Blend of herbs, wood and resins',            'essentials', 1400, true,  null),
  ('50000000-0000-0000-0000-000000000003', 'Pure cow ghee, 500 ml',      'For diyas and havan',                        'essentials', 1800, true,  null),
  ('50000000-0000-0000-0000-000000000004', 'Kumkum, haldi and chandan set', 'Three-pack',                              'essentials', 900,  true,  null),
  ('50000000-0000-0000-0000-000000000005', 'Brass diya set of 5',        'Reusable, polished',                         'decor',      2400, true,  null),
  ('50000000-0000-0000-0000-000000000006', 'Toran door hanging',         'Marigold and mango leaf style',              'decor',      1900, true,  null),
  ('50000000-0000-0000-0000-000000000007', 'Satyanarayan Katha kit',     'Matched to most Mahraj lists',               'kit',        7900, true,  'c0000000-0000-0000-0000-000000000002'),
  ('50000000-0000-0000-0000-000000000008', 'Lakshmi Ganesh Pooja kit',   'Includes murti pair',                        'kit',        9500, true,  'c0000000-0000-0000-0000-000000000008'),
  ('50000000-0000-0000-0000-000000000009', 'Ganesh murti, 6 in',         'Brass',                                      'murti',      3900, true,  null);
