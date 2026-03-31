import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";

const routeNames: Record<string, string> = {
  "": "Home",
  timeline: "Timeline",
  revelations: "Revelations",
  undercover: "Undercover Mode",
  models: "Model Registry",
  features: "Hidden Features",
  architecture: "Architecture",
  security: "Security & Safety",
  registry: "Codename Registry",
  explorer: "Explorer",
  statistics: "Statistics",
  community: "Community",
  pricing: "Pricing",
  glossary: "Glossary",
  about: "About",
  search: "Search",
  newsletter: "Newsletter",
};

export function NavigationBreadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, i) => ({
    label: routeNames[seg] || seg,
    path: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        key={pathname}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-1.5 text-[11px] font-mono"
        aria-label="breadcrumb"
      >
        <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
          <Home className="h-3 w-3" />
        </Link>
        {crumbs.map((crumb) => (
          <span key={crumb.path} className="flex items-center gap-1.5">
            <ChevronRight className="h-2.5 w-2.5 text-muted-foreground/40" />
            {crumb.isLast ? (
              <span className="text-foreground/80">{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className="text-muted-foreground hover:text-primary transition-colors">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </motion.nav>
    </AnimatePresence>
  );
}
