import { PostSkeleton } from "@/components/feedback/skeleton/PostSkeleton";
import PostsSection from "@/components/post/PostsSection";

import { useUserPostsQuery } from "../hooks/useProfile";

const UserPosts = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useUserPostsQuery(userId);

  if (isLoading) return <PostSkeleton />;

  return <PostsSection posts={data?.data?.posts || []} />;
};

export default UserPosts;
