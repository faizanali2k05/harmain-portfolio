import { test } from "node:test";
import assert from "node:assert/strict";
import { chunk, chunkMarkdown } from "./index.js";

test("short text yields a single chunk", () => {
  const c = chunk("hello world", { maxSize: 100 });
  assert.equal(c.length, 1);
  assert.equal(c[0]!.text, "hello world");
  assert.deepEqual([c[0]!.start, c[0]!.end], [0, 11]);
});

test("empty input yields no chunks", () => {
  assert.deepEqual(chunk(""), []);
  assert.deepEqual(chunk("   \n\n  ", { maxSize: 3 }), []);
});

test("offsets always slice back to the chunk text", () => {
  const text = "Para one is here.\n\nPara two follows. It has two sentences.\n\nPara three ends it.";
  for (const c of chunk(text, { maxSize: 25 })) {
    assert.equal(text.slice(c.start, c.end), c.text);
  }
});

test("prefers paragraph breaks over mid-sentence splits", () => {
  const text = "First paragraph.\n\nSecond paragraph.";
  const cs = chunk(text, { maxSize: 20 });
  assert.deepEqual(cs.map((c) => c.text), ["First paragraph.", "Second paragraph."]);
});

test("every chunk respects maxSize", () => {
  const text = ("The quick brown fox jumps over the lazy dog. ").repeat(20);
  for (const c of chunk(text, { maxSize: 40 })) {
    assert.ok(c.text.length <= 40, `"${c.text}" is ${c.text.length} > 40`);
  }
});

test("unsplittable runs are hard-split as last resort", () => {
  const text = "a".repeat(100);
  const cs = chunk(text, { maxSize: 30 });
  assert.ok(cs.length >= 4);
  assert.ok(cs.every((c) => c.text.length <= 30));
  assert.equal(cs.map((c) => c.text).join(""), text);
});

test("overlap shares trailing content between consecutive chunks", () => {
  const text = "one two three four five six seven eight nine ten";
  const cs = chunk(text, { maxSize: 20, overlap: 8 });
  assert.ok(cs.length >= 2);
  for (let i = 1; i < cs.length; i++) {
    assert.ok(cs[i]!.start < cs[i - 1]!.end, `chunk ${i} does not overlap previous`);
  }
});

test("zero overlap produces non-overlapping chunks", () => {
  const text = "one two three four five six seven eight nine ten";
  const cs = chunk(text, { maxSize: 15, overlap: 0 });
  for (let i = 1; i < cs.length; i++) {
    assert.ok(cs[i]!.start >= cs[i - 1]!.end);
  }
});

test("custom sizer: word-count chunking", () => {
  const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
  const text = "alpha beta gamma delta epsilon zeta eta theta";
  const cs = chunk(text, { maxSize: 3, sizer: words });
  assert.ok(cs.every((c) => words(c.text) <= 3));
  assert.ok(cs.length >= 3);
});

test("invalid options throw", () => {
  assert.throws(() => chunk("x", { maxSize: 0 }), RangeError);
  assert.throws(() => chunk("x", { maxSize: 10, overlap: 10 }), RangeError);
});

test("chunkMarkdown never crosses heading boundaries", () => {
  const md = "# Title\nIntro text here.\n\n## Section A\nContent of A.\n\n## Section B\nContent of B.";
  const cs = chunkMarkdown(md, { maxSize: 1000 });
  assert.equal(cs.length, 3); // one chunk per section despite generous maxSize
  assert.ok(cs[0]!.text.startsWith("# Title"));
  assert.ok(cs[1]!.text.startsWith("## Section A"));
  assert.ok(cs[2]!.text.startsWith("## Section B"));
  for (const c of cs) assert.equal(md.slice(c.start, c.end), c.text);
});

test("chunkMarkdown still splits large sections internally", () => {
  const md = "## Big\n" + "Sentence here. ".repeat(30);
  const cs = chunkMarkdown(md, { maxSize: 60 });
  assert.ok(cs.length > 1);
  assert.ok(cs.every((c) => c.text.length <= 60));
});
