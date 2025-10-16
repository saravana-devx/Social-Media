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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "@/api/auth/AuthAPI";
import { toast } from "sonner";
import axios from "axios";

// ✅ Validation schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof formSchema>;

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const result = await AuthAPI.sendPasswordLink(values.email);
      console.info(result);
      toast.success("Reset password link sent.");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.data?.status;
        switch (statusCode) {
          case 404:
            toast.error("Email does not exist.");
            break;
          default:
            toast.error("Failed to send link. Please try again.");
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md p-6 md:p-8 shadow-xl rounded-3xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center mb-6">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent pb-2">
            Forgot Password
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Enter your email and we’ll send you a password reset link.
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                Send Reset Link
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col text-center text-gray-500 dark:text-gray-400 mt-3">
          Remembered your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="ml-1 text-indigo-500  hover:underline cursor-pointer"
          >
            Back to Login
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgetPassword;
