import { PostAPI } from "@/api/shared/post.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePostMutation = () => {
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
