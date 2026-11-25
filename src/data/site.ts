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
    lead: "I build mobile apps and the systems behind them,",
    accent: "for how people in The Gambia and Ghana actually work.",
    intro: "I’m a third-year Computer Science student at KNUST. On my internship at NICK TC-SCAN I was the only developer on FleetOps: a driver app that keeps working with mobile data off, and an admin system for HR and Finance. I still maintain it for the company. I’m looking for remote software engineering roles, with a growing focus on security.",
    primary: { label: "See my work", href: "/#work" },
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
    text: "I built the company’s fleet system on my own: trips, fuel and maintenance, from riding along with a driver to handing it over to the IT team. Since the internship I keep maintaining it and adding features, part-time and remotely.",
    facts: [
      { title: "Only developer", text: "Worked directly with HR, Finance, IT and drivers" },
      { title: "Weekly reviews", text: "Showed management my progress every Friday" },
      { title: "Offline-first", text: "Trips record by GPS with mobile data off" },
      { title: "Handed over", text: "Server testing approved in Nov 2026; rollout under way" },
    ],
  },

  work: {
    eyebrow: "Projects",
    title: "Built, being built, and planned. Labelled honestly.",
    projects: [
      { slug: "classmate", name: "KNUST ClassMate", meta: "Group project · Jun–Jul 2026", text: "Timetables, assignments, exam venues and scores for students and course reps. I built most of the app and co-built the Spring Boot backend with Maxwell (GitHub: Kobimcs).", status: "completed" },
      { slug: "reportit", name: "ReportIt Gambia", meta: "Started as a two-person project · now mine", text: "Report a pothole, a leak or flooding with a photo and location, then follow it until it’s fixed.", status: "prototype" },
      { slug: "taksigambia", name: "TaksiGambia", meta: "Solo · Jul 2026–now", text: "Ride-hailing built around landmarks, cash and a commission drivers can see. Foundations and safety checks are built; ride features come next.", status: "development" },
    ] satisfies { slug: ProjectSlug; name: string; meta: string; text: string; status: StatusKind }[],
    others: [
      { id: "historyverse", name: "Historyverse", meta: "Team lead of eight · KNUST course project · Nov 2026–now", status: "early", text: "An interactive history website. I run the team: issues, reviews, CI and weekly updates to our lecturer. The React scaffold and data layer, written by a teammate, are in place; features are in progress. Final presentation in January 2027." },
      { id: "fa2bee", name: "FA2BEE", meta: "Client work for a Gambian business owner", status: "development", text: "A website for a multi-service business in The Gambia (laundry, cleaning and more). I wrote the first version’s Node.js/Express backend, which is still being built. A Next.js and PostgreSQL rebuild with server-side pricing is at the scaffold stage." },
      { id: "amam", name: "Am Am Gambia", meta: "Solo · Nov 2026", status: "early", text: "Helps households and landlords find a trusted tradesperson nearby, see their past work and ask for a quote. The Expo prototype searches made-up worker profiles by trade and area.", statusText: "Early prototype · sample data" },
    ] satisfies { id: string; name: string; meta: string; status: StatusKind; text: string; statusText?: string }[],
  },

  skills: {
    eyebrow: "Skills, with evidence",
    title: "Each skill links to where I used it.",
    groups: [
      { name: "Mobile", items: [
        { name: "React Native · Expo", proof: [evidence.fleetops, evidence.classmate, evidence.reportit, evidence.taksigambia] },
        { name: "Offline sync (SQLite, AsyncStorage)", proof: [evidence.fleetops, evidence.classmate] },
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
      { name: "Frontend", items: [
        { name: "TypeScript · JavaScript", proof: [evidence.fleetops, evidence.classmate, evidence.taksigambia] },
        { name: "React", proof: [evidence.taksigambia] },
        { name: "Next.js", proof: [evidence.site, evidence.fa2bee] },
      ] },
      { name: "Tools", items: [
        { name: "Git · GitHub · code review", proof: [evidence.historyverse, evidence.taksigambia] },
        { name: "GitHub Actions CI", proof: [evidence.taksigambia, evidence.historyverse] },
        { name: "Docker", proof: [evidence.taksigambia] },
      ] },
      { name: "Security", items: [
        { name: "Roles, policies and server-side rules", proof: [evidence.fleetops, evidence.classmate, evidence.reportit] },
        { name: "Private files, signed URLs, rate limits", proof: [evidence.fleetops, evidence.classmate] },
      ] },
    ] satisfies { name: string; items: { name: string; proof: Evidence[] }[] }[],
  },

  aboutTeaser: {
    eyebrow: "About",
    title: "From Latrikunda German to KNUST.",
    text: "I started programming when I joined Computer Science at KNUST in January 2025 as a Mastercard Foundation Scholar. I played for the Gambia U21 national basketball team in 2023 and play for the KNUST team. Basketball taught me teamwork, discipline and sacrifice.",
    link: { label: "More about me", href: "/about" },
  },

  contact: {
    eyebrow: "Contact",
    title: "Let’s talk about a role or a project.",
    text: "I’m open to remote software engineering roles across mobile, backend and frontend, with a growing focus on cybersecurity.",
  },
} as const;
