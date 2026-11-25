import type { Metadata, Viewport } from "next";
import "@fontsource-variable/newsreader";
import "@fontsource-variable/inter";
import "./globals.css";
import { site } from "@/data/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  metadataBase: new URL(site.url ?? "http://127.0.0.1:3000"),
  ...(site.url ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    siteName: site.name,
    type: "website",
    locale: "en_GB",
    ...(site.url ? { url: site.url } : {}),
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-GB"><body>
    <SiteHeader />
    {children}
    <SiteFooter />
  </body></html>;
}
