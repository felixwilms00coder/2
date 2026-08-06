import { ImageResponse } from "next/og";
import { AppIconGlyph } from "@/lib/app-icon";

/** 192x192 PNG for app/manifest.ts — the size Android's install prompt uses. */
export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(<AppIconGlyph />, { width: 192, height: 192 });
}
