import { Ticket, DollarSign, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IDashboardStats } from "../../../types";
import { motion } from "framer-motion";
import type { Variants, TargetAndTransition, Easing } from "framer-motion";
import { fadeSlideUpVariant } from "../../../utils/animations";

interface IStatsCardsProps {
  stats: IDashboardStats;
}

interface ICardTheme {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  color: string;
  glowColor: string;
  themeGradient: string;
}

const StatsCards = ({ stats }: IStatsCardsProps) => {
  const cards: ICardTheme[] = [
    {
      label: "Total Bookings",
      value: stats.totalBookings.toLocaleString(),
      description: "Platform Overall",
      icon: Ticket,
      color: "#D4A853",
      glowColor: "rgba(212, 168, 83, 0.5)",
      themeGradient: "from-[#D4A853] via-[#F0C97A] to-[#B8892F]",
    },
    {
      label: "Total Revenue",
      value: `EGP ${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      description: "Total Earnings",
      icon: DollarSign,
      color: "#0C913C",
      glowColor: "rgba(16, 185, 129, 0.5)",
      themeGradient: "from-[#0C7435] via-[#0C913C] to-[#0CAD4A]",
    },
    {
      label: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      description: "Registered Users",
      icon: Users,
      color: "#3B82F6",
      glowColor: "rgba(59, 130, 246, 0.5)",
      themeGradient: "from-[#3B82F6] via-[#93C5FD] to-[#1E3A8A]",
    },
  ];

  const cardVariants: Variants = {
    ...fadeSlideUpVariant,
    visible: (i: number): TargetAndTransition => {
      const baseVisible = fadeSlideUpVariant.visible as TargetAndTransition;
      return {
        ...baseVisible,
        transition: {
          ...baseVisible.transition,
          delay: i * 0.1,
          ease: "easeOut" as Easing
        }
      };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="relative group bg-[#1A1A2E]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-7 overflow-hidden shadow-2xl shadow-black/40"
        >
          <div 
            className="absolute top-0 right-0 w-32 h-32 blur-3xl -mr-10 -mt-10 opacity-40 group-hover:opacity-70 transition-opacity"
            style={{ backgroundColor: card.glowColor }}
          />
          
          <div className="relative z-10 flex justify-between items-start mb-6">
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest font-sans mb-2">{card.label}</p>
              <h3 className="text-md md:text-xl lg:text-2xl  font-black text-white font-serif tracking-tight leading-none">
                {card.value}
              </h3>
            </div>
            <div 
              className="p-3.5 bg-white/5 rounded-xl border border-white/5 group-hover:border-current transition-colors"
              style={{ color: card.color }}
            >
              <card.icon className="w-6 h-6" />
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2">
            <span 
              className="text-[10px] font-bold py-1.5 px-3 rounded-full uppercase tracking-tighter border"
              style={{ 
                color: card.color, 
                backgroundColor: `${card.color}15`, 
                borderColor: `${card.color}25` 
              }}
            >
              {card.description}
            </span>
          </div>

  
          <div className={`absolute bottom-0 left-0 h-[3px] bg-linear-to-r ${card.themeGradient} w-0 group-hover:w-full transition-all duration-500 ease-in-out`} />
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
