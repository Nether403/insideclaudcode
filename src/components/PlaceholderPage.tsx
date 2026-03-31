import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  tag?: string;
}

export function PlaceholderPage({ title, subtitle, icon: Icon, tag = "COMING SOON" }: PlaceholderPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <span className="classified-stamp mb-6 inline-block">{tag}</span>
        <div className="h-16 w-16 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-heading font-bold mb-3">{title}</h1>
        <p className="text-muted-foreground font-mono text-sm">{subtitle}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-8 text-xs font-mono text-primary hover:underline"
        >
          ← Go back
        </button>
      </motion.div>
    </div>
  );
}
