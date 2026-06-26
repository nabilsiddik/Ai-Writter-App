import React from "react";

const PageHeader = ({ title, description, bannerImage }: any) => {
  console.log(bannerImage, "bg");
  return (
    <div
      className="relative bg-cover bg-center h-70 lg:h-80 w-full flex items-center justify-center border-b border-white"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/70 z-1"></div>
      <div className="relative text-center text-white z-10 px-4 sm:px-6 md:px-8">
        <h1 className="lg:text-6xl sm:text-5xl text-5xl font-extrabold">
          {title}
        </h1>
        <p className="mt-4 text-lg sm:text-xl max-w-4xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
