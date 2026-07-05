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
  FiCheck 
} from "react-icons/fi";

type DemoState = "idle" | "selecting" | "listening" | "rewriting" | "done";

export default function AccessibilityPage() {
  const [activeTab, setActiveTab] = useState<"health" | "standup" | "calendar">("health");
  const [isPlaying, setIsPlaying] = useState(false);
  const [animState, setAnimState] = useState<DemoState>("idle");
  const [visibleRawText, setVisibleRawText] = useState("");
  const [editorText, setEditorText] = useState("");
  
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const storyChapters = {
    health: {
      time: "10:30 AM",
      title: "Hands-Free Email Drafting",
      description: "James uses voice control exclusively. Instead of struggling with speech-to-text keyboards that capture filler words, he dictates a message naturally. Lisup clears fillers and formats it instantly.",
      appName: "Mail — Compose Update",
      initialText: "um so like i can't make it to the office today because my leg hurts",
      rawSpeech: "clean transcription and strip fillers",
      rewritten: "I won't be able to make it to the office today due to a leg injury. I'll be working remotely.",
      optimizingText: "⚡ FILTERING SPEECH FILLERS AND CRAP..."
    },
    standup: {
      time: "1:00 PM",
      title: "Team Standup Briefing",
      description: "Drafting bulleted progress updates hands-free. James records a stream of consciousness description of his tasks, and Lisup structures them into a standard standup format.",
      appName: "Slack — Standup Message",
      initialText: "uh yesterday i worked on the bugs and today i'll do the homepage sprint is fine",
      rawSpeech: "format as standard team standup bullet points",
      rewritten: `Standup Update:
• Yesterday: Completed critical bug fixes
• Today: Working on homepage design elements
• Status: Sprint remains fully on track`,
      optimizingText: "⚡ STRUCTURING VOICE TO STANDUP LIST..."
    },
    calendar: {
      time: "4:15 PM",
      title: "Calendar Sync Invitation",
      description: "Responding to calendar invitations. James dictates a shorthand confirmation, highlights the block, and dictates a formal calendar email response.",
      appName: "Mail — Compose RSVP",
      initialText: "hey lets meet up next week tuesday afternoon around two works",
      rawSpeech: "create a formal meeting response calendar request",
      rewritten: "I would be happy to meet next Tuesday. Does 2:00 PM work for you? Let me send over a calendar invite.",
      optimizingText: "⚡ COMPILING FORMAL CALENDAR RSVP..."
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
    <div style={{ background: "#0B0B0C", minHeight: "100vh", color: "#F4F4F5", position: "relative", overflowX: "hidden" }}>
      
      {/* Background Cyber Grid */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.015) 1px, transparent 1px)
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
              color: "#F97316",
              textDecoration: "none",
              fontSize: "13.5px",
              fontWeight: 600,
              marginBottom: "28px"
            }}
            data-cursor
          >
            <FiArrowLeft /> Back to home
          </Link>
          <div className="font-jetbrains" style={{ fontSize: "12.5px", color: "#F97316", letterSpacing: ".25em", textTransform: "uppercase" }}>
            {"// DAY IN THE LIFE OF A VOICE USER"}
          </div>
          <h1
            className="font-bricolage"
            style={{
              fontWeight: 800,
              fontSize: "clamp(36px, 6vw, 68px)",
              lineHeight: 0.95,
              color: "#FFF",
              letterSpacing: "-.04em",
              margin: "18px 0 24px",
              maxWidth: "920px",
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            Zero-Friction Dictation.<br />
            100% Hands-Free.
          </h1>
          <p
            className="font-hanken"
            style={{
              fontSize: "19px",
              lineHeight: 1.5,
              color: "#A1A1AA",
              maxWidth: "700px",
              margin: "0 auto 36px"
            }}
          >
            James writes emails, chat updates, and logs without touching a keyboard. He dictates direct instructions, selects blocks, and triggers Lisup to polish text in-place.
          </p>
        </div>
      </section>

      {/* Story Timeline & Simulator Section */}
      <section style={{ padding: "0 0 100px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          
          <div className="role-layout-grid">
            
            {/* Left Side: Chronological Story Chapters */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 700, color: "#52525B", letterSpacing: "0.1em" }}>CHRONOLOGICAL TIMELINE</div>
              
              {Object.entries(storyChapters).map(([key, chapter]) => {
                const isActive = activeTab === key;
                return (
                  <div
                    key={key}
                    onClick={() => !isPlaying && setActiveTab(key as typeof activeTab)}
                    style={{
                      background: isActive ? "rgba(249, 115, 22, 0.04)" : "transparent",
                      border: "1px solid",
                      borderColor: isActive ? "rgba(249, 115, 22, 0.25)" : "#27272A",
                      borderRadius: "12px",
                      padding: "24px",
                      cursor: isPlaying ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                      opacity: isPlaying && !isActive ? 0.35 : 1,
                      boxShadow: isActive ? "0 10px 20px rgba(249,115,22,0.02)" : "none"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <FiClock color={isActive ? "#F97316" : "#52525B"} size={14} />
                      <span className="font-jetbrains" style={{ fontSize: "11.5px", color: isActive ? "#F97316" : "#52525B", fontWeight: 700 }}>
                        {chapter.time} &mdash; {chapter.title}
                      </span>
                    </div>
                    <h3 className="font-bricolage" style={{ fontSize: "18px", fontWeight: 700, color: "#FFF", marginBottom: "8px" }}>{chapter.appName}</h3>
                    {isActive && (
                      <p className="font-hanken" style={{ fontSize: "14.5px", lineHeight: 1.6, color: "#A1A1AA", margin: 0 }}>
                        {chapter.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Side: High-Fidelity Simulator */}
            <div>
              <div style={{ background: "#18181A", borderRadius: "16px", overflow: "hidden", border: "1px solid #27272A", boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
                
                {/* Window Header */}
                <div style={{ height: "40px", background: "#202023", display: "flex", alignItems: "center", padding: "0 18px", justifyContent: "space-between", borderBottom: "1px solid #121214" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F56" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27C93F" }}></div>
                  </div>
                  <span className="font-jetbrains" style={{ fontSize: "11px", color: "#71717A", fontWeight: 700 }}>
                    {currentData.appName}
                  </span>
                  <div style={{ width: "40px" }}></div>
                </div>

                {/* Editor Content Area */}
                <div className="mock-app-grid" style={{ position: "relative", height: "350px", background: "#141416" }}>
                  
                  {/* High Contrast Sidebar */}
                  <div className="mock-app-sidebar" style={{ background: "#18181A", borderRight: "1px solid #27272A", padding: "20px 14px" }}>
                    <div className="font-hanken" style={{ fontSize: "12px", fontWeight: 800, color: "#FFF", display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
                      ✉ Accessibility
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ fontSize: "11.5px", color: activeTab === "health" ? "#F97316" : "#A1A1AA", fontWeight: activeTab === "health" ? 700 : 500 }}>Compose Mail</div>
                      <div style={{ fontSize: "11.5px", color: activeTab === "standup" ? "#F97316" : "#A1A1AA", fontWeight: activeTab === "standup" ? 700 : 500 }}>Standup Notes</div>
                      <div style={{ fontSize: "11.5px", color: activeTab === "calendar" ? "#F97316" : "#A1A1AA", fontWeight: activeTab === "calendar" ? 700 : 500 }}>Calendar RSVP</div>
                    </div>
                  </div>

                  {/* Mail Compose Workspace */}
                  <div style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "flex-start", position: "relative" }}>
                    <div className="font-bricolage" style={{ fontSize: "15px", fontWeight: 800, color: "#FFF", marginBottom: "14px" }}>
                      {activeTab === "health" ? "Compose Mail Update" : activeTab === "standup" ? "Daily Standup Update" : "Calendar Sync Invite"}
                    </div>
                    
                    <div style={{ border: "1px solid #27272A", borderRadius: "8px", padding: "16px", background: "#18181A", minHeight: "140px" }}>
                      <div className="font-hanken" style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#FFF", whiteSpace: "pre-line" }}>
                        {animState === "selecting" ? (
                          <span style={{ background: "rgba(249, 115, 22, 0.25)", color: "#FFF", padding: "2px 4px", borderRadius: "4px" }}>
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
                        background: "rgba(24, 24, 26, 0.96)", 
                        border: "1px solid #27272A", 
                        borderRadius: "14px", 
                        padding: "16px", 
                        boxShadow: "0 24px 48px rgba(0,0,0,0.8)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid #27272A", paddingBottom: "10px", marginBottom: "12px", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div 
                            style={{ 
                              width: "8px", 
                              height: "8px", 
                              borderRadius: "50%", 
                              background: animState === "listening" ? "#F97316" : animState === "rewriting" ? "#E07B39" : animState === "done" ? "#10B981" : "#52525B" 
                            }}
                          ></div>
                          <span className="font-jetbrains" style={{ fontSize: "10.5px", color: "#A1A1AA", fontWeight: 700 }}>
                            {animState === "selecting" ? "1. SELECTING" : animState === "listening" ? "2. DICTATING DICTION" : animState === "rewriting" ? "3. REWRITING ACCESSIBILITY" : "LISUP ACTIVE"}
                          </span>
                        </div>
                        <FiZap size={11} color="#F97316" />
                      </div>

                      <p className="font-hanken" style={{ fontSize: "13px", color: "#FFF", margin: 0, minHeight: "38px", display: "flex", alignItems: "center" }}>
                        {animState === "selecting" ? (
                          <span>Selecting speech text block inside composer...</span>
                        ) : animState === "listening" ? (
                          <span>Voice: &quot;<strong style={{ color: "#F97316" }}>{visibleRawText}</strong>&quot;</span>
                        ) : animState === "rewriting" ? (
                          <span style={{ color: "#E07B39" }}>{currentData.optimizingText}</span>
                        ) : animState === "done" ? (
                          <span style={{ color: "#10B981" }}>✓ Corrected in-place inside composer!</span>
                        ) : (
                          <span style={{ color: "#52525B" }}>Click simulate button below...</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Simulated Bottom Controls */}
                <div style={{ background: "#0F0F10", borderTop: "1px solid #27272A", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="font-jetbrains" style={{ fontSize: "11px", color: "#52525B", display: "flex", alignItems: "center", gap: "6px" }}>
                    <FiCheck /> EMAIL CLIENT SESSION ACTIVE
                  </div>
                  <div style={{ fontSize: "11px", color: "#52525B", fontStyle: "italic" }}>
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
                    background: "#F97316",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 32px",
                    color: "#0F0F10",
                    cursor: isPlaying ? "not-allowed" : "pointer",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    boxShadow: "0 10px 24px rgba(249, 115, 22, 0.2)",
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
