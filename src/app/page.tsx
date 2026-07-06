"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import { WINDOWS_DOWNLOAD_LABEL, WINDOWS_DOWNLOAD_URL } from "./download";
import { 
  SiNotion, 
  SiSlack, 
  SiGmail, 
  SiWhatsapp, 
  SiFigma, 
  SiDiscord, 
  SiGoogledocs,
  SiGoogle
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { 
  PiMicrosoftWordLogo, 
  PiMicrosoftExcelLogo, 
  PiMicrosoftOutlookLogo 
} from "react-icons/pi";

const SENTENCES = [
  [
    ["So", 1],
    ["um,", 1],
    ["I", 0],
    ["think", 0],
    ["we", 0],
    ["should", 0],
    ["just", 1],
    ["ship", 0],
    ["the", 0],
    ["redesign", 0],
    ["by", 0],
    ["Friday.", 0],
  ],
  [
    ["Can", 0],
    ["you", 0],
    ["uh,", 1],
    ["like,", 1],
    ["push", 0],
    ["our", 0],
    ["call", 0],
    ["to", 0],
    ["tomorrow?", 0],
  ],
  [
    ["The", 0],
    ["budget", 0],
    ["is", 0],
    ["like", 1],
    ["um", 1],
    ["basically", 1],
    ["approved", 0],
    ["already.", 0],
  ],
];

const TONES = {
  Formal: "I wanted to confirm whether our call scheduled for tomorrow is still going ahead.",
  Casual: "Hey! Are we still good for the call tomorrow?",
  Funny: "Knock knock — is tomorrow's call still alive, or did it quietly ghost us?",
  Polite: "Just a gentle note to check whether tomorrow's call still works for you.",
  Social: "Still on for tomorrow's call? Drop me a quick yes and we're set.",
};

const WH_STEPS = [
  { status: "READY", text: "", prog: "12%" },
  {
    status: "LISTENING…",
    text: "um so i think we should ship the… the redesign by friday",
    prog: "45%",
  },
  {
    status: "CLEANING UP…",
    text: "Let's ship the redesign by Friday.",
    prog: "78%",
  },
  {
    status: "INJECTED ✓",
    text: "Let's ship the redesign by Friday.",
    prog: "100%",
  },
];

const TYPER_LINES = [
  "Let's ship the redesign by Friday.",
  "Schedule the sync for 11:30, not 11.",
  "Draft a reply and sign it for me.",
  "Translate this note into Spanish.",
];

function MobileCommandSimulator() {
  return (
    <div className="mobile-annotation-card show-annotations">
      {/* Raw transcript with dynamic inline annotation targets */}
      <div className="mobile-raw-area font-hanken">
        <div 
          className="widget-clipboard-context" 
          style={{ 
            marginBottom: "16px", 
            background: "rgba(255,255,255,0.03)", 
            borderColor: "rgba(255,255,255,0.1)",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px dashed rgba(255,255,255,0.15)"
          }}
        >
          <div className="widget-clipboard-label" style={{ color: "rgba(255,255,255,0.5)", fontSize: "9px" }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "4px", display: "inline-block", verticalAlign: "middle" }}>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            TEXT TO REWRITE (CLIPBOARD)
          </div>
          <div className="widget-clipboard-text" style={{ color: "#ffffff", fontSize: "11px", whiteSpace: "normal", marginTop: "4px" }}>
            &ldquo;hey, i can&apos;t make the call today. let&apos;s meet tomorrow.&rdquo;
          </div>
        </div>

        <div style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", marginBottom: "8px", textTransform: "uppercase" }}>
          Dictated Command:
        </div>

        <div style={{ minHeight: "40px", lineHeight: "2.2" }}>
          <span className="mobile-annotated-word added-to-dictionary" style={{ marginRight: "6px" }}>
            make this professional and formal
            <span className="mobile-annotation-badge">Voice Command</span>
          </span>{" "}
          <span className="mobile-annotated-word removed-filler" style={{ marginRight: "6px", color: "rgba(255,255,255,0.3)" }}>
            please
            <span className="mobile-annotation-badge">Removed filler</span>
          </span>
        </div>
      </div>

      {/* Polished Card Container */}
      <div className="mobile-polished-card">
        <div className="mobile-polished-text font-hanken">
          Unfortunately, I will not be able to attend today&apos;s meeting. Could we reschedule for tomorrow?
        </div>

        {/* Bottom Toolbar */}
        <div className="mobile-card-toolbar">
          <div className="mobile-toolbar-icons">
            <span style={{ fontWeight: 800 }}>B</span>
            <span style={{ fontStyle: "italic", fontFamily: "serif" }}>I</span>
            <span style={{ textDecoration: "line-through" }}>S</span>
            <span>↻</span>
            <span>::</span>
            <span>:=</span>
            <span>&lt;/&gt;</span>
          </div>
          <button className="mobile-toolbar-action">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileTranscribeSimulator() {
  return (
    <div className="mobile-annotation-card show-annotations">
      {/* Raw transcript with dynamic inline annotation targets */}
      <div className="mobile-raw-area font-hanken">
        <div style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em", marginBottom: "8px", textTransform: "uppercase" }}>
          Speaking (Raw Input):
        </div>

        <div style={{ minHeight: "56px", lineHeight: "2.2" }}>
          <span className="mobile-annotated-word removed-filler" style={{ marginRight: "6px", color: "rgba(255,255,255,0.3)" }}>
            uh yeah
            <span className="mobile-annotation-badge">Removed filler</span>
          </span>{" "}
          so I think we should probably check with Jenny from legal I think she said something about the NDA being like not ready yet or maybe she did send it I&apos;m not sure, and um we should cc{" "}
          <span className="mobile-annotated-word added-to-dictionary" style={{ marginRight: "6px" }}>
            Davee
            <span className="mobile-annotation-badge">Added to Dictionary</span>
          </span>{" "}
          maybe... sure to update the Q2 um goals{" "}
          <span className="mobile-annotated-word fixed-spelling" style={{ marginRight: "6px" }}>
            slidez
            <span className="mobile-annotation-badge">Fixed spelling</span>
          </span>{" "}
          before Friday&apos;s thing, I forget the link but it&apos;s probably in Slack somewhere..
        </div>
      </div>

      {/* Polished Card Container */}
      <div className="mobile-polished-card">
        <div className="mobile-polished-text font-hanken">
          Let&apos;s reach out to Jenny from Legal—she may have mentioned the NDA isn&apos;t finalized yet, or possibly already sent it. Let&apos;s also CC Dave. Finally, make sure the Q2 Goals slide is updated before Friday&apos;s review. The link should be in Slack.
        </div>

        {/* Bottom Toolbar */}
        <div className="mobile-card-toolbar">
          <div className="mobile-toolbar-icons">
            <span style={{ fontWeight: 800 }}>B</span>
            <span style={{ fontStyle: "italic", fontFamily: "serif" }}>I</span>
            <span style={{ textDecoration: "line-through" }}>S</span>
            <span>↻</span>
            <span>::</span>
            <span>:=</span>
            <span>&lt;/&gt;</span>
          </div>
          <button className="mobile-toolbar-action">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

const DEMO_SENTENCES = [
  {
    id: 0,
    label: "Casual Speech (Slack)",
    app: "slack" as const,
    raw: [
      { text: "um ", isFiller: true },
      { text: "so ", isFiller: false },
      { text: "i ", isFiller: false },
      { text: "think ", isFiller: false },
      { text: "we ", isFiller: false },
      { text: "should ", isFiller: false },
      { text: "like ", isFiller: true },
      { text: "ship ", isFiller: false },
      { text: "the ", isFiller: false },
      { text: "redesign ", isFiller: false },
      { text: "by ", isFiller: false },
      { text: "friday.", isFiller: false }
    ],
    clean: "so i think we should ship the redesign by friday."
  },
  {
    id: 1,
    label: "Formal Speech (Notion)",
    app: "notion" as const,
    raw: [
      { text: "uh ", isFiller: true },
      { text: "actually ", isFiller: false },
      { text: "i ", isFiller: false },
      { text: "was ", isFiller: false },
      { text: "thinking ", isFiller: false },
      { text: "we ", isFiller: false },
      { text: "should ", isFiller: false },
      { text: "maybe ", isFiller: true },
      { text: "push ", isFiller: false },
      { text: "the ", isFiller: false },
      { text: "sync ", isFiller: false },
      { text: "to ", isFiller: false },
      { text: "11:30.", isFiller: false }
    ],
    clean: "actually i was thinking we should push the sync to 11:30."
  },
  {
    id: 2,
    label: "Coding Speech (VS Code)",
    app: "vscode" as const,
    raw: [
      { text: "so ", isFiller: true },
      { text: "basically ", isFiller: true },
      { text: "we ", isFiller: false },
      { text: "should ", isFiller: false },
      { text: "write ", isFiller: false },
      { text: "a ", isFiller: false },
      { text: "unit ", isFiller: false },
      { text: "test ", isFiller: false },
      { text: "here ", isFiller: false },
      { text: "like ", isFiller: true },
      { text: "right ", isFiller: false },
      { text: "now.", isFiller: false }
    ],
    clean: "we should write a unit test here right now."
  }
];

function LaptopDemo() {
  const [activeApp, setActiveApp] = useState<"slack" | "notion" | "vscode">("slack");
  const [activeSentenceIdx, setActiveSentenceIdx] = useState(0);
  const [animState, setAnimState] = useState<"idle" | "listening" | "cleaning" | "injecting" | "done">("idle");
  const [visibleRawWords, setVisibleRawWords] = useState<{ text: string; isFiller: boolean }[]>([]);
  const [showStrikes, setShowStrikes] = useState(false);
  const [injectedText, setInjectedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveHeights, setWaveHeights] = useState<number[]>(Array(15).fill(8));

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const hasAutoplayStartedRef = useRef(false);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  // Wave heights rendering for Listening state
  useEffect(() => {
    if (animState !== "listening") {
      setWaveHeights(Array(15).fill(4));
      return;
    }
    const interval = setInterval(() => {
      setWaveHeights(Array.from({ length: 15 }, () => 4 + Math.random() * 24));
    }, 90);
    return () => clearInterval(interval);
  }, [animState]);

  // Main animation engine
  const startDemo = useCallback((sentenceIdx: number) => {
    clearAllTimeouts();
    setInjectedText("");
    setVisibleRawWords([]);
    setShowStrikes(false);
    
    const sentence = DEMO_SENTENCES[sentenceIdx];
    setAnimState("listening");
    setIsPlaying(true);

    let wordIdx = 0;
    const wordsToType = sentence.raw;

    const typeNextWord = () => {
      if (wordIdx < wordsToType.length) {
        const word = wordsToType[wordIdx];
        setVisibleRawWords((prev) => [...prev, word]);
        wordIdx++;
        const delay = 160 + Math.random() * 80;
        const tId = setTimeout(typeNextWord, delay);
        timeoutsRef.current.push(tId);
      } else {
        const tId = setTimeout(startCleaning, 600);
        timeoutsRef.current.push(tId);
      }
    };

    const startCleaning = () => {
      setAnimState("cleaning");
      setShowStrikes(true);

      const tId = setTimeout(() => {
        setVisibleRawWords((prev) => prev.filter((w) => w && !w.isFiller));
        setShowStrikes(false);

        const tId2 = setTimeout(startInjecting, 700);
        timeoutsRef.current.push(tId2);
      }, 1000);
      timeoutsRef.current.push(tId);
    };

    const startInjecting = () => {
      setAnimState("injecting");

      let charIdx = 0;
      const cleanText = sentence.clean;

      const typeChar = () => {
        if (charIdx <= cleanText.length) {
          setInjectedText(cleanText.substring(0, charIdx));
          charIdx++;
          const tId = setTimeout(typeChar, 35 + Math.random() * 20);
          timeoutsRef.current.push(tId);
        } else {
          const tId = setTimeout(finishDemo, 600);
          timeoutsRef.current.push(tId);
        }
      };

      typeChar();
    };

    const finishDemo = () => {
      setAnimState("done");

      const tId = setTimeout(() => {
        setAnimState("idle");
        setIsPlaying(false);
      }, 2200);
      timeoutsRef.current.push(tId);
    };

    const startTimeout = setTimeout(typeNextWord, 400);
    timeoutsRef.current.push(startTimeout);

  }, [clearAllTimeouts]);

  // Continuous autoplay handler
  useEffect(() => {
    if (isPlaying) return;

    const tId = setTimeout(() => {
      const nextIdx = hasAutoplayStartedRef.current
        ? (activeSentenceIdx + 1) % DEMO_SENTENCES.length
        : activeSentenceIdx;
      hasAutoplayStartedRef.current = true;
      setActiveSentenceIdx(nextIdx);
      const nextSentence = DEMO_SENTENCES[nextIdx];
      setActiveApp(nextSentence.app);
      startDemo(nextIdx);
    }, hasAutoplayStartedRef.current ? 1800 : 500);

    return () => clearTimeout(tId);
  }, [isPlaying, activeSentenceIdx, startDemo]);

  // External trigger for "Watch it work" click
  useEffect(() => {
    const handleExternalTrigger = () => {
      const sentence = DEMO_SENTENCES[activeSentenceIdx];
      setActiveApp(sentence.app);
      startDemo(activeSentenceIdx);
    };
    window.addEventListener("start-laptop-demo", handleExternalTrigger);
    return () => {
      window.removeEventListener("start-laptop-demo", handleExternalTrigger);
    };
  }, [activeSentenceIdx, startDemo]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  const handleAppChange = (app: "slack" | "notion" | "vscode") => {
    setActiveApp(app);
    const sIdx = DEMO_SENTENCES.findIndex((s) => s.app === app);
    const useIdx = sIdx !== -1 ? sIdx : 0;
    setActiveSentenceIdx(useIdx);
    startDemo(useIdx);
  };

  const handleSentenceChange = (idx: number) => {
    setActiveSentenceIdx(idx);
    const sentence = DEMO_SENTENCES[idx];
    setActiveApp(sentence.app);
    startDemo(idx);
  };


  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
      {/* SECTION HEADER */}
      <div
        data-reveal
        style={{
          transition: "opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "16px",
          marginBottom: "50px",
        }}
      >
        <span
          className="font-jetbrains"
          style={{
            fontSize: "12px",
            color: "#E07B39",
            fontWeight: 600,
            background: "rgba(224,123,57,0.08)",
            padding: "6px 14px",
            borderRadius: "999px",
            letterSpacing: ".06em",
          }}
        >
          LIVE PRODUCT SIMULATOR
        </span>
        <h2
          className="font-bricolage"
          style={{
            fontWeight: 800,
            fontSize: "clamp(34px, 5vw, 50px)",
            lineHeight: 1.05,
            letterSpacing: "-.03em",
            color: "#26231F",
            margin: 0,
            maxWidth: "680px",
          }}
        >
          Watch voice turn to text <span style={{ color: "#E07B39" }}>everywhere</span> you write
        </h2>
        <p
          style={{
            fontSize: "16.5px",
            color: "#6B6560",
            maxWidth: "520px",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Select an application below, or click any voice script to see Lisup filter fillers and type directly in real-time.
        </p>
      </div>

      {/* DESKTOP MODE (shown only on screens > 768px) */}
      <div className="desktop-only">
        {/* TABS & CONTROLS ROW */}
        <div
          data-reveal
          style={{
            transition: "opacity .7s cubic-bezier(.2,.7,.2,1) .1s, transform .7s cubic-bezier(.2,.7,.2,1) .1s",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
            marginBottom: "38px",
          }}
        >
          {/* App Switcher Tabs */}
          <div style={{ display: "flex", background: "#f2f0ec", padding: "4px", borderRadius: "12px", border: "1px solid #edebe7" }}>
            <button
              onClick={() => handleAppChange("slack")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "none",
                background: activeApp === "slack" ? "#fff" : "transparent",
                color: activeApp === "slack" ? "#26231F" : "#A29B91",
                fontSize: "13px",
                fontWeight: 600,
                padding: "8px 16px",
                borderRadius: "9px",
                cursor: "pointer",
                boxShadow: activeApp === "slack" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.2s",
              }}
            >
              <SiSlack size={14} color={activeApp === "slack" ? "#E07B39" : "#A29B91"} />
              Slack
            </button>
            <button
              onClick={() => handleAppChange("notion")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "none",
                background: activeApp === "notion" ? "#fff" : "transparent",
                color: activeApp === "notion" ? "#26231F" : "#A29B91",
                fontSize: "13px",
                fontWeight: 600,
                padding: "8px 16px",
                borderRadius: "9px",
                cursor: "pointer",
                boxShadow: activeApp === "notion" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.2s",
              }}
            >
              <SiNotion size={14} color={activeApp === "notion" ? "#1A1A1A" : "#A29B91"} />
              Notion
            </button>
            <button
              onClick={() => handleAppChange("vscode")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "none",
                background: activeApp === "vscode" ? "#fff" : "transparent",
                color: activeApp === "vscode" ? "#26231F" : "#A29B91",
                fontSize: "13px",
                fontWeight: 600,
                padding: "8px 16px",
                borderRadius: "9px",
                cursor: "pointer",
                boxShadow: activeApp === "vscode" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.2s",
              }}
            >
              <VscVscode size={14} color={activeApp === "vscode" ? "#007acc" : "#A29B91"} />
              VS Code
            </button>
          </div>

          {/* Script Selection */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            <span className="font-jetbrains" style={{ fontSize: "11px", color: "#A29B91", fontWeight: 600, marginRight: "4px" }}>
              SPEECH SCRIPT:
            </span>
            {DEMO_SENTENCES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleSentenceChange(idx)}
                className={`demo-control-tab ${activeSentenceIdx === idx ? "active" : ""}`}
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#6B6560",
                  background: "#fff",
                  border: "1px solid #ECE8E2",
                  padding: "8px 14px",
                  borderRadius: "999px",
                  cursor: "pointer",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* LAPTOP GRAPHIC FRAME */}
        <div
          data-reveal
          style={{
            transition: "opacity .7s cubic-bezier(.2,.7,.2,1) .2s, transform .7s cubic-bezier(.2,.7,.2,1) .2s",
          }}
          className="laptop-wrapper"
        >
          <div className="laptop-lid">
            <div className="laptop-notch"></div>
            <div className="laptop-glare"></div>

            {/* APPLICATION DISPLAY SCREEN */}
            <div className="laptop-screen-content">
              {/* WINDOW TOP HEADER */}
              <div className="mock-window-header">
                <div className="mock-window-dots">
                  <div className="mock-window-dot red"></div>
                  <div className="mock-window-dot yellow"></div>
                  <div className="mock-window-dot green"></div>
                </div>
                <div className="mock-window-tabs">
                  <div className={`mock-window-tab ${activeApp === "slack" ? "active" : ""}`}>
                    <SiSlack size={10} color="#E07B39" />
                    slack
                  </div>
                  <div className={`mock-window-tab ${activeApp === "notion" ? "active" : ""}`}>
                    <SiNotion size={10} color="#fff" />
                    notion
                  </div>
                  <div className={`mock-window-tab ${activeApp === "vscode" ? "active" : ""}`}>
                    <VscVscode size={10} color="#007acc" />
                    vscode
                  </div>
                </div>
              </div>

              {/* SCREEN BODY BASED ON ACTIVE APP */}
              <div className="mock-app-body">
                {/* SLACK MOCK */}
                {activeApp === "slack" && (
                  <div style={{ display: "flex", flex: 1, background: "#fff" }}>
                    <div className="slack-sidebar font-hanken">
                      <div style={{ fontWeight: 800, fontSize: "13px", color: "#fff", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2C9A5E" }}></span>
                        Lisup Workspace
                      </div>
                      <div style={{ color: "#8b728c", fontSize: "10px", fontWeight: 700, marginTop: "6px" }}>CHANNELS</div>
                      <div className="slack-channels-list">
                        <div className="slack-channel-item active"># design-team</div>
                        <div className="slack-channel-item"># general</div>
                        <div className="slack-channel-item"># announcements</div>
                      </div>
                      <div style={{ color: "#8b728c", fontSize: "10px", fontWeight: 700, marginTop: "10px" }}>DIRECT MESSAGES</div>
                      <div className="slack-channels-list">
                        <div className="slack-channel-item" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2C9A5E" }}></span>
                          Sarah (Designer)
                        </div>
                        <div className="slack-channel-item" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2C9A5E" }}></span>
                          Alex (Dev)
                        </div>
                      </div>
                    </div>
                    <div className="slack-content font-hanken">
                      <div className="slack-messages">
                        <div className="slack-message-bubble">
                          <div className="slack-avatar" style={{ background: "#4a154b", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "11px", fontWeight: 700 }}>S</div>
                          <div className="slack-msg-text-wrap">
                            <span className="slack-sender">Sarah <span style={{ fontWeight: 400, fontSize: "10px", color: "#a29b91", marginLeft: "4px" }}>11:24 AM</span></span>
                            <span className="slack-msg-body">Hey team, are we ready to sign off on the design assets? We need to get the final build ready.</span>
                          </div>
                        </div>
                        <div className="slack-message-bubble">
                          <div className="slack-avatar" style={{ background: "#1164a3", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "11px", fontWeight: 700 }}>A</div>
                          <div className="slack-msg-text-wrap">
                            <span className="slack-sender">Alex <span style={{ fontWeight: 400, fontSize: "10px", color: "#a29b91", marginLeft: "4px" }}>11:25 AM</span></span>
                            <span className="slack-msg-body">Yeah, we are just waiting to finalize the release date details. What&apos;s the plan?</span>
                          </div>
                        </div>

                        {/* Animated injection message indicator */}
                        {injectedText && (
                          <div className="slack-message-bubble" style={{ opacity: animState === "done" ? 1 : 0.6, transition: "opacity 0.3s" }}>
                            <div className="slack-avatar" style={{ background: "#e07b39", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "11px", fontWeight: 700 }}>U</div>
                            <div className="slack-msg-text-wrap">
                              <span className="slack-sender">You <span style={{ fontWeight: 400, fontSize: "10px", color: "#e07b39", marginLeft: "4px" }}>Drafting...</span></span>
                              <span className="slack-msg-body" style={{ color: animState === "done" ? "#1a1a1a" : "#6B6560" }}>
                                {injectedText}
                                {animState === "injecting" && <span className="demo-cursor"></span>}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="slack-input-container">
                        <div className="slack-input-box">
                          <span style={{ color: injectedText ? "#1a1a1a" : "#a29b91", display: "flex", alignItems: "center", width: "100%" }}>
                            {!injectedText && animState !== "injecting" && "Message #design-team"}
                            {animState === "injecting" && injectedText}
                            {animState === "done" && injectedText}
                            {animState === "injecting" && <span className="demo-cursor"></span>}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* NOTION MOCK */}
                {activeApp === "notion" && (
                  <div style={{ display: "flex", flex: 1, background: "#fff" }}>
                    <div className="notion-sidebar font-hanken">
                      <div style={{ fontWeight: 800, fontSize: "12px", color: "#26231F", display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                        🧑‍💻 Muzammil&apos;s Notion
                      </div>
                      <div style={{ color: "#a29b91", fontSize: "10px", fontWeight: 700, marginTop: "6px" }}>PRIVATE</div>
                      <div className="notion-sidebar-item active">📄 Product Spec</div>
                      <div className="notion-sidebar-item">📝 Meeting Notes</div>
                      <div className="notion-sidebar-item">🚀 Release Planner</div>
                    </div>
                    <div className="notion-content font-hanken">
                      <div className="notion-title">📄 Product Spec</div>
                      <div className="notion-text-block">
                        We are developing the core landing page design details for the Lisup website. The site needs to showcase the voice-to-text widget.
                      </div>
                      <div className="notion-text-block" style={{ fontWeight: 600, color: "#1a1a1a" }}>
                        Key Product Release Notes:
                      </div>
                      <div className="notion-editor-input">
                        <span style={{ color: injectedText ? "#1a1a1a" : "#A29B91" }}>
                          {injectedText || (animState === "injecting" ? "" : "Type '/' for commands...")}
                          {animState === "injecting" && <span className="demo-cursor"></span>}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* VS CODE MOCK */}
                {activeApp === "vscode" && (
                  <div style={{ display: "flex", flex: 1, background: "#1e1e1e" }}>
                    <div className="vscode-sidebar">
                      <div style={{ color: "#d4d4d4", fontWeight: 700, fontSize: "10px", marginBottom: "4px" }}>EXPLORER</div>
                      <div className="vscode-sidebar-item active">📄 page.tsx</div>
                      <div className="vscode-sidebar-item">📄 layout.tsx</div>
                      <div className="vscode-sidebar-item">📄 globals.css</div>
                    </div>
                    <div className="vscode-content">
                      <div className="vscode-line">
                        <span className="vscode-line-num">1</span>
                        <span className="vscode-code">
                          <span className="vscode-keyword">import</span> React, &#123; useState &#125; <span className="vscode-keyword">from</span> <span className="vscode-string">&apos;react&apos;</span>;
                        </span>
                      </div>
                      <div className="vscode-line">
                        <span className="vscode-line-num">2</span>
                        <span className="vscode-code">
                          <span className="vscode-keyword">export default function</span> <span className="vscode-function">App</span>() &#123;
                        </span>
                      </div>
                      <div className="vscode-line">
                        <span className="vscode-line-num">3</span>
                        <span className="vscode-code">
                          <span className="vscode-comment" style={{ color: animState === "injecting" || animState === "done" ? "#ce9178" : "#6a9955" }}>
                            &nbsp;&nbsp;<span style={{ color: "#6a9955" }}>{"// TODO:"}</span> {injectedText || ""}
                            {animState === "injecting" && <span className="demo-cursor" style={{ background: "#ce9178" }}></span>}
                          </span>
                        </span>
                      </div>
                      <div className="vscode-line">
                        <span className="vscode-line-num">4</span>
                        <span className="vscode-code">
                          &nbsp;&nbsp;<span className="vscode-keyword">return</span> &lt;<span className="vscode-keyword">div</span>&gt;Lisup Simulation&lt;/<span className="vscode-keyword">div</span>&gt;;
                        </span>
                      </div>
                      <div className="vscode-line">
                        <span className="vscode-line-num">5</span>
                        <span className="vscode-code">&#125;</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SCREEN FLOATING LISUP WIDGET OVERLAY */}
              <div className={`mock-lisup-widget font-hanken ${animState === "idle" ? "hidden" : ""}`}>
                {/* Widget Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Image src="/logo.png" alt="Lisup" width="16" height="16" style={{ borderRadius: "4px" }} />
                    <span className="font-bricolage" style={{ fontWeight: 800, fontSize: "12.5px", color: "#26231F" }}>
                      Lis<span style={{ color: "#E07B39" }}>up</span>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: animState === "done" ? "#2C9A5E" : "#E07B39",
                        animation: animState === "done" ? "none" : "dotpulse 1.2s infinite"
                      }}
                    ></span>
                    <span className="font-jetbrains" style={{ fontSize: "9.5px", fontWeight: 700, color: animState === "done" ? "#2C9A5E" : "#C0631F", letterSpacing: ".04em" }}>
                      {animState === "listening" && "LISTENING..."}
                      {animState === "cleaning" && "CLEANING..."}
                      {animState === "injecting" && "INJECTING..."}
                      {animState === "done" && "INJECTED ✓"}
                    </span>
                  </div>
                </div>

                {/* Transcription Area */}
                <div style={{ background: "rgba(0,0,0,0.03)", borderRadius: "8px", padding: "8px 10px", minHeight: "56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <p className="font-jetbrains" style={{ fontSize: "11.5px", lineHeight: "1.45", color: "#26231F", margin: 0 }}>
                    {/* Raw word blocks with strikethrough logic */}
                    {visibleRawWords.length === 0 && <span style={{ color: "#a29b91" }}>Initializing speech capture...</span>}
                    {visibleRawWords.map((w, idx) => {
                      if (!w) return null;
                      const isWordFiller = w.isFiller;
                      const showStrike = showStrikes && isWordFiller;
                      return (
                        <span
                          key={idx}
                          className={isWordFiller ? "widget-highlight-word" : ""}
                          style={{
                            textDecoration: showStrike ? "line-through" : "none",
                            color: showStrike ? "#E07B39" : (isWordFiller ? "#C9A48A" : "#26231F"),
                            opacity: showStrike ? 0.6 : 1,
                            transition: "all 0.25s ease",
                            display: "inline-block",
                            marginRight: "4px"
                          }}
                        >
                          {w.text}
                        </span>
                      );
                    })}
                    {animState === "listening" && <span className="demo-cursor" style={{ height: "11px" }}></span>}
                  </p>
                </div>

                {/* Bottom Visualizer / Waveform */}
                {animState === "listening" && (
                  <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "26px", padding: "0 8px" }}>
                    {waveHeights.map((h, i) => (
                      <div
                        key={i}
                        className="widget-wave-bar"
                        style={{
                          height: `${h}px`,
                          transition: "height 0.1s ease"
                        }}
                      ></div>
                    ))}
                  </div>
                )}

                {animState !== "listening" && (
                  <div style={{ height: "3px", background: "rgba(0,0,0,0.05)", borderRadius: "2px", position: "relative", overflow: "hidden", marginTop: "2px" }}>
                    <div
                      style={{
                        height: "100%",
                        background: animState === "done" ? "#2C9A5E" : "var(--accent)",
                        width: animState === "cleaning" ? "50%" : (animState === "injecting" ? "85%" : "100%"),
                        transition: "width 0.8s ease"
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* LAPTOP KEYBOARD BASE */}
          <div className="laptop-base">
            <div className="laptop-lip"></div>
            <div className="laptop-trackpad"></div>
          </div>
        </div>
      </div>

      {/* MOBILE MODE (shown only on screens <= 768px) */}
      <div className="mobile-only">
        {/* SHOWCASE CARDS CONTAINER */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "48px", alignItems: "center" }}>
          
          {/* Command Mode Showcase */}
          <div style={{ width: "100%", maxWidth: "580px" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h3 className="font-bricolage" style={{ fontWeight: 800, fontSize: "22px", color: "#26231F", margin: "0 0 6px 0" }}>
                1. Voice Command Mode
              </h3>
              <p style={{ fontSize: "14px", color: "#6B6560", margin: 0 }}>
                Rewrite highlighted text instantly in any tone or style using natural voice instructions.
              </p>
            </div>
            <MobileCommandSimulator />
          </div>

          {/* Transcribe Mode Showcase */}
          <div style={{ width: "100%", maxWidth: "580px" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h3 className="font-bricolage" style={{ fontWeight: 800, fontSize: "22px", color: "#26231F", margin: "0 0 6px 0" }}>
                2. Speech Transcription Mode
              </h3>
              <p style={{ fontSize: "14px", color: "#6B6560", margin: 0 }}>
                Dictate naturally while Lisup automatically filters fillers, fixes spelling, and polishes grammar.
              </p>
            </div>
            <MobileTranscribeSimulator />
          </div>
        </div>
      </div>

      {/* PAIN & SOLUTION CALLOUT CARD (Placed after Demo) */}
      <div
        data-reveal
        style={{
          transition: "opacity .7s cubic-bezier(.2,.7,.2,1) .05s, transform .7s cubic-bezier(.2,.7,.2,1) .05s",
          background: "#fff",
          border: "1px solid #ECE8E2",
          borderRadius: "18px",
          padding: "24px 30px",
          maxWidth: "800px",
          margin: "64px auto 0",
          boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
          display: "flex",
          alignItems: "center",
          gap: "24px",
          textAlign: "left"
        }}
        className="flex-col-mobile"
      >
        <div style={{ flex: 1 }}>
          <h4 className="font-bricolage" style={{ fontWeight: 800, fontSize: "16px", color: "#26231F", marginBottom: "8px" }}>
            The 6-Step Copy-Paste Friction:
          </h4>
          <ol className="font-jetbrains" style={{ fontSize: "11px", color: "#A29B91", paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "4px", listStyleType: "none", margin: 0, padding: 0 }}>
            <li>1. Highlight unpolished draft text</li>
            <li>2. Copy text → Switch tabs to ChatGPT/AI app</li>
            <li>3. Paste draft → Dictate rewrite command → Copy output</li>
            <li>4. Switch tabs back → Paste &amp; overwrite</li>
          </ol>
        </div>
        <div style={{ width: "1px", height: "70px", background: "#ECE8E2" }} className="lz-hidemob"></div>
        <div style={{ flex: 1.2 }}>
          <h4 className="font-bricolage" style={{ fontWeight: 800, fontSize: "16px", color: "#E07B39", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span>⚡</span> Lisup In-Place Solution:
          </h4>
          <p className="font-hanken" style={{ fontSize: "13.5px", color: "#6B6560", lineHeight: 1.45, margin: 0 }}>
            Zero context switching. Just highlight and copy the text once. Speak a command (e.g. &quot;make it formal&quot;) and Lisup rewrites the text in-place instantly inside Slack, Notion, or any app.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {

  const rootRef = useRef<HTMLDivElement>(null);
  const canvasHeroRef = useRef<HTMLCanvasElement>(null);
  const canvasWaveRef = useRef<HTMLCanvasElement>(null);

  const progBarRef = useRef<HTMLDivElement>(null);

  const galSectionRef = useRef<HTMLDivElement>(null);
  const galTrackRef = useRef<HTMLDivElement>(null);
  const heroTypedElRef = useRef<HTMLSpanElement>(null);
  const toneElRef = useRef<HTMLParagraphElement>(null);
  const fillerStageRef = useRef<HTMLDivElement>(null);

  // React State for interactive components
  const [tone, setTone] = useState<keyof typeof TONES>("Formal");
  const [toneText, setToneText] = useState(TONES.Formal);
  const [activeStep, setActiveStep] = useState(0);
  const [whText, setWhText] = useState("");
  const [whStatus, setWhStatus] = useState("READY");
  const [whProg, setWhProg] = useState("12%");
  const [isLoaded, setIsLoaded] = useState(false);
  const [, setHeroActiveTab] = useState<"transcribe" | "command">("transcribe");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Animation values stored in refs to avoid triggering render cycles
  const pointerRef = useRef({ x: -100, y: -100 });
  const fillerIdxRef = useRef(0);
  const typerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fillerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const distRef = useRef<number>(0);
  const isScrollingRef = useRef(false);
  const scrollIdleTimeoutRef = useRef<NodeJS.Timeout | null>(null);



  // Typer effect for the floating widget
  useEffect(() => {
    const setTypedText = (s: string) => {
      if (heroTypedElRef.current) heroTypedElRef.current.textContent = s;
    };

    const step = (lines: string[], li: number, ci: number, dir: number) => {
      const full = lines[li];
      if (li >= 2) {
        setHeroActiveTab("command");
      } else {
        setHeroActiveTab("transcribe");
      }
      if (dir > 0) {
        ci++;
        setTypedText(full.slice(0, ci));
        if (ci >= full.length) {
          typerTimeoutRef.current = setTimeout(() => step(lines, li, full.length, -1), 1900);
        } else {
          typerTimeoutRef.current = setTimeout(() => step(lines, li, ci, 1), 36 + Math.random() * 46);
        }
      } else {
        ci--;
        setTypedText(full.slice(0, Math.max(0, ci)));
        if (ci <= 0) {
          const nl = (li + 1) % lines.length;
          typerTimeoutRef.current = setTimeout(() => step(lines, nl, 0, 1), 360);
        } else {
          typerTimeoutRef.current = setTimeout(() => step(lines, li, ci, -1), 17);
        }
      };
    };

    typerTimeoutRef.current = setTimeout(() => step(TYPER_LINES, 0, TYPER_LINES[0].length, -1), 2000);

    return () => {
      if (typerTimeoutRef.current) clearTimeout(typerTimeoutRef.current);
    };
  }, []);

  // Filler word sweep animation
  useEffect(() => {
    const runFiller = () => {
      const stage = fillerStageRef.current;
      if (!stage) {
        fillerTimeoutRef.current = setTimeout(runFiller, 300);
        return;
      }
      const sentence = SENTENCES[fillerIdxRef.current % SENTENCES.length];
      stage.innerHTML = "";
      stage.style.opacity = "1";
      const spans: { el: HTMLSpanElement; filler: boolean }[] = [];

      sentence.forEach((w) => {
        const el = document.createElement("span");
        el.textContent = w[0] as string;
        el.style.cssText =
          "display:inline-block;white-space:pre;margin-right:.3em;max-width:400px;opacity:0;transform:translateY(10px);transition:opacity .4s ease,max-width .45s ease,margin .45s ease,transform .45s ease,color .35s ease;" +
          (w[1] ? "color:#C9A48A;" : "color:#26231F;");
        stage.appendChild(el);
        spans.push({ el, filler: !!w[1] });
      });

      let i = 0;
      const reveal = () => {
        if (i < spans.length) {
          spans[i].el.style.opacity = "1";
          spans[i].el.style.transform = "none";
          i++;
          fillerTimeoutRef.current = setTimeout(reveal, 85);
        } else {
          fillerTimeoutRef.current = setTimeout(() => filterSweep(spans), 750);
        }
      };
      reveal();
    };

    const filterSweep = (spans: { el: HTMLSpanElement; filler: boolean }[]) => {
      const fillers = spans.filter((s) => s.filler);
      let k = 0;
      const drop = () => {
        if (k < fillers.length) {
          const el = fillers[k].el;
          el.style.color = "#E07B39";
          setTimeout(() => {
            el.style.opacity = "0";
            el.style.maxWidth = "0";
            el.style.marginRight = "0";
            el.style.transform = "translateY(-12px)";
          }, 200);
          k++;
          fillerTimeoutRef.current = setTimeout(drop, 280);
        } else {
          fillerTimeoutRef.current = setTimeout(() => {
            const stage = fillerStageRef.current;
            if (stage) stage.style.opacity = "0";
            fillerTimeoutRef.current = setTimeout(() => {
              fillerIdxRef.current++;
              runFiller();
            }, 650);
          }, 1800);
        }
      };
      drop();
    };

    runFiller();

    return () => {
      if (fillerTimeoutRef.current) clearTimeout(fillerTimeoutRef.current);
    };
  }, []);

  // Main Canvas drawing loop and custom cursor interpolation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const markScrolling = () => {
      isScrollingRef.current = true;
      if (scrollIdleTimeoutRef.current) clearTimeout(scrollIdleTimeoutRef.current);
      scrollIdleTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 120);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", markScrolling, { passive: true });

    // Initialize canvas sizes
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;
    let hw = 0, hh = 0, ww = 0, wh = 0;
    let hctx: CanvasRenderingContext2D | null = null;
    let wctx: CanvasRenderingContext2D | null = null;

    // Absolute layout metrics cached on resize/mount to avoid layout thrashing in RAF loop
    let canvasHeroOffsetTop = 0;
    let canvasHeroOffsetLeft = 0;
    let canvasWaveOffsetTop = 0;

    const getOffsetTop = (el: HTMLElement | null) => {
      let top = 0;
      let left = 0;
      let curr = el;
      while (curr) {
        top += curr.offsetTop;
        left += curr.offsetLeft;
        curr = curr.offsetParent as HTMLElement;
      }
      return { top, left };
    };

    const adjustGalleryHeight = () => {
      const sec = galSectionRef.current;
      const track = galTrackRef.current;
      if (sec && track) {
        if (window.innerWidth > 900) {
          const dist = track.scrollWidth - window.innerWidth;
          distRef.current = dist;
          if (dist > 100) {
            sec.style.height = `${dist + window.innerHeight}px`;
          }
        } else {
          sec.style.height = "auto";
          distRef.current = 0;
        }
      }
    };

    const cacheMetrics = () => {
      adjustGalleryHeight();
      
      const ch = canvasHeroRef.current;
      if (ch) {
        const offset = getOffsetTop(ch);
        canvasHeroOffsetTop = offset.top;
        canvasHeroOffsetLeft = offset.left;
        hw = ch.clientWidth;
        hh = ch.clientHeight;
        ch.width = hw * dpr;
        ch.height = hh * dpr;
        hctx = ch.getContext("2d");
        if (hctx) {
          hctx.resetTransform();
          hctx.scale(dpr, dpr);
        }
      }

      const cw = canvasWaveRef.current;
      if (cw) {
        const offset = getOffsetTop(cw);
        canvasWaveOffsetTop = offset.top;
        ww = cw.clientWidth;
        wh = cw.clientHeight;
        cw.width = ww * dpr;
        cw.height = wh * dpr;
        wctx = cw.getContext("2d");
        if (wctx) {
          wctx.resetTransform();
          wctx.scale(dpr, dpr);
        }
      }
    };

    cacheMetrics();
    setTimeout(cacheMetrics, 150);
    setTimeout(cacheMetrics, 500);
    setTimeout(cacheMetrics, 1500);
    window.addEventListener("resize", cacheMetrics);

    // Render Canvas drawings
    const drawFinger = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, mx: number, my: number) => {
      ctx.clearRect(0, 0, w, h);
      let cx = w / 2, cy = h / 2;
      const scaleFactor = w / 760; // Scale rings based on canvas width
      if (isFinite(mx) && isFinite(my)) {
        cx += Math.max(-40 * scaleFactor, Math.min(40 * scaleFactor, (mx - cx) * 0.06));
        cy += Math.max(-40 * scaleFactor, Math.min(40 * scaleFactor, (my - cy) * 0.06));
      }
      const rings = 13;
      const segments = 120;
      for (let r = 0; r < rings; r++) {
        const baseR = (26 + r * 17) * scaleFactor;
        const freq = 2 + r;
        const amp = (3 + r * 0.4) * scaleFactor;
        ctx.beginPath();
        for (let s = 0; s <= segments; s++) {
          const a = (s / segments) * Math.PI * 2;
          let rad = baseR + amp * Math.sin(a * freq + t * 1.3 + r * 0.5);
          if (isFinite(mx)) {
            const pa = Math.atan2(my - cy, mx - cx);
            const da = Math.cos(a - pa);
            rad += Math.max(0, da) * 10 * Math.max(0, da) * scaleFactor;
          }
          const x = cx + Math.cos(a) * rad, y = cy + Math.sin(a) * rad;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = "#E07B39";
        ctx.globalAlpha = Math.max(0.04, 0.4 - r * 0.028);
        ctx.lineWidth = 1.5 * Math.max(0.5, scaleFactor);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const drawWave = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      const n = 22, bw = w / n, cy = h / 2;
      for (let i = 0; i < n; i++) {
        let v = Math.sin(i * 0.5 + t * 5) + 0.6 * Math.sin(i * 0.2 - t * 3);
        v = Math.abs(v) / 1.6;
        const bh = h * 0.14 + h * 0.7 * v;
        const bwidth = bw * 0.42;
        ctx.fillStyle = "#E07B39";
        ctx.globalAlpha = 0.9;
        const x = i * bw + (bw - bwidth) / 2, y = cy - bh / 2;
        ctx.beginPath();
        ctx.roundRect(x, y, bwidth, bh, bwidth / 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let lastCanvasPaint = 0;

    const tick = (timestamp: number) => {
      if (timestamp - lastCanvasPaint < 33) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      lastCanvasPaint = timestamp;

      const t = timestamp / 1000;
      
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      const vpHeight = typeof window !== "undefined" ? window.innerHeight : 800;
      
      const isHeroVisible = scrollY < (canvasHeroOffsetTop + hh) && (scrollY + vpHeight) > canvasHeroOffsetTop;
      const isWaveVisible = scrollY < (canvasWaveOffsetTop + wh) && (scrollY + vpHeight) > canvasWaveOffsetTop;

      // Keep the full-detail hero ring, but do not repaint it during active scroll.
      if (hctx && isHeroVisible && !isScrollingRef.current) {
        const mx = pointerRef.current.x - (canvasHeroOffsetLeft - (typeof window !== "undefined" ? window.scrollX : 0));
        const my = pointerRef.current.y - (canvasHeroOffsetTop - scrollY);
        drawFinger(hctx, hw, hh, t, mx, my);
      }

      if (wctx && isWaveVisible) {
        drawWave(wctx, ww, wh, t);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", cacheMetrics);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Handle Page Scroll progress bar & Nav sticky state
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sc = window.scrollY || document.documentElement.scrollTop;
          const h = document.documentElement.scrollHeight - window.innerHeight;

          if (progBarRef.current) {
            progBarRef.current.style.width = (h > 0 ? (sc / h) * 100 : 0) + "%";
          }

          // Horizontal gallery translation (1:1 direct scroll linking mapped on screen refresh)
          const sec = galSectionRef.current;
          const track = galTrackRef.current;
          if (sec && track && window.innerWidth > 900) {
            const dist = distRef.current;
            const rect = sec.getBoundingClientRect();
            let p = dist > 0 ? (-rect.top / dist) : 0;
            p = Math.max(0, Math.min(1, p));
            const targetX = -p * Math.max(0, dist);
            track.style.transform = `translateX(${targetX}px)`;
          } else if (track) {
            track.style.transform = "";
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // IntersectionObservers (Fades, Count-up, Step Tracker)
  useEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return;

    // Set hidden states for reveal tags
    rootEl.querySelectorAll("[data-reveal]").forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(28px)";
    });

    const countUp = (el: HTMLElement) => {
      const target = parseFloat(el.getAttribute("data-count") || "0");
      const suffix = el.getAttribute("data-suffix") || "";
      const dur = 1400;
      const start = performance.now();

      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.innerHTML = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    // Intersection observer for fading elements in & running count-up numbers
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          if (el.hasAttribute("data-reveal")) {
            el.style.opacity = "1";
            el.style.transform = "none";
          }
          if (el.hasAttribute("data-count")) {
            countUp(el);
          }
          io.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );

    rootEl.querySelectorAll("[data-reveal],[data-count]").forEach((el) => io.observe(el));

    // Intersection observer for step vertical progress tracking
    const stepIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const idx = parseInt(e.target.getAttribute("data-step") || "0", 10);
          const d = WH_STEPS[idx] || WH_STEPS[0];
          setActiveStep(idx);
          setWhText(d.text);
          setWhStatus(d.status);
          setWhProg(d.prog);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    rootEl.querySelectorAll("[data-step]").forEach((s) => stepIo.observe(s));

    return () => {
      io.disconnect();
      stepIo.disconnect();
    };
  }, []);

  // Magnet button animation positioning
  const handleMagnetMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.3}px, ${(e.clientY - (r.top + r.height / 2)) * 0.45}px)`;
  };

  const handleMagnetLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "translate(0,0)";
  };

  // Tone switcher click event
  const selectTone = (toneName: keyof typeof TONES) => {
    if (toneName === tone) return;
    if (toneElRef.current) toneElRef.current.style.opacity = "0";

    setTimeout(() => {
      setTone(toneName);
      setToneText(TONES[toneName]);
      if (toneElRef.current) toneElRef.current.style.opacity = "1";
    }, 200);
  };

  return (
    <div
      ref={rootRef}
      className={isLoaded ? "hero-loaded" : ""}
      style={{
        position: "relative",
        background: "#FDF6F0",
      }}
    >
      {/* PRELOADER OVERLAY */}
      <div className={`preloader-overlay ${isLoaded ? "fade-out" : ""}`}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          <div style={{ position: "relative", width: "80px", height: "80px" }}>
            <div style={{
              position: "absolute",
              inset: "-8px",
              borderRadius: "50%",
              border: "2px dashed #E07B39",
              animation: "spin 4s linear infinite"
            }}></div>
            <div style={{
              position: "absolute",
              inset: "-16px",
              borderRadius: "50%",
              border: "1px solid rgba(224,123,57,0.2)",
              animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite"
            }}></div>
            <Image
              src="/logo.png"
              alt="Lisup Logo"
              width="80"
              height="80"
              priority
              loading="eager"
              style={{ borderRadius: "20px", objectFit: "cover" }}
            />
          </div>
          <div className="font-bricolage" style={{ fontWeight: 800, fontSize: "24px", color: "#26231F" }}>
            Lis<span style={{ color: "#E07B39" }}>up</span>
          </div>
          <div className="font-jetbrains" style={{ fontSize: "12px", color: "#A29B91", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#E07B39", animation: "dotpulse 1s infinite" }}></span>
            <span>connecting voice model...</span>
          </div>
        </div>
      </div>
      {/* SCROLL PROGRESS */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          zIndex: 9998,
          background: "transparent",
        }}
      >
        <div
          ref={progBarRef}
          style={{
            height: "100%",
            width: "0%",
            background: "#E07B39",
            transformOrigin: "left",
          }}
        ></div>
      </div>

      {/* ===================== NAV ===================== */}
      <Navbar />

          <section
        className="hero-section"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "calc(100vh - 74px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* big faint background word */}
        <div
          className="lz-hidemob font-bricolage hero-bg-text-wrap"
          style={{
            position: "absolute",
            bottom: "-4%",
            left: "-2%",
            fontWeight: 800,
            fontSize: "300px",
            lineHeight: 0.8,
            color: "#000",
            letterSpacing: "-.04em",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          voice
        </div>


        <div
          className="hero-content-container"
          style={{
            position: "relative",
            zIndex: 3,
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "60px 48px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <canvas
              ref={canvasHeroRef}
              className="hero-anim-canvas"
            ></canvas>
            <div
              className="hero-badge"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "8px 15px",
                borderRadius: "999px",
                border: "1px solid #F2D6C2",
                background: "rgba(254,240,230,.7)",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#E07B39",
                  animation: "dotpulse 1.6s ease-in-out infinite",
                }}
              ></span>
              <span
                className="font-jetbrains"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#C0631F",
                  letterSpacing: ".02em",
                }}
              >
                Alt + Space &middot; speak anywhere
              </span>
            </div>
            
            <h1
              className="font-bricolage"
              style={{
                fontWeight: 800,
                fontSize: "clamp(48px, 8vw, 96px)",
                lineHeight: 0.9,
                letterSpacing: "-.035em",
                color: "#26231F",
                margin: 0,
              }}
            >
              <span className="hero-title-line">
                <span>
                  Stop{" "}
                  <span
                    style={{ position: "relative", display: "inline-block" }}
                    className="strike-after"
                  >
                    typing.
                  </span>
                </span>
              </span>
              <span className="hero-title-line">
                <span style={{ transitionDelay: "0.15s" }}>
                  Start <span style={{ color: "#E07B39" }}>talking.</span>
                </span>
              </span>
            </h1>

            <p
              className="hero-description"
              style={{
                maxWidth: "440px",
                margin: "28px 0 0",
                fontSize: "19px",
                lineHeight: 1.55,
                color: "#6B6560",
              }}
            >
              Talk, stop, done. Lisup turns speech into finished text in 100+ languages &mdash; fillers gone, grammar fixed, in your tone. Everywhere on your machine.
            </p>

            <div
              className="hero-cta-row"
              style={{
                display: "flex",
                alignItems: "stretch",
                flexWrap: "wrap",
                gap: "14px",
                marginTop: "36px",
                maxWidth: "580px",
                width: "100%",
              }}
            >
              <a
                href={WINDOWS_DOWNLOAD_URL}
                data-cursor
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#fff",
                  background: "#E07B39",
                  padding: "14px 28px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  transition: "background 0.2s, transform 0.1s",
                  boxShadow: "0 8px 16px -6px rgba(224,123,57,.6)",
                  textDecoration: "none",
                }}
                className="hover-bg-darkorange"
              >
                {WINDOWS_DOWNLOAD_LABEL}
              </a>
              <button
                data-cursor
                onClick={() => {
                  const el = document.getElementById("demo-section");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent("start-laptop-demo"));
                    }, 600);
                  }
                }}
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#26231F",
                  background: "transparent",
                  padding: "14px 24px",
                  borderRadius: "999px",
                  border: "1px solid #E2DDD5",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                className="hover-bg-white lz-hidemob"
              >
                &#9654; Watch it work
              </button>
            </div>
            <div
              className="font-jetbrains hero-platforms"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginTop: "32px",
              }}
            >
              <span style={{ fontSize: "12px", color: "#A29B91", fontWeight: 500, letterSpacing: ".03em" }}>
                WINDOWS
              </span>
              <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#D8CFC4" }}></span>
              <span style={{ fontSize: "12px", color: "#A29B91", fontWeight: 500, letterSpacing: ".03em", opacity: 0.72 }}>
                MACOS SOON
              </span>
              <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#D8CFC4" }}></span>
              <span style={{ fontSize: "12px", color: "#A29B91", fontWeight: 500, letterSpacing: ".03em", opacity: 0.72 }}>
                ANDROID SOON
              </span>
            </div>
          </div>

          {/* Right layout spacer to keep the layout preserved */}
          <div
            className="lz-hidemob"
            style={{
              flex: "none",
              width: "372px",
              height: "372px",
            }}
          ></div>
        </div>

        {/* scroll cue */}
        <div
          className="lz-hidemob"
          style={{
            position: "absolute",
            bottom: "26px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "7px",
            zIndex: 3,
          }}
        >
          <span className="font-jetbrains" style={{ fontSize: "11px", color: "#A29B91", letterSpacing: ".12em" }}>
            SCROLL
          </span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" style={{ animation: "cuebob 1.8s ease-in-out infinite" }}>
            <path d="M7 1v14M2 11l5 5 5-5" stroke="#E07B39" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ===================== LAPTOP DEMO SECTION ===================== */}
      <section id="demo-section" style={{ background: "#FDF6F0", padding: "100px 0 60px", borderBottom: "1px solid #ECE8E2", overflow: "hidden" }}>
        <LaptopDemo />
      </section>

      {/* ===================== MARQUEE ===================== */}
      <div
        className="marquee-ribbon"
        style={{
          position: "relative",
          background: "#E07B39",
          padding: "26px 0",
          overflow: "hidden",
          transform: "rotate(-2.2deg) scale(1.04)",
          margin: "30px 0",
          zIndex: 5,
        }}
      >
        <div className="marquee-ribbon-track" style={{ display: "flex", gap: 0, width: "max-content", animation: "marquee 26s linear infinite" }}>
          <span className="font-bricolage" style={{ fontWeight: 800, fontSize: "34px", color: "#1A1A1A", letterSpacing: "-.02em", whiteSpace: "nowrap" }}>
            SPEAK&nbsp;&middot;&nbsp;DON&apos;T&nbsp;TYPE&nbsp;&middot;&nbsp;3&times;&nbsp;FASTER&nbsp;&middot;&nbsp;100+&nbsp;LANGUAGES&nbsp;&middot;&nbsp;ON-DEVICE&nbsp;&middot;&nbsp;
          </span>
          <span className="font-bricolage" style={{ fontWeight: 800, fontSize: "34px", color: "#1A1A1A", letterSpacing: "-.02em", whiteSpace: "nowrap" }}>
            SPEAK&nbsp;&middot;&nbsp;DON&apos;T&nbsp;TYPE&nbsp;&middot;&nbsp;3&times;&nbsp;FASTER&nbsp;&middot;&nbsp;100+&nbsp;LANGUAGES&nbsp;&middot;&nbsp;ON-DEVICE&nbsp;&middot;&nbsp;
          </span>
        </div>
      </div>

      {/* ===================== HOW IT WORKS (sticky play) ===================== */}
      <section id="how" style={{ background: "#FDF6F0", padding: "90px 0 60px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          <div
            data-reveal
            style={{
              transition:
                "opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "30px",
              marginBottom: "56px",
            }}
          >
            <h2
              className="font-bricolage"
              style={{
                fontWeight: 800,
                fontSize: "clamp(36px, 6vw, 60px)",
                lineHeight: 0.95,
                letterSpacing: "-.03em",
                color: "#26231F",
                margin: 0,
                maxWidth: "680px",
              }}
            >
              Watch it work
              <br />
              as you scroll.
            </h2>
            <span
              className="font-jetbrains"
              style={{
                fontSize: "13px",
                color: "#A29B91",
                letterSpacing: ".04em",
                whiteSpace: "nowrap",
              }}
            >
              (01) &mdash; HOW IT WORKS
            </span>
          </div>

          <div className="how-it-works-flex" style={{ display: "flex", gap: "60px", alignItems: "flex-start" }}>
            {/* sticky widget on desktop, hidden on mobile */}
            <div
              className="lz-hidemob"
              style={{
                flex: "none",
                width: "380px",
                position: "sticky",
                top: "120px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "380px",
                  background: "#fff",
                  border: "1px solid #ECE8E2",
                  borderRadius: "24px",
                  boxShadow: "0 40px 90px -34px rgba(26,26,26,.4)",
                  padding: "22px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                    <Image
                      src="/logo.png"
                      alt="Lisup Logo"
                      width="28"
                      height="28"
                      style={{ borderRadius: "6px", objectFit: "cover" }}
                    />
                    <span className="font-bricolage" style={{ fontWeight: 800, fontSize: "17px", color: "#26231F" }}>
                      Lis<span style={{ color: "#E07B39" }}>up</span>
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#E07B39", animation: "dotpulse 1.4s infinite" }}></span>
                    <span className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 600, color: "#C0631F", letterSpacing: ".02em" }}>
                      {whStatus}
                    </span>
                  </div>
                </div>
                {/* mode toggle */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                  <div style={{ display: "inline-flex", gap: "4px", background: "#F2F0EC", borderRadius: "12px", padding: "4px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.08)", borderRadius: "9px", padding: "8px 18px", fontSize: "13.5px", fontWeight: 600, color: "#26231F" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#6B6560">
                        <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                      </svg>
                      Transcribe
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", borderRadius: "9px", padding: "8px 18px", fontSize: "13.5px", fontWeight: 600, color: "#A29B91" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#C5BFB8">
                        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                      </svg>
                      Command
                    </span>
                  </div>
                </div>
                {/* mic + waveform */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
                  <div style={{ position: "relative", width: "72px", height: "72px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid #E07B39", animation: "ping 1.8s cubic-bezier(0,0,.2,1) infinite" }}></span>
                    <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 14px 30px -8px rgba(26,26,26,.5)" }}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
                        <rect x="9" y="2" width="6" height="11" rx="3" />
                        <path d="M6 11a6 6 0 0 0 12 0" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                        <path d="M12 17v4M9 21h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <canvas ref={canvasWaveRef} style={{ width: "240px", height: "34px", display: "block" }}></canvas>
                </div>
                {/* transcript */}
                <div style={{ background: "#F7F5F2", border: "1px solid #ECE8E2", borderRadius: "14px", padding: "15px 16px", minHeight: "84px" }}>
                  <div className="font-jetbrains" style={{ fontSize: "14px", lineHeight: 1.55, color: "#26231F", transition: "color .3s" }}>
                    {whText}
                    <span style={{ display: "inline-block", width: "2px", height: "15px", background: "#E07B39", marginLeft: "1px", verticalAlign: "-2px", animation: "blink 1s step-end infinite" }}></span>
                  </div>
                </div>
                {/* progress */}
                <div style={{ height: "4px", background: "#F2F0EC", borderRadius: "3px", marginTop: "16px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: whProg, background: "linear-gradient(90deg,#F5A878,#E07B39)", borderRadius: "3px", transition: "width .3s ease" }}></div>
                </div>
              </div>
            </div>

            {/* steps container */}
            <div className="how-it-works-steps" style={{ flex: 1, minWidth: 0 }}>
              <div
                data-step="0"
                style={{
                  minHeight: "60vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderLeft: `2px solid ${activeStep === 0 ? "#E07B39" : "#EDE6DC"}`,
                  paddingLeft: "34px",
                  opacity: activeStep === 0 ? 1 : 0.4,
                  transition: "opacity .3s, border-color .3s",
                }}
              >
                <div className="font-bricolage" style={{ fontWeight: 800, fontSize: "80px", lineHeight: 1, color: "#E07B39", marginBottom: "14px" }}>
                  01
                </div>
                <h3 className="font-bricolage" style={{ fontWeight: 700, fontSize: "34px", color: "#26231F", margin: "0 0 12px", letterSpacing: "-.02em" }}>
                  Press Alt + Space
                </h3>
                <p style={{ fontSize: "18px", lineHeight: 1.6, color: "#6B6560", margin: 0, maxWidth: "440px" }}>
                  The widget appears over whatever you&apos;re doing &mdash; without ever stealing focus from your active app.
                </p>
              </div>
              <div
                data-step="1"
                style={{
                  minHeight: "60vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderLeft: `2px solid ${activeStep === 1 ? "#E07B39" : "#EDE6DC"}`,
                  paddingLeft: "34px",
                  opacity: activeStep === 1 ? 1 : 0.4,
                  transition: "opacity .3s, border-color .3s",
                }}
              >
                <div className="font-bricolage" style={{ fontWeight: 800, fontSize: "80px", lineHeight: 1, color: "#E07B39", marginBottom: "14px" }}>
                  02
                </div>
                <h3 className="font-bricolage" style={{ fontWeight: 700, fontSize: "34px", color: "#26231F", margin: "0 0 12px", letterSpacing: "-.02em" }}>
                  Speak naturally
                </h3>
                <p style={{ fontSize: "18px", lineHeight: 1.6, color: "#6B6560", margin: 0, maxWidth: "440px" }}>
                  Ramble. Correct yourself mid-sentence. Use &quot;um&quot; and &quot;like&quot;. Talk exactly like a human being &mdash; Lisup keeps up.
                </p>
              </div>
              <div
                data-step="2"
                style={{
                  minHeight: "60vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderLeft: `2px solid ${activeStep === 2 ? "#E07B39" : "#EDE6DC"}`,
                  paddingLeft: "34px",
                  opacity: activeStep === 2 ? 1 : 0.4,
                  transition: "opacity .3s, border-color .3s",
                }}
              >
                <div className="font-bricolage" style={{ fontWeight: 800, fontSize: "80px", lineHeight: 1, color: "#E07B39", marginBottom: "14px" }}>
                  03
                </div>
                <h3 className="font-bricolage" style={{ fontWeight: 700, fontSize: "34px", color: "#26231F", margin: "0 0 12px", letterSpacing: "-.02em" }}>
                  It cleans up
                </h3>
                <p style={{ fontSize: "18px", lineHeight: 1.6, color: "#6B6560", margin: 0, maxWidth: "440px" }}>
                  Fillers stripped, grammar fixed, self-corrections resolved to your final intent, and your tone applied &mdash; in under a second.
                </p>
              </div>
              <div
                data-step="3"
                style={{
                  minHeight: "60vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderLeft: `2px solid ${activeStep === 3 ? "#E07B39" : "#EDE6DC"}`,
                  paddingLeft: "34px",
                  opacity: activeStep === 3 ? 1 : 0.4,
                  transition: "opacity .3s, border-color .3s",
                }}
              >
                <div className="font-bricolage" style={{ fontWeight: 800, fontSize: "80px", lineHeight: 1, color: "#E07B39", marginBottom: "14px" }}>
                  04
                </div>
                <h3 className="font-bricolage" style={{ fontWeight: 700, fontSize: "34px", color: "#26231F", margin: "0 0 12px", letterSpacing: "-.02em" }}>
                  Inject anywhere
                </h3>
                <p style={{ fontSize: "18px", lineHeight: 1.6, color: "#6B6560", margin: 0, maxWidth: "440px" }}>
                  One click drops the finished text straight into your active app &mdash; email, Slack, docs, code. You never left the keyboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURES (horizontal scroll) ===================== */}
      <section ref={galSectionRef} id="features" style={{ position: "relative", height: "420vh", background: "#1A1A1A" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "38px" }}>
            <h2 className="font-bricolage" style={{ fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 0.95, letterSpacing: "-.03em", color: "#fff", margin: 0 }}>
              A whole writing
              <br />
              studio in one hotkey.
            </h2>
            <span className="font-jetbrains" style={{ fontSize: "13px", color: "#6B6560", letterSpacing: ".04em", whiteSpace: "nowrap" }}>
              (02) &mdash; SCROLL &rarr;
            </span>
          </div>
          <div 
            ref={galTrackRef} 
            className="gallery-track-container" 
            style={{ 
              display: "flex", 
              gap: "24px", 
              padding: "0 48px", 
              width: "max-content", 
              willChange: "transform", 
              flexShrink: 0, 
              alignSelf: "flex-start"
            }}
          >
            {/* card 1 */}
            <div className="gallery-card" style={{ flex: "none", width: "440px", background: "linear-gradient(160deg,#2C2420,#1F1B18)", border: "1px solid #332C26", borderRadius: "24px", padding: "38px", height: "440px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div className="font-jetbrains" style={{ fontSize: "12px", color: "#E07B39", letterSpacing: ".06em", marginBottom: "24px" }}>
                  01 / TRANSCRIBE
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "60px", marginBottom: "28px" }}>
                  <span style={{ flex: 1, background: "linear-gradient(180deg,#F5A878,#E07B39)", borderRadius: "3px", height: "40%" }}></span>
                  <span style={{ flex: 1, background: "linear-gradient(180deg,#F5A878,#E07B39)", borderRadius: "3px", height: "70%" }}></span>
                  <span style={{ flex: 1, background: "linear-gradient(180deg,#F5A878,#E07B39)", borderRadius: "3px", height: "100%" }}></span>
                  <span style={{ flex: 1, background: "linear-gradient(180deg,#F5A878,#E07B39)", borderRadius: "3px", height: "55%" }}></span>
                  <span style={{ flex: 1, background: "linear-gradient(180deg,#F5A878,#E07B39)", borderRadius: "3px", height: "85%" }}></span>
                  <span style={{ flex: 1, background: "linear-gradient(180deg,#F5A878,#E07B39)", borderRadius: "3px", height: "35%" }}></span>
                  <span style={{ flex: 1, background: "linear-gradient(180deg,#F5A878,#E07B39)", borderRadius: "3px", height: "65%" }}></span>
                  <span style={{ flex: 1, background: "linear-gradient(180deg,#F5A878,#E07B39)", borderRadius: "3px", height: "90%" }}></span>
                  <span style={{ flex: 1, background: "linear-gradient(180deg,#F5A878,#E07B39)", borderRadius: "3px", height: "50%" }}></span>
                  <span style={{ flex: 1, background: "linear-gradient(180deg,#F5A878,#E07B39)", borderRadius: "3px", height: "78%" }}></span>
                </div>
                <h3 className="font-bricolage" style={{ fontWeight: 700, fontSize: "28px", color: "#fff", margin: "0 0 12px", letterSpacing: "-.02em" }}>
                  Reads your mind
                </h3>
                <p style={{ fontSize: "15.5px", lineHeight: "1.55", color: "#A29B91", margin: 0 }}>
                  Groq-powered Whisper finishes transcribing faster than you stop talking. Filler gone, self-corrections resolved, grammar fixed.
                </p>
              </div>
              <div className="font-jetbrains" style={{ fontSize: "12px", color: "#6B6560" }}>
                ~400ms latency
              </div>
            </div>
            {/* card 2 */}
            <div className="gallery-card" style={{ flex: "none", width: "440px", background: "#E07B39", borderRadius: "24px", padding: "38px", height: "440px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div className="font-jetbrains" style={{ fontSize: "12px", color: "#1A1A1A", letterSpacing: ".06em", marginBottom: "24px", opacity: 0.7 }}>
                  02 / COMMAND
                </div>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="#1A1A1A" style={{ marginBottom: "24px" }}>
                  <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
                </svg>
                <h3 className="font-bricolage" style={{ fontWeight: 700, fontSize: "28px", color: "#1A1A1A", margin: "0 0 12px", letterSpacing: "-.02em" }}>
                  AI Command Mode
                </h3>
                <p style={{ fontSize: "15.5px", lineHeight: "1.55", color: "#5C3417", margin: 0 }}>
                  Copy any text, speak a command: &quot;reply professionally&quot;, &quot;translate to Urdu&quot;, &quot;make it shorter&quot;. It rewrites in place.
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                <span className="font-jetbrains" style={{ fontSize: "11.5px", color: "#1A1A1A", background: "rgba(26,26,26,.12)", padding: "5px 10px", borderRadius: "8px" }}>
                  /reply
                </span>
                <span className="font-jetbrains" style={{ fontSize: "11.5px", color: "#1A1A1A", background: "rgba(26,26,26,.12)", padding: "5px 10px", borderRadius: "8px" }}>
                  /summarize
                </span>
                <span className="font-jetbrains" style={{ fontSize: "11.5px", color: "#1A1A1A", background: "rgba(26,26,26,.12)", padding: "5px 10px", borderRadius: "8px" }}>
                  /email
                </span>
              </div>
            </div>
            {/* card 3 */}
            <div className="gallery-card" style={{ flex: "none", width: "440px", background: "linear-gradient(160deg,#2C2420,#1F1B18)", border: "1px solid #332C26", borderRadius: "24px", padding: "38px", height: "440px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div className="font-jetbrains" style={{ fontSize: "12px", color: "#E07B39", letterSpacing: ".06em", marginBottom: "24px" }}>
                  03 / TONES
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "26px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#1A1A1A", background: "#E07B39", padding: "7px 14px", borderRadius: "999px" }}>Formal</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#C5BFB8", border: "1px solid #3A332C", padding: "7px 14px", borderRadius: "999px" }}>Casual</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#C5BFB8", border: "1px solid #3A332C", padding: "7px 14px", borderRadius: "999px" }}>Funny</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#C5BFB8", border: "1px solid #3A332C", padding: "7px 14px", borderRadius: "999px" }}>Polite</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#C5BFB8", border: "1px solid #3A332C", padding: "7px 14px", borderRadius: "999px" }}>Social</span>
                </div>
                <h3 className="font-bricolage" style={{ fontWeight: 700, fontSize: "28px", color: "#fff", margin: "0 0 12px", letterSpacing: "-.02em" }}>
                  Five rephrasing tones
                </h3>
                <p style={{ fontSize: "15.5px", lineHeight: "1.55", color: "#A29B91", margin: 0 }}>
                  One thought, any register. Switch the voice of any text instantly &mdash; without rewriting a word yourself.
                </p>
              </div>
              <div className="font-jetbrains" style={{ fontSize: "12px", color: "#6B6560" }}>
                applied in place
              </div>
            </div>
            {/* card 4 */}
            <div className="gallery-card" style={{ flex: "none", width: "440px", background: "linear-gradient(160deg,#2C2420,#1F1B18)", border: "1px solid #332C26", borderRadius: "24px", padding: "38px", height: "440px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div className="font-jetbrains" style={{ fontSize: "12px", color: "#E07B39", letterSpacing: ".06em", marginBottom: "24px" }}>
                  04 / SNIPPETS
                </div>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#E07B39" strokeWidth="2" strokeLinejoin="round" style={{ marginBottom: "24px" }}>
                  <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                </svg>
                <h3 className="font-bricolage" style={{ fontWeight: 700, fontSize: "28px", color: "#fff", margin: "0 0 12px", letterSpacing: "-.02em" }}>
                  Snippets &amp; dictionary
                </h3>
                <p style={{ fontSize: "15.5px", lineHeight: "1.55", color: "#A29B91", margin: 0 }}>
                  Say &quot;my email&quot; and it expands instantly &mdash; zero latency. Teach it names, brands and jargon it kept getting wrong.
                </p>
              </div>
              <div className="font-jetbrains" style={{ fontSize: "12px", color: "#6B6560" }}>
                no AI call needed
              </div>
            </div>
            {/* card 5 */}
            <div className="gallery-card" style={{ flex: "none", width: "440px", background: "linear-gradient(160deg,#2C2420,#1F1B18)", border: "1px solid #332C26", borderRadius: "24px", padding: "38px", height: "440px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div className="font-jetbrains" style={{ fontSize: "12px", color: "#E07B39", letterSpacing: ".06em", marginBottom: "24px" }}>
                  05 / LANGUAGES
                </div>
                <div className="font-bricolage" style={{ fontWeight: 800, fontSize: "64px", color: "#E07B39", lineHeight: 1, marginBottom: "20px" }}>
                  100+
                </div>
                <h3 className="font-bricolage" style={{ fontWeight: 700, fontSize: "28px", color: "#fff", margin: "0 0 12px", letterSpacing: "-.02em" }}>
                  Speak any language
                </h3>
                <p style={{ fontSize: "15.5px", lineHeight: "1.55", color: "#A29B91", margin: 0 }}>
                  Auto-detects what you speak or pin a language. Translate on command, and sign emails automatically with your name.
                </p>
              </div>
              <div className="font-jetbrains" style={{ fontSize: "12px", color: "#6B6560" }}>
                auto-detect &middot; translate
              </div>
            </div>
            {/* card 6 */}
            <div className="gallery-card" style={{ flex: "none", width: "440px", background: "#fff", borderRadius: "24px", padding: "38px", height: "440px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div className="font-jetbrains" style={{ fontSize: "12px", color: "#C0631F", letterSpacing: ".06em", marginBottom: "24px" }}>
                  06 / PRIVACY
                </div>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#E07B39" strokeWidth="2" strokeLinejoin="round" style={{ marginBottom: "24px" }}>
                  <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <h3 className="font-bricolage" style={{ fontWeight: 700, fontSize: "28px", color: "#26231F", margin: "0 0 12px", letterSpacing: "-.02em" }}>
                  Private by design
                </h3>
                <p style={{ fontSize: "15.5px", lineHeight: "1.55", color: "#6B6560", margin: 0 }}>
                  No account. No cloud sync. No telemetry. Your keys and your data stay on your device, full stop.
                </p>
              </div>
              <a
                href={WINDOWS_DOWNLOAD_URL}
                data-cursor
                onMouseMove={handleMagnetMove}
                onMouseLeave={handleMagnetLeave}
                style={{
                  alignSelf: "flex-start",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#fff",
                  background: "#E07B39",
                  padding: "13px 24px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  transition: "transform .12s ease-out",
                  textDecoration: "none",
                }}
                className="hover-bg-darkorange"
              >
                {WINDOWS_DOWNLOAD_LABEL}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ORBIT / WORKS EVERYWHERE ===================== */}
      <section style={{ background: "#FDF6F0", padding: "48px 0 96px", overflow: "hidden" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          <div data-reveal style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 40px" }}>
            <span className="font-jetbrains" style={{ fontSize: "13px", color: "#E07B39", letterSpacing: ".06em" }}>
              WORKS WHERE YOU WORK
            </span>
            <h2 className="font-bricolage" style={{ fontWeight: 800, fontSize: "clamp(32px, 5vw, 54px)", lineHeight: 0.98, letterSpacing: "-.03em", color: "#26231F", margin: "16px 0 0" }}>
              Speaks every app&apos;s language.
            </h2>
            <p style={{ fontSize: "18px", lineHeight: 1.55, color: "#6B6560", margin: "18px 0 0" }}>
              Dictate and command in everything you already use. Lisup injects clean text right where your cursor is &mdash; no copy-paste, no app-switching.
            </p>
          </div>

          {/* Desktop Orbit wrapper */}
          <div data-reveal className="orbit-desktop-wrapper" style={{ position: "relative", height: "520px" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "460px", height: "460px" }}>
              {/* glow */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "340px", height: "340px", borderRadius: "50%", background: "radial-gradient(circle,rgba(224,123,57,.16),transparent 68%)", animation: "dotpulse 5s ease-in-out infinite" }}></div>
              {/* orbit paths */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "360px", height: "360px", border: "1px dashed #E2D8CC", borderRadius: "50%" }}></div>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "220px", height: "220px", border: "1px dashed #E2D8CC", borderRadius: "50%" }}></div>
              
              {/* center logo */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <Image
                  src="/logo.png"
                  alt="Lisup Logo"
                  width="78"
                  height="78"
                  style={{
                    borderRadius: "50%",
                    filter: "drop-shadow(0 14px 28px rgba(224,123,57,0.4))",
                    objectFit: "cover"
                  }}
                />
              </div>

              {/* OUTER RING */}
              <div style={{ position: "absolute", inset: 0, animation: "spin 44s linear infinite" }}>
                <div style={{ position: "absolute", left: "379px", top: "199px", width: "62px", height: "62px", borderRadius: "16px", background: "#fff", boxShadow: "0 14px 28px -14px rgba(26,26,26,.32)", display: "flex", alignItems: "center", justifyContent: "center", animation: "spinrev 44s linear infinite" }}>
                  <SiGmail size={28} color="#26231F" />
                </div>
                <div style={{ position: "absolute", left: "289px", top: "355px", width: "62px", height: "62px", borderRadius: "16px", background: "#fff", boxShadow: "0 14px 28px -14px rgba(26,26,26,.32)", display: "flex", alignItems: "center", justifyContent: "center", animation: "spinrev 44s linear infinite" }}>
                  <SiSlack size={28} color="#26231F" />
                </div>
                <div style={{ position: "absolute", left: "109px", top: "355px", width: "62px", height: "62px", borderRadius: "16px", background: "#fff", boxShadow: "0 14px 28px -14px rgba(26,26,26,.32)", display: "flex", alignItems: "center", justifyContent: "center", animation: "spinrev 44s linear infinite" }}>
                  <SiNotion size={28} color="#26231F" />
                </div>
                <div style={{ position: "absolute", left: "19px", top: "199px", width: "62px", height: "62px", borderRadius: "16px", background: "#fff", boxShadow: "0 14px 28px -14px rgba(26,26,26,.32)", display: "flex", alignItems: "center", justifyContent: "center", animation: "spinrev 44s linear infinite" }}>
                  <SiGoogle size={28} color="#26231F" />
                </div>
                <div style={{ position: "absolute", left: "109px", top: "43px", width: "62px", height: "62px", borderRadius: "16px", background: "#fff", boxShadow: "0 14px 28px -14px rgba(26,26,26,.32)", display: "flex", alignItems: "center", justifyContent: "center", animation: "spinrev 44s linear infinite" }}>
                  <SiWhatsapp size={28} color="#26231F" />
                </div>
                <div style={{ position: "absolute", left: "289px", top: "43px", width: "62px", height: "62px", borderRadius: "16px", background: "#fff", boxShadow: "0 14px 28px -14px rgba(26,26,26,.32)", display: "flex", alignItems: "center", justifyContent: "center", animation: "spinrev 44s linear infinite" }}>
                  <SiFigma size={26} color="#26231F" />
                </div>
              </div>

              {/* INNER RING */}
              <div style={{ position: "absolute", inset: 0, animation: "spinrev 31s linear infinite" }}>
                <div style={{ position: "absolute", left: "294px", top: "254px", width: "58px", height: "58px", borderRadius: "15px", background: "#fff", boxShadow: "0 12px 24px -12px rgba(26,26,26,.3)", display: "flex", alignItems: "center", justifyContent: "center", animation: "spin 31s linear infinite" }}>
                  <VscVscode size={24} color="#26231F" />
                </div>
                <div style={{ position: "absolute", left: "199px", top: "309px", width: "58px", height: "58px", borderRadius: "15px", background: "#fff", boxShadow: "0 12px 24px -12px rgba(26,26,26,.3)", display: "flex", alignItems: "center", justifyContent: "center", animation: "spin 31s linear infinite" }}>
                  <PiMicrosoftWordLogo size={26} color="#26231F" />
                </div>
                <div style={{ position: "absolute", left: "104px", top: "254px", width: "58px", height: "58px", borderRadius: "15px", background: "#fff", boxShadow: "0 12px 24px -12px rgba(26,26,26,.3)", display: "flex", alignItems: "center", justifyContent: "center", animation: "spin 31s linear infinite" }}>
                  <SiGoogledocs size={24} color="#26231F" />
                </div>
                <div style={{ position: "absolute", left: "104px", top: "144px", width: "58px", height: "58px", borderRadius: "15px", background: "#fff", boxShadow: "0 12px 24px -12px rgba(26,26,26,.3)", display: "flex", alignItems: "center", justifyContent: "center", animation: "spin 31s linear infinite" }}>
                  <PiMicrosoftOutlookLogo size={24} color="#26231F" />
                </div>
                <div style={{ position: "absolute", left: "199px", top: "89px", width: "58px", height: "58px", borderRadius: "15px", background: "#fff", boxShadow: "0 12px 24px -12px rgba(26,26,26,.3)", display: "flex", alignItems: "center", justifyContent: "center", animation: "spin 31s linear infinite" }}>
                  <SiDiscord size={26} color="#26231F" />
                </div>
                <div style={{ position: "absolute", left: "294px", top: "144px", width: "58px", height: "58px", borderRadius: "15px", background: "#fff", boxShadow: "0 12px 24px -12px rgba(26,26,26,.3)", display: "flex", alignItems: "center", justifyContent: "center", animation: "spin 31s linear infinite" }}>
                  <PiMicrosoftExcelLogo size={26} color="#26231F" />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Orbit fallback grid */}
          <div className="orbit-mobile-wrapper">
            <div className="orbit-mobile-card">
              <SiGmail size={24} color="#26231F" />
              <span>Gmail</span>
            </div>
            <div className="orbit-mobile-card">
              <SiSlack size={22} color="#26231F" />
              <span>Slack</span>
            </div>
            <div className="orbit-mobile-card">
              <SiNotion size={22} color="#26231F" />
              <span style={{ marginTop: "4px" }}>Notion</span>
            </div>
            <div className="orbit-mobile-card">
              <SiWhatsapp size={22} color="#26231F" />
              <span>WhatsApp</span>
            </div>
            <div className="orbit-mobile-card">
              <SiFigma size={22} color="#26231F" />
              <span>Figma</span>
            </div>
            <div className="orbit-mobile-card">
              <VscVscode size={22} color="#26231F" />
              <span>VS Code</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section id="why" style={{ background: "#FDF6F0", padding: "120px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          <div data-reveal style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "30px", marginBottom: "70px" }}>
            <h2 className="font-bricolage" style={{ fontWeight: 800, fontSize: "clamp(36px, 6vw, 60px)", lineHeight: 0.95, letterSpacing: "-.03em", color: "#26231F", margin: 0, maxWidth: "680px" }}>
              Your hands can&apos;t keep up with your head.
            </h2>
            <span className="font-jetbrains" style={{ fontSize: "13px", color: "#A29B91", letterSpacing: ".04em", whiteSpace: "nowrap" }}>
              (03) &mdash; WHY LISUP
            </span>
          </div>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, borderTop: "1px solid #E2DDD5" }}>
            <div data-reveal style={{ padding: "36px 28px 0 0" }} className="stats-card stats-border-right">
              <div data-count="3" data-suffix="&times;" className="font-bricolage" style={{ fontWeight: 800, fontSize: "96px", lineHeight: 0.9, color: "#E07B39", letterSpacing: "-.04em" }}>
                0
              </div>
              <div style={{ fontSize: "15px", color: "#6B6560", fontWeight: 500, marginTop: "14px", lineHeight: 1.45 }}>
                Faster than typing, on every device you own
              </div>
            </div>
            <div data-reveal style={{ padding: "36px 28px 0 28px" }} className="stats-card stats-border-right">
              <div data-count="150" data-suffix="" className="font-bricolage" style={{ fontWeight: 800, fontSize: "96px", lineHeight: 0.9, color: "#26231F", letterSpacing: "-.04em" }}>
                0
              </div>
              <div style={{ fontSize: "15px", color: "#6B6560", fontWeight: 500, marginTop: "14px", lineHeight: 1.45 }}>
                Words a minute spoken vs ~40 typed
              </div>
            </div>
            <div data-reveal style={{ padding: "36px 28px 0 28px" }} className="stats-card stats-border-right">
              <div data-count="100" data-suffix="+" className="font-bricolage" style={{ fontWeight: 800, fontSize: "96px", lineHeight: 0.9, color: "#26231F", letterSpacing: "-.04em" }}>
                0
              </div>
              <div style={{ fontSize: "15px", color: "#6B6560", fontWeight: 500, marginTop: "14px", lineHeight: 1.45 }}>
                Languages, auto-detected or pinned
              </div>
            </div>
            <div data-reveal style={{ padding: "36px 0 0 28px" }} className="stats-card">
              <div data-count="100" data-suffix="%" className="font-bricolage" style={{ fontWeight: 800, fontSize: "96px", lineHeight: 0.9, color: "#26231F", letterSpacing: "-.04em" }}>
                0
              </div>
              <div style={{ fontSize: "15px", color: "#6B6560", fontWeight: 500, marginTop: "14px", lineHeight: 1.45 }}>
                On-device. Nothing synced or stored in a cloud
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FILLER FILTER BAND ===================== */}
      <section style={{ background: "#FDF6F0", padding: "72px 0 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          <div
            data-reveal
            style={{
              transition:
                "opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "30px",
              marginBottom: "30px",
            }}
          >
            <h2
              className="font-bricolage"
              style={{
                fontWeight: 800,
                fontSize: "clamp(32px, 5vw, 48px)",
                lineHeight: 0.95,
                letterSpacing: "-.03em",
                color: "#26231F",
                margin: 0,
                maxWidth: "680px",
              }}
            >
              Messy in.
              <br />
              Polished out.
            </h2>
            <span
              className="font-jetbrains"
              style={{
                fontSize: "13px",
                color: "#A29B91",
                letterSpacing: ".04em",
                whiteSpace: "nowrap",
              }}
            >
              RAW &rarr; CLEAN
            </span>
          </div>
          <div
            data-reveal
            className="filler-card"
            style={{
              transition:
                "opacity .7s cubic-bezier(.2,.7,.2,1) .1s, transform .7s cubic-bezier(.2,.7,.2,1) .1s",
              position: "relative",
              overflow: "hidden",
              background: "#fff",
              border: "1px solid #ECE8E2",
              borderRadius: "24px",
              padding: "36px 44px 40px",
              boxShadow: "0 34px 70px -42px rgba(26,26,26,.3)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: "150px",
                background: "linear-gradient(90deg,transparent,rgba(224,123,57,.12),transparent)",
                animation: "beam 3.4s ease-in-out infinite",
                pointerEvents: "none",
              }}
            ></div>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "26px",
              }}
            >
              <span className="font-jetbrains" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#A29B91", letterSpacing: ".04em" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#C9A48A" }}></span>
                RAW DICTATION
              </span>
              <span className="font-jetbrains" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#C0631F", letterSpacing: ".04em" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#E07B39", animation: "dotpulse 1.4s infinite" }}></span>
                FILTERING
              </span>
              <span className="font-jetbrains" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#2C9A5E", letterSpacing: ".04em" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#2C9A5E" }}></span>
                CLEAN &#10003;
              </span>
            </div>
            <div
              ref={fillerStageRef}
              className="font-bricolage"
              style={{
                fontWeight: 700,
                fontSize: "clamp(24px, 4vw, 38px)",
                lineHeight: 1.32,
                letterSpacing: "-.02em",
                color: "#26231F",
                minHeight: "104px",
              }}
            ></div>
            <div style={{ position: "relative", marginTop: "22px", display: "flex", alignItems: "center", gap: "10px", fontSize: "14.5px", color: "#6B6560" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E07B39" strokeWidth="2" strokeLinejoin="round">
                <path d="M22 3H2l8 9.5V19l4 2v-8.5z" />
              </svg>
              Fillers, false starts and &quot;ums&quot; stripped automatically &mdash; grammar fixed, tone kept.
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TONE SWITCHER ===================== */}
      <section id="tones" style={{ background: "#1A1A1A", padding: "120px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px" }}>
          <div data-reveal style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 44px" }}>
            <span className="font-jetbrains" style={{ fontSize: "13px", color: "#E07B39", letterSpacing: ".06em" }}>
              (04) &mdash; FIVE TONES, ONE VOICE
            </span>
            <h2 className="font-bricolage" style={{ fontWeight: 800, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 0.98, letterSpacing: "-.03em", color: "#fff", margin: "18px 0 0" }}>
              Same thought. Any register.
            </h2>
          </div>

          <div data-reveal style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "28px" }}>
              {Object.keys(TONES).map((t) => {
                const isSelected = tone === t;
                return (
                  <button
                    key={t}
                    onClick={() => selectTone(t as keyof typeof TONES)}
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      padding: "12px 24px",
                      borderRadius: "999px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      border: isSelected ? "1px solid #E07B39" : "1px solid #3A332C",
                      background: isSelected ? "#E07B39" : "transparent",
                      color: isSelected ? "#1A1A1A" : "#C5BFB8",
                    }}
                    className={isSelected ? "tone-btn" : "tone-btn hover-border-orange"}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <div className="tone-card" style={{ background: "linear-gradient(160deg,#2C2420,#211C18)", border: "1px solid #332C26", borderRadius: "24px", padding: "40px 44px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#6B6560">
                  <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                </svg>
                <span className="font-jetbrains" style={{ fontSize: "12px", color: "#6B6560", letterSpacing: ".04em" }}>
                  YOU SAID
                </span>
              </div>
              <p className="font-jetbrains" style={{ fontSize: "14px", color: "#6B6560", margin: "0 0 26px", paddingBottom: "26px", borderBottom: "1px dashed #3A332C" }}>
                &quot;hey just checking if we&apos;re still on for the call tomorrow&quot;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E07B39" }}></span>
                <span className="font-jetbrains" style={{ fontSize: "12px", color: "#E07B39", fontWeight: 600, letterSpacing: ".05em" }}>
                  {tone.toUpperCase()}
                </span>
              </div>
              <p ref={toneElRef} style={{ fontSize: "25px", lineHeight: 1.5, color: "#fff", margin: 0, fontWeight: 500, minHeight: "76px", transition: "opacity .25s" }}>
                {toneText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section style={{ background: "#E07B39", padding: "110px 0", position: "relative", overflow: "hidden" }}>
        <div className="lz-hidemob" style={{ position: "absolute", top: "-160px", right: "-90px", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,255,255,.2),transparent 70%)" }}></div>
        <div data-reveal style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 48px", textAlign: "center", position: "relative" }}>
          <h2 className="font-bricolage" style={{ fontWeight: 800, fontSize: "clamp(48px, 8vw, 80px)", lineHeight: 0.95, letterSpacing: "-.035em", color: "#fff", margin: 0 }}>
            Stop typing.
            <br />
            Start talking.
          </h2>
          <p style={{ fontSize: "19px", lineHeight: 1.5, color: "rgba(255,255,255,.92)", margin: "24px auto 0", maxWidth: "480px" }}>
            Free while in beta. Lives in your tray, launches on boot, ready the moment you press Alt + Space.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", marginTop: "38px" }}>
            <a
              href={WINDOWS_DOWNLOAD_URL}
              data-cursor
              onMouseMove={handleMagnetMove}
              onMouseLeave={handleMagnetLeave}
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#E07B39",
                background: "#fff",
                padding: "17px 36px",
                borderRadius: "999px",
                cursor: "pointer",
                transition: "transform .12s ease-out, background .2s",
                boxShadow: "0 18px 38px -12px rgba(26,26,26,.4)",
                textDecoration: "none",
              }}
              className="hover-bg-fdf6f0"
            >
              {WINDOWS_DOWNLOAD_LABEL}
            </a>
            <span className="font-jetbrains" style={{ fontSize: "13px", color: "rgba(255,255,255,.9)", fontWeight: 500 }}>
              WINDOWS &middot; MACOS SOON &middot; ANDROID SOON
            </span>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer style={{ background: "#1A1A1A", padding: "70px 0 0", overflow: "hidden" }}>
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
                <a href="#features" data-cursor style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                  Features
                </a>
                <a href="#how" data-cursor style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                  How it works
                </a>
                <a href="#tones" data-cursor style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                  Tones
                </a>
              </div>
            </div>
            <div>
              <div className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 600, color: "#6B6560", marginBottom: "18px", letterSpacing: ".06em" }}>
                COMPANY
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a href="/about" data-cursor style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                  About
                </a>
                <a href="/privacy" data-cursor style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                  Privacy
                </a>
                <a href="/contact" data-cursor style={{ fontSize: "14px", color: "#C5BFB8", textDecoration: "none" }}>
                  Contact
                </a>
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
