import { profile } from "@/data/profile";

export default function NotFound() {
  return <main className="not-found shell"><p className="small-label">{profile.name}</p><h1>{profile.ui.notFoundTitle}</h1><p>{profile.ui.notFoundDescription}</p><a className="button button-primary" href="/">{profile.ui.returnHome}</a></main>;
}
