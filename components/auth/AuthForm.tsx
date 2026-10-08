"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ensureProfile } from "@/lib/auth";

export interface AuthFormProps {
  mode: "login" | "signup";
  role?: "customer" | "mahraj";
  title: string;
  subtitle: string;
  defaultRedirect?: string;
}

export default function AuthForm({ mode, role = "customer", title, subtitle, defaultRedirect = "/account" }: AuthFormProps) {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || defaultRedirect;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName, role } },
        });
        if (error) throw error;

        if (data.session && data.user) {
          await ensureProfile(supabase, data.user);
          router.push(redirectTo);
          router.refresh();
        } else {
          // Email confirmation is on — no session yet.
          setCheckEmail(true);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user) await ensureProfile(supabase, data.user);
        router.push(redirectTo);
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (checkEmail) {
    return (
      <div className="max-w-md mx-auto px-6 py-20">
        <div className="border border-warm-border rounded-2xl p-8 flex flex-col gap-3">
          <h1 className="font-heading text-2xl font-bold">Check your email</h1>
          <p className="text-slate-900 m-0">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account, then come back and log in.
          </p>
          <Link href={`/login?redirect=${encodeURIComponent(redirectTo)}`} className="text-brand-dark font-bold no-underline mt-2">
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="font-heading text-3xl font-bold">{title}</h1>
        <p className="text-slate-900 m-0">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === "signup" && (
          <label className="flex flex-col gap-1.5 font-bold text-sm">
            Full name
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-12 border border-warm-muted rounded-xl px-3 text-slate-900 font-normal"
              placeholder={role === "mahraj" ? "Pt. Your Name" : "Your name"}
            />
          </label>
        )}

        <label className="flex flex-col gap-1.5 font-bold text-sm">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 border border-warm-muted rounded-xl px-3 text-slate-900 font-normal"
            placeholder="you@example.com"
          />
        </label>

        <label className="flex flex-col gap-1.5 font-bold text-sm">
          Password
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 border border-warm-muted rounded-xl px-3 text-slate-900 font-normal"
            placeholder="At least 6 characters"
          />
        </label>

        {error && <p className="text-red-600 text-sm m-0">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="h-12 rounded-full bg-brand text-white font-bold hover:bg-brand-dark disabled:opacity-60"
        >
          {loading ? "Please wait…" : mode === "signup" ? "Create account" : "Log in"}
        </button>
      </form>

      <div className="mt-6 text-sm text-slate-900">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <Link href={`/login?redirect=${encodeURIComponent(redirectTo)}`} className="text-brand-dark font-bold no-underline">
              Log in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link href={`/signup?redirect=${encodeURIComponent(redirectTo)}`} className="text-brand-dark font-bold no-underline">
              Create an account
            </Link>
            {role !== "mahraj" && (
              <>
                {" · "}
                Are you a Mahraj?{" "}
                <Link href="/mahraj-signup" className="text-brand-dark font-bold no-underline">
                  List your services
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
