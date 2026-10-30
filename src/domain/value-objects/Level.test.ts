import { test } from "node:test";
import assert from "node:assert/strict";
import { Level } from "./Level";

test("accepts every CEFR level and derives its order", () => {
  const catalog = ["A1", "A2", "B1", "B2", "C1", "C2"];

  catalog.forEach((name, index) => {
    const level = new Level(name);
    assert.equal(level.name, name);
    assert.equal(level.order, index + 1);
  });
});

test("normalizes case and whitespace", () => {
  assert.equal(new Level(" b1 ").name, "B1");
});

test("rejects levels outside the catalog", () => {
  assert.throws(() => new Level("B3"));
  assert.throws(() => new Level(""));
});

test("rejects an order that contradicts the catalog", () => {
  assert.equal(new Level("B1", 3).order, 3);
  assert.throws(() => new Level("B1", 5));
});

test("tryCreate returns null instead of throwing", () => {
  assert.equal(Level.tryCreate("Z9"), null);
});

test("tryCreate builds a valid level", () => {
  assert.equal(Level.tryCreate("c1")?.name, "C1");
});
