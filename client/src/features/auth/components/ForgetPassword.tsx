import { useNavigate } from "react-router-dom";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, KeyRound, Loader2 } from "lucide-react";

import { useRequestPasswordReset } from "../hooks/useAuth";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const { mutate: forgotPassword, isPending } = useRequestPasswordReset();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-background via-background to-muted px-4">
      <Card className="w-full max-w-md border-border/50 shadow-2xl backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <KeyRound className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-foreground">
              Forgot Password?
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              No worries, we'll send you reset instructions
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => forgotPassword(values))}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email address"
                        className="h-11 bg-background border-input focus:border-primary focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20"
              >
                {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {isPending ? "Sending Reset Link..." : "Send Reset Link"}
              </Button>
            </form>
          </Form>

          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate("/auth/login")}
            className="w-full hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
