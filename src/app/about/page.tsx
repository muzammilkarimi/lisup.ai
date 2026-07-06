"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "../Navbar";
import { WINDOWS_DOWNLOAD_LABEL, WINDOWS_DOWNLOAD_URL } from "../download";
import { FiUsers, FiCpu, FiCompass, FiShield, FiMic, FiArrowRight, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";

const PILLARS = [
  {
    icon: <FiCpu size={24} />,
    title: "Intelligence First",
    description: "Voice-to-text shouldn't be a literal transcription. We build smart, context-aware AI models that refine speech into polished, ready-to-share writing."
  },
  {
    icon: <FiCompass size={24} />,
    title: "Frictionless Integration",
    description: "No copy-pasting, no browser extension limits. Lisup runs globally on your machine, operating directly where your cursor already is."
  },
  {
    icon: <FiUsers size={24} />,
    title: "For Fast Thinkers",
    description: "We design specifically for people whose thoughts move faster than their fingers can type—developers, creators, students, and leaders."
  },
  {
    icon: <FiShield size={24} />,
    title: "Privacy Conscious",
    description: "Your voice data belongs to you. Audio is processed securely and discarded immediately, never saved or used for model training."
  }
];

const FOUNDER_NOTES = [
  "Built from a real everyday problem: ideas move fast, typing slows them down.",
  "Focused on a Windows-first desktop experience that feels instant and practical.",
  "Designed for students, founders, developers, creators, and anyone who writes all day."
];

export default function AboutPage() {
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
      <section style={{ padding: "100px 0 60px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div className="font-jetbrains" style={{ fontSize: "12.5px", color: "#E07B39", letterSpacing: ".25em", textTransform: "uppercase", marginBottom: "16px" }}>
            {"// OUR MISSION"}
          </div>
          <h1
            className="font-bricolage"
            style={{
              fontWeight: 800,
              fontSize: "clamp(38px, 6vw, 68px)",
              lineHeight: 0.95,
              color: "#26231F",
              letterSpacing: "-.04em",
              margin: "0 auto 24px",
              maxWidth: "840px"
            }}
          >
            Zero friction between<br />
            thought and text.
          </h1>
          <p
            className="font-hanken"
            style={{
              fontSize: "19px",
              lineHeight: 1.5,
              color: "#6B6560",
              maxWidth: "700px",
              margin: "0 auto 36px"
            }}
          >
            We believe that writing should be as fast as speaking, but as structured and polished as typing. Lisup turns raw speech into finished copy, instantly.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section style={{ padding: "0 0 92px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "28px",
              alignItems: "stretch"
            }}
          >
            <div style={{ background: "#26231F", borderRadius: "24px", padding: "40px", color: "#fff", minHeight: "100%" }}>
              <div className="font-jetbrains" style={{ fontSize: "12px", color: "#E8B18A", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: "16px" }}>
                Founder
              </div>
              <h2 className="font-bricolage" style={{ fontSize: "clamp(30px, 4vw, 44px)", lineHeight: 1, fontWeight: 800, margin: "0 0 20px", letterSpacing: "-.03em" }}>
                Meet the founder.
              </h2>
              <p className="font-hanken" style={{ fontSize: "16.5px", lineHeight: 1.65, color: "#D9D1CA", margin: "0 0 26px" }}>
                As an IIT Patna alumnus, I am building Lisup from a simple frustration: speaking is natural, but turning spoken ideas into clean writing still takes too much work. Lisup exists so people can think out loud and get useful, polished text wherever they already work.
              </p>
              <a
                href={WINDOWS_DOWNLOAD_URL}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "14px",
                  textDecoration: "none"
                }}
              >
                Try Lisup on Windows <FiArrowRight size={16} />
              </a>
            </div>

            <div style={{ background: "#fff", border: "1.5px solid #ECE8E2", borderRadius: "24px", padding: "34px", boxShadow: "0 4px 24px rgba(0,0,0,0.015)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "148px 1fr", gap: "24px", alignItems: "center", marginBottom: "28px" }} className="founder-profile-row">
                <div style={{ width: "148px", height: "148px", borderRadius: "50%", padding: "5px", background: "linear-gradient(135deg, #E07B39, #F3C7A8)", boxShadow: "0 18px 34px rgba(224,123,57,0.18)" }}>
                  <Image
                    src="/founder-muzammil-a-karimi.jpeg"
                    alt="Muzammil A Karimi"
                    width={148}
                    height={148}
                    sizes="148px"
                    style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block", border: "4px solid #fff" }}
                  />
                </div>
                <div>
                  <div className="font-jetbrains" style={{ fontSize: "10.5px", color: "#E07B39", letterSpacing: ".16em", textTransform: "uppercase", marginBottom: "10px", fontWeight: 700 }}>
                    Founder of Lisup
                  </div>
                  <h3 className="font-bricolage" style={{ fontSize: "clamp(28px, 4vw, 38px)", lineHeight: 1, fontWeight: 800, color: "#26231F", margin: "0 0 10px", letterSpacing: "-.02em" }}>
                    Muzammil A Karimi
                  </h3>
                  <p className="font-hanken" style={{ fontSize: "15px", color: "#6B6560", margin: "0 0 16px", lineHeight: 1.45 }}>
                    IIT Patna alumnus building a faster way to turn spoken ideas into finished writing.
                  </p>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }} className="founder-social-links">
                    <a
                      href="https://github.com/muzammilkarimi"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Muzammil A Karimi on GitHub"
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "9px 12px", borderRadius: "999px", border: "1px solid #ECE8E2", color: "#26231F", textDecoration: "none", fontSize: "13px", fontWeight: 700, background: "#FDF6F0" }}
                    >
                      <FiGithub size={15} /> GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/makarimi01/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Muzammil A Karimi on LinkedIn"
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "9px 12px", borderRadius: "999px", border: "1px solid #ECE8E2", color: "#26231F", textDecoration: "none", fontSize: "13px", fontWeight: 700, background: "#fff" }}
                    >
                      <FiLinkedin size={15} /> LinkedIn
                    </a>
                    <a
                      href="https://www.instagram.com/muzammilkarimiiiii/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Muzammil A Karimi on Instagram"
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "9px 12px", borderRadius: "999px", border: "1px solid #ECE8E2", color: "#26231F", textDecoration: "none", fontSize: "13px", fontWeight: 700, background: "#fff" }}
                    >
                      <FiInstagram size={15} /> Instagram
                    </a>

                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {FOUNDER_NOTES.map((note) => (
                  <div key={note} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ width: "30px", height: "30px", borderRadius: "10px", background: "rgba(224, 123, 57, 0.08)", color: "#E07B39", display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "0 0 30px" }}>
                      <FiMic size={15} />
                    </span>
                    <p className="font-hanken" style={{ fontSize: "15px", lineHeight: 1.5, color: "#6B6560", margin: 0 }}>
                      {note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Block */}
      <section style={{ padding: "40px 0 80px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "#fff", border: "1.5px solid #ECE8E2", borderRadius: "28px", padding: "48px 40px", boxShadow: "0 4px 30px rgba(0,0,0,0.01)" }}>
            
            <h2 className="font-bricolage" style={{ fontSize: "28px", fontWeight: 800, marginBottom: "20px", color: "#26231F" }}>
              Why We Built Lisup
            </h2>
            
            <p className="font-hanken" style={{ fontSize: "16px", lineHeight: 1.6, color: "#6B6560", marginBottom: "20px" }}>
              The modern desktop is full of friction. When ideas strike, we have to open note-taking apps, outline structures, worry about typos, and filter out verbal fillers. For people who think rapidly, the keyboard is a bottleneck that slows down creativity and communication.
            </p>
            
            <p className="font-hanken" style={{ fontSize: "16px", lineHeight: 1.6, color: "#6B6560", marginBottom: "20px" }}>
              We built Lisup to bridge that gap. By combining lightning-fast local voice capture with context-aware AI rewrite modules, Lisup allows you to dictate messy trains of thought and watch them transform into bulleted summaries, neat intro hooks, or code updates—directly where your cursor already is.
            </p>

            <p className="font-hanken" style={{ fontSize: "16px", lineHeight: 1.6, color: "#6B6560", margin: 0 }}>
              Lisup isn&apos;t just another transcription tool. It is your intelligent writing companion, designed to let you think aloud and communicate effortlessly.
            </p>

          </div>
        </div>
      </section>

      {/* Pillars / Values Grid */}
      <section style={{ padding: "0 0 100px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>
          
          <h2 className="font-bricolage" style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "48px", letterSpacing: "-.02em" }}>
            Our Design Philosophy
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "28px" }}>
            {PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                style={{
                  background: "#fff",
                  border: "1.5px solid #ECE8E2",
                  borderRadius: "20px",
                  padding: "32px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.01)"
                }}
              >
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(224, 123, 57, 0.08)",
                  color: "#E07B39",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px"
                }}>
                  {pillar.icon}
                </div>
                <h3 className="font-bricolage" style={{ fontSize: "18px", fontWeight: 700, color: "#26231F", marginBottom: "12px" }}>
                  {pillar.title}
                </h3>
                <p className="font-hanken" style={{ fontSize: "14px", lineHeight: 1.55, color: "#6B6560", margin: 0 }}>
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Call to action */}
      <section style={{ padding: "80px 0", background: "rgba(224, 123, 57, 0.04)", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h2 className="font-bricolage" style={{ fontSize: "36px", fontWeight: 800, margin: "0 0 16px" }}>
            Start Writing With Lisup
          </h2>
          <p className="font-hanken" style={{ fontSize: "16px", color: "#6B6560", maxWidth: "480px", margin: "0 auto 28px" }}>
            Be among the first to experience Lisup and experience early adopter benefits.
          </p>
          <a
            href={WINDOWS_DOWNLOAD_URL}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 36px",
              background: "#E07B39",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "0 10px 24px rgba(224,123,57,0.2)",
              textDecoration: "none"
            }}
            className="hover-bg-darkorange"
          >
            {WINDOWS_DOWNLOAD_LABEL}
          </a>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}
