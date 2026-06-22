import Image from "next/image";
import Logo from "./logo";
import FooterSocialIcons from "./shared/FooterSocialIcons";
import SocialIcons from "./shared/FooterSocialIcons";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  logo = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "blocks for shadcn/ui",
    title: "Shadcnblocks.com",
    url: "https://www.shadcnblocks.com",
  },
  tagline = "Components made easy.",
  menuItems = [
    // {
    //   title: "Product",
    //   links: [
    //     { text: "Overview", url: "#" },
    //     { text: "Pricing", url: "#" },
    //     { text: "Marketplace", url: "#" },
    //     { text: "Features", url: "#" },
    //     { text: "Integrations", url: "#" },
    //     { text: "Pricing", url: "#" },
    //   ],
    // },
    // {
    //   title: "Company",
    //   links: [
    //     { text: "About", url: "#" },
    //     { text: "Team", url: "#" },
    //     { text: "Blog", url: "#" },
    //     { text: "Careers", url: "#" },
    //     { text: "Contact", url: "#" },
    //     { text: "Privacy", url: "#" },
    //   ],
    // },
    // {
    //   title: "Resources",
    //   links: [
    //     { text: "Help", url: "#" },
    //     { text: "Sales", url: "#" },
    //     { text: "Advertise", url: "#" },
    //   ],
    // },
    // {
    //   title: "Social",
    //   links: [
    //     { text: "Twitter", url: "#" },
    //     { text: "Instagram", url: "#" },
    //     { text: "LinkedIn", url: "#" },
    //   ],
    // },
  ],
  copyright = "© 2026 TravelBuddy.com. All rights reserved.",
  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className="pt-20 border-t">
      <div className="container mx-auto px-5">
        <footer>
          <div className="flex items-center justify-center">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <Image src={'/images/logo/mango.png'} width={50} height={50} alt="logo" />
                  <div>
                    <span className="text-3xl font-bold tracking-tight text-secondary flex items-center">
                      ফলের
                      <span className="text-primary ml-1">রাজা</span>
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center">Connect with like-minded travelers, plan trips together, and create unforgettable experiences. Your journey starts here!</p>
              <div className="flex items-center justify-center">
                <FooterSocialIcons />
              </div>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground flex flex-col justify-center gap-4 border-t py-8 mt-20 text-sm font-medium md:flex-row md:items-center">
            <p className="text-center">{copyright}</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer
