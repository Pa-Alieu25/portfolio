import { site } from "@/data/site";

export function SiteFooter() {
  const { ui } = site;
  return <>
    <footer className="site-footer">
      <div className="wrap">
        <div className="top">
          <a className="mail" href={`mailto:${site.email}`}>{site.email}</a>
          <nav aria-label="Contact and profiles">
            <a href={site.linkedin} rel="noreferrer" target="_blank">{ui.linkedin}</a>
            <a href={site.github} rel="noreferrer" target="_blank">{ui.github}</a>
            <a href={site.cvPage}>{ui.cv}</a>
            {site.cvPdf && <a href={site.cvPdf} download>{ui.downloadCv}</a>}
          </nav>
        </div>
        <div className="bottom"><span>{site.name} · {ui.footerNote}</span><span>{ui.motto}</span></div>
      </div>
    </footer>
    <nav className="action-bar" aria-label="Quick links">
      <a href="/#work">Work</a>
      <a href={site.cvPage}>{ui.cv}</a>
      <a className="cta" href={`mailto:${site.email}`}>{ui.emailMe}</a>
    </nav>
  </>;
}
