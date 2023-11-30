import React from 'react';

const CardGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-3 mt-5 gap-5">
      {children}
    </div>
  );
};

export default CardGrid;
