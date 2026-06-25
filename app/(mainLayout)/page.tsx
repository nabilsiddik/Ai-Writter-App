import HomePageContent from "@/components/pages/HomePageContent";
import { FinalCTA } from "@/components/sections/home/CTASection";
import { FeaturesSection } from "@/components/sections/home/FeaturesSection";
import { TemplateShowcase } from "@/components/sections/home/TemplateShowcaseSection";
import { HowItWorks } from "@/components/sections/home/WorkSection";
import getLogedInUser from "@/services/user/userManagement";

const page = async() => {
  const user = await getLogedInUser()
  return (
    <div>
      <HomePageContent user={user}/>
      {/* <FeaturesSection /> */}
      {/* <HowItWorks /> */}
      {/* <TemplateShowcase /> */}
      {/* <FinalCTA /> */}
    </div>
  );
};

export default page;
