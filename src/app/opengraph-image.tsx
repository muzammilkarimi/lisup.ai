import { ImageResponse } from "next/og";

export const alt = "Lisup - Stop typing. Start talking.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FDF6F0",
          color: "#26231F",
          padding: "64px 72px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-140px",
            top: "-120px",
            width: "420px",
            height: "420px",
            borderRadius: "999px",
            background: "#E07B39",
            opacity: 0.16,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-170px",
            bottom: "-210px",
            width: "520px",
            height: "520px",
            borderRadius: "999px",
            background: "#26231F",
            opacity: 0.08,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: "58px",
              height: "58px",
              borderRadius: "16px",
              background: "#E07B39",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "34px",
              fontWeight: 800,
            }}
          >
            L
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "34px", fontWeight: 800, letterSpacing: "0" }}>
              Lisup
            </div>
            <div style={{ fontSize: "18px", color: "#6B6560", marginTop: "4px" }}>
              Voice to finished text, everywhere you write
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "850px" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "rgba(224, 123, 57, 0.12)",
              color: "#C0631F",
              borderRadius: "999px",
              padding: "10px 18px",
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "28px",
            }}
          >
            AI dictation for Windows
          </div>
          <div
            style={{
              fontSize: "82px",
              lineHeight: 0.96,
              fontWeight: 900,
              letterSpacing: "0",
            }}
          >
            Stop typing. Start talking.
          </div>
          <div
            style={{
              fontSize: "28px",
              lineHeight: 1.35,
              color: "#6B6560",
              marginTop: "26px",
              maxWidth: "780px",
            }}
          >
            Lisup turns messy speech into polished text in 100+ languages - fillers gone, grammar fixed, in your tone.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#6B6560",
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          <div style={{ display: "flex", gap: "14px" }}>
            <span>On-device</span>
            <span style={{ color: "#E07B39" }}>-</span>
            <span>100+ languages</span>
            <span style={{ color: "#E07B39" }}>-</span>
            <span>Works anywhere</span>
          </div>
          <div style={{ color: "#E07B39" }}>lisup.ai</div>
        </div>
      </div>
    ),
    size
  );
}