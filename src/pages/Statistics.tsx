import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { BarChart3, FileCode2, Terminal, Shield, Cpu, Database, Layers, Zap } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, Legend,
} from "recharts";

// Data
const fileDistribution = [
  { name: "TypeScript", files: 1847, lines: 389000, color: "hsl(185, 80%, 55%)" },
  { name: "JSON Config", files: 89, lines: 12400, color: "hsl(38, 90%, 55%)" },
  { name: "Markdown", files: 34, lines: 8900, color: "hsl(145, 70%, 50%)" },
  { name: "Shell Scripts", files: 23, lines: 4200, color: "hsl(270, 70%, 60%)" },
  { name: "YAML/TOML", files: 12, lines: 1800, color: "hsl(0, 70%, 50%)" },
  { name: "Other", files: 45, lines: 5700, color: "hsl(215, 15%, 50%)" },
];

const toolCategories = [
  { category: "File System", count: 8, subject: "File System" },
  { category: "Shell/Exec", count: 5, subject: "Shell/Exec" },
  { category: "Search", count: 4, subject: "Search" },
  { category: "Web/Network", count: 3, subject: "Web/Network" },
  { category: "Git/VCS", count: 3, subject: "Git/VCS" },
  { category: "Analysis", count: 2, subject: "Analysis" },
];

const securityLayers = [
  { name: "YOLO Classifier", strength: 92 },
  { name: "Bash AST", strength: 88 },
  { name: "Unicode Guard", strength: 95 },
  { name: "Ptrace Protection", strength: 85 },
  { name: "Permission System", strength: 90 },
  { name: "Path Validation", strength: 87 },
];

const codebaseGrowth = [
  { month: "Jan", lines: 280000, files: 1200 },
  { month: "Feb", lines: 320000, files: 1450 },
  { month: "Mar", lines: 380000, files: 1700 },
  { month: "Apr", lines: 420000, files: 1850 },
  { month: "May", lines: 480000, files: 1950 },
  { month: "Jun", lines: 512000, files: 2050 },
];

const modelComparison = [
  { subject: "Speed", Fennec: 95, Capybara: 70, Numbat: 60 },
  { subject: "Reasoning", Fennec: 75, Capybara: 95, Numbat: 80 },
  { subject: "Context", Fennec: 60, Capybara: 75, Numbat: 98 },
  { subject: "Cost Efficiency", Fennec: 90, Capybara: 50, Numbat: 40 },
  { subject: "Tool Use", Fennec: 80, Capybara: 90, Numbat: 70 },
  { subject: "Accuracy", Fennec: 70, Capybara: 92, Numbat: 85 },
];

const envVarCategories = [
  { name: "API & Auth", value: 12, color: "hsl(185, 80%, 55%)" },
  { name: "Model Config", value: 8, color: "hsl(38, 90%, 55%)" },
  { name: "Feature Flags", value: 10, color: "hsl(145, 70%, 50%)" },
  { name: "Paths & URLs", value: 7, color: "hsl(270, 70%, 60%)" },
  { name: "Debug/Dev", value: 6, color: "hsl(0, 70%, 50%)" },
  { name: "Telemetry", value: 4, color: "hsl(215, 15%, 50%)" },
];

const customTooltipStyle = {
  backgroundColor: "hsl(220, 18%, 7%)",
  border: "1px solid hsl(220, 15%, 15%)",
  borderRadius: "8px",
  color: "hsl(210, 20%, 90%)",
  fontSize: "12px",
  fontFamily: "JetBrains Mono, monospace",
};

function AnimatedChart({ children, title, icon: Icon, delay = 0 }: { children: React.ReactNode; title: string; icon: React.ElementType; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="rounded-lg border border-border/50 bg-card/50 overflow-hidden"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-muted/30">
        <Icon className="w-4 h-4 text-primary" />
        <span className="text-sm font-heading font-semibold text-foreground">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </motion.div>
  );
}

function StatCard({ label, value, sub, icon: Icon, color }: { label: string; value: string; sub: string; icon: React.ElementType; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4 }}
      className="p-4 rounded-lg border border-border/50 bg-card/50 text-center"
    >
      <Icon className={`w-5 h-5 mx-auto mb-2 ${color}`} />
      <div className={`text-2xl font-heading font-bold ${color}`}>{value}</div>
      <div className="text-xs font-mono text-muted-foreground mt-1">{label}</div>
      <div className="text-[10px] text-muted-foreground/50">{sub}</div>
    </motion.div>
  );
}

export default function Statistics() {
  const [activeTab, setActiveTab] = useState<"overview" | "models" | "security">("overview");

  const tabs = [
    { id: "overview" as const, label: "Codebase Overview" },
    { id: "models" as const, label: "Model Analysis" },
    { id: "security" as const, label: "Security Metrics" },
  ];

  return (
    <PageTransition>
      <SEOHead title="Statistics Dashboard" description="Interactive charts and data visualizations of the 512K+ line Claude Code source leak — file distribution, model analysis, security metrics." path="/statistics" />
      <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <span className="classified-stamp">DATA VIZ</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              Statistics <span className="text-primary text-glow-cyan">Dashboard</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Animated visualizations of the leaked codebase metrics — file distributions, tool analysis, model comparisons, and security coverage.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Lines of Code" value="512K+" sub="TypeScript dominant" icon={FileCode2} color="text-primary" />
          <StatCard label="Total Files" value="2,050+" sub="Across all types" icon={Layers} color="text-glow-amber" />
          <StatCard label="Registered Tools" value="25+" sub="Built-in capabilities" icon={Terminal} color="text-terminal" />
          <StatCard label="Environment Vars" value="47" sub="Configuration keys" icon={Database} color="text-glow-purple" />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-lg bg-secondary/50 border border-border/50 mb-8 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs font-mono rounded-md transition-all ${
                activeTab === tab.id
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedChart title="File Distribution by Language" icon={FileCode2}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={fileDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 15%)" />
                  <XAxis dataKey="name" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }} />
                  <YAxis tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Bar dataKey="files" radius={[4, 4, 0, 0]}>
                    {fileDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </AnimatedChart>

            <AnimatedChart title="Environment Variables by Category" icon={Database} delay={0.1}>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={envVarCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={{ stroke: "hsl(215, 15%, 30%)" }}
                  >
                    {envVarCategories.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={customTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </AnimatedChart>

            <AnimatedChart title="Codebase Growth (Estimated)" icon={Layers} delay={0.2}>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={codebaseGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 15%)" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }} />
                  <YAxis tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Area type="monotone" dataKey="lines" stroke="hsl(185, 80%, 55%)" fill="hsl(185, 80%, 55%)" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </AnimatedChart>

            <AnimatedChart title="Tool Distribution by Category" icon={Terminal} delay={0.3}>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={toolCategories} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="hsl(220, 15%, 15%)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 10, fontFamily: "JetBrains Mono" }} />
                  <PolarRadiusAxis tick={{ fill: "hsl(215, 15%, 30%)", fontSize: 9 }} />
                  <Radar name="Tools" dataKey="count" stroke="hsl(145, 70%, 50%)" fill="hsl(145, 70%, 50%)" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </AnimatedChart>
          </div>
        )}

        {/* Models Tab */}
        {activeTab === "models" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedChart title="Model Capability Comparison" icon={Cpu}>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={modelComparison} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="hsl(220, 15%, 15%)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 10, fontFamily: "JetBrains Mono" }} />
                  <PolarRadiusAxis tick={false} domain={[0, 100]} />
                  <Radar name="Fennec (4.0)" dataKey="Fennec" stroke="hsl(185, 80%, 55%)" fill="hsl(185, 80%, 55%)" fillOpacity={0.15} strokeWidth={2} />
                  <Radar name="Capybara (3.7)" dataKey="Capybara" stroke="hsl(38, 90%, 55%)" fill="hsl(38, 90%, 55%)" fillOpacity={0.15} strokeWidth={2} />
                  <Radar name="Numbat (Long)" dataKey="Numbat" stroke="hsl(270, 70%, 60%)" fill="hsl(270, 70%, 60%)" fillOpacity={0.15} strokeWidth={2} />
                  <Legend
                    wrapperStyle={{ fontSize: "11px", fontFamily: "JetBrains Mono" }}
                  />
                  <Tooltip contentStyle={customTooltipStyle} />
                </RadarChart>
              </ResponsiveContainer>
            </AnimatedChart>

            <AnimatedChart title="Estimated Lines of Code by Language" icon={FileCode2} delay={0.1}>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={fileDistribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 15%)" />
                  <XAxis type="number" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }} />
                  <YAxis dataKey="name" type="category" width={90} tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 10, fontFamily: "JetBrains Mono" }} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Bar dataKey="lines" radius={[0, 4, 4, 0]}>
                    {fileDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </AnimatedChart>

            {/* Model cards */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Fennec", version: "Claude 4.0", focus: "Speed & efficiency", color: "text-primary border-primary/30" },
                { name: "Capybara", version: "Claude 3.7", focus: "Deep reasoning", color: "text-glow-amber border-glow-amber/30" },
                { name: "Numbat", version: "Long Context", focus: "1M+ token window", color: "text-glow-purple border-glow-purple/30" },
              ].map((model, i) => (
                <motion.div
                  key={model.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={`p-5 rounded-lg border bg-card/50 ${model.color}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-4 h-4" />
                    <span className="font-heading font-bold">{model.name}</span>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">{model.version}</div>
                  <div className="text-xs text-muted-foreground/70 mt-1">{model.focus}</div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedChart title="Security Layer Strength" icon={Shield}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={securityLayers} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 15%)" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11, fontFamily: "JetBrains Mono" }} />
                  <YAxis dataKey="name" type="category" width={130} tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 10, fontFamily: "JetBrains Mono" }} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Bar dataKey="strength" radius={[0, 4, 4, 0]} fill="hsl(0, 70%, 50%)">
                    {securityLayers.map((_, i) => (
                      <Cell key={i} fill={`hsl(${i * 15}, 70%, ${50 + i * 3}%)`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </AnimatedChart>

            {/* Security coverage cards */}
            <div className="space-y-3">
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-4">Coverage Analysis</h3>
              {securityLayers.map((layer, i) => (
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50"
                >
                  <Shield className="w-4 h-4 text-glow-red shrink-0" />
                  <span className="text-sm font-mono text-foreground flex-1">{layer.name}</span>
                  <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${layer.strength}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, hsl(0, 70%, 50%), hsl(38, 90%, 55%))` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground w-8 text-right">{layer.strength}%</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </PageTransition>
  );
}
