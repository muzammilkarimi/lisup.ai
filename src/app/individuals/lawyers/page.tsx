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

export default function LawyersPage() {
  const [activeTab, setActiveTab] = useState<"clause" | "client" | "takeaway">("clause");
  const [isPlaying, setIsPlaying] = useState(false);
  const [animState, setAnimState] = useState<DemoState>("idle");
  const [visibleRawText, setVisibleRawText] = useState("");
  const [editorText, setEditorText] = useState("");
  
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const storyChapters = {
    clause: {
      time: "11:00 AM",
      title: "Contract Clause Drafting",
      description: "Robert is drafting an employment agreement. Instead of looking up non-solicitation boilerplates, he dictates the direct intent. Lisup maps it in-place to formal legal terminology inside the document.",
      appName: "MS Word — Employment_Agreement.docx",
      initialText: "don't take our workers for a year after you leave",
      rawSpeech: "rewrite as a formal non-solicitation clause",
      rewritten: "The Contractor agrees that for a period of twelve (12) months following termination of this Agreement, they shall not directly or indirectly solicit, recruit, or hire any employee of the Company.",
      optimizingText: "⚡ MAPPING TO ENFORCEABLE LEGAL COVENANT..."
    },
    client: {
      time: "3:00 PM",
      title: "Client Case Status Update",
      description: "Communicating a court setback needs to sound reassuring but completely clear. Robert dictates his direct status update, and Lisup polishes the draft into a formal client status memo.",
      appName: "MS Word — Client_Update_Memo.docx",
      initialText: "judge said we need mediation before trial lets talk monday",
      rawSpeech: "professional client update outlining court mandated mediation",
      rewritten: "Dear Client, the court has ordered that both parties enter mediation prior to scheduling a trial date. Let's schedule a call on Monday to discuss our strategy. Best regards.",
      optimizingText: "⚡ COMPILING FORMAL CLIENT STATUS MEMO..."
    },
    takeaway: {
      time: "5:30 PM",
      title: "Case Brief Analysis Takeaway",
      description: "Summarizing court rulings for research databases. Robert dictates the high-level outline, selects it, and lets Lisup rewrite the summary into standard case law takeaway formatting.",
      appName: "MS Word — Research_Brief.docx",
      initialText: "smith lost because contract had no signatures case dismissed",
      rawSpeech: "format as standard legal case brief takeaway",
      rewritten: "Key Takeaway: The plaintiff's claim was dismissed due to the absence of valid signatures on the instrument, rendering the agreement unenforceable under the Statute of Frauds.",
      optimizingText: "⚡ GENERATING PRECEDENT LEGAL BRIEF SUMMARY..."
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
    <div style={{ background: "#F4F5F8", minHeight: "100vh", color: "#1A1A1A", position: "relative", overflowX: "hidden" }}>
      
      {/* Background Legal Grid */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(180, 83, 9, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(180, 83, 9, 0.015) 1px, transparent 1px)
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
              color: "#B45309",
              textDecoration: "none",
              fontSize: "13.5px",
              fontWeight: 600,
              marginBottom: "28px"
            }}
            data-cursor
          >
            <FiArrowLeft /> Back to home
          </Link>
          <div className="font-jetbrains" style={{ fontSize: "12.5px", color: "#B45309", letterSpacing: ".25em", textTransform: "uppercase" }}>
            {"// DAY IN THE LIFE OF A LEGAL ATTORNEY"}
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
            Draft Contracts & Briefs.<br />
            In-Place in MS Word.
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
            Robert drafts legal documents and contract clauses with strict precision. He dictates draft structures, highlights his clauses, and prompts Lisup to generate clean legal covenants.
          </p>
        </div>
      </section>

      {/* Story Timeline & Simulator Section */}
      <section style={{ padding: "0 0 100px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          
          <div className="role-layout-grid">
            
            {/* Left Side: Chronological Story Chapters */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 700, color: "#8E93B0", letterSpacing: "0.1em" }}>CHRONOLOGICAL TIMELINE</div>
              
              {Object.entries(storyChapters).map(([key, chapter]) => {
                const isActive = activeTab === key;
                return (
                  <div
                    key={key}
                    onClick={() => !isPlaying && setActiveTab(key as typeof activeTab)}
                    style={{
                      background: isActive ? "rgba(180, 83, 9, 0.03)" : "#F0F1F5",
                      border: "1px solid",
                      borderColor: isActive ? "rgba(180, 83, 9, 0.25)" : "#E0E2E7",
                      borderRadius: "12px",
                      padding: "24px",
                      cursor: isPlaying ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                      opacity: isPlaying && !isActive ? 0.35 : 1,
                      boxShadow: isActive ? "0 10px 20px rgba(180,83,9,0.02)" : "none"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <FiClock color={isActive ? "#B45309" : "#8E93B0"} size={14} />
                      <span className="font-jetbrains" style={{ fontSize: "11.5px", color: isActive ? "#B45309" : "#8E93B0", fontWeight: 700 }}>
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

            {/* Right Side: High-Fidelity Word Simulator */}
            <div>
              <div style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", border: "1px solid #E0E2E7", boxShadow: "0 40px 80px rgba(180,83,9,0.06)" }}>
                
                {/* Word Window Header */}
                <div style={{ height: "40px", background: "#F0F1F5", display: "flex", alignItems: "center", padding: "0 18px", justifyContent: "space-between", borderBottom: "1px solid #E0E2E7" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F56" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27C93F" }}></div>
                  </div>
                  <span className="font-jetbrains" style={{ fontSize: "11px", color: "#8E93B0", fontWeight: 700 }}>
                    {currentData.appName}
                  </span>
                  <div style={{ width: "40px" }}></div>
                </div>

                {/* Editor Content Area */}
                <div className="mock-app-grid" style={{ position: "relative", height: "350px", background: "#FFFFFF" }}>
                  
                  {/* MS Word Mock Sidebar */}
                  <div className="mock-app-sidebar" style={{ background: "#F0F1F5", borderRight: "1px solid #E0E2E7", padding: "20px 14px" }}>
                    <div className="font-hanken" style={{ fontSize: "12px", fontWeight: 800, color: "#1F2937", display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
                      📁 Legal Folders
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ fontSize: "11.5px", color: activeTab === "clause" ? "#B45309" : "#4B5563", fontWeight: activeTab === "clause" ? 700 : 500 }}>📄 Employment_Agmt</div>
                      <div style={{ fontSize: "11.5px", color: activeTab === "client" ? "#B45309" : "#4B5563", fontWeight: activeTab === "client" ? 700 : 500 }}>📄 Client_Memo</div>
                      <div style={{ fontSize: "11.5px", color: activeTab === "takeaway" ? "#B45309" : "#4B5563", fontWeight: activeTab === "takeaway" ? 700 : 500 }}>📄 Research_Brief</div>
                    </div>
                  </div>

                  {/* Document Page Canvas */}
                  <div style={{ padding: "28px", display: "flex", flexDirection: "column", justifyContent: "flex-start", position: "relative" }}>
                    <div className="font-bricolage" style={{ fontSize: "15px", fontWeight: 800, color: "#1F2937", marginBottom: "14px" }}>
                      {activeTab === "clause" ? "EMPLOYMENT COVENANTS" : activeTab === "client" ? "CASE STATUS MEMO" : "CASE PRECEDENT ANALYSIS"}
                    </div>
                    
                    <div style={{ border: "1px solid #E0E2E7", borderRadius: "8px", padding: "16px", background: "#FFFFFF", minHeight: "140px", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.01)" }}>
                      <div className="font-hanken" style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#1F2937", whiteSpace: "pre-line" }}>
                        {animState === "selecting" ? (
                          <span style={{ background: "rgba(180, 83, 9, 0.2)", padding: "2px 4px", borderRadius: "4px" }}>
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
                        boxShadow: "0 24px 48px rgba(180,83,9,0.08)",
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
                              background: animState === "listening" ? "#B45309" : animState === "rewriting" ? "#E07B39" : animState === "done" ? "#2C9A5E" : "#8E93B0" 
                            }}
                          ></div>
                          <span className="font-jetbrains" style={{ fontSize: "10.5px", color: "#8E93B0", fontWeight: 700 }}>
                            {animState === "selecting" ? "1. SELECTING COVENANT" : animState === "listening" ? "2. DICTATING STATEMENTS" : animState === "rewriting" ? "3. COMPILING LEGALESE" : "LISUP ACTIVE"}
                          </span>
                        </div>
                        <FiZap size={11} color="#B45309" />
                      </div>

                      <p className="font-hanken" style={{ fontSize: "13px", color: "#26231F", margin: 0, minHeight: "38px", display: "flex", alignItems: "center" }}>
                        {animState === "selecting" ? (
                          <span>Selecting direct drafting text inside document...</span>
                        ) : animState === "listening" ? (
                          <span>Voice: &quot;<strong style={{ color: "#B45309" }}>{visibleRawText}</strong>&quot;</span>
                        ) : animState === "rewriting" ? (
                          <span style={{ color: "#E07B39" }}>{currentData.optimizingText}</span>
                        ) : animState === "done" ? (
                          <span style={{ color: "#2C9A5E" }}>✓ Legal terms replaced in-place inside MS Word!</span>
                        ) : (
                          <span style={{ color: "#8E93B0" }}>Click simulate button below...</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Simulated Bottom Controls */}
                <div style={{ background: "#F0F1F5", borderTop: "1px solid #E0E2E7", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div className="font-jetbrains" style={{ fontSize: "11px", color: "#8E93B0", display: "flex", alignItems: "center", gap: "6px" }}>
                    <FiFileText /> MS WORD DOCUMENT ACTIVE
                  </div>
                  <div style={{ fontSize: "11px", color: "#8E93B0", fontStyle: "italic" }}>
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
                    background: "#B45309",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 32px",
                    color: "#FFF",
                    cursor: isPlaying ? "not-allowed" : "pointer",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    boxShadow: "0 10px 24px rgba(180, 83, 9, 0.2)",
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
