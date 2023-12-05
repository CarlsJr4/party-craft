'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { AuthContext } from './AuthWrapper';
import Link from 'next/link';
import { Database } from '@/types/database.types';

const Navbar = () => {
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [userInfo, setUserInfo] = useState<userInfoType>({} as userInfoType);

  useEffect(() => {
    async function retrieveUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const userId = user?.id;
        if (!userId) {
          throw new Error();
        } else {
          const { data, error } = await supabase
            .from('profiles')
            .select()
            .eq('id', userId);

          if (data) {
            setUserInfo(data[0]);
          } else {
            throw new Error();
          }
        }
      } catch {}
    }

    retrieveUser();
  }, []);

  type userInfoType = {
    email: string;
    firstname: string;
    id: string;
    lastname: string;
  };

  const router = useRouter();
  const { setAuth } = useContext(AuthContext);
  async function handleSignout() {
    // TODO: There is a bug that occurs when signing out
    // TODO: Lots of network requests after signing in
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
        <p>
          Welcome, {userInfo.firstname} {userInfo.lastname}
        </p>
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
