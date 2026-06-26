import getLogedInUser from "@/services/user/userManagement";
import PricingPage from "./PricingPage";

const page = async () => {
  const user = await getLogedInUser();
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-0 mt-10 pb-40">
      <PricingPage user={user} />
    </div>
  );
};

export default page;
