/**
 * Shared facts and the CV. Public content only: the phone number and other
 * application-only details stay outside this repository (private CV export).
 * The website reads the shared facts below too, so the site and the CV tell the same story.
 */
const coursework = ["Data Structures & Algorithms", "Operations Research", "Human-Computer Interaction", "Web-Based Concepts & Development", "Introduction to AI", "Survey of Programming Languages"];

export const profile = {
  name: "Pa Alieu Njie",
  portrait: { src: "/images/pa-alieu-njie.webp", alt: "Pa Alieu Njie", width: 720, height: 720 },
  contact: {
    email: "paalieunjie22@gmail.com",
    github: "https://github.com/Pa-Alieu25",
    linkedin: "https://www.linkedin.com/in/pa-alieu-njie-983469313",
  },
  // Public CV PDF (no phone number), pinned by hash in scripts/check-public.mjs.
  cv: { href: "/Pa_Alieu_Njie_CV.pdf", label: "Download CV" } as null | { href: string; label: string },
  // Stable Vercel production origin (no trailing slash). Drives canonical URLs, the sitemap and the web CV link.
  siteUrl: "https://pa-alieu-njie.vercel.app" as string | null,
  seo: {
    description: "CV of Pa Alieu Njie, software engineer: mobile apps and the systems behind them. Computer Science student at KNUST, from The Gambia. Open to remote roles.",
  },
  experience: {
    company: "NICK TC-SCAN",
    role: "Software Development Intern",
    location: "Serrekunda, The Gambia",
  },
  leadership: [
    { title: "Vice President", organization: "National Association of Gambian Students in Ghana (NAGSTUG)", dates: "2025 – 2026", description: "Represented and coordinated welfare, academic and cultural matters for Gambian students across Ghana." },
    { title: "Country Representative for The Gambia", organization: "International Students Association (ISA), KNUST", dates: "2025 – 2026", description: "Represented Gambian students and coordinated budgets, events and delegate participation." },
  ],
  achievements: {
    items: [
      { title: "Mastercard Foundation Scholar", detail: "KNUST · January 2025" },
      { title: "Most Valuable Player", detail: "ISA Inter-Year Sports · KNUST" },
      { title: "Basketball", detail: "Gambia U21 National Basketball Team (2023) · KNUST team player" },
    ],
  },
  security: {
    certifications: [
      { name: "Introduction to Cybersecurity", provider: "Cisco NetAcad", status: "In progress" },
      { name: "Google Cybersecurity Professional Certificate", provider: "Google", status: "Planned" },
    ],
  },
  about: {
    languages: ["English", "Wolof", "Mandinka", "Fula"],
    education: [
      { title: "BSc Computer Science", institution: "Kwame Nkrumah University of Science and Technology (KNUST)", dates: "Jan 2025 – 2028 (expected)", note: "Third year · Kumasi, Ghana" },
      { title: "Charles Jow Memorial Academy", institution: "The Gambia", dates: "Completed 2021", note: "" },
    ],
    coursework: [...coursework, "Udemy PHP course (in progress)"],
    courseworkLabel: "Relevant coursework",
  },
} as const;

/** CV wording: concise versions of the website's case studies. */
export const resume = {
  title: "Software Engineer / Full-Stack Developer",
  location: "Kumasi, Ghana · Open to remote",
  documentTitle: "Pa Alieu Njie - CV",
  introduction: [
    "Software engineer building mobile apps and the systems behind them.",
    "I designed and built FleetOps on my own during a NICK TC-SCAN internship; I built most of KNUST ClassMate and co-built its backend.",
    "Open to remote backend, frontend and mobile roles, with a growing focus on cybersecurity.",
  ],
  labels: {
    profile: "Profile",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    projectsContinued: "Projects - continued",
    leadership: "Leadership",
    education: "Education",
    achievements: "Achievements",
    certifications: "Certifications",
    languages: "Languages",
    print: "Print CV",
    download: "Download CV",
    back: "Back to portfolio",
    page: "CV",
    coursework: "Relevant coursework",
    linkedin: "linkedin.com/in/pa-alieu-njie-983469313",
    github: "github.com/Pa-Alieu25",
  },
  skillGroups: [
    { label: "Mobile & frontend", text: "React Native/Expo, React, Next.js, JavaScript/TypeScript, offline sync" },
    { label: "Backend & data", text: "PHP/Laravel/Filament, Java/Spring Boot, Node.js/Express, REST APIs, MySQL, PostgreSQL/PostGIS, SQLite, Firebase" },
    { label: "Tools", text: "Docker, Git/GitHub, GitHub Actions CI, code review" },
    { label: "Foundations", text: "C++ (coursework), nmap, Wireshark, system hardening" },
  ],
  experience: {
    company: profile.experience.company,
    role: profile.experience.role,
    location: profile.experience.location,
    dates: "Sep 2026 - Oct 2026",
    context: "Port operations services at the Port of Banjul.",
    bullets: [
      "Designed and built FleetOps on my own: an offline-first Expo driver app with background GPS and a SQLite upload queue, and a Laravel/Filament admin on MySQL for HR, Finance and management.",
      "Built trip tracking, finance-approved fuel requests with cash/coupon payouts, date/mileage maintenance reminders, reports and email/SMS/push alerts; picture buttons let drivers with limited English log trips without typing.",
      "Rode along with a driver to study real trips, showed progress to management in weekly reviews, and handed the system to the company's IT team; rollout under way.",
      "Continue to maintain FleetOps and add features part-time and remotely (2026 - present).",
    ],
  },
  featured: [
    {
      name: "KNUST ClassMate",
      role: "Group project - built most of the app, co-built the backend",
      stack: "React Native/Expo, TypeScript, Java/Spring Boot, Spring Security/JWT, PostgreSQL",
      summary: "Co-built the Spring Boot backend with Maxwell (GitHub: Kobimcs) and built most of the app: role-based access with JWT (student-only registration, admin-promoted course reps), offline cache and exam-venue search, CSV/XLS/XLSX score uploads, documents, push notifications and an audit log. Payments are demo only.",
    },
    {
      name: "ReportIt Gambia",
      role: "Working prototype - now owner",
      stack: "React Native/Expo, TypeScript, Firebase Auth/Firestore, Cloudinary, Leaflet",
      summary: "Built the app for a two-person KNUST mini-project (ReportIt Ghana), then took the project over: photo/GPS reports, map, status timeline, admin triage, Firestore security rules and status notifications. Adapting it for The Gambia; routing reports to authorities is next. Not launched publicly.",
    },
  ],
  inProgress: [
    {
      name: "TaksiGambia",
      role: "Solo developer - in development",
      stack: "Expo/TypeScript, React/Vite, Java/Spring Boot, PostgreSQL/PostGIS, Docker",
      summary: "Ride-hailing for The Gambia built around landmarks, cash and a visible commission. Built: app shells, an API with startup checks, PostGIS, a generated typed client, tested money and ride-status code, CI. Booking, matching and payments are designed, not built.",
    },
    {
      name: "FA2BEE",
      role: "Client work - in development",
      stack: "Node.js/Express; Next.js, PostgreSQL/Prisma (rebuild)",
      summary: "Website for a multi-service business in The Gambia. Wrote the first version's Express backend, still being built; a Next.js rebuild with server-side pricing is at the scaffold stage.",
    },
    {
      name: "Am Am Gambia",
      role: "Creator - early prototype",
      stack: "Expo",
      summary: "Helps households and landlords find trusted tradespeople and ask for quotes. Early prototype with sample data: search made-up worker profiles by trade and area.",
    },
  ],
  leadership: [
    {
      title: "Project Manager / team lead - Historyverse",
      dates: "Nov 2026 - present",
      summary: "Eight-person CSM 399 group project. Ran the kickoff, split the work into GitHub issues, set up protected branches, required reviews, code owners and CI; review every pull request. React scaffold and data layer in place.",
    },
    {
      title: "Vice President - NAGSTUG",
      dates: "2025 - 2026",
      summary: "National Association of Gambian Students in Ghana. Represented and coordinated welfare, academic and cultural matters for Gambian students across Ghana.",
    },
    {
      title: "Country Representative for The Gambia - ISA, KNUST",
      dates: "2025 - 2026",
      summary: "International Students Association. Represented Gambian students and coordinated budgets, events and delegate participation.",
    },
  ],
  education: [
    { title: "BSc Computer Science", institution: "Kwame Nkrumah University of Science and Technology (KNUST), Kumasi, Ghana", dates: "Jan 2025 - 2028 (expected)", note: "Currently in third year." },
    { title: "Charles Jow Memorial Academy", institution: "The Gambia", dates: "Completed 2021", note: "" },
  ],
  coursework,
  achievements: [
    "Mastercard Foundation Scholar, KNUST (January 2025): competitive scholarship recognising academic strength and leadership potential.",
    "Most Valuable Player, ISA Inter-Year Sports, KNUST.",
    "Gambia U21 National Basketball Team (2023); KNUST team player.",
  ],
  certifications: [
    "Cisco NetAcad: Introduction to Cybersecurity - in progress.",
    "Google Cybersecurity Professional Certificate - planned.",
  ],
  languages: profile.about.languages,
} as const;
