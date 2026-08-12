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
            marginBottom: 40,
          }}
        >
          <div style={{ fontSize: 40, fontWeight: 700 }}>FinEdu</div>
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, maxWidth: 900 }}>
          Financieel wegwijs vanaf je eerste job
        </div>
        <div style={{ fontSize: 28, color: "#5c574f", marginTop: 24 }}>
          Budget, sparen, beleggen, wonen, pensioen en belastingen: uitgelegd
          voor starters
        </div>
      </div>
    ),
    { ...size },
  );
}
