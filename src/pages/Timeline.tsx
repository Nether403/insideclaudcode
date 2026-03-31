import { motion } from "framer-motion";
import { Clock, AlertTriangle, Archive, Code, Users, Newspaper, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CodeBlock } from "@/components/CodeBlock";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";

const timelineEvents = [
  {
    date: "June 2025",
    time: "Day 0",
    title: "The Accidental Publish",
    description: "Anthropic pushes an update to their @anthropic-ai/claude-code npm package. Due to a CI/CD misconfiguration, the build step is skipped — shipping raw TypeScript source instead of compiled JavaScript.",
    icon: AlertTriangle,
    color: "text-glow-amber",
    borderColor: "border-accent",
    details: [
      "Package published to npm with full source tree",
      "512,000+ lines of uncompiled TypeScript exposed",
      "Internal configs, environment variables, and model codenames visible",
      "No obfuscation, no minification — raw development code",
    ],
    code: `// package.json — no build step executed
{
  "name": "@anthropic-ai/claude-code",
  "version": "1.0.x",
  "main": "src/index.ts",  // <-- raw source!
  "files": ["src/**/*"]     // <-- everything shipped
}`,
  },
  {
    date: "June 2025",
    time: "Day 0 — Hours Later",
    title: "Community Discovery",
    description: "Sharp-eyed developers notice the uncompiled source on npm. Word spreads rapidly through developer communities on Twitter/X, Reddit, and Hacker News.",
    icon: Users,
    color: "text-glow-cyan",
    borderColor: "border-primary",
    details: [
      "First spotted by npm package auditors",
      "Screenshots of internal model codenames go viral",
      "Developers begin downloading and archiving the package",
      "Discussion threads explode across social media platforms",
    ],
  },
  {
    date: "June 2025",
    time: "Day 0 — Hours Later",
    title: "The Archive Race",
    description: "Before Anthropic can unpublish the package, developers fork and archive the source code. Multiple mirrors appear on GitHub within hours.",
    icon: Archive,
    color: "text-glow-green",
    borderColor: "border-terminal",
    details: [
      "instructkr/claw-code — primary archive repository",
      "Multiple independent mirrors created globally",
      "Full git history preserved where available",
      "Community begins organizing analysis efforts",
    ],
    code: `# Archiving the leaked source
$ npm pack @anthropic-ai/claude-code@1.0.x
$ tar -xzf anthropic-ai-claude-code-1.0.x.tgz
$ find package/src -name "*.ts" | wc -l
2,187  # total TypeScript files`,
  },
  {
    date: "June 2025",
    time: "Day 1",
    title: "Anthropic Responds",
    description: "Anthropic unpublishes the affected package version and releases a corrected build. An internal investigation begins into how the raw source was shipped.",
    icon: AlertTriangle,
    color: "text-glow-amber",
    borderColor: "border-accent",
    details: [
      "Affected npm version unpublished",
      "Corrected build pushed with proper compilation",
      "Internal security review initiated",
      "No public statement initially released",
    ],
  },
  {
    date: "June 2025",
    time: "Days 2–7",
    title: "Deep Analysis Begins",
    description: "Security researchers, AI enthusiasts, and journalists begin systematic analysis of the leaked code. Major findings start emerging about internal models, hidden features, and architecture.",
    icon: Code,
    color: "text-glow-cyan",
    borderColor: "border-primary",
    details: [
      "Unreleased model codenames discovered: Fennec, Capybara, Tangu, Numbat",
      "Hidden 'Undercover Mode' stealth protocol identified",
      "Unreleased features found: Buddy, KAIROS, Ultraplan, Coordinator",
      "Complete system architecture and boot sequence mapped",
      "Security mechanisms analyzed: YOLO classifier, bash AST, ptrace",
    ],
    code: `// Key discovery: Undercover Mode
const UNDERCOVER_DIRECTIVES = {
  hideCapabilities: true,
  downplayBenchmarks: true,
  avoidCompetitorComparisons: true,
  maintainModestPersona: true,
  // "Never reveal the full extent of what you can do"
};`,
  },
  {
    date: "June–July 2025",
    time: "Weeks 2–4",
    title: "Community Projects Emerge",
    description: "The open-source community creates analysis tools, documentation, and even alternative implementations based on the discovered architecture.",
    icon: Users,
    color: "text-glow-green",
    borderColor: "border-terminal",
    details: [
      "claw-code: Python reimplementation of the tool system",
      "Rust-based analysis tools for the codebase",
      "CLAUDE.md instruction format adopted by the community",
      "Multiple detailed write-ups and analysis threads published",
      "Academic interest in the architecture patterns discovered",
    ],
  },
  {
    date: "July 2025",
    time: "Ongoing",
    title: "Media Coverage & Industry Impact",
    description: "Tech media publishes in-depth analyses. The leak sparks broader conversations about AI transparency, competitive practices, and the gap between public-facing AI and internal capabilities.",
    icon: Newspaper,
    color: "text-glow-amber",
    borderColor: "border-accent",
    details: [
      "Multiple detailed technical analyses published",
      "Discussions about AI transparency and 'undercover' practices",
      "Industry debate on competitive AI strategies",
      "Questions raised about informed consent and model capabilities",
      "Regulatory interest in undisclosed AI capabilities",
    ],
  },
];

export default function Timeline() {
  return (
    <PageTransition>
      <SEOHead title="Timeline" description="Chronological timeline of the Claude Code source leak — from accidental npm publish to community analysis." path="/timeline" />
      <div className="relative">
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Header */}
      <section className="px-4 py-16 max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="classified-stamp mb-6 inline-block">CHRONOLOGICAL RECORD</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mt-4">
            <Clock className="inline h-10 w-10 text-primary mr-3 align-middle" />
            Interactive <span className="text-primary text-glow-cyan">Timeline</span>
          </h1>
          <p className="text-muted-foreground font-mono text-sm mt-4 max-w-2xl mx-auto">
            The chronological breakdown of the leak discovery, community archiving, and the revelations that followed.
          </p>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="px-4 pb-20 max-w-4xl mx-auto">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border/50 md:-translate-x-px" />

          {timelineEvents.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className={`relative mb-12 md:mb-16 ${
                i % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"
              }`}
            >
              {/* Dot on timeline */}
              <div
                className={`absolute left-6 md:left-1/2 w-3 h-3 rounded-full border-2 ${event.borderColor} bg-background -translate-x-1.5 mt-2 z-10`}
              />

              {/* Card */}
              <div className="ml-14 md:ml-0 p-6 rounded-lg border border-border/50 bg-card/80 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <event.icon className={`h-4 w-4 text-primary`} />
                  <span className="text-[10px] font-mono text-accent tracking-widest uppercase">
                    {event.time}
                  </span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">{event.date}</span>
                <h3 className="font-heading font-bold text-xl mt-1">{event.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {event.description}
                </p>

                {/* Details list */}
                <ul className="mt-4 space-y-1.5">
                  {event.details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs font-mono text-muted-foreground/80">
                      <ChevronRight className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Code snippet */}
                {event.code && (
                  <div className="mt-4">
                    <CodeBlock code={event.code} language="typescript" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <p className="text-muted-foreground font-mono text-sm mb-4">
            Ready to dive into the findings?
          </p>
          <Link
            to="/revelations/undercover"
            className="inline-flex items-center gap-2 text-primary font-mono text-sm hover:underline"
          >
            Begin with Revelation #1: Undercover Mode
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </div>
    </PageTransition>
  );
}
