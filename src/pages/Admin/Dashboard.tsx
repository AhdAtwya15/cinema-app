import { useDashboardStats } from "../../hooks/Admin/useDashboardStats";
import StatsCards from "../../components/Admin/Dashboard/StatsCards";
import MoviesTable from "../../components/Admin/Dashboard/MoviesTable";
import {  AlertCircle, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import { slideInLeftVariant, fadeScaleVariant } from "../../utils/animations";
import DashboardSkeleton from "../../components/Admin/DashboardSkeleton";

const DashboardPage = () => {
  const { data, isLoading, isError, error, refetch } = useDashboardStats();

  return (
    <div className="w-full text-white p-6 md:p-10 min-h-screen bg-transparent">

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={slideInLeftVariant}
        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div className="relative pl-6">
          <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-linear-to-b from-[#D4A853] via-[#F0C97A] to-[#B8892F] rounded-full shadow-[0_0_15px_rgba(212,168,83,0.3)]" />
          <h1 className="text-4xl font-black tracking-tight mb-2 font-serif text-white uppercase italic">
            Dashboard
          </h1>
          <p className="text-gray-500 font-sans tracking-wide text-sm font-medium">
            Real-time overview of <span className="text-[#D4A853]">bookings</span>, <span className="text-green-500/80">revenue</span> and <span className="text-blue-400/80">user growth</span>
          </p>
        </div>

        <button 
          onClick={() => refetch()} 
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/5 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 hover:border-[#D4A853]/30 transition-all active:scale-95"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
          Refresh Data
        </button>
      </motion.div>

      {isLoading && (
        <DashboardSkeleton />
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
          <StatsCards stats={data.stats} />

          <MoviesTable movieStats={data.stats.movieStats} />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;