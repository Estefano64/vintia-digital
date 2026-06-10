"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated counter: counts from 0 to `end` when it scrolls into view.
 * Renders `prefix`/`suffix` around the number (e.g. "+100", "4.9★").
 */
export default function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 1600,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setValue(end);
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(end * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
