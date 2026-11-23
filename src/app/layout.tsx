import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/source-sans-3";
import "./globals.css";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: profile.seo.title,
  description: profile.seo.description,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  metadataBase: new URL(profile.siteUrl ?? "http://127.0.0.1:3000"),
  ...(profile.siteUrl ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    title: profile.seo.title,
    description: profile.seo.description,
    siteName: profile.name,
    type: "website",
    locale: "en_GB",
    ...(profile.siteUrl ? { url: profile.siteUrl } : {}),
  },
  twitter: { card: "summary_large_image", title: profile.seo.title, description: profile.seo.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#0b1117", colorScheme: "dark", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
