import { getAllDocuments } from "@/services/admin/documentManagement";
import ManageDocumentsPage from "./ManageDocumentPage";
type Props = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    searchTerm?: string;
    status?: string;
  }>;
};
const page = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const queryString = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined),
  ).toString();

  const docRes = await getAllDocuments(queryString);
  return (
    <div>
      <ManageDocumentsPage docRes={docRes?.data} />
    </div>
  );
};

export default page;
