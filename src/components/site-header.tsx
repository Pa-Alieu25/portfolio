"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { ui } = site;

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = (href: string) => (href === pathname ? "page" : undefined);

  return <header className="site-header">
    <a className="skip" href="#main">{ui.skip}</a>
    <div className="wrap">
      <a className="brand" href="/">{site.name}</a>
      <nav className="desk-nav" aria-label="Main">
        {site.nav.map(link => <a key={link.href} href={link.href} aria-current={current(link.href)}>{link.label}</a>)}
        <span className="sep" aria-hidden="true" />
        <a href={site.linkedin} rel="noreferrer" target="_blank">{ui.linkedin}</a>
        <a href={site.github} rel="noreferrer" target="_blank">{ui.github}</a>
        <a className="cta" href={`mailto:${site.email}`}>{ui.email}</a>
      </nav>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="menu-panel" onClick={() => setOpen(value => !value)}>
        {open ? ui.close : ui.menu}
      </button>
    </div>
    <div className="menu-panel" id="menu-panel" data-open={open}>
      <nav aria-label="Menu">
        <ul>
          <li><a href="/" onClick={() => setOpen(false)}>Home</a></li>
          {site.nav.map(link => <li key={link.href}><a href={link.href} aria-current={current(link.href)} onClick={() => setOpen(false)}>{link.label}</a></li>)}
        </ul>
        <ul className="secondary">
          <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
          <li><a href={site.linkedin} rel="noreferrer" target="_blank">{ui.linkedin}</a></li>
          <li><a href={site.github} rel="noreferrer" target="_blank">{ui.github}</a></li>
          {site.cvPdf && <li><a href={site.cvPdf} download>{ui.downloadCv}</a></li>}
        </ul>
      </nav>
    </div>
  </header>;
}
