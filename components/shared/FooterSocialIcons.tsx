
import Link from "next/link";
import { Facebook, Linkedin, Instagram } from "lucide-react";

export default function FooterSocialIcons() {
  const iconClass = "w-6 h-6 hover:text-blue-500 transition-colors";

  return (
    <div className="flex gap-4 mt-5">
      <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <Facebook className={iconClass} />
      </Link>

      <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
        <Linkedin className={iconClass} />
      </Link>

      <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <Instagram className={iconClass} />
      </Link>
    </div>
  );
}
