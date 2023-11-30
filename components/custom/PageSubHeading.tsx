import React from 'react';

const PageSubHeading = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-muted-foreground mt-2">{children}</p>;
};

export default PageSubHeading;
