import { ArticleBlock } from "@/lib/content/types";
import { Callout } from "@/components/ui";
import {
  InlineCheck,
  KeyFigure,
  RevealCard,
} from "@/components/article-interactives";

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
              <ol key={i} className="mb-5 space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-contrast">
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
          case "check":
            return (
              <InlineCheck
                key={i}
                question={block.question}
                options={block.options}
                explanation={block.explanation}
              />
            );
          case "reveal":
            return (
              <RevealCard key={i} prompt={block.prompt} answer={block.answer} />
            );
          case "figure":
            return (
              <KeyFigure
                key={i}
                value={block.value}
                label={block.label}
                source={block.source}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
