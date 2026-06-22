"use client";

import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react";


interface StatusBadgeCellProps {
    isVerified?: boolean;
    verifiedText?: string;
    unverifiedText?: string;
}

export function StatusBadgeCell({
    isVerified,
    verifiedText = "Verified",
    unverifiedText = "Unverified",
}: StatusBadgeCellProps) {
    return (
        <>
            {isVerified ?
                <Badge
                    variant="secondary"
                    className="bg-blue-500 text-white dark:bg-blue-600"
                >
                    <BadgeCheckIcon />
                    {verifiedText && verifiedText || ''}
                </Badge>

                :

                <Badge variant="destructive">{unverifiedText && unverifiedText || ''}</Badge>
            }
        </>
    );
}