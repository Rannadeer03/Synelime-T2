import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesGrid from "@/components/services-grid";
import AboutSection from "@/components/about-section";
import Testimonials from "@/components/testimonials";
import CtaSection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen scroll-smooth">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesGrid />
        <AboutSection />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
