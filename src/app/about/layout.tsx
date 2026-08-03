import type { ReactNode } from "react";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "About Lisup - Voice-first AI writing for fast thinkers",
  description: "Learn why Lisup is building in-place AI voice writing for people who think faster than they type, from students and creators to developers and leaders.",
  path: "/about",
  keywords: [
    "about Lisup",
    "AI voice writing",
    "voice-first writing app",
    "in-place dictation",
  ],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}