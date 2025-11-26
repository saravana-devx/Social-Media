import { useState, useEffect } from "react";
import { useCurrentUserQuery } from "@/hooks/api/useUser";
import { useThrottleFn } from "./ui/useThrottleFn";

export const useOptimisticLike = (
  initialLikes: string[],
  toggleLikeMutation: any,
  id: string // commentId / replyId
) => {
  const { data } = useCurrentUserQuery();
  const userId = data?.data?._id;

  const [isLiked, setIsLiked] = useState(() => initialLikes.includes(userId));
  const [likesCount, setLikesCount] = useState(initialLikes.length);

  useEffect(() => {
    setIsLiked(initialLikes.includes(userId));
    setLikesCount(initialLikes.length);
  }, [initialLikes, userId]);

  const handleLikeAction = () => {
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    toggleLikeMutation(id);
  };

  const throttledLike = useThrottleFn(handleLikeAction, 800);

  return { isLiked, likesCount, throttledLike };
};
