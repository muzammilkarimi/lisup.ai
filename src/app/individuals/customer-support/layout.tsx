import type { ReactNode } from "react";
import { pageMetadata } from "../../seo";
import { BreadcrumbJsonLd } from "../../JsonLd";

export const metadata = pageMetadata({
  title: "AI voice typing for customer support - Lisup for faster replies",
  description: "Create polite, accurate support replies and ticket notes faster with AI voice writing inside Zendesk and support tools.",
  path: "/individuals/customer-support",
  keywords: [
    "voice typing for customer support",
    "AI support replies",
    "Zendesk dictation",
    "customer support writing assistant",
  ],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Individuals", path: "/#individuals" },
          { name: "Customer Support", path: "/individuals/customer-support" },
        ]}
      />
      {children}
    </>
  );
}
