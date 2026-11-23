import type { ReactNode } from "react";
import { profile } from "@/data/profile";
import { SiteHeader } from "./site-header";

function Signature() {
  return <span className="signature" aria-hidden="true"><i /><i /><i /></span>;
}

function Tags({ items }: { items: readonly string[] }) {
  return <ul className="tags" aria-label={profile.ui.stack}>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function Section({ id, heading, children, className = "" }: {
  id: string;
  heading: { readonly label: string; readonly title: string; readonly description?: string };
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={`${id}-heading`}>
      <div className="section-label">{heading.label}</div>
      <div className="section-content">
        <div className="section-intro">
          <h2 id={`${id}-heading`}>{heading.title}</h2>
          {heading.description && <p>{heading.description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function FeaturedProject({ project }: { project: typeof profile.featured[number] }) {
  return (
    <article className="project-story" aria-labelledby={`${project.id}-heading`}>
      <div className="project-meta"><span>{project.category}</span><span className="status-label">{project.status}</span></div>
      <h3 id={`${project.id}-heading`}>{project.name}</h3>
      <p className="project-deck">{project.summary}</p>
      <div className="project-narrative">
        <div><h4>{profile.ui.problem}</h4><p>{project.problem}</p></div>
        <div><h4>{profile.ui.solution}</h4><p>{project.solution}</p></div>
      </div>
      <div className="project-credit"><span className="small-label">{profile.ui.role}</span><p>{project.role}</p><span>{project.credit}</span></div>
      <Tags items={project.stack} />
      <details className="contribution-details">
        <summary>{profile.ui.learnMore}<span aria-hidden="true" className="disclosure-mark" /></summary>
        <ul className="bullet-list">{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
      </details>
      {project.links.length > 0 && <div className="project-links">{project.links.map((link) => <a className="text-link" href={link.href} key={link.href} rel="noreferrer" target="_blank">{link.label}</a>)}</div>}
    </article>
  );
}

export function Portfolio() {
  const { ui, sections } = profile;
  const accentIndex = profile.headline.indexOf(profile.hero.headlineAccent);
  return (
    <>
      <a className="skip-link" href="#main-content">{ui.skip}</a>
      <SiteHeader name={profile.name} links={profile.navigation} labels={ui} />
      <main id="main-content" className="shell" tabIndex={-1}>
        <section id="top" className="hero" aria-labelledby="hero-heading">
          <div className="hero-topline"><span className="availability"><span aria-hidden="true" />{profile.hero.availability}</span><span className="hero-location">{profile.hero.location}</span></div>
          <div className="hero-identity"><Signature /><p>{profile.name}</p></div>
          <h1 id="hero-heading">{accentIndex < 0 ? profile.headline : <>{profile.headline.slice(0, accentIndex)}<span className="accent">{profile.hero.headlineAccent}</span>{profile.headline.slice(accentIndex + profile.hero.headlineAccent.length)}</>}</h1>
          <p className="hero-introduction">{profile.hero.introduction}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">{ui.viewProjects}</a>
            {profile.cv && <a className="button button-secondary" href={profile.cv.href} download>{profile.cv.label}</a>}
            <a className="button button-secondary" href="#contact">{ui.contact}</a>
          </div>
          <div className="hero-bottom"><div className="build-note"><span className="build-bracket" aria-hidden="true">[</span><span className="build-label">{profile.hero.noteLabel}</span><span>{profile.hero.motto}</span><span className="build-bracket" aria-hidden="true">]</span></div><span className="hero-footnote">{profile.hero.footnote}</span></div>
        </section>

        <Section id="experience" heading={sections.experience}>
          <article className="experience-card" aria-labelledby="internship-heading">
            <div className="experience-header"><div><p className="small-label">{profile.experience.company}</p><h3 id="internship-heading">{profile.experience.role}</h3></div><div className="experience-dates"><span>{profile.experience.dates}</span><span>{profile.experience.location}</span></div></div>
            <p className="company-context">{profile.experience.context}</p>
            <div className="experience-work"><h4>{profile.experience.project}</h4><p>{profile.experience.summary}</p><ul className="bullet-list">{profile.experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>
            <Tags items={profile.experience.stack} />
            <p className="ownership-note">{profile.experience.note}</p>
          </article>
        </Section>

        <Section id="projects" heading={sections.featured}>
          <div className="featured-stories">{profile.featured.map((project) => <FeaturedProject project={project} key={project.id} />)}</div>
        </Section>

        <Section id="team" heading={sections.team}>
          <article className="team-project" aria-labelledby="historyverse-heading">
            <div className="project-meta"><span>{profile.team.category}</span><span className="status-label">{profile.team.status}</span></div>
            <h3 id="historyverse-heading">{profile.team.name}</h3><p className="project-deck">{profile.team.summary}</p>
            <div className="team-role"><span>{profile.team.role}</span><span>{profile.team.dates}</span></div>
            <p>{profile.team.contribution}</p><p className="secondary-copy">{profile.team.stage}</p><Tags items={profile.team.stack} />
          </article>
        </Section>

        <Section id="in-progress" heading={sections.progress}>
          <div className="progress-grid">{profile.inProgress.map((project) => <article className="progress-card" key={project.name}><div className="project-meta"><span>{project.category}</span></div><span className="status-label">{project.status}</span><h3>{project.name}</h3><p className="progress-summary">{project.summary}</p><p>{project.detail}</p><p className="scope-note">{project.boundary}</p>{project.stack.length > 0 && <Tags items={project.stack} />}</article>)}</div>
        </Section>

        <Section id="skills" heading={sections.skills}>
          <div className="skills-grid">{profile.skills.map((group) => <div className="skill-group" key={group.name}><h3>{group.name}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div>
        </Section>

        <Section id="leadership" heading={sections.leadership}>
          <div className="leadership-list">{profile.leadership.map((role) => <article key={role.title}><div className="leadership-heading"><h3>{role.title}</h3><span>{role.dates}</span></div><p className="organization">{role.organization}</p><p>{role.description}</p></article>)}</div>
          <div className="achievements"><h3>{profile.achievements.title}</h3><ul>{profile.achievements.items.map((achievement) => <li key={achievement.title}><span className="achievement-mark" aria-hidden="true">+</span><div><h4>{achievement.title}</h4><p>{achievement.detail}</p>{achievement.description && <p className="secondary-copy">{achievement.description}</p>}</div></li>)}</ul></div>
        </Section>

        <Section id="cybersecurity" heading={sections.security}>
          <p className="security-introduction">{profile.security.text}</p>
          <ul className="certifications">{profile.security.certifications.map((certification) => <li key={certification.name}><div><span className="small-label">{certification.provider}</span><h3>{certification.name}</h3></div><span className="certification-status">{certification.status}</span></li>)}</ul>
        </Section>

        <Section id="about" heading={sections.about}>
          <div className="about-copy">{profile.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <div className="languages"><h3>{profile.about.languagesLabel}</h3><p>{profile.about.languages.join(" · ")}</p></div>
          <details className="education-details"><summary>{profile.about.educationLabel}<span aria-hidden="true" className="disclosure-mark" /></summary><div className="education-content">{profile.about.education.map((education) => <article key={education.title}><h3>{education.title}</h3><p>{education.institution}</p><p className="secondary-copy">{education.dates}{education.note && ` · ${education.note}`}</p></article>)}<h4>{profile.about.courseworkLabel}</h4><ul>{profile.about.coursework.map((course) => <li key={course}>{course}</li>)}</ul></div></details>
        </Section>

        <Section id="contact" heading={sections.contact} className="contact-section">
          <a className="contact-email" href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
          <div className="contact-links"><a href={profile.contact.linkedin} target="_blank" rel="noreferrer">{ui.linkedin}</a><a href={profile.contact.github} target="_blank" rel="noreferrer">{ui.github}</a></div>
        </Section>
      </main>
      <footer className="shell site-footer"><div><Signature /><span>{profile.name}</span><span className="footer-note">{ui.footerNote}</span></div><a href="#top">{ui.backToTop}</a></footer>
    </>
  );
}
