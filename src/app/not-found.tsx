import { site } from "@/data/site";

export default function NotFound() {
  return <main id="main" className="wrap not-found">
    <span className="eyebrow">404</span>
    <h1>{site.ui.notFoundTitle}</h1>
    <p className="muted" style={{ marginBottom: 28 }}>{site.ui.notFoundText}</p>
    <a className="btn btn-primary" href="/">{site.ui.home}</a>
  </main>;
}
