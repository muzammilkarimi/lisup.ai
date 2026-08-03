import type { ReactNode } from "react";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Lisup Pricing - AI voice typing plans",
  description: "Compare Lisup pricing plans for AI voice typing, in-place rewriting, and speech-to-finished-text workflows on Windows.",
  path: "/pricing",
  keywords: [
    "Lisup pricing",
    "AI dictation pricing",
    "voice typing app pricing",
    "speech to text plans",
  ],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}