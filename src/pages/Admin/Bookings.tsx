import { motion } from "framer-motion";
import { useDashboardStats } from "../../hooks/Admin/useDashboardStats";
import { fadeScaleVariant } from "../../utils/animations";
import { AlertCircle } from "lucide-react";
import MoviesTable from "../../components/Admin/Dashboard/MoviesTable";


const BookingPage = () => {
     const { data, isLoading, isError, error, refetch } = useDashboardStats();
    
    
  return (
    <div className="w-full text-white p-6 md:p-10 min-h-screen bg-transparent">
          {isLoading && (
              <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeScaleVariant}
                  className="flex flex-col items-center justify-center py-40"
              >
                  <div className="relative">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>

              </motion.div>
          )}

          {isError && (
              <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeScaleVariant}
        className="bg-red-500/5 border border-red-500/20 rounded-3xl p-12 flex flex-col items-center justify-center text-center my-8 backdrop-blur-xl"
      >
        <div className="p-6 bg-red-500/10 rounded-full mb-6">
          <AlertCircle className="w-12 h-12 text-red-500/60" />
        </div>
        <h3 className="text-2xl font-bold text-white font-serif mb-3"> Failed</h3>
        <p className="text-gray-500 mb-8 max-w-sm font-sans text-sm leading-relaxed">
          {error instanceof Error ? error.message : "We encountered a cinematic glitch while fetching the data. Please try again."}
        </p>
        <button
          onClick={() => refetch()}
          className="px-8 py-3.5 bg-linear-to-r from-red-600 to-red-800 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:shadow-lg hover:shadow-red-900/20 transition-all active:scale-95"
        >
          Retry Connection
        </button>
      </motion.div>
          )}

        {data?.success && data.stats && !isLoading && (
              <div className="flex flex-col gap-2">
                  <MoviesTable movieStats={data.stats.movieStats} />
              </div>
          )}

    </div>
  )
}

export default BookingPage