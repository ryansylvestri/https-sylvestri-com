"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
};

const directionStyles: Record<string, { initial: string; visible: string }> = {
  up: {
    initial: "translate-y-8 opacity-0",
    visible: "translate-y-0 opacity-100",
  },
  left: {
    initial: "-translate-x-8 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  right: {
    initial: "translate-x-8 opacity-0",
    visible: "translate-x-0 opacity-100",
  },
  scale: {
    initial: "scale-95 opacity-0",
    visible: "scale-100 opacity-100",
  },
};

export function RevealSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const styles = directionStyles[direction];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? styles.visible : styles.initial} ${className}`}
    >
      {children}
    </div>
  );
}
