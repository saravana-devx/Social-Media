import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FriendsList } from "..";
import CreatePost from "@/components/post/CreatePost";
import UserPosts from "./UserPosts";

const ProfileTabs = () => {
  return (
    <Tabs defaultValue="posts" className="w-full mt-6">
      <TabsList className="flex flex-start border-b border-border bg-transparent p-0">
        <TabsTrigger
          value="posts"
          className="pb-2 rounded-none text-muted-foreground
            data-[state=active]:bg-primary/20 
          hover:text-foreground"
        >
          Posts
        </TabsTrigger>

        <TabsTrigger
          value="friends"
          className="pb-2 rounded-none text-muted-foreground
          data-[state=active]:bg-primary/20 
          hover:text-foreground"
        >
          Friends
        </TabsTrigger>

        <TabsTrigger
          value="media"
          className="pb-2 rounded-none text-muted-foreground
            data-[state=active]:bg-primary/20 
          hover:text-foreground"
        >
          Media
        </TabsTrigger>

        <TabsTrigger
          value="videos"
          className="pb-2 rounded-none text-muted-foreground
          data-[state=active]:bg-primary/20 
          hover:text-foreground"
        >
          Videos
        </TabsTrigger>

        <TabsTrigger
          value="createPost"
          className="pb-2 rounded-none text-muted-foreground
            data-[state=active]:bg-primary/20 
          hover:text-foreground"
        >
          Create Posts
        </TabsTrigger>
      </TabsList>

      <TabsContent value="posts">
        <UserPosts />
        <div className="p-4">Post will appear here.</div>
      </TabsContent>

      <TabsContent value="friends">
        <FriendsList />
      </TabsContent>

      <TabsContent value="media">
        <div className="p-4">Media content here</div>
      </TabsContent>

      <TabsContent value="videos">
        <div className="p-4">Videos content here</div>
      </TabsContent>

      <TabsContent value="createPost">
        <CreatePost />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
