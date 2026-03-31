import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

export function AnimatedCounter({ end, duration = 2, prefix = "", suffix = "", label, icon }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border/50 bg-card/50 border-glow-cyan"
    >
      <div className="text-primary/70">{icon}</div>
      <span className="text-3xl md:text-4xl font-heading font-bold text-foreground">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
    </motion.div>
  );
}
