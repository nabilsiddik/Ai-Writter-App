import Image from "next/image";
import Link from "next/link";

const Logo = ({
  width = 110,
  height = 110,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <Link href="/" className="flex items-center gap-1 shrink-0">
            <div className="flex items-center gap-3">
              <Image src={'/images/logo/mango.png'} width={50} height={50} alt="logo"/>
              <div>
                <span className="text-3xl font-bold tracking-tight text-secondary flex items-center">
              ফলের
              <span className="text-primary ml-1">রাজা</span>
            </span>
              </div>
            </div>
          </Link>
  );
};

export default Logo;
