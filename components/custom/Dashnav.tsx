import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CreateDialog from '@/components/custom/CreateDialog';
import { HeartIcon, PlusCircleIcon, RocketIcon } from 'lucide-react';

const Dashnav = () => {
  return (
    <div className="bg-slate-100">
      <div className="2xl:col-span-1 col-span-2 p-6 sticky top-[73px] flex flex-col gap-6 items-center lg:items-stretch">
        <CreateDialog>
          <Button className="mt-3 flex items-center">
            <span className="hidden lg:inline">Create</span>
            <PlusCircleIcon className="h-4 w-4 lg:ml-2 lg:mt-[2.2px] text-white" />
          </Button>
        </CreateDialog>
        <Link href="/dashboard/explore" className="flex items-center gap-3">
          <RocketIcon className="h-4 w-4" />
          <span className="hidden lg:inline">Explore</span>
        </Link>
        <Link href="/dashboard/myevents" className="flex items-center gap-3">
          <HeartIcon className="h-4 w-4" />
          <span className="hidden lg:inline">My Events</span>
        </Link>
        {/* <Link href="/dashboard/past">Past Events</Link> */}
        {/* <Link href="/dashboard/drafts">Drafts</Link> */}
      </div>
    </div>
  );
};

export default Dashnav;
