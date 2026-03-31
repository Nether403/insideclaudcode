import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const commands = [
  { cmd: "$ npm pack @anthropic-ai/claude-code@latest", delay: 60, pause: 800 },
  { cmd: "claude-code-0.2.40.tgz", delay: 0, pause: 400, isOutput: true },
  { cmd: "$ tar -xzf claude-code-0.2.40.tgz", delay: 50, pause: 600 },
  { cmd: "$ find package/src -type f | wc -l", delay: 50, pause: 500 },
  { cmd: "2,187", delay: 0, pause: 400, isOutput: true },
  { cmd: '$ grep -r "STEALTH_DIRECTIVES" package/src/', delay: 40, pause: 700 },
  { cmd: "src/internal/stealth/directives.ts:  export const STEALTH_DIRECTIVES = {", delay: 0, pause: 300, isOutput: true, highlight: true },
  { cmd: "src/internal/stealth/loader.ts:    ...STEALTH_DIRECTIVES,", delay: 0, pause: 400, isOutput: true, highlight: true },
  { cmd: '$ grep -r "MODEL_REGISTRY" package/src/ | head -3', delay: 40, pause: 600 },
  { cmd: 'src/config/models.ts:  "fennec": { version: "4.0", status: "testing" },', delay: 0, pause: 200, isOutput: true, highlight: true },
  { cmd: 'src/config/models.ts:  "numbat": { version: "4.1", status: "development" },', delay: 0, pause: 200, isOutput: true, highlight: true },
  { cmd: '$ echo "Source code is fully readable — no obfuscation."', delay: 40, pause: 500 },
  { cmd: "Source code is fully readable — no obfuscation.", delay: 0, pause: 1500, isOutput: true },
];

export function LiveTerminal() {
  const [lines, setLines] = useState<typeof commands>([]);
  const [currentText, setCurrentText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInView || lineIndex >= commands.length) return;

    const line = commands[lineIndex];

    if (line.isOutput || line.delay === 0) {
      // Instant output
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, line]);
        setLineIndex((i) => i + 1);
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, line.pause);
      return () => clearTimeout(timeout);
    }

    if (!isTyping) {
      setIsTyping(true);
      setCurrentText("");
      setCharIndex(0);
      return;
    }

    if (charIndex < line.cmd.length) {
      const timeout = setTimeout(() => {
        setCurrentText(line.cmd.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, line.delay);
      return () => clearTimeout(timeout);
    }

    // Finished typing, push line
    const timeout = setTimeout(() => {
      setLines((prev) => [...prev, line]);
      setCurrentText("");
      setIsTyping(false);
      setLineIndex((i) => i + 1);
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, line.pause);
    return () => clearTimeout(timeout);
  }, [isInView, lineIndex, charIndex, isTyping]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-lg border border-border/50 bg-background/80 overflow-hidden"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 border-b border-border/30">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-accent/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-terminal/60" />
        </div>
        <span className="text-[10px] font-mono text-muted-foreground ml-2">terminal — discovery session</span>
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-xs sm:text-sm max-h-80 overflow-y-auto space-y-1">
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.highlight
                ? "text-accent"
                : line.isOutput
                ? "text-muted-foreground"
                : "text-terminal"
            }
          >
            {line.cmd}
          </div>
        ))}
        {isTyping && (
          <div className="text-terminal">
            {currentText}
            <span className="border-r-2 border-primary animate-blink ml-0.5">&nbsp;</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </motion.div>
  );
}
