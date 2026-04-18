import { Skeleton } from "../ui/Skeleton";

const MovieDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#191C33] pt-28 pb-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col items-center mb-12">
          <Skeleton className="h-10 w-10 rounded-full absolute left-0 top-0" />
          <Skeleton className="h-16 md:h-20 w-3/4 mb-6" />
          <div className="flex gap-3">
             <Skeleton className="h-8 w-24 rounded-full" />
             <Skeleton className="h-8 w-24 rounded-full" />
             <Skeleton className="h-8 w-32 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Skeleton className="aspect-2/3 w-full rounded-3xl" />
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>

          <div className="lg:col-span-8 flex flex-col gap-10">
            <div className="bg-[#1E223D]/30 p-8 rounded-3xl border border-white/5 space-y-8">
              <Skeleton className="h-8 w-48" />
              <div className="flex gap-4">
                 <Skeleton className="h-20 w-16 rounded-xl" />
                 <Skeleton className="h-20 w-16 rounded-xl" />
                 <Skeleton className="h-20 w-16 rounded-xl" />
              </div>
              <div className="flex flex-wrap gap-4">
                 <Skeleton className="h-12 w-24 rounded-xl" />
                 <Skeleton className="h-12 w-24 rounded-xl" />
                 <Skeleton className="h-12 w-24 rounded-xl" />
              </div>
            </div>

            <div className="space-y-4">
               <Skeleton className="h-6 w-32" />
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-2/3" />
            </div>

            <div className="space-y-6">
               <Skeleton className="h-8 w-40" />
               <div className="flex gap-6">
                  <Skeleton className="h-40 w-32 rounded-2xl shrink-0" />
                  <Skeleton className="h-40 w-32 rounded-2xl shrink-0" />
                  <Skeleton className="h-40 w-32 rounded-2xl shrink-0" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsSkeleton;
