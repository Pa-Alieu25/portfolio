import { site, type Evidence } from "@/data/site";
import { Status } from "@/components/status";
import Image from "next/image";
import { profile } from "@/data/profile";

function Proof({ items, prefix }: { items: readonly Evidence[]; prefix?: string }) {
  return <span className="proof">
    {prefix && <span>{prefix}</span>}
    {items.map((item, index) => <span key={item.href} style={{ color: "inherit" }}>
      <a className="text-link" href={item.href}>{item.label}</a>{index < items.length - 1 ? <span aria-hidden="true"> · </span> : null}
    </span>)}
  </span>;
}

export default function Home() {
  const { hero, problems, experience, work, skills, aboutTeaser, contact, ui } = site;
  return <main id="main">
    <section className="wrap hero" aria-labelledby="hero-title">
      <div className="hero-lead">
        <div className="hero-copy">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1 id="hero-title">{hero.lead} <em>{hero.accent}</em></h1>
          <p className="intro">{hero.intro}</p>
          <div className="actions">
            <a className="btn btn-primary" href={hero.primary.href}>{hero.primary.label}</a>
            {site.cvPdf && <a className="btn" href={site.cvPdf} download>{ui.downloadCv}</a>}
            <a className="btn" href={`mailto:${site.email}`}>{ui.emailMe}</a>
          </div>
        </div>
      <Image className="portrait hero-portrait" src={profile.portrait.src} alt={profile.portrait.alt} width={profile.portrait.width} height={profile.portrait.height} sizes="(max-width: 720px) 160px, (max-width: 1024px) 240px, 320px" unoptimized priority />
      </div>
      <div className="problems">
        <h2 className="eyebrow">{problems.label}</h2>
        <ul>
          {problems.items.map(item => <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Proof items={item.proof} prefix="Proof:" />
          </li>)}
        </ul>
      </div>
    </section>

    <section className="band" aria-labelledby="experience-title">
      <div className="wrap band-grid">
        <div>
          <span className="eyebrow">{experience.eyebrow}</span>
          <h2 id="experience-title">{experience.title}</h2>
          <p className="role">{experience.role}</p>
          <p>{experience.text}</p>
          <a className="btn btn-light" href="/work/fleetops">{ui.readCase} →</a>
        </div>
        <ul className="facts-grid">
          {experience.facts.map(fact => <li key={fact.title}><strong>{fact.title}</strong><span>{fact.text}</span></li>)}
        </ul>
      </div>
    </section>

    <section className="wrap section" id="work" aria-labelledby="work-title" style={{ scrollMarginTop: "var(--header)" }}>
      <span className="eyebrow">{work.eyebrow}</span>
      <h2 className="section-title" id="work-title">{work.title}</h2>
      <ul className="rows">
        {work.projects.map(project => <li className="row" key={project.slug}>
          <div><h3><a href={`/work/${project.slug}`}>{project.name}</a></h3><div className="meta">{project.meta}</div></div>
          <div>
            <p>{project.text}</p>
            <a className="text-link mobile-link" href={`/work/${project.slug}`}>{ui.readCase} →</a>
          </div>
          <div className="side"><Status kind={project.status} /><a className="text-link" href={`/work/${project.slug}`}>{ui.readCase} →</a></div>
        </li>)}
      </ul>
      <ul className="others">
        {work.others.map(project => <li key={project.id} id={project.id}>
          <h3>{project.name}</h3>
          <div className="meta">{project.meta}</div>
          <Status kind={project.status} text={"statusText" in project ? project.statusText : undefined} />
          <p>{project.text}</p>
        </li>)}
      </ul>
    </section>

    <section className="wrap section" aria-labelledby="skills-title" style={{ paddingTop: 0 }}>
      <span className="eyebrow">{skills.eyebrow}</span>
      <h2 className="section-title" id="skills-title">{skills.title}</h2>
      <div className="skills">
        {skills.groups.map(group => <div className="skill-group" key={group.name}>
          <h3>{group.name}</h3>
          <ul>{group.items.map(item => <li key={item.name}><strong>{item.name}</strong><Proof items={item.proof} /></li>)}</ul>
        </div>)}
      </div>
    </section>

    <section className="wrap section" aria-labelledby="about-title" style={{ paddingTop: 0 }}>
      <div className="about-teaser">
        <div><span className="eyebrow">{aboutTeaser.eyebrow}</span><h2 id="about-title">{aboutTeaser.title}</h2></div>
        <div><p>{aboutTeaser.text}</p><a className="text-link" href={aboutTeaser.link.href}>{aboutTeaser.link.label} →</a></div>
      </div>
    </section>

    <section className="wrap section" aria-labelledby="contact-title" style={{ paddingTop: 0 }}>
      <div className="contact-block">
        <div><span className="eyebrow">{contact.eyebrow}</span><h2 id="contact-title">{contact.title}</h2><p className="muted">{contact.text}</p></div>
        <div className="contact-links">
          <a className="btn btn-primary" href={`mailto:${site.email}`}>{site.email}<span aria-hidden="true">→</span></a>
          <a className="btn" href={site.linkedin} rel="noreferrer" target="_blank">{ui.linkedin}<span aria-hidden="true">↗</span></a>
          <a className="btn" href={site.github} rel="noreferrer" target="_blank">{ui.github}<span aria-hidden="true">↗</span></a>
          <a className="btn" href={site.cvPage}>{ui.cv}<span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  </main>;
}
