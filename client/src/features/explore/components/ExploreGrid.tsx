import React from "react";
import { Play } from "lucide-react";
import { useUserPostsQuery } from "@/features/profile/hooks/useProfile";

const ExploreGrid: React.FC = () => {
  const userId = "69105bcfb13305ede9dadfb3";
  const { data } = useUserPostsQuery(userId);
  const repeatedPosts = data?.data?.posts
    ? Array.from({ length: 10 }, () => data.data.posts).flat()
    : [];
  return (
    <div className="sm:w-9/12 mx-auto mt-4 columns-3  gap-2 sm:gap-3 lg:gap-4 w-full px-2">
      {repeatedPosts.map((post: any) => {
        const media = post.media?.[0]; // Show first media (like Instagram Explore)
        if (!media) return null;

        const isVideo = media.resource_type === "video";

        return (
          <div
            key={post._id}
            className="relative mb-2  rounded-lg overflow-hidden cursor-pointer group"
            // onClick={() => onOpenPost?.(post)}
          >
            {/* Image or Video Thumbnail */}
            {isVideo ? (
              <video
                src={media.url}
                muted
                className="w-full rounded-lg object-cover group-hover:brightness-90 transition"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
              />
            ) : (
              <img
                src={media.url}
                alt="Explore"
                className="w-full rounded-lg object-cover group-hover:brightness-90 transition"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()} // optional: blocks right-click
              />
            )}
            {/* Video Icon Overlay */}
            {isVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 text-white p-1.5 rounded-full">
                  <Play size={18} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ExploreGrid;
