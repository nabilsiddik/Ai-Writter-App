"use client";
import Image from "next/image";
import React from "react";

// SVG Logo Components (as provided in the user request)
const DriveLogo = () => (
  <Image
    src={"/images/icon/google-drive.png"}
    alt="google drive logo"
    width={100}
    height={100}
  />
);

const SheetLogo = () => (
  <Image
    src={"/images/icon/google-sheet.png"}
    alt="google sheets logo"
    width={100}
    height={100}
  />
);

const GmailLogo = () => (
  <Image
    src={"/images/icon/gmail.png"}
    alt="google gmail logo"
    width={100}
    height={100}
  />
);

const WoocommerceLogo = () => (
  <Image
    src={"/images/icon/woocommerce.png"}
    alt="woocommerce logo"
    width={100}
    height={100}
  />
);

const GeminiLogo = () => (
  <Image
    src={"/images/icon/gemini.png"}
    alt="gemini logo"
    width={100}
    height={100}
  />
);

const OpenAiLogo = () => (
  <Image
    src={"/images/icon/openai.png"}
    alt="openai logo"
    width={100}
    height={100}
  />
);

const PdfLogo = () => (
  <Image src={"/images/icon/pdf.png"} alt="pdf logo" width={100} height={100} />
);

const GenAiLogo = () => (
  <Image
    src={"/images/icon/genai.png"}
    alt="generative ai logo"
    width={100}
    height={100}
  />
);

const StripeLogo = () => (
  <Image
    src={"/images/icon/stripe.png"}
    alt="stripe logo"
    width={100}
    height={100}
  />
);

const EmailLogo = () => (
  <Image
    src={"/images/icon/gmail.png"}
    alt="gmail logo"
    width={100}
    height={100}
  />
);

const WordLogo = () => (
  <Image
    src={"/images/icon/word.png"}
    alt="google docs logo"
    width={100}
    height={100}
  />
);

const CloudLogo = () => (
  <Image
    src={"/images/icon/cloude.png"}
    alt="google drive logo"
    width={100}
    height={100}
  />
);

const logos1 = [
  { id: 1, component: <DriveLogo /> },
  { id: 2, component: <PdfLogo /> },
  { id: 3, component: <WoocommerceLogo /> },
  { id: 4, component: <SheetLogo /> },
  { id: 5, component: <GmailLogo /> },
  { id: 6, component: <StripeLogo /> },
  { id: 7, component: <OpenAiLogo /> },
  { id: 8, component: <CloudLogo /> },
  { id: 9, component: <GenAiLogo /> },
  { id: 10, component: <EmailLogo /> },
  { id: 11, component: <GeminiLogo /> },
  { id: 12, component: <WordLogo /> },
];

const logos2 = [
  { id: 1, component: <DriveLogo /> },
  { id: 2, component: <PdfLogo /> },
  { id: 3, component: <WoocommerceLogo /> },
  { id: 4, component: <SheetLogo /> },
  { id: 5, component: <GmailLogo /> },
  { id: 6, component: <StripeLogo /> },
  { id: 7, component: <OpenAiLogo /> },
  { id: 8, component: <CloudLogo /> },
  { id: 9, component: <GenAiLogo /> },
  { id: 10, component: <EmailLogo /> },
  { id: 11, component: <GeminiLogo /> },
  { id: 12, component: <WordLogo /> },
];

function MarqueeSection() {
  // We need to inject the keyframes animation into the document's head
  // because Tailwind CSS doesn't directly support the 'cqw' unit.
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes marquee-move {
        to {
          transform: translateX(calc(-100cqw - var(--item-gap)));
        }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const Marquee = ({
    logos,
    direction = "forwards",
  }: {
    logos: typeof logos1;
    direction?: string;
  }) => {
    const numItems = logos.length;
    const speed = "25s";
    const itemWidth = "120px";
    const itemGap = "25px";

    return (
      <div
        className="overflow-hidden"
        style={
          {
            "--speed": speed,
            "--numItems": numItems,
            "--item-width": itemWidth,
            "--item-gap": itemGap,
            "--direction": direction,
            maskImage:
              "linear-gradient(to right, transparent, black 2rem, black calc(100% - 2rem), transparent)",
          } as React.CSSProperties
        }
      >
        <div
          className="w-max flex"
          style={
            {
              "--track-width": `calc(var(--item-width) * ${numItems})`,
              "--track-gap": `calc(var(--item-gap) * ${numItems})`,
            } as React.CSSProperties
          }
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex justify-center items-center bg-white/10 border border-black rounded-2xl text-white"
              style={
                {
                  width: "var(--item-width)",
                  aspectRatio: "1 / 1.2",
                  marginRight: "var(--item-gap)",
                  animation: `marquee-move var(--speed) linear infinite ${direction}`,
                } as React.CSSProperties
              }
            >
              <div className="w-3/5 h-auto">{logo.component}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 my-16 flex flex-col gap-y-6">
        <Marquee logos={logos1} />
        <Marquee logos={logos2} direction="reverse" />
      </div>
    </div>
  );
}

export default MarqueeSection;
