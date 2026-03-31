

# Claude Code Leak — Interactive Information Hub

## Concept
A dark-themed, data-rich interactive website that presents the Claude Code source leak findings as an explorable intelligence dashboard. Think: a blend of a cybersecurity research portal and an interactive data visualization experience — with editorial storytelling woven throughout.

## Visual Design
- **Dark theme** with glowing accent colors (cyan/green terminals, amber highlights for "classified" elements)
- Animated data visualizations: particle effects, typing animations, code snippets that reveal themselves
- "Redacted/declassified" visual motifs from the PDF dossiers as design accents
- Smooth scroll-driven animations, parallax sections, and expandable deep-dive cards
- Fully responsive — mobile-first with touch-friendly interactive elements

## Site Architecture (15+ sections)

### Landing / Hero
- Dramatic animated hero with the headline "512,000 Lines. 2,000+ Files. The Accidental Unmasking."
- Animated counter stats (files, lines, tools, env vars)
- Scroll-down CTA into the timeline

### Interactive Timeline
- Horizontal/vertical scrollable timeline of events: the leak, discovery, community archiving, rewrites
- Each node expands into a detail card

### The Revelations (5 Main Deep-Dive Pages)
1. **Undercover Mode** — The stealth protocol, directives, ethical implications
2. **Capybara & Model Registry** — Unreleased models, codenames table (Fennec, Capybara, Tangu, Numbat), version comparison chart
3. **Hidden Features** — Buddy (AI pet), KAIROS (dreaming assistant), Ultraplan, Coordinator
4. **Architecture Deep-Dive** — Boot sequence, query loop, tool system, context management (with interactive diagrams)
5. **Security & Safety** — YOLO classifier, bash AST analysis, unicode smuggling prevention, ptrace protection

### Model Codename Registry
- Interactive searchable/filterable table of all discovered models with specs
- Visual comparison cards

### Architecture Explorer
- Interactive diagram of the system architecture (boot sequence, query loop, tool execution)
- Click-to-expand nodes showing code snippets and explanations

### Codebase Statistics Dashboard
- Animated charts: lines of code, file distribution, tool count, env vars
- Recharts-powered bar/pie/radar charts

### Community & Ecosystem
- Claw-code GitHub stats, Python/Rust rewrites, CLAUDE.md instruction files
- Links to external resources

### Pricing & Business Model Analysis
- Fast Mode pricing breakdown, 6x markup visualization
- Token economics calculator

### Glossary / Wiki
- Searchable index of all codenames, terms, and technical concepts
- Alphabetical browse + search

### About / Methodology
- How the analysis was conducted, sources cited

### Search
- Full-text search across all content sections

### Newsletter Signup
- Email capture for updates on new findings

## Key Interactive Features
- **Code reveal animations** — code snippets that "decrypt" on scroll
- **Comparison sliders** — public vs. internal capabilities
- **Expandable info cards** — click to deep-dive without leaving the page
- **Data visualization dashboard** — animated charts with Recharts
- **Search & filter** — across all content
- **Dark/light mode toggle** (default dark)
- **Progress indicator** — showing how much of the content you've explored
- **Smooth page transitions** with Framer Motion

## Technical Stack
- React 18 + TypeScript + Vite (existing setup)
- Tailwind CSS with custom dark theme tokens
- Framer Motion for animations
- Recharts for data visualizations
- React Router for multi-page navigation
- Lucide icons
- Light backend: newsletter signup via Supabase edge function or simple form service

## Development Phases
1. **Phase 1**: Design system, layout shell, navigation, hero + landing page
2. **Phase 2**: Timeline, 5 revelation deep-dive pages, model registry
3. **Phase 3**: Architecture explorer, statistics dashboard, charts
4. **Phase 4**: Search, glossary, newsletter, community page
5. **Phase 5**: Animations, polish, SEO, performance optimization

## Content Strategy
- Lead with the most dramatic revelations (Undercover Mode, Capybara)
- Use progressive disclosure — summaries first, expandable details
- Visual data over walls of text
- Code snippets styled as terminal output for authenticity
- Each section has a TL;DR card + full deep-dive

