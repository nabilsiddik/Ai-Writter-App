"use client";

import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

interface UserInfoCellProps {
  name?: string;
  email?: string;
  photo?: string | null;
  gender?: string,
  userId?: string
}

export function UserInfoCell({ userId, name, email, photo, gender }: UserInfoCellProps) {

  let userPlaceholderImage = gender?.toUpperCase() === 'MALE' ? '/images/man.png' : '/images/woman.png'

  return (
    <div className="flex items-center gap-3">
      <Link target="_blank" href={`/traveler-profile/${userId}`}>
        <Avatar>
          <Image src={photo ? photo : userPlaceholderImage} alt={name || 'user'} width={40} height={40} />
        </Avatar>
      </Link>

      <div>
        <Link target="_blank" href={`/traveler-profile/${userId}`}>
          <p className="font-medium hover:underline">{name}</p>
        </Link>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}