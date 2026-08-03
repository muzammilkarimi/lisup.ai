import type { ReactNode } from "react";
import { pageMetadata } from "../../seo";
import { BreadcrumbJsonLd } from "../../JsonLd";

export const metadata = pageMetadata({
  title: "AI voice dictation for lawyers - Lisup for legal drafting",
  description: "Dictate legal clauses, client updates, and research summaries, then rewrite them into polished text directly inside your documents.",
  path: "/individuals/lawyers",
  keywords: [
    "voice dictation for lawyers",
    "legal dictation software",
    "AI legal writing",
    "speech to text for lawyers",
  ],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Individuals", path: "/#individuals" },
          { name: "Lawyers", path: "/individuals/lawyers" },
        ]}
      />
      {children}
    </>
  );
}
