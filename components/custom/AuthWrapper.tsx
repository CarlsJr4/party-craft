'use client';
import { createBrowserClient } from '@supabase/ssr';
import React, { createContext, useEffect, useState } from 'react';
const AuthContext = createContext({} as AuthType);

type AuthType = {
  isAuth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setAuth] = useState(false);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  useEffect(() => {
    // Now, how do we run this every time we move routes?
    async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      if (data.session !== null) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    }
    getSession();
  });

  return (
    <AuthContext.Provider value={{ isAuth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;

export { AuthContext };
