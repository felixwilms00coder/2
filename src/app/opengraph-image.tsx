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
          background: "#111111",
          color: "#ffffff",
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
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#ffffff",
              color: "#111111",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            FE
          </div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>FinEdu</div>
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, maxWidth: 900 }}>
          Financieel wegwijs vanaf je eerste job
        </div>
        <div style={{ fontSize: 28, color: "#a3a3a3", marginTop: 24 }}>
          Budget, sparen, beleggen, wonen, pensioen en belastingen &mdash;
          uitgelegd voor starters
        </div>
      </div>
    ),
    { ...size },
  );
}
