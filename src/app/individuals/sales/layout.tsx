import type { ReactNode } from "react";
import { pageMetadata } from "../../seo";
import { BreadcrumbJsonLd } from "../../JsonLd";

export const metadata = pageMetadata({
  title: "AI voice typing for sales teams - Lisup for CRM notes",
  description: "Update CRM notes, outreach drafts, quote summaries, and follow-ups faster with Lisup in-place voice writing.",
  path: "/individuals/sales",
  keywords: [
    "voice typing for sales",
    "AI CRM notes",
    "sales dictation software",
    "voice to text for sales",
  ],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Individuals", path: "/#individuals" },
          { name: "Sales", path: "/individuals/sales" },
        ]}
      />
      {children}
    </>
  );
}
