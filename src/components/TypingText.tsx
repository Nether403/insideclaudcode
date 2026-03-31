import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
}

export function TypingText({ text, speed = 50, className = "", delay = 0 }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(timer);
      }, speed);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isInView, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      <span className="border-r-2 border-primary animate-blink ml-0.5">&nbsp;</span>
    </span>
  );
}
