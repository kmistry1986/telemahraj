import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";

export const dynamic = "force-dynamic";

export default function MahrajSignupPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-1">
        <Suspense>
          <AuthForm
            mode="signup"
            role="mahraj"
            title="List your services"
            subtitle="Create a Mahraj account to offer ceremonies to families near you. After signing up, you can complete your profile and set your prices."
            defaultRedirect="/dashboard"
          />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
