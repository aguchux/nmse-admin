import { auth } from '@/auth';

//  import Axios
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Create an Axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Ensure cookies and tokens work properly
} as AxiosRequestConfig);

// export class ApiCaller {
//   private static defaultHeaders: Record<string, string> = {
//     'Content-Type': 'application/json',
//   };
//   private static cachedToken: string | null = null;
//   private static async getHeaders(
//     secure: boolean = true,
//   ): Promise<Record<string, string>> {
//     if (!secure) return this.defaultHeaders;
//     if (!this.cachedToken) {
//       const session = await auth();
//       this.cachedToken = session?.accessToken as string;
//     }
//     // console.log("Token:", this.cachedToken);
//     return this.cachedToken
//       ? { ...this.defaultHeaders, Authorization: `Bearer ${this.cachedToken}` }
//       : this.defaultHeaders;
//   }

//   private static async handleResponse<T>(
//     response: AxiosResponse,
//   ): Promise<T | undefined> {
//     return response.data as T;
//   }

//   private static handleError(error: unknown) {
//     if (axios.isAxiosError(error)) {
//       console.error(
//         'API Error:',
//         error.response?.status,
//         error.response?.data || error.message,
//       );
//     } else {
//       console.error('Unexpected API Error:', error);
//     }
//   }

//   static async get<T>(
//     path: string,
//     secure: boolean = true,
//   ): Promise<T | undefined> {
//     try {
//       const response = await axiosInstance.get(path, {
//         headers: await this.getHeaders(secure),
//         withCredentials: secure,
//       });
//       return await this.handleResponse<T>(response);
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   static async post<T>(
//     path: string,
//     data: unknown,
//     secure: boolean = true,
//   ): Promise<T | undefined> {
//     try {
//       const response = await axiosInstance.post(path, data, {
//         headers: await this.getHeaders(secure),
//         withCredentials: secure,
//       });
//       return await this.handleResponse<T>(response);
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   static async delete<T>(
//     path: string,
//     secure: boolean = true,
//   ): Promise<T | undefined> {
//     try {
//       const response = await axiosInstance.delete(path, {
//         headers: await this.getHeaders(secure),
//         withCredentials: secure,
//       });
//       return await this.handleResponse<T>(response);
//     } catch (error) {
//       this.handleError(error);
//     }
//   }

//   static async patch<T>(
//     path: string,
//     data: unknown,
//     secure: boolean = true,
//   ): Promise<T | undefined> {
//     try {
//       const response = await axiosInstance.patch(path, data, {
//         headers: await this.getHeaders(secure),
//         withCredentials: secure,
//       });
//       return await this.handleResponse<T>(response);
//     } catch (error) {
//       this.handleError(error);
//     }
//   }
// }
