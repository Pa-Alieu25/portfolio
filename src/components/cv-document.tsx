import { profile, resume } from "@/data/profile";

type Project = typeof resume.featured[number] | typeof resume.inProgress[number];

function CvProject({ project }: { project: Project }) {
  return <article className="cv-entry"><h3>{project.name}<span className="cv-inline-role">{project.role}</span></h3>{project.stack && <p className="cv-stack">{project.stack}</p>}<p>{project.summary}</p></article>;
}

/** The website never supplies applicationContact. Private offline export may add it. */
export function CvDocument({ applicationContact }: { applicationContact?: string }) {
  return <div className="cv-document">
    <article className="cv-paper" aria-label={`${profile.name} ${resume.labels.page}`}>
      <header className="cv-heading">
        <h1>{profile.name}</h1><p className="cv-title">{resume.title}</p>
        <div className="cv-contact">
          <p><a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>{applicationContact && <span> · {applicationContact}</span>}</p>
          <p><a href={profile.contact.linkedin}>{resume.labels.linkedin}</a></p>
          <p><a href={profile.contact.github}>{resume.labels.github}</a>{profile.siteUrl && <><span className="cv-site-sep"> · </span><a className="cv-site-link" href={profile.siteUrl}>{profile.siteUrl.replace(/^https?:\/\//, "")}</a></>}</p>
        </div>
        <p className="cv-location">{resume.location}</p>
      </header>
      <section className="cv-section"><h2>{resume.labels.profile}</h2><div className="cv-profile">{resume.introduction.map(line => <p key={line}>{line}</p>)}</div></section>
      <section className="cv-section"><h2>{resume.labels.skills}</h2><dl className="cv-skills">{resume.skillGroups.map(group => <div key={group.label}><dt>{group.label}:</dt><dd>{group.text}</dd></div>)}</dl></section>
      <section className="cv-section"><h2>{resume.labels.experience}</h2><article className="cv-entry"><div className="cv-entry-heading"><h3>{resume.experience.role} - {resume.experience.company}</h3><p>{resume.experience.dates}</p></div><p className="cv-stack">{resume.experience.location} · {resume.experience.context}</p><ul className="cv-bullets">{resume.experience.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></article></section>
      <section className="cv-section"><h2>{resume.labels.projects}</h2>{resume.featured.map(project => <CvProject project={project} key={project.name} />)}</section>
    </article>
    <article className="cv-paper cv-paper-continuation" aria-label={`${profile.name} ${resume.labels.projectsContinued}`}>
      <div className="cv-continuation"><span>{profile.name}</span><span>{resume.title}</span></div>
      <section className="cv-section"><h2>{resume.labels.projectsContinued}</h2>{resume.inProgress.map(project => <CvProject project={project} key={project.name} />)}</section>
      <section className="cv-section"><h2>{resume.labels.leadership}</h2>{resume.leadership.map(role => <article className="cv-entry" key={role.title}><div className="cv-entry-heading"><h3>{role.title}</h3><p>{role.dates}</p></div><p>{role.summary}</p></article>)}</section>
      <section className="cv-section"><h2>{resume.labels.education}</h2>{resume.education.map((education, index) => <article className="cv-entry" key={education.title}><div className="cv-entry-heading"><h3>{education.title}</h3><p>{education.dates}</p></div><p>{education.institution}{education.note && ` · ${education.note}`}</p>{index === 0 && <p className="cv-coursework"><strong>{resume.labels.coursework}: </strong>{resume.coursework.join("; ")}.</p>}</article>)}</section>
      <section className="cv-section"><h2>{resume.labels.achievements}</h2><ul className="cv-bullets">{resume.achievements.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section className="cv-section"><h2>{resume.labels.certifications}</h2><ul className="cv-certifications">{resume.certifications.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section className="cv-section"><h2>{resume.labels.languages}</h2><p>{resume.languages.join(" · ")}</p></section>
    </article>
  </div>;
}
