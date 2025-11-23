import { z } from "zod";

const metaSchema = z.object({
  ipAddress: z.string().optional(),
  browserName: z.string().optional(),
  osName: z.string().optional(),
  userAgent: z.string().optional(),
  deviceName: z.string().optional(),
});

// Login form schema
export const loginSchema = z.object({
  usernameOrEmail: z.string().min(3, "Enter your username or email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  meta: metaSchema.optional(),
});

// Register form schema
export const registerSchema = z.object({
  userName: z.string().min(4, "Username must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

// Reset password schema
export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Verify OTP schema
export const verifyOtpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});
