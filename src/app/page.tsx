import Image from "next/image";
import { site, type Evidence } from "@/data/site";
import { profile } from "@/data/profile";
import { about } from "@/data/about";
import { Status } from "@/components/status";

function EvidenceList({ items }: { items: readonly Evidence[] }) {
  if (!items.length) return null;
  return <span className="proof">{items.map(item => item.label).join(" · ")}</span>;
}

export default function Home() {
  const { hero, experience, work, skills, contact } = site;
  return <main id="main">
    <section className="wrap hero" aria-labelledby="hero-title">
      <div className="hero-lead">
        <div className="hero-copy">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1 id="hero-title">{hero.lead} <em>{hero.accent}</em></h1>
          <p className="intro">{hero.intro}</p>
          <div className="actions"><a className="btn btn-primary" href={hero.primary.href}>{hero.primary.label}</a></div>
        </div>
        <Image className="portrait hero-portrait" src={profile.portrait.src} alt={profile.portrait.alt} width={profile.portrait.width} height={profile.portrait.height} sizes="(max-width: 720px) 160px, (max-width: 1024px) 240px, 320px" unoptimized priority />
      </div>
    </section>

    <section className="band" id="work" aria-labelledby="experience-title" style={{ scrollMarginTop: "var(--header)" }}>
      <div className="wrap band-grid">
        <div>
          <span className="eyebrow">{experience.eyebrow}</span>
          <h2 id="experience-title">{experience.title}</h2>
          <p className="role">{experience.role}</p>
          <p>{experience.text}</p>
        </div>
        <ul className="facts-grid">{experience.facts.map(fact => <li key={fact.title}><strong>{fact.title}</strong><span>{fact.text}</span></li>)}</ul>
      </div>
    </section>

    <section className="wrap section" aria-labelledby="work-title">
      <h2 className="section-title" id="work-title">{work.title}</h2>
      <ul className="rows">
        {work.projects.map(project => <li className="row" key={project.slug}>
          <div><h3><a href={`/work/${project.slug}`}>{project.name}</a></h3><div className="meta">{project.meta}</div></div>
          <p>{project.text}</p>
          <div className="side"><Status kind={project.status} /></div>
        </li>)}
      </ul>
    </section>

    <section className="wrap section" aria-labelledby="other-work-title" style={{ paddingTop: 0 }}>
      <h2 className="section-title" id="other-work-title">Other projects</h2>
      <ul className="others">
        {work.others.map(project => <li key={project.id} id={project.id}>
          <h3>{"slug" in project ? <a href={`/work/${project.slug}`}>{project.name}</a> : project.name}</h3>
          <div className="meta">{project.meta}</div>
          <Status kind={project.status} text={"statusText" in project ? project.statusText : undefined} />
          <p>{project.text}</p>
        </li>)}
      </ul>
    </section>

    <section className="wrap section" aria-labelledby="skills-title" style={{ paddingTop: 0 }}>
      <h2 className="section-title" id="skills-title">{skills.title}</h2>
      <div className="skills">
        {skills.groups.map(group => <div className="skill-group" key={group.name}>
          <h3>{group.name}</h3>
          <ul>{group.items.map(item => <li key={item.name}><strong>{item.name}</strong><EvidenceList items={item.proof} /></li>)}</ul>
        </div>)}
      </div>
      <aside className="learning" aria-labelledby="learning-title">
        <h3 id="learning-title">{skills.learning.title}</h3>
        <p>{skills.learning.items.join(" · ")}</p>
        <p className="muted">{skills.learning.note}</p>
      </aside>
    </section>

    <section className="wrap section" aria-labelledby="leadership-title" style={{ paddingTop: 0 }}>
      <h2 className="section-title" id="leadership-title">Leadership</h2>
      <div className="profile-grid">
        {about.leadership.map(role => <article className="profile-entry" id={role.organization.startsWith("Historyverse") ? "historyverse" : undefined} key={role.title + role.organization}>
          <h3>{role.title}</h3><p className="meta">{role.organization} · {role.dates}</p><p>{role.text}</p>
        </article>)}
      </div>
    </section>

    <section className="wrap section" aria-labelledby="education-title" style={{ paddingTop: 0 }}>
      <h2 className="section-title" id="education-title">Education</h2>
      <div className="profile-grid">
        {profile.about.education.map(item => <article className="profile-entry" key={item.title}>
          <h3>{item.title}</h3><p>{item.institution}</p><p className="meta">{item.dates}{item.note && ` · ${item.note}`}</p>
        </article>)}
      </div>
    </section>

    <section className="wrap section" aria-labelledby="contact-title" style={{ paddingTop: 0 }}>
      <div className="contact-block">
        <div><h2 id="contact-title">{contact.title}</h2><p className="muted">{contact.text}</p></div><p>{site.email}</p>
      </div>
    </section>
  </main>;
}
