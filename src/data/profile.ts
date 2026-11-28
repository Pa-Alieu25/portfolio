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
  title: "Software Engineer",
  location: "Kumasi, Ghana · Open to remote",
  documentTitle: "Pa Alieu Njie - CV",
  introduction: [
  "Software engineer focused on mobile and backend development.",
  "Independently developed FleetOps during a NICK TC-SCAN internship. Built most of KNUST ClassMate's React Native app and co-built its Spring Boot backend with Maxwell (GitHub: Kobimcs).",
  "Third-year Computer Science student at KNUST, open to remote software engineering roles."
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
  {
    "label": "Mobile",
    "text": "React Native/Expo, offline sync"
  },
  {
    "label": "Frontend",
    "text": "React, Next.js, JavaScript/TypeScript"
  },
  {
    "label": "Backend",
    "text": "PHP/Laravel/Filament, Java/Spring Boot, Node.js/Express, REST APIs"
  },
  {
    "label": "Databases",
    "text": "MySQL, PostgreSQL/PostGIS, SQLite, Firebase"
  },
  {
    "label": "Engineering tools",
    "text": "Docker, Git/GitHub, GitHub Actions CI, code review"
  },
  {
    "label": "Security",
    "text": "Project work: server-side roles, private files, signed URLs, rate limiting. Learning: nmap, Wireshark, system hardening."
  },
  {
    "label": "Foundations",
    "text": "C++ (coursework)"
  }
],
  experience: {
    company: profile.experience.company,
    role: profile.experience.role,
    location: profile.experience.location,
    dates: "Sep 2026 - Oct 2026",
    context: "Port operations services at the Port of Banjul.",
    bullets: [
  "Independently developed FleetOps: an offline-first Expo app with background GPS and a SQLite upload queue, plus a Laravel/Filament admin on MySQL.",
  "Built trip tracking, finance-approved fuel requests with cash/coupon payouts, date/mileage maintenance reminders, reports and email/SMS/push alerts. Picture buttons support drivers with limited English.",
  "Worked with HR, Finance, IT and drivers, observing workflows to define operational requirements. Reviewed progress weekly and handed the system to IT; rollout is under way.",
  "Continue maintenance and feature development part-time and remotely (2026 - present)."
],
  },
  featured: [
    {
      name: "KNUST ClassMate",
      role: "Group project - mobile app and backend",
      stack: "React Native/Expo, TypeScript, Java/Spring Boot, Spring Security/JWT, PostgreSQL",
      summary: "Built most of KNUST ClassMate's React Native app and co-built its Spring Boot backend with Maxwell (GitHub: Kobimcs). Implemented role-based access, offline cache, exam-venue search, bulk score uploads, documents, notifications and audit logging. Payments are a demonstration with no live payment service connected.",
    },
    {
      name: "ReportIt Gambia",
      role: "Working prototype - now owner",
      stack: "React Native/Expo, TypeScript, Firebase Auth/Firestore, Cloudinary, Leaflet",
      summary: "Built the app for the two-person ReportIt Ghana student project, then took ownership and began adapting it for The Gambia. Implemented photo/GPS reports, a map, admin triage, status updates and Firestore security rules. Authority routing is planned; not publicly launched.",
    },
  ],
  inProgress: [
    {
      name: "TaksiGambia",
      role: "Solo developer - in development",
      stack: "Expo/TypeScript, React/Vite, Java/Spring Boot, PostgreSQL/PostGIS, Docker",
      summary: "Built the app shells, Spring Boot API health checks, PostGIS migrations, generated API client, shared money/ride-status code and CI. Sign-in is in development. Booking, matching, fares, cash commission and payments are planned.",
    },
    {
      name: "FA2BEE",
      role: "Client work - in development",
      stack: "Node.js/Express; Next.js, PostgreSQL/Prisma (rebuild)",
      summary: "Developing a website for a Gambian multi-service business. Built the first version’s Express backend; it remains in development. The Next.js/PostgreSQL rebuild with server-side pricing is at the scaffold stage.",
    },
    {
      name: "Am Am Gambia",
      role: "Creator - early prototype",
      stack: "Expo",
      summary: "An app for households and landlords to find tradespeople and request quotes. The current Expo prototype searches sample worker profiles by trade and area.",
    },
  ],
  leadership: [
    {
      title: "Project Manager / team lead - Historyverse",
      dates: "Nov 2026 - present",
      summary: "Set up GitHub issues, protected branches, required reviews, code owners, a contributing guide and CI for an eight-person CSM 399 team. Review pull requests and send weekly lecturer updates.",
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
