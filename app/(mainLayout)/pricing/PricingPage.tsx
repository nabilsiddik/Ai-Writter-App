import PricingSection from "@/components/sections/pricing/PricingSection";

const PricingPage = ({ user }: { user: any }) => {
  return (
    <div>
      <PricingSection user={user} />
    </div>
  );
};

export default PricingPage;
