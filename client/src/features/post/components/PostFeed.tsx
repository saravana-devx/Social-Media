import { useRef, useEffect } from "react";
import PostLayout from "./PostCard";
import { Loader2 } from "lucide-react";
import { useInfinitePosts } from "@/hooks/api/usePost";

const PostFeed = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfinitePosts();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Set up infinite scroll observer
  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  // Show initial loading
  if (isLoading) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <Loader2 className="animate-spin mx-auto h-6 w-6" />
        <p>Loading posts...</p>
      </div>
    );
  }

  // Error or no data
  if (status === "error") {
    return (
      <div className="text-center text-red-500 py-6">
        Failed to load posts. Try again.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data?.pages.map((page, pageIndex: any) =>
        page.posts.map((post: any) => <PostLayout key={post._id} post={post} />)
      )}

      {/* Fetching next posts */}
      {isFetchingNextPage && (
        <div className="text-center py-4 text-muted-foreground">
          <Loader2 className="animate-spin mx-auto h-6 w-6" />
          <p>Loading more...</p>
        </div>
      )}

      {/* Observer trigger */}
      {hasNextPage && <div ref={bottomRef} className="h-10" />}

      {/* No more posts */}
      {!hasNextPage && (
        <p className="text-center py-4 text-muted-foreground">
          You’ve reached the end 🎉
        </p>
      )}
    </div>
  );
};

export default PostFeed;
