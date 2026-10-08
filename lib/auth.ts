import type { SupabaseClient, User } from "@supabase/supabase-js";

const ROLES = ["customer", "family", "mahraj", "admin"];

// Ensure a public.users row (and a mahrajs row for Mahraj accounts) exists for
// this auth user. Creates only if missing, so later profile edits aren't reset.
export async function ensureProfile(supabase: SupabaseClient, user: User) {
  const meta = (user.user_metadata ?? {}) as Record<string, any>;
  const role = ROLES.includes(meta.role) ? meta.role : "customer";
  const fullName = (meta.full_name && String(meta.full_name).trim()) || user.email?.split("@")[0] || "Guest";

  await supabase
    .from("users")
    .upsert(
      { id: user.id, email: user.email, full_name: fullName, name: fullName, role },
      { onConflict: "id", ignoreDuplicates: true }
    );

  if (role === "mahraj") {
    await supabase.from("mahrajs").upsert(
      {
        user_id: user.id,
        name: fullName,
        display_name: fullName,
        title: "Pt.",
        initials: fullName.slice(0, 2).toUpperCase(),
        active: false,
        verified: false,
      },
      { onConflict: "user_id", ignoreDuplicates: true }
    );
  }
}
