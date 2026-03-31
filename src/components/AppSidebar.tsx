import {
  Shield, Eye, Database, Cpu, Lock, GitBranch, BarChart3,
  Users, DollarSign, BookOpen, Info, Search, Mail, Clock,
  ChevronDown, Terminal, Zap
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const mainItems = [
  { title: "Dashboard", url: "/", icon: Terminal },
  { title: "Timeline", url: "/timeline", icon: Clock },
];

const revelationItems = [
  { title: "Undercover Mode", url: "/revelations/undercover", icon: Eye },
  { title: "Model Registry", url: "/revelations/models", icon: Database },
  { title: "Hidden Features", url: "/revelations/features", icon: Zap },
  { title: "Architecture", url: "/revelations/architecture", icon: Cpu },
  { title: "Security & Safety", url: "/revelations/security", icon: Lock },
];

const dataItems = [
  { title: "Codename Registry", url: "/registry", icon: Shield },
  { title: "Architecture Explorer", url: "/explorer", icon: GitBranch },
  { title: "Statistics Dashboard", url: "/statistics", icon: BarChart3 },
];

const communityItems = [
  { title: "Community", url: "/community", icon: Users },
  { title: "Pricing Analysis", url: "/pricing", icon: DollarSign },
  { title: "Glossary", url: "/glossary", icon: BookOpen },
  { title: "About", url: "/about", icon: Info },
];

const utilityItems = [
  { title: "Search", url: "/search", icon: Search },
  { title: "Newsletter", url: "/newsletter", icon: Mail },
];

interface NavGroupProps {
  label: string;
  items: typeof mainItems;
  collapsed: boolean;
  defaultOpen?: boolean;
}

function NavGroup({ label, items, collapsed, defaultOpen = true }: NavGroupProps) {
  const location = useLocation();
  const hasActive = items.some((i) => location.pathname === i.url);

  return (
    <Collapsible defaultOpen={defaultOpen || hasActive}>
      <SidebarGroup>
        {!collapsed && (
          <CollapsibleTrigger className="flex w-full items-center">
            <SidebarGroupLabel className="flex-1 cursor-pointer text-muted-foreground/60 uppercase tracking-widest text-[10px]">
              {label}
            </SidebarGroupLabel>
            <ChevronDown className="h-3 w-3 text-muted-foreground/40 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
        )}
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent text-primary font-medium border-l-2 border-primary"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="ml-2">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarContent className="pt-4">
        {/* Logo */}
        <div className="px-4 pb-4 border-b border-border/30">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
                <Terminal className="h-4 w-4 text-primary" />
              </div>
              <div>
                <span className="font-heading font-bold text-sm text-foreground">CC_LEAK</span>
                <span className="block text-[10px] text-muted-foreground font-mono">v1.0 // DECLASSIFIED</span>
              </div>
            </div>
          ) : (
            <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center border border-primary/30 mx-auto">
              <Terminal className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>

        <NavGroup label="Overview" items={mainItems} collapsed={collapsed} />
        <NavGroup label="Revelations" items={revelationItems} collapsed={collapsed} />
        <NavGroup label="Data & Analysis" items={dataItems} collapsed={collapsed} />
        <NavGroup label="Community" items={communityItems} collapsed={collapsed} />
        <NavGroup label="Tools" items={utilityItems} collapsed={collapsed} />
      </SidebarContent>
    </Sidebar>
  );
}
