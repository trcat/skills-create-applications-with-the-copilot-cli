const test = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const { calculate } = require("../calculator");

const cliPath = path.join(__dirname, "..", "index.js");

test("adds positive integers from the image example", () => {
  assert.equal(calculate("add", 2, 3), 5);
});

test("adds negative and positive numbers", () => {
  assert.equal(calculate("add", -2, 5), 3);
});

test("subtracts positive integers from the image example", () => {
  assert.equal(calculate("subtract", 10, 4), 6);
});

test("subtracts to a negative result", () => {
  assert.equal(calculate("subtract", 4, 10), -6);
});

test("multiplies positive integers from the image example", () => {
  assert.equal(calculate("multiply", 45, 2), 90);
});

test("multiplies by zero", () => {
  assert.equal(calculate("multiply", 45, 0), 0);
});

test("divides positive integers from the image example", () => {
  assert.equal(calculate("divide", 20, 5), 4);
});

test("divides decimal values", () => {
  assert.equal(calculate("divide", 7.5, 2.5), 3);
});

test("rejects division by zero", () => {
  assert.throws(() => calculate("divide", 20, 0), {
    message: "Division by zero is not allowed.",
  });
});

test("rejects unsupported operations", () => {
  assert.throws(() => calculate("power", 2, 3), {
    message: "Unsupported operation: power",
  });
});

test("prints result for valid cli input", () => {
  const result = spawnSync("node", [cliPath, "multiply", "45", "2"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), "90");
  assert.equal(result.stderr.trim(), "");
});

test("prints usage for invalid operation", () => {
  const result = spawnSync("node", [cliPath, "power", "2", "3"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Supported operations: add, subtract, multiply, divide/);
});

test("prints usage for non-numeric operands", () => {
  const result = spawnSync("node", [cliPath, "add", "two", "3"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Both operands must be valid numbers\./);
});

test("prints error for division by zero in cli", () => {
  const result = spawnSync("node", [cliPath, "divide", "20", "0"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Division by zero is not allowed\./);
});

test("prints usage when operands are missing", () => {
  const result = spawnSync("node", [cliPath, "add", "2"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Usage: node src\/index\.js <operation> <left> <right>/);
});

test("prints usage for uppercase operations", () => {
  const result = spawnSync("node", [cliPath, "ADD", "2", "3"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Supported operations: add, subtract, multiply, divide/);
});

test("rejects infinity as an operand", () => {
  const result = spawnSync("node", [cliPath, "add", "Infinity", "3"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Both operands must be valid numbers\./);
});
