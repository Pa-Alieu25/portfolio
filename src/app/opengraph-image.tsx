import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — software engineer building mobile apps and the systems behind them`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "68px 76px", background: "#0f1b2d", color: "#ffffff", fontFamily: "serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}><span>{site.name}</span><span style={{ color: "#fb9a6a", fontSize: 20, fontFamily: "sans-serif", letterSpacing: 2 }}>SOFTWARE ENGINEER</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 62, lineHeight: 1.1, maxWidth: 1040 }}>
        <span>{site.hero.lead}</span>
        <span style={{ color: "#fb9a6a" }}>{site.hero.accent}</span>
      </div>
      <div style={{ display: "flex", borderTop: "1px solid #2c3d57", paddingTop: 24, color: "#b4c0d0", fontSize: 22, justifyContent: "space-between", fontFamily: "sans-serif" }}><span>FleetOps · ClassMate · ReportIt · TaksiGambia</span><span>{site.ui.motto}</span></div>
    </div>,
    size,
  );
}
