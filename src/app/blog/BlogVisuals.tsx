import Link from "next/link";
import type { BlogPost } from "./posts";

const toneStyles = {
  orange: { bg: "#FDF6F0", ink: "#E07B39", soft: "#F3D1BC", dark: "#26231F" },
  blue: { bg: "#F4F8FF", ink: "#4F63F6", soft: "#CBD7FF", dark: "#1D2550" },
  green: { bg: "#F2FBF6", ink: "#2C9A5E", soft: "#BFE9CF", dark: "#173C2A" },
  purple: { bg: "#F8F4FF", ink: "#7C5CF6", soft: "#D9CBFF", dark: "#2E2359" },
  dark: { bg: "#23201D", ink: "#F3B27C", soft: "#3A332E", dark: "#FFF7EF" },
};

export function BlogCover({ post, compact = false }: { post: BlogPost; compact?: boolean }) {
  const tone = toneStyles[post.coverTone];

  return (
    <div
      className="blog-cover"
      style={{
        minHeight: compact ? "150px" : "260px",
        borderRadius: "8px",
        background: tone.bg,
        border: `1px solid ${tone.soft}`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: compact ? "18px" : "28px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${tone.soft}55 1px, transparent 1px), linear-gradient(90deg, ${tone.soft}55 1px, transparent 1px)`,
          backgroundSize: compact ? "28px 28px" : "36px 36px",
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: compact ? "120px" : "190px",
          height: compact ? "120px" : "190px",
          borderRadius: "50%",
          right: compact ? "-38px" : "-50px",
          top: compact ? "-42px" : "-52px",
          background: tone.ink,
          opacity: post.coverTone === "dark" ? 0.24 : 0.16,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: compact ? "96px" : "150px",
          height: compact ? "96px" : "150px",
          borderRadius: "50%",
          right: compact ? "38px" : "86px",
          bottom: compact ? "-50px" : "-70px",
          border: `1.5px solid ${tone.ink}`,
          opacity: 0.35,
        }}
      />
      <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
        <span
          className="font-jetbrains"
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: ".12em",
            color: tone.ink,
            textTransform: "uppercase",
          }}
        >
          {post.category}
        </span>
        <span
          className="font-jetbrains"
          style={{
            fontSize: "10px",
            color: tone.dark,
            opacity: 0.58,
            whiteSpace: "nowrap",
          }}
        >
          {post.readTime}
        </span>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          className="font-bricolage"
          style={{
            maxWidth: compact ? "230px" : "420px",
            fontSize: compact ? "24px" : "42px",
            lineHeight: compact ? 1.02 : 0.96,
            letterSpacing: "-.03em",
            fontWeight: 800,
            color: tone.dark,
          }}
        >
          {compact ? post.category : "Voice becomes finished text"}
        </div>
        {!compact ? (
          <div className="font-jetbrains" style={{ marginTop: "18px", fontSize: "11px", color: tone.ink, letterSpacing: ".08em" }}>
            LISUP JOURNAL
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card" data-cursor>
      <BlogCover post={post} compact />
      <div style={{ padding: "18px 2px 0" }}>
        <div className="font-jetbrains" style={{ fontSize: "11px", color: "#A29B91", letterSpacing: ".08em", marginBottom: "10px" }}>
          {post.date} / {post.category}
        </div>
        <h2 className="font-bricolage" style={{ fontSize: "24px", lineHeight: 1.05, letterSpacing: "-.025em", color: "#26231F", margin: "0 0 10px", fontWeight: 800 }}>
          {post.title}
        </h2>
        <p style={{ fontSize: "15px", lineHeight: 1.55, color: "#6B6560", margin: 0 }}>
          {post.description}
        </p>
      </div>
    </Link>
  );
}