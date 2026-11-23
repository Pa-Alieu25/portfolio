import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "68px 76px", background: "#0b1117", color: "#f3f6fa", fontFamily: "sans-serif", border: "1px solid #2d3b49" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 25 }}><span>{profile.name}</span><span style={{ color: "#7dd9c0", fontSize: 20 }}>{profile.seo.ogEyebrow}</span></div>
      <div style={{ display: "flex", fontSize: 68, letterSpacing: "-3px", lineHeight: 1.12, maxWidth: 1000 }}>{profile.headline}</div>
      <div style={{ display: "flex", borderTop: "1px solid #2d3b49", paddingTop: 24, color: "#b3bfcd", fontSize: 23, justifyContent: "space-between" }}><span>{profile.hero.location}</span><span>{profile.hero.motto}</span></div>
    </div>,
    size,
  );
}
