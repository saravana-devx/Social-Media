import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "@/utils";
import { PersonAvatar } from "@/components/layout";
import CustomVideoPlayer from "@/components/shared/CustomVideoPlayer";
import PostActionsBar from "./PostAction";

interface PostProps {
  post: any;
}

const PostCard: React.FC<PostProps> = ({ post }) => {
  if (!post) return null;

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (post.media && currentIndex < post.media.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentMedia = post.media[currentIndex];
  const isImage = currentMedia?.resource_type === "image";
  const isVideo = currentMedia?.resource_type === "video";

  const isSingleMedia = post.media.length === 1;
  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_LENGTH = 200;
  const description = post.description || "";
  const shouldTruncate = description.length > MAX_LENGTH;

  const displayedText =
    !isExpanded && shouldTruncate
      ? description.slice(0, MAX_LENGTH) + "..."
      : description;

  return (
    <div className="bg-card w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto my-3 sm:my-4 p-3 sm:p-4 md:p-6 rounded-xl shadow-md flex flex-col gap-3 sm:gap-4 font-sans border border-border">
      <div className="flex items-start sm:items-center gap-3 sm:gap-4">
        <PersonAvatar image={post?.userId?.profileImage} view={false} />
        <div className="min-w-0">
          <p className="text-foreground font-semibold text-sm sm:text-base truncate">
            {post?.userId?.userName || "Unknown User"}{" "}
            <span className="text-muted-foreground font-normal text-xs sm:text-sm">
              • {post?.createdAt ? formatDate(post.createdAt) : "Recently"}
            </span>
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm truncate">
            {post?.userId?.firstName} {post?.userId?.lastName || "Member"}
          </p>
        </div>
      </div>

      {post.description && (
        <p className="text-foreground text-sm sm:text-base leading-relaxed break-words">
          {displayedText}
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary cursor-pointer hover:underline ml-1 font-medium"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </p>
      )}

      {post?.media && post.media.length > 0 && (
        <div
          className={`relative w-full overflow-hidden rounded-lg shadow-sm flex items-center justify-center bg-muted/10 ${
            isSingleMedia ? "" : "aspect-[3/2] bg-black/100"
          }`}
        >
          {isImage ? (
            <img
              src={currentMedia.url}
              alt="Post"
              className={`rounded-lg object-contain ${
                isSingleMedia
                  ? "w-auto max-w-full max-h-[90vh]"
                  : "w-full h-full"
              }`}
            />
          ) : isVideo ? (
            <CustomVideoPlayer
              src={currentMedia.url}
              // className={isSingleMedia ? "max-h-[90vh]" : "w-full h-full"}
            />
          ) : null}

          {/* Chevron Navigation */}
          {post.media.length > 1 && (
            <>
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`absolute top-1/2 left-2 -translate-y-1/2 text-white p-2 rounded-full  ${
                  currentIndex === 0
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                disabled={currentIndex === post.media.length - 1}
                className={`absolute top-1/2 right-2 -translate-y-1/2  text-white p-2 rounded-full  ${
                  currentIndex === post.media.length - 1
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      )}
      <PostActionsBar />
    </div>
  );
};

export default PostCard;
