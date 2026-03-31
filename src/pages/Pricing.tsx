import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { CodeBlock } from "@/components/CodeBlock";
import { DollarSign, TrendingUp, Calculator, AlertTriangle, ArrowRight, Zap } from "lucide-react";
import { useState } from "react";

const markupData = [
  { model: "Claude 3.5 Sonnet", apiInput: "$3.00", apiOutput: "$15.00", fastInput: "$18.00", fastOutput: "$90.00", markup: "6x" },
  { model: "Claude 3.5 Haiku", apiInput: "$0.80", apiOutput: "$4.00", fastInput: "$4.80", fastOutput: "$24.00", markup: "6x" },
  { model: "Claude 3 Opus", apiInput: "$15.00", apiOutput: "$75.00", fastInput: "$90.00", fastOutput: "$450.00", markup: "6x" },
];

const pricingSnippet = `// src/internal/billing/fast-mode.ts
export const FAST_MODE_CONFIG = {
  markup_multiplier: 6.0,
  billing_unit: "1M_tokens",
  priority_queue: true,
  rate_limit_bypass: true,
  cache_strategy: "aggressive",
  
  // Internal cost tracking
  track_margin: (input: number, output: number) => ({
    revenue: (input + output) * 6,
    cost: input + output,
    margin: ((input + output) * 5) / ((input + output) * 6) * 100
    // ~83.3% gross margin on Fast Mode
  })
};`;

export default function Pricing() {
  const [tokens, setTokens] = useState(1000000);
  const [model, setModel] = useState<"sonnet" | "haiku" | "opus">("sonnet");

  const rates: Record<string, { api: number; fast: number }> = {
    sonnet: { api: 15, fast: 90 },
    haiku: { api: 4, fast: 24 },
    opus: { api: 75, fast: 450 },
  };

  const r = rates[model];
  const apiCost = (tokens / 1_000_000) * r.api;
  const fastCost = (tokens / 1_000_000) * r.fast;

  return (
    <PageTransition>
      <SEOHead title="Pricing Analysis" description="Breakdown of Claude Code's Fast Mode 6x markup, token economics, and cost calculator." path="/pricing" />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="classified-stamp mb-4 inline-block">ANALYSIS</span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mt-2">
            <span className="text-primary text-glow-cyan">Fast Mode</span> Pricing Analysis
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl font-mono text-sm">
            The leaked source revealed a consistent 6x markup on all API token costs when using "Fast Mode" — a priority queue system that bypasses rate limits.
          </p>
        </motion.div>

        {/* Key Finding */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="mt-8 p-6 rounded-lg border border-accent/30 bg-accent/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-semibold text-accent">Key Finding: 83.3% Gross Margin</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Fast Mode charges users 6x the standard API rate while providing priority processing. This represents an approximately 83.3% gross margin on token processing revenue.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Markup Table */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12">
          <h2 className="text-xl font-heading font-semibold flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" /> Price Comparison Table
          </h2>
          <div className="border border-border/50 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border/50">
                    <th className="text-left p-3 font-mono text-xs text-muted-foreground">Model</th>
                    <th className="text-right p-3 font-mono text-xs text-muted-foreground">API Input</th>
                    <th className="text-right p-3 font-mono text-xs text-muted-foreground">API Output</th>
                    <th className="text-right p-3 font-mono text-xs text-primary">Fast Input</th>
                    <th className="text-right p-3 font-mono text-xs text-primary">Fast Output</th>
                    <th className="text-right p-3 font-mono text-xs text-accent">Markup</th>
                  </tr>
                </thead>
                <tbody>
                  {markupData.map((row, i) => (
                    <tr key={row.model} className={`border-b border-border/30 ${i % 2 === 0 ? "bg-card/30" : ""}`}>
                      <td className="p-3 font-medium">{row.model}</td>
                      <td className="p-3 text-right font-mono text-muted-foreground">{row.apiInput}</td>
                      <td className="p-3 text-right font-mono text-muted-foreground">{row.apiOutput}</td>
                      <td className="p-3 text-right font-mono text-primary">{row.fastInput}</td>
                      <td className="p-3 text-right font-mono text-primary">{row.fastOutput}</td>
                      <td className="p-3 text-right font-mono text-accent font-bold">{row.markup}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-muted-foreground/60 mt-2 font-mono">* All prices per 1M tokens (USD)</p>
        </motion.div>

        {/* Calculator */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12">
          <h2 className="text-xl font-heading font-semibold flex items-center gap-2 mb-4">
            <Calculator className="h-5 w-5 text-primary" /> Token Cost Calculator
          </h2>
          <div className="p-6 rounded-lg border border-border/50 bg-card/50 space-y-6">
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-2 block">Model</label>
              <div className="flex gap-2">
                {(["sonnet", "haiku", "opus"] as const).map((m) => (
                  <button key={m} onClick={() => setModel(m)}
                    className={`px-4 py-2 rounded text-sm font-mono transition-colors ${model === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-2 block">Output Tokens: {tokens.toLocaleString()}</label>
              <input type="range" min={100000} max={10000000} step={100000} value={tokens} onChange={(e) => setTokens(Number(e.target.value))}
                className="w-full accent-primary" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded bg-muted/50 border border-border/30">
                <span className="text-xs font-mono text-muted-foreground">Standard API</span>
                <p className="text-2xl font-heading font-bold mt-1">${apiCost.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded bg-primary/10 border border-primary/30">
                <span className="text-xs font-mono text-primary">Fast Mode</span>
                <p className="text-2xl font-heading font-bold text-primary mt-1">${fastCost.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded bg-accent/10 border border-accent/30">
                <span className="text-xs font-mono text-accent">Premium Paid</span>
                <p className="text-2xl font-heading font-bold text-accent mt-1">${(fastCost - apiCost).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What Fast Mode Includes */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12">
          <h2 className="text-xl font-heading font-semibold flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" /> What Fast Mode Provides
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Priority Queue", desc: "Requests skip the standard queue and get processed with higher priority." },
              { title: "Rate Limit Bypass", desc: "Higher rate limits than standard API access, reducing throttling." },
              { title: "Aggressive Caching", desc: "Responses are cached more aggressively for repeated queries." },
              { title: "Margin Tracking", desc: "Internal cost tracking reveals ~83.3% gross margin on all Fast Mode traffic." },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-lg border border-border/50 bg-card/30">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  <h3 className="font-heading font-semibold text-sm">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Code */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12">
          <CodeBlock code={pricingSnippet} title="fast-mode.ts" language="TypeScript" />
        </motion.div>
      </div>
    </PageTransition>
  );
}
