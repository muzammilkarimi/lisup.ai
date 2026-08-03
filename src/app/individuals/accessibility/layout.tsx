import type { ReactNode } from "react";
import { pageMetadata } from "../../seo";
import { BreadcrumbJsonLd } from "../../JsonLd";

export const metadata = pageMetadata({
  title: "Accessible AI voice typing - Lisup for hands-free writing",
  description: "Use Lisup for hands-free writing, email drafting, standup updates, and in-place speech-to-text workflows across desktop apps.",
  path: "/individuals/accessibility",
  keywords: [
    "accessible voice typing",
    "hands-free writing",
    "AI accessibility writing",
    "speech to text accessibility",
  ],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Individuals", path: "/#individuals" },
          { name: "Accessibility", path: "/individuals/accessibility" },
        ]}
      />
      {children}
    </>
  );
}
