import HomePageContent from "@/components/pages/HomePageContent";
import FAQSection from "@/components/sections/faq/FaqSection";
import Hero from "@/components/sections/home/HeroSection";
import ToolGrid from "@/components/sections/home/ToolGridSection";
import TrustStats from "@/components/sections/home/TrustSection";
import PricingSection from "@/components/sections/pricing/PricingSection";
import getLogedInUser from "@/services/user/userManagement";

const page = async() => {
  const user = await getLogedInUser()
  return (
    <div>
      {/* <HomePageContent user={user}/> */}
      <div className="mt-20">
        <Hero />
      </div>
      <ToolGrid />
      <TrustStats />
      <div className="py-20">
        <PricingSection user={user}/>
      </div>
      <FAQSection/>
    </div>
  );
};

export default page;
