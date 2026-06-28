import getLogedInUser from "@/services/user/userManagement";
import PricingPage from "./PricingPage";

const page = async () => {
  const user = await getLogedInUser();
  return (
    <div className="max-w-7xl mx-auto py-20 pt-30">
      <PricingPage user={user} />
    </div>
  );
};

export default page;
