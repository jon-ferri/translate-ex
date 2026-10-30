import { test } from "node:test";
import assert from "node:assert/strict";
import { Result } from "./Result";

test("ok wraps a value", () => {
  const result = Result.ok(42);

  assert.equal(result.isOk(), true);
  assert.equal(result.isFail(), false);
  assert.equal(result.getValue(), 42);
});

test("fail carries the error", () => {
  const result = Result.fail<string, { errorType: string }>({ errorType: "BOOM" });

  assert.equal(result.isFail(), true);
  assert.equal(result.isOk(), false);
  assert.deepEqual(result.getError(), { errorType: "BOOM" });
});

test("getValue throws on a failed result", () => {
  const result = Result.fail<string, string>("nope");

  assert.throws(() => result.getValue(), /failed result/);
});

test("getError throws on a successful result", () => {
  const result = Result.ok("fine");

  assert.throws(() => result.getError(), /successful result/);
});
