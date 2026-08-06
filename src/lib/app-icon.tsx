/**
 * Shared glyph for generated app icons (apple-icon.tsx, icon-192, icon-512).
 * Same shape as src/app/icon.svg and src/app/opengraph-image.tsx — keep all
 * four in sync if the mark changes (see README.md "Branding and artwork").
 */
export function AppIconGlyph() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="32"
          height="32"
          rx="9"
          fill="#ffffff"
          stroke="#e7e2d9"
          strokeWidth="1"
        />
        <path d="M6 25.5V20h5.5v-5.5H17V9h5.5v16.5H6Z" fill="#1c1a17" />
      </svg>
    </div>
  );
}
