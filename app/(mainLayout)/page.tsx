import HomePageContent from "@/components/pages/HomePageContent";
import FAQSection from "@/components/sections/faq/FaqSection";
import ExtensionCTA from "@/components/sections/home/ExtensionCTASection";
import Hero from "@/components/sections/home/HeroSection";
import MarqueeSection from "@/components/sections/home/MarqueSection";
import ToolGrid from "@/components/sections/home/ToolGridSection";
import TrustStats from "@/components/sections/home/TrustSection";
import PricingSection from "@/components/sections/pricing/PricingSection";
import { getPublicStats } from "@/services/admin/userManagement";
import getLogedInUser from "@/services/user/userManagement";

const page = async () => {
  const user = await getLogedInUser();
  const publicStats = await getPublicStats()
  return (
    <div>
      {/* <HomePageContent user={user}/> */}
      <div className="mt-20">
        <Hero />
      </div>
      <MarqueeSection />
      <ToolGrid />
      <TrustStats publicStats={publicStats}/>
      <div className="py-20">
        <PricingSection user={user} />
      </div>
      <div>
        <ExtensionCTA />
      </div>
      <FAQSection />
    </div>
  );
};

export default page;
