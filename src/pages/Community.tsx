import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Github, ExternalLink, Star, GitFork, Code2, FileText, Terminal, MessageSquare } from "lucide-react";

interface Project {
  name: string;
  description: string;
  language: string;
  stars: string;
  forks: string;
  url: string;
  languageColor: string;
}

const projects: Project[] = [
  { name: "claw-code", description: "Python reimplementation of Claude Code's core functionality based on leaked source analysis.", language: "Python", stars: "2.4k", forks: "340", url: "https://github.com", languageColor: "bg-glow-amber" },
  { name: "claude-code-rs", description: "Rust port focusing on performance-critical components: boot sequence, query loop, and tool execution.", language: "Rust", stars: "1.8k", forks: "210", url: "https://github.com", languageColor: "bg-glow-red" },
  { name: "claude-code-analysis", description: "Comprehensive documentation and analysis of the leaked source code structure and architecture.", language: "Markdown", stars: "3.1k", forks: "450", url: "https://github.com", languageColor: "bg-primary" },
  { name: "yolo-classifier-standalone", description: "Standalone implementation of the YOLO risk classification system extracted from the leak.", language: "TypeScript", stars: "890", forks: "120", url: "https://github.com", languageColor: "bg-primary" },
  { name: "claude-md-templates", description: "Community-curated collection of CLAUDE.md instruction files for different use cases and workflows.", language: "Markdown", stars: "1.5k", forks: "680", url: "https://github.com", languageColor: "bg-primary" },
];

const milestones = [
  { date: "Day 1", event: "Source code discovered on npm", detail: "Community members notice the full source published as a standard npm package." },
  { date: "Day 1-2", event: "Archive race begins", detail: "Multiple independent efforts to mirror and analyze the code before takedown." },
  { date: "Day 3", event: "First analysis published", detail: "Initial findings shared: Undercover Mode, model codenames, and hidden features." },
  { date: "Week 1", event: "claw-code Python rewrite launched", detail: "Community begins rebuilding core functionality in Python for open-source use." },
  { date: "Week 2", event: "Deep architecture analysis", detail: "Detailed breakdowns of the boot sequence, query loop, and security systems." },
  { date: "Week 3", event: "Rust port development begins", detail: "Performance-focused reimplementation targeting the tool execution engine." },
  { date: "Month 1", event: "CLAUDE.md ecosystem emerges", detail: "Community shares custom instruction files, best practices, and templates." },
];

const discussions = [
  { title: "Ethical implications of Undercover Mode", replies: 234, category: "Ethics" },
  { title: "Are the model codenames real or internal jokes?", replies: 189, category: "Analysis" },
  { title: "KAIROS dreaming assistant — how would it work?", replies: 156, category: "Technical" },
  { title: "Fast Mode 6x markup — fair pricing?", replies: 312, category: "Business" },
  { title: "Security analysis: Is the YOLO classifier safe?", replies: 98, category: "Security" },
  { title: "Buddy AI pet — feature or surveillance tool?", replies: 267, category: "Ethics" },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="group p-5 rounded-lg border border-border/50 bg-card/30 hover:bg-secondary/30 hover:border-primary/20 transition-all block"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4 text-muted-foreground" />
          <span className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{project.name}</span>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{project.description}</p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className={`w-2.5 h-2.5 rounded-full ${project.languageColor}`} />
          <span className="text-[11px] font-mono text-muted-foreground">{project.language}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-muted-foreground" />
          <span className="text-[11px] font-mono text-muted-foreground">{project.stars}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="w-3 h-3 text-muted-foreground" />
          <span className="text-[11px] font-mono text-muted-foreground">{project.forks}</span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Community() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border/50 bg-card/30">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <span className="classified-stamp">COMMUNITY</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              Community & <span className="text-primary text-glow-cyan">Ecosystem</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Open-source projects, community analysis, and the growing ecosystem around the Claude Code leak findings.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Github, label: "Projects", value: "12+", color: "text-foreground" },
            { icon: Star, label: "Total Stars", value: "9.7k", color: "text-glow-amber" },
            { icon: Code2, label: "Contributors", value: "340+", color: "text-terminal" },
            { icon: MessageSquare, label: "Discussions", value: "1.2k", color: "text-primary" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-lg border border-border/50 bg-card/50 text-center"
              >
                <Icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                <div className={`text-xl font-heading font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs font-mono text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-4">Notable Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </div>
        </div>

        {/* Community timeline */}
        <div>
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-4">Community Response Timeline</h2>
          <div className="space-y-3">
            {milestones.map((m, i) => (
              <motion.div
                key={m.event}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 p-3 rounded-lg border border-border/50 bg-card/30"
              >
                <div className="shrink-0 w-16 text-right">
                  <span className="text-xs font-mono text-primary font-semibold">{m.date}</span>
                </div>
                <div className="w-px bg-border/50 shrink-0" />
                <div>
                  <span className="text-sm font-heading font-semibold text-foreground">{m.event}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Discussions */}
        <div>
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-4">Trending Discussions</h2>
          <div className="space-y-2">
            {discussions.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-card/30 hover:bg-secondary/20 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-foreground flex-1">{d.title}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{d.category}</span>
                <span className="text-[10px] font-mono text-muted-foreground/50">{d.replies} replies</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CLAUDE.md */}
        <div className="p-6 rounded-lg border border-border/50 bg-card/30">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-terminal" />
            <h2 className="font-heading font-semibold text-foreground">CLAUDE.md Ecosystem</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            One of the most practical outcomes of the leak: the community now understands how CLAUDE.md instruction files work at a deeper level. These files are read at boot time and injected into the system prompt, giving users powerful customization capabilities.
          </p>
          <div className="rounded-lg border border-border/30 overflow-hidden bg-muted/30">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border/30 bg-muted/50">
              <Terminal className="w-3.5 h-3.5 text-terminal" />
              <span className="text-[10px] font-mono text-muted-foreground">CLAUDE.md</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-xs font-mono text-terminal/90 leading-relaxed">{`# Project: My App
# Style: concise, functional, TypeScript-first

## Rules
- Always use const over let
- Prefer functional components with hooks
- Write tests for all new utilities
- Use Zod for runtime validation

## Context
This is a React 18 + Vite project with Tailwind.
The API layer uses tRPC with Zod schemas.`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
