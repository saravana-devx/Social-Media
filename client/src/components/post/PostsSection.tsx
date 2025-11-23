import { useState } from "react";
import { Button } from "../ui/button";
import PostModal from "./PostModal";


export interface PostMedia {
  url?: string;
  public_id?: string;
  resource_type: "image" | "video";
}

export interface PostUser {
  _id: string;
  userName: string;
  profileImage?: string;
}

export interface PostType {
  _id: string;
  userId: PostUser;
  media: PostMedia;
  description?: string;
  likes: string[];
  comments: string[];
}

interface PostsSectionProps {
  posts: PostType[];
}


const FALLBACK_IMAGE =
  "https://res.cloudinary.com/dl5w7xxf8/image/upload/v1763289836/gecdubyl2glw15dbgsei.jpg";

const PostsSection = ({ posts }: PostsSectionProps) => {
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

  // Generate video thumbnail using public_id
  const getThumbnail = (media: PostMedia): string => {
    if (!media?.url) return FALLBACK_IMAGE;

    if (media.resource_type === "video" && media.public_id) {
      return `https://res.cloudinary.com/dl5w7xxf8/video/upload/so_0/${media.public_id}.jpg`;
    }

    return media.url; // image case
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center border rounded-lg bg-card shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-muted-foreground mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 9l9-6 9 6M4 10v10h16V10M10 14h4"
          />
        </svg>

        <h3 className="text-lg font-semibold text-foreground">No Posts Yet</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Looks like there are no posts to show right now.
        </p>
        <Button
          variant="default"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-4">

      <div className="grid grid-cols-3 gap-2">
        {posts.map((post) => {
          const thumbnail = getThumbnail(post.media);

          return (
            <div key={post._id} className="relative group">
              {post.media.resource_type === "video" ? (
                <div
                  className="relative cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <img
                    src={thumbnail}
                    alt="Video Thumbnail"
                    className="w-full h-full aspect-square object-cover rounded-md"
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src = FALLBACK_IMAGE)
                    }
                  />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/60 p-3 rounded-full backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={thumbnail}
                  alt="Post Thumbnail"
                  className="w-full h-full aspect-square object-cover rounded-md cursor-pointer hover:opacity-90 transition"
                  onClick={() => setSelectedPost(post)}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src = FALLBACK_IMAGE)
                  }
                />
              )}
            </div>
          );
        })}
      </div>

      <PostModal
        // open={!!selectedPost}
        post={selectedPost}
        // onClose={() => setSelectedPost(null)}
      />
    </div>
  );
};

export default PostsSection;