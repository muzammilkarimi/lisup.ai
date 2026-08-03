import type { ReactNode } from "react";
import { pageMetadata } from "../../seo";
import { BreadcrumbJsonLd } from "../../JsonLd";

export const metadata = pageMetadata({
  title: "AI voice typing for developers - Lisup for coding workflows",
  description: "Use Lisup to dictate code comments, docstrings, specs, and editor updates directly inside VS Code and other developer tools.",
  path: "/individuals/developers",
  keywords: [
    "voice typing for developers",
    "AI dictation for coding",
    "speech to text for programmers",
    "VS Code voice typing",
  ],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Individuals", path: "/#individuals" },
          { name: "Developers", path: "/individuals/developers" },
        ]}
      />
      {children}
    </>
  );
}
