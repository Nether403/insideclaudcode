import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RedactedProps {
  children: React.ReactNode;
  label?: string;
}

export function Redacted({ children, label = "CLICK TO DECLASSIFY" }: RedactedProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <span className="relative inline">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.span
            key="redacted"
            className="inline cursor-pointer select-none px-1 py-0.5 rounded bg-redacted text-transparent hover:bg-redacted/80 transition-colors"
            style={{ filter: "blur(4px)", WebkitFilter: "blur(4px)" }}
            onClick={() => setRevealed(true)}
            title={label}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setRevealed(true)}
            exit={{ opacity: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.span>
        ) : (
          <motion.span
            key="revealed"
            className="inline text-accent font-semibold"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
