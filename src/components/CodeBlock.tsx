import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = "typescript", title }: CodeBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="rounded-lg border border-border/50 overflow-hidden bg-muted/30"
    >
      {title && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border/30 bg-muted/50">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-accent/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-terminal/60" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground ml-2">{title}</span>
          <span className="ml-auto text-[10px] font-mono text-muted-foreground/50">{language}</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-terminal/90 leading-relaxed">{code}</code>
      </pre>
    </motion.div>
  );
}
