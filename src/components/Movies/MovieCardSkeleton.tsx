import { Skeleton } from "../ui/Skeleton";

interface MovieCardSkeletonProps {
  isSmall?: boolean;
}

const MovieCardSkeleton = ({ isSmall }: MovieCardSkeletonProps) => {
  return (
    <div className="bg-[#1A2232] rounded-2xl overflow-hidden border border-neutral-800 flex flex-col h-full shadow-lg">
      <div className="relative aspect-4/5 md:aspect-2/3 w-full">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      <div className="p-5 flex flex-col grow gap-3">
        {/* Title */}
        <Skeleton className="h-7 w-3/4" />
        
        {/* Rating & Duration */}
        <div className="flex gap-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>

        {/* Story */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>

        {/* Price & Button */}
        <div className="mt-auto flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-20" />
          {!isSmall && <Skeleton className="h-9 w-24 rounded-lg" />}
        </div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
