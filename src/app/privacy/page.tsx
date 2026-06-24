"use client";

import Link from "next/link";
import Navbar from "../Navbar";

export default function PrivacyPage() {
  return (
    <div style={{ background: "#FDF6F0", minHeight: "100vh", color: "#26231F", position: "relative", overflowX: "hidden" }}>
      
      {/* Background Grid */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(224, 123, 57, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(224, 123, 57, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 1
        }}
      ></div>

      <Navbar />

      {/* Hero Section */}
      <section style={{ padding: "100px 0 40px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <div className="font-jetbrains" style={{ fontSize: "12.5px", color: "#E07B39", letterSpacing: ".25em", textTransform: "uppercase", marginBottom: "16px" }}>
            // LEGAL POLICY
          </div>
          <h1
            className="font-bricolage"
            style={{
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.0,
              color: "#26231F",
              letterSpacing: "-.03em",
              margin: "0 0 20px"
            }}
          >
            Privacy Policy
          </h1>
          <p
            className="font-hanken"
            style={{
              fontSize: "15px",
              color: "#6B6560",
              margin: 0
            }}
          >
            Last Updated: June 24, 2026
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section style={{ padding: "20px 0 100px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <div 
            style={{ 
              background: "#fff", 
              border: "1.5px solid #ECE8E2", 
              borderRadius: "24px", 
              padding: "40px", 
              boxShadow: "0 4px 30px rgba(0,0,0,0.01)",
              display: "flex",
              flexDirection: "column",
              gap: "32px"
            }}
          >
            
            <div>
              <h2 className="font-bricolage" style={{ fontSize: "20px", fontWeight: 700, color: "#26231F", marginBottom: "14px" }}>
                1. Overview & Core Values
              </h2>
              <p className="font-hanken" style={{ fontSize: "15px", lineHeight: 1.6, color: "#6B6560", margin: 0 }}>
                At Lisup, we believe that your voice and thoughts belong entirely to you. Our core security philosophy is simple: **we process your voice data to deliver clean text, and we delete it immediately.** We do not store your raw audio, and we do not use your private transcripts to train public AI models.
              </p>
            </div>

            <div>
              <h2 className="font-bricolage" style={{ fontSize: "20px", fontWeight: 700, color: "#26231F", marginBottom: "14px" }}>
                2. Data We Collect & How We Use It
              </h2>
              <p className="font-hanken" style={{ fontSize: "15px", lineHeight: 1.6, color: "#6B6560", marginBottom: "14px" }}>
                * **Voice Recordings:** When you use the shortcut (Alt + Space) to record audio, that file is processed securely via secure APIs. Once transcription and AI-based styling are completed, the audio is permanently deleted from our servers.
              </p>
              <p className="font-hanken" style={{ fontSize: "15px", lineHeight: 1.6, color: "#6B6560", marginBottom: "14px" }}>
                * **Waitlist Signups:** If you join the Lisup waitlist, we store your email address securely in our database (backed by Neon PostgreSQL). This is used solely to notify you of launch announcements, early beta access, and major app releases.
              </p>
              <p className="font-hanken" style={{ fontSize: "15px", lineHeight: 1.6, color: "#6B6560", margin: 0 }}>
                * **Local App Analytics:** We may collect anonymous diagnostic and usage telemetry (e.g. error reports or feature click frequency) to improve the desktop app performance. None of this data contains personal information or text you transcribe.
              </p>
            </div>

            <div>
              <h2 className="font-bricolage" style={{ fontSize: "20px", fontWeight: 700, color: "#26231F", marginBottom: "14px" }}>
                3. Third-Party Integrations & Processing
              </h2>
              <p className="font-hanken" style={{ fontSize: "15px", lineHeight: 1.6, color: "#6B6560", margin: 0 }}>
                Our backend relies on highly secure, compliant AI providers to transcribe and format your speech in real-time. These providers are bound by strict agreements prohibiting the retention, sharing, or use of customer data for training purposes.
              </p>
            </div>

            <div>
              <h2 className="font-bricolage" style={{ fontSize: "20px", fontWeight: 700, color: "#26231F", marginBottom: "14px" }}>
                4. Data Security & Retention
              </h2>
              <p className="font-hanken" style={{ fontSize: "15px", lineHeight: 1.6, color: "#6B6560", margin: 0 }}>
                All network communications between the Lisup desktop application, our APIs, and database components are fully encrypted in transit using industry-standard TLS (Transport Layer Security). We maintain strict administrative and electronic safeguards to defend database assets.
              </p>
            </div>

            <div>
              <h2 className="font-bricolage" style={{ fontSize: "20px", fontWeight: 700, color: "#26231F", marginBottom: "14px" }}>
                5. Contact & Support
              </h2>
              <p className="font-hanken" style={{ fontSize: "15px", lineHeight: 1.6, color: "#6B6560", margin: 0 }}>
                If you have any questions or concerns regarding our privacy policies, data practices, or wish to request deletion of your waitlist email, please reach out to us via our <Link href="/contact" style={{ color: "#E07B39", textDecoration: "none", fontWeight: 600 }}>Contact Page</Link>.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1A1A1A", padding: "70px 0 0", overflow: "hidden", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "40px", paddingBottom: "56px" }}>
          <div style={{ maxWidth: "320px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
              <img
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
          </div>
          
          <div style={{ display: "flex", gap: "72px", flexWrap: "wrap" }} className="footer-links-grid">
            <div>
              <div className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 600, color: "#6B6560", marginBottom: "18px", letterSpacing: ".06em" }}>
                PRODUCT
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link href="/#features" style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                  Features
                </Link>
                <Link href="/#how" style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                  How it works
                </Link>
                <Link href="/#tones" style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                  Tones
                </Link>
              </div>
            </div>
            <div>
              <div className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 600, color: "#6B6560", marginBottom: "18px", letterSpacing: ".06em" }}>
                COMPANY
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Link href="/about" style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                  About
                </Link>
                <Link href="/privacy" style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                  Privacy
                </Link>
                <Link href="/contact" style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
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
                <span style={{ fontSize: "14px", color: "#C5BFB8" }}>macOS</span>
                <span style={{ fontSize: "14px", color: "#C5BFB8" }}>Android</span>
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
    </div>
  );
}
