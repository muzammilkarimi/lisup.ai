"use client";

import { useState } from "react";
import Navbar from "../Navbar";
import SiteFooter from "../SiteFooter";
import { WINDOWS_DOWNLOAD_LABEL, WINDOWS_DOWNLOAD_URL } from "../download";
import { FiCheck, FiChevronDown, FiLock } from "react-icons/fi";

const FAQS = [
  {
    question: "How does Lisup write text in other apps?",
    answer: "Lisup runs locally on your machine. When you trigger the shortcut (Ctrl + Win), it captures your speech, processes it through our context-aware refinement models, and then securely simulates keystrokes or uses system accessibility APIs to type the text directly into whichever document, code editor, or browser input you currently have focused."
  },
  {
    question: "Is there a limit to how much I can talk?",
    answer: "On the Free tier, you get up to 30 minutes of voice processing per month. The Pro plan provides unlimited processing, so you can dictate case files, draft scripts, and respond to emails all day without ever running into limits."
  },
  {
    question: "What languages does Lisup support?",
    answer: "Our advanced model supports transcription, translation, and refinement in over 100 languages, including English, Spanish, French, German, Mandarin, Japanese, Hindi, and Arabic. It can also translate your spoken words directly into clean English text."
  },
  {
    question: "Can I use Lisup in specialized apps like VS Code or Slack?",
    answer: "Yes! Because Lisup acts as a virtual keyboard helper, it works in 100% of desktop applications, including web browsers, developer tools (VS Code, Cursor), chat apps (Slack, Teams, Discord), note-taking tools (Notion, Obsidian), and email clients."
  },
  {
    question: "How secure is my audio data?",
    answer: "Security is our top priority. Your audio recordings are processed securely and deleted immediately after the text is refined. We do not store your voice files, and we do not use your private data to train public models."
  }
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const proPrice = isAnnual ? 4 : 5;

  return (
    <div style={{ background: "#FDF6F0", minHeight: "100vh", color: "#26231F", position: "relative", overflowX: "hidden" }}>
      
      {/* Background ambient grids/glows */}
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

      <div 
        style={{
          position: "absolute",
          top: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(100%, 700px)",
          height: "400px",
          background: "radial-gradient(circle, rgba(224, 123, 57, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1
        }}
      ></div>

      <Navbar />

      {/* Hero Header */}
      <section style={{ padding: "100px 0 40px", position: "relative", zIndex: 2, textAlign: "center" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          
          <div className="font-jetbrains" style={{ fontSize: "12.5px", color: "#E07B39", letterSpacing: ".25em", textTransform: "uppercase", marginBottom: "16px" }}>
            {"// PRICING PLANS"}
          </div>
          
          <h1
            className="font-bricolage"
            style={{
              fontWeight: 800,
              fontSize: "clamp(38px, 6vw, 64px)",
              lineHeight: 0.95,
              color: "#26231F",
              letterSpacing: "-.03em",
              margin: "0 0 20px"
            }}
          >
            Sleek Voice Dictation.<br />
            Simple, Transparent Pricing.
          </h1>
          
          <p
            className="font-hanken"
            style={{
              fontSize: "18px",
              lineHeight: 1.5,
              color: "#6B6560",
              maxWidth: "580px",
              margin: "0 auto 36px"
            }}
          >
            Start free, upgrade anytime to unlock unlimited dictations, custom writing styles, and premium integrations.
          </p>

          {/* Monthly / Annual Toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", background: "#ECE8E2", padding: "4px", borderRadius: "999px", gap: "4px" }}>
            <button
              onClick={() => setIsAnnual(false)}
              className="font-bricolage"
              style={{
                border: "none",
                background: !isAnnual ? "#fff" : "transparent",
                color: "#26231F",
                fontSize: "13.5px",
                fontWeight: 700,
                padding: "8px 20px",
                borderRadius: "999px",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s"
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className="font-bricolage"
              style={{
                border: "none",
                background: isAnnual ? "#fff" : "transparent",
                color: "#26231F",
                fontSize: "13.5px",
                fontWeight: 700,
                padding: "8px 20px",
                borderRadius: "999px",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              Annually 
              <span style={{ fontSize: "10.5px", background: "rgba(224, 123, 57, 0.1)", color: "#E07B39", padding: "2px 8px", borderRadius: "999px" }}>
                Save 20%
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section style={{ padding: "40px 0 100px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: "28px", alignItems: "stretch" }}>
            
            {/* Free Plan */}
            <div
              style={{
                background: "#fff",
                border: "1.5px solid #ECE8E2",
                borderRadius: "24px",
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                position: "relative"
              }}
            >
              <h3 className="font-bricolage" style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px", color: "#26231F" }}>
                Starter
              </h3>
              <p className="font-hanken" style={{ fontSize: "14px", color: "#6B6560", margin: "0 0 28px", minHeight: "42px" }}>
                Ideal for testing out Lisup dictation workflows locally.
              </p>
              
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "28px" }}>
                <span className="font-bricolage" style={{ fontSize: "44px", fontWeight: 800, color: "#26231F" }}>$0</span>
                <span className="font-hanken" style={{ fontSize: "14px", color: "#A29B91" }}>/ forever</span>
              </div>

              <a
                href={WINDOWS_DOWNLOAD_URL}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "13px",
                  borderRadius: "999px",
                  border: "1.5px solid #E07B39",
                  background: "transparent",
                  color: "#E07B39",
                  fontWeight: 700,
                  fontSize: "14.5px",
                  cursor: "pointer",
                  marginBottom: "36px",
                  transition: "background 0.2s, color 0.2s",
                  textDecoration: "none"
                }}
                className="hover-bg-orange"
              >
                Start free trial
              </a>

              <div style={{ borderTop: "1px solid #ECE8E2", paddingTop: "28px" }}>
                <p className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 700, color: "#A29B91", marginBottom: "16px", letterSpacing: "0.05em" }}>
                  INCLUDES
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#26231F" }}>
                    <FiCheck color="#E07B39" size={16} /> 30 minutes of voice dictation / mo
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#26231F" }}>
                    <FiCheck color="#E07B39" size={16} /> Standard grammar cleanups
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#26231F" }}>
                    <FiCheck color="#E07B39" size={16} /> 3 basic tone options
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#26231F" }}>
                    <FiCheck color="#E07B39" size={16} /> Works in all local apps
                  </li>
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            <div
              style={{
                background: "#fff",
                border: "2px solid #E07B39",
                borderRadius: "24px",
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 20px 40px rgba(224, 123, 57, 0.05), 0 1px 3px rgba(224, 123, 57, 0.02)",
                position: "relative"
              }}
            >
              <div style={{
                position: "absolute",
                top: "-15px",
                right: "32px",
                background: "#E07B39",
                color: "#fff",
                fontSize: "11px",
                fontWeight: 700,
                fontFamily: "var(--font-jetbrains)",
                padding: "4px 12px",
                borderRadius: "999px",
                letterSpacing: "0.08em"
              }}>
                MOST POPULAR
              </div>
              
              <h3 className="font-bricolage" style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px", color: "#26231F" }}>
                Lisup Pro
              </h3>
              <p className="font-hanken" style={{ fontSize: "14px", color: "#6B6560", margin: "0 0 28px", minHeight: "42px" }}>
                For professionals, developers, and writers who rely on high-volume voice-to-text.
              </p>
              
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "28px" }}>
                <span className="font-bricolage" style={{ fontSize: "44px", fontWeight: 800, color: "#26231F" }}>${proPrice}</span>
                <span className="font-hanken" style={{ fontSize: "14px", color: "#A29B91" }}>/ month</span>
              </div>

              <button
                type="button"
                disabled
                aria-disabled="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "14px",
                  borderRadius: "999px",
                  border: "none",
                  background: "#E8E1DA",
                  color: "#8E8880",
                  fontWeight: 700,
                  fontSize: "14.5px",
                  cursor: "not-allowed",
                  marginBottom: "36px",
                  boxShadow: "none",
                }}
              >
                <FiLock size={15} /> Pro coming soon
              </button>

              <div style={{ borderTop: "1px solid #ECE8E2", paddingTop: "28px" }}>
                <p className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 700, color: "#A29B91", marginBottom: "16px", letterSpacing: "0.05em" }}>
                  EVERYTHING IN STARTER PLUS
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#26231F" }}>
                    <FiCheck color="#E07B39" size={16} /> <strong>Unlimited</strong> voice processing
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#26231F" }}>
                    <FiCheck color="#E07B39" size={16} /> 8 advanced writing styles & tones
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#26231F" }}>
                    <FiCheck color="#E07B39" size={16} /> Technical terminology & code formatting
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#26231F" }}>
                    <FiCheck color="#E07B39" size={16} /> custom formatting directives
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#26231F" }}>
                    <FiCheck color="#E07B39" size={16} /> Premium support & early beta features
                  </li>
                </ul>
              </div>
            </div>

            {/* Team Plan */}
            <div
              style={{
                background: "#fff",
                border: "1.5px solid #ECE8E2",
                borderRadius: "24px",
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
                position: "relative"
              }}
            >
              <h3 className="font-bricolage" style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px", color: "#26231F" }}>
                Teams
              </h3>
              <p className="font-hanken" style={{ fontSize: "14px", color: "#6B6560", margin: "0 0 28px", minHeight: "42px" }}>
                For organizations looking to equip entire teams with custom-tuned speech writing.
              </p>
              
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "28px" }}>
                <span className="font-bricolage" style={{ fontSize: "44px", fontWeight: 800, color: "#26231F" }}>Custom</span>
              </div>

              <a
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "13px",
                  borderRadius: "999px",
                  border: "1.5px solid #1A1A1A",
                  background: "transparent",
                  color: "#1A1A1A",
                  fontWeight: 700,
                  fontSize: "14.5px",
                  cursor: "pointer",
                  marginBottom: "36px",
                  transition: "background 0.2s, color 0.2s",
                  textDecoration: "none"
                }}
                className="hover-bg-orange"
              >
                Contact Sales
              </a>

              <div style={{ borderTop: "1px solid #ECE8E2", paddingTop: "28px" }}>
                <p className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 700, color: "#A29B91", marginBottom: "16px", letterSpacing: "0.05em" }}>
                  EVERYTHING IN PRO PLUS
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#26231F" }}>
                    <FiCheck color="#E07B39" size={16} /> Shared team dictation templates
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#26231F" }}>
                    <FiCheck color="#E07B39" size={16} /> Centralized admin dashboard & seats
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#26231F" }}>
                    <FiCheck color="#E07B39" size={16} /> Dedicated account management
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#26231F" }}>
                    <FiCheck color="#E07B39" size={16} /> Custom integrations & SLAs
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section style={{ padding: "0 0 100px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>
          
          <h2
            className="font-bricolage"
            style={{
              fontWeight: 800,
              fontSize: "32px",
              textAlign: "center",
              marginBottom: "44px",
              letterSpacing: "-.02em"
            }}
          >
            Pricing & FAQs
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: "#fff",
                    border: "1.5px solid #ECE8E2",
                    borderRadius: "16px",
                    overflow: "hidden",
                    transition: "border-color 0.2s"
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "20px 24px",
                      background: "transparent",
                      border: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      textAlign: "left"
                    }}
                  >
                    <span className="font-bricolage" style={{ fontSize: "16px", fontWeight: 700, color: "#26231F" }}>
                      {faq.question}
                    </span>
                    <FiChevronDown
                      size={18}
                      color="#6B6560"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s"
                      }}
                    />
                  </button>
                  
                  {isOpen && (
                    <div style={{ padding: "0 24px 20px", borderTop: "1px solid #FAF8F6" }}>
                      <p className="font-hanken" style={{ fontSize: "14.5px", lineHeight: 1.6, color: "#6B6560", margin: 0, paddingTop: "14px" }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "80px 0", background: "rgba(224, 123, 57, 0.04)", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h2 className="font-bricolage" style={{ fontSize: "36px", fontWeight: 800, margin: "0 0 16px" }}>
            Ready to Speak Faster?
          </h2>
          <p className="font-hanken" style={{ fontSize: "16px", color: "#6B6560", maxWidth: "480px", margin: "0 auto 28px" }}>
            Download the Windows app today and start turning voice into finished text on your desktop.
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
      <SiteFooter />
    </div>
  );
}
