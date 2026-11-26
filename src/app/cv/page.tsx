import type { Metadata } from "next";
import { CvDocument } from "@/components/cv-document";
import { CvPrintButton } from "@/components/cv-toolbar";
import { profile, resume } from "@/data/profile";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/source-sans-3";
import "./cv.css";

export const metadata: Metadata = {
  title: resume.documentTitle,
  description: profile.seo.description,
  ...(profile.siteUrl ? { alternates: { canonical: "/cv" } } : {}),
};

export default function CvPage() {
  return <main className="cv-view" id="main">
    <nav className="cv-toolbar" aria-label={resume.labels.page}>
      <a href="/">{resume.labels.back}</a>
      <div><CvPrintButton label={resume.labels.print} />{profile.cv && <a className="button button-primary" href={profile.cv.href} download>{resume.labels.download}</a>}</div>
    </nav>
    <CvDocument />
  </main>;
}
