/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/tables/ManagementTable";
import { IUser } from "@/types/user.interface";
import { Star } from "lucide-react";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { DateCell } from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";

export const usersColumns: Column<IUser>[] = [
  {
    header: "User",
    accessor: (user) => (
      <UserInfoCell
        name={`${user?.firstName} ${user?.lastName}`}
        email={user?.email}
        photo={user?.profileImage as string}
        gender={user?.gender}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Role",
    accessor: (user) => (
      <div className="flex flex-col">
        <span className="text-sm">{user?.role}</span>
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (user) => (
      <div className="flex flex-col">
        <Badge variant={user?.status === "DELETED" ? "destructive" : "default"}>
          <span className="text-sm">{user?.status}</span>
        </Badge>
      </div>
    ),
  },
  {
    header: "Gender",
    accessor: (user) => (
      <div className="flex flex-col">
        <span className="text-sm">{user?.gender}</span>
      </div>
    ),
  },
  {
    header: "Verified Status",
    accessor: (user) => <StatusBadgeCell isVerified={user.verifiedBadge} />,
  },
  {
    header: "Registered",
    accessor: (doctor) => <DateCell date={doctor.createdAt} />,
    sortKey: "createdAt",
  },
];
