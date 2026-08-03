import type { ReactNode } from "react";
import { pageMetadata } from "../../seo";
import { BreadcrumbJsonLd } from "../../JsonLd";

export const metadata = pageMetadata({
  title: "AI voice writing for leaders - Lisup for updates and briefs",
  description: "Turn rough spoken thoughts into polished team updates, executive summaries, and Slack messages without leaving your current app.",
  path: "/individuals/leaders",
  keywords: [
    "voice writing for leaders",
    "AI executive summaries",
    "Slack dictation",
    "leadership writing assistant",
  ],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Individuals", path: "/#individuals" },
          { name: "Leaders", path: "/individuals/leaders" },
        ]}
      />
      {children}
    </>
  );
}
