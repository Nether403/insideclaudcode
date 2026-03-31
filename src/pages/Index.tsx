import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TypingText } from "@/components/TypingText";
import { CodeBlock } from "@/components/CodeBlock";
import { Link } from "react-router-dom";
import {
  FileCode, Layers, Wrench, Key, ArrowDown,
  Eye, Database, Zap, Cpu, Lock, Shield, Clock,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";

const revelations = [
  {
    icon: Eye,
    title: "Undercover Mode",
    desc: "A hidden stealth protocol that conceals Claude's true capabilities from users and competitors.",
    url: "/revelations/undercover",
    color: "text-glow-amber",
    tag: "CLASSIFIED",
  },
  {
    icon: Database,
    title: "Model Registry",
    desc: "Unreleased models codenamed Fennec, Capybara, Tangu, and Numbat found in internal configs.",
    url: "/revelations/models",
    color: "text-glow-cyan",
    tag: "DISCOVERED",
  },
  {
    icon: Zap,
    title: "Hidden Features",
    desc: "Buddy (AI pet), KAIROS dreaming assistant, Ultraplan project manager, and multi-agent Coordinator.",
    url: "/revelations/features",
    color: "text-glow-green",
    tag: "UNRELEASED",
  },
  {
    icon: Cpu,
    title: "Architecture",
    desc: "Complete boot sequence, query loop, tool execution pipeline, and context management system.",
    url: "/revelations/architecture",
    color: "text-glow-cyan",
    tag: "TECHNICAL",
  },
  {
    icon: Lock,
    title: "Security & Safety",
    desc: "YOLO classifier, bash AST analysis, unicode smuggling prevention, and ptrace protection.",
    url: "/revelations/security",
    color: "text-glow-amber",
    tag: "SENSITIVE",
  },
];

const leakSnippet = `// src/internal/config/models.ts
export const MODEL_REGISTRY = {
  "fennec":   { version: "4.0", status: "testing",    params: "???B" },
  "capybara": { version: "3.7", status: "internal",   params: "???B" },
  "tangu":    { version: "3.5", status: "deprecated",  params: "???B" },
  "numbat":   { version: "4.1", status: "development", params: "???B" },
};`;

export default function Index() {
  return (
    <PageTransition>
      <SEOHead title="CC_LEAK — Claude Code Source Leak Analysis" description="Interactive analysis of the 512,000-line Claude Code source leak. Explore unreleased models, hidden features, architecture, and security." path="/" type="website" />
      <div className="relative">
      {/* Grid background */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-scanline pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-20">
        {/* Classified badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="classified-stamp mb-8"
        >
          DECLASSIFIED // 2025
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-center leading-tight max-w-5xl"
        >
          <span className="text-foreground">512,000 Lines.</span>{" "}
          <span className="text-foreground">2,000+ Files.</span>
          <br />
          <span className="text-primary text-glow-cyan">The Accidental Unmasking.</span>
        </motion.h1>

        {/* Subtitle with typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-center"
        >
          <p className="text-muted-foreground text-lg max-w-2xl font-mono">
            <TypingText
              text="When Anthropic accidentally published Claude Code's full source to npm, the AI industry's best-kept secrets were exposed..."
              speed={30}
              delay={1500}
            />
          </p>
        </motion.div>

        {/* Stats counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full max-w-4xl"
        >
          <AnimatedCounter end={512000} suffix="+" label="Lines of Code" icon={<FileCode className="h-5 w-5" />} />
          <AnimatedCounter end={2187} label="Source Files" icon={<Layers className="h-5 w-5" />} />
          <AnimatedCounter end={87} label="Internal Tools" icon={<Wrench className="h-5 w-5" />} />
          <AnimatedCounter end={342} label="Env Variables" icon={<Key className="h-5 w-5" />} />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <div className="flex gap-3">
            <Button asChild size="lg" className="font-heading font-semibold border-glow-cyan">
              <Link to="/timeline">
                <Clock className="h-4 w-4 mr-2" />
                View Timeline
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-heading">
              <Link to="/revelations/undercover">
                <Eye className="h-4 w-4 mr-2" />
                Read Revelations
              </Link>
            </Button>
          </div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-8 text-muted-foreground/40"
          >
            <ArrowDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Code Snippet Section */}
      <section className="relative px-4 py-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-widest">// From the leak</span>
          <h2 className="text-2xl font-heading font-bold mt-2">What Was Found Inside</h2>
        </motion.div>
        <CodeBlock code={leakSnippet} title="models.ts" language="TypeScript" />
      </section>

      {/* Revelations Grid */}
      <section className="relative px-4 py-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="classified-stamp mb-4 inline-block">5 KEY REVELATIONS</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-4">
            The <span className="text-primary text-glow-cyan">Intelligence Briefing</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto font-mono text-sm">
            Each finding represents a significant disclosure from the leaked source code.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {revelations.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={r.url}
                className="group block p-6 rounded-lg border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card transition-all duration-300 h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <r.icon className="h-6 w-6 text-primary" />
                  <span className="text-[9px] font-mono text-accent tracking-widest">{r.tag}</span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {r.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{r.desc}</p>
                <div className="mt-4 flex items-center text-xs text-primary/70 font-mono group-hover:text-primary transition-colors">
                  Read analysis <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/statistics"
              className="group block p-6 rounded-lg border border-primary/20 bg-primary/5 hover:border-primary/40 transition-all duration-300 h-full border-glow-cyan"
            >
              <Shield className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-heading font-semibold text-lg text-foreground">
                Full Statistics
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Explore the complete codebase analysis with interactive charts and data visualizations.
              </p>
              <div className="mt-4 flex items-center text-xs text-primary font-mono">
                View dashboard <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 px-4 py-8 mt-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <span>CC_LEAK // INTERACTIVE INTELLIGENCE HUB</span>
          <span>Built for research & educational purposes</span>
        </div>
      </footer>
    </div>
    </PageTransition>
  );
}
