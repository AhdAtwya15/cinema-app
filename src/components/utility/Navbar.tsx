import { useState, useEffect, useRef, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import {
  Home,
  Film,
  Sparkles,
  Mail,
  Ticket,
  LogIn,
  X,
  Menu,
  LogOut,
} from "lucide-react";
import NavLogo from "./NavLogo";
import { useAuth } from "../../hooks/Auth/useAuth.ts";
import { useEscape } from "../../hooks/Navbar/useEscape.ts";
import { useAutoCloseOnResize } from "../../hooks/Navbar/useAutoCloseOnResize.ts";


const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Movies", icon: Film, href: "/movies" },
  { label: "Releases", icon: Sparkles, href: "/releases" },
  { label: "Contact", icon: Mail, href: "/contact" },
  { label: "Bookings", icon: Ticket, href: "/bookings" },
] as const;



const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.08 },
  },
} as const;

const ITEM_VARIANTS = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 340, damping: 28 },
  },
} as const;

const PANEL_VARIANTS = {
  hidden: { opacity: 0, y: -10, scaleY: 0.94 },
  visible: { opacity: 1, y: 0, scaleY: 1 },
  exit: { opacity: 0, y: -6, scaleY: 0.97 },
} as const;

const ICON_SWAP_TRANSITION = { duration: 0.16 } as const;
const PILL_SPRING = { type: "spring" as const, stiffness: 380, damping: 32 } as const;
const PANEL_SPRING = { type: "spring" as const, stiffness: 340, damping: 30 } as const;
const BTN_SPRING = { type: "spring" as const, stiffness: 420, damping: 26 } as const;
const LINK_SPRING = { type: "spring" as const, stiffness: 500, damping: 30 } as const;
const HEADER_EASE = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } as const;




function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}


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
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <NavLink to={href} className="outline-none">
      <motion.div
        className="group relative flex items-center gap-1.5 px-2 lg:px-3.5 py-2 rounded-full font-medium cursor-pointer text-[13px] "
        whileTap={{ scale: 0.93 }}
        transition={LINK_SPRING}
        aria-current={isActive ? "page" : undefined}
      >
        {isActive && (
          <motion.span
            layoutId="active-nav-pill"
            className="absolute inset-0 rounded-full bg-[rgba(212,168,83,0.12)] border border-[rgba(212,168,83,0.38)] shadow-[0_0_14px_rgba(212,168,83,0.10)_inset]"
            transition={PILL_SPRING}
          />
        )}

        <div>

        </div>

        <Icon
          size={13}
          strokeWidth={isActive ? 2 : 1.5}
          aria-hidden="true"
          focusable="false"
          className={`relative z-10 transition-colors duration-200 ${isActive ? "text-[#D4A853]" : "text-white/48 group-hover:text-[#D4A853] "
            }`}
        />
        <span
          className={`relative z-10 tracking-[0.03em] transition-colors duration-200 ${isActive ? "text-[#D4A853]" : "text-white/[0.58] group-hover:text-[#D4A853] "
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
    <nav
      className="hidden md:flex items-center  "
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => (
        <DesktopNavLink key={item.label} {...item} />
      ))}
    </nav>
  );
});

const LOGIN_HOVER = {
  scale: 1.04,
  boxShadow: "0 0 32px rgba(212,168,83,0.45), inset 0 1px 0 rgba(255,255,255,0.3)",
} as const;


const LoginButton = memo(function LoginButton({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();



  if (isLoggedIn) {
    return (
      <motion.button
        onClick={logout}
        className={`${mobile ? "w-full flex" : "hidden md:flex"
          } items-center justify-center gap-2 rounded-full font-semibold overflow-hidden outline-none select-none text-[12px] tracking-widest uppercase text-white bg-red-500/80 hover:bg-red-500 ${mobile ? "px-4 py-2.75" : "px-5 py-2"
          }`}
        whileTap={{ scale: 0.96 }}
        transition={BTN_SPRING}
      >
        <LogOut size={13} strokeWidth={2.5} aria-hidden="true" focusable="false" />
        Logout
      </motion.button>
    );
  }

  return (
    <motion.button
      className={`${mobile ? "w-full flex" : "hidden md:flex"
        } items-center justify-center gap-2 rounded-full font-semibold overflow-hidden outline-none select-none text-[12px] tracking-widest uppercase text-[#1A1A2E] bg-linear-to-br from-[#D4A853] via-[#F0C97A] to-[#B8892F] ${mobile ? "px-4 py-2.75" : "px-5 py-2"
        }`}
      whileHover={LOGIN_HOVER}
      whileTap={{ scale: 0.96 }}
      transition={BTN_SPRING}
      onClick={() => navigate("/login")}
    >
      <LogIn size={13} strokeWidth={2.5} aria-hidden="true" focusable="false" />
      Login
    </motion.button>
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
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.div variants={ITEM_VARIANTS}>
      <NavLink to={href} className="outline-none block">
        <motion.div
          className={`flex items-center gap-3 w-full rounded-xl text-[13px] font-medium tracking-[0.03em]  transition-all duration-150 mb-0.5 px-3.5 py-2.75 ${isActive
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
            focusable="false"
          />
          {label}
          {isActive && (
            <motion.span
              layoutId="mobile-dot"
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
  const prevPathnameRef = useRef(pathname);

  const closeMenu = () => setIsOpen(false);

  useEscape(closeMenu);
  useAutoCloseOnResize(isOpen, closeMenu);


  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      const id = setTimeout(() => setIsOpen(false), 0);
      return () => clearTimeout(id);
    }
  }, [pathname]);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

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
              transition={ICON_SWAP_TRANSITION}
            >
              <X size={15} strokeWidth={2} aria-hidden="true" focusable="false" />
            </motion.span>
          ) : (
            <motion.span
              key="m"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={ICON_SWAP_TRANSITION}
            >
              <Menu size={15} strokeWidth={2} aria-hidden="true" focusable="false" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-panel"
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
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item) => (
                <MobileNavItem
                  key={item.label}
                  {...item}
                  pathname={pathname}
                />
              ))}
            </motion.nav>

            <div className="h-px bg-white/5 mx-3.5" />

            <div className="p-3">
              <LoginButton mobile />
            </div>

            <div className="h-px bg-linear-to-r from-transparent via-[rgba(212,168,83,0.28)] to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Navbar = () => {
  const scrolled = useScrolled(20);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={HEADER_EASE}
      role="banner"
    >
      <div
        className={`relative w-full max-w-220 flex items-center justify-between px-4 md:px-1 h-14 rounded-full transition-all duration-500 ease-in-out ${scrolled
          ? "border border-[rgba(212,168,83,0.20)] bg-[rgba(17,17,34,0.84)] backdrop-blur-[22px] backdrop-saturate-150 shadow-[0_8px_36px_rgba(0,0,0,0.52),0_0_0_1px_rgba(212,168,83,0.07)]"
          : "border border-white/[0.07] bg-[rgba(22,22,44,0.62)] backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.28)]"
          }`}
      >
        <div
          aria-hidden
          className={`absolute top-0 left-1/2 -translate-x-1/2 h-px rounded-full bg-linear-to-r from-transparent via-[rgba(212,168,83,0.42)] to-transparent transition-all duration-500 ${scrolled ? "w-[55%]" : "w-[35%]"
            }`}
        />

        <NavLogo />
        <DesktopNav />

        <div className="flex items-center gap-2 pr-2">
          <LoginButton />
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;