import { useState, useEffect } from "react";

// Breakpoint definitions matching Tailwind CSS
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isBreakpoint = (breakpoint: Breakpoint) => {
    return windowSize.width >= breakpoints[breakpoint];
  };

  const isBelow = (breakpoint: Breakpoint) => {
    return windowSize.width < breakpoints[breakpoint];
  };

  const isBetween = (min: Breakpoint, max: Breakpoint) => {
    return (
      windowSize.width >= breakpoints[min] &&
      windowSize.width < breakpoints[max]
    );
  };

  return {
    windowSize,
    isMobile: windowSize.width < breakpoints.md,
    isTablet: isBetween("md", "lg"),
    isDesktop: windowSize.width >= breakpoints.lg,
    isBreakpoint,
    isBelow,
    isBetween,
    breakpoints,
  };
}

// Hook for responsive values
export function useResponsiveValue<T>(values: {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  default: T;
}): T {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  if (isDesktop && values.desktop !== undefined) {
    return values.desktop;
  }
  if (isTablet && values.tablet !== undefined) {
    return values.tablet;
  }
  if (isMobile && values.mobile !== undefined) {
    return values.mobile;
  }
  return values.default;
}

// Hook for responsive columns
export function useResponsiveColumns(config: {
  mobile?: number;
  tablet?: number;
  desktop?: number;
  xl?: number;
}): number {
  const { windowSize } = useResponsive();

  if (windowSize.width >= breakpoints["2xl"] && config.xl) {
    return config.xl;
  }
  if (windowSize.width >= breakpoints.lg && config.desktop) {
    return config.desktop;
  }
  if (windowSize.width >= breakpoints.md && config.tablet) {
    return config.tablet;
  }
  return config.mobile || 1;
}

// Hook for responsive image sizes
export function useResponsiveImageSize() {
  const { windowSize } = useResponsive();

  if (windowSize.width >= breakpoints["2xl"]) {
    return "xl";
  }
  if (windowSize.width >= breakpoints.lg) {
    return "lg";
  }
  if (windowSize.width >= breakpoints.md) {
    return "md";
  }
  return "sm";
}

// Hook for adaptive loading based on device capabilities
export function useAdaptiveLoading() {
  const [connectionSpeed, setConnectionSpeed] = useState<"slow" | "fast">(
    "fast",
  );
  const { isMobile } = useResponsive();

  useEffect(() => {
    // Check network connection if available
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        const updateConnectionSpeed = () => {
          const effectiveType = connection.effectiveType;
          setConnectionSpeed(
            effectiveType === "slow-2g" || effectiveType === "2g"
              ? "slow"
              : "fast",
          );
        };

        updateConnectionSpeed();
        connection.addEventListener("change", updateConnectionSpeed);

        return () =>
          connection.removeEventListener("change", updateConnectionSpeed);
      }
    }
  }, []);

  return {
    shouldLazyLoad: isMobile || connectionSpeed === "slow",
    shouldPreload: !isMobile && connectionSpeed === "fast",
    preferReducedData: connectionSpeed === "slow",
    connectionSpeed,
  };
}

// Hook for scroll-based animations
export function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const observeElement = (element: HTMLElement | null) => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  };

  return {
    isVisible,
    scrollY,
    observeElement,
    scrollProgress: Math.min(
      scrollY / (document.body.scrollHeight - window.innerHeight),
      1,
    ),
  };
}
