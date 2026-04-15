import { useEffect } from "react";

export function useAutoCloseOnResize(
  isOpen: boolean,
  close: () => void
) {
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        close();
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen, close]);
}