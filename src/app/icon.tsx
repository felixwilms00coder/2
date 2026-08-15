import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Tekst-only "F"-monogram, in lijn met de opengraph-image en de bewuste
 * keuze om het icoon-beeldmerk overal te vervangen door enkel de
 * "FinEdu"-tekst: geen pictogram, enkel de letter.
 */
export default function Icon() {
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
          fontSize: 22,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        F
      </div>
    ),
    { ...size },
  );
}
