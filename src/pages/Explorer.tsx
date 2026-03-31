import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { GitBranch, Cpu, Terminal, Zap, Shield, Database, ArrowRight, ChevronDown, ChevronRight, Code2, Layers, Network, Play } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";

interface ExplorerNode {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  description: string;
  code?: string;
  children?: ExplorerNode[];
}

const architectureTree: ExplorerNode[] = [
  {
    id: "boot",
    label: "Boot Sequence",
    icon: Play,
    color: "text-primary",
    description: "5-stage initialization pipeline that prepares Claude Code for operation. Each stage must complete before the next begins.",
    code: `async function bootSequence(): Promise<Runtime> {
  const config = await loadConfiguration();   // Stage 1
  const tools = await registerTools(config);  // Stage 2
  const auth = await authenticateSession();   // Stage 3
  const ctx = await buildContext(config);     // Stage 4
  return initializeRuntime({                  // Stage 5
    config, tools, auth, context: ctx
  });
}`,
    children: [
      {
        id: "boot-config",
        label: "Configuration Loader",
        icon: Database,
        color: "text-glow-amber",
        description: "Reads CLAUDE.md, environment variables, and workspace settings. Merges 47 environment variables into a unified config object.",
        code: `interface ClaudeConfig {
  apiKey: string;
  model: ModelIdentifier;
  permissions: PermissionSet;
  environment: Record<string, string>; // 47 env vars
  claudeMd: string; // User instruction file
}`
      },
      {
        id: "boot-tools",
        label: "Tool Registration",
        icon: Terminal,
        color: "text-terminal",
        description: "Registers 25+ built-in tools including file operations, shell execution, and web search. Each tool has a JSON schema for parameter validation.",
        code: `const TOOL_REGISTRY: Tool[] = [
  { name: "Read",      schema: readSchema },
  { name: "Write",     schema: writeSchema },
  { name: "Edit",      schema: editSchema },
  { name: "Bash",      schema: bashSchema },
  { name: "Search",    schema: searchSchema },
  { name: "WebFetch",  schema: fetchSchema },
  // ... 19 more tools
];`
      },
      {
        id: "boot-auth",
        label: "Authentication",
        icon: Shield,
        color: "text-glow-red",
        description: "OAuth 2.0 flow with Anthropic's API. Validates subscription tier, checks Fast Mode eligibility, and establishes rate limits.",
      },
      {
        id: "boot-context",
        label: "Context Assembly",
        icon: Layers,
        color: "text-glow-purple",
        description: "Builds the initial context window from system prompt, CLAUDE.md instructions, project structure, and git state. Manages the 200k token budget.",
      },
    ],
  },
  {
    id: "query",
    label: "Query Processing Loop",
    icon: Zap,
    color: "text-glow-amber",
    description: "The core execution cycle. Receives user input, generates responses with mid-stream tool calls, and manages multi-turn conversations.",
    code: `async function queryLoop(input: UserMessage): Promise<Response> {
  const enriched = await enrichContext(input);
  const stream = await model.stream(enriched);
  
  for await (const chunk of stream) {
    if (chunk.type === 'tool_call') {
      const result = await executeTool(chunk);
      stream.inject(result); // Mid-generation injection
    }
    yield chunk;
  }
}`,
    children: [
      {
        id: "query-enrich",
        label: "Context Enrichment",
        icon: Database,
        color: "text-primary",
        description: "Prepends relevant file contents, git diff, and conversation history. Uses a priority queue to fit within the token budget.",
      },
      {
        id: "query-stream",
        label: "Streaming Generation",
        icon: Cpu,
        color: "text-glow-green",
        description: "Streams tokens from the model with real-time tool call detection. The parser identifies tool invocations mid-sentence and pauses generation.",
      },
      {
        id: "query-tool",
        label: "Tool Execution Engine",
        icon: Terminal,
        color: "text-terminal",
        description: "Executes tool calls in a sandboxed environment. Results are injected back into the generation stream, allowing the model to react to tool outputs.",
        code: `async function executeTool(call: ToolCall): Promise<ToolResult> {
  const tool = TOOL_REGISTRY.find(t => t.name === call.name);
  if (!tool) throw new ToolNotFoundError(call.name);
  
  // Permission check
  await checkPermission(call, currentPermissions);
  
  // Sandboxed execution
  return await sandbox.run(() => tool.execute(call.params));
}`
      },
      {
        id: "query-response",
        label: "Response Assembly",
        icon: Layers,
        color: "text-glow-purple",
        description: "Combines streamed text with tool results into a coherent response. Handles markdown rendering, code block formatting, and diff display.",
      },
    ],
  },
  {
    id: "security",
    label: "Security Layer",
    icon: Shield,
    color: "text-glow-red",
    description: "Multi-layered security system that validates every operation before execution. Includes the YOLO classifier, bash AST analysis, and permission management.",
    code: `class SecurityLayer {
  private yoloClassifier: YOLOClassifier;
  private bashAnalyzer: BashASTAnalyzer;
  private unicodeGuard: UnicodeGuard;
  
  async validate(operation: Operation): Promise<ValidationResult> {
    const checks = await Promise.all([
      this.yoloClassifier.classify(operation),
      this.bashAnalyzer.analyze(operation),
      this.unicodeGuard.scan(operation),
    ]);
    return this.mergeResults(checks);
  }
}`,
    children: [
      {
        id: "sec-yolo",
        label: "YOLO Classifier",
        icon: Zap,
        color: "text-glow-amber",
        description: "Risk assessment engine that classifies operations as safe/unsafe. In YOLO mode, bypasses confirmation prompts for faster iteration.",
      },
      {
        id: "sec-bash",
        label: "Bash AST Analyzer",
        icon: Code2,
        color: "text-terminal",
        description: "Parses shell commands into Abstract Syntax Trees to detect dangerous patterns like rm -rf, sudo, and network exfiltration attempts.",
      },
      {
        id: "sec-unicode",
        label: "Unicode Smuggling Guard",
        icon: Shield,
        color: "text-glow-red",
        description: "Detects prompt injection attempts via invisible Unicode characters, bidirectional text overrides, and homoglyph attacks.",
      },
    ],
  },
  {
    id: "models",
    label: "Model Orchestration",
    icon: Network,
    color: "text-glow-purple",
    description: "Routes requests to different model variants based on task complexity, subscription tier, and the internal model registry.",
    code: `interface ModelRouter {
  route(task: Task): ModelIdentifier {
    if (task.complexity === 'simple') return 'fennec-mini';
    if (task.requiresReasoning) return 'capybara-deep';
    if (task.contextLength > 500_000) return 'numbat-long';
    return 'claude-sonnet'; // Default
  }
}`,
    children: [
      {
        id: "model-registry",
        label: "Internal Registry",
        icon: Database,
        color: "text-glow-amber",
        description: "Maps codenames to model versions: Fennec → Claude 4.0, Capybara → Claude 3.7, Tangu → Claude 3.6, Numbat → 1M+ context specialist.",
      },
      {
        id: "model-fast",
        label: "Fast Mode Router",
        icon: Zap,
        color: "text-primary",
        description: "Optimized routing for Fast Mode subscribers. Selects lower-latency model variants and applies the 6x markup pricing tier.",
      },
    ],
  },
];

function ExplorerNodeComponent({ node, depth = 0 }: { node: ExplorerNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth === 0);
  const [showCode, setShowCode] = useState(false);
  const Icon = node.icon;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: depth * 0.05 }}
      className="relative"
    >
      {/* Connector line */}
      {depth > 0 && (
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50" style={{ marginLeft: `${depth * 24 - 12}px` }} />
      )}

      <div style={{ paddingLeft: `${depth * 24}px` }}>
        {/* Node header */}
        <motion.div
          className="group flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-secondary/50 border border-transparent hover:border-border/50"
          onClick={() => setExpanded(!expanded)}
          whileHover={{ x: 4 }}
        >
          {/* Expand/collapse */}
          <div className="mt-1 w-4 h-4 flex items-center justify-center shrink-0">
            {hasChildren ? (
              expanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
            )}
          </div>

          {/* Icon */}
          <div className={`mt-0.5 p-1.5 rounded-md bg-secondary/80 border border-border/50 shrink-0`}>
            <Icon className={`w-4 h-4 ${node.color}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`font-heading font-semibold text-sm ${node.color}`}>{node.label}</span>
              {node.code && (
                <button
                  onClick={(e) => { e.stopPropagation(); setShowCode(!showCode); }}
                  className="px-1.5 py-0.5 text-[10px] font-mono bg-secondary border border-border/50 rounded text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                >
                  {showCode ? "HIDE" : "CODE"}
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{node.description}</p>
          </div>
        </motion.div>

        {/* Code block */}
        <AnimatePresence>
          {showCode && node.code && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="ml-11 mt-1 mb-2 overflow-hidden"
            >
              <CodeBlock code={node.code} title={node.label} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Children */}
        <AnimatePresence>
          {expanded && hasChildren && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {node.children!.map((child) => (
                <ExplorerNodeComponent key={child.id} node={child} depth={depth + 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Flow diagram component
function FlowDiagram() {
  const stages = [
    { label: "User Input", icon: Terminal, color: "bg-primary/20 border-primary/40 text-primary" },
    { label: "Context Enrichment", icon: Database, color: "bg-glow-amber/20 border-glow-amber/40 text-glow-amber" },
    { label: "Model Generation", icon: Cpu, color: "bg-glow-purple/20 border-glow-purple/40 text-glow-purple" },
    { label: "Tool Execution", icon: Zap, color: "bg-terminal/20 border-terminal/40 text-terminal" },
    { label: "Security Validation", icon: Shield, color: "bg-glow-red/20 border-glow-red/40 text-glow-red" },
    { label: "Response Stream", icon: ArrowRight, color: "bg-primary/20 border-primary/40 text-primary" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 p-6 rounded-lg bg-secondary/30 border border-border/50">
      {stages.map((stage, i) => {
        const Icon = stage.icon;
        return (
          <motion.div
            key={stage.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <div className={`flex items-center gap-2 px-3 py-2 rounded-md border ${stage.color} text-xs font-mono`}>
              <Icon className="w-3.5 h-3.5" />
              {stage.label}
            </div>
            {i < stages.length - 1 && (
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Explorer() {
  return (
    <PageTransition>
      <SEOHead title="Architecture Explorer" description="Interactive explorer of Claude Code's internal systems — boot sequence, query processing, security layer, and model orchestration." path="/explorer" />
      <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <GitBranch className="w-5 h-5 text-primary" />
              </div>
              <span className="classified-stamp">INTERACTIVE</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              Architecture <span className="text-primary text-glow-cyan">Explorer</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Navigate the internal structure of Claude Code. Expand nodes to explore each subsystem, view source code snippets, and understand how every component connects.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Flow diagram */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-sm font-mono text-muted-foreground mb-3 uppercase tracking-wider">Request Flow Pipeline</h2>
          <FlowDiagram />
        </motion.div>

        {/* Separator */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">System Components</span>
          <div className="h-px flex-1 bg-border/50" />
        </div>

        {/* Explorer tree */}
        <div className="space-y-2">
          {architectureTree.map((node) => (
            <ExplorerNodeComponent key={node.id} node={node} />
          ))}
        </div>

        {/* Stats footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-lg bg-secondary/30 border border-border/50"
        >
          {[
            { label: "Components", value: "4", sub: "Major Systems" },
            { label: "Sub-modules", value: "13", sub: "Detailed Nodes" },
            { label: "Tools", value: "25+", sub: "Registered" },
            { label: "Env Vars", value: "47", sub: "Configuration" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-heading font-bold text-primary text-glow-cyan">{stat.value}</div>
              <div className="text-xs font-mono text-muted-foreground mt-1">{stat.label}</div>
              <div className="text-[10px] text-muted-foreground/50">{stat.sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
    </PageTransition>
  );
}
