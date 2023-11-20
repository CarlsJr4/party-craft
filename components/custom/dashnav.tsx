import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CreateDialog from '@/components/custom/CreateDialog';

const DashNav = () => {
  return (
    <div className="col-span-1 p-4 bg-slate-200 flex flex-col gap-6">
      <CreateDialog>
        <Button className="mt-3">Create New +</Button>
      </CreateDialog>
      <Link href="/dashboard/upcoming">Upcoming</Link>
      <Link href="/dashboard/myevents">My Events</Link>
      <Link href="/dashboard/past">Past Events</Link>
      {/* <Link href="/dashboard/drafts">Drafts</Link> */}
    </div>
  );
};

export default DashNav;
