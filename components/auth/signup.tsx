'use client';

import { ApiCaller } from '@/api';
import { ArrowLeft, EyeIcon, EyeOffIcon, Facebook, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { useSignup } from '@/libs/actions/auth';
import { createFirebaseApp } from '@/libs/firebase/client';
import { IUser } from '@/types';
import { getAuth } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from '../loaders/loading-spinner';
import AuthRightBox from './auth-right-box';

export const SignupScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signupMutation = useSignup();

  const app = createFirebaseApp();
  const auth = getAuth(app);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate(
      { fullName, email, password },
      {
        onSuccess: async (data) => {
          const uid = data?.user?.uid;
          ApiCaller.post<IUser>('/users/register', {
            uid: uid,
            fullName: fullName,
            email: email,
          }).then(async (createdUser) => {
            // delete the user from firebase
            // if user creation fails
            if (!createdUser) {
              if (!auth.currentUser) return;
              await auth.currentUser.delete();
              return;
            }
            toast.success('Signup successful!');
            window.location.href = '/';
          });
        },
        onError: (error: { response?: { data: string }; message: string }) => {
          console.error('Signup failed', error.response?.data || error.message);
          toast.error('Signup failed. Please try again.');
        },
      },
    );
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* Left Column */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b p-4 md:hidden">
          <button
            title="Back Page"
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="text-xl font-bold text-blue-600">MedExamPro</div>
        </div>

        <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md space-y-6">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              Create Account
            </h1>
            <p className="text-gray-600">
              Join NMSEPrep to start your medical exam preparation journey.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="flex flex-col gap-1">
                  <span>Full Name</span>
                  <input
                    name="fullName"
                    type="text"
                    required
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </label>

                <label htmlFor="email" className="flex flex-col gap-1">
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>

                <label htmlFor="password" className="flex flex-col gap-1">
                  <span>Password</span>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </label>
              </div>

              <div className="flex justify-between my-5"></div>

              <button
                type="submit"
                className="h-12 w-full btn"
                disabled={signupMutation.isPending}
              >
                {signupMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner className="h-5 w-5" />
                    Signing you up...
                  </div>
                ) : (
                  'Register with Email'
                )}
              </button>
            </form>

            {/* Social Auth */}
            <div className="space-y-2 flex flex-col gap-2 mt-4 justify-center items-center">
              <span className="my-1 text-xl font-semibold text-gray-500">
                - OR -
              </span>
              <button className="bg-red-600 flex h-12 text-white w-full items-center justify-center gap-3 rounded-md border px-4 text-sm font-medium transition-colors hover:bg-red-500">
                <Mail className="h-5 w-5 text-white" />
                Register with Google
              </button>
              <button className="bg-blue-600 flex h-12 text-white w-full items-center justify-center gap-3 rounded-md border px-4 text-sm font-medium transition-colors hover:bg-blue-500">
                <Facebook className="h-5 w-5" />
                Register with Facebook
              </button>
            </div>

            <div className="text-center text-gray-600">
              Already have an account?{' '}
              <Link
                href="/auth/signin"
                className="text-blue-800 font-medium hover:underline"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden bg-gradient-to-b from-teal-700 to-teal-900 md:flex md:flex-col md:justify-between p-8 lg:p-12">
        <AuthRightBox />
      </div>
    </div>
  );
};
