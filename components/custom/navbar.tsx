'use client';
import React, { useContext } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { AuthContext } from './AuthWrapper';
import Link from 'next/link';

const Navbar = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const router = useRouter();
  const { setAuth } = useContext(AuthContext);
  async function handleSignout() {
    const { error } = await supabase.auth.signOut();
    router.push('/');
    if (!error) setAuth(false);
  }

  return (
    <nav className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center p-4 bg-stone-950 text-white">
      <Link href="/">
        <b>PartyCraft</b>
      </Link>
      <span></span>
      {/* <span className="text-right">Signup</span> */}
      {/* <span className="text-right">Login</span> */}
      <>
        <Avatar>
          <AvatarImage src="https://picsum.photos/460/460" alt="Test" />
          <AvatarFallback className="text-black">CD</AvatarFallback>
        </Avatar>
        <Button onClick={() => handleSignout()} className="text-right">
          Logout
        </Button>
      </>
    </nav>
  );
};

export default Navbar;
