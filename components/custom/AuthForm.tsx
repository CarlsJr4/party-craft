'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthWrapper';

const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long.',
  }),
});

const AuthForm = () => {
  const { isAuth, setAuth } = useContext(AuthContext);
  const [invalidUserError, setInvalidUserError] = useState(false);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const router = useRouter();
  const form = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit({ email, password }: z.infer<typeof AuthSchema>) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data.session !== null) {
      setInvalidUserError(false);
      router.push('/dashboard/explore');
      setAuth(true);
    } else {
      setInvalidUserError(true);
    }
    return;
  }

  return (
    <>
      {isAuth && <p>Logging in...</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="mt-2">
            Login
          </Button>
          {/* <Button type="submit" className="ml-3 mt-2">
            Signup
          </Button> */}
        </form>
      </Form>
      {invalidUserError && (
        <p className="mt-5 text-red-600">Invalid email or password</p>
      )}
    </>
  );
};

export default AuthForm;
