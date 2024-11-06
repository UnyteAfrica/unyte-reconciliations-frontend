import { useEffect, useRef, useState } from "react";

export const useLockScroll = (control: boolean) => {
  useEffect(() => {
    if (control) {
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.height = "auto";
        document.body.style.overflow = "visible";
      };
    }
  }, [control]);
};

export const useMediaQuery: (minPx: number) => {
  isMediaQueryMatched: boolean | undefined;
} = (minPx) => {
  const [isMediaQueryMatched, setIsMediaQueryMatched] = useState<boolean>();
  const hasSetInitially = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${minPx}px)`);
    if (!hasSetInitially.current) {
      setIsMediaQueryMatched(mediaQuery.matches);
      hasSetInitially.current = true;
    }
    window
      .matchMedia(`(min-width: ${minPx}px)`)
      .addEventListener("change", (ev) => {
        if (ev.matches) {
          setIsMediaQueryMatched(true);
        } else {
          setIsMediaQueryMatched(false);
        }
      });
  }, [minPx]);

  return {
    isMediaQueryMatched,
  };
};
