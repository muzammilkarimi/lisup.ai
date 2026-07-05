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
  FiTrendingUp 
} from "react-icons/fi";

type DemoState = "idle" | "selecting" | "listening" | "rewriting" | "done";

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState<"logging" | "outreach" | "close">("logging");
  const [isPlaying, setIsPlaying] = useState(false);
  const [animState, setAnimState] = useState<DemoState>("idle");
  const [visibleRawText, setVisibleRawText] = useState("");
  const [editorText, setEditorText] = useState("");
  
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const storyChapters = {
    logging: {
      time: "9:00 AM",
      title: "CRM Call Log Logging",
      description: "Directly after a client discovery call, Mark dictates rough conversational details directly into the CRM notes field. Lisup structures his thoughts into formatted parameters in-place.",
      appName: "Salesforce — Lead: John Doe",
      initialText: "john wants 50 seats needs demo next week budget is 5k",
      rawSpeech: "make this a structured CRM update",
      rewritten: `Deal Update:
• Contact: John Doe
• Seat Count: 50 seats
• Action: Schedule demo next week
• Budget: $5,000`,
      optimizingText: "⚡ MAPPING CRM FIELDS AND LOGS..."
    },
    outreach: {
      time: "1:00 PM",
      title: "LinkedIn Outreach Follow-up",
      description: "Following up with leads. Mark speaks the core value proposition of Lisup for teams, highlights the draft, and instructs Lisup to compose a polite, high-converting cold email outreach block.",
      appName: "Salesforce — Email Composer",
      initialText: "saw your linkedin post let's chat about lisup for team integrations",
      rawSpeech: "write a professional B2B sales outreach follow up",
      rewritten: "Hi John, I noticed your recent LinkedIn post regarding sales efficiency. I'd love to schedule a brief 10-minute demo to share how Lisup helps team integration workflows.",
      optimizingText: "⚡ GENERATING B2B OUTREACH DRAFT..."
    },
    close: {
      time: "4:30 PM",
      title: "Pricing Discount Close",
      description: "Mia needs to close a deal by Friday. She highlights her raw proposal notes, dictates the discount incentives, and lets Lisup write a formal pricing close offer.",
      appName: "Salesforce — Quote Notes",
      initialText: "can do 15 percent discount if you sign by friday",
      rawSpeech: "formalize discount offer and request signature",
      rewritten: "We are pleased to offer a 15% discount on your subscription, contingent upon signature of the agreement by this Friday. Please let us know if this works.",
      optimizingText: "⚡ COMPILING FINAL PRICING PROPOSAL..."
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
    <div style={{ background: "#F0F9FF", minHeight: "100vh", color: "#1A1A1A", position: "relative", overflowX: "hidden" }}>
      
      {/* Background Sales Grid */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(2, 132, 199, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(2, 132, 199, 0.015) 1px, transparent 1px)
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
              color: "#0284C7",
              textDecoration: "none",
              fontSize: "13.5px",
              fontWeight: 600,
              marginBottom: "28px"
            }}
            data-cursor
          >
            <FiArrowLeft /> Back to home
          </Link>
          <div className="font-jetbrains" style={{ fontSize: "12.5px", color: "#0284C7", letterSpacing: ".25em", textTransform: "uppercase" }}>
            {"// DAY IN THE LIFE OF A SALES REPRESENTATIVE"}
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
            Log Lead Syncs Faster.<br />
            In-Place in Salesforce CRM.
          </h1>
          <p
            className="font-hanken"
            style={{
              fontSize: "19px",
              lineHeight: 1.5,
              color: "#4B5563",
              maxWidth: "700px",
              margin: "0 auto 36px"
            }}
          >
            Mark logs call histories and sends outreach pitches swiftly. He dictates deal details, selects text inside Salesforce, and lets Lisup rewrite logs in-place.
          </p>
        </div>
      </section>

      {/* Story Timeline & Simulator Section */}
      <section style={{ padding: "0 0 100px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          
          <div className="role-layout-grid">
            
            {/* Left Side: Chronological Story Chapters */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 700, color: "#8EA9B0", letterSpacing: "0.1em" }}>CHRONOLOGICAL TIMELINE</div>
              
              {Object.entries(storyChapters).map(([key, chapter]) => {
                const isActive = activeTab === key;
                return (
                  <div
                    key={key}
                    onClick={() => !isPlaying && setActiveTab(key as typeof activeTab)}
                    style={{
                      background: isActive ? "rgba(2, 132, 199, 0.03)" : "#F8FCFE",
                      border: "1px solid",
                      borderColor: isActive ? "rgba(2, 132, 199, 0.25)" : "#E0EAF0",
                      borderRadius: "12px",
                      padding: "24px",
                      cursor: isPlaying ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                      opacity: isPlaying && !isActive ? 0.35 : 1,
                      boxShadow: isActive ? "0 10px 20px rgba(2,132,199,0.02)" : "none"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <FiClock color={isActive ? "#0284C7" : "#8EA9B0"} size={14} />
                      <span className="font-jetbrains" style={{ fontSize: "11.5px", color: isActive ? "#0284C7" : "#8EA9B0", fontWeight: 700 }}>
                        {chapter.time} &mdash; {chapter.title}
                      </span>
                    </div>
                    <h3 className="font-bricolage" style={{ fontSize: "18px", fontWeight: 700, color: "#26231F", marginBottom: "8px" }}>{chapter.appName}</h3>
                    {isActive && (
                      <p className="font-hanken" style={{ fontSize: "14.5px", lineHeight: 1.6, color: "#4B5563", margin: 0 }}>
                        {chapter.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Side: High-Fidelity Salesforce Simulator */}
            <div>
              <div style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", border: "1px solid #E0EAF0", boxShadow: "0 40px 80px rgba(2,132,199,0.06)" }}>
                
                {/* Salesforce Window Header */}
                <div style={{ height: "40px", background: "#F8FCFE", display: "flex", alignItems: "center", padding: "0 18px", justifyContent: "space-between", borderBottom: "1px solid #E0EAF0" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F56" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27C93F" }}></div>
                  </div>
                  <span className="font-jetbrains" style={{ fontSize: "11px", color: "#8EA9B0", fontWeight: 700 }}>
                    {currentData.appName}
                  </span>
                  <div style={{ width: "40px" }}></div>
                </div>

                {/* Editor Content Area */}
                <div className="mock-app-grid" style={{ position: "relative", height: "350px", background: "#FFFFFF" }}>
                  
                  {/* Salesforce Sidebar mock options */}
                  <div className="mock-app-sidebar" style={{ background: "#F8FCFE", borderRight: "1px solid #E0EAF0", padding: "20px 14px" }}>
                    <div className="font-hanken" style={{ fontSize: "12px", fontWeight: 800, color: "#1F2937", display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
                      ☁ Salesforce CRM
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ fontSize: "11.5px", color: activeTab === "logging" ? "#0284C7" : "#4B5563", fontWeight: activeTab === "logging" ? 700 : 500 }}>Lead call notes</div>
                      <div style={{ fontSize: "11.5px", color: activeTab === "outreach" ? "#0284C7" : "#4B5563", fontWeight: activeTab === "outreach" ? 700 : 500 }}>LinkedIn Outreach</div>
                      <div style={{ fontSize: "11.5px", color: activeTab === "close" ? "#0284C7" : "#4B5563", fontWeight: activeTab === "close" ? 700 : 500 }}>Quote Incentives</div>
                    </div>
                  </div>

                  {/* CRM Page Canvas */}
                  <div style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "flex-start", position: "relative" }}>
                    <div className="font-bricolage" style={{ fontSize: "15px", fontWeight: 800, color: "#1F2937", marginBottom: "14px" }}>
                      {activeTab === "logging" ? "CRM Call Logging Update" : activeTab === "outreach" ? "Outreach Follow-up" : "Quote Discount Covenants"}
                    </div>
                    
                    <div style={{ border: "1px solid #E0EAF0", borderRadius: "8px", padding: "16px", background: "#FFFFFF", minHeight: "140px", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.01)" }}>
                      <div className="font-hanken" style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#1F2937", whiteSpace: "pre-line" }}>
                        {animState === "selecting" ? (
                          <span style={{ background: "rgba(2, 132, 199, 0.2)", padding: "2px 4px", borderRadius: "4px" }}>
                            {editorText}
                          </span>
                        ) : (
                          <span>{editorText}</span>
                        )}
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
                        boxShadow: "0 24px 48px rgba(2,132,199,0.08)",
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
                              background: animState === "listening" ? "#0284C7" : animState === "rewriting" ? "#E07B39" : animState === "done" ? "#2C9A5E" : "#8EA9B0" 
                            }}
                          ></div>
                          <span className="font-jetbrains" style={{ fontSize: "10.5px", color: "#8EA9B0", fontWeight: 700 }}>
                            {animState === "selecting" ? "1. SELECTING" : animState === "listening" ? "2. DICTATING STATEMENTS" : animState === "rewriting" ? "3. REWRITING CRM" : "LISUP ACTIVE"}
                          </span>
                        </div>
                        <FiZap size={11} color="#0284C7" />
                      </div>

                      <p className="font-hanken" style={{ fontSize: "13px", color: "#26231F", margin: 0, minHeight: "38px", display: "flex", alignItems: "center" }}>
                        {animState === "selecting" ? (
                          <span>Selecting direct drafting notes inside CRM...</span>
                        ) : animState === "listening" ? (
                          <span>Voice: &quot;<strong style={{ color: "#0284C7" }}>{visibleRawText}</strong>&quot;</span>
                        ) : animState === "rewriting" ? (
                          <span style={{ color: "#E07B39" }}>{currentData.optimizingText}</span>
                        ) : animState === "done" ? (
                          <span style={{ color: "#2C9A5E" }}>✓ CRM note values replaced in-place!</span>
                        ) : (
                          <span style={{ color: "#8EA9B0" }}>Click simulate button below...</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Simulated Bottom Controls */}
                <div style={{ background: "#F8FCFE", borderTop: "1px solid #E0EAF0", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="font-jetbrains" style={{ fontSize: "11px", color: "#8EA9B0", display: "flex", alignItems: "center", gap: "6px" }}>
                    <FiTrendingUp /> CRM CLIENT PORTAL ACTIVE
                  </div>
                  <div style={{ fontSize: "11px", color: "#8EA9B0", fontStyle: "italic" }}>
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
                    background: "#0284C7",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 32px",
                    color: "#FFF",
                    cursor: isPlaying ? "not-allowed" : "pointer",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    boxShadow: "0 10px 24px rgba(2, 132, 199, 0.2)",
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

        {/* Massive watermark logo */}
        <div className="font-bricolage" style={{ fontWeight: 800, fontSize: "clamp(120px, 20vw, 290px)", lineHeight: 0.7, letterSpacing: "-.04em", color: "#fff", opacity: 0.05, textAlign: "center", whiteSpace: "nowrap", paddingBottom: "20px", userSelect: "none" }}>
          Lisup
        </div>
      </footer>
    </div>
  );
}
