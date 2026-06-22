"use client";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeCellProps {
  badgeText?: string;
}

export function BadgeCell({ badgeText }: StatusBadgeCellProps) {
  return (
    <>
      <Badge variant={"default"}>{badgeText}</Badge>
    </>
  );
}
