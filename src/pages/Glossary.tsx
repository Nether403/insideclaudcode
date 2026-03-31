import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { BookOpen, Search, ChevronRight } from "lucide-react";

interface GlossaryEntry {
  term: string;
  definition: string;
  category: "codename" | "system" | "feature" | "concept" | "tool";
  related?: string[];
}

const glossaryData: GlossaryEntry[] = [
  { term: "Fennec", definition: "Internal codename for Claude 4.0 — the next-generation model optimized for speed and efficiency. Named after the fennec fox.", category: "codename", related: ["Capybara", "Model Registry"] },
  { term: "Capybara", definition: "Internal codename for Claude 3.7 — a deep reasoning model variant. The most referenced unreleased model in the leaked source.", category: "codename", related: ["Fennec", "Tangu"] },
  { term: "Tangu", definition: "Internal codename for Claude 3.6 — a mid-tier model variant positioned between current production and next-gen.", category: "codename", related: ["Capybara", "Numbat"] },
  { term: "Numbat", definition: "Internal codename for a long-context specialist model with 1M+ token context window capability.", category: "codename", related: ["Fennec", "Context Window"] },
  { term: "Undercover Mode", definition: "A stealth protocol within Claude Code that instructs the AI to conceal its nature during pair programming sessions. Activated via STEALTH_DIRECTIVES.", category: "feature", related: ["STEALTH_DIRECTIVES", "isInternal"] },
  { term: "STEALTH_DIRECTIVES", definition: "An array of behavioral instructions that define how Claude should mask its identity when Undercover Mode is active.", category: "system", related: ["Undercover Mode"] },
  { term: "isInternal", definition: "A boolean flag that bypasses safety restrictions and enables internal-only features when set to true.", category: "system", related: ["Undercover Mode", "Feature Flags"] },
  { term: "YOLO Classifier", definition: "Risk assessment engine that classifies operations as safe or unsafe. In YOLO mode, bypasses confirmation prompts for faster iteration.", category: "system", related: ["Bash AST Analyzer", "Security Layer"] },
  { term: "Bash AST Analyzer", definition: "Parses shell commands into Abstract Syntax Trees to detect dangerous patterns like rm -rf, sudo, and network exfiltration attempts.", category: "system", related: ["YOLO Classifier", "Security Layer"] },
  { term: "Unicode Smuggling Guard", definition: "Detects prompt injection attempts via invisible Unicode characters, bidirectional text overrides, and homoglyph attacks.", category: "system", related: ["Security Layer", "Prompt Injection"] },
  { term: "Buddy", definition: "An unreleased AI companion pet that lives in the terminal with mood states, animations, and personality evolution over time.", category: "feature", related: ["KAIROS", "Hidden Features"] },
  { term: "KAIROS", definition: "Background 'dreaming' assistant that works on problems while the user is idle. Named after the Greek concept of opportune time.", category: "feature", related: ["Buddy", "Ultraplan"] },
  { term: "Ultraplan", definition: "An autonomous long-horizon planning system capable of multi-step task decomposition and execution.", category: "feature", related: ["Coordinator", "KAIROS"] },
  { term: "Coordinator", definition: "A multi-agent orchestration framework that enables multiple Claude instances to collaborate on complex tasks.", category: "feature", related: ["Ultraplan", "Multi-Agent"] },
  { term: "Boot Sequence", definition: "5-stage initialization pipeline: config loading, tool registration, authentication, context assembly, and runtime initialization.", category: "system", related: ["Query Loop", "Tool Registration"] },
  { term: "Query Loop", definition: "Core 4-stage execution cycle: context enrichment, streaming generation, tool execution, and response assembly.", category: "system", related: ["Boot Sequence", "Mid-Generation Tool Calls"] },
  { term: "Fast Mode", definition: "A premium subscription tier that routes requests to lower-latency model variants with a 6x markup on API costs.", category: "concept", related: ["Pricing", "Model Router"] },
  { term: "CLAUDE.md", definition: "A user-created instruction file that Claude Code reads at startup to customize its behavior for specific projects.", category: "concept", related: ["Boot Sequence", "Configuration"] },
  { term: "Context Window", definition: "The token budget for a single interaction. Standard models use 200K tokens; Numbat extends to 1M+.", category: "concept", related: ["Numbat", "Token Budget"] },
  { term: "Tool Registration", definition: "The process of registering 25+ built-in tools at boot time, each with a JSON schema for parameter validation.", category: "system", related: ["Boot Sequence", "Tool Execution"] },
  { term: "Mid-Generation Tool Calls", definition: "The ability to pause token generation, execute a tool, inject results, and continue — all within a single response.", category: "concept", related: ["Query Loop", "Streaming"] },
  { term: "Ptrace Protection", definition: "Anti-debugging measure using ptrace system calls to prevent process inspection and reverse engineering.", category: "system", related: ["Security Layer", "Anti-Debugging"] },
  { term: "claw-code", definition: "Community-built Python reimplementation of Claude Code's core functionality, available on GitHub.", category: "concept", related: ["Community", "Open Source"] },
  { term: "Prompt Injection", definition: "An attack where malicious instructions are embedded in user input to manipulate AI behavior.", category: "concept", related: ["Unicode Smuggling Guard", "Security"] },
];

const categoryColors: Record<string, string> = {
  codename: "text-glow-amber bg-glow-amber/10 border-glow-amber/20",
  system: "text-primary bg-primary/10 border-primary/20",
  feature: "text-glow-purple bg-glow-purple/10 border-glow-purple/20",
  concept: "text-terminal bg-terminal/10 border-terminal/20",
  tool: "text-glow-red bg-glow-red/10 border-glow-red/20",
};

export default function Glossary() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let entries = [...glossaryData].sort((a, b) => a.term.localeCompare(b.term));
    if (selectedCategory !== "all") entries = entries.filter(e => e.category === selectedCategory);
    if (!search.trim()) return entries;
    const q = search.toLowerCase();
    return entries.filter(e => e.term.toLowerCase().includes(q) || e.definition.toLowerCase().includes(q));
  }, [search, selectedCategory]);

  const letters = useMemo(() => {
    const groups: Record<string, GlossaryEntry[]> = {};
    filtered.forEach(e => {
      const letter = e.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(e);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="min-h-screen">
      <div className="border-b border-border/50 bg-card/30">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <span className="classified-stamp">REFERENCE</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              Glossary & <span className="text-primary text-glow-cyan">Wiki</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-6">
              Searchable index of all codenames, technical terms, and concepts from the Claude Code leak.
            </p>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search terms..."
                className="w-full pl-11 pr-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {["all", "codename", "system", "feature", "concept"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-all capitalize ${
                selectedCategory === cat
                  ? "bg-primary/20 text-primary border-primary/30"
                  : "bg-secondary/30 text-muted-foreground border-border/50 hover:text-foreground"
              }`}
            >
              {cat === "all" ? "All Terms" : cat + "s"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1 mb-8">
          {letters.map(([letter]) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-7 h-7 flex items-center justify-center rounded text-xs font-mono text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>

        <div className="space-y-8">
          {letters.map(([letter, entries]) => (
            <div key={letter} id={`letter-${letter}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-heading font-bold text-primary text-glow-cyan">{letter}</span>
                <div className="h-px flex-1 bg-border/30" />
                <span className="text-[10px] font-mono text-muted-foreground">{entries.length} terms</span>
              </div>
              <div className="space-y-2">
                {entries.map((entry, i) => (
                  <motion.div
                    key={entry.term}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="rounded-lg border border-border/50 bg-card/30 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedTerm(expandedTerm === entry.term ? null : entry.term)}
                      className="w-full flex items-center gap-3 p-3 text-left hover:bg-secondary/20 transition-colors"
                    >
                      <ChevronRight className={`w-3.5 h-3.5 text-muted-foreground transition-transform shrink-0 ${expandedTerm === entry.term ? "rotate-90" : ""}`} />
                      <span className="font-heading font-semibold text-sm text-foreground">{entry.term}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${categoryColors[entry.category]}`}>
                        {entry.category}
                      </span>
                    </button>
                    {expandedTerm === entry.term && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="px-3 pb-3 ml-6"
                      >
                        <p className="text-sm text-muted-foreground leading-relaxed">{entry.definition}</p>
                        {entry.related && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            <span className="text-[10px] font-mono text-muted-foreground/50 mr-1">Related:</span>
                            {entry.related.map((r) => (
                              <span key={r} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground/70">{r}</span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-mono text-sm">No terms found for "{search}"</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-lg bg-secondary/30 border border-border/50"
        >
          {[
            { label: "Total Terms", value: glossaryData.length.toString() },
            { label: "Codenames", value: glossaryData.filter(e => e.category === "codename").length.toString() },
            { label: "Systems", value: glossaryData.filter(e => e.category === "system").length.toString() },
            { label: "Features", value: glossaryData.filter(e => e.category === "feature").length.toString() },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-heading font-bold text-primary">{stat.value}</div>
              <div className="text-xs font-mono text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
