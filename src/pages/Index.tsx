import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AccountTypeCards from "@/components/AccountTypeCards";
import CinematicStrip from "@/components/CinematicStrip";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AccountTypeCards />
      <CinematicStrip />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
