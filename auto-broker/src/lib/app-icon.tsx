/**
 * Shared glyph for generated app icons (apple-icon.tsx, icon-192, icon-512).
 * Same shape as src/app/icon.svg — keep both in sync if the mark changes.
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
          rx="8"
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
        <path
          d="M12.2 19.8 19.8 12.2"
          stroke="#0f172a"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="10" cy="22" r="3.2" fill="#0f172a" />
        <circle cx="22" cy="10" r="3.2" fill="#0d9488" />
      </svg>
    </div>
  );
}
