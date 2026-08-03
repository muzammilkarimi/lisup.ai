import type { ReactNode } from "react";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Lisup Privacy Policy - Voice data and app privacy",
  description: "Read the Lisup privacy policy to understand how voice data, analytics, contact forms, and app telemetry are handled.",
  path: "/privacy",
  keywords: [
    "Lisup privacy",
    "voice data privacy",
    "AI dictation privacy",
    "speech to text privacy",
  ],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}