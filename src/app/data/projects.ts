export interface CaseStudyPhase {
  step: string;
  title: string;
  content: string[];
  imageNote?: string;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  role: string;
  duration: string;
  team: string;
  tools: string;
  platform: string;
  tags: string[];
  year: string;
  bg: string;
  textColor: string;
  tagBg: string;
  accent: string;
  image?: string;
  stats?: { label: string; value: string }[];
  phases: CaseStudyPhase[];
  research?: string[];
  closing?: string;
}

export const projects: Project[] = [
  {
    slug: "whisker-haven",
    number: "01",
    title: "Whisker Haven",
    subtitle: "End-to-end UX Research & Design",
    description:
      "A booking platform designed to make reserving cat hotel stays simple and stress-free for pet owners.",
    longDescription:
      "I led the end-to-end UX process for Whisker Haven — from early discovery research through to a validated high-fidelity prototype. The goal was to remove the confusion and distrust that pet owners face when searching for a reliable cat hotel.",
    role: "UX/UI Designer",
    duration: "12 weeks",
    team: "Solo project",
    tools: "Figma, Maze",
    platform: "Mobile App (Flutter)",
    tags: ["UX Research", "UI Design", "Mobile App", "Flutter"],
    year: "2024",
    bg: "#FDB813",
    textColor: "#1A1A1A",
    tagBg: "rgba(0,0,0,0.08)",
    accent: "#7A4F00",
    image: "/projects/whisker-haven/hero.png",
    stats: [
      { label: "Task completion rate", value: "100%" },
      { label: "SUS score — Grade A, 'Excellent'", value: "85" },
    ],
    phases: [
      {
        step: "01 — Discover",
        title: "The problem",
        content: [
          "Finding a cat hotel stay is often confusing, with unclear pricing, limited visibility into caregiver quality, and no easy way to check real-time availability.",
          "Interviewed 6 cat owners and reviewed 4 competing platforms to map where trust breaks down in the booking journey.",
          "Key insight: users abandon bookings not because of price, but because they can't verify the caregiver's credibility before committing.",
        ],
        imageNote: "Insert: research synthesis / affinity diagram",
      },
      {
        step: "02 — Define",
        title: "Finding direction",
        content: [
          "Turned research insights into two primary personas and a set of How-Might-We questions centred on trust and friction.",
          "HMW: How might we help pet owners feel confident in a caregiver's quality before making a booking?",
          "Mapped the current user journey to pinpoint the three highest-friction moments: searching without filters, reading vague profiles, and unclear pricing breakdowns.",
        ],
        imageNote: "Insert: personas + user journey map",
      },
      {
        step: "03 — Design",
        title: "Shaping the flow",
        content: [
          "Translated priorities into user flows and wireframes, iterating toward a high-fidelity Figma prototype through three rounds of internal review.",
          "Key design decisions: verified caregiver badges, photo-forward profiles, and upfront pricing with no hidden fees.",
          "Built a streamlined Search → Profile → Book → Confirm experience, reducing the path from discovery to confirmation to 5 steps.",
        ],
        imageNote: "Insert: wireframes / hi-fi mockups",
      },
      {
        step: "04 — Validate",
        title: "Testing it works",
        content: [
          "Ran usability testing on core tasks: searching availability, reading a caregiver profile, and completing a booking.",
          "Measured success using the System Usability Scale (SUS) alongside task completion and error rates.",
          "Result: 100% task completion rate across all participants · SUS score 85 — Grade A, 'Excellent' usability.",
        ],
        imageNote: "Insert: usability testing session / SUS result chart",
      },
    ],
    closing: "Whisker Haven proved that trust is the core conversion driver in care-service platforms — not price. A clear caregiver verification system and transparent upfront pricing resolved the key friction points identified in research.",
  },
  {
    slug: "starmory",
    number: "02",
    title: "Starmory",
    subtitle: "Memory-Based Language Learning Application",
    description:
      "A language-learning app that uses AI and the FSRS spaced-repetition algorithm to help users build vocabulary more effectively — grounded in 6 learning theories, not trends.",
    longDescription:
      "Most language apps treat learning as drills disconnected from real life. Starmory is different: users photograph their world, and AI turns those personal images into vocabulary lessons. I contributed across the full stack — UX research, UI design, database architecture, and front-end development.",
    role: "UX/UI Designer & Full-stack Developer",
    duration: "16 weeks",
    team: "2 developers (Rattikan + 1 teammate)",
    tools: "Figma, Flutter, Supabase, Firebase",
    platform: "Mobile App (Flutter)",
    tags: ["AI", "UX/UI Design", "Flutter", "Full-stack", "Spaced Repetition"],
    year: "2024",
    bg: "#8B5CF6",
    textColor: "#FFFFFF",
    tagBg: "rgba(255,255,255,0.2)",
    accent: "#A78BFA",
    image: "/projects/starmory/hero.png",
    stats: [
      { label: "Learning theories grounding the design", value: "6" },
      { label: "Core features shipped", value: "6" },
    ],
    phases: [
      {
        step: "01 — Discover",
        title: "Why do language apps fail people?",
        content: [
          "Analysed 4 competing apps — Duolingo, Anki, Quizlet, Memrise — mapping where each loses users and why retention drops after the first two weeks.",
          "Three critical gaps emerged: lessons have no connection to the user's real-life context; the depth-vs-speed trade-off is handled poorly; and grammar focus crowds out real communication intent.",
          "Conducted a literature review grounding the product in established learning science — so every design decision has a theoretical reason, not just a trend behind it.",
        ],
        imageNote: "Insert: competitive analysis matrix",
      },
      {
        step: "02 — Define",
        title: "Mapping theory to features",
        content: [
          "Synthesised research into 6 core feature areas, each tied directly to a learning theory: Photo Vocabulary (Episodic Memory), AI Lesson Generation (Input Hypothesis i+1), Re-Sight Review (FSRS spaced repetition), Grammar Scoring (Speech Act Theory), Archive & History (Context-Dependent Memory), Progress Tracking (Self-Reference Effect).",
          "Every feature traces back to a specific mechanism of how humans retain language — no feature existed just because it felt right.",
          "Wrote a requirements document aligning features with development constraints, splitting the build between myself and my teammate by feature ownership.",
        ],
        imageNote: "Insert: feature–theory mapping diagram",
      },
      {
        step: "03 — Design",
        title: "Turning theory into interaction",
        content: [
          "The core flow: user photographs anything → AI identifies objects and generates contextual sentences → user reviews vocabulary through spaced-repetition cards powered by FSRS.",
          "FSRS (Ye et al., 2023) calculates the optimal moment to re-show each word — not too soon (wasted effort), not too late (already forgotten). It is the most accurate open-source algorithm for memory scheduling.",
          "UI design prioritised minimal friction at capture: one tap to photograph, instant AI response, zero manual tagging. The review interface feels like flipping through personal memories, not drilling flashcards.",
        ],
        imageNote: "Insert: key screens — Capture, Lesson, Review",
      },
      {
        step: "04 — Build",
        title: "Full-stack ownership",
        content: [
          "I took primary ownership of the database architecture — designing the schema in Supabase to handle user vocabularies, review schedules, lesson history, and AI-generated content.",
          "Implemented the FSRS algorithm on the back-end, connecting review outcomes to interval recalculation in real time.",
          "Built the front-end in Flutter, managing state across the capture, lesson, and review flows while keeping the codebase maintainable across a 16-week timeline.",
        ],
        imageNote: "Insert: database schema / architecture diagram",
      },
    ],
    research: [
      "Episodic Memory — Tulving, 1972",
      "FSRS Spaced-Repetition — Ye et al., 2023",
      "Input Hypothesis 'i+1' — Krashen, 1985",
      "Self-Reference Effect — Rogers et al., 1977",
      "Speech Act Theory — Austin 1962; Searle 1969",
      "Context-Dependent Memory — Godden & Baddeley, 1975",
    ],
    closing: "Starmory taught me that the strongest design decisions come from understanding the science of how people actually learn — not from copying what popular apps do. Grounding every feature in an established theory gave us a clear reason to say yes or no to any idea during the build.",
  },
  {
    slug: "healthy-taste",
    number: "03",
    title: "Healthy Taste",
    subtitle: "End-to-end UX/UI Design",
    description:
      "A calorie-tracking app designed to remove the friction of daily logging. Research-driven personas shaped a simplified form, built into a scalable Figma design system.",
    longDescription:
      "Most calorie-tracking apps fail users within two weeks because the act of logging feels more effortful than the benefit seems worth. Healthy Taste was designed from the ground up to flip that ratio — making logging so fast and frictionless that it becomes a habit rather than a chore.",
    role: "UX/UI Designer",
    duration: "10 weeks",
    team: "Solo project",
    tools: "Figma, FigJam",
    platform: "Mobile App",
    tags: ["Mobile App", "UX/UI Design", "Design System", "Figma"],
    year: "2024",
    bg: "#E8522A",
    textColor: "#FFFFFF",
    tagBg: "rgba(255,255,255,0.15)",
    accent: "#FFD4A8",
    image: "/projects/healthy-taste/hero.png",
    phases: [
      {
        step: "01 — Research",
        title: "Understanding the friction",
        content: [
          "Identified that users abandon calorie-tracking apps within 2 weeks — the primary cause is tedious manual logging and poor portion estimation tools.",
          "Conducted requirement analysis including competitor review of MyFitnessPal, Cronometer, and Lose It!, plus user persona development from 8 interviews.",
          "Key friction points: searching for food items (too many results), estimating portions (no visual aid), and remembering to log (no smart reminders).",
        ],
        imageNote: "Insert: competitive analysis / persona card",
      },
      {
        step: "02 — Design",
        title: "Simplified logging flow",
        content: [
          "Designed a quick-log interface that reduces the logging time to under 30 seconds per meal using smart suggestions based on past entries and barcode scanning.",
          "Visual portion estimator replaces manual gram entry — users select from photo-based size guides instead.",
          "Context-aware reminders trigger based on typical meal times rather than fixed alarms.",
        ],
        imageNote: "Insert: wireframes → hi-fi mockup screens",
      },
      {
        step: "03 — Design System",
        title: "Scalable component library",
        content: [
          "Built a comprehensive Figma design system covering typography scale, colour tokens, spacing grid, and 30+ reusable components.",
          "All components documented with usage guidelines, do/don't examples, and accessibility notes.",
          "System structured to scale into future features: meal planning, social sharing, and coach integration.",
        ],
        imageNote: "Insert: design system component overview",
      },
    ],
    closing: "The biggest learning: reducing one step in a repeated daily action has outsized impact on habit formation. Every second of friction removed from logging translates directly to higher retention.",
  },
  {
    slug: "terramon",
    number: "04",
    title: "Terramon",
    subtitle: "AI Plant Care App",
    description:
      "A plant care app combining AI-powered plant identification, care reminders, and a digital plant journal to help users keep their plants healthy.",
    longDescription:
      "Terramon was a 10-person university team project. UX/UI design and documentation was led by a sub-team of 4, including myself. The challenge: making plant care knowledge accessible to people who want to grow things but don't know where to start.",
    role: "UX/UI Designer & Front-end Developer",
    duration: "14 weeks",
    team: "10-person cross-functional team (sub-team of 4 for UX/UI)",
    tools: "Figma, React Native, Node.js",
    platform: "Mobile App",
    tags: ["AI", "UX/UI Design", "Full-stack", "Team Project"],
    year: "2023",
    bg: "#aacb01",
    textColor: "#1A1A1A",
    tagBg: "rgba(0,0,0,0.1)",
    accent: "#86EFAC",
    image: "/projects/terramon/hero.png",
    phases: [
      {
        step: "01 — Research",
        title: "Who are plant owners?",
        content: [
          "Surveyed 40 plant owners to understand care barriers: forgetting watering schedules, difficulty identifying plant diseases, and lack of personalised care guidance.",
          "Defined primary user: urban apartment dwellers aged 20–35 with limited gardening knowledge who impulse-buy plants and struggle to keep them alive.",
          "Secondary user: intermediate plant enthusiasts wanting to expand their collection and track plant health over time.",
        ],
        imageNote: "Insert: user research findings / persona",
      },
      {
        step: "02 — Design",
        title: "AI-assisted experience",
        content: [
          "Designed the AI plant identification flow — users photograph a plant and receive species ID, care instructions, and common problem diagnosis within seconds.",
          "Care reminder system adapts to each plant's specific needs rather than generic weekly reminders.",
          "Led the design sub-team through sprints, component building, and a structured design-to-dev handoff process.",
        ],
        imageNote: "Insert: key screens — identify, care schedule, journal",
      },
      {
        step: "03 — Development",
        title: "Bridging design and engineering",
        content: [
          "Contributed to front-end implementation alongside design responsibilities, acting as the bridge between the design and engineering sub-teams.",
          "Managed a shared component library ensuring design and implementation stayed in sync across the full 10-person team.",
          "Coordinated weekly design reviews and implemented feedback loops between designers and developers.",
        ],
        imageNote: "Insert: team workflow / final product screenshots",
      },
    ],
    closing: "Working in a 10-person team taught me that the design-to-dev handoff is itself a design problem. Clear documentation, shared components, and regular cross-team reviews made the difference between a product that ships and one that drifts.",
  },
  {
    slug: "bing-chilling",
    number: "05",
    title: "BingChilling",
    subtitle: "Art Toy E-Commerce Platform",
    description:
      "An e-commerce site for an art toy brand. Analysed user characteristics, mapped dual user journeys, then built the full application from database to front-end.",
    longDescription:
      "BingChilling required designing for two completely different user types on one platform: the art toy collector browsing for limited drops, and the back-office administrator managing inventory and orders. Balancing both journeys without compromising either was the core design challenge.",
    role: "UX/UI Designer & Full-stack Developer",
    duration: "12 weeks",
    team: "Solo project",
    tools: "Figma, React, Node.js, PostgreSQL",
    platform: "Web",
    tags: ["E-Commerce", "UX/UI Design", "Full-stack", "Web"],
    year: "2023",
    bg: "#F2C4CE",
    textColor: "#1A1A1A",
    tagBg: "rgba(0,0,0,0.07)",
    accent: "#C0405A",
    image: "/projects/bing-chilling/hero.png",
    phases: [
      {
        step: "01 — Research",
        title: "Understanding art toy collectors",
        content: [
          "Analysed the art toy collector community — their browsing habits (discovery-led, not search-led), purchase triggers (scarcity, aesthetic, brand story), and trust signals (authentication, packaging quality).",
          "Key insight: art toy buyers are shopping for the story and status of an object, not just its function. The product page must communicate brand world, not just specs.",
          "Also mapped back-office admin needs: inventory alerts, order fulfilment, and sales reporting.",
        ],
        imageNote: "Insert: user research / dual-persona cards",
      },
      {
        step: "02 — Design",
        title: "Two journeys, one system",
        content: [
          "Designed the public storefront with a brand-first layout — editorial product pages, drop countdown mechanics, and a 'blind box' reveal interaction.",
          "Designed the admin dashboard for speed: bulk inventory management, order status board, and a one-screen fulfilment workflow.",
          "Maintained a single Figma design system used across both surfaces, keeping visual language consistent while serving very different user goals.",
        ],
        imageNote: "Insert: storefront + admin dashboard mockups",
      },
      {
        step: "03 — Development",
        title: "Database to front-end",
        content: [
          "Built the full application stack: PostgreSQL schema, RESTful API, and React front-end.",
          "Implemented product catalogue with variant management, shopping cart with session persistence, and a complete order management system.",
          "Handled user authentication, role-based access (customer vs admin), and secure checkout flow end-to-end.",
        ],
        imageNote: "Insert: architecture diagram / final product screens",
      },
    ],
    closing: "BingChilling showed me that the best design decisions come from understanding not just what users do, but why collecting art toys matters to them emotionally. The whole product experience is a reflection of that emotional value.",
  },
  {
    slug: "steam-redesign",
    number: "06",
    title: "Steam Mobile",
    subtitle: "App Redesign — UX Research & UI Design",
    description:
      "A redesign of the Steam mobile app, addressing a cluttered home screen, poor navigation, and a UI that feels like a website crammed into a phone.",
    longDescription:
      "Steam's mobile app is used by millions but suffers from significant usability issues on small screens. Working in a team of 3, we conducted end-to-end UX research — empathy mapping, affinity diagramming, and persona creation — to identify the root causes, then redesigned the core flows.",
    role: "UX Researcher & UI Designer",
    duration: "8 weeks",
    team: "3 designers (Rattikan, Nuanwan, Muanpee)",
    tools: "Figma, FigJam",
    platform: "Mobile App (iOS / Android)",
    tags: ["App Redesign", "UX Research", "Heuristic Evaluation", "Mobile"],
    year: "2025",
    bg: "#60A5FA",
    textColor: "#FFFFFF",
    tagBg: "rgba(255,255,255,0.2)",
    accent: "#66C0F4",
    image: "/projects/steam-redesign/hero.png",
    phases: [
      {
        step: "01 — Discover",
        title: "Empathy mapping & raw insights",
        content: [
          "Conducted empathy mapping with real Steam mobile users, capturing what they Say, Think, Do, and Feel while using the app.",
          "Key emotional states: Overwhelmed 😰 by the home screen clutter, Confused 😕 by navigation layers, Frustrated 😤 by the gap between desktop and mobile experience.",
          "Representative quotes: \"Why do I need another app just to chat?\", \"I want a filter for game categories in my library\", \"Why is the mobile experience worse than the desktop version?\"",
        ],
        imageNote: "Insert: empathy map diagram",
      },
      {
        step: "02 — Define",
        title: "Affinity grouping — 5 problem clusters",
        content: [
          "Grouped 16 raw insight cards into 5 distinct problem themes using affinity diagramming.",
          "Group 1 — Navigation & Findability: Users scroll endlessly to find recently purchased games; resort to the search bar because category navigation is confusing.",
          "Group 2 — Information Architecture & Organization: No category filters in the game library; discounted games mixed across categories with too many irrelevant tags.",
          "Group 3 — Visual Hierarchy & Clarity: Everything looks the same — no visual priority; users can't tell if a game is installed without tapping into it.",
          "Group 4 — Feature Integration: Chat requires downloading a separate app; the feature feels completely disconnected from the main experience.",
          "Group 5 — Mobile Usability: The UI feels like a website crammed into a phone screen; search tags and images overflow the screen width.",
        ],
        imageNote: "Insert: affinity diagram (raw → grouped)",
      },
      {
        step: "03 — Persona",
        title: "Austin James — our primary user",
        content: [
          "Age 21, university student in Chiang Mai. Uses Steam on PC for gaming but relies on the mobile app for browsing deals, managing his library, and checking Steam Guard codes.",
          "Quote: \"I want to find the best deals and manage my library quickly without getting lost in a sea of irrelevant game banners.\"",
          "Goals: Easily identify game types when browsing discounts · Use the app without a learning curve · Make smart spending decisions as a student.",
          "Motivations: Prefers clear categories and filters · Wants a short curated deal list, not an endless scroll · Wants everything in one app without switching.",
        ],
        imageNote: "Insert: persona card — Austin James",
      },
      {
        step: "04 — Design",
        title: "Redesign decisions",
        content: [
          "Redesigned the home screen to prioritise personalised deals over generic recommendations — replacing the banner-heavy layout with a card-based feed filtered by owned/wishlist genres.",
          "Restructured library navigation: added category filters, installed/not-installed toggle, and persistent sort controls — eliminating the need to tap into each game to check its status.",
          "Consolidated chat into the main app navigation instead of a separate app, integrated directly with the friends list.",
        ],
        imageNote: "Insert: before / after screens — Home, Library, Store",
      },
    ],
    closing: "This project reinforced that the worst UX problems are usually invisible to the people who made the product — they only show up when you watch real users struggle. The affinity diagram turned 16 scattered complaints into 5 actionable design targets.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const idx = projects.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
}
