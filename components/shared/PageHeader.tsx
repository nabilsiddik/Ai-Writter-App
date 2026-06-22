import React from 'react';

interface PageHeaderProps {
  title?: string;
  description?: string;
  backgroundImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, backgroundImage }) => {
  return (
    <div
      className="relative bg-cover bg-center h-80 flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-1"></div>
      <div className="relative text-center text-white z-10 px-4 sm:px-6 md:px-8">
        <h1 className="text-4xl sm:text-5xl font-semibold">{title}</h1>
        <p className="mt-4 text-lg sm:text-xl max-w-4xl mx-auto">{description}</p>
      </div>
    </div>
  );
};

export default PageHeader;
