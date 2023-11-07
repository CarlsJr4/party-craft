import React from 'react';
import DashNav from '@/components/ui/dashnav';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-6 h-screen">
      <DashNav />
      <div className="col-span-5 p-4 mx-6">{children}</div>
    </div>
  );
};

export default layout;
