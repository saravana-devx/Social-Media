import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { PostAPI } from "@/api/shared/post.api";
import { ProfileAPI } from "../api/profile.api";

import { handleAxiosError } from "@/utils";

export const useUpdateProfileImageMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (url: string) => ProfileAPI.updateProfilePicture(url),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: handleAxiosError,
  });
};

// export const useUserFriendsQuery = (userId: string) => {
//   return useQuery({
//     queryKey: ["userFriends", userId],
//     queryFn: () => ProfileAPI.fetchUserFriends(userId),
//     enabled: !!userId,
//     staleTime: 1000 * 60 * 1,
//     gcTime: 1000 * 60 * 5,
//   });
// };

export const useUserPostsQuery = (
  userId: string | undefined,
  cursor?: string,
  limit: number = 10
) => {
  return useQuery({
    queryKey: ["userPosts", userId, cursor],
    queryFn: () => PostAPI.getUserPosts(userId!, cursor, limit),
    enabled: !!userId, // this prevents undefined userId from running the query
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 5,
  });
};

// export const useCreatePostMutation = () => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: ({
//       mediaId,
//       description,
//     }: {
//       mediaId: string;
//       description: string;
//     }) => PostAPI.publishPost(mediaId, description),

//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["userPosts"] });
//     },
//   });
// };

export const useProfileByUsernameQuery = (username: string) => {
  return useQuery({
    queryKey: ["profileByUsername", username],
    queryFn: () => ProfileAPI.fetchUserDetails(username),
    enabled: !!username, // this prevents undefined username from running the query
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 5,
  });
};
