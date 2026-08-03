import type { ReactNode } from "react";
import { pageMetadata } from "../../seo";
import { BreadcrumbJsonLd } from "../../JsonLd";

export const metadata = pageMetadata({
  title: "AI voice writing for creators - Lisup for scripts and content",
  description: "Draft outlines, scripts, newsletters, and content ideas faster with in-place AI voice rewriting for creators.",
  path: "/individuals/creators",
  keywords: [
    "voice writing for creators",
    "AI script writing",
    "creator dictation tool",
    "Notion voice writing",
  ],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Individuals", path: "/#individuals" },
          { name: "Creators", path: "/individuals/creators" },
        ]}
      />
      {children}
    </>
  );
}
