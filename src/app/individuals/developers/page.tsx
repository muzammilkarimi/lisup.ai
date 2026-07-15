"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "../../Navbar";
import SiteFooter from "../../SiteFooter";
import { 
  FiCode, 
  FiArrowLeft, 
  FiPlay, 
  FiRefreshCw, 
  FiTerminal, 
  FiClock,
  FiZap
} from "react-icons/fi";

type DemoState = "idle" | "selecting" | "listening" | "rewriting" | "done";

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = useState<"router" | "docstring" | "json">("router");
  const [isPlaying, setIsPlaying] = useState(false);
  const [animState, setAnimState] = useState<DemoState>("idle");
  const [visibleRawText, setVisibleRawText] = useState("");
  const [editorText, setEditorText] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Story steps descriptions and code structures
  const storyChapters = {
    router: {
      time: "10:00 AM",
      title: "Boilerplate Generation",
      description: "Alex starts the morning by drafting a Flask API router for weather forecasts. Instead of typing boilerplate imports and routing decorators manually, Alex types a single TODO line and dictates his instructions. Lisup converts the spoken idea to a clean requests caching function in-place.",
      filename: "routes.py",
      initial: "# TODO: Fetch weather data from open-meteo, cache for 1 hour, return JSON",
      rawSpeech: "generate flask route weather using requests and dict cache",
      rewritten: `import requests, time
_cache = {}

@app.route('/api/weather')
def get_weather():
    now = time.time()
    if 'data' in _cache and now - _cache['time'] < 3600:
        return _cache['data']
    data = requests.get('https://api.open-meteo.com/v1/forecast').json()
    _cache['data'] = data
    _cache['time'] = now
    return data`,
      logs: [
        "$ lisup init --ide vscode",
        "[LISUP] Audio stream captured (duration: 3.8s)",
        "[LISUP] Selected text: '# TODO: Fetch weather data...'",
        "[LISUP] Generating python-flask mapping...",
        "[LISUP] Formatting code in-place..."
      ],
      optimizingText: "âš¡ GENERATING FLASK ROUTE AND CACHE DICT..."
    },
    docstring: {
      time: "1:30 PM",
      title: "PR Prep & Documentation",
      description: "At 1:30 PM, Alex is cleaning up code before a Pull Request review. The team requires thorough API documentation. Alex highlights the calculation function, speaks to his mic, and Lisup generates Google-style parameter docstrings in 2 seconds.",
      filename: "math_utils.py",
      initial: `def calculate_distance(p1, p2):
    # TODO: calculate distance
    return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)`,
      rawSpeech: "add a clean docstring detailing parameters p1 and p2",
      rewritten: `def calculate_distance(p1, p2):
    \"\"\"Calculates Euclidean distance between two points.

    Args:
        p1 (Point): Starting coordinate point.
        p2 (Point): Ending coordinate point.

    Returns:
        float: The direct distance.
    \"\"\"
    return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)`,
      logs: [
        "$ lisup docstring --style google",
        "[LISUP] Target function: 'calculate_distance'",
        "[LISUP] Parsing arguments: p1 (Point), p2 (Point)",
        "[LISUP] Compiling Docstring block...",
        "[LISUP] Injecting block in-place..."
      ],
      optimizingText: "âš¡ COMPILING GOOGLE-STYLE DOCSTRING..."
    },
    json: {
      time: "3:00 PM",
      title: "Webhook Mapping & TypeGen",
      description: "At 3:00 PM, Alex integrates a Stripe billing webhook. He receives a complex JSON payload. Instead of writing types manually, Alex copies the JSON structure, selects it, and speaks 'create typescript interface named Product'. Lisup writes the definitions in-place.",
      filename: "types.ts",
      initial: `// TODO: Create interface for product JSON:
// { "id": 104, "name": "Wireless Mouse", "price": 49.99, "in_stock": true }`,
      rawSpeech: "create typescript interface named Product",
      rewritten: `interface Product {
  id: number;
  name: string;
  price: number;
  in_stock: boolean;
}`,
      logs: [
        "$ lisup typegen --lang typescript",
        "[LISUP] Parsing JSON payload fields: id, name, price, in_stock",
        "[LISUP] Mapping types: number, string, boolean",
        "[LISUP] Generating interface: Product",
        "[LISUP] Injecting type definitions..."
      ],
      optimizingText: "âš¡ GENERATING TYPESCRIPT INTERFACE..."
    }
  };

  const currentData = storyChapters[activeTab];

  useEffect(() => {
    setEditorText(currentData.initial);
    setAnimState("idle");
    setVisibleRawText("");
    setTerminalLogs([]);
    clearAllTimeouts();
  }, [activeTab, currentData.initial]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
  };

  const startSimulation = () => {
    clearAllTimeouts();
    setIsPlaying(true);
    setAnimState("selecting");
    setEditorText(currentData.initial);
    setVisibleRawText("");
    setTerminalLogs([`$ lisup init --file ${currentData.filename}`, "[LISUP] Active file hook attached."]);

    const t1 = setTimeout(() => {
      setAnimState("listening");
      setTerminalLogs(prev => [...prev, "[LISUP] Speech listener active (16kHz)..."]);

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
    setTerminalLogs(prev => [
      ...prev,
      ...currentData.logs.slice(1, -1)
    ]);

    const tId = setTimeout(() => {
      setAnimState("done");
      setEditorText(currentData.rewritten);
      setTerminalLogs(prev => [
        ...prev,
        currentData.logs[currentData.logs.length - 1]
      ]);
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
            linear-gradient(rgba(56, 189, 248, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
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
              color: "#38BDF8",
              textDecoration: "none",
              fontSize: "13.5px",
              fontWeight: 600,
              marginBottom: "28px"
            }}
            data-cursor
          >
            <FiArrowLeft /> Back to home
          </Link>
          <div className="font-jetbrains" style={{ fontSize: "12.5px", color: "#38BDF8", letterSpacing: ".25em", textTransform: "uppercase" }}>
            {"// A DAY IN THE LIFE STORY"}
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
            How Alex Codes Hands-Free.<br />
            A Narrative Journey.
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
            Follow Alex, a senior systems developer, as he navigates his daily coding workflow without touching his keyboard. Speak logic, rewrite comments, and map structures in-place.
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
                      background: isActive ? "rgba(56, 189, 248, 0.04)" : "transparent",
                      border: "1px solid",
                      borderColor: isActive ? "rgba(56, 189, 248, 0.2)" : "#27272A",
                      borderRadius: "12px",
                      padding: "24px",
                      cursor: isPlaying ? "not-allowed" : "pointer",
                      transition: "all 0.3s ease",
                      opacity: isPlaying && !isActive ? 0.3 : 1
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <FiClock color={isActive ? "#38BDF8" : "#71717A"} size={14} />
                      <span className="font-jetbrains" style={{ fontSize: "11.5px", color: isActive ? "#38BDF8" : "#71717A", fontWeight: 700 }}>{chapter.time} &mdash; {chapter.title}</span>
                    </div>
                    <h3 className="font-bricolage" style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>{chapter.filename}</h3>
                    {isActive && (
                      <p className="font-hanken" style={{ fontSize: "14.5px", lineHeight: 1.6, color: "#A1A1AA", margin: 0 }}>
                        {chapter.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Side: High-Fidelity IDE simulator */}
            <div>
              <div style={{ background: "#18181A", borderRadius: "16px", overflow: "hidden", border: "1px solid #27272A", boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
                
                {/* VS Code Window bar */}
                <div style={{ height: "40px", background: "#202023", display: "flex", alignItems: "center", padding: "0 18px", justifyContent: "space-between", borderBottom: "1px solid #121214" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F56" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E" }}></div>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27C93F" }}></div>
                  </div>
                  <span className="font-jetbrains" style={{ fontSize: "11px", color: "#71717A" }}>
                    VS Code â€” {currentData.filename}
                  </span>
                  <div style={{ width: "40px" }}></div>
                </div>

                {/* Editor Area */}
                <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "350px", background: "#141416" }}>
                  
                  {/* File Tab */}
                  <div style={{ height: "36px", background: "#1C1C1E", display: "flex", alignItems: "center", borderBottom: "1px solid #121214" }}>
                    <div style={{ height: "100%", background: "#141416", padding: "0 18px", display: "flex", alignItems: "center", gap: "8px", borderRight: "1px solid #121214" }}>
                      <FiCode size={12} color="#38BDF8" />
                      <span className="font-jetbrains" style={{ fontSize: "11px", color: "#F4F4F5" }}>{currentData.filename}</span>
                    </div>
                  </div>

                  {/* Code Block */}
                  <div style={{ flex: 1, padding: "28px", overflowY: "auto" }}>
                    <pre className="font-jetbrains" style={{ fontSize: "13.5px", lineHeight: 1.65, margin: 0 }}>
                      {animState === "selecting" ? (
                        <span style={{ background: "rgba(56, 189, 248, 0.25)", color: "#FFF", padding: "2px 4px", borderRadius: "4px" }}>
                          {editorText}
                        </span>
                      ) : (
                        <span style={{ 
                          color: editorText.startsWith("#") || editorText.startsWith("//") ? "#6A9955" : "#38BDF8" 
                        }}>
                          {editorText}
                        </span>
                      )}
                      {animState === "done" && (
                        <span style={{ display: "inline-block", width: "2px", height: "14px", background: "#38BDF8", marginLeft: "2px", animation: "blink 1s infinite" }}></span>
                      )}
                    </pre>
                  </div>

                  {/* Floating Lisup Desktop Widget */}
                  <div 
                    className="mock-lisup-widget-overlay"
                    style={{ 
                      background: "rgba(20, 20, 22, 0.95)", 
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
                            background: animState === "listening" ? "#38BDF8" : animState === "rewriting" ? "#E07B39" : animState === "done" ? "#10B981" : "#52525B" 
                          }}
                        ></div>
                        <span className="font-jetbrains" style={{ fontSize: "10.5px", color: "#A1A1AA", fontWeight: 700 }}>
                          {animState === "selecting" ? "1. SELECTING TEXT" : animState === "listening" ? "2. LISTENING SPEECH" : animState === "rewriting" ? "3. OPTIMIZING REWRITE" : "LISUP ACTIVE"}
                        </span>
                      </div>
                      <FiZap size={11} color="#38BDF8" />
                    </div>

                    <p className="font-hanken" style={{ fontSize: "13px", color: "#E4E4E7", margin: 0, minHeight: "38px", display: "flex", alignItems: "center" }}>
                      {animState === "selecting" ? (
                        <span>Selecting raw text draft inside IDE...</span>
                      ) : animState === "listening" ? (
                        <span>Voice: &quot;<strong style={{ color: "#38BDF8" }}>{visibleRawText}</strong>&quot;</span>
                      ) : animState === "rewriting" ? (
                        <span style={{ color: "#E07B39" }}>{currentData.optimizingText}</span>
                      ) : animState === "done" ? (
                        <span style={{ color: "#10B981" }}>âœ“ Replaced in-place inside editor!</span>
                      ) : (
                        <span style={{ color: "#71717A" }}>Click button below to run the simulation ...</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Terminal console */}
                <div style={{ background: "#0F0F10", borderTop: "1px solid #27272A", padding: "14px 20px", height: "110px", overflowY: "auto" }}>
                  <div className="font-jetbrains" style={{ fontSize: "10px", color: "#52525B", display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                    <FiTerminal /> TERMINAL EXECUTION PIPELINE
                  </div>
                  <div className="font-jetbrains" style={{ fontSize: "12px", color: "#38BDF8", lineHeight: 1.5 }}>
                    {terminalLogs.length === 0 ? (
                      <span style={{ color: "#3F3F46" }}>$ Waiting for dictation trigger...</span>
                    ) : (
                      terminalLogs.map((log, i) => (
                        <div key={i}>{log}</div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Simulation Trigger */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
                <button
                  onClick={startSimulation}
                  disabled={isPlaying}
                  style={{
                    background: "#38BDF8",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 32px",
                    color: "#0F0F10",
                    cursor: isPlaying ? "not-allowed" : "pointer",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    boxShadow: "0 10px 24px rgba(56, 189, 248, 0.2)",
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
      <SiteFooter />
    </div>
  );
}
