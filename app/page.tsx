import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { SignInBanner } from "@/components/SignInBanner";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-white/20">
      <Navbar />
      <Hero />
      <SignInBanner />
      <FAQ />
      <Footer />
    </main>
  );
}
