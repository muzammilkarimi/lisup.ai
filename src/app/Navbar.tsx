"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FiUsers, 
  FiCode, 
  FiPenTool, 
  FiMessageSquare, 
  FiBookOpen, 
  FiBriefcase, 
  FiEye, 
  FiTrendingUp 
} from "react-icons/fi";

const INDIVIDUAL_ROLES = [
  {
    title: "Leaders",
    subtitle: "Unblock teams, build faster with voice",
    path: "leaders",
    icon: <FiUsers size={15} />
  },
  {
    title: "Developers",
    subtitle: "Speak more context, get better results",
    path: "developers",
    icon: <FiCode size={15} />
  },
  {
    title: "Creators",
    subtitle: "Capture content ideas anytime, anywhere",
    path: "creators",
    icon: <FiPenTool size={15} />
  },
  {
    title: "Customer Support",
    subtitle: "Resolve tickets 4x faster",
    path: "customer-support",
    icon: <FiMessageSquare size={15} />
  },
  {
    title: "Students",
    subtitle: "Write faster, study smarter",
    path: "students",
    icon: <FiBookOpen size={15} />
  },
  {
    title: "Lawyers",
    subtitle: "Dictate case notes and memos on the go",
    path: "lawyers",
    icon: <FiBriefcase size={15} />
  },
  {
    title: "Accessibility",
    subtitle: "Break free from the keyboard",
    path: "accessibility",
    icon: <FiEye size={15} />
  },
  {
    title: "Sales",
    subtitle: "Close more deals with your voice",
    path: "sales",
    icon: <FiTrendingUp size={15} />
  }
];

export default function Navbar() {
  const [isIndivOpen, setIsIndivOpen] = useState(false);
  const [isResOpen, setIsResOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [modalEmail, setModalEmail] = useState("");
  const [modalSubmitted, setModalSubmitted] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setModalSubmitted(false);
      setModalEmail("");
      setIsWaitlistOpen(true);
    };
    window.addEventListener("open-waitlist-modal", handleOpen);
    return () => window.removeEventListener("open-waitlist-modal", handleOpen);
  }, []);

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalEmail.trim()) {
      try {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: modalEmail }),
        });
        if (res.ok) {
          setModalSubmitted(true);
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const handleMagnetMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.3}px, ${(e.clientY - (r.top + r.height / 2)) * 0.45}px)`;
  };

  const handleMagnetLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "translate(0,0)";
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        paddingTop: "12px",
      }}
      id="site-navbar-wrapper"
    >
      <div
        id="site-navbar"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          pointerEvents: "auto",
          width: "min(92%, 1160px)",
          borderRadius: "999px",
          background: "rgba(253, 246, 240, 0.85)",
          border: "1.5px solid",
          borderColor: `rgba(224, 123, 57, ${isHovered ? 0.45 : 0.25})`,
          boxShadow: `0 12px 40px rgba(224, 123, 57, ${isHovered ? 0.12 : 0.08}), 0 1px 3px rgba(224, 123, 57, 0.04)`,
          backdropFilter: "blur(16px)",
          transition: "border-color .3s, box-shadow .3s",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            width: "100%",
            margin: "0 auto",
            padding: "0 32px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
        {/* LOGO */}
        <Link 
          href="/" 
          data-cursor 
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
        >
          <img
            src="/logo.png"
            alt="Lisup Logo"
            width="32"
            height="32"
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
          <span
            className="font-bricolage"
            style={{
              fontWeight: 800,
              fontSize: "22px",
              color: "#26231F",
              letterSpacing: "-.01em",
            }}
          >
            Lis<span style={{ color: "#E07B39" }}>up</span>
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <div
          className="lz-hidemob"
          style={{ display: "flex", alignItems: "center", gap: "34px" }}
        >
          {/* INDIVIDUALS DROPDOWN */}
          <div
            onMouseEnter={() => setIsIndivOpen(true)}
            onMouseLeave={() => setIsIndivOpen(false)}
            style={{ 
              position: "relative", 
              height: "64px", 
              display: "flex", 
              alignItems: "center"
            }}
          >
            <div
              data-cursor
              className="font-bricolage"
              style={{
                fontSize: "14px",
                color: "#26231F",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                userSelect: "none"
              }}
            >
              Individuals
              <svg
                width="8"
                height="5"
                viewBox="0 0 10 6"
                fill="none"
                style={{
                  transform: isIndivOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s"
                }}
              >
                <path d="M1 1l4 4 4-4" stroke="#6B6560" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* DROPDOWN MENU CARD */}
            <div
              style={{
                position: "absolute",
                top: "58px",
                left: "50%",
                transform: `translateX(-50%) translateY(${isIndivOpen ? "0px" : "8px"})`,
                width: "410px",
                background: "#fff",
                borderRadius: "20px",
                border: "1px solid #ECE8E2",
                boxShadow: "0 24px 48px rgba(26,26,26,0.08)",
                padding: "22px 18px",
                zIndex: 100,
                opacity: isIndivOpen ? 1 : 0,
                pointerEvents: isIndivOpen ? "auto" : "none",
                transition: "opacity 0.2s ease, transform 0.2s ease",
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gap: "4px"
              }}
            >
              <div className="font-jetbrains" style={{ fontSize: "9.5px", fontWeight: 700, color: "#A29B91", letterSpacing: "0.08em", paddingLeft: "10px", marginBottom: "6px" }}>
                FLOW FOR
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "2px" }}>
                {INDIVIDUAL_ROLES.map((role) => (
                  <Link
                    key={role.path}
                    href={`/individuals/${role.path}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "8px 10px",
                      borderRadius: "12px",
                      textDecoration: "none",
                      color: "inherit",
                      transition: "background 0.2s"
                    }}
                    className="hover-bg-fdf6f0-soft"
                  >
                    <div style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "8px",
                      background: "rgba(224, 123, 57, 0.07)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#E07B39",
                      flexShrink: 0
                    }}>
                      {role.icon}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                      <div className="font-bricolage" style={{ fontSize: "13.5px", fontWeight: 700, color: "#26231F", lineHeight: 1.15 }}>
                        {role.title}
                      </div>
                      <div className="font-hanken" style={{ fontSize: "11px", color: "#6B6560", lineHeight: 1.15 }}>
                        {role.subtitle}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* BUSINESS */}
          <Link
            href="/#why"
            data-cursor
            className="font-bricolage"
            style={{
              fontSize: "14px",
              color: "#26231F",
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: ".01em",
            }}
          >
            Business
          </Link>

          {/* RESOURCES DROPDOWN */}
          <div
            onMouseEnter={() => setIsResOpen(true)}
            onMouseLeave={() => setIsResOpen(false)}
            style={{ 
              position: "relative", 
              height: "64px", 
              display: "flex", 
              alignItems: "center"
            }}
          >
            <div
              data-cursor
              className="font-bricolage"
              style={{
                fontSize: "14px",
                color: "#26231F",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                userSelect: "none"
              }}
            >
              Resources
              <svg
                width="8"
                height="5"
                viewBox="0 0 10 6"
                fill="none"
                style={{
                  transform: isResOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s"
                }}
              >
                <path d="M1 1l4 4 4-4" stroke="#6B6560" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* RESOURCES CARD */}
            <div
              style={{
                position: "absolute",
                top: "58px",
                left: "50%",
                transform: `translateX(-50%) translateY(${isResOpen ? "0px" : "8px"})`,
                width: "160px",
                background: "#fff",
                borderRadius: "16px",
                border: "1px solid #ECE8E2",
                boxShadow: "0 24px 48px rgba(26,26,26,0.06)",
                padding: "10px 8px",
                zIndex: 100,
                opacity: isResOpen ? 1 : 0,
                pointerEvents: isResOpen ? "auto" : "none",
                transition: "opacity 0.2s ease, transform 0.2s ease",
                display: "flex",
                flexDirection: "column",
                gap: "2px"
              }}
            >
              <Link href="/#how" style={{ padding: "8px 12px", borderRadius: "8px", textDecoration: "none", fontSize: "12.5px", fontWeight: 600, color: "#26231F" }} className="hover-bg-fdf6f0-soft font-bricolage">How it works</Link>
              <Link href="/#features" style={{ padding: "8px 12px", borderRadius: "8px", textDecoration: "none", fontSize: "12.5px", fontWeight: 600, color: "#26231F" }} className="hover-bg-fdf6f0-soft font-bricolage">Features</Link>
              <Link href="/#tones" style={{ padding: "8px 12px", borderRadius: "8px", textDecoration: "none", fontSize: "12.5px", fontWeight: 600, color: "#26231F" }} className="hover-bg-fdf6f0-soft font-bricolage">Tone options</Link>
            </div>
          </div>

          {/* PRICING */}
          <Link
            href="/#why"
            data-cursor
            className="font-bricolage"
            style={{
              fontSize: "14px",
              color: "#26231F",
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: ".01em",
            }}
          >
            Pricing
          </Link>

          <div
            data-cursor
            onMouseMove={handleMagnetMove}
            onMouseLeave={handleMagnetLeave}
            onClick={() => setIsWaitlistOpen(true)}
            style={{
              fontSize: "13.5px",
              fontWeight: 700,
              color: "#fff",
              background: "#1A1A1A",
              padding: "9px 18px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "transform .12s ease-out, background .2s",
            }}
            className="hover-bg-orange"
          >
            Join waitlist
          </div>
        </div>

        {/* HAMBURGER MENU BUTTON FOR MOBILE */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
          aria-label="Toggle Navigation Menu"
          style={{
            marginRight: "16px"
          }}
        >
          <div className={`hamburger-line ${isMobileDrawerOpen ? "open-1" : ""}`}></div>
          <div className={`hamburger-line ${isMobileDrawerOpen ? "open-2" : ""}`} style={{ margin: "4px 0" }}></div>
          <div className={`hamburger-line ${isMobileDrawerOpen ? "open-3" : ""}`}></div>
        </button>

      </div>
    </div>

    {/* MOBILE DRAWER */}
    <div className={`mobile-drawer ${isMobileDrawerOpen ? "open" : ""}`} style={{ pointerEvents: isMobileDrawerOpen ? "auto" : "none" }}>

      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        
        {/* Main Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", borderBottom: "1px solid #ECE8E2", paddingBottom: "24px" }}>
          <Link
            href="/#why"
            onClick={() => setIsMobileDrawerOpen(false)}
            className="font-bricolage"
            style={{ fontSize: "20px", fontWeight: 700, color: "#26231F", textDecoration: "none" }}
          >
            Business
          </Link>
          <Link
            href="/#why"
            onClick={() => setIsMobileDrawerOpen(false)}
            className="font-bricolage"
            style={{ fontSize: "20px", fontWeight: 700, color: "#26231F", textDecoration: "none" }}
          >
            Pricing
          </Link>
        </div>

        {/* Individuals list */}
        <div>
          <div className="font-jetbrains" style={{ fontSize: "11px", fontWeight: 700, color: "#A29B91", letterSpacing: "0.08em", marginBottom: "14px" }}>
            FLOW FOR INDIVIDUALS
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px", maxHeight: "300px", overflowY: "auto", paddingRight: "6px" }}>
            {INDIVIDUAL_ROLES.map((role) => (
              <Link
                key={role.path}
                href={`/individuals/${role.path}`}
                onClick={() => setIsMobileDrawerOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  textDecoration: "none",
                  color: "inherit"
                }}
              >
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "rgba(224, 123, 57, 0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#E07B39",
                  flexShrink: 0
                }}>
                  {role.icon}
                </div>
                <span className="font-bricolage" style={{ fontSize: "15px", fontWeight: 700, color: "#26231F" }}>
                  {role.title}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Download free */}
        <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div
            onClick={() => {
              setIsMobileDrawerOpen(false);
              setIsWaitlistOpen(true);
            }}
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#fff",
              background: "#1A1A1A",
              padding: "14px 28px",
              borderRadius: "999px",
              textAlign: "center",
              cursor: "pointer"
            }}
          >
            Join waitlist
          </div>
        </div>
      </div>
    </div>

    {/* WAITLIST MODAL OVERLAY */}
    {isWaitlistOpen && (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(26, 23, 20, 0.4)",
          backdropFilter: "blur(12px)",
          zIndex: 100000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          pointerEvents: "auto",
        }}
        onClick={() => setIsWaitlistOpen(false)}
      >
        <div
          style={{
            background: "#FDF6F0",
            border: "1.5px solid #F2D6C2",
            borderRadius: "28px",
            width: "100%",
            maxWidth: "460px",
            padding: "36px 32px",
            boxShadow: "0 24px 60px -15px rgba(224, 123, 57, 0.15)",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsWaitlistOpen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "transparent",
              border: "none",
              fontSize: "20px",
              color: "#A29B91",
              cursor: "pointer",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            }}
          >
            &times;
          </button>

          {/* Modal Content */}
          {modalSubmitted ? (
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🚀</div>
              <h3 className="font-bricolage" style={{ fontSize: "24px", fontWeight: 800, color: "#26231F", margin: "0 0 8px" }}>
                You&apos;re on the list!
              </h3>
              <p className="font-hanken" style={{ fontSize: "14.5px", color: "#6B6560", lineHeight: 1.5, margin: 0 }}>
                Thank you for joining our waitlist. We&apos;re launching soon and will reach out with early access.
              </p>
            </div>
          ) : (
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "rgba(224, 123, 57, 0.08)",
                color: "#E07B39",
                marginBottom: "20px",
              }}>
                <FiUsers size={22} />
              </div>
              <h3 className="font-bricolage" style={{ fontSize: "24px", fontWeight: 800, color: "#26231F", margin: "0 0 10px" }}>
                Join the Lisup Waitlist
              </h3>
              <p className="font-hanken" style={{ fontSize: "14.5px", color: "#6B6560", lineHeight: 1.5, margin: "0 0 24px" }}>
                Lisup turns speech into clean, structured text anywhere on your screen. Drop your email below to get early access when we launch.
              </p>
              <form onSubmit={handleModalSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={modalEmail}
                  onChange={(e) => setModalEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    borderRadius: "12px",
                    border: "1.5px solid #F0D5C1",
                    background: "#fff",
                    outline: "none",
                    fontSize: "14.5px",
                    color: "#26231F",
                    fontFamily: "var(--font-hanken)",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "999px",
                    border: "none",
                    background: "#E07B39",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "15px",
                    cursor: "pointer",
                    boxShadow: "0 10px 20px -8px rgba(224,123,57,0.5)",
                  }}
                >
                  Join waitlist
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    )}

  </div>
);
}
