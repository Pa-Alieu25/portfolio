"use client";

import { useEffect, useRef, useState } from "react";

type HeaderProps = {
  name: string;
  links: readonly { readonly label: string; readonly href: string }[];
  labels: { navigation: string; openMenu: string; closeMenu: string; home: string; menu: string };
};

export function SiteHeader({ name, links, labels }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    }
    function handleOutside(event: PointerEvent) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    document.addEventListener("pointerdown", handleOutside);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("pointerdown", handleOutside);
    };
  }, [open]);

  return (
    <header className="site-header" ref={header}>
      <div className="shell header-inner">
        <a className="wordmark" href="#top" aria-label={`${name} — ${labels.home}`}>
          <span className="wordmark-symbol" aria-hidden="true">p<span>.</span></span>
          <span>{name}</span>
        </a>
        <button
          className="menu-button"
          ref={button}
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? labels.closeMenu : labels.openMenu}
          onClick={() => setOpen(!open)}
        >
          {labels.menu}
          <span className={`menu-glyph ${open ? "is-open" : ""}`} aria-hidden="true"><i /><i /></span>
        </button>
        <nav id="main-navigation" className={`main-navigation ${open ? "is-open" : ""}`} aria-label={labels.navigation}>
          {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
        </nav>
      </div>
    </header>
  );
}
