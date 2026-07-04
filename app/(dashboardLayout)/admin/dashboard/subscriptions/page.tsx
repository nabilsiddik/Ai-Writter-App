import { getAllSubscriptions } from "@/services/admin/subscriptionManagement";
import SubscriptionsPage from "./SubscriptionsPage";
type Props = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    searchTerm?: string;
    status?: string;
    plan?: string;
  }>;
};
const page = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const queryString = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined),
  ).toString();

  const subRes = await getAllSubscriptions(queryString);
  return (
    <div>
      <SubscriptionsPage subRes={subRes?.data} />
    </div>
  );
};

export default page;
