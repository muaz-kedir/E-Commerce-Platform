"use client";
import { useState, useEffect, useCallback } from "react";

/**
 * Tracks window scroll position and provides scroll utilities.
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrollY(window.scrollY);
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { scrollY, isScrolled, scrollToTop };
}
