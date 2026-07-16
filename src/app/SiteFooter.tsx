"use client";

import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer style={{ background: "#1A1A1A", padding: "70px 0 0", overflow: "hidden", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "40px", paddingBottom: "56px" }}>
        <div style={{ maxWidth: "320px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
            <Image
              src="/logo.png"
              alt="Lisup Logo"
              width="32"
              height="32"
              style={{ borderRadius: "8px", objectFit: "cover" }}
            />
            <span className="font-bricolage" style={{ fontWeight: 800, fontSize: "22px", color: "#fff" }}>
              Lis<span style={{ color: "#E07B39" }}>up</span>
            </span>
          </div>
          <p style={{ fontSize: "14.5px", lineHeight: 1.55, color: "#A29B91", margin: 0 }}>
            Your voice, perfected. Speak anywhere, get clean finished text in seconds.
          </p>
          <div className="footer-badge-panel" aria-label="Featured on directories">
            <div className="font-jetbrains footer-badge-eyebrow">AS FEATURED ON</div>
            <div className="footer-badge-grid">
              <a
                href="https://www.listbulb.com/tools/lisupai"
                target="_blank"
                rel="noopener"
                aria-label="Lisup featured on ListBulb"
                className="footer-featured-badge footer-featured-badge-large"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://www.listbulb.com/featured-on-listbulb-light.svg"
                  alt="Featured on ListBulb"
                  height="72"
                />
              </a>
              <a
                href="https://neeed.directory/products/lisup?utm_source=lisup"
                target="_blank"
                rel="noopener"
                aria-label="Lisup featured on neeed.directory"
                className="footer-featured-badge"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://neeed.directory/badges/neeed-badge-light.svg"
                  alt="Featured on neeed.directory"
                  width="139"
                />
              </a>
              <a
                href="https://saascity.io/live/lisup"
                target="_blank"
                rel="noopener"
                aria-label="Lisup featured on SaaSCity"
                className="footer-featured-badge"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://saascity.io/badges/featured-light.svg"
                  alt="Featured on SaaSCity"
                  width="150"
                  height="54"
                />
              </a>
              <a
                href="https://www.producthunt.com/products/lisup?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-lisup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Lisup featured on Product Hunt"
                className="footer-featured-badge footer-featured-badge-wide"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1197630&theme=light&t=1784214274850"
                  alt="Lisup - Stop typing. Start talking. | Product Hunt"
                  width="250"
                  height="54"
                />
              </a>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "72px", flexWrap: "wrap" }} className="footer-links-grid">
          <div>
            <div className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 600, color: "#6B6560", marginBottom: "18px", letterSpacing: ".06em" }}>
              PRODUCT
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link href="/#features" data-cursor style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                Features
              </Link>
              <Link href="/#how" data-cursor style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                How it works
              </Link>
              <Link href="/#tones" data-cursor style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                Tones
              </Link>
            </div>
          </div>
          <div>
            <div className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 600, color: "#6B6560", marginBottom: "18px", letterSpacing: ".06em" }}>
              COMPANY
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link href="/about" data-cursor style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                About
              </Link>
              <Link href="/privacy" data-cursor style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                Privacy
              </Link>
              <Link href="/contact" data-cursor style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                Contact
              </Link>
            </div>
          </div>
          <div>
            <div className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 600, color: "#6B6560", marginBottom: "18px", letterSpacing: ".06em" }}>
              PLATFORMS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <span style={{ fontSize: "14px", color: "#C5BFB8" }}>Windows</span>
              <span style={{ fontSize: "14px", color: "#C5BFB8" }}>macOS soon</span>
              <span style={{ fontSize: "14px", color: "#C5BFB8" }}>Android soon</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #2C2824" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "22px 48px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <span className="font-jetbrains" style={{ fontSize: "12px", color: "#6B6560" }}>
            &copy; 2026 LISUP &mdash; ALL RIGHTS RESERVED
          </span>
          <span className="font-jetbrains" style={{ fontSize: "12px", color: "#6B6560" }}>
            FOR PEOPLE WHO THINK FASTER THAN THEY TYPE
          </span>
        </div>
      </div>
      <div className="font-bricolage" style={{ fontWeight: 800, fontSize: "clamp(120px, 20vw, 290px)", lineHeight: 0.7, letterSpacing: "-.04em", color: "#fff", opacity: 0.05, textAlign: "center", whiteSpace: "nowrap", paddingBottom: "20px", userSelect: "none" }}>
        Lisup
      </div>
    </footer>
  );
}