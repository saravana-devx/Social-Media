import { AuthAPI } from "@/features/auth/api/auth.api";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProfileAPI } from "../api/profile.api";
import { PostAPI } from "@/api/post.api";

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: AuthAPI.getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useChangeProfileImage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (url: string) => ProfileAPI.updateProfileImage(url),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: handleAxiosError,
  });
};

export const useFriendsList = () => {
  return useQuery({
    queryKey: ["friends"],
    queryFn: () => ProfileAPI.getFriends(),
  });
};

export const useUserPosts = (
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

export const useCreatePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      mediaId,
      description,
    }: {
      mediaId: string;
      description: string;
    }) => PostAPI.publishPost(mediaId, description),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userPosts"] });
    },
  });
};
