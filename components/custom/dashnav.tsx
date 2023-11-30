import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CreateDialog from '@/components/custom/CreateDialog';
import { HeartIcon, RocketIcon } from 'lucide-react';

const DashNav = () => {
  return (
    <div className="2xl:col-span-1 col-span-2 p-6 bg-slate-100 flex flex-col gap-6">
      <CreateDialog>
        <Button size="lg" className="mt-3">
          Create New +
        </Button>
      </CreateDialog>
      <Link href="/dashboard/explore" className="flex items-center gap-3">
        <RocketIcon className="h-4 w-4" />
        <span>Explore</span>
      </Link>
      <Link href="/dashboard/myevents" className="flex items-center gap-3">
        <HeartIcon className="h-4 w-4" />
        <span>My Events</span>
      </Link>
      {/* <Link href="/dashboard/past">Past Events</Link> */}
      {/* <Link href="/dashboard/drafts">Drafts</Link> */}
    </div>
  );
};

export default DashNav;
