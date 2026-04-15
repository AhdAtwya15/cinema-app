import type { Variants, Easing } from "framer-motion";

export const fadeScaleVariant: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1.3, ease: "easeOut" as Easing }
    },
};

export const fadeSlideUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.3, ease: "easeOut" as Easing }
    },
};

export const fadeSlideUpDelayedVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.3, delay: 0.2, ease: "easeOut" as Easing }
    },
};

export const slideInLeftVariant: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" as Easing }
    },
};

export const slideInRightVariant: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" as Easing }
    },
};
