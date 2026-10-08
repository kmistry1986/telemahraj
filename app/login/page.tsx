import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-1">
        <Suspense>
          <AuthForm mode="login" role="customer" title="Welcome back" subtitle="Log in to book ceremonies and see your bookings." />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
