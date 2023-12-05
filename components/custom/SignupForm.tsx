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
import { Database } from '@/types/database.types';

const AuthSchema = z
  .object({
    email: z.string().email(),
    firstname: z.string().min(2, {
      message: 'First name must be at least 2 characters long.',
    }),
    lastname: z.string().min(1, {
      message: 'Last Name cannot be blank.',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters long.',
    }),
    confirmPassword: z.string(),
  })
  .refine(
    values => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'Passwords must match!',
      path: ['confirmPassword'],
    }
  );

const SignupForm = () => {
  const { isAuth, setAuth } = useContext(AuthContext);
  const [invalidUserError, setInvalidUserError] = useState(false);
  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const router = useRouter();
  const form = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit({
    email,
    password,
    firstname,
    lastname,
  }: z.infer<typeof AuthSchema>) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setInvalidUserError(true);
        throw new Error();
      } else {
        const newUserID = data.user!.id;
        const { error: signupError } = await supabase.from('profiles').insert({
          id: newUserID,
          email,
          firstname,
          lastname,
        });
        if (!signupError) {
          setInvalidUserError(false);
          setAuth(true);
          router.push('/dashboard/explore');
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          className="m-5 flex flex-col gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
            name="firstname"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>First name:</FormLabel>
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
            name="lastname"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Last name:</FormLabel>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Re-enter password:</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {isAuth ? (
            <Button disabled className="my-5">
              Logging in...
            </Button>
          ) : (
            <Button type="submit" className="my-5">
              Sign-up
            </Button>
          )}
        </form>
        {invalidUserError && (
          <p className="text-red-600 m-5 text-center">
            A user with this email already exists.
          </p>
        )}
      </Form>
    </>
  );
};

export default SignupForm;
