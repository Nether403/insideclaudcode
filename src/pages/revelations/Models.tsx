import { motion } from "framer-motion";
import { Database, ChevronRight, AlertTriangle, Search } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { Redacted } from "@/components/Redacted";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const models = [
  {
    codename: "Fennec",
    version: "4.0",
    status: "Testing",
    statusColor: "text-accent",
    family: "Claude 4",
    context: "500K+",
    description: "Next-generation flagship model. Appears to be the successor to Claude 3.5 Sonnet with significantly expanded capabilities.",
    capabilities: ["Extended reasoning", "Multi-modal fusion", "Advanced tool use", "Self-reflection"],
  },
  {
    codename: "Capybara",
    version: "3.7",
    status: "Internal",
    statusColor: "text-primary",
    family: "Claude 3.7",
    context: "300K",
    description: "Internal-only model used for testing and research. Features experimental reasoning chains and improved code generation.",
    capabilities: ["Experimental reasoning", "Code specialization", "Internal benchmarking", "A/B testing baseline"],
  },
  {
    codename: "Tangu",
    version: "3.5",
    status: "Deprecated",
    statusColor: "text-muted-foreground",
    family: "Claude 3.5",
    context: "200K",
    description: "Previously active model now marked as deprecated. May have been an intermediate version between public releases.",
    capabilities: ["Standard reasoning", "Tool use", "Multi-turn dialogue", "Document analysis"],
  },
  {
    codename: "Numbat",
    version: "4.1",
    status: "Development",
    statusColor: "text-terminal",
    family: "Claude 4.x",
    context: "1M+",
    description: "Bleeding-edge development model with experimental million-token context. Earliest stage of any discovered model. Internally referred to as 'the successor to everything.'",
    capabilities: ["Million-token context", "Persistent memory", "Multi-session learning", "Advanced planning"],
  },
  {
    codename: "Quokka",
    version: "3.5-fast",
    status: "Production",
    statusColor: "text-terminal",
    family: "Claude 3.5",
    context: "200K",
    description: "The 'Fast Mode' model optimized for speed. Lower latency variant used in Claude Code's fast path.",
    capabilities: ["Low latency", "Streaming optimized", "Cost-efficient", "Code completion"],
  },
  {
    codename: "Dugong",
    version: "3.6",
    status: "Staging",
    statusColor: "text-primary",
    family: "Claude 3.6",
    context: "250K",
    description: "Staging model found in pre-release configurations. Likely a candidate for the next public Claude release.",
    capabilities: ["Improved accuracy", "Better instruction following", "Enhanced safety", "Multilingual improvements"],
  },
];

export default function Models() {
  const [search, setSearch] = useState("");
  const filtered = models.filter(
    (m) =>
      m.codename.toLowerCase().includes(search.toLowerCase()) ||
      m.family.toLowerCase().includes(search.toLowerCase()) ||
      m.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageTransition>
      <SEOHead title="Unreleased Models" description="Discovered model codenames — Fennec, Capybara, Tangu, Numbat — and their capabilities from the leaked registry." path="/revelations/models" />
      <div className="relative">
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Header */}
      <section className="px-4 py-16 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="classified-stamp">DISCOVERED</span>
            <span className="text-xs font-mono text-muted-foreground">REVELATION #2</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Database className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold">Model Registry</h1>
              <p className="text-muted-foreground font-mono text-sm">Unreleased models and their codenames</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* TL;DR */}
      <section className="px-4 max-w-5xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 rounded-lg border border-accent/30 bg-accent/5"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-accent" />
            <span className="text-xs font-mono text-accent tracking-widest">TL;DR</span>
          </div>
          <p className="text-foreground leading-relaxed">
            The leaked configuration files contain references to <strong className="text-accent">at least 6 unreleased model codenames</strong> — 
            Fennec, Capybara, Tangu, Numbat, Quokka, and Dugong — with version numbers, status flags, and capability metadata 
            that suggest <Redacted>a much more active internal development pipeline than publicly acknowledged</Redacted>.
          </p>
        </motion.div>
      </section>

      {/* Code Discovery */}
      <section className="px-4 max-w-5xl mx-auto mb-12">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-heading font-bold mb-4">
            <span className="text-primary text-glow-cyan">01.</span> The Source Code
          </h2>
          <CodeBlock
            title="internal/config/model-registry.ts"
            language="TypeScript"
            code={`export const INTERNAL_MODEL_REGISTRY = {
  fennec:   { version: "4.0",      family: "claude-4",     status: "testing" },
  capybara: { version: "3.7",      family: "claude-3.7",   status: "internal" },
  tangu:    { version: "3.5",      family: "claude-3.5",   status: "deprecated" },
  numbat:   { version: "4.1-dev",  family: "claude-4.x",   status: "development" },
  quokka:   { version: "3.5-fast", family: "claude-3.5",   status: "production" },
  dugong:   { version: "3.6",      family: "claude-3.6",   status: "staging" },
};

// All codenames are Australian/Asian small mammals
// Naming convention appears intentionally obscure`}
          />
        </motion.div>
      </section>

      {/* Interactive Table */}
      <section className="px-4 max-w-5xl mx-auto mb-12">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-heading font-bold mb-6">
            <span className="text-primary text-glow-cyan">02.</span> Model Comparison
          </h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search models..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card/50 border-border/50 font-mono text-sm"
            />
          </div>
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 bg-muted/30">
                  <TableHead className="font-mono text-xs text-primary">Codename</TableHead>
                  <TableHead className="font-mono text-xs text-primary">Version</TableHead>
                  <TableHead className="font-mono text-xs text-primary">Family</TableHead>
                  <TableHead className="font-mono text-xs text-primary">Status</TableHead>
                  <TableHead className="font-mono text-xs text-primary">Context</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((m) => (
                  <TableRow key={m.codename} className="border-border/20 hover:bg-primary/5">
                    <TableCell className="font-heading font-semibold">{m.codename}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{m.version}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{m.family}</TableCell>
                    <TableCell className={`font-mono text-sm font-medium ${m.statusColor}`}>{m.status}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{m.context}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </section>

      {/* Model Cards */}
      <section className="px-4 max-w-5xl mx-auto mb-12">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-heading font-bold mb-6">
            <span className="text-primary text-glow-cyan">03.</span> Detailed Profiles
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {models.map((m, i) => (
              <motion.div
                key={m.codename}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-lg border border-border/50 bg-card/50 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading font-bold text-lg">{m.codename}</h3>
                  <span className={`text-[10px] font-mono ${m.statusColor} tracking-widest uppercase`}>{m.status}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{m.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {m.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-primary/10 text-primary border border-primary/20"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Navigation */}
      <section className="px-4 pb-20 max-w-5xl mx-auto">
        <div className="flex items-center justify-between border-t border-border/30 pt-8">
          <Link to="/revelations/undercover" className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
            ← Undercover Mode
          </Link>
          <Link to="/revelations/features" className="flex items-center gap-2 text-xs font-mono text-primary hover:underline">
            Next: Hidden Features <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </section>
    </div>
    </PageTransition>
  );
}
