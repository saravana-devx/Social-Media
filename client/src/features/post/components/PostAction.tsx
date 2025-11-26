import { Heart, MessageCircle, Share2, Send } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { useToggleLikeMutation } from "../hooks/usePost";
import { useThrottleFn } from "@/hooks/ui/useThrottleFn";
import { useCurrentUserQuery } from "@/hooks";

type PostActionBarProps = {
  postId: string;
  likes: string[];
  comments: string[];
};

const PostActionBar: FC<PostActionBarProps> = ({ postId, likes, comments }) => {
  const { data: user } = useCurrentUserQuery();
  const userId = user._id;

  const [isLiked, setIsLiked] = useState(() => likes.includes(userId));
  const [likesCount, setLikesCount] = useState(likes.length);

  const { mutate: toggleLike } = useToggleLikeMutation();

  useEffect(() => {
    setIsLiked(likes.includes(userId));
    setLikesCount(likes.length);
  }, [likes, userId]);

  const handleLikeAction = () => {
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    toggleLike(postId);
  };

  const throttledToggleLike = useThrottleFn(handleLikeAction, 800);

  return (
    <div className="border-t border-b border-border select-none py-2 sm:py-3 text-muted-foreground">
      <div className="flex justify-between items-center px-2">
        <div
          onClick={throttledToggleLike}
          className="flex items-center gap-2 cursor-pointer transition-all duration-200"
        >
          <Heart
            className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
            strokeWidth={1.5}
          />
          <span>Likes ({likesCount})</span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer text-gray-500">
          <MessageCircle className="w-5 h-5" />
          <span>Comments ({comments ? comments?.length : 0})</span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer text-gray-500">
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer text-gray-500">
          <Send className="w-5 h-5" />
          <span>Send</span>
        </div>
      </div>
    </div>
  );
};

export default PostActionBar;
