'use client';
import React, { useContext } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { AuthContext } from './AuthWrapper';

const Navbar = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const router = useRouter();
  const { isAuth, setAuth } = useContext(AuthContext);
  async function handleSignout() {
    const { error } = await supabase.auth.signOut();
    router.push('/');
    if (!error) setAuth(false);
  }

  return (
    <nav className="grid grid-cols-[1fr_auto_auto] gap-4 items-center p-4 bg-stone-950 text-white">
      <b>PartyCraft</b>
      {/* <span className="text-right">Signup</span> */}
      {/* <span className="text-right">Login</span> */}
      {isAuth ? (
        <>
          <Avatar>
            <AvatarImage src="#" alt="Test" />
            <AvatarFallback className="text-black">CD</AvatarFallback>
          </Avatar>
          <Button onClick={() => handleSignout()} className="text-right">
            Logout
          </Button>
        </>
      ) : (
        ''
      )}
    </nav>
  );
};

export default Navbar;
