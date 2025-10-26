import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "@/api/auth/AuthAPI";
import { toast } from "sonner";
import axios from "axios";

// ✅ Validation schema
const formSchema = z.object({
  identifier: z.string().min(3, "Enter your username or email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const Login: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const navigate = useNavigate();

  const onSubmit = async (values: FormValues) => {
    try {
      const result = await AuthAPI.login(values);
      localStorage.setItem("token", result.data.token);
      toast.success("Logged in successfully!");
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.data?.status;
        switch (statusCode) {
          case 404:
            toast.error("User does not exist.");
            break;
          case 400:
            toast.error("Please check your credentials.");
            break;
          case 401:
            toast.error("Incorrect password");
            break;
          default:
            toast.error("Login failed. Please check your credentials.");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md p-6 md:p-8 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center mb-6">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent leading-tight">
            Welcome Back
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Log in to your account to continue
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Username/Email */}
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username or Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="johndoe@example.com"
                        className="rounded-xl border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-1">
                      <FormLabel>Password</FormLabel>
                      <span
                        onClick={() => navigate("/forgot-password")}
                        className="text-sm text-indigo-500 hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </span>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••"
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
                Login
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="w-full flex flex-col sm:flex-row justify-between items-center text-center text-gray-500 mt-3">
          <span>Don’t have an account?</span>
          <span
            onClick={() => navigate("/register")}
            className="ml-1 text-indigo-500 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
