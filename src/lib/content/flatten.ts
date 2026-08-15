import type { ArticleBlock } from "./types";

/** Plattekst-weergave van een artikel: elk bloktype wordt een regel, zodat
 * de inhoud bruikbaar is zonder de UI-structuur te kennen. Gedeeld tussen
 * de AI-antwoord-context (ai-context.ts) en de machine-leesbare
 * llms-full.txt-export. */
export function flattenBlocks(blocks: ArticleBlock[]): string {
  const lines: string[] = [];
  for (const block of blocks) {
    switch (block.type) {
      case "h2":
        lines.push(`## ${block.text}`);
        break;
      case "p":
        lines.push(block.text);
        break;
      case "list":
      case "steps":
        lines.push(...block.items.map((item) => `- ${item}`));
        break;
      case "callout":
        lines.push(
          `(${block.tone === "tip" ? "Tip" : "Let op"}: ${block.title}) ${block.text}`,
        );
        break;
      case "check":
        lines.push(block.explanation);
        break;
      case "reveal":
        lines.push(`${block.prompt} ${block.answer}`);
        break;
      case "figure":
        lines.push(
          `Kerncijfer: ${block.label}: ${block.value}${block.source ? ` (bron: ${block.source})` : ""}`,
        );
        break;
    }
  }
  return lines.join("\n");
}
