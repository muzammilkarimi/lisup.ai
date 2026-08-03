"use client";

import Link from "next/link";
import Navbar from "../Navbar";
import SiteFooter from "../SiteFooter";
import { WINDOWS_DOWNLOAD_LABEL, WINDOWS_DOWNLOAD_URL } from "../download";
import { JsonLd } from "../JsonLd";
import { SITE_URL } from "../seo";
import { trackEvent } from "../analytics-events";

export default function DownloadPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Lisup",
    operatingSystem: "Windows",
    applicationCategory: "ProductivityApplication",
    url: `${SITE_URL}/download`,
    downloadUrl: WINDOWS_DOWNLOAD_URL,
    description: "Download Lisup for Windows to turn speech into polished text inside desktop apps.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div style={{ background: "#FDF6F0", minHeight: "100vh", color: "#26231F", overflowX: "hidden" }}>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        <section className="download-page-hero">
          <div className="download-page-shell">
            <div className="font-jetbrains" style={{ fontSize: "12px", color: "#E07B39", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "18px" }}>
              Windows app
            </div>
            <h1 className="font-bricolage" style={{ fontSize: "clamp(44px, 8vw, 86px)", lineHeight: 0.92, letterSpacing: "-.045em", margin: "0 0 24px", fontWeight: 800 }}>
              Download Lisup for Windows.
            </h1>
            <p style={{ maxWidth: "700px", margin: "0 auto 34px", fontSize: "19px", lineHeight: 1.58, color: "#6B6560" }}>
              Speak naturally and turn messy thoughts into finished text directly inside email, docs, Slack, VS Code, CRMs, browsers, and desktop apps.
            </p>
            <a
              href={WINDOWS_DOWNLOAD_URL}
              className="download-page-button"
              data-cursor
              onClick={() => trackEvent("download_click", { location: "download_page" })}
            >
              {WINDOWS_DOWNLOAD_LABEL}
            </a>
          </div>
        </section>

        <section style={{ padding: "0 0 92px" }}>
          <div className="download-page-grid">
            <div>
              <h2 className="font-bricolage">What you get</h2>
              <p>Global Ctrl + Win voice capture, AI cleanup, tone rewriting, and in-place text insertion for Windows workflows.</p>
            </div>
            <div>
              <h2 className="font-bricolage">Before installing</h2>
              <p>Use a trusted microphone, keep your app focused, and review generated text before sending important messages.</p>
            </div>
            <div>
              <h2 className="font-bricolage">Need details?</h2>
              <p>
                Compare plans on <Link href="/pricing">pricing</Link>, read the <Link href="/privacy">privacy policy</Link>, or explore <Link href="/blog">voice writing guides</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

