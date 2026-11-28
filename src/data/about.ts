/** About page. Shared facts (education, leadership, achievements, certifications) come from profile.ts so the site and the CV stay the same. */
import { profile } from "./profile";

export const about = {
  seo: {
    title: "About · Pa Alieu Njie",
    description: "Pa Alieu Njie: from Latrikunda German in The Gambia, Computer Science at KNUST as a Mastercard Foundation Scholar, Gambia U21 basketball, student leadership.",
  },
  eyebrow: "About",
  title: "From Latrikunda German to KNUST.",
  photo: profile.portrait,
  intro: [
  "I’m from Latrikunda German in The Gambia and joined KNUST in January 2025 as a Mastercard Foundation Scholar. I’m now a third-year Computer Science student.",
  "I build mobile apps and backends, including FleetOps for NICK TC-SCAN and KNUST ClassMate. I’m open to remote software engineering roles; cybersecurity is an additional area of study."
],
  sections: [
    {
      title: "Basketball",
      text: "I played for the Gambia U21 national team in 2023, and I play for the KNUST team. Basketball taught me teamwork, discipline and sacrifice.",
    },
    {
      title: "Leading people",
      text: "I’ve represented Gambian students in Ghana and at KNUST, and I lead an eight-person team on a course project.",
    },
  ],
  leadership: [
    { title: "Project Manager / team lead", organization: "Historyverse, CSM 399 group project, KNUST", dates: "Nov 2026 – present", text: "Set up GitHub issues, protected branches, required reviews, code owners, a contributing guide and CI for an eight-person CSM 399 team. Review pull requests and send weekly lecturer updates. The React scaffold and data layer are in place; features are in progress." },
    ...profile.leadership.map(role => ({ title: role.title, organization: role.organization, dates: role.dates, text: role.description })),
  ],
  achievements: profile.achievements.items.map(item => ({ title: item.title, detail: item.detail })),
  education: profile.about.education,
  coursework: profile.about.coursework,
  courseworkLabel: profile.about.courseworkLabel,
  languages: profile.about.languages,
  security: {
    title: "Cybersecurity learning",
    text: "My projects use server-side permissions, private file storage and login rate limits. Separately, I’m learning nmap, Wireshark and system hardening.",
    certifications: profile.security.certifications,
  },
} as const;
