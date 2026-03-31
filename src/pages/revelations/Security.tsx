import { motion } from "framer-motion";
import { Lock, ChevronRight, AlertTriangle, Shield, Bug, FileCode, Globe, Terminal } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { Redacted } from "@/components/Redacted";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";

const mechanisms = [
  {
    name: "YOLO Classifier",
    icon: Bug,
    subtitle: "Risk Assessment Engine",
    description: "A real-time risk classification system that evaluates every tool call and command execution against a threat model. Named internally as 'YOLO' (You Only Live Once) — reflecting the high-stakes nature of allowing AI to execute code.",
    code: `// security/yolo-classifier.ts
export class YOLOClassifier {
  async classify(action: ToolAction): Promise<RiskLevel> {
    const signals = await this.extractSignals(action);
    
    const risk = this.evaluate({
      commandDanger: this.assessCommandDanger(signals),
      fileSystemImpact: this.assessFSImpact(signals),
      networkExposure: this.assessNetworkRisk(signals),
      dataExfiltration: this.assessExfilRisk(signals),
      privilegeEscalation: this.assessPrivEsc(signals),
    });
    
    if (risk.level === "critical") {
      return { blocked: true, reason: risk.primaryThreat };
    }
    
    return { level: risk.level, requiresConfirmation: risk.level === "high" };
  }
}`,
    findings: [
      "Multi-signal threat assessment for every tool call",
      "5-axis risk evaluation: command, filesystem, network, exfiltration, privilege escalation",
      "Critical-level actions are blocked outright",
      "High-risk actions require explicit user confirmation",
    ],
  },
  {
    name: "Bash AST Analysis",
    icon: Terminal,
    subtitle: "Command Safety Parser",
    description: "Before any shell command is executed, it's parsed into an Abstract Syntax Tree (AST) and analyzed for dangerous patterns, injection attacks, and unintended side effects.",
    code: `// security/bash-ast.ts
export class BashASTAnalyzer {
  async analyze(command: string): Promise<SafetyResult> {
    const ast = this.parse(command);
    
    const violations = [
      ...this.detectInjection(ast),
      ...this.detectPrivilegeEscalation(ast),
      ...this.detectDataExfiltration(ast),
      ...this.detectResourceExhaustion(ast),
      ...this.detectFileSystemDestruction(ast),
    ];
    
    // Check for obfuscation attempts
    const obfuscation = this.detectObfuscation(command, ast);
    if (obfuscation.detected) {
      violations.push({ type: "obfuscation", severity: "critical" });
    }
    
    return { safe: violations.length === 0, violations };
  }
  
  private detectInjection(ast: BashAST): Violation[] {
    // Detect: command substitution, eval, backticks, pipes to sh
    return ast.walk().filter(node =>
      node.type === "command_substitution" ||
      node.command === "eval" ||
      (node.type === "pipe" && node.target === "sh")
    );
  }
}`,
    findings: [
      "Full AST parsing of shell commands before execution",
      "Injection detection: command substitution, eval, backtick injection",
      "Obfuscation detection to prevent encoded payloads",
      "Destructive command blocking: rm -rf, format, dd, etc.",
    ],
  },
  {
    name: "Unicode Smuggling Prevention",
    icon: Globe,
    subtitle: "Character Safety Filter",
    description: "A specialized filter that detects and blocks Unicode-based attacks — where visually similar characters or invisible Unicode sequences are used to bypass text-based security filters.",
    code: `// security/unicode-guard.ts
export class UnicodeGuard {
  private readonly CONFUSABLES = loadConfusableMap();
  private readonly INVISIBLE_CHARS = new Set([
    "\\u200B", "\\u200C", "\\u200D", "\\uFEFF",
    "\\u00AD", "\\u2060", "\\u180E", // ...more
  ]);
  
  sanitize(input: string): SanitizeResult {
    const issues: UnicodeIssue[] = [];
    
    // Detect invisible characters
    for (const char of input) {
      if (this.INVISIBLE_CHARS.has(char)) {
        issues.push({ type: "invisible", char, position: input.indexOf(char) });
      }
    }
    
    // Detect homoglyph attacks (е vs e, а vs a)
    const homoglyphs = this.detectHomoglyphs(input);
    
    // Detect directional overrides (RLO/LRO attacks)
    const bidiAttacks = this.detectBidiAttacks(input);
    
    return { clean: issues.length === 0, issues, sanitized: this.strip(input) };
  }
}`,
    findings: [
      "Invisible character detection and stripping",
      "Homoglyph attack detection (Cyrillic/Latin lookalikes)",
      "Bidirectional text override attack prevention",
      "Zero-width character sequence blocking",
    ],
  },
  {
    name: "Ptrace Protection",
    icon: Shield,
    subtitle: "Process Isolation",
    description: "System-level protections that prevent debugging, memory inspection, and process manipulation of the Claude Code runtime — blocking attempts to extract model weights, system prompts, or internal state.",
    code: `// security/ptrace-guard.ts
export class PtraceGuard {
  static activate(): void {
    if (process.platform === "linux") {
      // Prevent ptrace attachment from other processes
      prctl(PR_SET_DUMPABLE, 0);
      prctl(PR_SET_PTRACER, PR_SET_PTRACER_ANY, 0);
      
      // Lock memory to prevent swap-based extraction
      mlockall(MCL_CURRENT | MCL_FUTURE);
      
      // Set up seccomp filter for dangerous syscalls
      const filter = new SeccompFilter("whitelist");
      filter.deny(["ptrace", "process_vm_readv", "process_vm_writev"]);
      filter.apply();
    }
    
    // Cross-platform: detect debugger attachment
    setInterval(() => {
      if (isDebuggerAttached()) {
        emergencyShutdown("debugger_detected");
      }
    }, 1000);
  }
}`,
    findings: [
      "Linux ptrace attachment prevention",
      "Memory locking to prevent swap-based extraction",
      "Seccomp syscall filtering for dangerous operations",
      "Active debugger detection with emergency shutdown",
    ],
  },
];

export default function Security() {
  return (
    <PageTransition>
      <SEOHead title="Security & Safety" description="YOLO classifier, Bash AST analysis, unicode smuggling prevention, and ptrace protection mechanisms." path="/revelations/security" />
      <div className="relative">
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Header */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="classified-stamp">SENSITIVE</span>
            <span className="text-xs font-mono text-muted-foreground">REVELATION #5</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center">
              <Lock className="h-7 w-7 text-destructive" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold">Security & Safety</h1>
              <p className="text-muted-foreground font-mono text-sm">The defense systems protecting Claude Code's runtime</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* TL;DR */}
      <section className="px-4 max-w-4xl mx-auto mb-12">
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
            Claude Code employs a <strong className="text-accent">4-layer security architecture</strong>: 
            the YOLO risk classifier evaluates every action, bash commands are AST-parsed before execution, 
            Unicode attacks are detected and blocked, and <Redacted>system-level ptrace protections prevent runtime debugging and memory extraction</Redacted>.
          </p>
        </motion.div>
      </section>

      {/* Security overview */}
      <section className="px-4 max-w-4xl mx-auto mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {mechanisms.map((m, i) => (
            <motion.a
              key={m.name}
              href={`#${m.name.toLowerCase().replace(/\s+/g, "-")}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-lg border border-border/50 bg-card/50 text-center hover:border-primary/20 transition-colors"
            >
              <m.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
              <span className="font-heading font-bold text-xs block">{m.name}</span>
              <span className="text-[10px] font-mono text-muted-foreground">{m.subtitle}</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Deep Dives */}
      {mechanisms.map((m, i) => (
        <section key={m.name} id={m.name.toLowerCase().replace(/\s+/g, "-")} className="px-4 max-w-4xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-4">
              <m.icon className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-heading font-bold">
                <span className="text-primary text-glow-cyan">{String(i + 1).padStart(2, "0")}.</span> {m.name}
                <span className="text-muted-foreground font-normal text-lg ml-2">— {m.subtitle}</span>
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">{m.description}</p>
            <CodeBlock title={`security/${m.name.toLowerCase().replace(/\s+/g, "-")}.ts`} language="TypeScript" code={m.code} />
            <div className="mt-4 p-4 rounded-lg border border-border/50 bg-card/30">
              <span className="text-xs font-mono text-primary tracking-widest block mb-2">KEY FINDINGS</span>
              <ul className="space-y-1.5">
                {m.findings.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-3 w-3 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </section>
      ))}

      {/* Navigation */}
      <section className="px-4 pb-20 max-w-4xl mx-auto">
        <div className="flex items-center justify-between border-t border-border/30 pt-8">
          <Link to="/revelations/architecture" className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
            ← Architecture
          </Link>
          <Link to="/registry" className="flex items-center gap-2 text-xs font-mono text-primary hover:underline">
            Model Codename Registry <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </section>
    </div>
    </PageTransition>
  );
}
