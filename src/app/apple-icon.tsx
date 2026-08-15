import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Zelfde tekst-only "F"-monogram als icon.tsx, op Apple's touch-icon formaat. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0369a1",
          color: "#ffffff",
          fontFamily: "sans-serif",
          fontSize: 96,
          fontWeight: 700,
        }}
      >
        F
      </div>
    ),
    { ...size },
  );
}
