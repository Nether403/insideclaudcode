import { motion } from "framer-motion";
import { Shield, Search, ChevronRight, Filter, ArrowUpDown } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

interface Model {
  codename: string;
  version: string;
  family: string;
  status: string;
  statusColor: string;
  context: string;
  params: string;
  specialization: string;
  discovered: string;
  confidence: string;
}

const allModels: Model[] = [
  { codename: "Fennec", version: "4.0", family: "Claude 4", status: "Testing", statusColor: "text-accent", context: "500K+", params: "Unknown", specialization: "Next-gen flagship", discovered: "Config registry", confidence: "High" },
  { codename: "Capybara", version: "3.7", family: "Claude 3.7", status: "Internal", statusColor: "text-primary", context: "300K", params: "Unknown", specialization: "Research & testing", discovered: "Model loader", confidence: "High" },
  { codename: "Tangu", version: "3.5", family: "Claude 3.5", status: "Deprecated", statusColor: "text-muted-foreground", context: "200K", params: "Unknown", specialization: "General purpose", discovered: "Config registry", confidence: "High" },
  { codename: "Numbat", version: "4.1-dev", family: "Claude 4.x", status: "Development", statusColor: "text-terminal", context: "1M+", params: "Unknown", specialization: "Extended context", discovered: "Feature flags", confidence: "Medium" },
  { codename: "Quokka", version: "3.5-fast", family: "Claude 3.5", status: "Production", statusColor: "text-terminal", context: "200K", params: "Reduced", specialization: "Fast mode / low latency", discovered: "Fast path config", confidence: "High" },
  { codename: "Dugong", version: "3.6", family: "Claude 3.6", status: "Staging", statusColor: "text-primary", context: "250K", params: "Unknown", specialization: "Pre-release candidate", discovered: "Staging config", confidence: "Medium" },
  { codename: "Wombat", version: "3.5-safety", family: "Claude 3.5", status: "Internal", statusColor: "text-primary", context: "200K", params: "Unknown", specialization: "Safety-focused variant", discovered: "Safety config", confidence: "Medium" },
  { codename: "Bilby", version: "4.0-vision", family: "Claude 4", status: "Development", statusColor: "text-terminal", context: "500K+", params: "Unknown", specialization: "Multi-modal vision", discovered: "Vision pipeline", confidence: "Low" },
  { codename: "Pademelon", version: "3.5-edge", family: "Claude 3.5", status: "Prototype", statusColor: "text-accent", context: "100K", params: "Compact", specialization: "Edge deployment", discovered: "Edge config", confidence: "Low" },
  { codename: "Potoroo", version: "3.8", family: "Claude 3.8", status: "Planning", statusColor: "text-muted-foreground", context: "400K", params: "Unknown", specialization: "Next minor release", discovered: "Roadmap refs", confidence: "Low" },
];

const statusFilters = ["All", "Production", "Testing", "Internal", "Development", "Staging", "Deprecated", "Prototype", "Planning"];

type SortKey = "codename" | "version" | "family" | "status" | "confidence";

export default function Registry() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("codename");
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    let list = allModels;
    if (statusFilter !== "All") {
      list = list.filter((m) => m.status === statusFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.codename.toLowerCase().includes(q) ||
          m.family.toLowerCase().includes(q) ||
          m.specialization.toLowerCase().includes(q)
      );
    }
    list = [...list].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
    return list;
  }, [search, statusFilter, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const SortableHead = ({ label, sortKeyName }: { label: string; sortKeyName: SortKey }) => (
    <TableHead
      className="font-mono text-xs text-primary cursor-pointer hover:text-primary/80 select-none"
      onClick={() => toggleSort(sortKeyName)}
    >
      <span className="flex items-center gap-1">
        {label}
        <ArrowUpDown className="h-3 w-3" />
      </span>
    </TableHead>
  );

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Header */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="classified-stamp mb-6 inline-block">DATABASE</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mt-4">
            <Shield className="inline h-10 w-10 text-primary mr-3 align-middle" />
            Codename <span className="text-primary text-glow-cyan">Registry</span>
          </h1>
          <p className="text-muted-foreground font-mono text-sm mt-4 max-w-2xl">
            Searchable database of all {allModels.length} discovered model codenames, versions, and specifications extracted from the leaked source code.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="px-4 max-w-6xl mx-auto mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search codenames, families, specializations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card/50 border-border/50 font-mono text-sm"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            {statusFilters.map((s) => (
              <Button
                key={s}
                variant={statusFilter === s ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(s)}
                className="text-xs font-mono whitespace-nowrap"
              >
                {s}
              </Button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Table */}
      <section className="px-4 max-w-6xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-lg border border-border/50 overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 bg-muted/30">
                <SortableHead label="Codename" sortKeyName="codename" />
                <SortableHead label="Version" sortKeyName="version" />
                <SortableHead label="Family" sortKeyName="family" />
                <SortableHead label="Status" sortKeyName="status" />
                <TableHead className="font-mono text-xs text-primary">Context</TableHead>
                <TableHead className="font-mono text-xs text-primary hidden md:table-cell">Specialization</TableHead>
                <SortableHead label="Confidence" sortKeyName="confidence" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground font-mono text-sm py-8">
                    No models match your search criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((m) => (
                  <TableRow key={m.codename} className="border-border/20 hover:bg-primary/5">
                    <TableCell className="font-heading font-semibold">{m.codename}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{m.version}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{m.family}</TableCell>
                    <TableCell className={`font-mono text-sm font-medium ${m.statusColor}`}>{m.status}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{m.context}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground hidden md:table-cell">{m.specialization}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        m.confidence === "High" ? "bg-terminal/10 text-terminal" :
                        m.confidence === "Medium" ? "bg-accent/10 text-accent" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {m.confidence}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </motion.div>
        <p className="text-[10px] font-mono text-muted-foreground/50 mt-3">
          {filtered.length} of {allModels.length} models shown • Sorted by {sortKey} ({sortAsc ? "A→Z" : "Z→A"}) • Data extracted from leaked source code
        </p>
      </section>

      {/* Stats */}
      <section className="px-4 max-w-6xl mx-auto mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Total Models", value: allModels.length, color: "text-primary" },
            { label: "Model Families", value: new Set(allModels.map((m) => m.family)).size, color: "text-accent" },
            { label: "In Active Dev", value: allModels.filter((m) => ["Testing", "Development", "Staging"].includes(m.status)).length, color: "text-terminal" },
            { label: "High Confidence", value: allModels.filter((m) => m.confidence === "High").length, color: "text-primary" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-lg border border-border/50 bg-card/50 text-center">
              <div className={`text-3xl font-heading font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs font-mono text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 max-w-6xl mx-auto text-center">
        <Link to="/revelations/models" className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:underline">
          Read the full Model Registry analysis <ChevronRight className="h-3 w-3" />
        </Link>
      </section>
    </div>
  );
}
