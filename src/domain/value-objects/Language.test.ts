import { test } from "node:test";
import assert from "node:assert/strict";
import { Language } from "./Language";

test("normalizes the code", () => {
  assert.equal(new Language(" ES ").code, "es");
});

test("rejects empty codes", () => {
  assert.throws(() => new Language(""));
  assert.throws(() => new Language("   "));
});

test("rejects codes that are not 2-3 letters", () => {
  assert.throws(() => new Language("spanish"));
  assert.throws(() => new Language("e"));
});

// Known limitation: regional tags are still an open decision (see ROADMAP.md).
// This test will need to change when that decision lands.
test("rejects regional tags for now", () => {
  assert.throws(() => new Language("es-ES"));
});

test("equals compares codes", () => {
  assert.equal(new Language("es").equals(new Language("ES")), true);
  assert.equal(new Language("es").equals(new Language("en")), false);
});

test("tryCreate returns null instead of throwing", () => {
  assert.equal(Language.tryCreate("!!"), null);
});

test("tryCreate builds a valid language", () => {
  assert.equal(Language.tryCreate("fr")?.code, "fr");
});

test("toString returns the code", () => {
  assert.equal(new Language("de").toString(), "de");
});
