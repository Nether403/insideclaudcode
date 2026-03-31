import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TypingText } from "@/components/TypingText";
import { CodeBlock } from "@/components/CodeBlock";
import { Redacted } from "@/components/Redacted";
import { LiveTerminal } from "@/components/LiveTerminal";
import { MatrixRain } from "@/components/MatrixRain";
import { GlowCard } from "@/components/GlowCard";
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
       <SEOHead title="Inside Claude Code — The Unauthorized Field Guide" description="Everything hidden beneath the surface — unreleased features, secret commands, and the architecture that powers the most capable AI coding assistant." path="/" type="website" />
      <div className="relative">
      {/* Grid background */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-scanline pointer-events-none" />

      {/* Matrix rain hero background */}
      <div className="absolute inset-0 h-[70vh] overflow-hidden pointer-events-none">
        <MatrixRain />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </div>

      {/* Grand Title Section */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 pt-20 pb-8 overflow-hidden">
        {/* Animated background rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary/10"
              style={{ width: `${i * 300}px`, height: `${i * 300}px` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>

        {/* Classified badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="classified-stamp mb-6 z-10"
        >
          MARCH 31, 2026 // DECLASSIFIED
        </motion.div>

        {/* Main Title — Inside Claude Code */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, type: "spring", stiffness: 50 }}
          className="relative z-10 text-center"
        >
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-bold tracking-tight leading-none">
            <motion.span
              className="inline-block text-foreground"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Inside
            </motion.span>{" "}
            <motion.span
              className="inline-block relative"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <span className="text-primary text-glow-cyan">Claude Code</span>
              {/* Glitch overlay */}
              <motion.span
                className="absolute inset-0 text-glow-amber text-accent opacity-0 pointer-events-none"
                aria-hidden="true"
                animate={{
                  opacity: [0, 0.8, 0, 0, 0.6, 0],
                  x: [0, -3, 2, 0, -1, 0],
                  y: [0, 1, -1, 0, 2, 0],
                }}
                transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 5 }}
              >
                Claude Code
              </motion.span>
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="z-10 mt-4 text-lg sm:text-xl md:text-2xl font-heading text-muted-foreground/70 tracking-widest uppercase text-center"
        >
          The Unauthorized Field Guide
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="z-10 mt-6 max-w-2xl text-center text-sm sm:text-base text-muted-foreground font-mono leading-relaxed"
        >
          Everything hidden beneath the surface — unreleased features, secret commands,
          and the architecture that powers the most capable AI coding assistant.
        </motion.p>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="z-10 mt-8 h-px w-48 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />
      </section>

      {/* Dashboard Stats Section (existing) */}
      <section className="relative flex flex-col items-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="classified-stamp mb-6"
        >
          THE NUMBERS
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-center mb-3"
        >
          <span className="text-foreground">512,000 Lines.</span>{" "}
          <span className="text-foreground">2,000+ Files.</span>{" "}
          <span className="text-primary text-glow-cyan">One Mistake.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="text-center mb-8"
        >
          <p className="text-muted-foreground text-sm max-w-xl font-mono">
            <TypingText
              text="Anthropic pushed unobfuscated source to npm. The AI industry's best-kept secrets went public in seconds..."
              speed={25}
              delay={3000}
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

        {/* Live Terminal */}
        <div className="mt-10">
          <span className="text-xs font-mono text-accent uppercase tracking-widest">// Live reconstruction</span>
          <h3 className="text-xl font-heading font-bold mt-2 mb-4">How It Was Discovered</h3>
          <LiveTerminal />
        </div>
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
              <GlowCard className="rounded-lg border border-border/50 bg-card/50 h-full">
                <Link
                  to={r.url}
                  className="group block p-6 h-full"
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
              </GlowCard>
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
          <span>INSIDE CLAUDE CODE // THE UNAUTHORIZED FIELD GUIDE</span>
          <span>Built for research & educational purposes</span>
        </div>
      </footer>
    </div>
    </PageTransition>
  );
}
