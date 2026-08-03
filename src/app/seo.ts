import type { Metadata } from "next";

export const SITE_URL = "https://www.lisupai.online";
export const SITE_NAME = "Lisup";

const defaultImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Lisup - Stop typing. Start talking.",
};

type SeoMetadata = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function pageMetadata({ title, description, path, keywords = [] }: SeoMetadata): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [defaultImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}