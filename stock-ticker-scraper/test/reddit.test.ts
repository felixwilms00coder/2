import { test } from "node:test";
import assert from "node:assert/strict";
import { countCashtagMentions } from "../src/reddit.js";

test("countCashtagMentions counts and normalizes cashtags across posts", () => {
  const result = countCashtagMentions([
    "$AAPL is mooning, also grabbed some $aapl calls",
    "Selling my $TSLA, buying more $GME",
    "no ticker mentions here at all",
  ]);

  assert.deepEqual(result, [
    { symbol: "AAPL", title: "", watchlistCount: 2, exchange: null },
    { symbol: "TSLA", title: "", watchlistCount: 1, exchange: null },
    { symbol: "GME", title: "", watchlistCount: 1, exchange: null },
  ]);
});

test("countCashtagMentions ignores bare uppercase words without a $ prefix", () => {
  const result = countCashtagMentions(["YOLO into DD, this is not IT"]);
  assert.deepEqual(result, []);
});

test("countCashtagMentions returns an empty array for no matches", () => {
  assert.deepEqual(countCashtagMentions([]), []);
});
