import React from 'react';
import DashNav from '@/components/custom/Dashnav';
import { Toaster } from '@/components/ui/toaster';
import DashboardWrapper from '@/components/custom/DashboardWrapper';
import Navbar from '@/components/custom/navbar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-6 h-screen">
        <DashboardWrapper>
          <DashNav />
          <div className="col-span-5 p-4 mx-6">
            {children}
            <Toaster />
          </div>
        </DashboardWrapper>
      </div>
    </>
  );
};

export default layout;
