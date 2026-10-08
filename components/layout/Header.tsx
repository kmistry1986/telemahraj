"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/search", label: "Find a Mahraj" },
  { href: "/rituals", label: "Ritual guide" },
  { href: "/groups", label: "Bhajan groups" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-warm-border">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-wrap items-center gap-3 gap-x-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-heading font-bold text-2xl text-dark no-underline hover:text-dark"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C2410C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3c2 3 4 5 4 8a4 4 0 0 1-8 0c0-3 2-5 4-8z" />
            <path d="M4 17h16l-2 4H6z" />
          </svg>
          TeleMahraj
        </Link>
        <nav className="flex flex-wrap gap-2 gap-x-6 flex-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`no-underline font-medium ${
                pathname.startsWith(link.href)
                  ? "text-brand-dark"
                  : "text-dark hover:text-brand-dark"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/dashboard" className="no-underline font-medium text-dark hover:text-brand-dark">
          For Mahrajs
        </Link>
        <Link
          href="/search"
          className="no-underline font-bold text-sm px-5 py-2.5 rounded-lg bg-brand text-white hover:bg-brand-dark"
        >
          Book a pooja
        </Link>
      </div>
    </header>
  );
}
