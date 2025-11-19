import { PostsSection } from "@/components/post/PostsSection";
import {
  useCurrentUserQuery,
  useUserPosts,
} from "@/features/profile/hooks/useUserProfile";

const UserPosts = () => {
  const { data: userData, isLoading: userLoading } = useCurrentUserQuery();

  const userId = userData?.data?._id;

  // We start with cursor = undefined (first page)
  const { data: postsData, isLoading: postsLoading } = useUserPosts(
    userId,
    undefined,
    10
  );

  if (userLoading || postsLoading) return <p>Loading posts...</p>;

  return <PostsSection posts={postsData?.data?.posts || []} />;
};

export default UserPosts;
