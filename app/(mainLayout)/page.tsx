"use client";

import HomePageContent from "@/components/pages/HomePageContent";
import { FinalCTA } from "@/components/sections/home/CTASection";
import { FeaturesSection } from "@/components/sections/home/FeaturesSection";
import { TemplateShowcase } from "@/components/sections/home/TemplateShowcaseSection";
import { HowItWorks } from "@/components/sections/home/WorkSection";

const page = () => {
  return (
    <div>
      <HomePageContent />
      <FeaturesSection />
      <HowItWorks />
      <TemplateShowcase />
      <FinalCTA />
    </div>
  );
};

export default page;
