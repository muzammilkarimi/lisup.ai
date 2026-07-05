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
  FiFileText 
} from "react-icons/fi";

type DemoState = "idle" | "selecting" | "listening" | "rewriting" | "done";

export default function CreatorsPage() {
  const [activeTab, setActiveTab] = useState<"brainstorm" | "script" | "newsletter">("brainstorm");
  const [isPlaying, setIsPlaying] = useState(false);
  const [animState, setAnimState] = useState<DemoState>("idle");
  const [visibleRawText, setVisibleRawText] = useState("");
  const [editorText, setEditorText] = useState("");
  
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const storyChapters = {
    brainstorm: {
      time: "11:00 AM",
      title: "Content Brainstorming Session",
      description: "Leo starts planning his next video. Instead of organizing bullet points manually, he speaks a chaotic train of thought into Notion. Lisup parses it and formats it into structured concepts instantly.",
      appName: "Notion — 💡 Video Briefs",
      initialText: "video idea how AI is changing coding workflows in 2026 let's focus on in place rewriting",
      rawSpeech: "format as a video concept with bullet points",
      rewritten: `Video Concept: AI Coding Workflows in 2026
• Focus: In-place voice dictation
• Goal: Zero context-switching
• Tech: Natural language editing`,
      optimizingText: "⚡ FORMATTING NOTION BULLETIN BLOCKS..."
    },
    script: {
      time: "2:30 PM",
      title: "Hook Drafting & Copywriting",
      description: "Writing engaging video intro hooks can take dozens of typings and deletions. Leo highlights a flat introductory sentence, dictates a creative directive, and lets Lisup write the high-impact copy.",
      appName: "Notion — 📝 Intro Scripts",
      initialText: "imagine sitting in front of a screen typing is slow why not speak and edit directly inside notion",
      rawSpeech: "make this a hook for a YouTube script, sound excited",
      rewritten: "What if you could think at the speed of light, and watch your thoughts write themselves directly inside Notion—no keyboards, no typos, just pure flow?",
      optimizingText: "⚡ INJECTING DYNAMIC CREATIVE HOOK..."
    },
    newsletter: {
      time: "5:00 PM",
      title: "Weekly Newsletter Hook",
      description: "End of the day newsletter writing. Leo dictates a quick conversational synopsis of his discoveries, and Lisup polishes it into a high-click newsletter intro block.",
      appName: "Notion — 🚀 Weekly Newsletter",
      initialText: "hey subscribers check out the new tool lisup for writing",
      rawSpeech: "write a catchy preview paragraph for my weekly newsletter",
      rewritten: "Hey writers! This week we're exploring Lisup—an in-place voice rewriting tool that turns messy dictation into polished copy, right where your cursor is.",
      optimizingText: "⚡ REWRITING NEWSLETTER SUMMARY..."
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
    <div style={{ background: "#FCFAFD", minHeight: "100vh", color: "#1A1A1A", position: "relative", overflowX: "hidden" }}>
      
      {/* Background Cyber/Creative Grid */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.015) 1px, transparent 1px)
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
              color: "#8B5CF6",
              textDecoration: "none",
              fontSize: "13.5px",
              fontWeight: 600,
              marginBottom: "28px"
            }}
            data-cursor
          >
            <FiArrowLeft /> Back to home
          </Link>
          <div className="font-jetbrains" style={{ fontSize: "12.5px", color: "#8B5CF6", letterSpacing: ".25em", textTransform: "uppercase" }}>
            {"// DAY IN THE LIFE OF A WRITER"}
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
            Structure Creative Outlines.<br />
            In-Place in Notion.
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
            Draft outlines, scripts, and content. Highlight a paragraph, speak formatting or style directives, and watch Lisup format and write inside Notion.
          </p>
        </div>
      </section>

      {/* Story Timeline & Simulator Section */}
      <section style={{ padding: "0 0 100px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          
          <div className="role-layout-grid">
            
            {/* Left Side: Chronological Story Chapters */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 700, color: "#8B868F", letterSpacing: "0.1em" }}>CHRONOLOGICAL TIMELINE</div>
              
              {Object.entries(storyChapters).map(([key, chapter]) => {
                const isActive = activeTab === key;
                return (
                  <div
                    key={key}
                    onClick={() => !isPlaying && setActiveTab(key as typeof activeTab)}
                    style={{
                      background: isActive ? "rgba(139, 92, 246, 0.03)" : "#FAF8FC",
                      border: "1px solid",
                      borderColor: isActive ? "rgba(139, 92, 246, 0.25)" : "#EBE5F0",
                      borderRadius: "12px",
                      padding: "24px",
                      cursor: isPlaying ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                      opacity: isPlaying && !isActive ? 0.35 : 1,
                      boxShadow: isActive ? "0 10px 20px rgba(139,92,246,0.02)" : "none"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <FiClock color={isActive ? "#8B5CF6" : "#8B868F"} size={14} />
                      <span className="font-jetbrains" style={{ fontSize: "11.5px", color: isActive ? "#8B5CF6" : "#8B868F", fontWeight: 700 }}>
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

            {/* Right Side: High-Fidelity Notion Simulator */}
            <div>
              <div style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", border: "1px solid #EBE5F0", boxShadow: "0 40px 80px rgba(139,92,246,0.06)" }}>
                
                {/* Notion Window Header */}
                <div style={{ height: "40px", background: "#FAF8FC", display: "flex", alignItems: "center", padding: "0 18px", justifyContent: "space-between", borderBottom: "1px solid #EBE5F0" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F56" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27C93F" }}></div>
                  </div>
                  <span className="font-jetbrains" style={{ fontSize: "11px", color: "#8B868F", fontWeight: 700 }}>
                    {currentData.appName}
                  </span>
                  <div style={{ width: "40px" }}></div>
                </div>

                {/* Editor Content Area */}
                <div className="mock-app-grid" style={{ position: "relative", height: "350px", background: "#FFFFFF" }}>
                  
                  {/* Notion Sidebar Mock */}
                  <div className="mock-app-sidebar" style={{ background: "#FAF8FC", borderRight: "1px solid #EBE5F0", padding: "20px 14px" }}>
                    <div className="font-hanken" style={{ fontSize: "12px", fontWeight: 800, color: "#26231F", display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
                      📝 Creative Hub
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ fontSize: "11.5px", color: activeTab === "brainstorm" ? "#8B5CF6" : "#6B6560", fontWeight: activeTab === "brainstorm" ? 700 : 500 }}>💡 Video Briefs</div>
                      <div style={{ fontSize: "11.5px", color: activeTab === "script" ? "#8B5CF6" : "#6B6560", fontWeight: activeTab === "script" ? 700 : 500 }}>📝 Intro Scripts</div>
                      <div style={{ fontSize: "11.5px", color: activeTab === "newsletter" ? "#8B5CF6" : "#6B6560", fontWeight: activeTab === "newsletter" ? 700 : 500 }}>🚀 Newsletters</div>
                    </div>
                  </div>

                  {/* Notion Workspace */}
                  <div style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "flex-start", position: "relative" }}>
                    <div className="font-bricolage" style={{ fontSize: "22px", fontWeight: 800, color: "#26231F", marginBottom: "14px" }}>
                      {activeTab === "brainstorm" ? "💡 Video Briefs" : activeTab === "script" ? "📝 Intro Scripts" : "🚀 Weekly Newsletter"}
                    </div>
                    
                    <div className="font-hanken" style={{ fontSize: "14px", lineHeight: 1.6, color: "#26231F", whiteSpace: "pre-line" }}>
                      {animState === "selecting" ? (
                        <span style={{ background: "rgba(139, 92, 246, 0.2)", padding: "2px 4px", borderRadius: "4px" }}>
                          {editorText}
                        </span>
                      ) : (
                        <span>{editorText}</span>
                      )}
                    </div>

                    {/* Floating Lisup Desktop Widget */}
                    <div 
                      className="mock-lisup-widget-overlay"
                      style={{ 
                        background: "rgba(253, 246, 240, 0.96)", 
                        border: "1px solid #ECE7DF", 
                        borderRadius: "14px", 
                        padding: "16px", 
                        boxShadow: "0 24px 48px rgba(139,92,246,0.08)",
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
                              background: animState === "listening" ? "#8B5CF6" : animState === "rewriting" ? "#E07B39" : animState === "done" ? "#2C9A5E" : "#8B868F" 
                            }}
                          ></div>
                          <span className="font-jetbrains" style={{ fontSize: "10.5px", color: "#8B868F", fontWeight: 700 }}>
                            {animState === "selecting" ? "1. SELECTING" : animState === "listening" ? "2. DICTATING DICTION" : animState === "rewriting" ? "3. REWRITING DOCS" : "LISUP ACTIVE"}
                          </span>
                        </div>
                        <FiZap size={11} color="#8B5CF6" />
                      </div>

                      <p className="font-hanken" style={{ fontSize: "13px", color: "#26231F", margin: 0, minHeight: "38px", display: "flex", alignItems: "center" }}>
                        {animState === "selecting" ? (
                          <span>Selecting text outline inside Notion...</span>
                        ) : animState === "listening" ? (
                          <span>Voice: &quot;<strong style={{ color: "#8B5CF6" }}>{visibleRawText}</strong>&quot;</span>
                        ) : animState === "rewriting" ? (
                          <span style={{ color: "#E07B39" }}>{currentData.optimizingText}</span>
                        ) : animState === "done" ? (
                          <span style={{ color: "#2C9A5E" }}>✓ Updated Notion blocks in-place!</span>
                        ) : (
                          <span style={{ color: "#8B868F" }}>Click simulation button below...</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Simulated Bottom Controls */}
                <div style={{ background: "#FAF8FC", borderTop: "1px solid #EBE5F0", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="font-jetbrains" style={{ fontSize: "11px", color: "#8B868F", display: "flex", alignItems: "center", gap: "6px" }}>
                    <FiFileText /> NOTION ACTIVE DOCUMENT
                  </div>
                  <div style={{ fontSize: "11px", color: "#8B868F", fontStyle: "italic" }}>
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
                    background: "#8B5CF6",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 32px",
                    color: "#FFF",
                    cursor: isPlaying ? "not-allowed" : "pointer",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    boxShadow: "0 10px 24px rgba(139, 92, 246, 0.2)",
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
