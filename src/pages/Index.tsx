import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AccountTypeCards from "@/components/AccountTypeCards";
import CinematicStrip from "@/components/CinematicStrip";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div id="top" className="min-h-screen bg-background">
      <a href="#main-content" className="skip-link">انتقل إلى المحتوى الرئيسي</a>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AccountTypeCards />
        <CinematicStrip />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
