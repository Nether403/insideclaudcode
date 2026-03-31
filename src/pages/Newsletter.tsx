import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle, Bell, FileText, Zap } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <div className="min-h-screen">
      <div className="border-b border-border/50 bg-card/30">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 p-2 rounded-lg bg-primary/10 border border-primary/20 mb-6">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Stay <span className="text-primary text-glow-cyan">Informed</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Get notified when we publish new analysis, discover additional findings, or when Anthropic responds to the leaked revelations.
            </p>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-lg bg-terminal/10 border border-terminal/30"
              >
                <CheckCircle className="w-5 h-5 text-terminal" />
                <span className="font-mono text-sm text-terminal">Successfully subscribed — watch your inbox.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agent@classified.gov"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:border-primary/50 transition-all"
                    disabled={status === "loading"}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading" || !email.trim()}
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <span className="animate-pulse">Encrypting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Subscribe
                    </>
                  )}
                </button>
              </form>
            )}

            {status === "error" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 mt-3 text-destructive text-xs font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                Something went wrong. Try again.
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-6">What you'll receive</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: FileText, title: "New Analysis", desc: "Deep dives into newly discovered findings from the leaked source code." },
            { icon: Bell, title: "Breaking Updates", desc: "Anthropic's responses, new model releases, and community developments." },
            { icon: Zap, title: "Technical Insights", desc: "Architecture breakdowns, security analysis, and implementation details." },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-5 rounded-lg border border-border/50 bg-card/30"
              >
                <Icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-heading font-semibold text-sm text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 p-4 rounded-lg bg-muted/30 border border-border/30 text-center">
          <p className="text-xs font-mono text-muted-foreground">
            No spam. Unsubscribe anytime. Your email is never shared.
          </p>
        </div>
      </div>
    </div>
  );
}
