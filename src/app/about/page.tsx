import type { Metadata } from "next";
import { about } from "@/data/about";
import { site } from "@/data/site";
import { findMedia } from "@/lib/media";

export const metadata: Metadata = {
  title: about.seo.title,
  description: about.seo.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const photo = findMedia(about.photo.file);
  return <main id="main">
    <section className="wrap about-hero">
      <span className="eyebrow">{about.eyebrow}</span>
      <h1>{about.title}</h1>
      <div className="about-intro">
        <div>{about.intro.map(text => <p key={text}>{text}</p>)}</div>
        {photo && <img src={photo.src} alt={about.photo.alt} width={photo.width} height={photo.height} />}
      </div>
    </section>

    <div className="wrap section" style={{ paddingTop: 24 }}>
      <div className="about-cols">
        {about.sections.map(section => <div className="about-block" key={section.title}><h2>{section.title}</h2><p>{section.text}</p></div>)}

        <div className="about-block">
          <h2>Leadership</h2>
          {about.leadership.map(role => <div className="entry" key={role.title + role.organization}>
            <h3>{role.title}</h3><div className="meta">{role.organization} · {role.dates}</div><p>{role.text}</p>
          </div>)}
        </div>

        <div className="about-block">
          <h2>Education</h2>
          {about.education.map(item => <div className="entry" key={item.title}>
            <h3>{item.title}</h3><div className="meta">{item.institution} · {item.dates}</div>{item.note && <p>{item.note}</p>}
          </div>)}
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: "18px 0 6px" }}>{about.courseworkLabel}</h3>
          <ul className="plain-list">{about.coursework.map(course => <li key={course}>{course}</li>)}</ul>
        </div>

        <div className="about-block">
          <h2>{about.security.title}</h2>
          <p style={{ marginBottom: 12 }}>{about.security.text}</p>
          <ul className="plain-list">{about.security.certifications.map(cert => <li key={cert.name} className="cert"><span><strong>{cert.name}</strong><br /><span className="muted">{cert.provider}</span></span><span className="muted">{cert.status}</span></li>)}</ul>
        </div>

        <div className="about-block">
          <h2>Achievements</h2>
          {about.achievements.map(item => <div className="entry" key={item.title}><h3>{item.title}</h3><div className="meta">{item.detail}</div></div>)}
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: "18px 0 6px" }}>Languages</h3>
          <p>{about.languages.join(" · ")}</p>
        </div>
      </div>
      <div className="cs-links" style={{ marginTop: 40 }}>
        <a className="btn btn-primary" href="/#work">See my work</a>
        <a className="btn" href={site.cvPage}>{site.ui.cv}</a>
        <a className="btn" href={`mailto:${site.email}`}>{site.ui.emailMe}</a>
      </div>
    </div>
  </main>;
}
