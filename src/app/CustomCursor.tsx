"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Hidden on mobile devices
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest && target.closest("[data-cursor]") && cursorRingRef.current) {
        cursorRingRef.current.style.width = "58px";
        cursorRingRef.current.style.height = "58px";
        cursorRingRef.current.style.background = "rgba(224,123,57,.1)";
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest && target.closest("[data-cursor]") && cursorRingRef.current) {
        cursorRingRef.current.style.width = "38px";
        cursorRingRef.current.style.height = "38px";
        cursorRingRef.current.style.background = "transparent";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    let animId: number;
    const tick = () => {
      ringRef.current.x += (pointerRef.current.x - ringRef.current.x) * 0.18;
      ringRef.current.y += (pointerRef.current.y - ringRef.current.y) * 0.18;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${ringRef.current.x}px,${ringRef.current.y}px) translate(-50%,-50%)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${pointerRef.current.x}px,${pointerRef.current.y}px) translate(-50%,-50%)`;
      }
      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRingRef}
        id="cursor-ring"
        className="lz-hidemob"
        style={{
          position: "fixed",
          width: "38px",
          height: "38px",
          border: "1.8px solid #E07B39",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-100px,-100px)",
          transition: "width .2s, height .2s, background .2s, border-color .2s",
        }}
      ></div>
      <div
        ref={cursorDotRef}
        className="lz-hidemob"
        style={{
          position: "fixed",
          width: "7px",
          height: "7px",
          background: "#E07B39",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-100px,-100px)",
        }}
      ></div>
    </>
  );
}
