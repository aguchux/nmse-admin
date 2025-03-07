"use client";

import { axiosInstance } from "@/api";
import { IUser } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";

// Login Mutation Hook
export const useLogin = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }): Promise<SignInResponse> => {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false, // Prevent automatic redirection
            });
            return result as SignInResponse;
        },
    });
};


// Signup Mutation Hook
export const useSignup = () => {
    return useMutation({
        mutationFn: async (data: {
            fullName: string;
            email: string;
            password: string;
        }): Promise<IUser> => {
            const response = await axiosInstance.post<IUser>(`/users/register`, data);
            if (!response.status.toString().startsWith("2")) {
                throw new Error("Invalid credentials.");
            }
            return response.data as IUser;
        },
    });
};