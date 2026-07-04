import { getAllTransactions } from "@/services/admin/transactionManagement";
import UserManagementPage from "../user-management/UserManagementPage";
import TransactionsPage from "./TransactionsPage";
type Props = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
  }>;
};
const page = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const queryString = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined),
  ).toString();

  const tranRes = await getAllTransactions(queryString);

  return (
    <div>
      <TransactionsPage tranRes={tranRes?.data} />
    </div>
  );
};

export default page;
