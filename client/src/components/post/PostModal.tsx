import React from "react";
import { PersonAvatar } from "../layout";
import Comment from "@/components/layout/CommentLayout";
import { ImageZoom } from "@/components/ui/shadcn-io/image-zoom";

interface PostMedia {
  _id: string;
  url: string;
  resource_type: "image" | "video";
  format: string;
  width?: number;
  height?: number;
}

interface User {
  _id: string;
  userName: string;
  profileImage?: string;
}

interface Post {
  _id: string;
  userId: User;
  media?: PostMedia;
  description: string;
  likes: any[];
  comments: any[];
  shares?: number;
  createdAt: string;
}

interface PostModalProps {
  post: Post | null; // Allow null to prevent crashes
}

const PostModal: React.FC<PostModalProps> = ({ post }) => {
  // If post is null, show fallback UI
  if (!post) {
    return (
      <div className="text-center text-muted-foreground p-6">
        Post data is not available.
      </div>
    );
  }

  return (
    <div className="bg-card max-w-3xl mx-auto mt-4 p-6 rounded-xl shadow-md border border-border flex flex-col gap-4 font-sans">

      {/* Header */}
      <div className="flex gap-4 items-center">
        {/* <PersonAvatar image={post.userId?.profileImage} view={false} /> */}

        <div>
          <p className="text-foreground font-semibold text-base">
            {post.userId?.userName || "Unknown User"}{" "}
            <span className="text-muted-foreground text-sm">
              · {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
            </span>
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="text-foreground text-base">
        <p>{post.description}</p>
      </div>

      {/* Media */}
      {post.media?.url && (
        <div className="rounded-lg overflow-hidden shadow-sm">
          {post.media.resource_type === "image" ? (
            <ImageZoom>
              <img
                src={post.media.url}
                alt="Post"
                className="w-full max-h-[500px] object-cover rounded-lg"
              />
            </ImageZoom>
          ) : (
            <video
              src={post.media.url}
              controls
              className="w-full max-h-[500px] rounded-lg"
            />
          )}
        </div>
      )}

      {/* Actions */}
      <div className="border-t border-b border-border flex justify-between py-3 text-muted-foreground">
        <PostAction label={`Liked (${post.likes?.length ?? 0})`}>❤️</PostAction>
        <PostAction label={`Comments (${post.comments?.length ?? 0})`}>💬</PostAction>
        <PostAction label={`Share (${post.shares ?? 0})`}>🔁</PostAction>
        <PostAction label="Send">📤</PostAction>
      </div>

      <Comment />
    </div>
  );
};

export default PostModal;

// Reusable Action Component
const PostAction = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => (
  <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
    {children}
    <span className="text-sm font-medium">{label}</span>
  </div>
);
