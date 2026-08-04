import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#fcfbf9",
          color: "#1c1a17",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <svg width="64" height="64" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="9" fill="#ffffff" stroke="#e7e2d9" strokeWidth="1" />
            <path
              d="M6 25.5V20h5.5v-5.5H17V9h5.5v16.5H6Z"
              fill="#1c1a17"
            />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700 }}>FinEdu</div>
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, maxWidth: 900 }}>
          Financieel wegwijs vanaf je eerste job
        </div>
        <div style={{ fontSize: 28, color: "#5c574f", marginTop: 24 }}>
          Budget, sparen, beleggen, wonen, pensioen en belastingen &mdash;
          uitgelegd voor starters
        </div>
      </div>
    ),
    { ...size },
  );
}
