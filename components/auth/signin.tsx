"use client";

import { ArrowLeft, EyeIcon, EyeOffIcon, Facebook, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useAppContext } from "@/context/AppContext";
import { useLogin } from "@/libs/actions/auth";
import { toast } from "react-hot-toast";
import { LoadingSpinner } from "../loaders/loading-spinner";
import AuthRightBox from "./auth-right-box";

export default function SigninScreen() {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { storage, setStorage } = useAppContext();

    const loginMutation = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    if (data.error) {
                        toast.error(data.error);
                        return;
                    }
                    toast.success("Login successful");
                    window.location.href = "/";
                },
                onError: (error: { response?: { data: string }; message: string }) => {
                    console.error("Login failed", error.response?.data || error.message);
                    toast.error(error?.message);
                    return;
                },
                onSettled(data, error, variables, context) {
                    // console.log("Login Mutation Settled", data, error, variables, context);
                },
            }
        );
    };

    return (
        <div className="grid min-h-screen md:grid-cols-2">
            {/* Left Column */}
            <div className="flex flex-col">

                <div className="flex items-center justify-between border-b p-4 md:hidden">
                    <button title="Back Page" className="rounded-full p-2 hover:bg-gray-100">
                        <ArrowLeft className="h-6 w-6" />
                    </button>
                    <div className="text-xl font-bold text-teal-600">MedExamPro</div>
                </div>

                <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
                    <div className="w-full max-w-md space-y-6">
                        <h1 className="text-2xl font-semibold sm:text-3xl">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to access your medical exam practice dashboard.</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className='flex flex-col gap-1'>
                                    <span>Email</span>
                                    <input name="email" type='email' required onChange={
                                        (e) => setEmail(e.target.value)
                                    } />
                                </label>

                                <label htmlFor="password" className='flex flex-col gap-1'>
                                    <span>Password</span>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </label>
                            </div>

                            <div className="flex justify-between text-sm">
                                <Link href="/auth/signup" className="text-blue-400 font-medium hover:underline">Create an account</Link>
                                <Link href="/auth/forgot-password" className="text-blue-400 hover:underline">Forgot password?</Link>
                            </div>

                            <button
                                type="submit"
                                className="h-12 w-full  btn"
                                disabled={loginMutation.isPending}
                            >
                                {loginMutation.isPending ? (
                                    <div className="flex items-center gap-2">
                                        <LoadingSpinner className="h-5 w-5" />
                                        Signing in...
                                    </div>
                                ) : (
                                    "Sign in with Email"
                                )}
                            </button>

                        </form>


                        {/* Social Auth */}
                        <div className="space-y-2 flex flex-col gap-2 mt-4 justify-center items-center">
                            <span className='my-1 text-xl font-semibold text-gray-500'>- OR -</span>
                            <button className="bg-red-600 flex h-12 text-white w-full items-center justify-center gap-3 rounded-md border px-4 text-sm font-medium transition-colors hover:bg-red-500">
                                <Mail className="h-5 w-5 text-white" />
                                Sign in with Google
                            </button>
                            <button className="bg-blue-600 flex h-12 text-white w-full items-center justify-center gap-3 rounded-md border px-4 text-sm font-medium transition-colors hover:bg-blue-500">
                                <Facebook className="h-5 w-5" />
                                Sign in with Facebook
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="hidden bg-gradient-to-b from-teal-700 to-teal-900 md:flex md:flex-col md:justify-between p-8 lg:p-12">
                <AuthRightBox />
            </div>
        </div>
    );
}
