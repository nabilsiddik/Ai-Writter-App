"use client";

import ManagementTable from "@/components/shared/tables/ManagementTable";
import { usersColumns } from "./usersColumns";
import { IUser } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { softDeleteUser } from "@/services/user/userManagement";
import { toast } from "sonner";
import { useState } from "react";
import UserDeletionAlertModal from "@/components/Modals/UserDeletionAlertModal";

const UsersTable = ({ users }: any) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  // on user view
  const handleUserView = (user: IUser) => {
    router.push(`/traveler-profile/${user?.id}`);
  };

  // Open user deletion confirmation modal
  const openDeleteModal = (user: IUser) => {
    setOpen(true);
    setUser(user);
  };

  return (
    <>
      <UserDeletionAlertModal open={open} setOpen={setOpen} user={user} />
      <ManagementTable
        data={users}
        columns={usersColumns}
        emptyMessage="No users found"
        getRowKey={(user) => user?.id}
        onView={handleUserView}
        onDelete={openDeleteModal}
      />
    </>
  );
};

export default UsersTable;
