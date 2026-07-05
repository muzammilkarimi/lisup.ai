"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../Navbar";
import { 
  FiClock, 
  FiArrowLeft, 
  FiPlay, 
  FiRefreshCw, 
  FiZap, 
  FiMessageSquare 
} from "react-icons/fi";

type DemoState = "idle" | "selecting" | "listening" | "rewriting" | "done";

export default function LeadersPage() {
  const [activeTab, setActiveTab] = useState<"triage" | "strategic" | "ceo">("triage");
  const [isPlaying, setIsPlaying] = useState(false);
  const [animState, setAnimState] = useState<DemoState>("idle");
  const [visibleRawText, setVisibleRawText] = useState("");
  const [editorText, setEditorText] = useState("");
  
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const storyChapters = {
    triage: {
      time: "9:00 AM",
      title: "Daily Morning Triage",
      description: "Sarah starts the morning unblocking the engineering team. Instead of spending 5 minutes framing an email-safe reminder, she dictates her raw instructions. Lisup processes it and updates her Slack draft in-place.",
      appName: "Slack — #engineering",
      initialText: "hey engineering team we need the deployment pipeline reports by 5pm",
      rawSpeech: "make this professional and polite please",
      rewritten: "Hi team, please ensure all deployment pipeline reports are compiled and submitted by 5:00 PM today. Thank you!",
      optimizingText: "⚡ POLISHING MESSAGE FOR THE ENG TEAM..."
    },
    strategic: {
      time: "1:00 PM",
      title: "Directional Pivot Announcement",
      description: "Mid-day project redirection requires motivating the product crew without sounding abrupt. Sarah highlights her blunt announcement, speaks her desired tone changes, and watches Lisup refine the Slack message.",
      appName: "Slack — #product-announcements",
      initialText: "guys project alpha is dead focus on beta starting now",
      rawSpeech: "explain context, motivate team, keep it concise",
      rewritten: "Hi team, we're transitioning our focus from Project Alpha to prioritize Project Beta effective immediately. Let's redirect our efforts to hit our next milestones. Thanks for your agility!",
      optimizingText: "⚡ STRUCTURING MOTIVATIONAL FOCUS ANNOUNCEMENT..."
    },
    ceo: {
      time: "4:30 PM",
      title: "Board & CEO Executive Briefing",
      description: "Before heading out, Sarah updates the executive sponsors. She dictates shorthand bullet summaries, and Lisup transforms them into formal executive slide summaries inside their status channel.",
      appName: "Slack — #executive-sync",
      initialText: "revenue numbers are fine, launch was good, next steps tomorrow",
      rawSpeech: "format as high-level summary points for executive status updates",
      rewritten: `Executive Update:
• Q3 Revenue remains fully on track
• Product Launch completed successfully
• Detailed roadmap planning scheduled for tomorrow morning`,
      optimizingText: "⚡ FORMATTING EXECUTIVE BULLET SUMMARY..."
    }
  };

  const currentData = storyChapters[activeTab];

  useEffect(() => {
    setEditorText(currentData.initialText);
    setAnimState("idle");
    setVisibleRawText("");
    clearAllTimeouts();
  }, [activeTab, currentData.initialText]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  const startSimulation = () => {
    clearAllTimeouts();
    setIsPlaying(true);
    setAnimState("selecting");
    setEditorText(currentData.initialText);
    setVisibleRawText("");

    const t1 = setTimeout(() => {
      setAnimState("listening");
      const chars = currentData.rawSpeech.split("");
      let currentText = "";
      chars.forEach((char, idx) => {
        const tId = setTimeout(() => {
          currentText += char;
          setVisibleRawText(currentText);
          if (idx === chars.length - 1) {
            const tId2 = setTimeout(startRewriting, 800);
            timeoutsRef.current.push(tId2);
          }
        }, 30 * idx + 100);
        timeoutsRef.current.push(tId);
      });
    }, 1200);
    timeoutsRef.current.push(t1);
  };

  const startRewriting = () => {
    setAnimState("rewriting");
    const tId = setTimeout(() => {
      setAnimState("done");
      setEditorText(currentData.rewritten);
      setIsPlaying(false);
    }, 1800);
    timeoutsRef.current.push(tId);
  };

  return (
    <div style={{ background: "#FDFDFD", minHeight: "100vh", color: "#1A1A1A", position: "relative", overflowX: "hidden" }}>
      
      {/* Decorative concentric lines/background grids */}
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
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", textAlign: "center" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#E07B39",
              textDecoration: "none",
              fontSize: "13.5px",
              fontWeight: 600,
              marginBottom: "28px"
            }}
            data-cursor
          >
            <FiArrowLeft /> Back to home
          </Link>
          <div className="font-jetbrains" style={{ fontSize: "12.5px", color: "#E07B39", letterSpacing: ".25em", textTransform: "uppercase" }}>
            {"// DAY IN THE LIFE OF A MANAGER"}
          </div>
          <h1
            className="font-bricolage"
            style={{
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 68px)",
              lineHeight: 0.95,
              color: "#26231F",
              letterSpacing: "-.04em",
              margin: "18px 0 24px",
              maxWidth: "920px",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            Refine Leadership Communications.<br />
            In-Place in Slack.
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
            Sarah, VP of Operations, communicates with clarity and speed. She types her rough thoughts, highlights the block, and dictates tone commands directly in place.
          </p>
        </div>
      </section>

      {/* Story Timeline & Simulator Section */}
      <section style={{ padding: "0 0 100px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          
          <div className="role-layout-grid">
            
            {/* Left Side: Chronological Story Chapters */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 700, color: "#8E8880", letterSpacing: "0.1em" }}>CHRONOLOGICAL TIMELINE</div>
              
              {Object.entries(storyChapters).map(([key, chapter]) => {
                const isActive = activeTab === key;
                return (
                  <div
                    key={key}
                    onClick={() => !isPlaying && setActiveTab(key as typeof activeTab)}
                    style={{
                      background: isActive ? "rgba(224, 123, 57, 0.03)" : "#FAF8F5",
                      border: "1px solid",
                      borderColor: isActive ? "rgba(224, 123, 57, 0.25)" : "#ECE7DF",
                      borderRadius: "12px",
                      padding: "24px",
                      cursor: isPlaying ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                      opacity: isPlaying && !isActive ? 0.35 : 1,
                      boxShadow: isActive ? "0 10px 20px rgba(224,123,57,0.02)" : "none"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <FiClock color={isActive ? "#E07B39" : "#8E8880"} size={14} />
                      <span className="font-jetbrains" style={{ fontSize: "11.5px", color: isActive ? "#E07B39" : "#8E8880", fontWeight: 700 }}>
                        {chapter.time} &mdash; {chapter.title}
                      </span>
                    </div>
                    <h3 className="font-bricolage" style={{ fontSize: "18px", fontWeight: 700, color: "#26231F", marginBottom: "8px" }}>{chapter.appName}</h3>
                    {isActive && (
                      <p className="font-hanken" style={{ fontSize: "14.5px", lineHeight: 1.6, color: "#6B6560", margin: 0 }}>
                        {chapter.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Side: High-Fidelity App Simulator */}
            <div>
              <div style={{ background: "#3F0E40", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.15)", boxShadow: "0 40px 80px rgba(63,14,64,0.15)" }}>
                
                {/* Slack Window Header */}
                <div style={{ height: "40px", background: "#350B36", display: "flex", alignItems: "center", padding: "0 18px", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F56" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27C93F" }}></div>
                  </div>
                  <span className="font-jetbrains" style={{ fontSize: "11px", color: "#bcabbd", fontWeight: 700 }}>
                    {currentData.appName}
                  </span>
                  <div style={{ width: "40px" }}></div>
                </div>

                {/* Editor Content Area */}
                <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "350px", background: "#FDFDFD" }}>
                  
                  {/* Chat Content Mock */}
                  <div style={{ flex: 1, padding: "24px", overflowY: "auto", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    <div style={{ display: "flex", gap: "12px", marginBottom: "16px", opacity: 0.6 }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#E07B39", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: 700 }}>E</div>
                      <div>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <span style={{ fontSize: "13px", fontWeight: 700, color: "#1A1A1A" }}>Engineering Lead</span>
                          <span style={{ fontSize: "10px", color: "#8E8880" }}>8:55 AM</span>
                        </div>
                        <span style={{ fontSize: "13.5px", color: "#4A4A4A" }}>Let us know if there are any updates on the deployment blockers.</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "12px", border: "1px solid #ECE7DF", borderRadius: "8px", padding: "16px", background: "#FCFAF7" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "4px", background: "#3F0E40", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: 700 }}>S</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px" }}>
                          <span style={{ fontSize: "13px", fontWeight: 700, color: "#1A1A1A" }}>Sarah (You)</span>
                          <span style={{ fontSize: "10px", color: "#8E8880" }}>Drafting...</span>
                        </div>
                        <div className="font-hanken" style={{ fontSize: "14px", color: "#26231F", whiteSpace: "pre-line", margin: 0 }}>
                          {animState === "selecting" ? (
                            <span style={{ background: "rgba(224, 123, 57, 0.25)", color: "#1A1A1A", padding: "2px 4px", borderRadius: "4px" }}>
                              {editorText}
                            </span>
                          ) : (
                            <span>{editorText}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Lisup Desktop Widget */}
                  <div 
                    className="mock-lisup-widget-overlay"
                    style={{ 
                      background: "rgba(253, 246, 240, 0.96)", 
                      border: "1px solid #ECE7DF", 
                      borderRadius: "14px", 
                      padding: "16px", 
                      boxShadow: "0 24px 48px rgba(38,35,31,0.08)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid #ECE7DF", paddingBottom: "10px", marginBottom: "12px", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div 
                          style={{ 
                            width: "8px", 
                            height: "8px", 
                            borderRadius: "50%", 
                            background: animState === "listening" ? "#E07B39" : animState === "rewriting" ? "#E07B39" : animState === "done" ? "#2C9A5E" : "#8E8880" 
                          }}
                        ></div>
                        <span className="font-jetbrains" style={{ fontSize: "10.5px", color: "#8E8880", fontWeight: 700 }}>
                          {animState === "selecting" ? "1. SELECTING DRAFT" : animState === "listening" ? "2. LISTENING SPEECH" : animState === "rewriting" ? "3. REWRITING TONE" : "LISUP ACTIVE"}
                        </span>
                      </div>
                      <FiZap size={11} color="#E07B39" />
                    </div>

                    <p className="font-hanken" style={{ fontSize: "13px", color: "#26231F", margin: 0, minHeight: "38px", display: "flex", alignItems: "center" }}>
                      {animState === "selecting" ? (
                        <span>Selecting raw text draft inside Slack...</span>
                      ) : animState === "listening" ? (
                        <span>Voice: &quot;<strong style={{ color: "#E07B39" }}>{visibleRawText}</strong>&quot;</span>
                      ) : animState === "rewriting" ? (
                        <span style={{ color: "#E07B39" }}>{currentData.optimizingText}</span>
                      ) : animState === "done" ? (
                        <span style={{ color: "#2C9A5E" }}>✓ Replaced in-place inside Slack!</span>
                      ) : (
                        <span style={{ color: "#8E8880" }}>Click simulate button below to start...</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Simulated Bottom Controls */}
                <div style={{ background: "#F5EDE4", borderTop: "1px solid #ECE7DF", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="font-jetbrains" style={{ fontSize: "11px", color: "#6B6560", display: "flex", alignItems: "center", gap: "6px" }}>
                    <FiMessageSquare /> SLACK ACTIVE SESSION
                  </div>
                  <div style={{ fontSize: "11px", color: "#8E8880", fontStyle: "italic" }}>
                    Alt + Space to Dictate
                  </div>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
                <button
                  onClick={startSimulation}
                  disabled={isPlaying}
                  style={{
                    background: "#E07B39",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 32px",
                    color: "#FFF",
                    cursor: isPlaying ? "not-allowed" : "pointer",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    boxShadow: "0 10px 24px rgba(224, 123, 57, 0.2)",
                    display: "flex",
                    alignItems: "center"
                  }}
                  data-cursor
                >
                  {isPlaying ? <FiRefreshCw className="animate-spin" /> : <FiPlay />}
                  <span style={{ marginLeft: "8px" }}>{isPlaying ? "Simulating Rewrite..." : `Simulate ${currentData.time} Story`}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Website styled Footer */}
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

        {/* Massive watermark logo */}
        <div className="font-bricolage" style={{ fontWeight: 800, fontSize: "clamp(120px, 20vw, 290px)", lineHeight: 0.7, letterSpacing: "-.04em", color: "#fff", opacity: 0.05, textAlign: "center", whiteSpace: "nowrap", paddingBottom: "20px", userSelect: "none" }}>
          Lisup
        </div>
      </footer>
    </div>
  );
}
