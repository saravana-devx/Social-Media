import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EditProfileForm from "../components/EditProfileForm";
import DeleteAccount from "../components/DeleteAccount";

export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 p-2 rounded-lg">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="delete">Delete</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <EditProfileForm />
        </TabsContent>

        <TabsContent value="account">
          {/* <AccountSettingsForm /> */}
        </TabsContent>

        <TabsContent value="notifications">
          {/* <NotificationSettings /> */}
        </TabsContent>

        <TabsContent value="privacy">{/* <PrivacySettings /> */}</TabsContent>

        <TabsContent value="security">{/* <SecuritySettings /> */}</TabsContent>

        <TabsContent value="delete">
          <DeleteAccount />
        </TabsContent>
      </Tabs>
    </div>
  );
}
