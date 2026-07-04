import React from "react";
import UserManagementPage from "./UserManagementPage";
import { getAllUsers } from "@/services/admin/userManagement";

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
  const userRes = await getAllUsers(queryString);
  return (
    <div>
      <UserManagementPage userRes={userRes?.data} />
    </div>
  );
};

export default page;
