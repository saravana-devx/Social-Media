// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { EyeOff } from "lucide-react";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";

// const EditProfileForm = () => {
//   return (
//     <div className="w-full min-h-screen p-6 flex justify-center">
//       <div className="w-full max-w-5xl space-y-6">
//         <Card className="border-border shadow-lg">
//           <CardContent className="p-6 space-y-6">
//             <div>
//               <h2 className="text-2xl font-bold text-foreground">
//                 Account Settings
//               </h2>
//               <p className="text-muted-foreground text-sm mt-1">
//                 He moonlights difficult engrossed it, sportsmen. Interested has
//                 all Devonshire difficulty gay assistance joy.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="space-y-2">
//                 <Label className="text-foreground">First name</Label>
//                 <Input
//                   defaultValue="Sam"
//                   className="bg-background border-border"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label className="text-foreground">Last name</Label>
//                 <Input
//                   defaultValue="Lanson"
//                   className="bg-background border-border"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label className="text-foreground">Additional name</Label>
//                 <Input
//                   placeholder="Optional"
//                   className="bg-background border-border"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label className="text-foreground">User name</Label>
//                 <Input
//                   defaultValue="@samlanson"
//                   className="bg-background border-border"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label className="text-foreground">Birthday</Label>
//                 <Input
//                   defaultValue="12/12/1990"
//                   className="bg-background border-border"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <Checkbox id="allow-add" />
//               <Label
//                 htmlFor="allow-add"
//                 className="cursor-pointer text-foreground"
//               >
//                 Allow anyone to add you to their team
//               </Label>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label className="text-foreground">Phone number</Label>
//                 <Input
//                   defaultValue="(678) 324-1251"
//                   className="bg-background border-border"
//                 />
//                 <Button variant="outline" className="mt-2 w-full border-border">
//                   + Add new phone number
//                 </Button>
//               </div>

//               <div className="space-y-2">
//                 <Label className="text-foreground">Email</Label>
//                 <Input
//                   defaultValue="abc@example.com"
//                   className="bg-background border-border"
//                 />
//                 <Button variant="outline" className="mt-2 w-full border-border">
//                   + Add new email address
//                 </Button>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label className="text-foreground">Overview</Label>
//               <Textarea
//                 defaultValue="Interested has all Devonshire difficulty gay assistance joy. Handsome met debating sir dwelling age material."
//                 className="mt-1 bg-background border-border min-h-[100px]"
//               />
//               <p className="text-xs text-muted-foreground">
//                 Character limit: 300
//               </p>
//             </div>

//             <div className="flex justify-end">
//               <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
//                 Save changes
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="border-border shadow-lg">
//           <CardContent className="p-6 space-y-6">
//             <div>
//               <h2 className="text-xl font-bold text-foreground">
//                 Change your password
//               </h2>
//               <p className="text-muted-foreground text-sm mt-1">
//                 See resolved goodness felicity shy civility domestic had but.
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label className="text-foreground">Current password</Label>
//                 <Input
//                   type="password"
//                   className="bg-background border-border"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label className="text-foreground">New password</Label>
//                 <div className="relative">
//                   <Input
//                     type="password"
//                     placeholder="Enter new password"
//                     className="bg-background border-border pr-10"
//                   />
//                   <EyeOff className="absolute right-3 top-3 h-5 w-5 text-muted-foreground cursor-pointer" />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label className="text-foreground">Confirm password</Label>
//                 <Input
//                   type="password"
//                   className="bg-background border-border"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end">
//               <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
//                 Update password
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default EditProfileForm;
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { editProfileSchema, type EditProfilePayload } from "../validation";

import { useCurrentUserQuery } from "@/features/profile/hooks/useUserProfile";
import { useUpdateProfileMutation } from "../hooks/useSettings";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const EditProfileForm = () => {
  const { data, isLoading } = useCurrentUserQuery();
  const {
    mutate: updateProfile,
    isPending,
    error,
  } = useUpdateProfileMutation();

  const user = data?.data;

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

            {/* API Level Error */}
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
                {/* Row 1 */}
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

                {/* Row 2 */}
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

                {/* About */}
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

                {/* Submit */}
                <div className="flex justify-end">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Password Section — unchanged */}
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
