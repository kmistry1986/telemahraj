import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TeleMahraj",
  description: "Book a Mahraj for your next pooja, ceremony, or celebration",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap"
        />
      </head>
      <body className="font-body text-dark bg-white">{children}</body>
    </html>
  );
}
