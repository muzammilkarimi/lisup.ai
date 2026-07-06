"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WINDOWS_DOWNLOAD_LABEL, WINDOWS_DOWNLOAD_URL } from "./download";
import { 
  FiUsers, 
  FiCode, 
  FiPenTool, 
  FiMessageSquare, 
  FiBookOpen, 
  FiBriefcase, 
  FiEye, 
  FiTrendingUp,
  FiX,
  FiDownload,
  FiPlayCircle,
  FiLayers,
  FiSliders
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


const RESOURCE_LINKS = [
  {
    title: "How it works",
    subtitle: "See Lisup in action",
    href: "/#how",
    icon: <FiPlayCircle size={15} />
  },
  {
    title: "Features",
    subtitle: "Explore product capabilities",
    href: "/#features",
    icon: <FiLayers size={15} />
  },
  {
    title: "Tone options",
    subtitle: "Switch writing style instantly",
    href: "/#tones",
    icon: <FiSliders size={15} />
  }
];

export default function Navbar() {
  const [isIndivOpen, setIsIndivOpen] = useState(false);
  const [isResOpen, setIsResOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const handleMagnetMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.3}px, ${(e.clientY - (r.top + r.height / 2)) * 0.45}px)`;
  };

  const handleMagnetLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "translate(0,0)";
  };

  const handleLogoClick = () => {
    setIsMobileDrawerOpen(false);
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
          position: "relative",
          zIndex: 50,
          pointerEvents: isMobileDrawerOpen ? "none" : "auto",
          opacity: isMobileDrawerOpen ? 0 : 1,
          transform: isMobileDrawerOpen ? "translateY(-10px)" : "translateY(0)",
          width: "min(92%, 1160px)",
          borderRadius: "999px",
          background: "rgba(253, 246, 240, 0.85)",
          border: "1.5px solid",
          borderColor: `rgba(224, 123, 57, ${isHovered ? 0.45 : 0.25})`,
          boxShadow: `0 12px 40px rgba(224, 123, 57, ${isHovered ? 0.12 : 0.08}), 0 1px 3px rgba(224, 123, 57, 0.04)`,
          backdropFilter: "blur(16px)",
          transition: "opacity .3s, transform .3s, border-color .3s, box-shadow .3s",
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
          onClick={handleLogoClick}
          data-cursor 
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
        >
          <Image
            src="/logo.png"
            alt="Lisup Logo"
            width="32"
            height="32"
            priority
            loading="eager"
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


          {/* ABOUT */}
          <Link
            href="/about"
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
            About
          </Link>
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
                INDIVIDUALS
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
                width: "330px",
                background: "#fff",
                borderRadius: "20px",
                border: "1px solid #ECE8E2",
                boxShadow: "0 24px 48px rgba(26,26,26,0.08)",
                padding: "18px 16px",
                zIndex: 100,
                opacity: isResOpen ? 1 : 0,
                pointerEvents: isResOpen ? "auto" : "none",
                transition: "opacity 0.2s ease, transform 0.2s ease",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "4px"
              }}
            >
              <div className="font-jetbrains" style={{ fontSize: "9.5px", fontWeight: 700, color: "#A29B91", letterSpacing: "0.08em", paddingLeft: "10px", marginBottom: "6px" }}>
                RESOURCES
              </div>

              {RESOURCE_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "9px 10px",
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
                    {item.icon}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                    <div className="font-bricolage" style={{ fontSize: "13.5px", fontWeight: 700, color: "#26231F", lineHeight: 1.15 }}>
                      {item.title}
                    </div>
                    <div className="font-hanken" style={{ fontSize: "11px", color: "#6B6560", lineHeight: 1.15 }}>
                      {item.subtitle}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* PRICING */}
          <Link
            href="/pricing"
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

          <a
            href={WINDOWS_DOWNLOAD_URL}
            data-cursor
            onMouseMove={handleMagnetMove}
            onMouseLeave={handleMagnetLeave}
            style={{
              fontSize: "13.5px",
              fontWeight: 700,
              color: "#fff",
              background: "#1A1A1A",
              padding: "9px 18px",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "transform .12s ease-out, background .2s, box-shadow .2s",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 10px 22px -14px rgba(26,26,26,.7)",
            }}
            className="hover-bg-orange"
          >
            <FiDownload size={15} />
            {WINDOWS_DOWNLOAD_LABEL}
          </a>
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
    <div 
      className={`mobile-drawer ${isMobileDrawerOpen ? "open" : ""}`} 
      style={{ 
        pointerEvents: isMobileDrawerOpen ? "auto" : "none",
        paddingTop: "24px"
      }}
    >

      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

        {/* Drawer Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ECE8E2", paddingBottom: "16px" }}>
          <Link 
            href="/" 
            onClick={handleLogoClick}
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          >
            <Image
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
                fontSize: "20px",
                color: "#26231F",
                letterSpacing: "-.01em",
              }}
            >
              Lis<span style={{ color: "#E07B39" }}>up</span>
            </span>
          </Link>

          <button
            onClick={() => setIsMobileDrawerOpen(false)}
            aria-label="Close Navigation Menu"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
              color: "#26231F",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              transition: "background 0.2s",
            }}
            className="hover-bg-fdf6f0-soft"
          >
            <FiX size={24} />
          </button>
        </div>
        
        {/* Main Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", borderBottom: "1px solid #ECE8E2", paddingBottom: "24px" }}>
          <Link
            href="/about"
            onClick={() => setIsMobileDrawerOpen(false)}
            className="font-bricolage"
            style={{ fontSize: "20px", fontWeight: 700, color: "#26231F", textDecoration: "none" }}
          >
            About
          </Link>
          <Link
            href="/pricing"
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
            INDIVIDUALS
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
          <a
            href={WINDOWS_DOWNLOAD_URL}
            onClick={() => {
              setIsMobileDrawerOpen(false);
            }}
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#fff",
              background: "#1A1A1A",
              padding: "14px 28px",
              borderRadius: "999px",
              textAlign: "center",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            {WINDOWS_DOWNLOAD_LABEL}
          </a>
        </div>
      </div>
    </div>



  </div>
);
}
