import { ArticleBlock } from "@/lib/content/types";
import { Callout } from "@/components/ui";

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="prose-article">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i}>{block.text}</p>;
          case "h2":
            return <h2 key={i}>{block.text}</h2>;
          case "list":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "steps":
            return (
              <ol key={i} className="mb-4 space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                      {j + 1}
                    </span>
                    <span className="pt-0.5 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <Callout key={i} tone={block.tone} title={block.title}>
                {block.text}
              </Callout>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
