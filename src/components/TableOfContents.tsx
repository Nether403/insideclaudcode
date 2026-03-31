import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = document.querySelectorAll("main h2[id], main h3[id]");
    const items: TOCItem[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent?.replace(/^\d+\.\s*/, "") || "",
      level: el.tagName === "H2" ? 2 : 3,
    }));
    setHeadings(items);

    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length < 3) return null;

  return (
    <nav className="hidden xl:block fixed right-8 top-1/3 w-48 z-30">
      <div className="border-l border-border/30 pl-3 space-y-2">
        <span className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest block mb-3">
          On this page
        </span>
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={cn(
              "block text-[11px] font-mono transition-colors leading-tight",
              h.level === 3 && "pl-3",
              activeId === h.id
                ? "text-primary"
                : "text-muted-foreground/50 hover:text-muted-foreground"
            )}
          >
            {h.text}
          </a>
        ))}
      </div>
    </nav>
  );
}
