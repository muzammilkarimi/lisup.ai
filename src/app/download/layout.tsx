import type { ReactNode } from "react";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Download Lisup for Windows - AI voice typing app",
  description: "Download Lisup for Windows and start turning messy speech into polished text directly inside your desktop apps.",
  path: "/download",
  keywords: [
    "download Lisup",
    "Lisup Windows download",
    "AI voice typing download",
    "Windows dictation app",
  ],
});

export default function DownloadLayout({ children }: { children: ReactNode }) {
  return children;
}