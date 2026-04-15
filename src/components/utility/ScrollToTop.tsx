import { memo, useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = memo(function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <AnimatePresence>
            {visible && (
                <m.button
                    key="scroll-top"
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className="fixed bottom-25 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center bg-linear-to-br from-[#D4A853] via-[#F0C97A] to-[#B8892F] text-[#1A1A2E] shadow-[0_4px_20px_rgba(212,168,83,0.4)] hover:shadow-[0_6px_28px_rgba(212,168,83,0.6)] transition-shadow duration-200"
                    initial={{ opacity: 0, scale: 0.7, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.7, y: 12 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                >
                    <ArrowUp  className="w-5 h-5" aria-hidden="true" focusable="false" />
                </m.button>
            )}
        </AnimatePresence>
    );
});

export default ScrollToTop;
