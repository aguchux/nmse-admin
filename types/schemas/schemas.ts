import { z } from 'zod';

export const OTPSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email required!' })
    .email({ message: 'Invalid email!' }),
  otp1: z
    .string()
    .min(1, { message: 'Char 1 empty' })
    .max(1, { message: 'one chars required' }),
  otp2: z
    .string()
    .min(1, { message: 'Char 2 empty' })
    .max(1, { message: 'one chars required' }),

  otp3: z
    .string()
    .min(1, { message: 'Char 3 empty' })
    .max(1, { message: 'one chars required' }),

  otp4: z
    .string()
    .min(1, { message: 'Char 4 empty' })
    .max(1, { message: 'one chars required' }),
});

export const EmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email required!' })
    .email({ message: 'Invalid email!' }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email required!' })
    .email({ message: 'Invalid email!' }),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Password required!' })
    .min(8, { message: 'Password must have at least 8 characters!' }),
});

export const PasswordSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'First name required!' })
    .min(2, { message: 'First name must have at least 2 characters!' }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: 'Last name required!' })
    .min(2, { message: 'Last name must have at least 2 characters!' }),
  mobile: z
    .string()
    .trim()
    .min(1, { message: 'Mobile required!' })
    .min(11, { message: 'Mobile must have at least 11 characters!' }),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Password required!' })
    .min(5, { message: 'Password must have at least 5 characters!' }),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(1, { message: 'Password required!' })
      .min(5, { message: 'Password must have at least 5 characters!' }),
    repeatPassword: z
      .string()
      .trim()
      .min(1, { message: 'Password required!' })
      .min(5, { message: 'Password must have at least 5 characters!' }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
  });
