'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Utensils } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
  
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      console.log('[Login Response]', res);
  
      const { token, user } = res.data;
  
      if (!user) {
        setError('Login failed: No user data received.');
        return;
      }
  
      localStorage.setItem('token', token);
      toast.success(`Welcome, ${user.email}`);
      router.push('/dashboard');
    } catch (err) {
      console.error('[Login Error]', err);
  
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const status = err.response.status;
          if (status === 401) {
            setError('Incorrect email or password.');
          } else if (status === 400) {
            setError('Invalid request. Please check your input.');
          } else {
            setError(`Login failed with status ${status}. Please try again.`);
          }
        } else if (err.request) {
          setError('No response from server. Please check your network.');
        } else {
          setError('An error occurred during login. Please try again.');
        }
      } else {
        setError('Unexpected error occurred. Please try again.');
      }
    }
  };
  

  return (
    <div className="bg-white">
      <Link href="/" className="flex items-center space-x-2 pl-4">
        <Utensils className="w-8 h-14 text-emerald-500 transition-transform group-hover:rotate-12" />
        <span className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-emerald-500 text-transparent bg-clip-text">NutriCare</span>
      </Link>
      <div className="min-h-screen flex">
        <div className="hidden md:block md:w-3/5 items-center justify-center bg-white">
          <div className="relative w-3/4 h-5/6">
            <Image
              src="https://cdn.dribbble.com/users/3995683/screenshots/7948918/media/8264264ae03b6905ca67a4fa690b360b.png?resize=1200x900&vertical=center"
              alt="Hospital Illustration"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>

        <div className="w-full md:w-2/5 flex items-center justify-center bg-white px-10 border-l border-slate-300">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Staff Login
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">{error}</h3>
                    </div>
                  </div>
                </div>
              )}
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="py-4">
                  <label htmlFor="email-address" className="text-black">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                    placeholder="example@xyz.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="py-4">
                  <label htmlFor="password" className="text-black">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className='text-center'>
              <Link href="/signup" className="font-medium text-teal-600 hover:text-teal-500">
                Dont have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
