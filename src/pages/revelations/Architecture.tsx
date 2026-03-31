import { motion } from "framer-motion";
import { Cpu, ChevronRight, AlertTriangle, ArrowDown, Layers, Wrench, Brain, RefreshCw } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { Link } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";

const bootSequence = [
  { step: "01", label: "Environment Detection", desc: "Detect runtime environment, load env variables (342 discovered), establish platform context." },
  { step: "02", label: "Configuration Loading", desc: "Load model registry, feature flags, rate limits, and user tier configuration." },
  { step: "03", label: "Tool System Init", desc: "Initialize 87 internal tools: file operations, shell commands, browser, search, and more." },
  { step: "04", label: "Context Assembly", desc: "Build the system prompt from base template, stealth directives, user history, and tool definitions." },
  { step: "05", label: "Session Handshake", desc: "Establish bidirectional streaming, set up heartbeat monitoring, and begin the query loop." },
];

const queryLoopStages = [
  { label: "Input Processing", icon: Brain, desc: "Tokenize, classify intent, check safety filters, assess complexity." },
  { label: "Context Management", icon: Layers, desc: "Select relevant context, manage 200K+ token windows, prioritize recent turns." },
  { label: "Tool Selection", icon: Wrench, desc: "Determine required tools, validate permissions, prepare tool call payloads." },
  { label: "Response Generation", icon: RefreshCw, desc: "Stream tokens, execute tool calls mid-generation, handle multi-step reasoning." },
];

export default function Architecture() {
  return (
    <PageTransition>
      <SEOHead title="Architecture Deep-Dive" description="Complete boot sequence, query processing loop, tool execution pipeline, and context management from Claude Code's internals." path="/revelations/architecture" />
      <div className="relative">
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Header */}
      <section className="px-4 py-16 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="classified-stamp">TECHNICAL</span>
            <span className="text-xs font-mono text-muted-foreground">REVELATION #4</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Cpu className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold">Architecture Deep-Dive</h1>
              <p className="text-muted-foreground font-mono text-sm">Boot sequence, query loop, tool system internals</p>
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
            The leaked code reveals Claude Code's complete internal architecture: a <strong className="text-accent">5-stage boot sequence</strong>, 
            a sophisticated <strong className="text-accent">query processing loop</strong> with mid-generation tool execution, 
            and a <strong className="text-accent">tool system with 87 registered tools</strong> — far more than publicly documented.
          </p>
        </motion.div>
      </section>

      {/* Boot Sequence */}
      <section className="px-4 max-w-4xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 id="boot-sequence" className="text-2xl font-heading font-bold mb-6">
            <span className="text-primary text-glow-cyan">01.</span> Boot Sequence
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            When Claude Code starts, it executes a precise 5-stage initialization sequence before processing any user input.
          </p>
          <div className="space-y-4">
            {bootSequence.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-mono text-primary font-bold">{s.step}</span>
                  </div>
                  {i < bootSequence.length - 1 && (
                    <div className="w-px flex-1 bg-border/30 my-1" />
                  )}
                </div>
                <div className="pb-4">
                  <h3 className="font-heading font-semibold">{s.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <CodeBlock
              title="core/bootstrap.ts"
              language="TypeScript"
              code={`export async function bootstrap(): Promise<Runtime> {
  // Stage 1: Environment
  const env = await detectEnvironment();
  const vars = loadEnvironmentVariables(); // 342 env vars
  
  // Stage 2: Configuration
  const config = await loadConfig(env);
  const models = await loadModelRegistry(config);
  
  // Stage 3: Tools
  const tools = await initializeToolSystem({
    registered: 87,
    categories: ["file", "shell", "browser", "search", "code", "internal"],
    permissions: config.toolPermissions,
  });
  
  // Stage 4: Context
  const systemPrompt = await buildSystemPrompt({
    base: config.basePrompt,
    stealth: config.stealthDirectives,
    tools: tools.definitions,
  });
  
  // Stage 5: Session
  return createSession({ env, config, tools, systemPrompt });
}`}
            />
          </div>
        </motion.div>
      </section>

      {/* Query Loop */}
      <section className="px-4 max-w-4xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-heading font-bold mb-6">
            <span className="text-primary text-glow-cyan">02.</span> The Query Loop
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Every user message passes through a 4-stage processing pipeline. The key innovation is mid-generation tool execution — 
            Claude can pause token generation, execute tools, and resume with the results.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {queryLoopStages.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-lg border border-border/50 bg-card/50 relative"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-heading font-semibold text-sm mb-1">{s.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                {i < queryLoopStages.length - 1 && (
                  <ArrowDown className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-4 w-4 text-primary/30 hidden sm:block" />
                )}
              </motion.div>
            ))}
          </div>

          <CodeBlock
            title="core/query-loop.ts"
            language="TypeScript"
            code={`async function* processQuery(input: UserInput, ctx: Context) {
  // Stage 1: Input Processing
  const classified = await classifyIntent(input);
  const safetyCheck = await runSafetyFilters(input, classified);
  if (safetyCheck.blocked) return yield safetyResponse(safetyCheck);
  
  // Stage 2: Context Management
  const relevantContext = await selectContext(ctx, classified, {
    maxTokens: 200_000,
    strategy: "recency-weighted",
  });
  
  // Stage 3: Tool Selection
  const tools = await selectTools(classified, ctx.permissions);
  
  // Stage 4: Generation with mid-stream tool execution
  for await (const chunk of streamGeneration(relevantContext, tools)) {
    if (chunk.type === "tool_call") {
      const result = await executeToolCall(chunk.tool, chunk.args);
      yield* resumeWithToolResult(result);  // <-- mid-generation!
    } else {
      yield chunk;
    }
  }
}`}
          />
        </motion.div>
      </section>

      {/* Tool System */}
      <section className="px-4 max-w-4xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-heading font-bold mb-6">
            <span className="text-primary text-glow-cyan">03.</span> The Tool System
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            87 internal tools organized into 6 categories. Each tool has permission controls, 
            rate limits, and sandboxed execution environments.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {[
              { cat: "File Operations", count: 18, desc: "Read, write, search, diff, patch" },
              { cat: "Shell & Process", count: 14, desc: "Execute, spawn, monitor, kill" },
              { cat: "Browser & Web", count: 12, desc: "Navigate, scrape, screenshot, interact" },
              { cat: "Search & Index", count: 15, desc: "Semantic, regex, codebase, web" },
              { cat: "Code Intelligence", count: 16, desc: "Parse, analyze, refactor, test" },
              { cat: "Internal / Meta", count: 12, desc: "Config, logging, telemetry, debug" },
            ].map((t) => (
              <div key={t.cat} className="p-4 rounded-lg border border-border/50 bg-card/50">
                <div className="text-2xl font-heading font-bold text-primary">{t.count}</div>
                <div className="font-heading font-semibold text-sm mt-1">{t.cat}</div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1">{t.desc}</div>
              </div>
            ))}
          </div>

          <CodeBlock
            title="tools/registry.ts"
            language="TypeScript"
            code={`export const TOOL_REGISTRY = {
  file: {
    read_file: { permissions: ["fs:read"], rateLimit: "100/min" },
    write_file: { permissions: ["fs:write"], rateLimit: "50/min" },
    search_files: { permissions: ["fs:read"], rateLimit: "30/min" },
    // ... 15 more file tools
  },
  shell: {
    execute_command: { permissions: ["shell:exec"], sandbox: true },
    spawn_process: { permissions: ["shell:spawn"], sandbox: true },
    // ... 12 more shell tools
  },
  browser: {
    navigate: { permissions: ["browser:nav"], sandbox: true },
    screenshot: { permissions: ["browser:capture"] },
    // ... 10 more browser tools
  },
  // Total: 87 registered tools
};`}
          />
        </motion.div>
      </section>

      {/* Context Management */}
      <section className="px-4 max-w-4xl mx-auto mb-12">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-heading font-bold mb-4">
            <span className="text-primary text-glow-cyan">04.</span> Context Management
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The context manager handles token budgets across a 200K+ window using a recency-weighted 
            selection strategy with priority tiers for different content types.
          </p>
          <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
            <span className="text-xs font-mono text-primary tracking-widest block mb-2">PRIORITY TIERS</span>
            <div className="space-y-2">
              {[
                { tier: "P0 — Critical", items: "System prompt, safety constraints, active tool results", pct: "~30%" },
                { tier: "P1 — High", items: "Recent conversation turns, current file context", pct: "~40%" },
                { tier: "P2 — Medium", items: "Older conversation history, project-level context", pct: "~20%" },
                { tier: "P3 — Low", items: "Background knowledge, cached search results", pct: "~10%" },
              ].map((t) => (
                <div key={t.tier} className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-heading font-semibold text-xs">{t.tier}</span>
                    <span className="text-muted-foreground text-xs ml-2">— {t.items}</span>
                  </div>
                  <span className="font-mono text-xs text-primary">{t.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Navigation */}
      <section className="px-4 pb-20 max-w-4xl mx-auto">
        <div className="flex items-center justify-between border-t border-border/30 pt-8">
          <Link to="/revelations/features" className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
            ← Hidden Features
          </Link>
          <Link to="/revelations/security" className="flex items-center gap-2 text-xs font-mono text-primary hover:underline">
            Next: Security & Safety <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </section>
    </div>
    </PageTransition>
  );
}
