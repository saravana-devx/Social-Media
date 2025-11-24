import { PostSkeleton } from "@/components/feedback/skeleton/PostSkeleton";
import ProfilePostGrid from "@/features/profile/components/ProfilePostGrid";

import { useUserPostsQuery } from "../hooks/useProfile";
import { useCurrentUserQuery } from "@/hooks";

const UserPosts = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useUserPostsQuery(userId);
  const { data: user } = useCurrentUserQuery();
  const loggedInUser = user?.data;

  if (isLoading) return <PostSkeleton />;

  return (
    <ProfilePostGrid
      posts={data?.data?.posts || []}
      isOwner={loggedInUser?._id === userId}
    />
  );
};

export default UserPosts;
