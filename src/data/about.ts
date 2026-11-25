/** About page. Shared facts (education, leadership, achievements, certifications) come from profile.ts so the site and the CV stay the same. */
import { profile } from "./profile";

export const about = {
  seo: {
    title: "About · Pa Alieu Njie",
    description: "Pa Alieu Njie: from Latrikunda German in The Gambia, Computer Science at KNUST as a Mastercard Foundation Scholar, Gambia U21 basketball, student leadership.",
  },
  eyebrow: "About",
  title: "From Latrikunda German to KNUST.",
  /** Optional portrait, shown only if the file exists under public/. */
  photo: { file: "about/portrait", alt: "Portrait of Pa Alieu Njie" },
  intro: [
    "I’m from Latrikunda German in The Gambia. I got into programming when I enrolled in Computer Science at KNUST in January 2025, as a Mastercard Foundation Scholar, and I’m in my third year now.",
    "Since then I’ve built software for real problems at home and in Ghana: a fleet system for a company in The Gambia, a class app for KNUST students, and apps for reporting local problems and booking rides. I want to keep working in software engineering and cybersecurity, and I’m open to remote roles.",
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
    ...profile.leadership.map(role => ({ title: role.title, organization: role.organization, dates: role.dates, text: role.description })),
    { title: "Project Manager / team lead", organization: "Historyverse, CSM 399 group project, KNUST", dates: "Nov 2026 – present", text: "I ran the kickoff, broke the work into GitHub issues and gave each of the eight members tasks for their role. I set up protected branches, required reviews, code owners, CI and a contributing guide, review every pull request, and send weekly updates to our lecturer." },
  ],
  achievements: profile.achievements.items.map(item => ({ title: item.title, detail: item.detail })),
  education: profile.about.education,
  coursework: profile.about.coursework,
  courseworkLabel: profile.about.courseworkLabel,
  languages: profile.about.languages,
  security: {
    title: "Cybersecurity learning",
    text: "Security is where I want to grow. In my projects I keep roles and money decisions on the server, store evidence files privately and limit login attempts. Outside them, I’m learning nmap, Wireshark and system hardening.",
    certifications: profile.security.certifications,
  },
} as const;
