import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { LoginPayload } from "../types";
import { loginSchema } from "../validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Heart, Loader2 } from "lucide-react";

import { useAuthLogin } from "../hooks/useAuth";
import { getDeviceMeta } from "../getDeviceMeta";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const { mutate: loginUser, isPending: isLoginPending } = useAuthLogin();

  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: { usernameOrEmail: "", password: "" },
  });

  const submitLogin = async (values: LoginPayload) => {
    const meta = await getDeviceMeta();
    loginUser({ ...values, meta });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-muted px-4">
        <Card className="w-full max-w-md border-border/50 shadow-2xl backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Heart
                className="w-8 h-8 text-primary-foreground"
                fill="currentColor"
              />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-foreground">
                Welcome Back
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Connect with friends and share moments
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitLogin)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="usernameOrEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username or Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your username or email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between mb-2">
                        <FormLabel>Password</FormLabel>
                        <button
                          type="button"
                          onClick={() => navigate("/auth/forgot-password")}
                          className="text-sm text-primary hover:text-primary/80"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-11 font-semibold shadow-lg"
                  disabled={isLoginPending}
                >
                  {isLoginPending && (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  )}
                  {isLoginPending ? "Logging in..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-center border-t pt-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/auth/register")}
                className="text-primary font-semibold hover:text-primary/80"
              >
                Sign up
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LoginForm;
