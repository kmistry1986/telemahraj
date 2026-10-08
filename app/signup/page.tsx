import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";

export const dynamic = "force-dynamic";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-1">
        <Suspense>
          <AuthForm
            mode="signup"
            role="customer"
            title="Create your account"
            subtitle="Sign up to book a Mahraj and keep track of your ceremonies."
          />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
