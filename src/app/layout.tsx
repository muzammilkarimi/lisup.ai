import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { pageMetadata } from "./seo";
import { SiteJsonLd } from "./JsonLd";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = pageMetadata({
  title: "Lisup - AI Voice Dictation Software for Windows | Speech to Text",
  description: "Lisup is AI voice dictation for Windows. Talk, stop, done: speech becomes finished text in 100+ languages, with fillers removed and grammar fixed, in any app.",
  path: "/",
  keywords: [
    "Lisup",
    "AI voice dictation",
    "dictation software",
    "best dictation software",
    "AI voice typing",
    "voice to text app",
    "speech to text for Windows",
    "AI dictation software",
    "in-place voice writing",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bricolageGrotesque.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <SiteJsonLd />
        <Analytics />
      </body>
      {googleAnalyticsId ? <GoogleAnalytics gaId={googleAnalyticsId} /> : null}
    </html>
  );
}

