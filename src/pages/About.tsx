import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { Info, FileText, Shield, ExternalLink, Users, Scale } from "lucide-react";

const sources = [
  { name: "Original npm package", desc: "The accidentally published @anthropic/claude-code package before takedown." },
  { name: "Community archives", desc: "Multiple researchers independently archived the source before removal." },
  { name: "CCLeaks.com", desc: "Primary reference for structured analysis and timeline reconstruction." },
  { name: "Independent analyses", desc: "Cross-referenced with multiple security researchers' findings." },
];

const principles = [
  { icon: FileText, title: "Source Verification", desc: "All findings are directly traceable to source code. No speculation or extrapolation beyond what the code reveals." },
  { icon: Shield, title: "Responsible Disclosure", desc: "No active exploits, credentials, or information that could compromise users is published." },
  { icon: Users, title: "Educational Purpose", desc: "This site exists for research and education — to understand AI system architecture and safety." },
  { icon: Scale, title: "Fair Analysis", desc: "Findings are presented factually. We acknowledge where code may be experimental, deprecated, or aspirational." },
];

export default function About() {
  return (
    <PageTransition>
      <SEOHead title="About & Methodology" description="Research methodology, sources, ethical framework, and how the Claude Code leak analysis was conducted." path="/about" />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="classified-stamp mb-4 inline-block">META</span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mt-2">
            About & <span className="text-primary text-glow-cyan">Methodology</span>
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl font-mono text-sm">
            Transparency about how this analysis was conducted, our sources, and the ethical framework guiding this project.
          </p>
        </motion.div>

        {/* What Happened */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12">
          <h2 className="text-xl font-heading font-semibold flex items-center gap-2 mb-4">
            <Info className="h-5 w-5 text-primary" /> What Happened
          </h2>
          <div className="p-6 rounded-lg border border-border/50 bg-card/50 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              In early 2025, Anthropic accidentally published the complete source code for <strong className="text-foreground">Claude Code</strong> — their AI coding assistant — as an unobfuscated npm package. The package contained over <strong className="text-foreground">512,000 lines of TypeScript</strong> across 2,000+ files.
            </p>
            <p>
              Before the package was taken down, multiple researchers and developers archived the source code. This site presents a structured analysis of what was found — from unreleased model codenames to hidden features and internal security protocols.
            </p>
            <p>
              The leak is significant not because it exposed vulnerabilities, but because it provided an unprecedented look into how a frontier AI lab engineers, tests, and deploys AI-powered developer tools.
            </p>
          </div>
        </motion.div>

        {/* Principles */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12">
          <h2 className="text-xl font-heading font-semibold mb-4">Research Principles</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {principles.map((p) => (
              <div key={p.title} className="p-5 rounded-lg border border-border/50 bg-card/30">
                <p.icon className="h-5 w-5 text-primary mb-3" />
                <h3 className="font-heading font-semibold text-sm">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sources */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12">
          <h2 className="text-xl font-heading font-semibold flex items-center gap-2 mb-4">
            <ExternalLink className="h-5 w-5 text-primary" /> Sources
          </h2>
          <div className="space-y-3">
            {sources.map((s) => (
              <div key={s.name} className="p-4 rounded-lg border border-border/30 bg-card/20 flex items-start gap-3">
                <FileText className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-mono text-sm font-medium text-foreground">{s.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-12 p-6 rounded-lg border border-accent/30 bg-accent/5">
          <h3 className="font-heading font-semibold text-accent text-sm">Disclaimer</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            This site is an independent research project and is not affiliated with, endorsed by, or connected to Anthropic in any way. All analysis is based on publicly available information following the accidental publication. No proprietary secrets, credentials, or information that could compromise security is disclosed.
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
