import { createBrowserClient } from "@supabase/ssr";

// Browser Supabase client with the logged-in user's session (cookie-based).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
