import type { Metadata } from "next";

/**
 * Gedeelde metadata-helper: zorgt dat elke pagina altijd een eigen
 * canonical, openGraph én twitter-blok zet. Next.js merget `twitter` niet
 * met de root-layout: laat een pagina dat veld weg, dan toont die pagina
 * bij een share op Twitter/X alsnog de generieke FinEdu-kaart uit
 * layout.tsx, ook als openGraph wel correct is ingevuld.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  absoluteTitle = false,
  robots,
}: {
  title: string;
  description: string;
  /** Route zonder domein, bv. "/quiz/mijn-quiz" of "" voor de homepage. */
  path: string;
  type?: "website" | "article";
  /** Zet op true om de "%s: FinEdu"-titeltemplate uit layout.tsx te omzeilen (enkel de homepage heeft dit nodig). */
  absoluteTitle?: boolean;
  /** Bv. { index: false } voor gepersonaliseerde pagina's zonder unieke servercontent. */
  robots?: Metadata["robots"];
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(robots ? { robots } : {}),
  };
}
