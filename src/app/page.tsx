import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LearnGrid from "@/components/LearnGrid";
import Speaker from "@/components/Speaker";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main 
      className="min-h-screen bg-[#020617] bg-[url('/page-bg.png')] bg-cover bg-fixed bg-center relative overflow-x-hidden"
    >
      <div className="absolute inset-0 bg-[#020617]/70 pointer-events-none z-0" />
      <div className="relative z-10 w-full">
        <Navbar />
        <Hero />
        <LearnGrid />
        <Speaker />
        <RegistrationForm />
        <Footer />
      </div>
    </main>
  );
}
