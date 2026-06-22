"use client";

import { formatDateTime } from "@/lib/formatter";
import { formatDate } from "@/utils/dateManagement";


interface DateCellProps {
  date?: string | Date;
}

export function DateCell({ date }: DateCellProps) {
  return <span className="text-sm font-medium">{formatDate(date)}</span>;
}