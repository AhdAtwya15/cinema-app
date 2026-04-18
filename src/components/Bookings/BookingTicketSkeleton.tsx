import { Skeleton } from "../ui/Skeleton";

const BookingTicketSkeleton = () => {
  return (
    <div className="relative flex flex-col md:flex-row w-full bg-[#1A2232] rounded-2xl overflow-hidden border border-neutral-800 shadow-xl min-h-[220px]">
     
      <div className="relative w-full md:w-48 h-64 md:h-auto">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

   
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>

          <div className="space-y-3">
             <Skeleton className="h-4 w-32" />
             <div className="flex gap-2">
                <Skeleton className="h-6 w-12 rounded-full" />
                <Skeleton className="h-6 w-12 rounded-full" />
             </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-800/50 flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <div className="text-right flex flex-col items-end gap-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </div>

      <div className="w-full md:w-32 bg-black/10 p-6 flex items-center justify-center border-t md:border-t-0 md:border-l border-neutral-800">
        <Skeleton className="w-20 h-20 rounded-lg" />
      </div>
    </div>
  );
};

export default BookingTicketSkeleton;
