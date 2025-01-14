'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Utensils } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

      const { token, user } = res.data;

      localStorage.setItem('token', token);

      alert(`Welcome, ${user.email}!`);
      router.push('/dashboard'); 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || 'Login failed');
        console.error('Axios error:', error.response?.data); 
      } else {
        setError('Something went wrong');
        console.error('Unexpected error:', error); 
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
        {/* Left Section: Image */}
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

        {/* Right Section: Form */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
