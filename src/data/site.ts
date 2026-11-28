/**
 * Site-wide content. Every fact here is checked against the repositories
 * (see portfolio-private/redesign/AUDIT.md) or comes from Pa Alieu's own answers.
 * Edit text here; components only handle layout.
 */
import { profile } from "./profile";

export type ProjectSlug = "fleetops" | "classmate" | "reportit" | "taksigambia";
export type StatusKind = "completed" | "rollout" | "prototype" | "development" | "early" | "designed" | "demo";

export const statusLabels: Record<StatusKind, string> = {
  completed: "Completed",
  rollout: "Handed over · rolling out",
  prototype: "Working prototype",
  development: "In development",
  early: "Early stage",
  designed: "Designed, not built",
  demo: "Demo only",
};

export type Link = { label: string; href: string; external?: boolean };
/** Where a skill or claim is proven: a case study, or an anchor on the home page. */
export type Evidence = { label: string; href: string };

const work = (slug: ProjectSlug): string => `/work/${slug}`;
export const evidence = {
  fleetops: { label: "FleetOps", href: work("fleetops") },
  classmate: { label: "ClassMate", href: work("classmate") },
  reportit: { label: "ReportIt", href: work("reportit") },
  taksigambia: { label: "TaksiGambia", href: work("taksigambia") },
  historyverse: { label: "Historyverse", href: "/#historyverse" },
  fa2bee: { label: "FA2BEE", href: "/#fa2bee" },
  site: { label: "this site", href: "https://github.com/Pa-Alieu25/portfolio" },
} satisfies Record<string, Evidence>;

export const site = {
  name: profile.name,
  url: profile.siteUrl,
  email: profile.contact.email,
  linkedin: profile.contact.linkedin,
  github: profile.contact.github,
  cvPage: "/cv",
  cvPdf: profile.cv?.href ?? null,

  seo: {
    title: "Pa Alieu Njie — Software Engineer",
    description: "Pa Alieu Njie builds mobile apps and the systems behind them. Computer Science student at KNUST, from The Gambia. Case studies: FleetOps, KNUST ClassMate, ReportIt Gambia and TaksiGambia.",
  },

  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/about" },
    { label: "CV", href: "/cv" },
  ] satisfies Link[],

  ui: {
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    email: "Email",
    emailMe: "Email me",
    linkedin: "LinkedIn",
    github: "GitHub",
    cv: "CV",
    downloadCv: "Download CV (PDF)",
    readCase: "Read the case study",
    onThisPage: "On this page",
    backToWork: "All work",
    next: "Next",
    source: "Source on GitHub",
    footerNote: "From The Gambia. Studying in Kumasi, Ghana.",
    motto: "1% better every day.",
    notFoundTitle: "Page not found.",
    notFoundText: "This address doesn’t have a page.",
    home: "Back to the home page",
  },

  hero: {
    eyebrow: "Software engineer · From The Gambia, studying in Kumasi, Ghana",
    lead: "I build mobile apps",
    accent: "and backends.",
    intro: "Software engineer and third-year Computer Science student at KNUST, from The Gambia. Open to remote roles in mobile and backend development.",
    primary: { label: "Read the FleetOps case study", href: "/work/fleetops" },
  },

  problems: {
    label: "What I can help with",
    items: [
      { title: "Apps that work offline and sync later", text: "Data is saved on the phone first, uploaded once, and never lost when the signal drops.", proof: [evidence.fleetops, evidence.classmate] },
      { title: "Admin systems with roles and approvals", text: "Who can see, approve and pay for what, checked on the server, with an audit log.", proof: [evidence.fleetops, evidence.classmate] },
      { title: "Backends that own money and status", text: "The app asks; the server decides fuel approvals, roles and ride status.", proof: [evidence.fleetops, evidence.taksigambia] },
    ],
  },

  experience: {
    eyebrow: "Professional experience",
    title: "FleetOps at NICK TC-SCAN, The Gambia",
    role: "Software Development Intern · Sep–Oct 2026",
    text: "I independently developed FleetOps during my internship, working with HR, Finance, IT and drivers to understand operational requirements. The system covers trips, fuel and maintenance; I continue maintaining it part-time and remotely.",
    facts: [
  {
    "title": "Driver app",
    "text": "Background GPS with a SQLite queue for offline trip uploads"
  },
  {
    "title": "Office admin",
    "text": "Laravel/Filament with roles and approvals for HR and Finance"
  },
  {
    "title": "Delivery",
    "text": "Weekly reviews and handover to the company’s IT team"
  },
  {
    "title": "Current status",
    "text": "Server testing approved in Nov 2026; rollout and maintenance continue"
  }
],
  },

  work: {
    eyebrow: "Projects",
    title: "Selected work",
    projects: [
  {
    "slug": "classmate",
    "name": "KNUST ClassMate",
    "meta": "Group project · Jun–Jul 2026",
    "text": "Built most of KNUST ClassMate's React Native app and co-built its Spring Boot backend with Maxwell (GitHub: Kobimcs). Timetables, assignments, offline exam-venue search and bulk score uploads. Payments are a demonstration with no live service connected.",
    "status": "completed"
  }
],
    others: [
  {
    "id": "reportit",
    "slug": "reportit",
    "name": "ReportIt Gambia",
    "meta": "Originally a two-person KNUST project · now owner",
    "status": "prototype",
    "text": "I built ReportIt Ghana’s app and am adapting it for The Gambia: photo/GPS reports, a map and admin status updates. Authority routing and public launch are planned."
  },
  {
    "id": "taksigambia",
    "slug": "taksigambia",
    "name": "TaksiGambia",
    "meta": "Solo · Jul 2026–now",
    "status": "development",
    "statusText": "Foundations built · sign-in in development",
    "text": "Built app shells, API health checks, PostGIS migrations, a generated client, shared money/ride-status code and CI. Booking, matching, fares and payments are planned."
  },
  {
    "id": "fa2bee",
    "name": "FA2BEE",
    "meta": "Client work · The Gambia",
    "status": "development",
    "text": "Developing a multi-service business website. I built the first version’s Express backend; the Next.js/PostgreSQL rebuild with server-side pricing is at the scaffold stage."
  },
  {
    "id": "amam",
    "name": "Am Am Gambia",
    "meta": "Solo · Nov 2026",
    "status": "early",
    "statusText": "Early prototype · sample data",
    "text": "An app for households and landlords to find tradespeople and request quotes. The current Expo prototype searches sample worker profiles by trade and area."
  }
],
  },

  skills: {
    title: "Skills",
    groups: [
      { name: "Mobile", items: [
        { name: "React Native · Expo", proof: [evidence.fleetops, evidence.classmate, evidence.reportit, evidence.taksigambia] },
        { name: "Offline sync (SQLite, AsyncStorage)", proof: [evidence.fleetops, evidence.classmate] },
      ] },
      { name: "Frontend", items: [
        { name: "TypeScript · JavaScript", proof: [evidence.fleetops, evidence.classmate, evidence.taksigambia] },
        { name: "React", proof: [evidence.taksigambia] },
        { name: "Next.js", proof: [evidence.site, evidence.fa2bee] },
      ] },
      { name: "Backend", items: [
        { name: "PHP · Laravel · Filament", proof: [evidence.fleetops] },
        { name: "Java · Spring Boot", proof: [evidence.classmate, evidence.taksigambia] },
        { name: "Node.js · Express", proof: [evidence.fa2bee] },
        { name: "REST API design", proof: [evidence.fleetops, evidence.classmate] },
      ] },
      { name: "Databases", items: [
        { name: "MySQL", proof: [evidence.fleetops] },
        { name: "PostgreSQL · PostGIS", proof: [evidence.classmate, evidence.taksigambia] },
        { name: "SQLite", proof: [evidence.fleetops] },
        { name: "Firebase (Auth, Firestore)", proof: [evidence.reportit] },
      ] },
      { name: "Engineering tools", items: [
        { name: "Git · GitHub · code review", proof: [evidence.historyverse, evidence.taksigambia] },
        { name: "GitHub Actions CI", proof: [evidence.taksigambia, evidence.historyverse] },
        { name: "Docker", proof: [evidence.taksigambia] },
      ] },
      { name: "Security", items: [
        { name: "Server-side roles and permissions", proof: [evidence.fleetops, evidence.classmate, evidence.reportit] },
        { name: "Private files, signed URLs, rate limits", proof: [evidence.fleetops, evidence.classmate] },
      ] },
      { name: "Foundations", items: [{ name: "C++ (coursework)", proof: [] }] },
    ] satisfies { name: string; items: { name: string; proof: Evidence[] }[] }[],
    learning: { title: "Currently learning", items: ["nmap", "Wireshark", "System hardening"], note: "Cybersecurity is an additional interest. Cisco Introduction to Cybersecurity is in progress; the Google certificate is planned." },
  },

  aboutTeaser: {
    eyebrow: "About",
    title: "From Latrikunda German to KNUST.",
    text: "I started programming when I joined Computer Science at KNUST in January 2025 as a Mastercard Foundation Scholar. I played for the Gambia U21 national basketball team in 2023 and play for the KNUST team. Basketball taught me teamwork, discipline and sacrifice.",
    link: { label: "More about me", href: "/about" },
  },

  contact: {
    eyebrow: "Contact",
    title: "Contact",
    text: "Open to remote software engineering roles, with an emphasis on mobile and backend development.",
  },
} as const;
