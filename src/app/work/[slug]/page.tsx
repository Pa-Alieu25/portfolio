import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, caseStudyOrder, type Section } from "@/data/case-studies";
import { diagrams } from "@/data/diagrams";
import { site, type ProjectSlug } from "@/data/site";
import { Figure } from "@/components/diagram";
import { Status } from "@/components/status";
import { findMedia } from "@/lib/media";

export const dynamicParams = false;
export function generateStaticParams() { return caseStudyOrder.map(slug => ({ slug })); }

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = caseStudies[(await params).slug as ProjectSlug];
  if (!study) return {};
  const title = `${study.name} · ${site.name}`;
  return { title, description: study.seoDescription, alternates: { canonical: `/work/${study.slug}` }, openGraph: { title, description: study.seoDescription } };
}

/** Screens that exist on disk; a section whose screens are all missing is hidden. */
function availableScreens(section: Section) {
  return (section.screens ?? []).flatMap(screen => {
    const media = findMedia(screen.file, screen.video);
    return media ? [{ ...screen, media }] : [];
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const study = caseStudies[(await params).slug as ProjectSlug];
  if (!study) notFound();
  const sections = study.sections.filter(section => !section.screens || availableScreens(section).length > 0);
  const next = caseStudies[study.next];
  let figureNumber = 0;

  const toc = <ul className="toc-list">{sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.nav}</a></li>)}</ul>;

  const body = (section: Section) => {
    const screens = availableScreens(section);
    return <>

      <h2>{section.title}</h2>
      <div className="text">
        {section.paragraphs?.map(text => <p key={text}>{text}</p>)}
        {section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
      </div>
      {section.credits && <div className="credits">{section.credits.map(group => <div key={group.who}>
        <h3>{group.who}</h3><ul>{group.did.map(item => <li key={item}>{item}</li>)}</ul>
      </div>)}</div>}
      {section.decisions && <dl className="decisions">{section.decisions.map(item => <div key={item.name}><dt>{item.name}</dt><dd>{item.why}</dd></div>)}</dl>}
      {section.figures?.map(id => <Figure key={id} diagram={diagrams[id]} number={++figureNumber} />)}
      {screens.length > 0 && <ul className="screens">{screens.map(screen => <li key={screen.file} className={screen.frame}>
        {screen.media.video
          ? <video src={screen.media.src} controls preload="none" playsInline aria-label={screen.alt} />
          : <img src={screen.media.src} alt={screen.alt} width={screen.media.width} height={screen.media.height} loading="lazy" decoding="async" />}
        <span>{screen.caption}</span>
      </li>)}</ul>}
      {section.status && <div className="state">
        <div><Status kind="completed" text="Implemented" /><ul>{section.status.works.map(item => <li key={item}>{item}</li>)}</ul></div>
        {section.status.building && <div><Status kind="development" text="In development" /><ul>{section.status.building.map(item => <li key={item}>{item}</li>)}</ul></div>}
        {section.status.notBuilt && <div><Status kind="designed" text="Planned" /><ul>{section.status.notBuilt.map(item => <li key={item}>{item}</li>)}</ul></div>}
      </div>}
    </>;
  };

  return <main id="main" className="cs-page">
    <section className="wrap cs-hero">
      <div className="crumb"><a href="/#work">{site.ui.backToWork}</a> · {study.kind}</div>
      <h1>{study.name}</h1>
      <p className="lede">{study.lede}</p>
      <dl className="cs-facts">
        {study.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
        <div><dt>Status</dt><dd><Status kind={study.status} text={study.statusText} /></dd></div>
      </dl>
      <details className="toc-phone"><summary>{site.ui.onThisPage}</summary>{toc}</details>
    </section>

    <div className="wrap cs-layout">
      <nav className="toc-desk" aria-label={site.ui.onThisPage}><h2>{site.ui.onThisPage}</h2>{toc}</nav>
      <div className="cs-main">
        {sections.map(section => <section key={section.id} id={section.id} className={section.band ? "cs-section cs-band" : "cs-section"} aria-label={section.nav}>{body(section)}</section>)}
      </div>
    </div>

    <div className="wrap">
      {study.note && <p className="cs-note">{study.note}</p>}
      {study.links.length > 0 && <div className="cs-links">{study.links.map(link => <a key={link.href} className="btn" href={link.href} rel="noreferrer" target="_blank">{link.label} ↗</a>)}</div>}
      <a className="next-link" href={`/work/${next.slug}`}><span>{site.ui.next}: {next.name}</span><span aria-hidden="true">→</span></a>
    </div>
  </main>;
}
