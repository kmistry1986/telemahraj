import { notFound } from "next/navigation";

// The Pooja shop is hidden for now (not live yet). The full implementation is
// preserved in components/shop/ShopContent.tsx — to re-enable, render that here
// and restore the "Pooja shop" links in Header.tsx and Footer.tsx.
export default function ShopPage() {
  notFound();
}
