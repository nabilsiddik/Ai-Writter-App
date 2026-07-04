import { getFinancialOverview } from "@/services/admin/overviewManagement";
import FinancialOverviewPage from "./FinancialOverviewPage";

const page = async () => {
  const overviewData = await getFinancialOverview();
  return (
    <div>
      <FinancialOverviewPage overviewData={overviewData} />
    </div>
  );
};

export default page;
