import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { ReadingProgress } from "@/components/ReadingProgress";
import { NavigationBreadcrumbs } from "@/components/NavigationBreadcrumbs";
import { TableOfContents } from "@/components/TableOfContents";

export function Layout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <ReadingProgress />
          <header className="h-12 flex items-center border-b border-border/30 px-4 sticky top-0 z-40 bg-background/80 backdrop-blur-md">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div className="ml-4 flex-1 min-w-0">
              <NavigationBreadcrumbs />
            </div>
            <div className="ml-auto flex items-center gap-3">
              <span className="text-[10px] font-mono text-muted-foreground/50 hidden sm:inline">
                STATUS: <span className="text-terminal">ACTIVE</span>
              </span>
              <div className="h-2 w-2 rounded-full bg-terminal animate-pulse-glow" />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <Outlet />
            <TableOfContents />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
