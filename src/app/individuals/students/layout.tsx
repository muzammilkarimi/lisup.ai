import type { ReactNode } from "react";
import { pageMetadata } from "../../seo";
import { BreadcrumbJsonLd } from "../../JsonLd";

export const metadata = pageMetadata({
  title: "AI voice typing for students - Lisup for notes and study",
  description: "Turn messy lecture dictation into clean notes, flashcards, and academic writing directly inside Google Docs and study tools.",
  path: "/individuals/students",
  keywords: [
    "voice typing for students",
    "AI lecture notes",
    "speech to text for students",
    "Google Docs dictation",
  ],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Individuals", path: "/#individuals" },
          { name: "Students", path: "/individuals/students" },
        ]}
      />
      {children}
    </>
  );
}
