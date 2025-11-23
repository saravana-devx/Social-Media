import { Skeleton } from "@/components/ui/skeleton";

export const PostSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      {[...Array(9)].map((_, i) => (
        <Skeleton
          key={i}
          className="w-full h-[200px] rounded-md bg-gray-300 animate-pulse"
        />
      ))}
    </div>
  );
};
