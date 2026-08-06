import { ImageResponse } from "next/og";
import { AppIconGlyph } from "@/lib/app-icon";

/** 512x512 PNG for app/manifest.ts — used for splash screens and larger displays. */
export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(<AppIconGlyph />, { width: 512, height: 512 });
}
