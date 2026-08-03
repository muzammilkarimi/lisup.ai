import type { ReactNode } from "react";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Contact Lisup - Support, partnerships, and product questions",
  description: "Contact the Lisup team for support, partnerships, product feedback, or questions about AI voice typing and in-place writing.",
  path: "/contact",
  keywords: [
    "contact Lisup",
    "Lisup support",
    "AI voice typing support",
    "Lisup partnerships",
  ],
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}