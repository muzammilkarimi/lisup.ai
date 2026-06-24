"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "../../Navbar";
import { 
  FiClock, 
  FiArrowLeft, 
  FiPlay, 
  FiRefreshCw, 
  FiZap, 
  FiBookOpen 
} from "react-icons/fi";

type DemoState = "idle" | "selecting" | "listening" | "rewriting" | "done";

export default function StudentsPage() {
  const [activeTab, setActiveTab] = useState<"notes" | "thesis" | "flashcard">("notes");
  const [isPlaying, setIsPlaying] = useState(false);
  const [animState, setAnimState] = useState<DemoState>("idle");
  const [visibleRawText, setVisibleRawText] = useState("");
  const [editorText, setEditorText] = useState("");
  
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const storyChapters = {
    notes: {
      time: "9:30 AM",
      title: "Biology Lecture Capture",
      description: "During a fast-paced lecture, Ethan records raw, fragmented audio snippets directly into Google Docs. Rather than spending hours cleaning transcripts later, he highlights the block and dictates format updates in-place.",
      appName: "Google Docs — Biology 101 Notes",
      initialText: "photosynthesis splits water release oxygen carbon dioxide turns to sugar",
      rawSpeech: "format as bulleted lecture notes with bold definitions",
      rewritten: `Lecture Notes: Photosynthesis
• Light reactions: Water molecules split to release oxygen.
• Calvin cycle: Carbon dioxide is fixed to generate sugars.
• Energy conversion: Light energy is stored as chemical compounds.`,
      optimizingText: "⚡ STRUCTURING ACADEMIC LECTURE NOTES..."
    },
    thesis: {
      time: "2:00 PM",
      title: "Thesis Paragraph Drafting",
      description: "Ethan starts writing his term paper thesis. Typing out formal academic prose directly is exhausting. He dictates a rough thematic brain-dump, selects it, and instructs Lisup to write high-level academic sentences.",
      appName: "Google Docs — Research Paper Draft",
      initialText: "i want to write about how social media affects attention span in teens bad sleep and concentration",
      rawSpeech: "structure as an academic essay introduction paragraph",
      rewritten: "Recent studies indicate a strong correlation between excessive social media usage and reduced attention spans in adolescents. This paper examines the cognitive impact on teenage sleep patterns and daily concentration.",
      optimizingText: "⚡ TRANSLATING TO FORMAL ACADEMIC PROSE..."
    },
    flashcard: {
      time: "8:30 PM",
      title: "Active Study Prep",
      description: "Preparing study flashcards for final exams. Ethan dumps messy facts from a textbook, highlights the block, and dictates card specifications to generate clean Q&A flashcards instantly.",
      appName: "Google Docs — Flashcards Study Guide",
      initialText: "mitochondria power house of cell ATP production double membrane",
      rawSpeech: "create a concise Q&A flashcard",
      rewritten: `Q: What is the main function and structure of the mitochondria?
A: Often called the powerhouse of the cell, it produces ATP (energy) and features a double-membrane structure.`,
      optimizingText: "⚡ GENERATING STUDY GUIDE FLASHCARD..."
    }
  };

  const currentData = storyChapters[activeTab];

  useEffect(() => {
    setEditorText(currentData.initialText);
    setAnimState("idle");
    setVisibleRawText("");
    clearAllTimeouts();
  }, [activeTab]);

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
      let chars = currentData.rawSpeech.split("");
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
    <div style={{ background: "#F5F8FF", minHeight: "100vh", color: "#1A1A1A", position: "relative", overflowX: "hidden" }}>
      
      {/* Background Academic Grid */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.015) 1px, transparent 1px)
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
              color: "#6366F1",
              textDecoration: "none",
              fontSize: "13.5px",
              fontWeight: 600,
              marginBottom: "28px"
            }}
            data-cursor
          >
            <FiArrowLeft /> Back to home
          </Link>
          <div className="font-jetbrains" style={{ fontSize: "12.5px", color: "#6366F1", letterSpacing: ".25em", textTransform: "uppercase" }}>
            // DAY IN THE LIFE OF A STUDENT
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
            Structure Lecture Material.<br />
            In-Place in Google Docs.
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
            Ethan completes study routines, essays, and notes rapidly. He speaks thoughts directly, highlights his drafts, and dictates structure directives to watch Lisup rewrite in-place.
          </p>
        </div>
      </section>

      {/* Story Timeline & Simulator Section */}
      <section style={{ padding: "0 0 100px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          
          <div className="role-layout-grid">
            
            {/* Left Side: Chronological Story Chapters */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 700, color: "#8E9BB0", letterSpacing: "0.1em" }}>CHRONOLOGICAL TIMELINE</div>
              
              {Object.entries(storyChapters).map(([key, chapter]) => {
                const isActive = activeTab === key;
                return (
                  <div
                    key={key}
                    onClick={() => !isPlaying && setActiveTab(key as any)}
                    style={{
                      background: isActive ? "rgba(99, 102, 241, 0.03)" : "#FAFBFD",
                      border: "1px solid",
                      borderColor: isActive ? "rgba(99, 102, 241, 0.25)" : "#E2E7EF",
                      borderRadius: "12px",
                      padding: "24px",
                      cursor: isPlaying ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                      opacity: isPlaying && !isActive ? 0.35 : 1,
                      boxShadow: isActive ? "0 10px 20px rgba(99,102,241,0.02)" : "none"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <FiClock color={isActive ? "#6366F1" : "#8E9BB0"} size={14} />
                      <span className="font-jetbrains" style={{ fontSize: "11.5px", color: isActive ? "#6366F1" : "#8E9BB0", fontWeight: 700 }}>
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

            {/* Right Side: High-Fidelity Docs Simulator */}
            <div>
              <div style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", border: "1px solid #E2E7EF", boxShadow: "0 40px 80px rgba(99,102,241,0.06)" }}>
                
                {/* Docs Window Header */}
                <div style={{ height: "40px", background: "#FAFBFD", display: "flex", alignItems: "center", padding: "0 18px", justifyContent: "space-between", borderBottom: "1px solid #E2E7EF" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F56" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27C93F" }}></div>
                  </div>
                  <span className="font-jetbrains" style={{ fontSize: "11px", color: "#8E9BB0", fontWeight: 700 }}>
                    {currentData.appName}
                  </span>
                  <div style={{ width: "40px" }}></div>
                </div>

                {/* Editor Content Area */}
                <div className="mock-app-grid" style={{ position: "relative", height: "350px", background: "#FFFFFF" }}>
                  
                  {/* Google Docs Sidebar mock folders */}
                  <div className="mock-app-sidebar" style={{ background: "#FAFBFD", borderRight: "1px solid #E2E7EF", padding: "20px 14px" }}>
                    <div className="font-hanken" style={{ fontSize: "12px", fontWeight: 800, color: "#1F2937", display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
                      📂 Semester Notes
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ fontSize: "11.5px", color: activeTab === "notes" ? "#6366F1" : "#4B5563", fontWeight: activeTab === "notes" ? 700 : 500 }}>🌿 Biology 101</div>
                      <div style={{ fontSize: "11.5px", color: activeTab === "thesis" ? "#6366F1" : "#4B5563", fontWeight: activeTab === "thesis" ? 700 : 500 }}>📝 Research Paper</div>
                      <div style={{ fontSize: "11.5px", color: activeTab === "flashcard" ? "#6366F1" : "#4B5563", fontWeight: activeTab === "flashcard" ? 700 : 500 }}>⚡ Exam Study</div>
                    </div>
                  </div>

                  {/* Google Docs Page Canvas */}
                  <div style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "flex-start", position: "relative" }}>
                    <div className="font-bricolage" style={{ fontSize: "17px", fontWeight: 800, color: "#1F2937", marginBottom: "14px" }}>
                      {activeTab === "notes" ? "🌿 Biology 101 Notes" : activeTab === "thesis" ? "📝 Thesis Draft" : "⚡ Study Flashcards"}
                    </div>
                    
                    <div style={{ border: "1px solid #E2E7EF", borderRadius: "8px", padding: "16px", background: "#FFFFFF", minHeight: "140px", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.01)" }}>
                      <div className="font-hanken" style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#1F2937", whiteSpace: "pre-line" }}>
                        {animState === "selecting" ? (
                          <span style={{ background: "rgba(99, 102, 241, 0.2)", padding: "2px 4px", borderRadius: "4px" }}>
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
                        boxShadow: "0 24px 48px rgba(99,102,241,0.08)",
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
                              background: animState === "listening" ? "#6366F1" : animState === "rewriting" ? "#E07B39" : animState === "done" ? "#2C9A5E" : "#8E9BB0" 
                            }}
                          ></div>
                          <span className="font-jetbrains" style={{ fontSize: "10.5px", color: "#8E9BB0", fontWeight: 700 }}>
                            {animState === "selecting" ? "1. SELECTING TEXT" : animState === "listening" ? "2. RECORDING CLASS" : animState === "rewriting" ? "3. WRITING DOCS" : "LISUP ACTIVE"}
                          </span>
                        </div>
                        <FiZap size={11} color="#6366F1" />
                      </div>

                      <p className="font-hanken" style={{ fontSize: "13px", color: "#26231F", margin: 0, minHeight: "38px", display: "flex", alignItems: "center" }}>
                        {animState === "selecting" ? (
                          <span>Selecting study notes inside Google Docs...</span>
                        ) : animState === "listening" ? (
                          <span>Voice: &quot;<strong style={{ color: "#6366F1" }}>{visibleRawText}</strong>&quot;</span>
                        ) : animState === "rewriting" ? (
                          <span style={{ color: "#E07B39" }}>{currentData.optimizingText}</span>
                        ) : animState === "done" ? (
                          <span style={{ color: "#2C9A5E" }}>✓ Content structured in-place inside Google Docs!</span>
                        ) : (
                          <span style={{ color: "#8E9BB0" }}>Click simulate button below...</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Simulated Bottom Controls */}
                <div style={{ background: "#FAFBFD", borderTop: "1px solid #E2E7EF", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="font-jetbrains" style={{ fontSize: "11px", color: "#8E9BB0", display: "flex", alignItems: "center", gap: "6px" }}>
                    <FiBookOpen /> GOOGLE DOCS EDITOR ACTIVE
                  </div>
                  <div style={{ fontSize: "11px", color: "#8E9BB0", fontStyle: "italic" }}>
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
                    background: "#6366F1",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 32px",
                    color: "#FFF",
                    cursor: isPlaying ? "not-allowed" : "pointer",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    boxShadow: "0 10px 24px rgba(99, 102, 241, 0.2)",
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

        {/* Massive watermark logo */}
        <div className="font-bricolage" style={{ fontWeight: 800, fontSize: "clamp(120px, 20vw, 290px)", lineHeight: 0.7, letterSpacing: "-.04em", color: "#fff", opacity: 0.05, textAlign: "center", whiteSpace: "nowrap", paddingBottom: "20px", userSelect: "none" }}>
          Lisup
        </div>
      </footer>
    </div>
  );
}
