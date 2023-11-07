import React from 'react'
import { Button } from '@/components/ui/button';


const DashNav = () => {
	return (
		<div className="col-span-1 p-4 bg-slate-200 flex flex-col gap-6">
      <Button className="mt-3">Create New +</Button>
			<p>Upcoming</p>
			<p>My Events</p>
			<p>Past Events</p>
			<p>Drafts</p>
		</div>
	)
}

export default DashNav