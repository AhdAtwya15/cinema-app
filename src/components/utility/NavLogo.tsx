import { motion } from "framer-motion";
import { Clapperboard } from "lucide-react";
import { memo } from "react";
import { NavLink } from "react-router-dom";

const LOGO_SPRING          = { type: "spring" as const, stiffness: 400, damping: 25 } as const;

const NavLogo = memo(function NavLogo() {
  return (
    <NavLink
      to="/"
      className="flex items-center gap-2.5 select-none outline-none group px-3"
    >
      <motion.div
        className="flex items-center gap-2.5"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={LOGO_SPRING}
      >
        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.28)]">
          <Clapperboard
            size={17}
            strokeWidth={1.5}
            className="text-[#D4A853] drop-shadow-[0_0_5px_rgba(212,168,83,0.55)]"
          />
        </div>

        <div className="flex flex-col leading-none">
          <span className="font-semibold tracking-[0.22em] uppercase text-[#D4A853] text-[15px] font-['Georgia','Times_New_Roman',serif]">
            Luxure
          </span>
          <span className="text-[8px] tracking-[0.38em] uppercase text-white/35 font-light mt-0.5">
            Cinema
          </span>
        </div>
      </motion.div>
    </NavLink>
  );
});


export default NavLogo;
