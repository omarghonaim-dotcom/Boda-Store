import { useEffect, useRef, useState, type ReactNode } from "react";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-in"
  | "zoom-in"
  | "zoom-out"
  | "flip-x"
  | "flip-y"
  | "scale-up"
  | "blur-in";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const animationClasses: Record<AnimationType, { hidden: string; visible: string }> = {
  "fade-up": {
    hidden: "opacity-0 translate-y-12",
    visible: "opacity-100 translate-y-0",
  },
  "fade-down": {
    hidden: "opacity-0 -translate-y-12",
    visible: "opacity-100 translate-y-0",
  },
  "fade-left": {
    hidden: "opacity-0 translate-x-12",
    visible: "opacity-100 translate-x-0",
  },
  "fade-right": {
    hidden: "opacity-0 -translate-x-12",
    visible: "opacity-100 translate-x-0",
  },
  "fade-in": {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
  "zoom-in": {
    hidden: "opacity-0 scale-90",
    visible: "opacity-100 scale-100",
  },
  "zoom-out": {
    hidden: "opacity-0 scale-110",
    visible: "opacity-100 scale-100",
  },
  "flip-x": {
    hidden: "opacity-0 -rotate-x-90",
    visible: "opacity-100 rotate-x-0",
  },
  "flip-y": {
    hidden: "opacity-0 -rotate-y-90",
    visible: "opacity-100 rotate-y-0",
  },
  "scale-up": {
    hidden: "opacity-0 scale-75",
    visible: "opacity-100 scale-100",
  },
  "blur-in": {
    hidden: "opacity-0 blur-md",
    visible: "opacity-100 blur-0",
  },
};

function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);

    // Fallback for mobile: show content after a delay if not triggered by scroll
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [threshold, once]);

  const { hidden, visible } = animationClasses[animation];

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transformStyle: "preserve-3d",
      }}
      data-visible={isVisible ? "true" : "false"}
      aria-hidden={!isVisible}
    >
      <div
        className={`transition-all ease-out ${
          isVisible ? visible : hidden
        }`}
        style={{
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default ScrollReveal;
