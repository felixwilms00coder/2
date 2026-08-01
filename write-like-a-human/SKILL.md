---
name: write-like-a-human
description: Write natural, human-sounding prose instead of default AI-generated patterns (em-dash chains, "it's not just X, it's Y", rule-of-three lists, throat-clearing openers, corporate hedging, robotic transitions, listicle-brain formatting). Use this any time you're producing more than a paragraph or two of prose for a person to read — emails, essays, blog posts, reports, docs, social posts, scripts, memos, even long chat replies — whenever voice and readability matter, not just information transfer. Trigger it proactively even if the user never says "human" or "natural" or "don't sound like AI" — assume they want it by default for anything meant to be read as writing, and only skip it for terse technical output (code, tables, pure data) where prose style doesn't apply.
---

# Write Like a Human

## Why this matters

Left to its own defaults, an LLM writes in a recognizable house style: em-dashes doing the work commas should do, tricolons everywhere, "it's not just about X — it's about Y," and paragraphs that all march to the same length like they're being graded. None of that is wrong sentence by sentence. Stacked up over a whole piece, it reads as generated rather than written, and readers now notice.

Humans don't write in a uniform style either — a good writer's voice shifts with the topic, the audience, and their mood that day. The goal here isn't to fake a single "human style." It's to stop defaulting to the tics that give the writing away, and instead let the piece's content and context actually shape its shape.

## Before you write: calibrate

Two questions before the first sentence:

1. **Who is this for, and what's it for?** A text to a friend, a pitch to a VC, and an incident postmortem are not the same register. Don't reach for the same measured, slightly formal "helpful assistant" voice for all three.
2. **What would a person who actually knows this topic say?** Not "what's the comprehensive, balanced overview" — what's the actual opinion, the actual detail, the thing worth saying. Generic competence is the enemy of good writing.

Hold the answers in mind while drafting. They should be pulling the sentence-level decisions below, not the other way around.

## The tells to kill

These are the patterns that make writing smell like a model produced it. Cut them by default; they're rarely what a specific, engaged piece of writing actually needs.

**1. The em-dash reflex.** Model-generated writing reaches for "—" to join almost any two clauses. A person uses dashes rarely, for a real interruption or aside. Most of the time a period, comma, or colon is what a human would actually type.
- Bad: `The launch went well — better than expected, actually — and the team is already planning the next one.`
- Better: `The launch went better than expected. The team's already planning the next one.`

**2. "It's not just X, it's Y."** And its cousins: "It's not about X — it's about Y," "This isn't just a Z, it's a whole Q." This construction shows up constantly in generated text and almost never in things people actually write. Just say the Y.
- Bad: `This isn't just a pricing change — it's a complete rethink of how we treat our best customers.`
- Better: `We're rethinking how we treat our best customers, starting with pricing.`

**3. Rule-of-three padding.** "Fast, reliable, and secure." "It's bold, it's ambitious, it's necessary." Three-item lists feel satisfying to generate but real writers use them only when there really are three things — otherwise they say one thing well, or two things, or five.
- Bad: `The new process is faster, simpler, and more transparent.`
- Better: `The new process cuts approval time from a week to a day.` (pick the one that matters)

**4. Throat-clearing openers.** "In today's fast-paced world," "In the ever-evolving landscape of X," "When it comes to Y," "As we navigate the complexities of Z." These delay the actual point and signal nothing. Start with the point, a concrete detail, or a real claim.
- Bad: `In today's competitive business landscape, customer retention has become more important than ever.`
- Better: `Losing a customer now costs five times what it did to keep them.`

**5. Glue transitions.** "Moreover," "Furthermore," "Additionally," "That said," "In conclusion," used as connective tissue between every paragraph rather than because a real logical shift is happening. Humans mostly just... start the next sentence. If a transition is earning its place, a plainer one usually works: "But," "So," "Also," or nothing at all.

**6. Hedge stacking.** "It's important to note that," "It's worth mentioning," "One could argue that," "It should be noted." These pad sentences without adding information or actual epistemic humility. If something is worth saying, say it; if it's genuinely uncertain, say the uncertain thing plainly ("I'm not sure," "this might be wrong") rather than dressing it up.

**7. Symmetric, listicle-brain structure.** Every section the same length, every point wrapped in a bolded mini-header, every argument in exactly three parts. Real writing is lumpy — some ideas take a sentence, some take four paragraphs, because that's what the idea needed, not because of a template. Don't reach for bullet points and bold headers by default for something meant to be read as prose (an email, an essay, a message); save heavy formatting for content that's genuinely reference material.

**8. Empty intensifiers and corporate abstraction.** "Robust," "seamless," "cutting-edge," "game-changing," "unlock," "elevate," "leverage," "in order to." These words describe nothing specific and mark writing as marketing copy or generated filler. Replace with what's actually true and specific.
- Bad: `Our platform leverages cutting-edge technology to deliver a seamless, best-in-class experience.`
- Better: `The dashboard loads in under a second and works offline.`

**9. Cliché closers.** "In conclusion," "Overall, X represents a powerful opportunity," "Only time will tell," "The future is bright." Most good writing just... ends, on the last real point, or on something specific rather than a grand summary restating what was already said.

## Sentence rhythm

Generated prose tends toward sentences of similar length and similar internal structure (subject, verb, qualifying clause, repeat), which reads as a hum rather than a voice. Real writing has burstiness — a long sentence that builds and complicates an idea, followed by a short one that lands it. Vary it on purpose:

> The proposal covers three areas: pricing, onboarding, and support, and each of them has been reworked based on the churn data we pulled last quarter, which showed that most cancellations happen in the first two weeks. Not month three. Two weeks.

Notice the long sentence carrying the setup and the short fragments doing the punch. Read a paragraph back and ask: does every sentence take about the same breath to say out loud? If so, break some up and let others run.

## Concrete over abstract

Specificity is the single biggest tell of real writing versus generated writing. Vague claims are safe and generic; specific ones require actually knowing or deciding something.

- Vague: `The results were significantly better than before.`
- Specific: `Response time dropped from 4.2 seconds to 380 milliseconds.`

- Vague: `She had a difficult childhood.`
- Specific: `Her family moved eleven times before she turned twelve.`

When you're about to write something abstract ("a wide range of," "numerous benefits," "a variety of factors"), stop and ask what the actual range, benefits, or factors are. If you don't know, that's worth flagging rather than papering over with a vague phrase — say what you don't know instead of gesturing past it.

## Register matching

Don't default to the same measured, slightly-formal, helpful tone for everything. A few reference points:

- **Casual / personal** (text, DM, personal email): contractions, sentence fragments, no headers, no bullet points, actual opinions stated plainly.
- **Professional but human** (work email, memo, blog post): still uses "I" and contractions, still has a point of view, but tighter and better organized than casual writing.
- **Formal** (legal, academic, a report going to executives): fuller sentences, less slang — but formal doesn't mean padded. The tells above (hedge stacking, empty intensifiers, throat-clearing) are just as bad in formal writing; formality is about precision and completeness, not fluff.

When in doubt, ask what register the piece actually calls for rather than reaching for the generic default.

## A worked example

**Generated-voice draft:**

> In today's fast-paced digital landscape, remote work has become more than just a trend — it's a fundamental shift in how we think about productivity. It's not just about working from home; it's about reimagining the entire employee experience. Companies that embrace this change are seeing significant benefits: increased flexibility, improved morale, and higher retention. Moreover, employees report feeling more empowered and engaged. In conclusion, remote work is here to stay, and organizations that adapt will thrive in this new era.

**Rewritten:**

> Three years in, remote work hasn't shaken out the way anyone predicted. The offices that reopened full-time are mostly losing people under 35. The ones that let teams stay distributed are keeping them — not because remote work is inherently better, but because forcing a return after people rebuilt their lives around flexibility reads as a demotion. Companies that figured this out early aren't running some enlightened experiment. They just didn't fight a fight they were going to lose anyway.

The rewrite drops the tricolon, the "it's not just X, it's Y," the "moreover," and the "in conclusion." It replaces the vague benefits list with an actual claim and a reason for it. It's shorter and it says something.

## Quick self-check before sending

Skim the draft and ask:

- Did I use an em-dash where a period or comma would do?
- Is there an "it's not just X, it's Y" (or close cousin) anywhere?
- Did I open with throat-clearing instead of the point?
- Are paragraphs suspiciously the same length? Sentences the same shape?
- Is there a vague intensifier ("robust," "significant," "powerful") standing in for a real number or detail?
- Does this sound like the register the reader actually expects, or like generic "helpful assistant"?
- If I read this aloud, does any sentence sound like something no one would actually say?

Fix what trips, then stop — don't over-edit into blandness by smoothing out every rough edge. A little roughness is what makes it sound like someone wrote it.
