import React from 'react'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"

const Navbar = () => {
	return (
		<nav className="grid grid-cols-[1fr_auto_auto] gap-4 items-center p-4 bg-stone-950 text-white">
			<b>PartyCraft</b>
			{/* <span className="text-right">Signup</span> */}
			{/* <span className="text-right">Login</span> */}
			<Avatar>
				<AvatarImage src="#" alt="Test" />
				<AvatarFallback className="text-black">CD</AvatarFallback>
			</Avatar>
				<span className="text-right">Logout</span>
			</nav>
	)
}

export default Navbar