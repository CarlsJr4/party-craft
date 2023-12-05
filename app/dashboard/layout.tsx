import React from 'react';
import Dashnav from '@/components/custom/Dashnav';
import { Toaster } from '@/components/ui/toaster';
import DashboardWrapper from '@/components/custom/DashboardWrapper';
import Navbar from '@/components/custom/navbar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-8 h-screen">
        <DashboardWrapper>
          <Dashnav />
          <div className="2xl:col-span-7 col-span-6 p-4 mx-6">
            {children}
            <Toaster />
          </div>
        </DashboardWrapper>
      </div>
    </>
  );
};

export default layout;
