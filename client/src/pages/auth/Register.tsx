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

//Validation schema
const formSchema = z.object({
  userName: z.string().min(4, "Username must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const Register: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { userName: "", email: "", password: "" },
  });

  const navigate = useNavigate();

  const onSubmit = async (values: FormValues) => {
    try {
      const result = await AuthAPI.register(values);
      localStorage.setItem("token", result.data.token);
      toast.success("Registered successfully!");
      navigate("/verify-otp");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.data?.status;
        switch (statusCode) {
          case 400:
            toast.error("Provide credentials.");
            break;
          case 409:
            toast.error("Email or username already in use.");
            break;
          default:
            toast.error("Something went wrong.");
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md p-6 md:p-8 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center mb-6">
          <CardTitle
            className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent leading-tight`}
          >
            Create Your Account
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Sign up to start connecting, sharing, and growing.
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Username */}
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="johndoe"
                        className="rounded-xl border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="johndoe@example.com"
                        className="rounded-xl border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••"
                        className="rounded-xl border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-4 rounded-xl text-white shadow-lg font-semibold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-600 transition-all"
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="w-full flex flex-col sm:flex-row justify-between items-center   text-gray-500 mt-3">
          <span>Already have an account?</span>
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-500 hover:underline cursor-pointer"
          >
            Login
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
