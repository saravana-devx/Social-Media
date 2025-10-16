import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthAPI } from "@/api/auth/AuthAPI";
import { toast } from "sonner";
import axios from "axios";

// ✅ Validation schema
const formSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof formSchema>;

const ResetPassword: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onSubmit = async (values: FormValues) => {
    try {
      const token = searchParams.get("token");
      if (!token) {
        toast.error("Reset token is missing or invalid.");
        return;
      }

      const result = await AuthAPI.resetForgetPassword(values, token);
      localStorage.setItem("token", result.data.token);
      toast.success("Password reset successfully.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.data?.status;
        switch (statusCode) {
          case 404:
            toast.error("Email does not exist.");
            break;
          case 409:
            toast.error("Please check your credentials.");
            break;
          case 401:
            toast.error("Invalid or expired reset link.");
            break;
          default:
            toast.error("Password reset failed.");
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md p-6 md:p-8 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center mb-6">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Reset Password
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400 mt-2">
            Enter a strong password different from your previous password
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className="rounded-xl border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className="rounded-xl border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                className="w-full py-4 rounded-xl text-white shadow-lg font-semibold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-600 transition-all"
              >
                Reset Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
