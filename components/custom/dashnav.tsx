import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const DashNav = () => {
  return (
    <div className="col-span-1 p-4 bg-slate-200 flex flex-col gap-6">
      <Link href="/dashboard/create">
        <Button className="mt-3">Create New +</Button>
      </Link>
      <Link href="/dashboard/upcoming">Upcoming</Link>
      <Link href="/dashboard/">My Events</Link>
      <Link href="/dashboard/past">Past Events</Link>
      {/* <Link href="/dashboard/drafts">Drafts</Link> */}
    </div>
  );
};

export default DashNav;
