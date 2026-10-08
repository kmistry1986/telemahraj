import Link from "next/link";

const FOOTER_LINKS = {
  "For families": [
    { href: "/search", label: "Find a Mahraj" },
    { href: "/rituals", label: "Ritual guide" },
    { href: "/groups", label: "Bhajan groups" },
  ],
  "For Mahrajs": [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard", label: "How it works" },
    { href: "/dashboard", label: "Pricing" },
  ],
  Company: [
    { href: "/", label: "About" },
    { href: "/", label: "Contact" },
    { href: "/", label: "Privacy" },
    { href: "/", label: "Terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <span className="font-heading font-bold text-xl">TeleMahraj</span>
          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            Connecting families with trusted Mahrajs for every life celebration.
          </p>
        </div>
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-orange-300 mb-4">
              {heading}
            </h4>
            <ul className="space-y-2 list-none p-0 m-0">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/80 hover:text-white no-underline text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 text-center py-6 text-sm text-white/50">
        &copy; {new Date().getFullYear()} TeleMahraj. All rights reserved.
      </div>
    </footer>
  );
}
