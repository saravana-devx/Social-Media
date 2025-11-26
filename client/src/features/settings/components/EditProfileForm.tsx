import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema, type EditProfilePayload } from "../validation";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCurrentUserQuery } from "@/hooks/api/useUser";
import { useUpdateProfileMutation } from "../hooks/useSettings";

const EditProfileForm = () => {
  const { data : user, isLoading } = useCurrentUserQuery();
  const {
    mutate: updateProfile,
    isPending,
    error,
  } = useUpdateProfileMutation();


  const form = useForm<EditProfilePayload>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      about: user?.about ?? "",
      location: user?.location ?? "",
      phoneNumber: user?.phoneNumber?.toString() ?? "",
      dob: user?.dob?.substring(0, 10) ?? "",
    },
    values: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      about: user?.about ?? "",
      location: user?.location ?? "",
      phoneNumber: user?.phoneNumber?.toString() ?? "",
      dob: user?.dob?.substring(0, 10) ?? "",
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full min-h-screen p-6 flex justify-center">
      <div className="w-full max-w-5xl space-y-6">
        <Card className="border-border shadow-lg">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              Account Settings
            </h2>

            {error && (
              <p className="text-red-500 text-sm">
                {(error as any)?.response?.data?.message ||
                  "Something went wrong."}
              </p>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((values) => updateProfile(values))}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <Label>First name</Label>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Last name</Label>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Location</Label>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Phone Number</Label>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem>
                        <Label>Date of Birth</Label>
                        <FormControl>
                          <Input {...field} type="date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <Label>About</Label>
                      <FormControl>
                        <Textarea {...field} className="min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="border-border shadow-lg">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-xl font-bold">Change your password</h2>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfileForm;
