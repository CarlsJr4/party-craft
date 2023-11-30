import React from 'react';

const PageHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="text-3xl font-semibold leading-none tracking-tight mt-3">
      {children}
    </h1>
  );
};

export default PageHeading;
