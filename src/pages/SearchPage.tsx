import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, FileText, Terminal, Shield, Cpu, Zap, Database, ArrowRight, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";

interface SearchEntry {
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  route: string;
  icon: React.ElementType;
}

const searchIndex: SearchEntry[] = [
  { title: "Undercover Mode", excerpt: "Claude Code contains a stealth protocol called 'Undercover Mode' with STEALTH_DIRECTIVES that instruct the AI to conceal its nature during pair programming sessions.", category: "Revelations", tags: ["stealth", "directives", "isInternal", "pair programming", "concealment"], route: "/revelations/undercover", icon: Shield },
  { title: "Model Codename Registry", excerpt: "Internal registry maps animal codenames to unreleased models: Fennec (Claude 4.0), Capybara (Claude 3.7), Tangu (Claude 3.6), Numbat (1M+ context).", category: "Revelations", tags: ["fennec", "capybara", "tangu", "numbat", "models", "codenames", "4.0", "3.7"], route: "/revelations/models", icon: Cpu },
  { title: "Hidden Features", excerpt: "Unreleased features include Buddy (AI companion pet), KAIROS (dreaming assistant), Ultraplan (autonomous planner), and Coordinator (multi-agent orchestration).", category: "Revelations", tags: ["buddy", "kairos", "ultraplan", "coordinator", "AI pet", "dreaming", "multi-agent"], route: "/revelations/features", icon: Zap },
  { title: "Architecture Deep-Dive", excerpt: "5-stage boot sequence, 4-stage query loop with mid-generation tool execution, and a comprehensive tool registration system with 25+ built-in tools.", category: "Revelations", tags: ["boot sequence", "query loop", "tools", "context", "streaming", "tool execution"], route: "/revelations/architecture", icon: Database },
  { title: "Security & Safety Systems", excerpt: "YOLO Classifier for risk assessment, Bash AST Analyzer for shell command safety, Unicode Smuggling Guard, and ptrace-based anti-debugging protection.", category: "Revelations", tags: ["yolo", "bash", "unicode", "ptrace", "security", "AST", "classifier"], route: "/revelations/security", icon: Shield },
  { title: "Interactive Timeline", excerpt: "Chronological breakdown of the Claude Code source leak: the accidental npm publish, community discovery, archiving race, and Anthropic's response.", category: "Timeline", tags: ["leak", "npm", "archive", "chronology", "discovery", "anthropic"], route: "/timeline", icon: FileText },
  { title: "Model Registry Database", excerpt: "Searchable database of all discovered model codenames with confidence ratings, context windows, and known capabilities.", category: "Registry", tags: ["database", "search", "filter", "models", "codenames", "specs"], route: "/registry", icon: Terminal },
  { title: "Architecture Explorer", excerpt: "Interactive system diagram with expandable nodes showing boot sequence, query loop, tool execution engine, and security layers.", category: "Explorer", tags: ["diagram", "interactive", "nodes", "system", "architecture"], route: "/explorer", icon: Database },
  { title: "Statistics Dashboard", excerpt: "Animated charts showing codebase metrics: 512K+ lines, 2050+ files, 25+ tools, 47 environment variables with breakdowns by language and category.", category: "Statistics", tags: ["charts", "data", "visualization", "metrics", "recharts", "lines of code"], route: "/statistics", icon: Terminal },
  { title: "Fast Mode Pricing", excerpt: "6x markup on API costs for Fast Mode subscribers. Token economics breakdown and pricing tier analysis.", category: "Pricing", tags: ["fast mode", "pricing", "markup", "tokens", "subscription", "6x"], route: "/pricing", icon: Zap },
  { title: "Community & Ecosystem", excerpt: "Open-source rewrites (claw-code Python, Rust port), CLAUDE.md instruction files, community analysis, and related projects.", category: "Community", tags: ["github", "open source", "claw-code", "rust", "python", "CLAUDE.md"], route: "/community", icon: FileText },
  { title: "YOLO Classifier", excerpt: "Internal risk assessment engine that classifies operations as safe or unsafe. In YOLO mode, bypasses confirmation prompts for faster development.", category: "Security", tags: ["yolo", "risk", "classification", "bypass", "confirmation"], route: "/revelations/security", icon: Shield },
  { title: "Buddy - AI Companion Pet", excerpt: "An unreleased AI companion that lives in the terminal, with mood states, animations, and personality traits. Found deep in the leaked source.", category: "Features", tags: ["buddy", "pet", "companion", "terminal", "mood", "animation"], route: "/revelations/features", icon: Zap },
  { title: "KAIROS Dreaming Assistant", excerpt: "Background processing system that works on problems while the user is idle. Named after the Greek concept of opportune time.", category: "Features", tags: ["kairos", "dreaming", "background", "idle", "processing"], route: "/revelations/features", icon: Cpu },
  { title: "47 Environment Variables", excerpt: "Configuration system uses 47 environment variables covering API keys, model selection, feature flags, debug settings, and telemetry.", category: "Architecture", tags: ["env", "environment", "configuration", "variables", "API keys", "flags"], route: "/revelations/architecture", icon: Database },
];

const categories = ["All", ...Array.from(new Set(searchIndex.map(e => e.category)))];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const results = useMemo(() => {
    let filtered = searchIndex;
    if (selectedCategory !== "All") {
      filtered = filtered.filter(e => e.category === selectedCategory);
    }
    if (!query.trim()) return filtered;
    const q = query.toLowerCase();
    return filtered.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.excerpt.toLowerCase().includes(q) ||
      e.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [query, selectedCategory]);

  return (
    <div className="min-h-screen">
      <div className="border-b border-border/50 bg-card/30">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Search className="w-5 h-5 text-primary" />
              </div>
              <span className="classified-stamp">INTEL</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Search <span className="text-primary text-glow-cyan">Intelligence</span>
            </h1>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search codenames, features, systems..."
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                autoFocus
              />
              {query && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-foreground">
                  {results.length} result{results.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-all ${
                selectedCategory === cat
                  ? "bg-primary/20 text-primary border-primary/30"
                  : "bg-secondary/30 text-muted-foreground border-border/50 hover:text-foreground hover:border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <div className="space-y-3">
            {results.map((entry, i) => {
              const Icon = entry.icon;
              return (
                <motion.div
                  key={entry.title}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  onClick={() => navigate(entry.route)}
                  className="group p-4 rounded-lg border border-border/50 bg-card/30 hover:bg-secondary/30 hover:border-primary/20 cursor-pointer transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-md bg-secondary/80 border border-border/50 mt-0.5 shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{entry.title}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{entry.category}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{entry.excerpt}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {entry.tags.slice(0, 5).map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground/60 px-1.5 py-0.5 rounded bg-muted/50">
                            <Tag className="w-2.5 h-2.5" />{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary/50 transition-colors mt-1 shrink-0" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>

        {results.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <Search className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-mono text-sm">No results found for "{query}"</p>
            <p className="text-muted-foreground/50 text-xs mt-1">Try different keywords or clear filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
