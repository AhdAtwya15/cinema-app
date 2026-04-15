import { useState, memo, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FilePlus,
  List,
  Ticket,
  Clapperboard,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../../hooks/Auth/useAuth";

const ADMIN_NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Add Movie", icon: FilePlus, href: "/admin/add-movie" },
  { label: "List Movies", icon: List, href: "/admin/movies" },
  { label: "Bookings", icon: Ticket, href: "/admin/bookings" },
] as const;


const PANEL_VARIANTS = {
  hidden: { opacity: 0, y: -10, scaleY: 0.94 },
  visible: { opacity: 1, y: 0, scaleY: 1 },
  exit: { opacity: 0, y: -6, scaleY: 0.97 },
} as const;

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } },
} as const;

const ITEM_VARIANTS = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 340, damping: 28 } },
} as const;

const PILL_SPRING = { type: "spring" as const, stiffness: 380, damping: 32 } as const;
const PANEL_SPRING = { type: "spring" as const, stiffness: 340, damping: 30 } as const;
const ICON_SWAP = { duration: 0.16 } as const;

function DesktopNavLink({
  label,
  icon: Icon,
  href,
}: {
  label: string;
  icon: React.ElementType;
  href: string;
}) {
  const { pathname } = useLocation();
  const isActive =
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <NavLink to={href} className="outline-none">
      <motion.div
        className="group relative flex items-center gap-1.5 px-3.5 py-2 rounded-full font-medium cursor-pointer text-[10.1px] lg:text-[13px]"
        whileTap={{ scale: 0.93 }}
        transition={PILL_SPRING}
        aria-current={isActive ? "page" : undefined}
      >
        {isActive && (
          <motion.span
            layoutId="admin-active-pill"
            className="absolute inset-0 rounded-full bg-[rgba(212,168,83,0.12)] border border-[rgba(212,168,83,0.38)] shadow-[0_0_14px_rgba(212,168,83,0.10)_inset]"
            transition={PILL_SPRING}
          />
        )}

        <Icon
          size={13}
          strokeWidth={isActive ? 2 : 1.5}
          aria-hidden="true"
          className={`relative z-10 transition-colors duration-200 ${isActive
              ? "text-[#D4A853]"
              : "text-white/48 group-hover:text-[#D4A853]"
            }`}
        />

        <span
          className={`relative z-10 tracking-[0.03em] transition-colors duration-200 ${isActive
              ? "text-[#D4A853]"
              : "text-white/[0.58] group-hover:text-[#D4A853]"
            }`}
        >
          {label}
        </span>
      </motion.div>
    </NavLink>
  );
}

const DesktopNav = memo(function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center" aria-label="Admin navigation">
      {ADMIN_NAV_ITEMS.map((item) => (
        <DesktopNavLink key={item.label} {...item} />
      ))}
    </nav>
  );
});


function MobileNavItem({
  label,
  icon: Icon,
  href,
  pathname,
}: {
  label: string;
  icon: React.ElementType;
  href: string;
  pathname: string;
}) {
  const isActive =
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <motion.div variants={ITEM_VARIANTS}>
      <NavLink to={href} className="outline-none block">
        <motion.div
          className={`flex items-center gap-3 w-full rounded-xl text-[13px] font-medium tracking-[0.03em] transition-all duration-150 mb-0.5 px-3.5 py-2.75 ${isActive
              ? "border border-[rgba(212,168,83,0.28)] bg-[rgba(212,168,83,0.10)] text-[#D4A853]"
              : "border border-transparent bg-transparent text-white/[0.58] hover:text-[#D4A853]"
            }`}
          whileTap={{ scale: 0.97 }}
          aria-current={isActive ? "page" : undefined}
        >
          <Icon
            size={15}
            strokeWidth={isActive ? 2 : 1.5}
            className="shrink-0"
            aria-hidden="true"
          />
          {label}
          {isActive && (
            <motion.span
              layoutId="admin-mobile-dot"
              className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D4A853] shadow-[0_0_6px_rgba(212,168,83,0.8)] shrink-0"
            />
          )}
        </motion.div>
      </NavLink>
    </motion.div>
  );
}

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((p) => !p), []);

  return (
    <div className="md:hidden relative">
      <motion.button
        onClick={toggle}
        className={`flex items-center justify-center w-9 h-9 rounded-full outline-none transition-all duration-200 ${isOpen
            ? "border border-[rgba(212,168,83,0.4)] bg-[rgba(212,168,83,0.08)] text-[#D4A853]"
            : "border border-white/10 bg-white/5 text-white/65"
          }`}
        whileTap={{ scale: 0.88 }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={ICON_SWAP}
            >
              <X size={15} strokeWidth={2} aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="m"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={ICON_SWAP}
            >
              <Menu size={15} strokeWidth={2} aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="admin-mobile-panel"
            variants={PANEL_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={PANEL_SPRING}
            className="absolute top-[calc(100%+12px)] right-0 w-60 rounded-[18px] overflow-hidden border border-[rgba(212,168,83,0.15)] bg-[rgba(18,18,36,0.96)] backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.65),0_0_0_1px_rgba(212,168,83,0.07)]"
            style={{ transformOrigin: "top right", zIndex: 999 }}
          >
            <div className="h-px bg-linear-to-r from-transparent via-[rgba(212,168,83,0.45)] to-transparent" />

            <motion.nav
              className="p-3"
              variants={CONTAINER_VARIANTS}
              initial="hidden"
              animate="visible"
              aria-label="Admin mobile navigation"
            >
              {ADMIN_NAV_ITEMS.map((item) => (
                <MobileNavItem
                  key={item.label}
                  {...item}
                  pathname={pathname}
                />
              ))}
            </motion.nav>

            <div className="h-px bg-white/5 mx-3.5" />
            <div className="p-3">
              <LogoutButton mobile onClose={closeMenu} />
            </div>
            <div className="h-px bg-linear-to-r from-transparent via-[rgba(212,168,83,0.28)] to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const BTN_SPRING = { type: "spring" as const, stiffness: 420, damping: 26 } as const;

const LogoutButton = memo(function LogoutButton({
  mobile = false,
  onClose,
}: {
  mobile?: boolean;
  onClose?: () => void;
}) {

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose?.();
   
  };

  return (
    <motion.button
      onClick={handleLogout}
      className={`${mobile ? "w-full flex" : "hidden md:flex"
        } items-center justify-center gap-2 rounded-full font-semibold overflow-hidden outline-none select-none text-[12px] tracking-widest uppercase text-white bg-red-500/70 hover:bg-red-500/90 px-5 py-2`}
      whileTap={{ scale: 0.96 }}
      transition={BTN_SPRING}
    >
      <LogOut size={13} strokeWidth={2.5} aria-hidden="true" />
      Logout
    </motion.button>
  );
});


const AdminBrand = memo(function AdminBrand() {
  return (
    <NavLink
      to="/admin"
      className="flex items-center gap-2.5 select-none outline-none group px-3"
    >
      <motion.div
        className="flex items-center gap-2.5"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={PILL_SPRING}
      >
        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[rgba(212,168,83,0.08)] border border-[rgba(212,168,83,0.28)]">
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
            Admin
          </span>
        </div>
      </motion.div>
    </NavLink>
  );
});

const AdminNavBar = () => {
  return (
    <motion.header
      className="sticky top-0 z-50 flex justify-center px-4 pt-4 pb-2"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      role="banner"
    >
      <div className="relative w-full max-w-7xl flex items-center justify-between px-4 md:px-2 h-14 rounded-full border border-[rgba(212,168,83,0.20)] bg-[rgba(17,17,34,0.88)] backdrop-blur-[22px] backdrop-saturate-150 shadow-[0_8px_36px_rgba(0,0,0,0.52),0_0_0_1px_rgba(212,168,83,0.07)]">

        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-px rounded-full bg-linear-to-r from-transparent via-[rgba(212,168,83,0.42)] to-transparent"
        />
        <AdminBrand />
        <DesktopNav />
        <div className="flex items-center gap-2 pr-2">
          <LogoutButton />
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
};

export default AdminNavBar;