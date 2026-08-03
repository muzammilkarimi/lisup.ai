import type { ReactNode } from "react";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Lisup Blog - AI voice typing, dictation, and productivity guides",
  description: "Read practical guides about AI voice typing, in-place writing, Windows dictation, productivity workflows, and the future of voice-first work.",
  path: "/blog",
  keywords: [
    "AI voice typing blog",
    "dictation guides",
    "speech to text productivity",
    "voice writing tips",
  ],
});

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}