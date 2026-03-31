import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Timeline from "./pages/Timeline";
import Undercover from "./pages/revelations/Undercover";
import Models from "./pages/revelations/Models";
import Features from "./pages/revelations/Features";
import Architecture from "./pages/revelations/Architecture";
import Security from "./pages/revelations/Security";
import Registry from "./pages/Registry";
import Explorer from "./pages/Explorer";
import Statistics from "./pages/Statistics";
import Community from "./pages/Community";
import Pricing from "./pages/Pricing";
import Glossary from "./pages/Glossary";
import About from "./pages/About";
import SearchPage from "./pages/SearchPage";
import Newsletter from "./pages/Newsletter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
