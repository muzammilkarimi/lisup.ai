import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lisup.ai"),
  title: "Lisup - Stop typing. Start talking.",
  description: "Talk, stop, done. Lisup turns speech into finished text in 100+ languages - fillers gone, grammar fixed, in your tone. Everywhere on your machine.",
  openGraph: {
    title: "Lisup - Stop typing. Start talking.",
    description: "Talk, stop, done. Lisup turns speech into finished text in 100+ languages - fillers gone, grammar fixed, in your tone. Everywhere on your machine.",
    url: "https://lisup.ai",
    siteName: "Lisup",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Lisup - Stop typing. Start talking.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lisup - Stop typing. Start talking.",
    description: "Voice to finished text, everywhere you write.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

