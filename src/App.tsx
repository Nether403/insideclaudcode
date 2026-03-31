import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { ScrollToTop } from "@/components/ScrollToTop";
import { lazy, Suspense } from "react";

// Eager load the index page
import Index from "./pages/Index";

// Lazy load all other pages
const NotFound = lazy(() => import("./pages/NotFound"));
const Timeline = lazy(() => import("./pages/Timeline"));
const Undercover = lazy(() => import("./pages/revelations/Undercover"));
const Models = lazy(() => import("./pages/revelations/Models"));
const Features = lazy(() => import("./pages/revelations/Features"));
const Architecture = lazy(() => import("./pages/revelations/Architecture"));
const Security = lazy(() => import("./pages/revelations/Security"));
const Registry = lazy(() => import("./pages/Registry"));
const Explorer = lazy(() => import("./pages/Explorer"));
const Statistics = lazy(() => import("./pages/Statistics"));
const Community = lazy(() => import("./pages/Community"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Glossary = lazy(() => import("./pages/Glossary"));
const About = lazy(() => import("./pages/About"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Newsletter = lazy(() => import("./pages/Newsletter"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-muted-foreground">Loading module...</span>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/revelations/undercover" element={<Undercover />} />
              <Route path="/revelations/models" element={<Models />} />
              <Route path="/revelations/features" element={<Features />} />
              <Route path="/revelations/architecture" element={<Architecture />} />
              <Route path="/revelations/security" element={<Security />} />
              <Route path="/registry" element={<Registry />} />
              <Route path="/explorer" element={<Explorer />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/community" element={<Community />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/newsletter" element={<Newsletter />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
